'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useLocale } from './LocaleProvider';
import type { BoardModelHandle } from './BoardModel';

const BoardModel = dynamic(() => import('./BoardModel'), { ssr: false });

const stages = [
  { label: 'Together', title: 'เริ่มจากบอร์ดหนึ่งตัว', text: 'ดูจากข้างนอกก็เป็นบอร์ดเล็ก ๆ ตัวหนึ่ง ลองเลื่อนลงอีกนิด แล้วดูว่าข้างในมีอะไรบ้าง', note: '01 / THE WHOLE BOARD' },
  { label: 'Take it apart', title: 'ลองแยกออกมาดู', text: 'ขาโลหะ ชิป ตัวต้านทาน คาปาซิเตอร์ และ USB ต่างแยกออกคนละทิศ ลองเล่นอัตโนมัติหรือลากตัวเลื่อนเพื่อสำรวจทุกชิ้น', note: '02 / 100+ INDEPENDENT PARTS' },
  { label: 'Put it back', title: 'แล้วประกอบกลับ', text: 'พอทุกชิ้นกลับเข้าที่ วงจรก็เชื่อมต่อกันอีกครั้ง เลื่อนย้อนขึ้นไปดูซ้ำ หรือขยับเมาส์เพื่อเปลี่ยนมุมได้เลย', note: '03 / BACK TOGETHER' },
];

