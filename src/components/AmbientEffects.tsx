'use client';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocale } from './LocaleProvider';
const Ambient=styled.div`
  .reading-progress{position:fixed;top:0;left:0;right:0;height:2px;background:var(--accent);transform-origin:left;transform:scaleX(0);z-index:60;box-shadow:0 0 10px var(--accent);pointer-events:none;}
  .pointer-glow{position:fixed;width:420px;height:420px;left:-210px;top:-210px;border-radius:50%;background:radial-gradient(circle,var(--glow),transparent 68%);opacity:.55;pointer-events:none;z-index:2;mix-blend-mode:screen;}
  .back-top{position:fixed;right:22px;bottom:22px;z-index:15;background:var(--surface);color:var(--accent);border:1px solid var(--border);width:40px;height:40px;border-radius:50%;box-shadow:0 5px 24px var(--shadow);font-size:20px;}
  .back-top[hidden]{display:none;}
  @media(pointer:coarse){.pointer-glow{display:none;}}
  @media(max-width:560px){.back-top{right:12px;bottom:12px;width:34px;height:34px;}}
`;
export default function AmbientEffects({effects}:{effects:boolean}){
  const {t}=useLocale();const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const host=root.current!;const progress=host.querySelector<HTMLElement>('.reading-progress')!;const button=host.querySelector<HTMLButtonElement>('.back-top')!;
    const meter=progress.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:1000,fill:'both'});meter.pause();let raf=0;
    const update=()=>{raf=0;meter.currentTime=window.scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*1000;button.hidden=window.scrollY<650;};
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(update);};window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);update();
    return()=>{meter.cancel();cancelAnimationFrame(raf);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  },[]);
  useEffect(()=>{
    if(!effects)return;
    const glow=root.current!.querySelector<HTMLElement>('.pointer-glow')!;let animation:Animation|undefined,frame=0,x=0,y=0;
    const draw=()=>{frame=0;animation?.cancel();animation=glow.animate([{transform:`translate(${x}px,${y}px)`}],{duration:1,fill:'forwards'});};
    const move=(event:PointerEvent)=>{if(event.pointerType!=='mouse')return;x=event.clientX;y=event.clientY;if(!frame)frame=requestAnimationFrame(draw);};
    window.addEventListener('pointermove',move,{passive:true});return()=>{window.removeEventListener('pointermove',move);cancelAnimationFrame(frame);animation?.cancel();};
  },[effects]);
  return <Ambient ref={root}><div className="reading-progress" aria-hidden="true"/>{effects&&<div className="pointer-glow" aria-hidden="true"/>}<button className="back-top" aria-label={t('Back to top')} hidden onClick={()=>window.scrollTo({top:0,behavior:effects?'smooth':'instant'})}>↑</button></Ambient>;
}
