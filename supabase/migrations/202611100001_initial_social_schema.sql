-- TUNER initial social foundation
-- Apply with Supabase CLI: supabase db push
-- All user-owned records are scoped to auth.uid() through RLS.

create extension if not exists pgcrypto;

create type public.profile_visibility as enum ('public', 'friends', 'private');
create type public.friend_request_status as enum ('pending', 'accepted', 'declined', 'cancelled');
create type public.listening_visibility as enum ('public', 'friends', 'private');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text not null unique,
  display_name text not null,
  bio text not null default '',
  avatar_url text,
  profile_visibility public.profile_visibility not null default 'friends',
  share_listening_activity boolean not null default true,
  share_listening_history boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint handle_format check (handle ~ '^[a-zA-Z0-9_]{3,24}$'),
  constraint display_name_length check (char_length(display_name) between 1 and 60),
  constraint bio_length check (char_length(bio) <= 160)
);

create table public.friend_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  status public.friend_request_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint no_self_friend_request check (requester_id <> recipient_id)
);

create unique index friend_requests_one_pending_pair
  on public.friend_requests (least(requester_id, recipient_id), greatest(requester_id, recipient_id))
  where status = 'pending';

create table public.friendships (
  user_low uuid not null references public.profiles(id) on delete cascade,
  user_high uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_low, user_high),
  constraint friendship_canonical_order check (user_low < user_high)
);

create table public.user_blocks (
  blocker_id uuid not null references public.profiles(id) on delete cascade,
  blocked_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  constraint no_self_block check (blocker_id <> blocked_id)
);

create table public.listening_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null,
  provider_track_id text not null,
  track_title text not null,
  artist_name text not null,
  album_art_url text,
  visibility public.listening_visibility not null default 'friends',
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  last_heartbeat_at timestamptz not null default now(),
  constraint track_title_length check (char_length(track_title) between 1 and 200),
  constraint artist_name_length check (char_length(artist_name) between 1 and 160)
);

create index listening_sessions_user_recent on public.listening_sessions (user_id, started_at desc);
create index listening_sessions_active on public.listening_sessions (last_heartbeat_at desc)
  where ended_at is null;

create or replace function public.is_friend_with(other_user uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.friendships f
    where (f.user_low = auth.uid() and f.user_high = other_user)
       or (f.user_high = auth.uid() and f.user_low = other_user)
  );
$$;

revoke all on function public.is_friend_with(uuid) from public;
grant execute on function public.is_friend_with(uuid) to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  base_handle text;
begin
  base_handle := lower(regexp_replace(coalesce(new.raw_user_meta_data ->> 'handle', split_part(new.email, '@', 1), 'tuner_user'), '[^a-zA-Z0-9_]', '', 'g'));
  if char_length(base_handle) < 3 then base_handle := 'tuner_user'; end if;
  insert into public.profiles (id, handle, display_name)
  values (
    new.id,
    left(base_handle, 15) || '_' || left(replace(new.id::text, '-', ''), 8),
    left(coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), split_part(new.email, '@', 1), 'TUNER user'), 60)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at before update on public.profiles
  for each row execute procedure public.touch_updated_at();
create trigger friend_requests_touch_updated_at before update on public.friend_requests
  for each row execute procedure public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.friend_requests enable row level security;
alter table public.friendships enable row level security;
alter table public.user_blocks enable row level security;
alter table public.listening_sessions enable row level security;

create policy "Profiles are visible according to profile privacy"
on public.profiles for select to authenticated
using (
  id = auth.uid()
  or (
    not exists (
      select 1 from public.user_blocks b
      where (b.blocker_id = profiles.id and b.blocked_id = auth.uid())
         or (b.blocker_id = auth.uid() and b.blocked_id = profiles.id)
    )
    and (
      profile_visibility = 'public'
      or (profile_visibility = 'friends' and public.is_friend_with(id))
    )
  )
);

create policy "Users can create their own profile"
on public.profiles for insert to authenticated
with check (id = auth.uid());

create policy "Users can update their own profile"
on public.profiles for update to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "Request participants can read requests"
on public.friend_requests for select to authenticated
using (requester_id = auth.uid() or recipient_id = auth.uid());

create policy "Users can send friend requests"
on public.friend_requests for insert to authenticated
with check (requester_id = auth.uid() and status = 'pending');

create policy "Recipients can respond to requests"
on public.friend_requests for update to authenticated
using (recipient_id = auth.uid() and status = 'pending')
with check (recipient_id = auth.uid() and status in ('accepted', 'declined'));

create policy "Users can cancel their own pending requests"
on public.friend_requests for delete to authenticated
using (requester_id = auth.uid() and status = 'pending');

create policy "Users can see their own friendships"
on public.friendships for select to authenticated
using (user_low = auth.uid() or user_high = auth.uid());

create policy "Users can see blocks they created"
on public.user_blocks for select to authenticated
using (blocker_id = auth.uid());

create policy "Users can block other users"
on public.user_blocks for insert to authenticated
with check (blocker_id = auth.uid());

create policy "Users can remove their own blocks"
on public.user_blocks for delete to authenticated
using (blocker_id = auth.uid());

create policy "Listening sessions follow owner visibility"
on public.listening_sessions for select to authenticated
using (
  user_id = auth.uid()
  or (
    not exists (
      select 1 from public.user_blocks b
      where (b.blocker_id = listening_sessions.user_id and b.blocked_id = auth.uid())
         or (b.blocker_id = auth.uid() and b.blocked_id = listening_sessions.user_id)
    )
    and (
      visibility = 'public'
      or (visibility = 'friends' and public.is_friend_with(user_id))
    )
  )
);

create policy "Users can start their own listening sessions"
on public.listening_sessions for insert to authenticated
with check (user_id = auth.uid());

create policy "Users can update their own listening sessions"
on public.listening_sessions for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Users can end their own listening sessions"
on public.listening_sessions for delete to authenticated
using (user_id = auth.uid());

-- Friendship rows are created only by a trusted server-side workflow after
-- validating an accepted request. Never expose service-role credentials to clients.
