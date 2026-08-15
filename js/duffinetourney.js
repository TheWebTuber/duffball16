/*
  DUFFINE TOURNEYS — PARTICIPANT RESEARCH

  This data section lives at the top of script.js so the whole page needs
  only one JavaScript file. Confirmed records become participant cards on the
  museum page. Likely records appear in a separate "needs confirmation"
  panel and are not counted as confirmed participants.

  No recovered name is automatically marked as a winner or given a title.
  Those records still require Duffball16's confirmation.

  Confidence rules:
  - confirmed: organizer matchup, direct match/round/final statement, or
    another strong message showing the person actually played.
  - likely: signup, invite, or team-selection evidence without a clear
    statement that the person completed a match.

  YouTube supplied no caption/subtitle track for any of the 28 videos.
*/

const participantResearchMeta = {
  researchedOn: "2026-08-15",
  playlistId: "PLcG6ntX1WSzqPDeO2hcWuSBagKHW9CVYj",
  videosReviewed: 28,
  captionTracksFound: 0,
  method: "Public live-chat replay, organizer matchup posts, self-reported match evidence, and public Epic IDs"
};

const tournamentParticipantResearch = [
  {
    videoId: "X8qhvivs-kc",
    date: "2026-07-19",
    event: "Duffine World Cup Tournament — Day 2",
    confirmed: [
      { name: "Luca", handle: "@lucaramilo8459", gameId: "PossiblyLuca", evidence: "Joined Via Livechat" },
      { name: "Harry", handle: "", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Forgot", handle: "@forgot_editz", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Lucas", handle: "", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Daniel", handle: "@danielmeyuhas1701", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Riley", handle: "", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Gerald", handle: "@GeraldFonyam", gameId: "fitzgeraldh2k", evidence: "Joined Via Livechat" },
      { name: "Duffball", handle: "@Duffball16", gameId: "Duffball16", evidence: "Joined Via Livechat" },
      { name: "Grey", handle: "@Grey-rl", gameId: "grey-peaks", evidence: "Joined Via Livechat" },
      { name: "L.S", handle: "@L.S-j1d", gameId: "Nhi455", evidence: "Joined Via Livechat" }
    ],
    likely: [],
    notes: "Countries in chat changed between rounds for some players; preserve names separately from country labels."
  },
  {
    videoId: "bIqL9Ejd9Ds",
    date: "2026-07-18",
    event: "Duffine World Cup Tournament — Day 1",
    confirmed: [
      { name: "Lucas", handle: "", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Christer", handle: "@ChristerMTB", gameId: "Christer_rei", evidence: "Joined Via Livechat" },
      { name: "Sablo", handle: "", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Poopster", handle: "", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Luca", handle: "@lucaramilo8459", gameId: "PossiblyLuca", evidence: "Joined Via Livechat" },
      { name: "Nobody", handle: "@Nobodylockgod", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Harry", handle: "@Harrrrrrrrrrrrrrrrrry", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Lucid", handle: "", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Zombie", handle: "@Zombie6090", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [],
    notes: "Organizer-posted matchups provide the strongest roster evidence."
  },
  {
    videoId: "Qa-iyS6SN04",
    date: "2025-07-12",
    event: "25K Subscriber Special Tournament",
    confirmed: [],
    likely: [],
    notes: "No captions and no usable live-chat replay evidence. Visual bracket/scoreboard review is required."
  },
  {
    videoId: "Rwy5eTk5-ZE",
    date: "2025-02-23",
    event: "15K Subscriber Special Tournament",
    confirmed: [
      { name: "Bosky", handle: "@boskinhoo", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Harry / Hex", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" },
      { name: "SALAMA", handle: "@SALAMA_rl", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "Semifinal wording may refer to this event or an earlier Tourney; verify visually before publishing SALAMA or Hex."
  },
  {
    videoId: "gqRv7uutyt4",
    date: "2025-01-26",
    event: "8K Subscriber Special Tournament",
    confirmed: [
      { name: "Bosky", handle: "@boskinhoo", gameId: "", evidence: "Joined Via Livechat" },
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Brian", handle: "", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "Harry explicitly said he did not join this event and should not be listed as a participant."
  },
  {
    videoId: "mkJduuPvVEs",
    date: "2025-01-19",
    event: "7K Subscriber Special Tournament",
    confirmed: [],
    likely: [],
    notes: "No captions and no usable live-chat replay evidence. Visual bracket/scoreboard review is required."
  },
  {
    videoId: "VQLcUN7c3qk",
    date: "2025-01-05",
    event: "5K Subscriber Special Tournament",
    confirmed: [
      { name: "Luca", handle: "@lucaramilo8459", gameId: "PossiblyLuca", evidence: "Joined Via Livechat" },
      { name: "Turkey", handle: "@DripTurkey", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Cheeto Theo", handle: "@Cheeto_Theo", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "Signup evidence is weaker than the direct Luca-versus-Turkey matchup."
  },
  {
    videoId: "SNUKBlmitIg",
    date: "2024-12-28",
    event: "4K Subscriber Special Tournament — Stream 2",
    confirmed: [
      { name: "Harry", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" },
      { name: "Luca", handle: "@lucaramilo8459", gameId: "PossiblyLuca", evidence: "Joined Via Livechat" },
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Din0", handle: "@Din0_00_00", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "This short second stream mostly contains signup evidence."
  },
  {
    videoId: "vxtoidmA24o",
    date: "2024-12-28",
    event: "4K Subscriber Special Tournament — Stream 1",
    confirmed: [],
    likely: [],
    notes: "No captions and no usable live-chat replay evidence. Visual bracket/scoreboard review is required."
  },
  {
    videoId: "08wG-eod_70",
    date: "2024-12-21",
    event: "3K Subscriber Special Tournament",
    confirmed: [],
    likely: [],
    notes: "No captions and no usable live-chat replay evidence. Visual bracket/scoreboard review is required."
  },
  {
    videoId: "GNh3agrPwpg",
    date: "2024-10-20",
    event: "2.5K Rocket League Tournament — Stream 2",
    confirmed: [
      { name: "Harry", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" },
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Luca", handle: "@lucaramilo8459", gameId: "PossiblyLuca", evidence: "Joined Via Livechat" }
    ],
    likely: [],
    notes: "The title is duplicated across two dates; this record is the later stream."
  },
  {
    videoId: "xs6z5ikrNAw",
    date: "2024-10-13",
    event: "2.5K Rocket League Tournament — Stream 1",
    confirmed: [],
    likely: [],
    notes: "No captions and no usable live-chat replay evidence. Visual bracket/scoreboard review is required."
  },
  {
    videoId: "f_1RAGcZWDE",
    date: "2024-03-09",
    event: "2K Sub Special Tournaments — Day 2",
    confirmed: [
      { name: "Harry", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" },
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Luca", handle: "@lucaramilo8459", gameId: "PossiblyLuca", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Docrot", handle: "@thedocrot", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Tt / tburt", handle: "@tburt4690", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Croshy", handle: "", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "The stream contains separate 1v1 and 2v2 sections; a person may appear in only one."
  },
  {
    videoId: "EV3qb5RMntA",
    date: "2024-03-08",
    event: "2K Sub Special Tournaments — Day 1",
    confirmed: [
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Abnv", handle: "@abnv7", gameId: "Abhinav.v7", evidence: "Joined Via Livechat" },
      { name: "Hasky", handle: "@YaBoiHasky", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Ghost", handle: "@ItzGh0st.", gameId: "samleemack", evidence: "Joined Via Livechat" },
      { name: "Hat Pull", handle: "", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Harry", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" },
      { name: "Riley", handle: "@ilikerocketleague-w6p", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Brian's cousin", handle: "", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "Some team identities were described only by nicknames."
  },
  {
    videoId: "Cd9pc4xzTmU",
    date: "2023-09-11",
    event: "700 Subscriber Special Tournament",
    confirmed: [
      { name: "Hex", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" },
      { name: "Luca", handle: "@lucaramilo8459", gameId: "PossiblyLuca", evidence: "Joined Via Livechat" }
    ],
    likely: [],
    notes: "The chat sample was limited but contains two direct join confirmations."
  },
  {
    videoId: "7DmLlfXaKAQ",
    date: "2023-08-13",
    event: "550 Subs Special Tourney — Part 2",
    confirmed: [
      { name: "Harry", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" },
      { name: "Laynorx", handle: "@Laynorx", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Nowone", handle: "", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Pulse", handle: "", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Zain", handle: "@zain14-r1d", gameId: "Mister-_-Night", evidence: "Joined Via Livechat" }
    ],
    notes: "Harry's winning statement is direct, but the precise bracket/title still needs visual confirmation."
  },
  {
    videoId: "vaefo58Phxs",
    date: "2023-08-12",
    event: "550 Subs Special Tourney — Part 1",
    confirmed: [
      { name: "Laynorx", handle: "@Laynorx", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Lucas", handle: "", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [],
    notes: "Only a short chat segment was available."
  },
  {
    videoId: "uF_aRPNXF5k",
    date: "2023-07-23",
    event: "500 Subscriber Special Tourneys",
    confirmed: [],
    likely: [],
    notes: "No captions and no usable live-chat replay evidence. Visual bracket/scoreboard review is required."
  },
  {
    videoId: "ZAW94J7Llmo",
    date: "2023-07-01",
    event: "450 Live Sub Special",
    confirmed: [],
    likely: [
      { name: "Harry", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" }
    ],
    notes: "Chat proves that a final occurred, so this belongs in the tournament archive, but the finalist names need visual confirmation."
  },
  {
    videoId: "IZwI37f75Hs",
    date: "2023-05-29",
    event: "350 Subscriber Special Tournament",
    confirmed: [
      { name: "Hasky", handle: "@YaBoiHasky", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Hugh", handle: "@hughninja7653", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Harry", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" },
      { name: "Neiko", handle: "@Neiko717", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Luca", handle: "@lucaramilo8459", gameId: "PossiblyLuca", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Brian", handle: "", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "External ranked-tournament stories were excluded from the evidence."
  },
  {
    videoId: "WjFAwVIQxWM",
    date: "2023-05-14",
    event: "300 Sub Special Tournament",
    confirmed: [
      { name: "Laynorx", handle: "@Laynorx", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Lucid", handle: "@Lucid_phantom999", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Hasky", handle: "@YaBoiHasky", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Corban", handle: "@corbannelson8507", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Hugh", handle: "@hughninja7653", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Abnv", handle: "@abnv7", gameId: "Abhinav.v7", evidence: "Joined Via Livechat" },
      { name: "Ghost", handle: "@ItzGh0st.", gameId: "samleemack", evidence: "Joined Via Livechat" },
      { name: "Jose", handle: "@jose_c2600", gameId: "KingDark", evidence: "Joined Via Livechat" },
      { name: "L1tz", handle: "@L1tz010", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Cookie / NRG", handle: "@Cookie05483", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Dayyan", handle: "@Dayyan.r2012", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "The stream contains more than one tournament format; confirmed names may have played 1v1, 2v2, or both."
  },
  {
    videoId: "r-5KQTf9vzg",
    date: "2023-05-08",
    event: "250 Sub Special Tournament",
    confirmed: [
      { name: "Hasky", handle: "@YaBoiHasky", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Lucid", handle: "@Lucid_phantom999", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Abnv", handle: "@abnv7", gameId: "Abhinav.v7", evidence: "Joined Via Livechat" },
      { name: "James Preston", handle: "", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Ghost", handle: "@ItzGh0st.", gameId: "samleemack", evidence: "Joined Via Livechat" }
    ],
    notes: "Only about 50 replay messages were available, so this roster is incomplete."
  },
  {
    videoId: "r7Wt3PbrXfc",
    date: "2023-03-04",
    event: "2v2 Tournament Sub Special",
    confirmed: [
      { name: "Eyad", handle: "@eyadhagras6192", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Camron", handle: "", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Taboon", handle: "@Taboonnn", gameId: "", evidence: "Joined Via Livechat" },
      { name: "ebola-piraat", handle: "", gameId: "ebola-piraat", evidence: "Joined Via Livechat" },
      { name: "Hasky", handle: "@YaBoiHasky", gameId: "", evidence: "Joined Via Livechat" },
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Brian", handle: "", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "Zone and Jacory asked how to join but never supplied strong proof of playing."
  },
  {
    videoId: "EJjWwzyxkro",
    date: "2023-03-03",
    event: "2v2 and 1v1 Tournament Sub Special",
    confirmed: [
      { name: "Hugh", handle: "@hughninja7653", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Bnrz", handle: "@bnrz2820", gameId: "bnrz28", evidence: "Joined Via Livechat" },
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Jack", handle: "@jackwilliam122", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "The earlier 2v2 section may contain additional players not recoverable from sampled chat."
  },
  {
    videoId: "_HbmeTTfWdI",
    date: "2023-02-11",
    event: "150 Tournament Sub Game Special — Day 2",
    confirmed: [
      { name: "Ashaldo", handle: "@Ashaldo", gameId: "Twixy RL", evidence: "Joined Via Livechat" },
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Harshit", handle: "@HarshitKesharwani", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Zayn", handle: "@zaynnn100yearsago7", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Abnv", handle: "@abnv7", gameId: "Abhinav.v7", evidence: "Joined Via Livechat" },
      { name: "Harry / Hex", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" },
      { name: "Hugh", handle: "@hugh9250", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Hasky", handle: "@YaBoiHasky", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Docrot", handle: "@thedocrot", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "This is one of the strongest older-event chat records."
  },
  {
    videoId: "-ozT-I6U0Kw",
    date: "2023-02-10",
    event: "150 Sub Game Tournament Special — Day 1",
    confirmed: [
      { name: "Lucid", handle: "@Lucid_phantom999", gameId: "Lucid_phantom999", evidence: "Joined Via Livechat" },
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Luca", handle: "@lucaramilo8459", gameId: "PossiblyLuca", evidence: "Joined Via Livechat" },
      { name: "Hugh", handle: "@hughhugh8990", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Bnrz", handle: "@bnrz2820", gameId: "bnrz28", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Hello's brother", handle: "", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "Harry explicitly said it was too late to join and should not be listed."
  },
  {
    videoId: "uyc_fC7iV6I",
    date: "2023-01-27",
    event: "Sub Tournaments and Final Sub Special",
    confirmed: [
      { name: "Harry", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" },
      { name: "Loferhound", handle: "@LoferhoundTV", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Ghost", handle: "@ItzGh0st.", gameId: "samleemack", evidence: "Joined Via Livechat" },
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" }
    ],
    notes: "Later join requests occurred after the documented tournament section and were not counted."
  },
  {
    videoId: "KlMWUChED9Y",
    date: "2023-01-05",
    event: "75 Subscriber Special Tournaments",
    confirmed: [
      { name: "James", handle: "@James-fu8wy", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Bnrz", handle: "@bnrz2820", gameId: "bnrz28", evidence: "Joined Via Livechat" },
      { name: "Lovegill", handle: "@harveerandsifathgill5150", gameId: "lovegill46", evidence: "Joined Via Livechat" },
      { name: "Cheekybottletop", handle: "@taylorkenny1028", gameId: "cheekybottletop", evidence: "Joined Via Livechat" },
      { name: "Jim", handle: "@jim-_-9590", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Hasky", handle: "@YaBoiHasky", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Harry / Hex", handle: "@Harrytira", gameId: "Hexx harry", evidence: "Joined Via Livechat" },
      { name: "Harry Yates", handle: "@harryyates3413", gameId: "", evidence: "Joined Via Livechat" },
      { name: "Edyta", handle: "@edytamichalska8789", gameId: "", evidence: "Joined Via Livechat" },
      { name: "PMOG", handle: "@PMOG", gameId: "", evidence: "Joined Via Livechat" }
    ],
    likely: [
      { name: "Nayy", handle: "@nayyf2", gameId: "", evidence: "Joined Via Livechat" },
      { name: "JG Plays", handle: "@jbgplayseditchannel6305", gameId: "jgplays", evidence: "Joined Via Livechat" }
    ],
    notes: "James is the strongest winner candidate, based on a direct chat claim; visually verify before awarding a public title."
  }
];

if (typeof window !== "undefined") {
  window.participantResearchMeta = participantResearchMeta;
  window.tournamentParticipantResearch = tournamentParticipantResearch;
}

/*
  ================================================================
  DUFFINE TOURNEYS ARCHIVE DATA — ADD PEOPLE IN THIS SECTION
  ================================================================

  The 28 entries below were filtered from Duffball16's supplied
  Rocket League playlist. Normal gameplay streams were excluded.
  Matches had Tournament, Tourney, Duffine Tourneys, or Sub Special
  in the title. Exact duplicate playlist entries were removed.

  Recovered participant records are kept at the top of this file.
  Add confirmed winners, titles, achievements, and certificates inside
  the participants: [] list of the matching upload. A manual participant
  with the same name replaces the recovered record, so your official
  information always wins. Events are automatically ordered by date.

  To use a real certificate PNG:
  1. Create the folder: assets/certificates/
  2. Put the image there.
  3. Set certificate: "assets/certificates/file-name.png"

  Leave certificate as "" and the page creates a styled certificate
  automatically. Avatar images work the same way and are optional.

  If one person earns several titles, use:
  awards: [
    { title: "Champion", achievement: "...", certificate: "...png" },
    { title: "MVP", achievement: "...", certificate: "...png" }
  ]

  The shorter title / achievement / certificate fields used by most
  samples below remain useful when a person has only one title.

  The dates, video titles, durations, links, and playlist positions
  are real YouTube metadata checked on 15 August 2026. Recovered
  rosters are evidence-based, but winners and titles remain empty until
  Duffball16 confirms them.
*/

const TOURNAMENT_PLAYLIST_ID = "PLcG6ntX1WSzqPDeO2hcWuSBagKHW9CVYj";

const tournamentUploads = [
  {
    videoId: "X8qhvivs-kc",
    date: "2026-07-19",
    title: "Duffine World Cup Tournament — Day 2",
    youtubeTitle: `THE 'DUFFINE WORLD CUP' TOURNAMENT! (Day 2) | 🔴 Rocket League Live Stream 🔴`,
    duration: "3:15:52",
    playlistIndex: 7,
    participants: []
  },
  {
    videoId: "bIqL9Ejd9Ds",
    date: "2026-07-18",
    title: "Duffine World Cup Tournament — Day 1",
    youtubeTitle: `THE 'DUFFINE WORLD CUP' TOURNAMENT! (Day 1) | 🔴 Rocket League Live Stream 🔴`,
    duration: "4:04:02",
    playlistIndex: 8,
    participants: []
  },
  {
    videoId: "Qa-iyS6SN04",
    date: "2025-07-12",
    title: "25K Subscriber Special Tournament",
    youtubeTitle: `25K SUBSCRIBER SPECIAL TOURNAMENT! | "The Duffine Tourneys" | 🔴 Rocket League Live Stream 🔴`,
    duration: "3:11:29",
    playlistIndex: 26,
    participants: []
  },
  {
    videoId: "Rwy5eTk5-ZE",
    date: "2025-02-23",
    title: "15K Subscriber Special Tournament",
    youtubeTitle: `15K SUBSCRIBER SPECIAL TOURNAMENT! | "The Duffine Tourneys" | 🔴 Rocket League Live Stream 🔴`,
    duration: "2:13:44",
    playlistIndex: 29,
    participants: []
  },
  {
    videoId: "gqRv7uutyt4",
    date: "2025-01-26",
    title: "8K Subscriber Special Tournament",
    youtubeTitle: `8K SUBSCRIBER SPECIAL TOURNAMENT! | "The Duffine Tourneys" | 🔴 Rocket League Live Stream 🔴`,
    duration: "2:30:56",
    playlistIndex: 30,
    participants: []
  },
  {
    videoId: "mkJduuPvVEs",
    date: "2025-01-19",
    title: "7K Subscriber Special Tournament",
    youtubeTitle: `7K SUBSCRIBER SPECIAL TOURNAMENT! | "The Duffine Tourneys" | 🔴 Rocket League Live Stream 🔴`,
    duration: "2:41:37",
    playlistIndex: 31,
    participants: []
  },
  {
    videoId: "VQLcUN7c3qk",
    date: "2025-01-05",
    title: "5K Subscriber Special Tournament",
    youtubeTitle: `5K SUBSCRIBER SPECIAL TOURNAMENT! | "The Duffine Tourneys" | 🔴 Rocket League Live Stream 🔴`,
    duration: "2:46:22",
    playlistIndex: 32,
    participants: []
  },
  {
    videoId: "SNUKBlmitIg",
    date: "2024-12-28",
    title: "4K Subscriber Special Tournament — Stream 2",
    youtubeTitle: `4K SUBSCRIBER SPECIAL TOURNAMENT! | "The Duffine Tourneys" | 🔴 Rocket League Live Stream 🔴`,
    duration: "30:50",
    playlistIndex: 33,
    participants: []
  },
  {
    videoId: "vxtoidmA24o",
    date: "2024-12-28",
    title: "4K Subscriber Special Tournament — Stream 1",
    youtubeTitle: `4K SUBSCRIBER SPECIAL TOURNAMENT! | "The Duffine Tourneys" | 🔴 Rocket League Live Stream 🔴`,
    duration: "2:08:29",
    playlistIndex: 34,
    participants: []
  },
  {
    videoId: "08wG-eod_70",
    date: "2024-12-21",
    title: "3K Subscriber Special Tournament",
    youtubeTitle: `3K SUBSCRIBER SPECIAL TOURNAMENT! | "The Duffine Tourneys" | 🔴 Rocket League Live Stream 🔴`,
    duration: "2:11:56",
    playlistIndex: 35,
    participants: []
  },
  {
    videoId: "GNh3agrPwpg",
    date: "2024-10-20",
    title: "2.5K Rocket League Tournament — Stream 2",
    youtubeTitle: `🔴 2.5K ROCKET LEAGUE TOURNAMENT! 🔴 | SUBSCRIBER SPECIAL / Rocket League Live Stream`,
    duration: "1:09:03",
    playlistIndex: 36,
    participants: []
  },
  {
    videoId: "xs6z5ikrNAw",
    date: "2024-10-13",
    title: "2.5K Rocket League Tournament — Stream 1",
    youtubeTitle: `🔴 2.5K ROCKET LEAGUE TOURNAMENT! 🔴 | SUBSCRIBER SPECIAL / Rocket League Live Stream`,
    duration: "2:37:51",
    playlistIndex: 37,
    participants: []
  },
  {
    videoId: "f_1RAGcZWDE",
    date: "2024-03-09",
    title: "2K Sub Special Tournaments — Day 2",
    youtubeTitle: `🔴 RL SUB SPECIAL TOURNAMENTS (Day 2), 2K SUB SPECIAL! (1v1s/2v2s) 🔴 | Rocket League Live Stream`,
    duration: "4:45:18",
    playlistIndex: 53,
    participants: []
  },
  {
    videoId: "EV3qb5RMntA",
    date: "2024-03-08",
    title: "2K Sub Special Tournaments — Day 1",
    youtubeTitle: `🔴 RL SUB SPECIAL TOURNAMENTS (Day 1), 2K SUB SPECIAL! (1v1s/2v2s) 🔴 | Rocket League Live Stream`,
    duration: "4:20:34",
    playlistIndex: 54,
    participants: []
  },
  {
    videoId: "Cd9pc4xzTmU",
    date: "2023-09-11",
    title: "700 Subscriber Special Tournament",
    youtubeTitle: `Rocket League Live Stream | 🔴 700 SUBSCRIBER SPECIAL TOURNAMENT?! 🔴 | Evening Stream`,
    duration: "1:03:20",
    playlistIndex: 68,
    participants: []
  },
  {
    videoId: "7DmLlfXaKAQ",
    date: "2023-08-13",
    title: "550 Subs Special Tourney — Part 2",
    youtubeTitle: `Rocket League Live Stream | 🔴 550 SUBS SPECIAL TOURNEY! (2) 🔴 | Late Afternoon Stream`,
    duration: "1:38:36",
    playlistIndex: 70,
    participants: []
  },
  {
    videoId: "vaefo58Phxs",
    date: "2023-08-12",
    title: "550 Subs Special Tourney — Part 1",
    youtubeTitle: `Rocket League Live Stream | 🔴 550 SUBS SPECIAL TOURNEY! (1) 🔴 | Late Afternoon Stream`,
    duration: "28:37",
    playlistIndex: 71,
    participants: []
  },
  {
    videoId: "uF_aRPNXF5k",
    date: "2023-07-23",
    title: "500 Subscriber Special Tourneys",
    youtubeTitle: `Rocket League Live Stream | 🔴 500 SUBSCRIBER SPECIAL TOURNEYS! 🔴 | Evening Stream`,
    duration: "1:26:09",
    playlistIndex: 72,
    participants: []
  },
  {
    videoId: "ZAW94J7Llmo",
    date: "2023-07-01",
    title: "450 Live Sub Special",
    youtubeTitle: `Rocket League Live Stream | 🔴 450 LIVE SUB SPECIAL! 🔴 | Evening Stream`,
    duration: "2:06:40",
    playlistIndex: 74,
    needsReview: true,
    participants: []
  },
  {
    videoId: "IZwI37f75Hs",
    date: "2023-05-29",
    title: "350 Subscriber Special Tournament",
    youtubeTitle: `Rocket League Live Stream | 🔴 Tournament Time! / 350 SUBSCRIBER SPECIAL! 🔴 | Evening Stream`,
    duration: "1:57:03",
    playlistIndex: 77,
    participants: []
  },
  {
    videoId: "WjFAwVIQxWM",
    date: "2023-05-14",
    title: "300 Sub Special Tournament",
    youtubeTitle: `Rocket League Live Stream | 🔴 300 SUB SPECIAL TOURNAMENT! 🔴 | Evening Stream`,
    duration: "3:04:24",
    playlistIndex: 78,
    participants: []
  },
  {
    videoId: "r-5KQTf9vzg",
    date: "2023-05-08",
    title: "250 Sub Special Tournament",
    youtubeTitle: `Rocket League Live Stream | 🔴 250 SUB SPECIAL! RL Tournament?! 🔴 | Late Evening Stream`,
    duration: "1:52:24",
    playlistIndex: 79,
    participants: []
  },
  {
    videoId: "r7Wt3PbrXfc",
    date: "2023-03-04",
    title: "2v2 Tournament Sub Special",
    youtubeTitle: `Rocket League Live Stream | 2v2 TOURNAMENT, SUB SPECIAL?! | Rocket League`,
    duration: "3:04:41",
    playlistIndex: 87,
    participants: []
  },
  {
    videoId: "EJjWwzyxkro",
    date: "2023-03-03",
    title: "2v2 and 1v1 Tournament Sub Special",
    youtubeTitle: `Rocket League Live Stream | 2v2, 1v1 TOURNAMENT, SUB SPECIAL?! | Rocket League`,
    duration: "3:26:45",
    playlistIndex: 88,
    participants: []
  },
  {
    videoId: "_HbmeTTfWdI",
    date: "2023-02-11",
    title: "150 Tournament Sub Game Special — Day 2",
    youtubeTitle: `Rocket League Live Stream | 150 TOURNAMENT SUB GAME SPECIAL! | Rocket League`,
    duration: "5:03:45",
    playlistIndex: 91,
    participants: []
  },
  {
    videoId: "-ozT-I6U0Kw",
    date: "2023-02-10",
    title: "150 Sub Game Tournament Special — Day 1",
    youtubeTitle: `Rocket League Live Stream | 150 SUB GAME TOURNAMENT SPECIAL! | Rocket League`,
    duration: "2:19:03",
    playlistIndex: 92,
    participants: []
  },
  {
    videoId: "uyc_fC7iV6I",
    date: "2023-01-27",
    title: "Sub Tournaments and Final Sub Special",
    youtubeTitle: `Rocket League Live Stream | SUB TOURNAMENTS! / LAST SUB SPECIAL OF THE DAY! | Rocket League`,
    duration: "2:36:59",
    playlistIndex: 95,
    participants: []
  },
  {
    videoId: "KlMWUChED9Y",
    date: "2023-01-05",
    title: "75 Subscriber Special Tournaments",
    youtubeTitle: `Rocket League Live Stream | 75 SUBSCRIBER SPECIAL! / 1v1S / TOURNAMENTS! / SUB GAMES!| Rocket League`,
    duration: "4:43:05",
    playlistIndex: 101,
    participants: []
  }
];

const archiveColors = ["#36d8ff", "#8b5dff", "#ff3f9f", "#ffe76a"];

const researchEvents = Array.isArray(tournamentParticipantResearch)
  ? tournamentParticipantResearch
  : [];
const researchByVideo = new Map(researchEvents.map((event) => [event.videoId, event]));

function recoveredParticipant(entry) {
  return {
    name: entry.name,
    handle: entry.gameId || entry.handle || "Archived participant",
    youtubeHandle: entry.handle || "",
    gameId: entry.gameId || "",
    placement: "Participant",
    title: "",
    achievement: "",
    avatar: "",
    certificate: "",
    evidence: entry.evidence || "Recovered from the public live-chat replay.",
    verification: "chat-evidence"
  };
}

function mergeParticipants(recovered, manual) {
  const merged = new Map();

  recovered.forEach((participant) => {
    merged.set(participant.name.trim().toLowerCase(), participant);
  });

  (manual || []).forEach((participant) => {
    const key = String(participant.name || "").trim().toLowerCase();
    if (!key) return;
    const existing = merged.get(key) || {};
    merged.set(key, { ...existing, ...participant, verification: participant.verification || "official" });
  });

  return [...merged.values()];
}

const archiveEvents = tournamentUploads.map((upload, index) => {
  const research = researchByVideo.get(upload.videoId);
  const recovered = (research?.confirmed || []).map(recoveredParticipant);

  return {
    ...upload,
    id: `youtube-${upload.videoId}`,
    game: "Rocket League",
    streamUrl: `https://www.youtube.com/watch?v=${upload.videoId}&list=${TOURNAMENT_PLAYLIST_ID}`,
    streamLabel: "Watch past stream",
    summary: upload.needsReview
      ? "This upload matched the requested ‘Sub Special’ keyword, but its title does not explicitly say Tournament. Review it before publishing the final archive."
      : "Official Duffball16 tournament playlist upload. The participant records below were recovered from public tournament evidence; official results and titles can be added as they are confirmed.",
    image: `https://i.ytimg.com/vi/${upload.videoId}/hqdefault.jpg`,
    accent: archiveColors[index % archiveColors.length],
    participants: mergeParticipants(recovered, upload.participants),
    possibleParticipants: research?.likely || [],
    rosterNotes: research?.notes || "No participant research note is available for this upload.",
    sample: false
  };
});

/* End of the section you normally need to edit. */

const timeline = document.querySelector("[data-timeline]");
const searchInput = document.querySelector("[data-search]");
const yearFilter = document.querySelector("[data-year-filter]");
const titleFilter = document.querySelector("[data-title-filter]");
const sortButton = document.querySelector("[data-sort-order]");
const sortLabel = document.querySelector("[data-sort-label]");
const jumpSelect = document.querySelector("[data-jump-select]");
const jumpButton = document.querySelector("[data-jump-button]");
const resultCount = document.querySelector("[data-result-count]");
const titleCloud = document.querySelector("[data-title-cloud]");
const emptyState = document.querySelector("[data-empty-state]");
const certificateDialog = document.querySelector("[data-certificate-dialog]");
const certificateScale = document.querySelector("[data-certificate-scale]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const openCertificateLink = document.querySelector("[data-open-certificate]");
const backToTop = document.querySelector("[data-back-to-top]");

const state = {
  query: "",
  year: "all",
  title: "all",
  newestFirst: true,
  zoom: 1
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric"
});

const monthFormatter = new Intl.DateTimeFormat("en-GB", { month: "short" });

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;"
  })[character]);
}

function safeColor(value, fallback = "#36d8ff") {
  return /^#[0-9a-f]{6}$/i.test(String(value)) ? value : fallback;
}

function safeId(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || `event-${Math.random().toString(36).slice(2, 8)}`;
}

function eventDate(event) {
  return new Date(`${event.date}T12:00:00`);
}

function initials(name) {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function allParticipants() {
  return archiveEvents.flatMap((event) => event.participants || []);
}

function participantAwards(participant) {
  if (Array.isArray(participant.awards) && participant.awards.length) {
    return participant.awards.filter((award) => award && award.title);
  }

  if (participant.title) {
    return [{
      title: participant.title,
      achievement: participant.achievement || "",
      certificate: participant.certificate || ""
    }];
  }

  return [];
}

function titleCounts() {
  return allParticipants().reduce((counts, participant) => {
    participantAwards(participant).forEach((award) => {
      counts.set(award.title, (counts.get(award.title) || 0) + 1);
    });
    return counts;
  }, new Map());
}

function setArchiveStats() {
  const participants = allParticipants();
  const uniquePeople = new Set(participants.map((person) => person.name.trim().toLowerCase()));
  const years = new Set(archiveEvents.map((event) => String(eventDate(event).getFullYear())));

  document.querySelector("[data-stat-events]").textContent = archiveEvents.length;
  document.querySelector("[data-stat-people]").textContent = uniquePeople.size;
  document.querySelector("[data-stat-titles]").textContent = participants.reduce(
    (total, participant) => total + participantAwards(participant).length,
    0
  );
  document.querySelector("[data-stat-years]").textContent = years.size;
}

function fillFilters() {
  const years = [...new Set(archiveEvents.map((event) => eventDate(event).getFullYear()))]
    .sort((a, b) => b - a);

  yearFilter.insertAdjacentHTML(
    "beforeend",
    years.map((year) => `<option value="${year}">${year}</option>`).join("")
  );

  const titles = [...titleCounts().keys()].sort((a, b) => a.localeCompare(b));
  titleFilter.insertAdjacentHTML(
    "beforeend",
    titles.map((title) => `<option value="${escapeHTML(title)}">${escapeHTML(title)}</option>`).join("")
  );
}

function renderTitleCloud() {
  const counts = [...titleCounts().entries()].sort((a, b) => a[0].localeCompare(b[0]));
  if (!counts.length) {
    titleCloud.innerHTML = '<span class="title-cloud-empty">Titles will appear here under; more will be added as participant awards are earned.</span>';
    return;
  }

  titleCloud.innerHTML = counts
    .map(([title, count]) => `
      <button
        class="title-chip${state.title === title ? " active" : ""}"
        type="button"
        data-title-chip="${escapeHTML(title)}"
        aria-pressed="${state.title === title}"
      >
        <span>${escapeHTML(title)}</span><b>${count}</b>
      </button>
    `)
    .join("");
}

function participantText(participant) {
  const awards = participantAwards(participant)
    .flatMap((award) => [award.title, award.achievement])
    .join(" ");

  return [
    participant.name,
    participant.handle,
    participant.youtubeHandle,
    participant.gameId,
    participant.placement,
    participant.evidence,
    awards
  ].join(" ").toLowerCase();
}

function eventText(event) {
  const possibleParticipantText = (event.possibleParticipants || [])
    .flatMap((participant) => [participant.name, participant.handle, participant.gameId, participant.evidence])
    .join(" ");

  return [
    event.title,
    event.youtubeTitle,
    event.game,
    event.summary,
    event.rosterNotes,
    possibleParticipantText,
    event.date,
    event.duration,
    event.playlistIndex
  ].join(" ").toLowerCase();
}

function visibleParticipantsFor(event) {
  const participants = event.participants || [];
  const query = state.query.trim().toLowerCase();
  const eventMatchesQuery = eventText(event).includes(query);

  return participants.filter((participant) => {
    const titleMatches = state.title === "all" || participantAwards(participant)
      .some((award) => award.title === state.title);
    const queryMatches = !query || eventMatchesQuery || participantText(participant).includes(query);
    return titleMatches && queryMatches;
  });
}

function filteredEvents() {
  return archiveEvents
    .map((event) => ({ event, participants: visibleParticipantsFor(event) }))
    .filter(({ event, participants }) => {
      const yearMatches = state.year === "all" || String(eventDate(event).getFullYear()) === state.year;
      const query = state.query.trim().toLowerCase();
      const searchMatches = !query || eventText(event).includes(query) || participants.length > 0;
      const titleMatches = state.title === "all" || participants.length > 0;
      return yearMatches && searchMatches && titleMatches;
    })
    .sort((a, b) => {
      const difference = eventDate(b.event) - eventDate(a.event);
      return state.newestFirst ? difference : -difference;
    });
}

function participantCard(event, participant, participantIndex, visibleIndex) {
  const color = safeColor(participant.accent, safeColor(event.accent));
  const allAwards = participantAwards(participant);
  const shownAwards = state.title === "all"
    ? allAwards
    : allAwards.filter((award) => award.title === state.title);
  const avatar = participant.avatar
    ? `<img src="${escapeHTML(participant.avatar)}" alt="${escapeHTML(participant.name)}" loading="lazy" />`
    : `<span aria-hidden="true">${escapeHTML(initials(participant.name))}</span>`;
  const archiveId = `${eventDate(event).getFullYear()}-${String(participantIndex + 1).padStart(3, "0")}`;
  const primaryIdentity = participant.gameId
    ? `Epic: ${participant.gameId}`
    : participant.youtubeHandle || participant.handle || "Duffinian";
  const secondaryIdentity = participant.gameId && participant.youtubeHandle
    ? participant.youtubeHandle
    : "";
  const verificationLabel = participant.verification === "official"
    ? "OFFICIAL RECORD"
    : "RECOVERED FROM LIVE CHAT";
  // Keep the detailed research evidence in the data for searching and
  // verification, but show a short, consistent description on every card.
  const participantDescription = participant.description === ""
    ? ""
    : participant.description || "Joined Via Livechat";
  const awards = shownAwards.length
    ? shownAwards.map((award) => {
      const awardIndex = allAwards.indexOf(award);
      return `
        <div class="award-record">
          <div class="earned-title">
            <span>TITLE EARNED</span>
            <strong>${escapeHTML(award.title)}</strong>
          </div>
          <p class="achievement-copy">${escapeHTML(award.achievement || participant.placement || "Official Duffine Tourney honour.")}</p>
          <button
            class="certificate-button"
            type="button"
            data-open-certificate-btn
            data-event-id="${escapeHTML(event.id)}"
            data-participant-index="${participantIndex}"
            data-award-index="${awardIndex}"
          >
            <span>${award.certificate ? "View title artwork" : "View generated title"}</span>
            <span aria-hidden="true">⌕</span>
          </button>
        </div>
      `;
    }).join("")
    : `<p class="no-title-record">PARTICIPANT RECORD — NO TITLE ADDED</p>`;

  return `
    <article class="participant-card" style="--card-accent:${color}">
      <div class="card-topline">
        <span>ENTRY ${String(visibleIndex + 1).padStart(2, "0")}</span>
        <span>D16-${archiveId}</span>
      </div>
      <div class="participant-avatar">${avatar}</div>
      <div class="participant-info">
        <h5 title="${escapeHTML(participant.name)}">${escapeHTML(participant.name)}</h5>
        <span>${escapeHTML(primaryIdentity)}</span>
        ${secondaryIdentity ? `<span>${escapeHTML(secondaryIdentity)}</span>` : ""}
        <small class="verification-tag">${verificationLabel}</small>
        ${participantDescription ? `<p class="participant-evidence">${escapeHTML(participantDescription)}</p>` : ""}
      </div>
      <div class="award-list">${awards}</div>
    </article>
  `;
}

function eventChapter(event, visibleParticipants) {
  const date = eventDate(event);
  const color = safeColor(event.accent);
  const day = String(date.getDate()).padStart(2, "0");
  const month = monthFormatter.format(date).toUpperCase();
  const year = date.getFullYear();
  const eventId = safeId(event.id);
  const stream = event.streamUrl
    ? `<a class="stream-link" href="${escapeHTML(event.streamUrl)}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▶</span>${escapeHTML(event.streamLabel || "Watch past stream")}</a>`
    : `<span class="stream-link disabled"><span aria-hidden="true">▶</span>${escapeHTML(event.streamLabel || "Stream link coming soon")}</span>`;

  const participantCards = visibleParticipants
    .map((participant, index) => participantCard(event, participant, event.participants.indexOf(participant), index))
    .join("") || `
      <div class="roster-placeholder">
        <span aria-hidden="true">?</span>
        <strong>No confirmed roster recovered</strong>
        <p>${escapeHTML(event.rosterNotes || "This stream needs a visual bracket or scoreboard review.")}</p>
      </div>
    `;
  const possibleRoster = (event.possibleParticipants || []).length
    ? `
      <aside class="possible-roster" aria-label="Possible participants needing confirmation">
        <div>
          <small>NEEDS DUFFBALL16'S CONFIRMATION</small>
          <strong>Possible participants found in chat</strong>
          <p>These names had signup, invite, or ambiguous tournament evidence, so they are not counted as confirmed cards yet.</p>
        </div>
        <div class="possible-chips">
          ${(event.possibleParticipants || []).map((participant) => `
            <span class="possible-chip" title="${escapeHTML(participant.evidence || "Needs review")}">
              ${escapeHTML(participant.name)}${participant.gameId ? ` · ${escapeHTML(participant.gameId)}` : ""}
            </span>
          `).join("")}
        </div>
      </aside>
    `
    : "";

  return `
    <article class="timeline-event" id="${eventId}" style="--event-accent:${color}">
      <div class="timeline-node" aria-hidden="true"><span>${year}</span><i></i></div>
      <div class="event-panel">
        <div class="event-header">
          <div class="event-date"><strong>${day}</strong><span>${month}<br />${year}</span></div>
          <div class="event-title-block">
            <small>${escapeHTML(event.game || "Duffine Tourney")}</small>
            <h3>
              ${escapeHTML(event.title)}
              ${event.sample ? '<span class="sample-badge">SAMPLE DATA</span>' : ""}
              ${event.needsReview ? '<span class="sample-badge">CHECK EVENT</span>' : ""}
            </h3>
          </div>
          ${stream}
        </div>

        <div class="event-showcase">
          <div class="event-art">
            <img src="${escapeHTML(event.image || "assets/archive-hero.png")}" alt="" loading="lazy" />
            <div class="event-art-label"><small>ARCHIVED CHAPTER</small><strong>${escapeHTML(dateFormatter.format(date))}</strong></div>
          </div>
          <div class="event-story">
            <small>THE STORY OF THIS STREAM</small>
            <h4>${escapeHTML(event.title)}</h4>
            <p>${escapeHTML(event.summary || "Add the story and most memorable moments from this Tourney here.")}</p>
            <ul class="event-facts">
              <li>${visibleParticipants.length} confirmed ${visibleParticipants.length === 1 ? "participant" : "participants"} shown</li>
              ${(event.possibleParticipants || []).length ? `<li>${event.possibleParticipants.length} possible ${(event.possibleParticipants || []).length === 1 ? "name" : "names"} to review</li>` : ""}
              ${event.duration ? `<li>${escapeHTML(event.duration)} stream</li>` : ""}
              ${event.playlistIndex ? `<li>Playlist #${escapeHTML(event.playlistIndex)}</li>` : ""}
            </ul>
          </div>
        </div>

        <div class="roster-header">
          <div><small>PARTICIPANT ARCHIVE</small><h4>Meet this chapter's Duffinians</h4></div>
          <div class="rail-controls" aria-label="Move through participant cards">
            <button type="button" data-scroll-left aria-label="Previous participant">←</button>
            <button type="button" data-scroll-right aria-label="Next participant">→</button>
          </div>
        </div>
        <div class="participant-rail">${participantCards}</div>
        ${possibleRoster}
      </div>
    </article>
  `;
}

function renderJumpMenu(items) {
  const previousValue = jumpSelect.value;
  jumpSelect.innerHTML = '<option value="">Choose a Tourney…</option>' + items
    .map(({ event }) => {
      const year = eventDate(event).getFullYear();
      return `<option value="${escapeHTML(safeId(event.id))}">${year} — ${escapeHTML(event.title)}</option>`;
    })
    .join("");

  if ([...jumpSelect.options].some((option) => option.value === previousValue)) {
    jumpSelect.value = previousValue;
  }
}

function renderArchive() {
  const items = filteredEvents();
  timeline.innerHTML = items.map(({ event, participants }) => eventChapter(event, participants)).join("");
  resultCount.textContent = items.length;
  emptyState.hidden = items.length !== 0;
  renderJumpMenu(items);
  renderTitleCloud();
}

function clearFilters() {
  state.query = "";
  state.year = "all";
  state.title = "all";
  searchInput.value = "";
  yearFilter.value = "all";
  titleFilter.value = "all";
  renderArchive();
}

function jumpToSelectedEvent() {
  if (!jumpSelect.value) return;
  document.getElementById(jumpSelect.value)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setZoom(nextZoom) {
  state.zoom = Math.min(2.5, Math.max(0.75, nextZoom));
  certificateScale.style.transform = `scale(${state.zoom})`;
  document.querySelector("[data-zoom-label]").textContent = `${Math.round(state.zoom * 100)}%`;
}

function generatedCertificate(event, participant, award, participantIndex, awardIndex) {
  const fragment = document.querySelector("#generated-certificate-template").content.cloneNode(true);
  fragment.querySelector("[data-certificate-name]").textContent = participant.name;
  fragment.querySelector("[data-certificate-title]").textContent = award.title;
  fragment.querySelector("[data-certificate-achievement]").textContent = award.achievement || participant.placement || "Official Duffine Tourney honour";
  fragment.querySelector("[data-certificate-event]").textContent = event.title;
  fragment.querySelector("[data-certificate-date]").textContent = dateFormatter.format(eventDate(event));
  fragment.querySelector("[data-certificate-id]").textContent = `D16-${eventDate(event).getFullYear()}-${String(participantIndex + 1).padStart(3, "0")}-${awardIndex + 1}`;
  return fragment;
}

function openCertificate(eventId, participantIndex, awardIndex) {
  const event = archiveEvents.find((entry) => String(entry.id) === eventId);
  const participant = event?.participants?.[participantIndex];
  const award = participant ? participantAwards(participant)[awardIndex] : null;
  if (!event || !participant || !award) return;

  certificateScale.replaceChildren();
  dialogTitle.textContent = `${participant.name} — ${award.title}`;

  if (award.certificate) {
    const image = document.createElement("img");
    image.src = award.certificate;
    image.alt = `${award.title} certificate for ${participant.name}`;
    certificateScale.append(image);
    openCertificateLink.href = award.certificate;
    openCertificateLink.hidden = false;
  } else {
    certificateScale.append(generatedCertificate(event, participant, award, participantIndex, awardIndex));
    openCertificateLink.hidden = true;
    openCertificateLink.removeAttribute("href");
  }

  setZoom(1);
  certificateDialog.showModal();
}

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderArchive();
});

yearFilter.addEventListener("change", (event) => {
  state.year = event.target.value;
  renderArchive();
});

titleFilter.addEventListener("change", (event) => {
  state.title = event.target.value;
  renderArchive();
});

sortButton.addEventListener("click", () => {
  state.newestFirst = !state.newestFirst;
  sortButton.setAttribute("aria-pressed", String(!state.newestFirst));
  sortLabel.textContent = state.newestFirst ? "Newest first" : "Oldest first";
  renderArchive();
});

document.querySelectorAll("[data-clear-filters]").forEach((button) => {
  button.addEventListener("click", clearFilters);
});

titleCloud.addEventListener("click", (event) => {
  const chip = event.target.closest("[data-title-chip]");
  if (!chip) return;
  const selectedTitle = chip.dataset.titleChip;
  state.title = state.title === selectedTitle ? "all" : selectedTitle;
  titleFilter.value = state.title;
  renderArchive();
  document.querySelector("[data-timeline]").scrollIntoView({ behavior: "smooth", block: "start" });
});

jumpButton.addEventListener("click", jumpToSelectedEvent);
jumpSelect.addEventListener("change", jumpToSelectedEvent);

timeline.addEventListener("click", (event) => {
  const certificateButton = event.target.closest("[data-open-certificate-btn]");
  if (certificateButton) {
    openCertificate(
      certificateButton.dataset.eventId,
      Number(certificateButton.dataset.participantIndex),
      Number(certificateButton.dataset.awardIndex)
    );
    return;
  }

  const scrollButton = event.target.closest("[data-scroll-left], [data-scroll-right]");
  if (!scrollButton) return;
  const rail = scrollButton.closest(".event-panel").querySelector(".participant-rail");
  const direction = scrollButton.matches("[data-scroll-left]") ? -1 : 1;
  rail.scrollBy({ left: direction * Math.max(280, rail.clientWidth * 0.76), behavior: "smooth" });
});

document.querySelector("[data-dialog-close]").addEventListener("click", () => certificateDialog.close());
document.querySelector("[data-zoom-out]").addEventListener("click", () => setZoom(state.zoom - 0.25));
document.querySelector("[data-zoom-in]").addEventListener("click", () => setZoom(state.zoom + 0.25));
document.querySelector("[data-zoom-reset]").addEventListener("click", () => setZoom(1));

certificateDialog.addEventListener("click", (event) => {
  if (event.target === certificateDialog) certificateDialog.close();
});

document.querySelector("[data-dismiss-demo]").addEventListener("click", () => {
  document.querySelector("[data-demo-notice]").hidden = true;
});

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 700);
}, { passive: true });

document.querySelector("[data-year]").textContent = new Date().getFullYear();
setArchiveStats();
fillFilters();
renderArchive();
