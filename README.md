# TUNER

**Music is better together.**

TUNER is a social music platform built around synchronized listening, friends' activity, creator performances, live music channels, and collaborative video.

## Current foundation

- Expo + React Native + TypeScript
- Expo Router navigation
- Dark, music-first interface
- Feature roadmap and architecture documentation
- Environment-variable template for future services

## Run locally

Requirements: Node.js LTS, npm, and Expo Go (or an Android/iOS development environment).

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a` to launch an Android emulator.

## Project status

This is the initial application foundation. Authentication, licensed music playback, real-time synchronization, social graph, live streaming, and collaborative recording are not yet connected. Those integrations will be implemented in staged, testable milestones.

## Product principles

1. Listening together is the core experience.
2. Music-only social use must work without recording video.
3. Users control who can see their listening activity.
4. Music playback and video capture are separate systems.
5. Music is supplied through authorized providers and rights-cleared catalogs.

See [Product roadmap](docs/PRODUCT.md) and [Technical architecture](docs/ARCHITECTURE.md).
