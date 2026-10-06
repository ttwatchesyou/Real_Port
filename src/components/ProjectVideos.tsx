'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import type { WorkVideo } from '@/data/workMedia';
import { useLocale } from './LocaleProvider';

const Clips = styled.section`
  margin:32px 0 44px;border-top:1px solid var(--border);padding-top:26px;
  h2{font-size:22px;font-weight:550;margin:0 0 10px;}p{font-size:12px;color:var(--muted);line-height:1.9;}
  .clip-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:20px;}
  .clip-card{min-width:0;border:1px solid var(--border);background:var(--surface);border-radius:8px;overflow:hidden;}
  .clip-screen{position:relative;height:310px;background:var(--bg);overflow:hidden;}
  .clip-play{width:100%;height:100%;display:block;border:0;padding:0;background:transparent;cursor:pointer;color:var(--text);}
  .clip-play img{display:block;width:100%;height:100%;object-fit:contain;}
  .clip-play-mark{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:var(--surface);color:var(--accent);border:1px solid var(--accent);font-size:20px;box-shadow:0 5px 25px #0003;transition:transform .2s;}
  .clip-play:hover .clip-play-mark{transform:translate(-50%,-50%) scale(1.1);}
  button:focus-visible,a:focus-visible,video:focus-visible{outline:2px solid var(--accent);outline-offset:-4px;}
  video{display:block;width:100%;height:100%;object-fit:contain;background:#111;}
  .clip-body{padding:18px;}.clip-body h3{margin:0 0 9px;font-size:15px;font-weight:550;}.clip-body p{margin:8px 0;}
  .clip-meta{display:flex;flex-wrap:wrap;gap:7px 13px;font:10px var(--mono);color:var(--muted);line-height:1.8;}
  .clip-actions{display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-top:12px;}
  .clip-actions a,.clip-actions button{font-size:11px;min-height:36px;color:var(--accent);background:transparent;border:0;padding:4px 0;text-decoration:underline;text-underline-offset:4px;cursor:pointer;}
  .clip-error{padding:18px;border-top:1px solid var(--border);}.clip-error p{color:var(--text);margin:0;}
  .clip-error button{font:inherit;color:var(--accent);border:1px solid var(--border);border-radius:4px;background:var(--surface);padding:9px 14px;cursor:pointer;min-height:44px;}
  @media(max-width:650px){.clip-grid{grid-template-columns:1fr;}.clip-screen{height:280px;}}
  @media(prefers-reduced-motion:reduce){.clip-play-mark{transition:none;}}
`;
export const clipTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
function Player({clip}:{clip:WorkVideo}) {
  const {t}=useLocale();
  const videoRef=useRef<HTMLVideoElement|null>(null);
  const [failed,setFailed]=useState(false),[attempt,setAttempt]=useState(0);
  // This component is mounted only after an explicit click, tap or Enter/Space.
  const attach=useCallback((node:HTMLVideoElement|null)=>{
    videoRef.current=node;
    if(node){node.focus({preventScroll:true});void node.play().catch(()=>{/* Native controls remain available if playback needs another gesture. */});}
  },[]);
  useEffect(()=>{
    const node=videoRef.current;
    const hide=()=>{if(document.hidden)node?.pause();};
    document.addEventListener('visibilitychange',hide);
    return()=>{document.removeEventListener('visibilitychange',hide);if(node){node.pause();node.removeAttribute('src');node.load();}};
  },[attempt]);
  return <>
    <div className="clip-screen"><video key={attempt} ref={attach} src={clip.src} poster={clip.poster} width={clip.width} height={clip.height} controls playsInline preload="none" tabIndex={0} aria-label={t(clip.title)} onError={()=>setFailed(true)} onPlay={event=>{document.querySelectorAll('video').forEach(other=>{if(other!==event.currentTarget)other.pause();});}}>{t('work.videoFile')}</video></div>
    {failed&&<div className="clip-error" role="alert"><p>{t('work.videoError')}</p><button type="button" onClick={()=>{setFailed(false);setAttempt(v=>v+1);}}>{t('work.videoRetry')}</button></div>}
  </>;
}
export default function ProjectVideos({videos}:{videos:WorkVideo[]}) {
  const {t}=useLocale();
  const [active,setActive]=useState<string|null>(null);
  if(videos.length===0)return null;
  const close=(id:string)=>{setActive(null);requestAnimationFrame(()=>document.getElementById(`play-${id}`)?.focus());};
  return <Clips className="project-videos" aria-label={t('work.videos')}>
    <h2>{t('work.videos')}</h2><p>{t('work.videoIntro')}</p>
    <div className="clip-grid">{videos.map(clip=><article className="clip-card" data-clip={clip.id} key={clip.id}>
      {active===clip.id?<Player clip={clip}/>:<div className="clip-screen"><button id={`play-${clip.id}`} className="clip-play" type="button" aria-label={`${t('work.playVideo')}: ${t(clip.title)}`} onClick={()=>setActive(clip.id)}><img src={clip.poster} width={clip.width} height={clip.height} loading="lazy" alt={t(clip.description)}/><span className="clip-play-mark" aria-hidden="true">▶</span></button></div>}
      <div className="clip-body"><h3>{t(clip.title)}</h3><div className="clip-meta"><span>{clipTime(clip.duration)} · {(clip.bytes/1_000_000).toFixed(1)} MB</span><span>{t('work.videoRange')} {clipTime(clip.start)}–{clipTime(Math.min(clip.originalDuration,clip.start+clip.duration))} / {clipTime(clip.originalDuration)}</span></div><p>{t(clip.description)}</p>{active===clip.id&&<p>{t('work.videoControls')}</p>}<div className="clip-actions">{active===clip.id&&<button type="button" onClick={()=>close(clip.id)}>{t('work.closeVideo')}</button>}<a href={clip.sourceUrl} target="_blank" rel="noreferrer">{t('work.videoOriginal')} ↗</a>{active===clip.id&&<a href={clip.src} target="_blank" rel="noreferrer">{t('work.videoFile')} ↗</a>}</div></div>
    </article>)}</div>
  </Clips>;
}
