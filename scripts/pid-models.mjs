import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, deviceScaleFactor: 1 });
const errors = []; page.on('pageerror', error => errors.push(error.message));
await mkdir('test-results', { recursive: true });
await page.goto(`${process.env.BASE_URL || 'http://localhost:3000'}/pid-lab`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'สว่าง', exact: true }).click();
for (const [id, width] of [['motor', 1440], ['pendulum', 1440], ['cart', 1440], ['motor', 390], ['pendulum', 390], ['cart', 390]]) {
  await page.setViewportSize({ width, height: 1050 });
  await page.locator(`#pid-tab-${id}`).click();
  const scene = page.locator('.model-scene'); await scene.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.model-scene')?.dataset.renderer === 'ready');
  assert.ok(Number(await scene.getAttribute('data-mesh-count')) > 200, `${id} has detailed geometry`);
  assert.equal(await scene.locator('canvas').getAttribute('style'), null);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await scene.screenshot({ path: `test-results/pid-detailed-${id}-${width}.png` });
  if(width===1440){
    const normal=await scene.locator('canvas').screenshot();
    await scene.getByRole('button',{name:'ซูมดูชิ้นส่วน',exact:true}).click();
    assert.equal(await scene.getByRole('button',{name:'ดูทั้งชุดทดลอง',exact:true}).getAttribute('aria-pressed'),'true');
    await page.waitForFunction(()=>document.querySelector('.model-scene')?.dataset.viewZoom==='1.600');
    const closeUp=await scene.locator('canvas').screenshot();assert.ok(!normal.equals(closeUp),'Detail view changes the actual 3D camera');
    await scene.screenshot({path:`test-results/pid-closeup-${id}.png`});
    await scene.getByRole('button',{name:'ดูทั้งชุดทดลอง',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('.model-scene')?.dataset.viewZoom==='1.000');
    assert.match(await page.getByTestId('sim-time').innerText(),/^0\.00$/,'Decorative camera movement does not advance physics');
  }
}
await page.setViewportSize({ width: 1440, height: 1050 });
await page.locator('#pid-tab-pendulum').click();
await page.locator('summary').filter({hasText:'ปรับแบบจำลอง'}).click();
const length=page.getByRole('spinbutton',{name:'ความยาวลูกตุ้ม (m)',exact:true});
await length.fill('1');await length.press('Tab');
await page.locator('.model-scene').scrollIntoViewIfNeeded();await page.waitForTimeout(100);
await page.locator('.model-scene').screenshot({path:'test-results/pid-detailed-pendulum-long.png'});
assert.equal(Number(await length.inputValue()),1);
await page.getByRole('button', { name: 'มืด', exact: true }).click();
await page.locator('#pid-tab-motor').click();
await page.locator('.model-scene').screenshot({ path: 'test-results/pid-detailed-motor-dark.png' });
assert.deepEqual(errors, []); await browser.close();
console.log('PASS: all three detailed 3D rigs, desktop/mobile composition, actual camera zoom/reset, dark theme, canvas sizing, no browser errors.');
