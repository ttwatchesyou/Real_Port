'use client';
import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Button, ConfigProvider, InputNumber, Switch, theme } from 'antd';
import thTH from 'antd/locale/th_TH';import enUS from 'antd/locale/en_US';import zhCN from 'antd/locale/zh_CN';
import { PlayCircleOutlined, PauseOutlined, ReloadOutlined, DownloadOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { GlobalStyle } from '../styles';
import { useAppearance } from '../AppearanceProvider';
import AppearanceSwitcher from '../AppearanceSwitcher';
import { LanguageSwitcher, useLocale } from '../LocaleProvider';
import { LabShell } from './styles';
import { usePIDText } from './text';
import { useSimulation } from './useSimulation';
import PlantScene, { type LivePlant } from './PlantScene';
import { ResponseChart, type Signal } from './ResponseChart';
import { defaults, sample, noLoadRPM, type Config, type Gains, type Plant } from '@/lib/pid/engine';

export function PlantIcon({plant}:{plant:Plant}){
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{plant==='motor'?<><rect x="6" y="13" width="21" height="22" rx="5"/><path d="M27 24h15M12 17v14m5-14v14m5-14v14"/><circle cx="35" cy="24" r="9"/><path d="M35 15v5m0 8v5"/></>:<><path d="M5 39h38"/><rect x="17" y="30" width="14" height="7" rx="2"/><path d="M24 30 30 9"/><circle cx="30" cy="9" r="4"/><path d="M24 30V7" strokeDasharray="2 3"/>{plant==='cart'?<><circle cx="19" cy="38" r="2"/><circle cx="29" cy="38" r="2"/><path d="M5 43h38"/></>:<path d="M22 37v2m4-2v2"/>}</>}</svg>;
}
function GainEditor({value,onChange,plant,outer=false}:{value:Gains;onChange:(g:Gains)=>void;plant:Plant;outer?:boolean}){
  const t=usePIDText(),id=useId();
  const max=outer?(plant==='cart'?[.8,.15,1]:[150,20,10]):plant==='motor'?[4,15,.15]:plant==='pendulum'?[30,8,5]:[100,15,30];
  const steps=outer?(plant==='cart'?[.01,.001,.01]:[1,.1,.1]):plant==='motor'?[.05,.1,.001]:[.1,.1,.1];
  return <>{(['kp','ki','kd']as const).map((key,i)=><div className="gain-row" key={key}><div className="gain-top"><label htmlFor={`${id}-${key}`}><b>{key.toUpperCase()}</b><small>{t(['proportional','integral','derivative'][i])}</small></label><EditableNumber id={`${id}-${key}`} ariaLabel={`${outer?'Outer':'Inner'} ${key.toUpperCase()}`} min={0} max={max[i]} step={steps[i]} value={value[key]} onChange={n=>onChange({...value,[key]:n})}/></div><input type="range" aria-label={`${outer?'Outer':'Inner'} ${key.toUpperCase()} slider`} min="0" max={max[i]} step={steps[i]} value={value[key]} onChange={e=>onChange({...value,[key]:Number(e.target.value)})}/></div>)}</>;
}
function EditableNumber({id,ariaLabel,value,min,max,step,onChange,disabled=false}:{id:string;ariaLabel?:string;value:number;min:number;max:number;step:number;onChange:(n:number)=>void;disabled?:boolean}){
  const [draft,setDraft]=useState(String(value)),editing=useRef(false);
  useEffect(()=>{if(!editing.current)setDraft(String(value));},[value]);
  const commit=()=>{editing.current=false;if(draft.trim()==='')return;const parsed=Number(draft);if(!Number.isFinite(parsed)){setDraft(String(value));return;}const next=Math.max(min,Math.min(max,parsed));setDraft(String(next));if(next!==value)onChange(next);};
  return <InputNumber<string> id={id} aria-label={ariaLabel} stringMode value={draft} min={String(min)} max={String(max)} step={String(step)} disabled={disabled} inputMode={min<0?'decimal':'numeric'} onFocus={()=>{editing.current=true;}} onChange={n=>setDraft(n===null?'':String(n))} onBlur={commit} onPressEnter={commit}/>;
}
function Parameter({label,value,min,max,step,onChange,disabled=false}:{label:string;value:number;min:number;max:number;step:number;onChange:(n:number)=>void;disabled?:boolean}){
  const id=useId();return <div><label className="control-label" htmlFor={id}>{label}</label><EditableNumber id={id} value={value} min={min} max={max} step={step} disabled={disabled} onChange={onChange}/></div>;
}
export default function PIDLab(){
  const t=usePIDText(),{locale}=useLocale(),{palette}=useAppearance();
  const sim=useSimulation(),{plant,active,running}=sim,{config:c,state:s,history,baseline}=active;
  const live=useRef<LivePlant>({state:s,config:c});live.current={state:s,config:c};
  const [target,setTarget]=useState<number|null>(c.target),[speed,setSpeed]=useState<number|null>(c.speed),[invalid,setInvalid]=useState(false),[signal,setSignal]=useState<Signal>('tracking'),[windowSeconds,setWindowSeconds]=useState(15);
  useEffect(()=>{setTarget(c.target);setSpeed(c.speed);setInvalid(false);setSignal('tracking');},[plant,c.mode,c.target,c.speed]);
  const point=sample(s,c),unit=plant==='motor'?(c.mode==='speed'?'RPM':'m'):plant==='pendulum'?'°':'m',effortUnit=plant==='motor'?'V':plant==='pendulum'?'N·m':'N';
  const failure=s.failure;
  let status= failure??(plant==='motor'&&Math.abs(c.speed)>noLoadRPM(c)?'unreachable':s.saturatedFor>.25?'saturated':!c.gains.kp&&!c.gains.ki&&!c.gains.kd?'off':!running?(s.t>0?'paused':'ready'):s.inBandFor>=1?'settled':'running');
  const level=failure?'error':['unreachable','saturated','off'].includes(status)?'warning':'info';
  const apply=()=>{const bound=plant==='motor'?5:plant==='pendulum'?20:.8;if(target===null||!Number.isFinite(target)||Math.abs(target)>bound||(plant==='motor'&&(speed===null||!Number.isFinite(speed)||Math.abs(speed)>1200||(c.mode==='position'&&speed<=0)))){setInvalid(true);return;}setInvalid(false);sim.command({target,speed:speed??0});};
  const preset=(kind:string)=>{const nominal=defaults(plant);const base={...c,gains:{...nominal.gains},outer:{...nominal.outer}};if(kind==='pOnly')base.gains={...base.gains,ki:0,kd:0};if(kind==='noControl')base.gains={kp:0,ki:0,kd:0};sim.reset(base);};
  const physical=(change:Partial<Config>)=>sim.update(change,true);
  const exportCSV=()=>{const names=['t','target','value','speed','speedTarget','angle','angleTarget','position','effort','current','encoder','p','i','d'] as const;const heading=['time_s',`target_${unit}`,`measured_${unit}`,'speed_RPM','speed_reference_RPM','angle_deg','angle_reference_deg','position_m',`effort_${effortUnit}`,'current_A','encoder_counts',`P_${effortUnit}`,`I_${effortUnit}`,`D_${effortUnit}`];const rows=history.map(row=>names.map(name=>Number(row[name].toFixed(7))).join(','));const blob=new Blob([heading.join(',')+'\n'+rows.join('\n')],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=url;anchor.download=`pid-${plant}-${plant==='motor'?c.mode:'balance'}-${Date.now()}.csv`;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  const changePlant=(next:Plant)=>sim.switchPlant(next);
  const fields=plant==='motor'?[{key:'limit',label:'voltage',min:1,max:24,step:1},{key:'friction',label:'friction',min:0,max:.02,step:.001},{key:'load',label:'load',min:-.2,max:.2,step:.01},{key:'cpr',label:'encoder',min:64,max:8192,step:64}]:[{key:'limit',label:plant==='pendulum'?'torque':'force',min:.2,max:plant==='pendulum'?8:30,step:.1},{key:'mass',label:'mass',min:.1,max:1,step:.05},{key:'length',label:'length',min:.3,max:1,step:.05},{key:'friction',label:'friction',min:0,max:.3,step:.01},{key:'initialAngle',label:'initialAngle',min:-45,max:45,step:1}];
  return <ConfigProvider locale={locale==='th'?thTH:locale==='zh'?zhCN:enUS} theme={{algorithm:palette.isDark?theme.darkAlgorithm:theme.defaultAlgorithm,token:{colorPrimary:palette.accent,colorBgContainer:palette.surface,colorBgElevated:palette.surface,colorText:palette.text,colorTextSecondary:palette.muted,colorBorder:palette.border,borderRadius:5,fontFamily:'Kanit, Arial, sans-serif'},components:{Button:{colorPrimary:palette.accent,primaryColor:palette.bg}}}}>
    <GlobalStyle/><LabShell><header className="lab-nav"><div className="lab-wrap lab-nav-inner"><Link className="lab-brand" href="/">theetawatch.<span>CONTROL STUDIO</span></Link><div className="nav-tools"><Link className="back-link" href="/#projects">← {t('back')}</Link><AppearanceSwitcher/><LanguageSwitcher/></div></div></header>
      <main className="lab-wrap"><div className="lab-intro"><div><div className="kicker">INTERACTIVE ENGINEERING / 007</div><h1>PID <em>Lab.</em></h1><p className="intro-copy">{t('lead')}</p></div><span className="intro-tag">{t('educational')}</span></div>
        <div className="plant-tabs" role="tablist" aria-label={t('experiment')}>{(['motor','pendulum','cart']as const).map((item,i)=><button className="plant-tab" role="tab" id={`pid-tab-${item}`} aria-controls="pid-workspace" aria-selected={plant===item} tabIndex={plant===item?0:-1} key={item} onClick={()=>changePlant(item)} onKeyDown={event=>{const items:Plant[]=['motor','pendulum','cart'];let index=i;if(event.key==='ArrowRight')index=(i+1)%3;else if(event.key==='ArrowLeft')index=(i+2)%3;else if(event.key==='Home')index=0;else if(event.key==='End')index=2;else return;event.preventDefault();changePlant(items[index]);document.getElementById(`pid-tab-${items[index]}`)?.focus();}}><PlantIcon plant={item}/><span><small>0{i+1} / {t(item+'Sub')}</small><strong>{t(item)}</strong></span><span className="plant-arrow">↗</span></button>)}</div>
        <div className="workspace" id="pid-workspace" role="tabpanel" aria-labelledby={`pid-tab-${plant}`}>
          <div className="lab-main">
            <section className="panel"><div className="panel-head"><h2><span className="panel-number">01</span>{t('liveModel')}</h2><small>{t('physicsModel')} / SI</small></div><PlantScene live={live} revision={sim.revision} onDisturb={sim.pointerDisturb}/>
              <div className="run-toolbar"><Button type="primary" icon={running?<PauseOutlined/>:<PlayCircleOutlined/>} onClick={sim.toggle} disabled={!!failure} data-testid="run-toggle">{t(running?'pause':'start')}</Button><Button icon={<ReloadOutlined/>} onClick={()=>sim.reset()}>{t('reset')}</Button><Button disabled={!!failure} onClick={()=>sim.push(-1)}>{t('nudgeLeft')}</Button><Button disabled={!!failure} onClick={()=>sim.push(1)}>{t('nudgeRight')}</Button><span className="clock">{t('simTime')} <strong data-testid="sim-time">{s.t.toFixed(2)}</strong> s</span></div>
              <div className="metrics">{[{label:'target',value:point.target,unit},{label:'actual',value:point.value,unit},{label:'error',value:point.target-point.value,unit},{label:'effort',value:s.effort,unit:effortUnit}].map(item=><div className="metric" key={item.label}><label>{t(item.label)}</label><strong data-testid={`metric-${item.label}`}>{Math.abs(item.value)<.0005?'0.00':item.value.toFixed(unit==='m'&&item.label!=='effort'?3:2)}</strong><small>{item.unit}</small></div>)}</div>
            </section>
            <div className="status" data-level={invalid?'error':level} role="status"><span className="status-icon">{failure||invalid||level==='warning'?<WarningOutlined/>:<CheckCircleOutlined/>}</span><div><strong>{invalid?t('invalidCommand'):t(status)}</strong><p>{!invalid&&t(status+'Help')}</p>{active.notice&&<p>{t(active.notice)}</p>}</div></div>
            <section className="panel chart-panel"><div className="panel-head"><h2><span className="panel-number">02</span>{t('response')}</h2><label className="chart-tools"><select aria-label={t('window')} value={windowSeconds} onChange={e=>setWindowSeconds(Number(e.target.value))}><option value="15">15 s</option><option value="30">30 s</option><option value="60">60 s</option></select></label></div>
              <div className="chart-compare"><button className="chart-mode" aria-pressed={signal==='tracking'} onClick={()=>setSignal('tracking')}>{t('tracking')}</button><button className="chart-mode" aria-pressed={signal!=='tracking'} onClick={()=>setSignal(plant==='motor'?'speed':'angle')}>{t(plant==='motor'?'speedTrace':'angleTrace')}</button></div>
              <ResponseChart history={history} baseline={baseline} signal={signal} unit={signal==='speed'?'RPM':signal==='angle'?'°':unit} windowSeconds={windowSeconds}/>
              <div className="chart-foot"><span><i className="legend-line"/>{t('actual')}</span><span><i className="legend-line legend-target"/>{t('targetLine')}</span>{!!baseline.length&&<span>┄ {t('recorded')}</span>}<span className="chart-value">{t('lastMinute')}</span></div>
              <div className="panel-head"><h3>{t('effort')}</h3><small>± {c.limit} {effortUnit}</small></div><ResponseChart history={history} signal="effort" unit={effortUnit} windowSeconds={windowSeconds} limit={c.limit}/>
              <div className="chart-compare"><Button size="small" onClick={sim.save} disabled={history.length<3}>{t('saveRun')}</Button>{!!baseline.length&&<Button size="small" onClick={sim.clearBaseline}>{t('clearSaved')}</Button>}<Button size="small" icon={<DownloadOutlined/>} onClick={exportCSV} disabled={history.length<2}>{t('export')}</Button></div>
            </section>
          </div>
          <aside className="panel control-panel"><div className="panel-head"><h2>{t('tune')}</h2><small>PID / {plant.toUpperCase()}</small></div><div className="control-body">
            <section className="control-section"><h3 className="control-label"><span><span className="panel-number">01</span>{t('command')}</span></h3>
              {plant==='motor'&&<div className="mode-toggle">{(['speed','position']as const).map(mode=><button key={mode} aria-pressed={c.mode===mode} onClick={()=>{sim.clearBaseline();sim.update({mode,speed:Math.max(30,Math.abs(c.speed))},true);}}>{t(mode+'Mode')}</button>)}</div>}
              <div className="control-row">{(plant!=='motor'||c.mode==='position')&&<div><label className="control-label" htmlFor="target-command">{t(plant==='motor'?'distance':plant==='pendulum'?'angleCommand':'cartCommand')}</label><InputNumber id="target-command" min={plant==='motor'?-5:plant==='pendulum'?-20:-.8} max={plant==='motor'?5:plant==='pendulum'?20:.8} step={plant==='pendulum'?1:.1} value={target} inputMode="decimal" onChange={setTarget}/></div>}{plant==='motor'&&<div><label className="control-label" htmlFor="speed-command">{t(c.mode==='speed'?'rpm':'maxRPM')}</label><InputNumber id="speed-command" min={c.mode==='speed'?-1200:1} max={1200} step={10} value={speed} inputMode="decimal" onChange={setSpeed}/></div>}</div>
              <Button className="command-button" onClick={apply} disabled={!!failure}>{t('apply')}</Button><p className="control-note">{t(plant==='motor'?c.mode==='speed'?'speedHelp':'positionHelp':plant+'Help')}</p>
            </section>
            <section className="control-section"><div className="control-label"><span><span className="panel-number">02</span>{t(plant==='motor'?'speedLoop':'angleLoop')}</span></div><div className="preset-row">{['balanced','pOnly','noControl'].map(key=><button key={key} onClick={()=>preset(key)}>{t(key)}</button>)}</div><GainEditor value={c.gains} onChange={gains=>sim.update({gains})} plant={plant}/><div className="term-readings"><span>P {s.inner.p.toFixed(2)}</span><span>I {s.inner.i.toFixed(2)}</span><span>D {s.inner.d.toFixed(2)}</span></div><p className="control-note">{t(plant+'Units')}<br/>{t('liveGains')} {t('presetNote')}</p>
              {(plant==='cart'||plant==='motor'&&c.mode==='position')&&<details><summary>{t('outerLoop')}</summary><p>{t(plant==='cart'?'cartOuter':'motorOuter')}</p><GainEditor value={c.outer} onChange={outer=>sim.update({outer})} plant={plant} outer/></details>}
            </section>
            <section className="control-section"><details><summary>{t('safeguards')}</summary><div className="option-row"><label htmlFor="anti-windup">{t('antiWindup')}</label><Switch id="anti-windup" checked={c.antiWindup} onChange={antiWindup=>sim.update({antiWindup})}/></div><Parameter label={t('derivativeFilter')} value={c.derivativeTau} min={.005} max={.2} step={.005} onChange={derivativeTau=>sim.update({derivativeTau})}/><p>{t('safeguardHelp')}</p></details>
              <details><summary>{t('system')}</summary><p>{t('systemNote')}</p><div className="system-fields">{fields.map(field=><Parameter key={field.key} label={t(field.label)+(field.key==='friction'?(plant==='cart'?' (N·s/m)':' (N·m·s/rad)'):'')} value={c[field.key as keyof Config] as number} min={field.min} max={field.max} step={field.step} onChange={n=>physical({[field.key]:n})}/>)}</div>{plant==='motor'&&<p>{t('encoderHelp')}</p>}</details>
            </section>
          </div></aside>
        </div>
        <div className="learning-grid">{[1,2,3].map(i=><article className="learning-card" key={i}><span className="step">0{i} / {['P','D','I'][i-1]}</span><h3>{t('learn'+i)}</h3><p>{t('learn'+i+'Body')}</p></article>)}</div>
        <div className="model-notes"><details><summary>{t('assumptions')}</summary><p>{t('modelScope')}</p><pre className="equations">{plant==='motor'?'L di/dt = V − R i − K ω\nJ dω/dt = K i − b ω − τload\nx = r θ;   encoder = round(θ × CPR / 2π)\nR = 2 Ω; L = 0.03 H; J = 0.002 kg·m²; K = 0.1; r = 0.03 m':plant==='pendulum'?'m l² θ̈ = m g l sin(θ) − b θ̇ + τ\nθ = 0 at upright; θ > 0 leans right; g = 9.81 m/s²':'(M + m) ẍ + m l cos(θ) θ̈ − m l sin(θ) θ̇² = F − b ẋ\nm l cos(θ) ẍ + m l² θ̈ − m g l sin(θ) = −bp θ̇\nM = 0.7 kg; bp = 0.005 N·m·s/rad; g = 9.81 m/s²'}</pre><p>{t('band')}</p><div className="source-links"><a href="https://ctms.engin.umich.edu/CTMS/index.php?example=MotorSpeed&section=SystemModeling" target="_blank" rel="noreferrer">Michigan CTMS · DC motor ↗</a><a href="https://underactuated.mit.edu/pend.html" target="_blank" rel="noreferrer">MIT · Pendulum ↗</a><a href="https://underactuated.mit.edu/acrobot.html#cart_pole" target="_blank" rel="noreferrer">MIT · Cart-pole ↗</a><a href="https://www.mathworks.com/help/simulink/slref/pidcontroller.html" target="_blank" rel="noreferrer">MathWorks · PID ↗</a></div></details></div>
      </main><footer className="lab-footer"><div className="lab-wrap"><Link href="/#projects">← {t('back')}</Link><span>{t('footer')}</span></div></footer>
    </LabShell>
  </ConfigProvider>;
}
