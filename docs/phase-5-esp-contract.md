# Phase 5 ESP contract — 18 November 2026

The prepared integration keeps https://duffball16.com/live/esp.json and the original five JSON fields:

| Field | Type | Meaning |
|---|---|---|
| subscribers | number | Last successfully retrieved subscriber count |
| views | number | Last successfully retrieved channel view count |
| videos | number | Last successfully retrieved video count |
| status | string | Exactly `Streaming Live` or `Not Livestreaming` |
| updated | string | Amsterdam observation time in `HH:mm` format |

Only a fresh, positive Hub observation produces `Streaming Live`. The legacy non-live string also represents stale, unknown and unavailable observations. It prevents a stuck LIVE display and preserves exact-text consumers, but cannot prove that the channel is offline. The full Hub feed retains the richer unknown/freshness information. No `unknown`, `No live stream detected` or `Live status unavailable` strings are emitted to the ESP by this version.

On failure, retain the last valid numeric counts and timestamp, clear LIVE to `Not Livestreaming`, and emit only the five original fields. Missing or invalid saved counts are rejected instead of being replaced by zeroes. Hidden subscriber counts do not become fabricated zeroes.

The existing five-minute workflow schedule and manual trigger remain unchanged. The Hub is scheduled every thirty minutes; GitHub may delay scheduled runs, so neither is a real-time guarantee. The workflow reads only the public Hub JSON and needs no separate YouTube API key. No firmware, device settings, homepage, navigation, game pages or styling are changed.

Fourteen focused tests pass, including legacy exact strings, field names/types, stale LIVE, unavailable Hub, retained counts/timestamp, and removal of unexpected saved fields. Existing content categories, playlist grouping, refresh and navigation also pass the reused DOM checks. This verifies the JSON contract in software; physical ESP compatibility has not been tested.

Deployment must follow successful publication and validation of the Duffball Hub feed and all five existing feeds. Until that gate passes, these ESP changes remain local.
