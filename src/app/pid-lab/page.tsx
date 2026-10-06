import type { Metadata } from 'next';
import PIDLab from '@/components/pid/PIDLab';
export const metadata:Metadata={title:'PID Lab — Theetawatch',description:'Interactive PID tuning: DC motor with encoder, inverted pendulum and cart-pole. Physics simulation and live response plots.'};
export default function PIDLabPage(){return <PIDLab/>;}
