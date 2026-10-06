const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;

function toUrl(value: string) {
  return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
}

export const hasPublicSiteUrl = Boolean(configuredUrl);
export const siteUrl = configuredUrl ? toUrl(configuredUrl) : new URL('http://localhost:3000');
export const siteName = 'Theetawatch — Mechatronics & Robotics Portfolio';
export const siteDescription = 'พอร์ตของ ธีร์ธวัช ตั้งตระกูลธนะกิจ รวมงานเมคคาทรอนิกส์ หุ่นยนต์ ระบบอัตโนมัติ ไมโครคอนโทรลเลอร์ และบันทึกการทดลอง';
export const githubUrl = 'https://github.com/ttwatchesyou';
export const repositoryUrl = 'https://github.com/ttwatchesyou/Real_Port';
export const socialImagePath = '/images/my-work/competition-news.webp';

export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString();
}
