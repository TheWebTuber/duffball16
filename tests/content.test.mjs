import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {hubResults} from '../js/content-model.mjs';
import {safeFeed} from '../js/creatorpromote-hub.js';
import {toEsp,updateEsp} from '../scripts/update-esp.mjs';
const fixture=JSON.parse(await fs.readFile(new URL('./fixtures/proposed.json',import.meta.url)));
const now=Date.parse(fixture.updatedAt);
const video=(id,duration,extra={})=>({id,snippet:{title:id,publishedAt:fixture.updatedAt},status:{privacyStatus:'public'},contentDetails:{duration},...extra});
test('regular uploads, short clips, replays and upcoming streams keep their categories',()=>{
  const data=structuredClone(fixture);
  data.catalog=[video('regular0001','PT10M'),video('shortclip01','PT59S'),video('replay00001','PT1H',{liveStreamingDetails:{actualStartTime:fixture.updatedAt,actualEndTime:fixture.updatedAt}}),video('upcoming001','PT0S',{snippet:{title:'Upcoming',liveBroadcastContent:'upcoming'},liveStreamingDetails:{scheduledStartTime:fixture.updatedAt}}),video('private0001','PT5M',{status:{privacyStatus:'private'}})];
  const groups=hubResults(data);
  assert.equal(groups.videos.length,1);assert.equal(groups.shorts.length,1);assert.equal(groups.streams.length,2);
  assert.equal(groups.streams.find(v=>v.id==='upcoming001').upcoming,true);
});
test('playlist topic grouping and public/nonempty filtering remain intact',()=>{
  const playlist=(id,title,count=3,privacyStatus='public')=>({id,snippet:{title},contentDetails:{itemCount:count},status:{privacyStatus}});
  const data={...fixture,playlists:[playlist('PLminecraft01','Minecraft SMP'),playlist('PLhollowknight','Hollow Knight'),playlist('PLother00001','Other games'),playlist('PLprivate001','Minecraft private',3,'private'),playlist('PLempty00001','Empty',0)]};
  assert.deepEqual(hubResults(data).playlists.map(v=>v.topic).sort(),['hollow','minecraft','other']);
  data.sections={playlists:{status:'unavailable'}};assert.equal(hubResults(data).playlists,undefined);
});
test('stale stream cannot render a LIVE badge or assert it completed',()=>{
  const data=structuredClone(fixture);data.catalog[0].snippet.liveBroadcastContent='live';delete data.catalog[0].liveStreamingDetails.actualEndTime;
  const item=hubResults(safeFeed(data,now+3600000)).streams[0];
  assert.equal(item.isLive,false);assert.equal(item.unknownLive,true);
});
test('ESP keeps numeric fields and uses observation time; stale LIVE expires',()=>{
  const data=structuredClone(fixture);data.live=data.catalog[0];delete data.live.liveStreamingDetails.actualEndTime;data.live.snippet.liveBroadcastContent='live';
  assert.equal(toEsp(data,now).status,'Streaming Live');
  const stale=toEsp(data,now+3600000);assert.equal(stale.status,'Live status unavailable');
  assert.deepEqual(Object.keys(stale),['subscribers','views','videos','status','updated']);
  assert.equal(stale.subscribers,1234);assert.equal(stale.updated,'13:00');
  delete data.channel.statistics.subscriberCount;assert.throws(()=>toEsp(data,now));
});
test('ESP outage retains prior counts and timestamp but clears LIVE',async()=>{
  const dir=await fs.mkdtemp(path.join(os.tmpdir(),'creatorpromote-esp-test-'));const file=path.join(dir,'esp.json');
  try {
    await fs.writeFile(file,JSON.stringify({subscribers:123,views:456,videos:7,status:'Streaming Live',updated:'09:10'}));
    const result=await updateEsp({file,fetcher:async()=>{throw Error('offline');},now});
    assert.deepEqual(result,{subscribers:123,views:456,videos:7,status:'Live status unavailable',updated:'09:10'});
  } finally {await fs.unlink(file);await fs.rmdir(dir);}
});
