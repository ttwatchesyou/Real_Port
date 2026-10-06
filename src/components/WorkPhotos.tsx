'use client';

import { useEffect, useRef, useState, type PointerEvent, type Dispatch, type SetStateAction } from 'react';
import { Button, Modal } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, ArrowUpOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { photoCollection, type PersonalPhoto } from '@/data/personalPhotos';
import { useLocale } from './LocaleProvider';

const AlbumInfo = styled.div`
  margin:12px 0;color:var(--muted);font-size:11px;line-height:1.8;
  p{margin:5px 0;} .album-source{font-size:10px;}
  a{display:inline-flex;align-items:center;gap:8px;color:var(--accent);text-decoration:underline;text-underline-offset:3px;min-height:36px;}
  a:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
`;
export function PersonalPhotoInfo({photo}:{photo:PersonalPhoto}) {
  const {t}=useLocale();
  return <AlbumInfo className="personal-photo-info">
    <p>{t(photo.caption)}</p>
    <p className="album-source">{t(photo.origin??'album.origin')} · {t(photo.kind==='document'?'album.document':'album.photo')}</p>
    <a href={photo.src} target="_blank" rel="noreferrer">{t('album.full')} ↗</a>
  </AlbumInfo>;
}
const PhotoSection=styled.section`
  border-top:1px solid var(--border);padding-top:64px!important;padding-bottom:64px!important;
  .photo-heading{display:flex;align-items:end;justify-content:space-between;gap:32px;margin-bottom:30px;}
  .photo-heading h2{font-size:clamp(24px,3.2vw,39px);font-weight:500;letter-spacing:-1.4px;margin:14px 0 0;line-height:1.3;}
  .photo-heading p{max-width:340px;font-size:12px;color:var(--muted);line-height:1.9;margin:0;}
  .photo-roll{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:21px;padding:8px 3px;}
  .photo-print{min-width:0;position:relative;display:block;text-align:left;border:1px solid var(--border);background:var(--surface);padding:9px 9px 12px;color:var(--text);border-radius:3px;cursor:zoom-in;transform:rotate(-1deg);box-shadow:0 7px 20px #0000000c;transition:transform .4s,box-shadow .4s;}
  .photo-print:nth-child(2){transform:rotate(1.5deg) translateY(12px);}.photo-print:nth-child(3){transform:rotate(-.6deg);}
  .photo-window{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--surface-strong);}
  .photo-window img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .65s cubic-bezier(.22,1,.36,1);}
  .photo-print[data-photo-id='hands-on'] img{object-position:center 38%;}
  .photo-open{position:absolute;right:9px;bottom:9px;width:32px;height:32px;display:grid;place-items:center;background:#182c27df;color:#fff;border-radius:50%;}.photo-open svg{transform:rotate(45deg);}
  .photo-print-title{display:block;font-size:13px;font-weight:600;margin:12px 4px 4px;}.photo-print-credit{display:block;font-size:10px;color:var(--muted);margin:0 4px;line-height:1.8;}
  .photo-print:focus-visible{outline:2px solid var(--accent);outline-offset:5px;transform:rotate(0);}.photo-print:focus-visible img{transform:scale(1.035);}
  @media(hover:hover){.photo-print:hover{transform:rotate(0) translateY(-4px);box-shadow:0 14px 25px #00000012;}.photo-print:hover img{transform:scale(1.035);}}
  .photo-footer{display:flex;gap:18px;align-items:center;justify-content:space-between;margin-top:30px;}.photo-footer p{font-size:11px;color:var(--muted);line-height:1.8;margin:0;max-width:640px;}
  .photo-footer button{background:transparent;border:0;color:var(--accent);cursor:pointer;font-size:11px;display:flex;gap:10px;align-items:center;white-space:nowrap;padding:10px 0;min-height:44px;}
  @media(max-width:650px){padding-top:40px!important;padding-bottom:40px!important;.photo-heading{display:block;}.photo-heading p{margin-top:16px;}.photo-roll{grid-template-columns:1fr;gap:22px;}.photo-print:nth-child(n){transform:none;}.photo-window{aspect-ratio:4/5;max-height:430px;}.photo-footer{align-items:start;flex-direction:column;gap:7px;}}
  body[data-effects='off'] & .photo-print,body[data-effects='off'] & img{transition:none!important;transform:none!important;}
  @media(prefers-reduced-motion:reduce){.photo-print,img{transition:none!important;transform:none!important;}}
`;
const Viewer=styled.div`
  color:var(--text);.photo-stage{background:var(--surface-strong);border-radius:4px;overflow:hidden;touch-action:pan-y;}
  .photo-stage img{display:block;width:100%;height:min(54vh,520px);object-fit:contain;user-select:none;-webkit-user-drag:none;}
  .photo-caption{font-size:12px;color:var(--muted);line-height:1.9;min-height:46px;margin:15px 0 0;}
  .photo-browse{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:16px;}.photo-counter{font:11px var(--mono);color:var(--muted);}.photo-browse .ant-btn{min-height:44px;}
  .photo-swipe-hint{font-size:10px;text-align:center;color:var(--muted);margin:10px 0 0;}
  .photo-strip{display:flex;gap:7px;overflow-x:auto;overscroll-behavior-x:contain;padding:7px 2px 9px;margin-top:14px;scrollbar-width:thin;}
  .photo-strip button{width:48px;height:62px;flex-shrink:0;padding:2px;border:1px solid var(--border);border-radius:3px;background:var(--surface);cursor:pointer;}
  .photo-strip button[aria-current='true']{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent);}
  .photo-strip button:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}
  .photo-strip img{display:block;width:100%;height:100%;object-fit:cover;}
  .photo-origin{margin-top:14px;padding-top:12px;border-top:1px solid var(--border);font-size:10px;color:var(--muted);display:flex;align-items:center;justify-content:space-between;gap:14px;line-height:1.8;}
  .photo-origin a{color:var(--accent);text-decoration:underline;white-space:nowrap;min-height:36px;display:flex;align-items:center;}
  @media(max-width:560px){.photo-stage img{height:38vh;}.photo-browse .ant-btn{font-size:11px;padding-inline:10px;min-width:44px;}.photo-navigation-text{display:none;}}
`;
export function PhotoViewer({photos,index,setIndex,effects=true}:{photos:PersonalPhoto[];index:number|null;setIndex:Dispatch<SetStateAction<number|null>>;effects?:boolean}) {
  const {t}=useLocale();
  const gesture=useRef<{x:number;y:number;id:number}|null>(null);
  const strip=useRef<HTMLDivElement>(null);
  const total=photos.length;
  const move=(amount:number)=>setIndex(value=>value===null?null:(value+amount+total)%total);
  const select=(value:number)=>{gesture.current=null;setIndex(value);};
  useEffect(()=>{
    if(index===null||total===0)return;
    const keys=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();event.stopPropagation();gesture.current=null;setIndex(null);return;}
      if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
      // Let the keyboard browse the same collection as touch and pointer gestures.
      event.preventDefault();setIndex(value=>value===null?null:(value+(event.key==='ArrowLeft'?-1:1)+total)%total);
    };
    window.addEventListener('keydown',keys,true);
    return()=>window.removeEventListener('keydown',keys,true);
  },[index,total,setIndex]);
  useEffect(()=>{
    const rail=strip.current,active=rail?.querySelector<HTMLButtonElement>('[aria-current="true"]');
    if(!rail||!active)return;
    rail.scrollTo({left:active.offsetLeft-rail.offsetLeft-rail.clientWidth/2+active.clientWidth/2,behavior:'instant'});
  },[index]);
  const pointerDown=(event:PointerEvent<HTMLDivElement>)=>{
    if(!event.isPrimary||event.button!==0)return;
    gesture.current={x:event.clientX,y:event.clientY,id:event.pointerId};
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const pointerUp=(event:PointerEvent<HTMLDivElement>)=>{
    const start=gesture.current;if(!start||start.id!==event.pointerId)return;
    gesture.current=null;
    const dx=event.clientX-start.x,dy=event.clientY-start.y;
    if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.25)move(dx<0?1:-1);
    if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const selected=index===null?null:photos[index]??null;
  return (
    <Modal className="photo-viewer-modal" keyboard={false} title={selected?t(selected.title):undefined} open={!!selected} onCancel={()=>{setIndex(null);gesture.current=null;}} footer={null} width={850} destroyOnHidden closable={{'aria-label':t('Close')}} transitionName={effects?undefined:''} maskTransitionName={effects?undefined:''}>
      {selected&&<Viewer>
        <div className="photo-stage" onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={()=>{gesture.current=null;}} onLostPointerCapture={()=>{gesture.current=null;}}><img key={selected.id} src={selected.src} width={selected.width} height={selected.height} alt={t(selected.alt)} draggable={false}/></div>
        <p className="photo-caption" aria-live="polite">{t(selected.caption)}</p>
        <div className="photo-browse"><Button aria-label={t('photo.previous')} icon={<ArrowLeftOutlined/>} disabled={total<2} onClick={()=>move(-1)}><span className="photo-navigation-text">{t('photo.previous')}</span></Button><span className="photo-counter" aria-live="polite">{String(index!+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span><Button aria-label={t('photo.next')} icon={<ArrowRightOutlined/>} disabled={total<2} onClick={()=>move(1)}><span className="photo-navigation-text">{t('photo.next')}</span></Button></div>
        <p className="photo-swipe-hint">{t('photo.hint')}</p>
        <div className="photo-strip" ref={strip} role="group" aria-label={t('album.explore')}>{photos.map((photo,i)=><button type="button" key={photo.id} aria-current={i===index?'true':undefined} aria-label={`${t('photo.open')}: ${t(photo.title)}`} onClick={()=>select(i)}><img src={photo.thumbnail} width={photo.width} height={photo.height} alt="" loading="lazy"/></button>)}</div>
        <div className="photo-origin"><span>{t(selected.origin??'album.origin')} · {t(selected.kind==='document'?'album.document':'album.photo')}</span><a href={selected.src} target="_blank" rel="noreferrer">{t('album.full')} ↗</a></div>
      </Viewer>}
    </Modal>
  );
}

export default function WorkPhotos({effects}:{effects:boolean}) {
  const {t}=useLocale();
  const [index,setIndex]=useState<number|null>(null);
  const total=photoCollection.length;
  const select=(value:number)=>setIndex(value);
  return <>
    <PhotoSection className="section wrap" aria-labelledby="photo-heading">
      <div className="photo-heading reveal"><div><div className="section-label"><span className="line"/>{t('album.label')}</div><h2 id="photo-heading">{t('album.heading')}</h2></div><p>{t('album.description')}</p></div>
      <div className="photo-roll">{photoCollection.slice(0,3).map((photo,i)=><button type="button" className="photo-print" data-photo-id={photo.id} key={photo.id} onClick={()=>select(i)} aria-label={`${t('photo.open')}: ${t(photo.title)}`}>
        <div className="photo-window"><img src={photo.thumbnail} srcSet={`${photo.thumbnail} 480w, ${photo.src} ${photo.width}w`} sizes="(max-width:650px) 90vw, 30vw" width={photo.width} height={photo.height} loading="lazy" alt={t(photo.alt)}/><span className="photo-open" aria-hidden="true"><ArrowUpOutlined/></span></div>
        <span className="photo-print-title">{t(photo.title)}</span><span className="photo-print-credit">{t('album.origin')} / {String(i+1).padStart(2,'0')}</span>
      </button>)}</div>
      <div className="photo-footer"><p>{t('album.note')}</p><button type="button" onClick={()=>select(0)}>{t('album.explore')} · {String(total).padStart(2,'0')} <ArrowRightOutlined/></button></div>
    </PhotoSection>
    <PhotoViewer photos={photoCollection} index={index} setIndex={setIndex} effects={effects}/>
  </>;
}
