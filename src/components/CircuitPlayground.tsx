'use client';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocale } from './LocaleProvider';
const signal = keyframes`to{stroke-dashoffset:-100;}`;
const halo = keyframes`50%{opacity:.25;transform:scale(1.12);}`;
const Lab = styled.section`
  border-bottom:1px solid var(--border);background:var(--surface);
  .lab-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:55px;align-items:center;}
  .lab-copy p{max-width:380px;font-size:13px;color:var(--muted);line-height:1.9;}
  .lab-controls{display:flex;flex-wrap:wrap;gap:8px;margin:25px 0 20px;}
  button{padding:10px 13px;border:1px solid var(--border);background:var(--bg);color:var(--text);font-size:11px;border-radius:4px;}
  button[aria-pressed='true']{border-color:var(--accent);color:var(--accent);background:var(--surface-strong);}
  .lab-slider{display:grid;grid-template-columns:1fr auto;gap:12px;font-size:11px;color:var(--muted);max-width:350px;}
  .lab-slider input{grid-column:1/-1;width:100%;accent-color:var(--accent);cursor:ew-resize;}
  .lab-display{border:1px solid var(--border);border-radius:12px;background:radial-gradient(ellipse,var(--glow),transparent 70%),var(--bg);padding:20px;box-shadow:inset 0 0 70px var(--shadow);min-width:0;}
  .lab-display svg{width:100%;height:auto;display:block;overflow:visible;}
  .wire{fill:none;stroke:var(--border);stroke-width:2;}
  .live-wire{fill:none;stroke:var(--accent);stroke-width:2;stroke-dasharray:5 15;animation:${signal} 2s linear infinite;}
  &[data-power='off'] .live-wire{animation:none;opacity:.1;}
  .lab-rotor{transform-origin:350px 120px;}
  .lab-halo{transform-origin:350px 120px;animation:${halo} 3s ease-in-out infinite;}
  .lab-readings{border-top:1px solid var(--border);padding-top:15px;display:flex;justify-content:space-between;gap:10px;font:9px var(--mono);color:var(--muted);}
  .lab-readings strong{display:block;font-size:25px;color:var(--accent);margin:5px 0;font-variant-numeric:tabular-nums;}
  .lab-state{align-self:end;text-align:right;max-width:150px;line-height:1.8;}
  @media(max-width:760px){.lab-grid{grid-template-columns:1fr;gap:30px;}.lab-controls{margin:20px 0;}.lab-display{padding:14px;}.lab-slider{max-width:none;}}
`;
export default function CircuitPlayground({effects}:{effects:boolean}){
  const {t}=useLocale();const [power,setPower]=useState(true);const [speed,setSpeed]=useState(48);const [reverse,setReverse]=useState(false);const [sensor,setSensor]=useState(false);
  const rotor=useRef<SVGGElement>(null);
  useEffect(()=>{if(!rotor.current||!effects||!power||!speed)return;const animation=rotor.current.animate([{transform:'rotate(0deg)'},{transform:`rotate(${reverse?-360:360}deg)`}],{duration:300000/(speed*60),iterations:Infinity});return()=>animation.cancel();},[effects,power,speed,reverse]);
  return <Lab data-power={power?'on':'off'} id="signal-lab"><div className="wrap section lab-grid"><div className="lab-copy"><div className="section-label"><span className="line"/>{t('SIGNAL LAB / INTERACTIVE DEMO')}</div><h2>{t('A little input.')}<br/><span className="muted">{t('A visible response.')}</span></h2><p>{t('Change the signal. Watch the system respond. This is a simulation, not live hardware.')}</p><div className="lab-controls"><button aria-pressed={power} onClick={()=>setPower(!power)}>{t(power?'Power off':'Power on')}</button><button aria-pressed={reverse} onClick={()=>setReverse(!reverse)}>{t('Reverse direction')}</button><button aria-pressed={sensor} onClick={()=>setSensor(!sensor)}>{t(sensor?'Sensor clear':'Sensor trigger')}</button></div><label className="lab-slider">{t('Motor power')}<output>{speed}%</output><input aria-label={t('Motor speed')} type="range" min="0" max="100" value={speed} onChange={e=>setSpeed(Number(e.target.value))}/></label></div>
  <div className="lab-display"><svg viewBox="0 0 450 250" aria-hidden="true"><defs><linearGradient id="rotor-metal" x2="1" y2="1"><stop stopColor="#d8e2e6"/><stop offset=".4" stopColor="#5f7686"/><stop offset="1" stopColor="#182d3d"/></linearGradient><radialGradient id="rotor-shadow"><stop stopColor="#07121b" stopOpacity=".45"/><stop offset="1" stopColor="#07121b" stopOpacity="0"/></radialGradient></defs>
    <ellipse cx="350" cy="205" rx="90" ry="25" fill="url(#rotor-shadow)"/>
    <path className="wire" d="M65 130h75V90h100v30h42M65 130v75h210v-40"/><path className="live-wire" d="M65 130h75V90h100v30h42M65 130v75h210v-40"/>
    <rect x="29" y="98" width="62" height="66" rx="7" fill="var(--surface-strong)" stroke="var(--accent)"/><circle cx="60" cy="119" r="8" fill={power&&sensor?'var(--warm)':'var(--border)'}/><path d="M45 145h30" stroke="var(--muted)" strokeWidth="3"/>
    <rect x="158" y="60" width="80" height="80" rx="6" fill="var(--surface-strong)" stroke="var(--accent)"/>{Array.from({length:8},(_,i)=><path key={i} d={`M${164+i*9} 53v7m0 80v7`} stroke="var(--muted)" strokeWidth="3"/>)}<text x="198" y="94" textAnchor="middle" fill="var(--accent)" fontSize="12" fontFamily="monospace">ESP32</text><text x="198" y="117" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="monospace">PWM {power?speed:0}%</text>
    <circle className="lab-halo" cx="350" cy="120" r="75" fill="none" stroke="var(--accent)" opacity=".35" strokeDasharray="3 7"/><circle cx="350" cy="120" r="56" fill="url(#rotor-metal)" stroke="#aebec7" strokeWidth="2"/><circle cx="350" cy="120" r="45" fill="#11212d"/>
    <g ref={rotor} className="lab-rotor">{Array.from({length:8},(_,i)=><path key={i} d="M345 108q-32-38 9-28l7 29Z" transform={`rotate(${i*45} 350 120)`} fill="url(#rotor-metal)" stroke="#8da7b9"/>)}<circle cx="350" cy="120" r="15" fill="url(#rotor-metal)"/><circle cx="350" cy="120" r="5" fill="#182d3d"/></g>
    <text x="30" y="236" fontSize="9" fill="var(--muted)" fontFamily="monospace">{t('INPUT → CONTROLLER → OUTPUT')}</text></svg><div className="lab-readings"><span>{t('SIMULATED RPM')}<strong data-testid="motor-rpm">{power?speed*60:0}</strong>{reverse?'↶ CCW':'↷ CW'}</span><span className="lab-state">{t(power&&sensor?'Signal received':'Waiting for input')}<br/>PWM · {(power?speed*3.3/100:0).toFixed(2)} V</span></div></div></div></Lab>;
}
