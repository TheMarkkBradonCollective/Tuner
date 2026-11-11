# TUNER security and privacy checklist

## Before a public beta
- [ ] Enable email confirmation and secure password reset.
- [ ] Confirm all user data tables have Row Level Security enabled.
- [ ] Test profile visibility for public, friends-only, and private profiles.
- [ ] Verify blocked users cannot see profiles or listening sessions in either direction.
- [ ] Verify a user cannot write another user's profile, friend request, or listening session.
- [ ] Create friendships only through a trusted server-side workflow after an accepted request.
- [ ] Add rate limits for sign-up, friend requests, messages, and reactions.
- [ ] Add report, block, moderation, and abuse-response workflows.
- [ ] Add account deletion and data export.
- [ ] Define listening-history retention and deletion behavior.
- [ ] Keep provider secrets and Supabase service-role keys server-side.
- [ ] Confirm music playback, synchronization, recording, and rebroadcast rights for each provider and territory.
- [ ] Complete age-appropriate design and child-safety review before onboarding minors.

## Listening privacy expectations
- Private activity is visible only to its owner.
- Friends-only activity is visible only to accepted friends.
- Blocks override public/friend visibility.
- Listening-history sharing is off by default.
- Users can pause activity sharing without losing access to music-only features.
