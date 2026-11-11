# TUNER Technical Architecture

## Initial client

- Expo / React Native / TypeScript.
- Expo Router for navigation.
- Feature modules should remain independent and communicate through typed service interfaces.
- The client must never contain privileged backend keys.

## Proposed service boundaries

### Identity and social graph
Users, profiles, friend/follow relationships, blocks, reports, and privacy preferences.

### Catalog and rights
Track and artist metadata, provider identifiers, territory availability, playback capabilities, and rights restrictions. Catalog metadata is not proof of playback or synchronization rights.

### Playback
A playback adapter for the selected licensed provider. Keep provider-specific APIs behind an interface so the app is not coupled to one vendor.

### Listening rooms and synchronization
- Room state: room ID, track/provider ID, host, playback state, server start timestamp, canonical position, and participant list.
- Server is authoritative for room timeline.
- Clients estimate server clock offset and calculate expected playback position.
- Clients correct drift with bounded seek/rate adjustments supported by the provider.
- Re-sync after reconnect, background/foreground transitions, or audio interruptions.
- Record synchronization quality metrics; do not claim sync accuracy without measurements.

### Real-time presence and messaging
Presence heartbeats, room membership, chat, reactions, and invitations. Presence should expire automatically and respect user privacy settings.

### Media capture and composition
Capture video as a separate subsystem. Store session timestamps and media metadata; align participant clips to the shared timeline. Use a processing queue for composition and transcoding. Apply upload limits, consent checks, moderation, and retention policies.

### Live channels
Use a dedicated real-time audio/video streaming provider or media server. Keep live broadcast permissions separate from ordinary catalog playback permissions.

## Data domains (logical)

- users, profiles, relationships, blocks
- privacy_preferences, activity_visibility
- artists, tracks, catalog_providers, rights_constraints
- listening_sessions, listening_events, listening_history
- rooms, room_members, room_events, room_messages
- reactions, invitations, notifications
- creator_videos, performance_sessions, performance_participants, media_assets
- live_channels, live_sessions, moderation_reports

## Security and privacy

- Enforce authorization on the server for every private resource.
- Use row-level access policies where supported.
- Minimize stored listening data and define retention periods.
- Validate uploaded media type, size, and ownership.
- Use signed, short-lived media URLs.
- Rate-limit room joins, messages, reactions, and uploads.
- Provide block/report workflows and moderation audit trails.
- Never log tokens, passwords, private messages, or sensitive listening details.

## Decisions still required

- Backend platform and hosting region.
- Authentication provider.
- Real-time transport and database.
- Licensed music catalog and playback partner.
- Music licensing scope: territories, interactive streaming, synchronization, user-generated video, live performance, and replay rights.
- Media storage, transcoding, and live streaming vendors.
- Target launch territories and age policy.

## Suggested next engineering milestone

Build authentication and profile/privacy flows, then validate one licensed playback provider with a small synchronized-room technical spike before expanding social and video features.
