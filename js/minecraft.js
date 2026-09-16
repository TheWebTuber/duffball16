const statusBox = document.getElementById('status');
const infoBox = document.getElementById('server-info');
const playerList = document.getElementById('players');

const SERVER_IP = 'mc.duffball16.com';
const JAVA_PORT = 25565;
const BEDROCK_PORT = 19133;
const STATUS_REFRESH_MS = 60000;
const STATUS_TIMEOUT_MS = 10000;

/*
  Optional manual override for known compatibility/maintenance problems.
  Leave an edition as null for normal automatic detection.

  Example for a future known Bedrock compatibility problem:
  bedrock: {
    state: 'offline',
    reason: 'Waiting for Geyser/Floodgate support for Minecraft 26.3.'
  }
*/
const MANUAL_STATUS_OVERRIDE = {
  java: null,
  bedrock: null
};

function editionName(edition) {
  return edition === 'java' ? 'Java' : 'Bedrock';
}

async function fetchEditionStatus(edition, port) {
  const override = MANUAL_STATUS_OVERRIDE[edition];
  if (override) {
    return {
      edition,
      state: override.state,
      data: null,
      reason: override.reason || ''
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), STATUS_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://api.mcstatus.io/v2/status/${edition}/${SERVER_IP}:${port}`,
      { signal: controller.signal, cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`${edition} status API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      edition,
      state: data.online ? 'online' : 'offline',
      data,
      reason: ''
    };
  } catch (error) {
    console.error(`Could not check ${edition} status`, error);
    return {
      edition,
      state: 'unknown',
      data: null,
      reason: 'The live status check could not be completed.'
    };
  } finally {
    clearTimeout(timeout);
  }
}

function getEditionCopy(edition, result) {
  const name = editionName(edition);

  if (result.state === 'online') {
    return {
      stateLabel: 'ONLINE',
      title: `${name} players can join now`,
      message: edition === 'java'
        ? 'The Java server endpoint is responding normally.'
        : 'The Bedrock / Geyser endpoint is responding normally.',
      badge: `ONLINE — ${name} players can join now`
    };
  }

  if (result.state === 'offline') {
    const reason = result.reason ? ` ${result.reason}` : '';
    return {
      stateLabel: 'UNAVAILABLE',
      title: `${name} cannot join right now`,
      message: `${name} access is currently unavailable.${reason} Please wait for an update in Discord before trying again.`,
      badge: `UNAVAILABLE — Wait for the Discord update`
    };
  }

  return {
    stateLabel: 'UNKNOWN',
    title: `${name} status could not be confirmed`,
    message: 'The automatic status check failed. Check Discord/community updates before joining.',
    badge: `STATUS UNKNOWN — Check Discord before joining`
  };
}

function setEditionUI(edition, result) {
  const copy = getEditionCopy(edition, result);
  const stateClass = result.state === 'online'
    ? 'edition-available'
    : result.state === 'offline'
      ? 'edition-unavailable'
      : 'edition-unknown';

  document.querySelectorAll(`[data-edition-card="${edition}"]`).forEach((card) => {
    card.classList.remove('edition-available', 'edition-unavailable', 'edition-unknown');
    card.classList.add(stateClass);
  });

  document.querySelectorAll(`[data-edition-status="${edition}"]`).forEach((badge) => {
    badge.classList.remove('edition-status-checking', 'edition-status-online', 'edition-status-offline', 'edition-status-unknown');
    badge.classList.add(
      result.state === 'online'
        ? 'edition-status-online'
        : result.state === 'offline'
          ? 'edition-status-offline'
          : 'edition-status-unknown'
    );

    const text = badge.querySelector('strong');
    if (text) text.textContent = copy.badge;
  });

  const availabilityCard = document.getElementById(`${edition}-live-card`);
  const availabilityState = document.getElementById(`${edition}-live-state`);
  const availabilityTitle = document.getElementById(`${edition}-live-title`);
  const availabilityMessage = document.getElementById(`${edition}-live-message`);

  if (availabilityCard) {
    availabilityCard.classList.remove('availability-checking', 'availability-online', 'availability-offline', 'availability-unknown');
    availabilityCard.classList.add(`availability-${result.state}`);
  }
  if (availabilityState) availabilityState.textContent = copy.stateLabel;
  if (availabilityTitle) availabilityTitle.textContent = copy.title;
  if (availabilityMessage) availabilityMessage.textContent = copy.message;

  const fact = document.querySelector(`[data-edition-fact="${edition}"]`);
  if (fact) {
    fact.classList.remove('fact-online', 'fact-offline', 'fact-unknown');
    fact.classList.add(`fact-${result.state}`);
  }
}

function playerInfo(javaResult, bedrockResult) {
  const sources = [javaResult, bedrockResult].filter((r) => r.state === 'online' && r.data);
  const names = new Set();

  sources.forEach((result) => {
    const list = result.data?.players?.list;
    if (Array.isArray(list)) {
      list.forEach((player) => {
        const name = player?.name_raw || player?.name_clean || player?.name;
        if (name) names.add(name);
      });
    }
  });

  // Java and Bedrock share the same SMP world, so do not add both counters together.
  // Prefer Java's count when available and otherwise use Bedrock's count.
  const javaCount = javaResult.state === 'online' ? Number(javaResult.data?.players?.online) : NaN;
  const bedrockCount = bedrockResult.state === 'online' ? Number(bedrockResult.data?.players?.online) : NaN;
  const reportedCount = Number.isFinite(javaCount)
    ? javaCount
    : Number.isFinite(bedrockCount)
      ? bedrockCount
      : names.size;

  return { names, reportedCount };
}

function updatePlayers(javaResult, bedrockResult) {
  const anyOnline = javaResult.state === 'online' || bedrockResult.state === 'online';

  if (!anyOnline) {
    infoBox?.classList.add('hidden');
    if (playerList) playerList.innerHTML = '';
    return 0;
  }

  const { names, reportedCount } = playerInfo(javaResult, bedrockResult);
  infoBox?.classList.remove('hidden');

  if (playerList) {
    playerList.innerHTML = '';

    if (names.size > 0) {
      names.forEach((name) => {
        const li = document.createElement('li');
        li.textContent = name;
        playerList.appendChild(li);
      });
    } else if (reportedCount > 0) {
      const li = document.createElement('li');
      li.textContent = `${reportedCount} player(s) online — names are not exposed by the server status response`;
      playerList.appendChild(li);
    } else {
      playerList.innerHTML = '<li>No players online</li>';
    }
  }

  return reportedCount;
}

function updateOverallStatus(javaResult, bedrockResult, playerCount) {
  const javaOnline = javaResult.state === 'online';
  const bedrockOnline = bedrockResult.state === 'online';
  const javaOffline = javaResult.state === 'offline';
  const bedrockOffline = bedrockResult.state === 'offline';
  const unknown = javaResult.state === 'unknown' || bedrockResult.state === 'unknown';

  const heroAccess = document.getElementById('hero-access-state');
  const networkSummary = document.getElementById('network-status-summary');

  if (javaOnline && bedrockOnline) {
    if (statusBox) {
      statusBox.textContent = `✅ Java + Bedrock ONLINE${playerCount >= 0 ? ` • ${playerCount} player(s)` : ''}`;
      statusBox.className = 'status-box hero-status status-online';
    }
    if (heroAccess) heroAccess.textContent = 'Java + Bedrock';
    if (networkSummary) networkSummary.textContent = 'JAVA + BEDROCK';
    return;
  }

  if (javaOnline && bedrockOffline) {
    if (statusBox) {
      statusBox.textContent = '🟢 Java PLAYABLE • 🔴 Bedrock UNAVAILABLE';
      statusBox.className = 'status-box hero-status status-partial';
    }
    if (heroAccess) heroAccess.textContent = 'Java only';
    if (networkSummary) networkSummary.textContent = 'JAVA ONLY';
    return;
  }

  if (bedrockOnline && javaOffline) {
    if (statusBox) {
      statusBox.textContent = '🔴 Java UNAVAILABLE • 🟢 Bedrock PLAYABLE';
      statusBox.className = 'status-box hero-status status-partial';
    }
    if (heroAccess) heroAccess.textContent = 'Bedrock only';
    if (networkSummary) networkSummary.textContent = 'BEDROCK ONLY';
    return;
  }

  if (javaOffline && bedrockOffline) {
    if (statusBox) {
      statusBox.textContent = '🔴 Java + Bedrock currently UNAVAILABLE';
      statusBox.className = 'status-box hero-status status-offline';
    }
    if (heroAccess) heroAccess.textContent = 'Unavailable';
    if (networkSummary) networkSummary.textContent = 'NO EDITION AVAILABLE';
    return;
  }

  if (unknown) {
    const knownPlayable = javaOnline ? 'Java appears online' : bedrockOnline ? 'Bedrock appears online' : '';
    if (statusBox) {
      statusBox.textContent = knownPlayable
        ? `⚠️ ${knownPlayable} • Other edition status unknown`
        : '⚠️ Java / Bedrock status could not be fully confirmed';
      statusBox.className = 'status-box hero-status status-maintenance';
    }
    if (heroAccess) heroAccess.textContent = javaOnline ? 'Java (Bedrock unknown)' : bedrockOnline ? 'Bedrock (Java unknown)' : 'Check status';
    if (networkSummary) networkSummary.textContent = javaOnline ? 'JAVA / BEDROCK UNKNOWN' : bedrockOnline ? 'BEDROCK / JAVA UNKNOWN' : 'STATUS UNKNOWN';
  }
}

function updateLastChecked() {
  const lastChecked = document.getElementById('status-last-checked');
  if (!lastChecked) return;

  lastChecked.textContent = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date());
}

async function fetchStatus() {
  const [javaResult, bedrockResult] = await Promise.all([
    fetchEditionStatus('java', JAVA_PORT),
    fetchEditionStatus('bedrock', BEDROCK_PORT)
  ]);

  setEditionUI('java', javaResult);
  setEditionUI('bedrock', bedrockResult);

  const playerCount = updatePlayers(javaResult, bedrockResult);
  updateOverallStatus(javaResult, bedrockResult, playerCount);
  updateLastChecked();
}

fetchStatus();
setInterval(fetchStatus, STATUS_REFRESH_MS);
