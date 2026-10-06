import type { Metadata } from 'next';
import PIDLab from '@/components/pid/PIDLab';
export const metadata:Metadata={
  title:'PID Tuning Lab',
  description:'Interactive PID tuning: DC motor with encoder, inverted pendulum and cart-pole. Physics simulation and live response plots.',
  alternates:{canonical:'/pid-lab'},
  openGraph:{title:'Interactive PID Tuning Lab — Theetawatch',url:'/pid-lab'},
};
export default function PIDLabPage(){return <PIDLab/>;}
