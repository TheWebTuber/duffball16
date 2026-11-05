/* Duffball16: recent public YouTube uploads, grouped without a backend.
 * Uses channels.list -> upload playlist -> playlistItems.list -> videos.list.
 * Note: duration <=3 minutes is an approximation of Shorts, not an official flag.
 */
(() => {
  'use strict';

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

  const apiKey = String(cfg.apiKey || '').trim();
  const handle = String(cfg.channelHandle || '@Duffball16').trim();
  const perSection = Math.max(1, Math.min(12, Number(cfg.perSection) || 6));
  const maxPages = Math.max(1, Math.min(8, Number(cfg.maxUploadsPages) || 5));
  const cacheMs = Math.max(5, Math.min(240, Number(cfg.cacheMinutes) || 60)) * 60000;
  const cacheKey = 'duffball16_content_feed_v4_' + handle.toLowerCase();
  const validKey = apiKey && !apiKey.includes('PASTE_') && apiKey !== 'YOUR_API_KEY';
  let busy = false;

  function setStatus(message, state = '') {
    status.textContent = message;
    status.dataset.state = state;
  }

  function getCache() {
    try {
      const data = JSON.parse(localStorage.getItem(cacheKey) || 'null');
      if (data && data.created && Date.now() - data.created < cacheMs && data.handle === handle && data.results) {
        return data;
      }
    } catch (_) { /* storage may be blocked */ }
    return null;
  }

  function saveCache(results) {
    try { localStorage.setItem(cacheKey, JSON.stringify({ created: Date.now(), handle, results })); }
    catch (_) { /* storage may be blocked */ }
  }

  function isoDurationSeconds(raw) {
    const match = /^P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(raw || '');
    if (!match) return 0;
    return Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
  }

  function prettyDuration(seconds) {
    if (!seconds) return '';
    const hr = Math.floor(seconds / 3600), min = Math.floor((seconds % 3600) / 60), sec = seconds % 60;
    return hr ? `${hr}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}` : `${min}:${String(sec).padStart(2, '0')}`;
  }

  function validVideoId(id) { return /^[\w-]{11}$/.test(id || ''); }

  function validPlaylistId(id) { return /^[A-Za-z0-9_-]{10,}$/.test(id || ''); }

  function playlistTopic(title) {
    const t = String(title || '').toLowerCase();
    if (/\b(minecraft|mine[ -]?craft|smp|survival multiplayer|mc smp)\b/.test(t)) return 'minecraft';
    if (/\b(hollow[ -]?knight|silksong)\b/.test(t)) return 'hollow';
    return 'other';
  }

  function videoKind(item) {
    if (item.liveStreamingDetails || ['live', 'upcoming'].includes(item.snippet?.liveBroadcastContent)) return 'streams';
    const seconds = isoDurationSeconds(item.contentDetails?.duration);
    return seconds > 0 && seconds <= 180 ? 'shorts' : 'videos';
  }

  function isWatchable(item) {
    return validVideoId(item.id) && item.snippet?.title &&
      item.status?.privacyStatus === 'public';
  }

  function toCardInfo(item, kind) {
    const liveStatus = item.snippet?.liveBroadcastContent;
    const isLive = kind === 'streams' && liveStatus === 'live';
    const upcoming = kind === 'streams' && liveStatus === 'upcoming';
    return {
      id: item.id,
      title: item.snippet.title,
      publishedAt: item.liveStreamingDetails?.actualStartTime || item.liveStreamingDetails?.scheduledStartTime || item.snippet.publishedAt,
      seconds: isoDurationSeconds(item.contentDetails?.duration),
      kind, isLive, upcoming
    };
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

  async function loadPlaylists(channelId) {
    if (!channelId) return [];
    let next = '';
    const all = [];
    // Fetch public channel-created playlists only. No guessing playlist IDs.
    // These lists update automatically when the creator publishes a new playlist.
    for (let page = 0; page < 3; page++) {
      const data = await api('playlists', {
        part: 'snippet,contentDetails,status', channelId, maxResults: '50',
        ...(next ? {pageToken: next} : {})
      });
      for (const item of data.items || []) {
        const title = String(item.snippet?.title || '').trim();
        if (!validPlaylistId(item.id) || !title ||
            item.status?.privacyStatus === 'private' ||
            item.status?.privacyStatus === 'unlisted' ||
            Number(item.contentDetails?.itemCount || 0) < 1) continue;
        const pics = item.snippet?.thumbnails || {};
        all.push({
          id: item.id, title,
          count: Number(item.contentDetails?.itemCount) || 0,
          thumbnail: (pics.high || pics.medium || pics.default || {}).url || '',
          created: item.snippet?.publishedAt || '',
          topic: playlistTopic(title)
        });
      }
      next = data.nextPageToken || '';
      if (!next) break;
    }
    // Alphabetical grouping within topics avoids claiming a false last-updated order.
    return all.sort((a, b) => a.title.localeCompare(b.title));
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
      item.kind === 'streams' ? 'Livestream replay' : item.kind === 'shorts' ? 'Quick clip' : 'Gaming video', body);
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
    setStatus(`${count} recent videos${playlistText} loaded ${fromCache ? 'from cache' : 'from YouTube'} · Updated ${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`, 'ok');
  }

  async function api(path, params) {
    const query = new URLSearchParams({...params, key: apiKey});
    const response = await fetch(`https://www.googleapis.com/youtube/v3/${path}?${query}`, { cache: 'no-store' });
    let payload;
    try { payload = await response.json(); } catch (_) { throw new Error('Invalid YouTube API response'); }
    if (!response.ok || payload.error) throw new Error(payload.error?.message || `YouTube request failed (${response.status})`);
    return payload;
  }

  async function loadResults() {
    const channelRequest = {part:'id,contentDetails', ...(cfg.channelId ? {id:cfg.channelId} : {forHandle:handle})};
    const channel = await api('channels', channelRequest);
    const channelInfo = channel.items?.[0];
    const uploadsId = channelInfo?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsId) throw new Error('Could not find the uploads playlist. Check the YouTube handle.');

    // Playlist lookup can fail independently without breaking the existing video feeds.
    const playlistsPromise = loadPlaylists(channelInfo.id).catch(error => {
      console.warn('Duffball16 playlists could not load:', error);
      return null;
    });
    const found = {streams: [], videos: [], shorts: []};
    const seen = new Set();
    let pageToken = '';

    for (let page = 0; page < maxPages; page++) {
      const listing = await api('playlistItems', {
        part:'contentDetails', playlistId: uploadsId, maxResults:'50',
        ...(pageToken ? {pageToken} : {})
      });
      const ids = (listing.items || [])
        .map(x => x.contentDetails?.videoId)
        .filter(id => validVideoId(id) && !seen.has(id));
      ids.forEach(id => seen.add(id));
      if (ids.length) {
        const details = await api('videos', {
          part:'snippet,contentDetails,liveStreamingDetails,status',
          id: ids.join(',')
        });
        for (const item of details.items || []) {
          if (!isWatchable(item)) continue;
          const kind = videoKind(item);
          if (found[kind].length < perSection) found[kind].push(toCardInfo(item, kind));
        }
      }
      pageToken = listing.nextPageToken || '';
      if (!pageToken || Object.values(found).every(arr => arr.length >= perSection)) break;
    }
    for (const group of Object.values(found)) group.sort((a,b) => new Date(b.publishedAt||0)-new Date(a.publishedAt||0));
    found.playlists = await playlistsPromise;
    return found;
  }

  async function start(force = false) {
    if (busy) return;
    if (!validKey) {
      setStatus('Featured picks shown. Add your restricted YouTube API key in js/youtube-config.js for videos and playlists.');
      return;
    }
    if (!force) {
      const cached = getCache();
      if (cached) { render(cached.results, true); return; }
    }
    busy = true;
    if (refresh) refresh.disabled = true;
    setStatus('Checking the latest Duffball16 uploads…');
    try {
      const results = await loadResults();
      saveCache(results);
      render(results);
    } catch (error) {
      console.warn('Duffball16 YouTube feed:', error);
      setStatus('Could not load recent videos and playlists. Featured picks are still available. Check the API key, YouTube quota and website restrictions.', 'error');
    } finally {
      busy = false;
      if (refresh) refresh.disabled = false;
    }
  }

  refresh?.addEventListener('click', () => start(true));
  start();
})();
