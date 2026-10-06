'use client';
import { useId, useState } from 'react';
import type { Sample } from '@/lib/pid/engine';
import { usePIDText } from './text';
export type Signal='tracking'|'speed'|'angle'|'effort';
export function ResponseChart({history,baseline,signal,unit,windowSeconds,limit}:{history:Sample[];baseline?:Sample[];signal:Signal;unit:string;windowSeconds:number;limit?:number}){
  const t=usePIDText();const id=useId().replace(/:/g,'');const [hover,setHover]=useState<number|null>(null);
  const end=Math.max(5,history.at(-1)?.t??0),start=Math.max(0,end-windowSeconds),width=720,height=signal==='effort'?142:222,left=53,right=15,top=18,bottom=29;
  const actual=(s:Sample)=>signal==='speed'?s.speed:signal==='angle'?s.angle:signal==='effort'?s.effort:s.value;
  const target=(s:Sample)=>signal==='speed'?s.speedTarget:signal==='angle'?s.angleTarget:s.target;
  const selected=history.filter(s=>s.t>=start);const old=(baseline??[]).filter(s=>s.t>=start&&s.t<=end);
  const values=[0,...selected.flatMap(s=>signal==='effort'?[actual(s)]:[actual(s),target(s)]),...old.map(actual)];
  let min=Math.min(...values),max=Math.max(...values);
  const minimum=unit==='m'?.04:unit==='°'?4:unit==='RPM'?20:1;
  if(signal==='effort'&&limit){min=-limit*1.12;max=limit*1.12;}else{const margin=Math.max((max-min)*.14,minimum/2);min-=margin;max+=margin;}
  const x=(time:number)=>left+(time-start)/(end-start)*(width-left-right),y=(value:number)=>top+(max-value)/(max-min)*(height-top-bottom);
  const points=(data:Sample[],get:(s:Sample)=>number)=>data.map((s,i)=>`${i?'L':'M'}${x(s.t).toFixed(2)},${y(get(s)).toFixed(2)}`).join(' ');
  const format=(n:number)=>Math.abs(n)>=100?n.toFixed(0):Math.abs(n)>=10?n.toFixed(1):n.toFixed(2);
  const inspected=hover===null?null:selected[Math.min(selected.length-1,Math.max(0,Math.round(hover*(selected.length-1))))];
  return <div className="chart" data-signal={signal}>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${t('response')} · ${unit}`} onPointerMove={event=>{const bounds=event.currentTarget.getBoundingClientRect();setHover(Math.max(0,Math.min(1,((event.clientX-bounds.left)/bounds.width*width-left)/(width-left-right))));}} onPointerLeave={()=>setHover(null)}>
      <defs><clipPath id={id}><rect x={left} y={top} width={width-left-right} height={height-top-bottom}/></clipPath></defs>
      {Array.from({length:5},(_,i)=>{const v=min+(max-min)*i/4;return <g key={i}><line className="chart-grid" x1={left} x2={width-right} y1={y(v)} y2={y(v)}/><text className="chart-label" x={left-8} y={y(v)+3} textAnchor="end">{format(v)}</text></g>;})}
      {Array.from({length:6},(_,i)=>{const time=start+(end-start)*i/5;return <g key={i}><line className="chart-grid" x1={x(time)} x2={x(time)} y1={top} y2={height-bottom}/><text className="chart-label" x={x(time)} y={height-9} textAnchor="middle">{time.toFixed(1)}</text></g>;})}
      <text className="chart-label" x="9" y="10">{unit}</text><text className="chart-label" x={width-5} y={height-9}>s</text>
      <g clipPath={`url(#${id})`}>
        {signal!=='effort'&&<path className="chart-line chart-target" d={points(selected,target)}/>}
        {!!old.length&&<path className="chart-line chart-baseline" d={points(old,actual)}/>}
        <path className={`chart-line ${signal==='effort'?'chart-effort':'chart-actual'}`} d={points(selected,actual)}/>
        {inspected&&<><line x1={x(inspected.t)} x2={x(inspected.t)} y1={top} y2={height-bottom} stroke="var(--muted)" strokeDasharray="2 3"/><circle cx={x(inspected.t)} cy={y(actual(inspected))} r="3.5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2"/></>}
      </g>
      {history.length<2&&<text className="chart-empty" x={width/2} y={height/2} textAnchor="middle">{t('chartEmpty')}</text>}
    </svg>
    {inspected&&<div className="chart-inspector">{inspected.t.toFixed(2)} s · {format(actual(inspected))} {unit}</div>}
  </div>;
}
