# TUNER Product Scope

## Product statement

TUNER is a social music platform where people listen together, discover music through friends, and create performances around songs.

## Core experiences

### 1. Shared listening rooms
- A room is associated with an authorized track or live audio source.
- A host starts playback; room members receive a shared playback timeline.
- The service tracks playback position and corrects drift.
- Room presence, reactions, and chat are real-time.
- Room access can be public, friends-only, or invite-only.

### 2. Friends activity
- Opt-in live listening presence.
- Friends can see the track and artist when sharing is enabled.
- Join a friend's room or invite friends into a session.
- Listening history, recent plays, favorites, and weekly recaps.
- Visibility controls: public, friends, private; hide individual sessions; pause history.

### 3. Create while listening
- Record a video while a track plays, subject to provider and rights-holder permissions.
- Video capture is independent from the listening synchronization service.
- Users can publish, react to, comment on, and share performances.

### 4. Group performances
- Participants record separate camera feeds against a common session timeline.
- The backend aligns media using timestamp and synchronization metadata.
- A composition service produces split-screen or multi-participant performances.
- Users review and consent to the final composition before publication.

### 5. Live music
- Artist channels and scheduled or spontaneous live performances.
- Audience presence, reactions, and moderated chat.
- Rights and platform permissions must be validated before enabling music rebroadcast or recording.

## MVP sequence

1. App foundation, design system, navigation, and product decisions.
2. Accounts, profiles, authentication, and privacy settings.
3. Friends/follow graph and activity preferences.
4. Licensed catalog/provider evaluation and playback proof of concept.
5. Shared listening rooms with measured synchronization.
6. Reactions, invitations, and room chat.
7. Creator recording with rights-aware audio handling.
8. Group performance composition.
9. Artist live channels and moderation tooling.

## Non-negotiable requirements

- Do not expose private listening activity.
- Do not store provider credentials or service secrets in the client.
- Do not assume a consumer streaming subscription grants TUNER the right to rebroadcast tracks.
- Provide reporting, blocking, moderation, and abuse response before public social launch.
- Establish age-appropriate defaults and a child-safety review before onboarding minors.
- Make account deletion and data export part of the account system design.