const Assembly = styled.section`
  position:relative;height:300svh;border-bottom:1px solid var(--border);background:var(--bg);overflow:clip;
  &::before{content:'WORK / BENCH';position:absolute;left:-.04em;top:12svh;white-space:pre;font-size:clamp(90px,14vw,210px);font-weight:800;line-height:.7;letter-spacing:-.08em;color:var(--text);opacity:.022;pointer-events:none;}
  &::after{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(transparent,var(--accent) 25% 75%,transparent);opacity:.65;}
  .assembly-sticky{position:sticky;top:86px;height:calc(100svh - 86px);min-height:610px;max-height:1000px;display:flex;flex-direction:column;justify-content:center;}
  .assembly-top{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:26px;}
  .assembly-top .section-label{margin:0;}
  .skip-assembly{font-family:var(--mono);font-size:10px;color:var(--muted);display:flex;align-items:center;gap:9px;padding:8px 0;}
  .assembly-layout{align-items:center;}
  .assembly-copy{position:relative;z-index:2;}
  .assembly-copy h2{font-size:clamp(34px,3.8vw,54px);line-height:1.12;letter-spacing:-2px;margin:0 0 24px;}
  .assembly-copy h2 em{font-family:var(--font-sans);font-weight:300;font-style:italic;color:var(--muted);}
  .assembly-note{display:inline-block;color:var(--warm);font-family:var(--font-sans);font-size:17px;font-style:italic;transform:rotate(-5deg);margin-bottom:25px;border-bottom:1px solid var(--border);padding-bottom:5px;}
  .stage-note{font-family:var(--mono);color:var(--accent);font-size:9px;letter-spacing:1px;margin-bottom:13px;}
  .assembly-copy h3{font-size:19px;font-weight:500;margin:0 0 10px;}
  .assembly-copy p{font-size:13px;color:var(--muted);line-height:1.95;max-width:310px;min-height:80px;margin:0;}
  .assembly-tabs{display:flex;gap:8px;margin-top:27px;flex-wrap:wrap;}
  .assembly-tabs button{background:transparent;border:1px solid var(--border);color:var(--muted);padding:9px 11px;border-radius:3px;font-family:var(--mono);font-size:9px;}
  .assembly-tabs button[aria-pressed='true']{color:var(--accent);background:var(--surface);border-color:var(--border);}
  .assembly-tabs button span{opacity:.5;margin-right:7px;}
  .assembly-scene{position:relative;min-width:0;height:470px;perspective:1050px;isolation:isolate;border:1px solid var(--border);border-radius:0 34px 0 0;background:color-mix(in srgb,var(--surface) 32%,transparent);}
  .model-pending{position:absolute;inset:0;display:grid;place-items:center;color:var(--muted);font:9px var(--mono);letter-spacing:1px;}
  .assembly-scene::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 55% 60%,var(--glow),transparent 65%),linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:auto,36px 36px,36px 36px;mask-image:radial-gradient(ellipse,#000 30%,transparent 82%);}
  .assembly-coordinate{position:absolute;bottom:7px;right:15px;font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:1px;}
  .layer-legend{position:absolute;right:0;top:6px;pointer-events:none;display:grid;gap:8px;font-family:var(--mono);font-size:8px;color:var(--muted);}
  .layer-legend span{display:flex;align-items:center;gap:7px;}
  .layer-legend i{width:12px;height:1px;background:var(--accent);}
  .assembly-bottom{border-top:1px solid var(--border);padding-top:17px;margin-top:8px;display:flex;justify-content:space-between;gap:15px;font-size:9px;font-family:var(--mono);color:var(--muted);}
  .assembly-bottom span{display:flex;gap:9px;align-items:center;}
  .assembly-meter{height:2px;background:var(--surface);margin-top:20px;overflow:hidden;}
  .assembly-meter-fill{height:100%;background:var(--accent);transform:scaleX(0);transform-origin:left;}
  &[data-motion='off']{height:auto;}
  &[data-motion='off'] .assembly-sticky{position:relative;top:0;height:auto;min-height:0;padding-top:65px;padding-bottom:65px;}
  @media(max-width:1100px){.assembly-board{width:82%;left:9%;top:90px;}.assembly-tabs{gap:5px;}.assembly-tabs button{padding:9px 8px;font-size:8px;}}
  @media(max-width:800px){.assembly-sticky{top:73px;height:calc(100svh - 73px);min-height:600px;}.assembly-scene{height:390px;}.assembly-board{width:90%;left:4%;top:100px;}.assembly-copy h2{font-size:36px;}.assembly-copy p{font-size:12px;}.layer-legend{top:0;font-size:7px;}.assembly-bottom{font-size:8px;}}
  @media(max-width:560px){height:310svh;.assembly-sticky{top:68px;height:calc(100svh - 68px);min-height:0;padding-top:20px;padding-bottom:18px;}.assembly-top{margin-bottom:15px;}.assembly-top .section-label{font-size:7px;}.skip-assembly{font-size:8px;}.assembly-copy{width:100%;}.assembly-copy h2{font-size:31px;margin:0 0 13px;letter-spacing:-1.2px;}.assembly-copy h2 br{display:none;}.assembly-copy h2 em{display:block;}.assembly-note{position:absolute;right:0;top:42px;font-size:12px;margin:0;}.stage-note{font-size:8px;margin-bottom:6px;}.assembly-copy h3{font-size:16px;}.assembly-copy p{font-size:11px;line-height:1.8;max-width:290px;min-height:40px;}.assembly-tabs{margin-top:13px;}.assembly-tabs button{font-size:8px;}.assembly-scene{height:clamp(210px,34svh,310px);width:100%;max-width:380px;margin-top:8px;perspective:950px;}.assembly-board{width:76%;left:12%;top:65px;}.assembly-coordinate{bottom:2px;right:0;font-size:7px;}.layer-legend{top:20px;right:0;font-size:6px;gap:5px;}.assembly-bottom{margin-top:7px;font-size:7px;padding-top:13px;}.assembly-bottom span:last-child{display:none;}.assembly-meter{margin-top:12px;} &[data-motion='off'] .assembly-sticky{padding-top:35px;padding-bottom:35px;}}
  .assembly-transport{display:flex;align-items:center;gap:10px;margin-top:16px;max-width:380px;}
  .assembly-play{border:1px solid var(--accent);border-radius:4px;background:var(--surface);color:var(--accent);padding:9px 12px;font-size:10px;white-space:nowrap;}
  .assembly-transport input{width:100%;min-width:40px;accent-color:var(--accent);cursor:ew-resize;}
  .assembly-transport output{font:10px var(--mono);color:var(--accent);min-width:35px;}
  .assembly-copy p{min-height:95px;}
  @media(max-width:560px){.assembly-copy p{min-height:55px;}.assembly-transport{margin-top:9px;}.assembly-play{padding:6px;font-size:9px;}.assembly-scene{height:clamp(230px,35svh,340px);}.assembly-copy h2{font-size:27px;}.assembly-note{display:none;}.assembly-top{margin-bottom:10px;}.assembly-sticky{min-height:710px;}}

  @media(max-height:700px) and (min-width:561px){.assembly-sticky{min-height:500px;}.assembly-scene{height:350px;}.assembly-top{margin-bottom:0;}.assembly-board{width:75%;left:12%;top:40px;}.assembly-copy h2{font-size:36px;margin-bottom:12px;}.assembly-note{margin-bottom:12px;}.assembly-tabs{margin-top:15px;}}
`;

