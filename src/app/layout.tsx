import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { LocaleProvider } from '@/components/LocaleProvider';
import Registry from '@/components/Registry';
import { AppearanceProvider } from '@/components/AppearanceProvider';
import { profile } from '@/data/portfolio';
import { absoluteUrl, githubUrl, siteDescription, siteName, siteUrl, socialImagePath } from '@/lib/siteMetadata';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteName,
  title: { default: `${profile.name} — Portfolio`, template: `%s — ${profile.firstName}` },
  description: siteDescription,
  keywords: ['Mechatronics', 'Robotics', 'Automation', 'PLC', 'ESP32', 'PID', 'ROS 2', 'Portfolio'],
  authors: [{ name: profile.name, url: githubUrl }],
  creator: profile.name,
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg' },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: '/',
    siteName,
    title: `${profile.name} — Mechatronics, Robotics & Automation`,
    description: siteDescription,
    images: [{ url: absoluteUrl(socialImagePath), width: 1327, height: 628, alt: `${profile.name} engineering portfolio` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — Mechatronics, Robotics & Automation`,
    description: siteDescription,
    images: [absoluteUrl(socialImagePath)],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
    </head>
    <body><Registry><AntdRegistry><LocaleProvider><AppearanceProvider>{children}</AppearanceProvider></LocaleProvider></AntdRegistry></Registry></body>
  </html>;
}
