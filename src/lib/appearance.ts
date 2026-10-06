export type AppearanceMode = 'auto' | 'dark' | 'light';
type BaseColors = { bg: string; surface: string; surfaceStrong: string; accent: string; warm: string; skyOne: string; skyTwo: string };
export type AppearancePalette = BaseColors & { text: string; muted: string; border: string; nav: string; action: string; onAction: string; grid: string; glow: string; shadow: string; isDark: boolean; phase: string; phaseLabel: string };

const NIGHT: BaseColors = { bg: '#0b111c', surface: '#111c2a', surfaceStrong: '#1b2c3e', accent: '#79d6ec', warm: '#edbc7a', skyOne: '#254f76', skyTwo: '#33315d' };
const CREAM: BaseColors = { bg: '#f5efe4', surface: '#fffbf3', surfaceStrong: '#e7ddcd', accent: '#506a5b', warm: '#946245', skyOne: '#d9dfcc', skyTwo: '#ead3c2' };
const DAWN: BaseColors = { bg: '#393044', surface: '#443c50', surfaceStrong: '#53495f', accent: '#bcddea', warm: '#f7c991', skyOne: '#9c6e93', skyTwo: '#c18872' };
const SUNRISE: BaseColors = { bg: '#f4ddd0', surface: '#fff0e3', surfaceStrong: '#e8cbbf', accent: '#496c7b', warm: '#85532f', skyOne: '#efb9a4', skyTwo: '#ecd5ad' };
const GOLDEN: BaseColors = { bg: '#f1e4d2', surface: '#faf0de', surfaceStrong: '#e9d8bf', accent: '#526a70', warm: '#885122', skyOne: '#efd092', skyTwo: '#e9bdac' };
const SUNSET: BaseColors = { bg: '#e6b6a3', surface: '#f7d7bc', surfaceStrong: '#d8a492', accent: '#614965', warm: '#743e25', skyOne: '#d68d79', skyTwo: '#9d8fc0' };
const DUSK: BaseColors = { bg: '#302f48', surface: '#39374f', surfaceStrong: '#4e4664', accent: '#c4c9f0', warm: '#ffc899', skyOne: '#985d70', skyTwo: '#55548f' };

const anchors: { minute: number; colors: BaseColors }[] = [
  { minute: 0, colors: NIGHT }, { minute: 300, colors: NIGHT },
  { minute: 345, colors: DAWN }, { minute: 420, colors: SUNRISE },
  { minute: 540, colors: CREAM }, { minute: 900, colors: CREAM },
  { minute: 990, colors: GOLDEN }, { minute: 1050, colors: SUNSET },
  { minute: 1140, colors: DUSK }, { minute: 1230, colors: NIGHT },
  { minute: 1440, colors: NIGHT },
];
const rgb = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
export function mixColor(a: string, b: string, ratio: number) {
  const from = rgb(a), to = rgb(b);
  return '#' + from.map((n, i) => Math.round(n + (to[i] - n) * ratio).toString(16).padStart(2, '0')).join('');
}
function luminance(hex: string) {
  const channels = rgb(hex).map(n => { const s = n / 255; return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4; });
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
export function contrastRatio(a: string, b: string) { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
function readable(foreground: string, backgrounds: string[], fallback: string) {
  for (let step = 0; step <= 20; step++) {
    const candidate = mixColor(foreground, fallback, step / 20);
    if (backgrounds.every(bg => contrastRatio(candidate, bg) >= 4.5)) return candidate;
  }
  return fallback;
}
export function phaseAt(minute: number) {
  if (minute < 300 || minute >= 1230) return { phase: 'night', phaseLabel: 'แสงกลางคืน' };
  if (minute < 420) return { phase: 'dawn', phaseLabel: 'แสงเช้า' };
  if (minute < 960) return { phase: 'day', phaseLabel: 'แสงกลางวัน' };
  if (minute < 1050) return { phase: 'golden', phaseLabel: 'แสงเย็น' };
  if (minute < 1140) return { phase: 'sunset', phaseLabel: 'แสงอาทิตย์ตก' };
  return { phase: 'dusk', phaseLabel: 'แสงพลบค่ำ' };
}

// Local clock schedule, not astronomical sunrise/sunset. No location permission needed.
export function paletteAt(mode: AppearanceMode, minute: number): AppearancePalette {
  minute = ((minute % 1440) + 1440) % 1440;
  let base: BaseColors;
  if (mode === 'dark') base = NIGHT;
  else if (mode === 'light') base = CREAM;
  else {
    const index = anchors.findIndex((stop, i) => i < anchors.length - 1 && minute >= stop.minute && minute < anchors[i + 1].minute);
    const a = anchors[Math.max(0, index)], b = anchors[Math.max(0, index) + 1];
    const ratio = (minute - a.minute) / (b.minute - a.minute);
    base = Object.fromEntries(Object.keys(a.colors).map(key => [key, mixColor(a.colors[key as keyof BaseColors], b.colors[key as keyof BaseColors], ratio)])) as BaseColors;
  }
  const darkInk = '#000000', lightInk = '#ffffff';
  const isDark = contrastRatio(lightInk, base.bg) > contrastRatio(darkInk, base.bg);
  const ink = isDark ? lightInk : darkInk;
  // Keep raised surfaces readable while the sky passes through middle tones.
  const surfaceFor = (surface: string) => {
    for (let i = 0; i <= 20; i++) {
      const candidate = mixColor(surface, base.bg, i / 20);
      if (contrastRatio(candidate, ink) >= 4.5) return candidate;
    }
    return base.bg;
  };
  base = { ...base, surface: surfaceFor(base.surface), surfaceStrong: surfaceFor(base.surfaceStrong) };
  const backgrounds = [base.bg, base.surface, base.surfaceStrong];
  const text = readable(isDark ? '#edf2f6' : '#30313a', backgrounds, ink);
  const muted = readable(mixColor(base.bg, ink, .63), backgrounds, ink);
  const accent = readable(mixColor(base.accent, isDark ? '#a9e3ee' : '#496454', .45), backgrounds, ink);
  const warm = readable(mixColor(base.warm, isDark ? '#ffdb9d' : '#7d4426', .8), backgrounds, ink);
  const action = isDark ? '#efbd7b' : '#d8ad8d';
  return { ...base, accent, warm, text, muted, isDark,
    border: mixColor(base.bg, ink, .2), nav: base.bg + 'ed',
    action, onAction: '#25202a', grid: mixColor(base.bg, ink, .08),
    glow: base.skyOne + '35', shadow: isDark ? '#00000055' : '#614d2c18',
    ...(mode === 'auto' ? phaseAt(minute) : { phase: mode, phaseLabel: mode === 'dark' ? 'โหมดมืด' : 'ครีมพาสเทล' }),
  };
}
