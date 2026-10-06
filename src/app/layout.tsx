import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { LocaleProvider } from '@/components/LocaleProvider';
import Registry from '@/components/Registry';
import { AppearanceProvider } from '@/components/AppearanceProvider';
import { profile } from '@/data/portfolio';

export const metadata: Metadata = { icons: { icon: '/icon.svg' }, title: `${profile.name} — Portfolio`, description: `พอร์ตของ ${profile.thaiName} — โปรเจกต์หุ่นยนต์ ไมโครคอนโทรลเลอร์ และเว็บ พร้อมบันทึกการทดลอง` };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body><Registry><AntdRegistry><LocaleProvider><AppearanceProvider>{children}</AppearanceProvider></LocaleProvider></AntdRegistry></Registry></body></html>;
}
