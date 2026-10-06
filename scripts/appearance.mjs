import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { paletteAt, contrastRatio } from '../src/lib/appearance.ts';

// Dawn and dusk cross middle tones: check readability throughout the whole day.
for (let minute = 0; minute < 1440; minute++) {
  const palette = paletteAt('auto', minute);
  for (const ink of ['text', 'muted', 'accent', 'warm']) {
    for (const background of ['bg', 'surface', 'surfaceStrong']) {
      assert.ok(contrastRatio(palette[ink], palette[background]) >= 4.5, `${ink} on ${background} loses contrast at minute ${minute}`);
    }
  }
}
assert.equal(paletteAt('auto', 0).bg, paletteAt('auto', 1440).bg, 'Midnight wraps continuously');
assert.equal(paletteAt('light', 0).bg, paletteAt('light', 1100).bg, 'Manual theme ignores time');
assert.notEqual(paletteAt('auto', 1030).bg, paletteAt('auto', 1040).bg, 'Sunset colors interpolate between anchors');

const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || undefined, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, timezoneId: 'Asia/Bangkok', reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const url = process.env.BASE_URL || 'http://localhost:3000';
await page.clock.setFixedTime(new Date('2026-09-30T17:30:00+07:00'));
await page.goto(url, { waitUntil: 'networkidle' });
assert.equal(await page.getByRole('button', { name: 'ตามเวลาจริง', exact: true }).getAttribute('aria-pressed'), 'true');
assert.equal(await page.locator('html').getAttribute('data-light-phase'), 'sunset');
assert.equal(await page.locator('.light-time').innerText(), '17:30');
await mkdir('test-results', { recursive: true });
await page.screenshot({ path: 'test-results/theme-sunset.png' });
const getBackground = () => page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor);
const sunset = await getBackground();
await page.getByRole('button', { name: 'สว่าง', exact: true }).click();
assert.equal(await page.locator('html').getAttribute('data-theme-mode'), 'light');
const light = await getBackground();
assert.notEqual(light, sunset);
await page.screenshot({ path: 'test-results/theme-light.png', fullPage: true });
await page.locator('.nav-contact').click();
await page.getByRole('dialog').waitFor();
assert.equal(await page.locator('.ant-modal-content').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(255, 251, 243)');
await page.locator('.ant-modal-close').click();
await page.getByRole('dialog').waitFor({ state: 'hidden' });
await page.getByRole('button', { name: 'มืด', exact: true }).click();
const dark = await getBackground();
assert.notEqual(dark, light);
await page.screenshot({ path: 'test-results/theme-dark.png' });
await page.reload({ waitUntil: 'networkidle' });
// Theme restoration runs after hydration; network idle alone is not a React readiness signal.
await page.waitForFunction(() => document.documentElement.dataset.themeMode === 'dark');
assert.equal(await page.locator('html').getAttribute('data-theme-mode'), 'dark');
await page.getByRole('button', { name: 'ตามเวลาจริง', exact: true }).click();
for (const [time, phase] of [['05:30', 'dawn'], ['12:00', 'day'], ['16:30', 'golden'], ['18:00', 'sunset'], ['19:30', 'dusk'], ['23:30', 'night']]) {
  await page.clock.setFixedTime(new Date(`2026-09-30T${time}:00+07:00`));
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await page.waitForTimeout(80);
  assert.equal(await page.locator('html').getAttribute('data-light-phase'), phase);
  assert.equal(await page.locator('.light-time').innerText(), time);
}
await page.clock.install({ time: new Date('2026-09-30T23:59:55+07:00') });
await page.reload({ waitUntil: 'networkidle' });
await page.clock.fastForward(20000);
await page.waitForFunction(() => document.querySelector('.light-time')?.textContent === '00:00');
await page.clock.resume();
assert.equal(await page.locator('.light-time').innerText(), '00:00', 'Theme clock updates without reloading, including midnight');

await page.getByRole('button', { name: 'ดูผลงานทั้ง 19 ชิ้น' }).click();
assert.equal(await page.locator('.project-visual > svg').count(), 19);
assert.equal(await page.locator('.project-visual > img').count(), 0);
assert.equal(await page.locator('.photo-available').count(), 6);
assert.equal(await page.locator('.project-photo[src*="/images/references/"]').count(), 0);
assert.equal(await page.locator('img[src*="-photo.png"]').count(), 0);
for (const width of [320, 390, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const mode of ['มืด', 'สว่าง', 'ตามเวลาจริง']) {
    await page.getByRole('button', { name: mode, exact: true }).click();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${mode} overflows at ${width}`);
  }
}
assert.deepEqual(errors, []);
await browser.close();
console.log('PASS: 1,440 time samples, text contrast, all 3 themes, persistence, local clock phases, live midnight rollover, themed modal, 19 animated covers + 6 preserved project-photo sets, 5 responsive widths.');
