# Hue Hunt

**Find today's color.**

Hue Hunt is a mobile-first daily discovery app. Each day you get one color challenge, find something in the real world that matches it, optionally capture a photo, and build a personal visual collection.

This project is a production-quality web prototype designed to ship as a PWA and later wrap in an Android WebView / TWA for Google Play.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

Output is written to `dist/`.

## Product overview

| Flow | Description |
|------|-------------|
| Onboarding | 3 short screens, skippable, no account |
| Today | Deterministic daily color + CTA |
| Hunt | Full-screen color, photo pick/camera file input, or complete without photo |
| Complete | Soft celebration, streak, path to collection |
| Collection | Visual gallery of finds |
| History | Chronological list + detail |
| Settings | Theme, privacy, terms, reset data |

## Architecture

```
src/
  components/     UI + layout (BottomNav, Button, Dialog, …)
  context/        AppContext — state, streaks, persistence
  data/colors.ts  ~40 curated colors
  lib/
    analytics.ts  trackEvent abstraction (dev logger)
    dates.ts      local YYYY-MM-DD helpers
    image.ts      client-side JPEG compression
    storage.ts    localStorage load/save + demo seed
  pages/          route screens
  App.tsx         router
  main.tsx        bootstrap + PWA SW register
```

- **React + TypeScript + Vite + Tailwind CSS v4 + Lucide**
- **No backend, no auth, no external APIs** for core play
- **localStorage** key `hue-hunt:v1`
- Daily color is hashed from the local date and cached in state so refreshes do not re-roll mid-day
- Photos are compressed before save; if quota fails, the hunt still completes without the image

## Data storage

Persisted fields:

- Settings (theme, onboarding, demo flag)
- Hunt entries (date, color, optional photo data URL, demo flag)
- Stats (current / best streak, totals)
- Today’s challenge cache

Reset is available in Settings with a confirmation dialog.

## Analytics events

`src/lib/analytics.ts` exposes `trackEvent(name, properties?)`.

In development, events log to the console. Nothing is sent to a server.

| Event | When |
|-------|------|
| `app_opened` | First load |
| `return_session` | Returning user with prior hunts |
| `onboarding_started` | Onboarding open |
| `onboarding_completed` | Finished onboarding |
| `onboarding_skipped` | Skip |
| `hunt_viewed` | Home / today’s hunt |
| `photo_added` | Photo compressed & previewed |
| `photo_save_failed` | Storage quota path |
| `hunt_completed` | **Primary activation** |
| `collection_viewed` | Collection tab |
| `history_viewed` | History tab |
| `settings_viewed` | Settings |
| `theme_changed` | Theme toggle |
| `data_reset` | Full reset |

### Connecting Firebase later

```ts
// src/lib/analytics.ts
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics(app);

export function trackEvent(name, properties) {
  logEvent(analytics, name, properties);
}
```

Update the Privacy Policy before enabling production analytics.

## UAC / acquisition funnel

```
Ad → Play listing → Install → First open → Today’s hunt
  → hunt_completed → Collection → Return next day (return_session)
```

Optimize creatives around the daily color moment and the collection grid. Measure activation with `hunt_completed`.

## Google Play Compliance

1. The app provides meaningful interactive functionality (daily challenge, capture, collection, streaks).
2. It is not a static landing page.
3. Users complete daily color challenges.
4. Users build a personal collection.
5. Core data is stored locally on device.
6. No unnecessary sensitive permissions are required for the web core (camera only via user-initiated file picker).
7. No gambling, betting, fake currency, or monetary prizes.
8. No user account is required.
9. Photos remain local and are not uploaded by this app.
10. Privacy Policy and Terms are available in-app.
11. An Android wrapper should target **API 36+** (Android 16) per current Play requirements for new apps/updates.

## Google Play Store Listing

**App name:** Hue Hunt

**Short description:**  
Find today’s color. Capture it. Build your collection.

**Full description:**  
Hue Hunt turns ordinary days into tiny color adventures. Each day you get one beautiful color challenge. Look around you, find a match, add a photo if you want, and grow a personal gallery of everyday hues.

- One calm daily challenge  
- Optional photo capture (stays on your device)  
- Visual collection and history  
- Streaks that encourage gentle return visits  
- No account, no ads in this prototype, no gambling  

**Suggested category:** Lifestyle (or Photography)

**Target audience:** Adults and teens who enjoy mindfulness, photography, and creative observation.

**Privacy considerations:** Local-only storage in this build; update Data safety form if analytics or cloud sync are added.

**Suggested screenshots:**

1. Today’s Hunt card with large color name  
2. Hunt screen full swatch + Add a photo  
3. Completion celebration  
4. Collection grid  
5. History list  
6. Settings / privacy  

## PWA

- `manifest` via `vite-plugin-pwa`
- Icons in `public/icons`
- Service worker with app-shell caching
- Installable on supported browsers

## Deploy

Any static host works:

```bash
npm run build
# upload dist/ to Netlify, Vercel, Firebase Hosting, S3+CloudFront, etc.
```

Ensure HTTPS (required for camera/file and PWA). Configure SPA fallback to `index.html`.

## Android WebView / TWA packaging

Recommended path for Play:

1. Host the production build on HTTPS.
2. Use **Trusted Web Activity** (Chrome Custom Tabs / Android Browser Helper) or a thin WebView shell.
3. Set `targetSdk` / compile SDK to **API 36+**.
4. Declare only needed permissions (e.g. `INTERNET`; camera only if you bridge native capture).
5. Digital Asset Links for TWA full-screen.
6. Point WebView `user-agent` / file chooser carefully so `<input type="file" accept="image/*" capture>` works.
7. Handle back button → `history.back()` inside the WebView.
8. Optional: native local notifications for daily reminders (web UI already explains this).

### Bubblewrap (TWA) sketch

```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://your.domain/manifest.webmanifest
bubblewrap build
```

## Before a real production launch

- [ ] Legal review of Privacy Policy & Terms  
- [ ] Real analytics + consent if required  
- [ ] Play Data safety form  
- [ ] High-res store graphics (512 icon PNG, feature graphic)  
- [ ] Optional cloud backup / multi-device sync  
- [ ] Native notification channel  
- [ ] Crash reporting  
- [ ] Accessibility pass (TalkBack, contrast)  
- [ ] QA on low-end Android WebView  
- [ ] Remove or gate demo seed for production if desired  

## License

Prototype for assignment / product evaluation. All rights reserved by the author unless otherwise agreed.