export default function BoardAssembly({ effects }: { effects: boolean }) {
  const {t} = useLocale();
  const [progress,setProgress]=useState(0);
  const [playing,setPlaying]=useState(false);
  const manual=useRef(false);
  const playback=useRef(0);
  const lastProgress=useRef(0);
  const update=(value:number)=>{lastProgress.current=value;setProgress(value);model.current?.setProgress(value);setStage(value<.3?0:value<.72?1:2);};
  const section = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const model = useRef<BoardModelHandle>(null);
  const [stage, setStage] = useState(0);
  const [loadModel, setLoadModel] = useState(false);
  useEffect(()=>{
    const host=section.current;
    if(!host)return;
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){setLoadModel(true);observer.disconnect();}
    },{threshold:.05});
    observer.observe(host);
    return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(!playing||!effects)return;
    const start=performance.now();
    const tick=(now:number)=>{const p=Math.min(1,(now-start)/9000);update(p);if(p<1)playback.current=requestAnimationFrame(tick);else setPlaying(false);};
    playback.current=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(playback.current);
  },[playing,effects]);
  useEffect(()=>{if(!effects){cancelAnimationFrame(playback.current);setPlaying(false);model.current?.setProgress(lastProgress.current);}},[effects]);

  useEffect(() => {
    const host = section.current;
    if (!host || !effects) return;
    const meter = host.querySelector<HTMLElement>('.assembly-meter-fill')!.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 1000, fill: 'both' });
    meter.pause();
    let frame = 0;
    const render = () => {
      if(manual.current){frame=0;return;}
      const sticky = host.querySelector<HTMLElement>('.assembly-sticky')!;
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const distance = Math.max(1, host.offsetHeight - sticky.offsetHeight);
      const progress = Math.max(0, Math.min(1, (top - host.getBoundingClientRect().top) / distance));
      update(progress);
      meter.currentTime = progress * 1000;
      setStage(progress < .3 ? 0:progress < .72 ? 1 : 2);
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const resumeScroll = (event:Event) => { if(event.target instanceof Element && event.target.closest('input,button,select'))return;manual.current=false;setPlaying(false);schedule(); };
    const keyScroll=(event:KeyboardEvent)=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))resumeScroll(event);};
    window.addEventListener('wheel',resumeScroll,{passive:true});window.addEventListener('touchmove',resumeScroll,{passive:true});window.addEventListener('keydown',keyScroll);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    render();
    return () => { window.removeEventListener('wheel',resumeScroll);window.removeEventListener('touchmove',resumeScroll);window.removeEventListener('keydown',keyScroll);cancelAnimationFrame(frame); meter.cancel(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [effects]);

  useEffect(()=>{const meter=section.current?.querySelector(".assembly-meter-fill")?.getAnimations()[0];if(meter)meter.currentTime=progress*1000;},[progress]);

  const selectStage = (index: number) => {
    manual.current=true;setPlaying(false);update([0,.5,1][index]);
  };
  const play = () => {manual.current=true;if(playing){setPlaying(false);return;}update(0);setPlaying(true);};

  return <Assembly id="workbench" ref={section} data-motion={effects ? 'on' : 'off'} data-stage={stage} aria-labelledby="workbench-heading">
    <div className="assembly-sticky wrap">
      <div className="assembly-top"><div className="section-label"><span className="line"/>{t("INTERMISSION / ON MY WORKBENCH")}</div><a className="skip-assembly" href="#projects">{t("Skip to projects")}<ArrowRightOutlined/></a></div>
      <Row className="assembly-layout" gutter={24} align="middle">
        <Col xs={24} md={10}><div className="assembly-copy"><span className="assembly-note">{t("a closer look ↘")}</span><h2 id="workbench-heading">{t("Things make sense")}<br/><em>{t("piece by piece.")}</em></h2><div className="stage-note">{t(stages[stage].note)}</div><h3>{t(stages[stage].title)}</h3><p>{t(stages[stage].text)}</p><div className="assembly-tabs" aria-label={t("Board assembly stages")}>{stages.map((item, i) => <button key={t(item.label)} onClick={() => selectStage(i)} aria-pressed={stage === i}><span>0{i + 1}</span>{t(item.label)}</button>)}</div><div className="assembly-transport">{effects&&<button className="assembly-play" onClick={play} aria-pressed={playing}>{t(playing?'Pause demo':'Play assembly')}</button>}<input type="range" min="0" max="100" step="1" aria-label={t('Assembly timeline')} value={Math.round(progress*100)} onChange={e=>{manual.current=true;setPlaying(false);update(Number(e.target.value)/100);}}/><output>{Math.round(progress*100)}%</output></div></div></Col>
        <Col xs={24} md={14}><div className="assembly-scene" ref={scene} aria-label={t("Interactive ESP32 assembly")}>
          {loadModel?<BoardModel ref={model} effects={effects}/>:<div className="board-model model-pending" data-renderer="pending" role="status">{t('Preparing the workbench…')}</div>}
          <div className="layer-legend" aria-hidden="true"><span><i/>{t("01 RF SHIELD")}</span><span><i/>{t("02 COMPONENTS")}</span><span><i/>{t("03 PIN HEADERS")}</span><span><i/>{t("04 COPPER TRACES")}</span><span><i/>{t("05 PCB SUBSTRATE")}</span></div>
        </div></Col>
      </Row>
      <div className="assembly-bottom"><span><ArrowDownOutlined/>{t(effects ? 'SCROLL TO TAKE IT APART. KEEP GOING TO REBUILD.' : 'MOTION OFF · USE THE BUTTONS TO EXPLORE')}</span><span>{t("ILLUSTRATIVE ASSEMBLY / NOT A PCB SCHEMATIC")}</span></div><div className="assembly-meter" aria-hidden="true"><div className="assembly-meter-fill" data-progress={Math.round(progress*100)}/></div>
    </div>
  </Assembly>;
}
