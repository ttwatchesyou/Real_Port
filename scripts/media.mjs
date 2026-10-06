import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { workMediaManifest } from '../src/data/workMediaManifest.ts';

const base=process.env.BASE_URL||'http://localhost:3000';
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||undefined,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:1000},hasTouch:true,reducedMotion:'reduce'});
const page=await context.newPage(),errors=[],videoRequests=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('request',r=>{if(new URL(r.url()).pathname.endsWith('.mp4'))videoRequests.push(r.url());});
let photoCount=0,clipCount=0;
for(const [slug,media] of Object.entries(workMediaManifest)){
  const requestsBeforeNavigation=videoRequests.length;
  await page.goto(`${base}/work/${slug}`,{waitUntil:'networkidle'});
  await page.locator('select').selectOption('en');
  assert.equal(await page.locator('.photo-pending').count(),0);
  assert.equal(await page.locator('video').count(),0);
  assert.equal(await page.locator('.build-photo-button').count(),Math.min(6,media.photos.length));
  assert.equal(await page.locator('.clip-card').count(),media.videos.length);
  const before=videoRequests.length;
  await page.locator('.book-footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  assert.equal(videoRequests.length,before,'Scrolling does not trigger video downloads');
  assert.equal(before,requestsBeforeNavigation,'Opening a project does not trigger video downloads');
  // Every optimized photograph and thumbnail must decode, including initially hidden photos.
  const sizes=await page.evaluate(async photos=>{
    const result=[];
    for(const p of photos){
      for(const url of [p.src,p.thumbnail]){
        const response=await fetch(url);if(!response.ok)throw new Error(url);
        const bitmap=await createImageBitmap(await response.blob());result.push({url,w:bitmap.width,h:bitmap.height});bitmap.close();
      }
    }
    return result;
  },media.photos);
  assert.equal(sizes.length,media.photos.length*2);
  for(const img of sizes)assert.ok(img.w>0&&img.h>0&&Math.max(img.w,img.h)<=1600);
  photoCount+=media.photos.length;
  if(media.photos.length>6){
    await page.getByRole('button',{name:/^Show more photos/}).click();
    assert.equal(await page.locator('.build-photo-button').count(),media.photos.length);
    await page.getByRole('button',{name:/^Collapse album/}).click();
    assert.equal(await page.locator('.build-photo-button').count(),6);
  }
  for(let i=0;i<media.videos.length;i++){
    const clip=media.videos[i];
    assert.ok(clip.duration<=30.1&&clip.bytes<5_000_000);
    const range=await context.request.get(base+clip.src,{headers:{Range:'bytes=0-1023'}});
    assert.equal(range.status(),206,'Hosting must support byte-range playback');
    assert.equal((await range.body()).length,1024);
    assert.match(range.headers()['content-range'],/^bytes 0-1023\//);
    const button=page.locator(`[data-clip="${clip.id}"] .clip-play`);
    if(i%3===0)await button.click();
    else if(i%3===1)await button.tap();
    else{await button.focus();await page.keyboard.press('Enter');}
    assert.equal(await page.locator('video').count(),1,'Only the selected clip has a video source');
    assert.equal(await page.locator('video').getAttribute('preload'),'none');
    assert.equal(await page.locator('video').getAttribute('playsinline'),'');
    assert.equal(await page.locator('video').getAttribute('autoplay'),null);
    await page.waitForFunction(()=>{const v=document.querySelector('video');return v&&!v.error&&v.readyState>=2&&v.currentTime>0.15;},null,{timeout:15000});
    const details=await page.locator('video').evaluate(v=>({w:v.videoWidth,h:v.videoHeight,duration:v.duration,src:new URL(v.currentSrc).pathname}));
    assert.equal(details.src,clip.src);assert.ok(details.w>0&&details.h>0&&Math.max(details.w,details.h)<=960);
    assert.ok(Math.abs(details.duration-clip.duration)<0.2);
    clipCount++;
  }
  if(media.videos.length){
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
    assert.equal(await page.locator('video').evaluate(v=>v.paused),true,'Hidden page pauses playback');
    await page.evaluate(()=>delete document.hidden);
    const activeId=media.videos.at(-1).id;
    await page.getByRole('button',{name:'Close clip',exact:true}).click();
    assert.equal(await page.locator('video').count(),0);
    await page.waitForFunction(id=>document.activeElement?.id===`play-${id}`,activeId);
  }
}
assert.equal(photoCount,68);assert.equal(clipCount,13);
// All six initially rendered photos in the large gallery are available at full size;
// its viewer still exposes all 26, including ones not rendered in the preview grid.
await page.goto(base+'/work/bottle-filling-conveyor',{waitUntil:'networkidle'});
await page.locator('.build-photo-button').first().tap();
await page.locator('.photo-stage').waitFor();
assert.equal(await page.locator('.photo-strip button').count(),26);
await page.locator('.photo-strip button').last().click();
assert.equal(await page.locator('.photo-counter').innerText(),'26 / 26');
await page.keyboard.press('ArrowRight');assert.equal(await page.locator('.photo-counter').innerText(),'01 / 26');
await page.keyboard.press('Escape');await page.locator('.photo-stage').waitFor({state:'hidden'});assert.equal(await page.locator('.photo-stage').count(),0);
// Failure must stay understandable and recover without navigation.
await page.route('**/videos/work/**',route=>route.abort());
await page.locator('.clip-play').first().click();await page.locator('.clip-error').waitFor();
assert.match(await page.locator('.clip-error').innerText(),/could not load/);
assert.equal(await page.getByRole('link',{name:/^Open video file/}).count(),1);
await page.unroute('**/videos/work/**');await page.getByRole('button',{name:'Retry',exact:true}).click();
await page.waitForFunction(()=>{const v=document.querySelector('video');return v&&!v.error&&v.currentTime>0.15;},null,{timeout:15000});
await page.getByRole('button',{name:'Close clip',exact:true}).click();
// Newly added media must fit every language and theme on phone, tablet and desktop.
for(const locale of ['th','en','zh']){
  await page.locator('select').selectOption(locale);
  assert.doesNotMatch(await page.locator('main').innerText(),/(?:work|media)\.[a-z]/);
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:900});
    for(const mode of ['dark','light','auto']){
      await page.locator('.header-tools button').nth(mode==='dark'?0:mode==='light'?1:2).click();
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${locale}/${width}/${mode} overflow`);
    }
  }
}
await page.locator('select').selectOption('en');await page.getByRole('button',{name:'Light',exact:true}).click();
await page.setViewportSize({width:1440,height:1000});await page.locator('.project-videos').screenshot({path:'test-results/media-clips-desktop.png'});await page.screenshot({path:'test-results/media-desktop.png',fullPage:true});
await page.setViewportSize({width:390,height:844});await page.locator('.project-videos').screenshot({path:'test-results/media-clips-mobile.png'});await page.screenshot({path:'test-results/media-mobile.png',fullPage:true});
assert.deepEqual(errors,[]);
await browser.close();
console.log('PASS: 68 real photos + thumbnails decode; 13 local clips decode and play with mouse/touch/keyboard; no MP4 on initial load or scroll; byte ranges; one player at a time; hidden-tab pause; close/focus; full 26-photo gallery; playback error/retry; 3 languages × 3 themes × 4 widths.');
