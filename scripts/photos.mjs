import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||undefined,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:1000},hasTouch:true,reducedMotion:'reduce'});
const page=await context.newPage(),errors=[];
page.on('pageerror',error=>errors.push(error.message));
const base=process.env.BASE_URL||'http://localhost:3000';
await page.goto(base,{waitUntil:'networkidle'});
await page.locator('select').selectOption('en');
await page.getByRole('button',{name:'View all 19 projects'}).click();
assert.equal(await page.locator('.project-visual > svg').count(),19,'Animated illustrations on every card');
assert.equal(await page.locator('.project-visual img').count(),0,'Real photographs are inside the project details');
assert.equal(await page.locator('.photo-available').count(),6,'Six original photo/document sets preserved');
for(const name of ['National Robotics Competition','JINPAO Automation Contest','WorldSkills Thailand Preparation','Arduino UNO R4 & ESP32 Prototypes','Training Kits & Research Documentation','CAD Design & System Simulation']){
  await page.getByRole('button',{name:`View ${name}`,exact:true}).click();
  const detail=page.getByRole('dialog');await detail.waitFor();
  assert.equal(await detail.locator('.modal-visual svg').count(),1);
  const original=detail.locator('.build-photo-button img');await original.evaluate(image=>image.decode());
  assert.ok(await original.evaluate(image=>image.complete&&image.naturalWidth>=480),'Responsive original-photo preview decodes');
  assert.match(await original.getAttribute('src'),/\/images\/my-work\//);
  assert.ok((await original.getAttribute('alt')).length>20);
  await detail.locator('.build-photo-button').click();
  const enlarged=page.locator('.photo-viewer-modal');await enlarged.waitFor();
  await enlarged.locator('.photo-stage img').evaluate(image=>image.decode());
  assert.ok(await enlarged.locator('.photo-stage img').evaluate(image=>image.naturalWidth>=720),'Viewer loads the full image');
  assert.equal(await enlarged.getByRole('button',{name:'Next photograph'}).isDisabled(),true);
  await page.keyboard.press('Escape');await enlarged.waitFor({state:'hidden'});
  assert.equal(await detail.isVisible(),true,'Escape closes only the enlarged image');
  await page.getByRole('button',{name:'Back to projects'}).click();await detail.waitFor({state:'hidden'});
}
assert.equal(await page.locator('img[src*="/images/references/"], img[src*="-photo.png"]').count(),0,'Stock and generated images are not displayed');
await page.getByRole('button',{name:'View JINPAO Automation Contest',exact:true}).click();
const dialog=page.getByRole('dialog');
await dialog.waitFor();
assert.match(await dialog.locator('.personal-photo-info').innerText(),/JINPAO.*SolidWorks/);
assert.match(await dialog.locator('.personal-photo-info').innerText(),/Document from the album/);
assert.match(await dialog.getByRole('link',{name:'Open full image'}).getAttribute('href'),/\/images\/my-work\/robot-system-design.webp$/);
assert.match(await dialog.locator('ul').innerText(),/Continued modeling.*SolidWorks/);
await page.getByRole('button',{name:'Back to projects'}).click();
await page.getByRole('button',{name:'Open photograph: Hands-on in the lab',exact:true}).click();
await dialog.waitFor();
const counter=()=>dialog.locator('.photo-counter').innerText();
for(let index=0;index<14;index++){
  assert.equal(await counter(),`${String(index+1).padStart(2,'0')} / 14`);
  const photo=dialog.locator('.photo-stage img');await photo.evaluate(image=>image.decode());
  assert.ok(await photo.evaluate(image=>image.complete&&image.naturalWidth>=720));
  assert.match(await photo.getAttribute('src'),/\/images\/my-work\//);
  assert.match(await dialog.locator('.photo-origin').innerText(),/From Theetawatch’s work album/);
  assert.match(await dialog.locator('.photo-origin a').getAttribute('href'),/\/images\/my-work\//);
  const activeThumb=dialog.locator('.photo-strip button[aria-current="true"]');
  assert.equal(await activeThumb.count(),1);
  assert.ok(await activeThumb.evaluate(el=>{const rail=el.parentElement.getBoundingClientRect(),rect=el.getBoundingClientRect();return rect.left>=rail.left-2&&rect.right<=rail.right+2;}),'Selected thumbnail remains in view');
  if(index>=12)assert.match(await dialog.locator('.photo-origin').innerText(),/Document from the album/);
  await dialog.getByRole('button',{name:'Next photograph'}).click();
}
assert.equal(await counter(),'01 / 14','Wrap-around navigation');
await page.keyboard.press('ArrowLeft');assert.equal(await counter(),'14 / 14');
await page.keyboard.press('ArrowRight');assert.equal(await counter(),'01 / 14');
await dialog.locator('.photo-strip').getByRole('button',{name:'Open photograph: Seeing data through ROS',exact:true}).click();
assert.equal(await counter(),'08 / 14','Filmstrip selects an arbitrary image');
await dialog.locator('.photo-strip').getByRole('button',{name:'Open photograph: Hands-on in the lab',exact:true}).click();
const stage=dialog.locator('.photo-stage');let box=await stage.boundingBox();
await page.mouse.move(box.x+box.width*.65,box.y+box.height*.5);await page.mouse.down();
await page.mouse.move(box.x+box.width*.35,box.y+box.height*.5,{steps:4});await page.mouse.up();
assert.equal(await counter(),'02 / 14','Mouse swipe');
await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
await mkdir('test-results',{recursive:true});
for(const [locale,heading,open] of [
  ['en','Made, tested, remembered.','Open photograph: Hands-on in the lab'],
  ['th','ลงมือทำ แล้วเก็บไว้เล่า','เปิดภาพ: ลองกับวงจรจริง'],
  ['zh','动手制作，测试，记录','打开照片: 在实验室动手实践'],
]){
  await page.locator('select').selectOption(locale);
  assert.equal(await page.locator('#photo-heading').innerText(),heading);
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:900});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${locale} page overflow at ${width}`);
    await page.getByRole('button',{name:open,exact:true}).click();
    await dialog.waitFor();
    assert.ok(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth),`${locale} viewer overflow at ${width}`);
    await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
  }
}
await page.locator('select').selectOption('en');await page.setViewportSize({width:390,height:844});
await page.getByRole('button',{name:'Open photograph: Hands-on in the lab',exact:true}).click();await dialog.waitFor();
const cdp=await context.newCDPSession(page);box=await stage.boundingBox();
const x=box.x+box.width*.75,y=box.y+box.height*.5;
await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
for(const fraction of [.65,.55,.45,.35])await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:box.x+box.width*fraction,y}]});
await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
await page.waitForTimeout(80);assert.equal(await counter(),'02 / 14','Real touchscreen swipe');
await page.screenshot({path:'test-results/photos-viewer-mobile.png'});
await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
await page.setViewportSize({width:1440,height:1000});await page.getByRole('button',{name:'Light',exact:true}).click();
await page.locator('.photo-roll').scrollIntoViewIfNeeded();await page.screenshot({path:'test-results/photos-desktop.png'});
assert.equal(await page.locator('.photo-print').first().evaluate(el=>getComputedStyle(el).transform),'none','Reduced motion removes decorative movement');
assert.deepEqual(errors,[]);await browser.close();
console.log('PASS: 19 animated covers, all 6 original photo/document sets inside details, nested photo viewer preserves the project on Escape, all 14 album images decode, JINPAO → SolidWorks context, filmstrip and mouse/keyboard/real touch browsing, 3 languages × 4 widths, reduced motion.');
