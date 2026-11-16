export function isoDurationSeconds(raw) {
    const match = /^P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(raw || '');
    if (!match) return 0;
    return Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
  }

export function prettyDuration(seconds) {
    if (!seconds) return '';
    const hr = Math.floor(seconds / 3600), min = Math.floor((seconds % 3600) / 60), sec = seconds % 60;
    return hr ? `${hr}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}` : `${min}:${String(sec).padStart(2, '0')}`;
  }

export function validVideoId(id) { return /^[\w-]{11}$/.test(id || ''); }

export function validPlaylistId(id) { return /^[A-Za-z0-9_-]{10,}$/.test(id || ''); }

export function playlistTopic(title) {
    const t = String(title || '').toLowerCase();
    if (/\b(minecraft|mine[ -]?craft|smp|survival multiplayer|mc smp)\b/.test(t)) return 'minecraft';
    if (/\b(hollow[ -]?knight|silksong)\b/.test(t)) return 'hollow';
    return 'other';
  }

export function videoKind(item) {
    if (item.liveStreamingDetails || ['live', 'upcoming'].includes(item.snippet?.liveBroadcastContent)) return 'streams';
    const seconds = isoDurationSeconds(item.contentDetails?.duration);
    return seconds > 0 && seconds <= 180 ? 'shorts' : 'videos';
  }

export function isWatchable(item) {
    return validVideoId(item.id) && item.snippet?.title &&
      item.status?.privacyStatus === 'public';
  }

export function toCardInfo(item, kind) {
    const liveStatus = item.snippet?.liveBroadcastContent;
    const isLive = kind === 'streams' && liveStatus === 'live';
    const upcoming = kind === 'streams' && liveStatus === 'upcoming';
    return {
      id: item.id,
      title: item.snippet.title,
      publishedAt: item.liveStreamingDetails?.actualStartTime || item.liveStreamingDetails?.scheduledStartTime || item.snippet.publishedAt,
      seconds: isoDurationSeconds(item.contentDetails?.duration),
      kind, isLive, upcoming, unknownLive:item.liveStatus === 'unknown' && !!item.liveStreamingDetails?.actualStartTime && !item.liveStreamingDetails?.actualEndTime
    };
  }


export function hubResults(data, perSection = 6) {
  const groups = {streams:[],videos:[],shorts:[],updatedAt:data.sections?.videos?.updatedAt || data.updatedAt};
  const catalog = Array.isArray(data.catalog) ? data.catalog : [...new Map([...data.uploads,...data.replays,...(data.live ? [data.live] : [])].map(v=>[v.id,v])).values()];
  for (const item of catalog) {
    if (!isWatchable(item)) continue;
    const kind = videoKind(item);
    if (groups[kind].length < perSection) groups[kind].push(toCardInfo(item,kind));
  }
  for (const kind of ['streams','videos','shorts']) groups[kind].sort((a,b)=>Date.parse(b.publishedAt||0)-Date.parse(a.publishedAt||0));
  if (Array.isArray(data.playlists) && data.sections?.playlists?.status !== 'unavailable') {
    groups.playlists = data.playlists.filter(item=>validPlaylistId(item.id) && item.snippet?.title &&
      !['private','unlisted'].includes(item.status?.privacyStatus) && Number(item.contentDetails?.itemCount)>0)
      .map(item=>({id:item.id,title:item.snippet.title,count:Number(item.contentDetails.itemCount),
        thumbnail:(item.snippet.thumbnails?.high || item.snippet.thumbnails?.medium || item.snippet.thumbnails?.default || {}).url || '',
        topic:playlistTopic(item.snippet.title)})).sort((a,b)=>a.title.localeCompare(b.title));
  }
  return groups;
}
