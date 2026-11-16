/* Duffball16 content supplied by CreatorPromote Hub; original categories and card layout retained. */
(() => {
  'use strict';

  let prettyDuration, validVideoId;
  const cfg = window.DUFFBALL_YOUTUBE || {};
  const status = document.getElementById('youtube-status');
  const refresh = document.getElementById('youtube-refresh');
  const grids = {
    streams: document.querySelector('[data-video-grid="streams"]'),
    videos: document.querySelector('[data-video-grid="videos"]'),
    shorts: document.querySelector('[data-video-grid="shorts"]')
  };
  const playlistGrids = {
    minecraft: document.querySelector('[data-playlist-grid="minecraft"]'),
    hollow: document.querySelector('[data-playlist-grid="hollow"]'),
    other: document.querySelector('[data-playlist-grid="other"]')
  };
  if (!status || !Object.values(grids).every(Boolean)) return;

  const perSection = Math.max(1, Math.min(12, Number(cfg.perSection) || 6));
  let watcher, busy = false, hasFeed = false, signature = '';

  function setStatus(message, state = '') {
    status.textContent = message;
    status.dataset.state = state;
  }

  function formatDate(iso) {
    if (!iso) return 'Watch on YouTube';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return 'Watch on YouTube';
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  }

  function addElement(tag, className, text, parent) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = text;
    if (parent) parent.appendChild(el);
    return el;
  }


  function renderPlaylistCard(item) {
    const a = addElement('a', 'playlist-card');
    a.href = `https://www.youtube.com/playlist?list=${encodeURIComponent(item.id)}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', `View playlist ${item.title} on YouTube`);

    const media = addElement('span', 'playlist-image', undefined, a);
    const url = String(item.thumbnail || '');
    if (/^https:\/\/(?:i\d?\.ytimg\.com|yt3\.googleusercontent\.com|i\.ytimg\.com)\//.test(url)) {
      const img = addElement('img', '', undefined, media);
      img.src = url;
      img.alt = `Playlist artwork: ${item.title}`;
      img.loading = 'lazy';
      img.decoding = 'async';
    }
    addElement('span', 'playlist-count', `${item.count} video${item.count === 1 ? '' : 's'}`, media);
    const info = addElement('span', 'playlist-info', undefined, a);
    addElement('strong', '', item.title, info);
    addElement('small', '', 'Duffball16 YouTube collection', info);
    addElement('span', 'playlist-link-text', 'Watch the series ↗', info);
    return a;
  }

  function renderPlaylistGroups(playlists) {
    if (!Object.values(playlistGrids).every(Boolean)) return;
    const labels = {
      minecraft: 'Minecraft or SMP',
      hollow: 'Hollow Knight',
      other: 'other'
    };
    const limits = { minecraft: 4, hollow: 4, other: 9 };
    for (const [topic, grid] of Object.entries(playlistGrids)) {
      grid.replaceChildren();
      const items = (Array.isArray(playlists) ? playlists : [])
        .filter(item => item.topic === topic)
        .slice(0, limits[topic]);
      if (items.length) {
        items.forEach(item => grid.appendChild(renderPlaylistCard(item)));
      } else {
        const message = topic === 'other'
          ? 'No other public playlists are currently available.'
          : `No public ${labels[topic]} playlist found right now. The section will fill in automatically if one is published.`;
        addElement('div', 'yt-empty', message, grid);
      }
    }
  }

  function renderCard(item) {
    const a = addElement('a', 'yt-card');
    a.href = `https://www.youtube.com/${item.kind === 'shorts' ? 'shorts/' : 'watch?v='}${item.id}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', `Watch ${item.title} on YouTube`);

    const thumb = addElement('span', 'yt-thumb', undefined, a);
    const image = addElement('img', '', undefined, thumb);
    image.src = `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;
    image.alt = `Thumbnail for ${item.title}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    addElement('span', 'yt-play', '▶', thumb).setAttribute('aria-hidden', 'true');
    if (item.isLive || item.upcoming) addElement('span', 'yt-flag', item.isLive ? '● Live now' : 'Scheduled', thumb);
    else if (item.seconds) addElement('span', 'yt-duration', prettyDuration(item.seconds), thumb);

    const body = addElement('span', 'yt-info', undefined, a);
    addElement('span', 'yt-kicker', item.isLive ? 'Live now' : item.upcoming ? 'Coming up' :
      item.unknownLive ? 'Livestream · status unavailable' : item.kind === 'streams' ? 'Livestream replay' : item.kind === 'shorts' ? 'Quick clip' : 'Gaming video', body);
    addElement('strong', '', item.title, body);
    addElement('span', 'yt-detail', formatDate(item.publishedAt), body);
    return a;
  }

  function render(results, fromCache = false) {
    for (const type of Object.keys(grids)) {
      const grid = grids[type];
      grid.replaceChildren();
      const items = Array.isArray(results[type]) ? results[type] : [];
      if (!items.length) {
        addElement('div', 'yt-empty',
          type === 'streams' ? 'No public livestreams found among the recent uploads checked. Browse the channel for older broadcasts.' :
          type === 'shorts' ? 'No short clips found in the recent uploads checked. See all Shorts on YouTube.' :
          'No recent regular uploads found in the checked videos.', grid);
        continue;
      }
      items.slice(0, perSection).forEach(item => { if (validVideoId(item.id)) grid.appendChild(renderCard(item)); });
    }
    if (Array.isArray(results.playlists)) renderPlaylistGroups(results.playlists);
    const count = Object.keys(grids).reduce((n, kind) => n + (results[kind]?.length || 0), 0);
    const playlistText = Array.isArray(results.playlists)
      ? ` · ${results.playlists.length} public playlists` : ' · playlists unavailable';
    setStatus(`${count} recent videos${playlistText} loaded ${fromCache ? 'from cache' : 'from CreatorPromote'} · Updated ${new Date(results.updatedAt).toLocaleString([], {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}`, 'ok');
  }


  const adapterUrl = new URL('./hub-feed.mjs', document.currentScript.src).href;
  const modelUrl = new URL('./content-model.mjs', document.currentScript.src).href;
  const failed = () => setStatus(hasFeed ? 'Showing saved videos and playlists · Refresh temporarily unavailable.' :
    'The video feed is temporarily unavailable. Featured picks and YouTube links are still available.', 'error');
  refresh?.addEventListener('click', async () => {
    if (!watcher || busy) return;
    busy = true; refresh.disabled = true;
    try {await watcher.refresh();} finally {busy = false; refresh.disabled = false;}
  });
  Promise.all([import(adapterUrl), import(modelUrl)]).then(([{watchCreatorFeed}, model]) => {
    ({prettyDuration, validVideoId} = model);
    watcher = watchCreatorFeed(cfg, ({data,source}) => {
      const results = model.hubResults(data, perSection);
      const saved = source === 'fallback' || Object.values(data.sections || {}).some(s => s.status === 'cached');
      const next = JSON.stringify([results,saved,data.sections]);
      if (next === signature) return;
      signature = next;
      if (data.sections?.videos?.status === 'unavailable') {
        if (results.playlists) renderPlaylistGroups(results.playlists);
        failed(); return;
      }
      render(results, saved); hasFeed = true;
      if (!Array.isArray(data.catalog)) status.textContent += ' · Limited older feed; browse YouTube for more';
      if (data.sections?.playlists?.status === 'unavailable') status.textContent += ' · Playlist refresh unavailable';
    }, failed);
  }).catch(failed);
})();
