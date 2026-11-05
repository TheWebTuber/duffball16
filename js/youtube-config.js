/** Duffball16 YouTube feed configuration.
 *  IMPORTANT: Browser JavaScript is public. Restrict your key to https://duffball16.com/*
 *  and to the YouTube Data API v3 in Google Cloud. Never use an unrestricted key.
 */
window.DUFFBALL_YOUTUBE = {
  apiKey: "AIzaSyBvpCwNhDR-PvJ02tJ2iJDekFc3R9-g5V0",
  channelHandle: "@Duffball16",
  channelId: "UC2iwDFfrVjWYFpXahr-o8cA", // Optional: put a known UC... channel ID here to skip handle lookup.
  cacheMinutes: 60,
  perSection: 6,
  maxUploadsPages: 5 // Scan at most 250 recent uploads for the three formats.
};
