# TUNER backend setup (Supabase)

Supabase is the proposed backend for the first implementation milestone.

## Why this choice
- Managed authentication and Postgres database.
- Row Level Security for profile, friend, block, and listening privacy.
- Realtime subscriptions for room presence and friend activity.
- A migration-based schema that can be reviewed and deployed consistently.

## Create the project
1. Create a project in the Supabase dashboard.
2. Keep the database region close to the first launch audience.
3. Enable email authentication. Configure email confirmation and password reset before public testing.
4. Copy the project URL and publishable/anon client key into a local `.env` file using `.env.example`.
5. Never put a service-role key in the mobile app or commit any secret.

## Apply the initial schema
Install the Supabase CLI, link the project, then run:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

The migration creates profiles on signup and applies Row Level Security policies. Review policies in a non-production project before onboarding users.

## Important implementation boundary
The initial schema covers identity profiles, friend requests, accepted friendship relationships, blocks, and listening sessions. A trusted server-side workflow must convert accepted requests into canonical friendship rows; clients must not be allowed to forge friendships.

## Required next steps
- Implement Supabase Auth screens and session persistence in the Expo client.
- Add server-side friend-request acceptance and friendship creation.
- Add profile editing, account deletion, and data export.
- Add Realtime presence only after privacy and authorization tests pass.
- Add automated RLS tests for owner, friend, stranger, blocked-user, and anonymous access.
- Select a licensed music playback provider before storing or exposing playable track URLs.
