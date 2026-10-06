import type { Metadata } from 'next';
import WorkIndex from '@/components/work/WorkNotebook';
export const metadata: Metadata = { title: 'Project notebook — Theetawatch', description: 'Twelve engineering projects: automation, smart devices, robotics, ROS 2 and PLC training.' };
export default function WorkPage(){return <WorkIndex/>;}
