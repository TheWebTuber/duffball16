const subscribersEl = document.getElementById("subscribers");
const viewsEl = document.getElementById("views");
const videosEl = document.getElementById("videos");
const liveEl = document.getElementById("liveStatus");
const updatedEl = document.getElementById("updated");
const clockEl = document.getElementById("clock");
const goalFill = document.getElementById("goalFill");
const goalText = document.getElementById("goalText");

let lastStats = { subs: 0, views: 0, videos: 0 };
let firstLoad = true;

function formatFullNumber(num) {
  return Number(num).toLocaleString();
}

function animateValue(el, start, end, duration = 800) {
  const range = end - start;

  if (range === 0) {
    el.textContent = formatFullNumber(end);
    return;
  }

  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(start + range * progress);

    el.textContent = formatFullNumber(value);

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function updateClock() {
  const now = new Date();

  clockEl.textContent = now.toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function updateGoal(subs) {
  subs = Number(subs);

  let goal = 100;
  if (subs >= 100) goal = 500;
  if (subs >= 500) goal = 1000;
  if (subs >= 1000) goal = 5000;
  if (subs >= 5000) goal = 10000;
  if (subs >= 10000) goal = 50000;
  if (subs >= 50000) goal = 100000;
  if (subs >= 100000) goal = 500000;
  if (subs >= 500000) goal = 1000000;

  const percent = Math.min((subs / goal) * 100, 100);

  goalFill.style.width = percent + "%";
  goalText.textContent = `${formatFullNumber(subs)} / ${formatFullNumber(goal)}`;
}

async function fetchStats() {
  try {
    const response = await fetch("../api/youtube.php");
    const data = await response.json();

    if (data.error) {
      liveEl.textContent = "API error";
      console.error(data);
      return;
    }

    const subs = Number(data.subs || 0);
    const views = Number(data.views || 0);
    const videos = Number(data.videos || 0);

    if (firstLoad) {
      subscribersEl.textContent = formatFullNumber(subs);
      viewsEl.textContent = formatFullNumber(views);
      videosEl.textContent = formatFullNumber(videos);
      firstLoad = false;
    } else {
      animateValue(subscribersEl, lastStats.subs, subs);
      animateValue(viewsEl, lastStats.views, views);
      animateValue(videosEl, lastStats.videos, videos);
    }

    updateGoal(subs);

    lastStats = { subs, views, videos };

    liveEl.textContent = data.live ? "🟢 LIVE" : "🔴 OFFLINE";
    updatedEl.textContent = data.updated || "--:--";

  } catch (error) {
    console.error("Error loading API:", error);
    liveEl.textContent = "Error";
  }
}

updateClock();
setInterval(updateClock, 1000);

fetchStats();
setInterval(fetchStats, 60000);