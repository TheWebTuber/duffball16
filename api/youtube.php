<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$apiKey = "AIzaSyDQzjv3EHmUqzgNoodAtoLd2x242L8JfVg";
$channelId = "UC9qjQyYl8Xo2sKZt3n7mL5w"; // DUFFBALL16 channel ID

// Get channel stats
$statsUrl = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id={$channelId}&key={$apiKey}";
$statsResponse = file_get_contents($statsUrl);
$statsData = json_decode($statsResponse, true);

if (!isset($statsData["items"][0])) {
    echo json_encode([
        "error" => "Channel not found"
    ]);
    exit;
}

$stats = $statsData["items"][0]["statistics"];

// Check if channel is live
$liveUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId={$channelId}&eventType=live&type=video&key={$apiKey}";
$liveResponse = file_get_contents($liveUrl);
$liveData = json_decode($liveResponse, true);

$isLive = isset($liveData["items"]) && count($liveData["items"]) > 0;

echo json_encode([
    "subs" => $stats["subscriberCount"] ?? "0",
    "views" => $stats["viewCount"] ?? "0",
    "videos" => $stats["videoCount"] ?? "0",
    "live" => $isLive,
    "updated" => date("H:i")
]);