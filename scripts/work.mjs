import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const base=process.env.BASE_URL||'http://localhost:3000';
const browser=await chromium.launch({executablePath:process.env.CHROME_BIN||undefined,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:1000},hasTouch:true,reducedMotion:'reduce'});
const page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.goto(`${base}/work`,{waitUntil:'networkidle'});
await page.locator('select').selectOption('en');
assert.equal(await page.locator('.entry').count(),12);
const entries=await page.locator('.entry').evaluateAll(els=>els.map(el=>({slug:el.dataset.study,href:el.getAttribute('href'),title:el.querySelector('h2').textContent})));
assert.equal(new Set(entries.map(e=>e.slug)).size,12);
const search=page.locator('.search input');
await search.fill('ESP32 MQTT');
assert.equal(await page.locator('.entry').count(),1);
assert.equal(await page.locator('.entry').getAttribute('data-study'),'pid-motor-trainer');
await search.fill('โรงจอดรถ');assert.equal(await page.locator('.entry').count(),1,'Thai search while viewing English');
await search.fill('全向');assert.equal(await page.locator('.entry').count(),1,'Chinese search while viewing English');
await search.fill('no-such-project');assert.equal(await page.locator('.entry').count(),0);
await page.getByRole('button',{name:'Clear filters',exact:true}).click();
assert.equal(await search.inputValue(),'');
for(const [label,count] of [['Automation',3],['Smart devices',5],['Robotics & web',2],['Learning & training',2],['All projects',12]]){
  await page.locator('.filters').getByRole('button',{name:label,exact:true}).click();
  assert.equal(await page.locator('.entry').count(),count);
}
await mkdir('test-results',{recursive:true});
await page.getByRole('button',{name:'Light',exact:true}).click();
await page.screenshot({path:'test-results/work-index-desktop.png',fullPage:true});
for(const entry of entries){
  const response=await page.goto(base+entry.href,{waitUntil:'networkidle'});
  assert.equal(response.status(),200);
  assert.equal(await page.locator('h1').innerText(),entry.title);
  assert.equal(await page.locator('.photo-pending').count(),0,'Every new project now has its own real photographs');
  assert.ok(await page.locator('.build-photo-button').count()>0);
  assert.match(await page.locator('.art-caption').innerText(),/Concept illustration/);
  assert.equal(await page.locator('.drawing svg').getAttribute('data-motion'),'off');
  assert.equal(await page.locator('.art-caption button').isDisabled(),true);
  assert.equal(await page.locator('.entry-nav a').count(),2);
  const expandedHref=await page.getByRole('link',{name:/^Expanded project notes/}).getAttribute('href');
  const expanded=await context.request.get(base+expandedHref);
  assert.equal(expanded.status(),200);
  const expandedText=await expanded.text();
  assert.match(expandedText,/## รายละเอียดฉบับขยาย/);assert.match(expandedText,/### หลักการทำงาน/);
  assert.match(expandedText,/### แนวทางพัฒนาและทดลอง/);assert.match(expandedText,/### ประเด็นที่ควรตรวจสอบ/);
  assert.match(expandedText,/\/images\/work\//);assert.doesNotMatch(expandedText,/ยังไม่มีรูปชิ้นงาน/);
  assert.ok(expandedText.length>1500,'Every Markdown file has substantial expanded notes');
  assert.equal(await page.locator('.development-steps li').count(),3);
  assert.equal(await page.locator('.evaluation-list li').count(),2);
  const sourceHref=await page.getByRole('link',{name:/^Original README/}).getAttribute('href');
  const source=await context.request.get(base+sourceHref);
  assert.equal(source.status(),200);assert.match(await source.text(),/^# โปรเจคที่/);
  assert.doesNotMatch(await source.text(),/\[cite:/);
  await page.locator('.source-notes summary').click();
  assert.match(await page.locator('.source-notes pre').innerText(),/^# โปรเจคที่/);
  assert.doesNotMatch(await page.locator('.source-notes pre').innerText(),/\[cite:/);
  if(entry.slug==='allen-bradley-training-station'){
    assert.match(await page.locator('.component-list:not(.development-steps)').innerText(),/Allen-Bradley.*SE-TEK.*KUKA/s);
    assert.equal(await page.locator('.method').count(),1);
  }else{
    assert.equal(await page.locator('.method').count(),0,'Do not invent implementation notes for title-only sources');
  }
}
await page.locator('.entry-nav a').last().click();
await page.waitForURL('**/work/three-phase-board');
assert.match(page.url(),/three-phase-board/,'Last entry wraps to first');
await page.locator('.entry-nav a').first().click();await page.waitForURL('**/work/allen-bradley-training-station');assert.match(page.url(),/allen-bradley-training-station/);
for(const locale of ['th','en','zh']){
  for(const route of ['/work','/work/allen-bradley-training-station']){
    await page.goto(base+route,{waitUntil:'networkidle'});await page.locator('select').selectOption(locale);
    assert.equal(await page.locator('html').getAttribute('lang'),locale==='zh'?'zh-CN':locale);
    assert.doesNotMatch(await page.locator('main').innerText(),/work\.[a-z]/);
    for(const width of [320,390,768,1440]){
      await page.setViewportSize({width,height:900});
      for(const mode of ['dark','light','auto']){
        await page.locator('.header-tools button').nth(mode==='dark'?0:mode==='light'?1:2).click();
        assert.equal(await page.locator('html').getAttribute('data-theme-mode'),mode);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route}/${locale}/${mode} overflow at ${width}`);
      }
    }
  }
}
await page.setViewportSize({width:390,height:844});
await page.goto(base+'/work',{waitUntil:'networkidle'});await page.locator('select').selectOption('en');
await page.getByRole('button',{name:'Light',exact:true}).click();await page.screenshot({path:'test-results/work-index-mobile.png',fullPage:true});
await page.locator('[data-study="allen-bradley-training-station"]').tap();
await page.waitForURL('**/work/allen-bradley-training-station');
assert.match(page.url(),/allen-bradley-training-station/);await page.screenshot({path:'test-results/work-detail-mobile.png',fullPage:true});
await page.emulateMedia({reducedMotion:'no-preference'});
await page.waitForFunction(()=>document.querySelector('.drawing svg').dataset.motion==='on');
await page.locator('.art-caption button').click();assert.equal(await page.locator('.drawing svg').getAttribute('data-motion'),'off');
await page.locator('.art-caption button').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.drawing svg').getAttribute('data-motion'),'on');
await page.setViewportSize({width:1440,height:1000});await page.getByRole('button',{name:'Dark',exact:true}).click();
await page.screenshot({path:'test-results/work-detail-desktop.png',fullPage:true});
await page.goto(base,{waitUntil:'networkidle'});await page.locator('[data-ready="true"]').waitFor();await page.locator('select').selectOption('en');
await page.waitForFunction(()=>document.documentElement.lang==='en');
await page.getByRole('button',{name:'View all 19 projects'}).click();
assert.equal(await page.locator('.project-card').count(),19);
assert.equal(await page.locator('.project-card[href^="/work/"]').count(),12);
assert.equal(await page.locator('.project-card .project-photo').count(),0,'Animated covers keep real images in details');
assert.equal(await page.locator('.project-card .photo-available').count(),6,'Original photos preserved inside their project details');
assert.match(await page.locator('.technology-strip').innerText(),/Mitsubishi FX5U/);
await page.locator('.notebook-feature').click();await page.waitForURL('**/work');assert.match(page.url(),/\/work$/);
assert.deepEqual(errors,[]);await browser.close();
console.log('PASS: 12 notebook routes, expanded Markdown + original downloads, trilingual development/evaluation notes, honest source scope, multilingual search, group filters, empty state, previous/next wrap, 3 languages × 3 themes × 4 widths, touch links, motion pause/keyboard/reduced motion, 19 animated homepage entries and real photos preserved inside details.');
