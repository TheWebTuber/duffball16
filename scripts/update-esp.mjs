// Keeps the existing ESP JSON field names/types, using the shared Hub only.
import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {safeFeed,validateFeed} from '../js/creatorpromote-hub.js';

export function toEsp(feed, now = Date.now()) {
  validateFeed(feed,'duffball16');
  if (feed.channel.id !== 'UC2iwDFfrVjWYFpXahr-o8cA' || Date.parse(feed.updatedAt)>now) throw Error('Invalid creator feed');
  const data=safeFeed(feed,now),stats=data.channel.statistics || {};
  const result={};
  for (const [target,source] of [['subscribers','subscriberCount'],['views','viewCount'],['videos','videoCount']]) {
    const value=stats[source] == null || stats[source] === '' ? NaN : Number(stats[source]);
    if (!Number.isFinite(value) || value<0 || (target==='subscribers' && stats.hiddenSubscriberCount)) throw Error('Statistics unavailable');
    result[target]=value;
  }
  const live=data.freshness.liveFresh && data.live?.snippet?.liveBroadcastContent==='live' &&
    data.live.liveStreamingDetails?.actualStartTime && !data.live.liveStreamingDetails?.actualEndTime;
  result.status=live ? 'Streaming Live' : data.freshness.liveFresh ? 'No live stream detected' : 'Live status unavailable';
  result.updated=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Amsterdam',hour:'2-digit',minute:'2-digit'})
    .format(new Date(data.sections?.channel?.updatedAt || data.updatedAt));
  return result;
}
export async function updateEsp({file=new URL('../live/esp.json',import.meta.url),fetcher=fetch,now=Date.now()}={}) {
  let result;
  try {
    const response=await fetcher('https://api.creatorpromote.com/data/duffball16.json',{signal:AbortSignal.timeout(12000),cache:'no-cache'});
    if (!response.ok) throw Error('Hub unavailable');
    result=toEsp(await response.json(),now);
  } catch {
    // Preserve last successful counts and timestamp; never keep an old LIVE label.
    result=JSON.parse(await fs.readFile(file,'utf8'));
    if (!['subscribers','views','videos'].every(k=>Number.isFinite(result[k]) && result[k]>=0) || typeof result.updated!=='string') throw Error('No saved statistics');
    result.status='Live status unavailable';
  }
  await fs.writeFile(file,JSON.stringify(result,null,2)+'\n');
  return result;
}
if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  try {await updateEsp();console.log('ESP snapshot updated from Hub or saved statistics.');}
  catch {console.error('No valid ESP snapshot available; file left unchanged.');process.exitCode=1;}
}
