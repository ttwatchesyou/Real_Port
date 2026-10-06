import type { Metadata } from 'next';
import WorkIndex from '@/components/work/WorkNotebook';
export const metadata: Metadata = {
  title: 'Project notebook',
  description: 'Twelve engineering projects: automation, smart devices, robotics, ROS 2 and PLC training.',
  alternates: { canonical: '/work' },
  openGraph: { title: 'Project notebook — Theetawatch', url: '/work' },
};
export default function WorkPage(){return <WorkIndex/>;}
