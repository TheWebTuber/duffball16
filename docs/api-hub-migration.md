# Local API Hub migration — 16 November 2026

No commit, push, publication or deployment was performed.

## Integration

- Feed: https://api.creatorpromote.com/data/duffball16.json
- Pinned verified channel: UC2iwDFfrVjWYFpXahr-o8cA
- Local js/creatorpromote-hub.js is an unchanged copy of the Hub client (SHA-256 1b3910649a46ebaffec5025e2e01b0264020a061e1630d096ac2a9d254bbe434).
- js/hub-feed.mjs checks identity before caching and on cached reads, manages page lifecycle, and retains fallback notices after a failed manual refresh.
- No runtime package dependency, browser API key or browser YouTube Data API request remains in this migration.
- Successful snapshots persist in memory/localStorage; bad responses cannot replace them. If storage is blocked, memory still works. Old browser-API cache formats are not imported because their live observations were not independently timestamped.
- LIVE expires after at most 45 minutes and is reevaluated while the page remains open. Unknown does not mean offline. The Hub scans recent public uploads; it cannot prove that no broadcast exists outside its scan.

## Features preserved

Statistics, animated counters, clock, milestones, regular videos, Shorts approximation, replays/scheduled streams, Minecraft/Hollow Knight/other playlist grouping, thumbnails, durations, featured fallbacks and refresh button. ESP workflow now reads the Hub, preserves counts on failure and expires LIVE.

## Verification

Run from this directory: node --test tests/*.test.mjs (13 passing tests). All JavaScript syntax checks passed.
tests/fixtures/proposed.json contains explicitly synthetic data for the verified channel ID. It is not a real channel snapshot and is never loaded by the website.

The actual page scripts were exercised with a DOM implementation against normal, empty, offline and wrong-channel fixtures. API requests were recorded and constrained to the expected Hub endpoint. Manual refresh/fallback, LIVE expiry, applicable menus and page-specific interactions passed. These checks do not use a rendering engine and cannot certify responsive appearance or animation smoothness. Browser process launches failed; the computer-use tool then stopped because it could not determine the browser URL. No further UI automation was attempted.

## Deployment gate

The published feed returned HTTP 404. The local migration is prepared and fixture-tested but MUST NOT be deployed until the verified channel is separately approved, enabled and published by the Hub, then tested with real data. The Hub entry remains disabled.
ESP JSON preserves subscribers/views/videos as numbers and status/updated as strings. Unknown status text is intentionally new; verify any hardware that compares exact status strings. The existing live/esp.json was not changed and the workflow was not run. Upload scanning stays at 250 videos and public playlist scanning at 150 playlists. Duration <= 180 seconds remains an approximation of Shorts, not an official Shorts classification.
