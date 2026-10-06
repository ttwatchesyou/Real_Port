'use client';
import { useState } from 'react';
import styled from 'styled-components';
import type { PersonalPhoto } from '@/data/personalPhotos';
import { PhotoViewer, PersonalPhotoInfo } from './WorkPhotos';
import { useLocale } from './LocaleProvider';

const Gallery = styled.section`
  margin:25px 0;border-top:1px solid var(--border);padding-top:24px;color:var(--text);
  .build-photo-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:17px;}
  .build-photo-heading h2,.build-photo-heading h3{font-size:20px;font-weight:550;line-height:1.6;margin:0;}
  .build-photo-count{font:10px var(--mono);color:var(--muted);}
  .build-photo-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;}
  &[data-single='true'] .build-photo-grid{grid-template-columns:1fr;}
  .build-photo-item{min-width:0;}.build-photo-button{display:block;width:100%;padding:9px;border:1px solid var(--border);border-radius:5px;background:var(--surface);color:var(--text);cursor:zoom-in;text-align:left;}
  .build-photo-button img{display:block;width:100%;height:250px;object-fit:contain;background:var(--bg);border-radius:2px;}
  .build-photo-label{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 5px 3px;font-size:11px;line-height:1.8;}.build-photo-label span:last-child{color:var(--accent);font-size:15px;flex-shrink:0;}
  .personal-photo-info{margin-top:10px;}.personal-photo-info p{font-size:11px;}
  .gallery-more{display:block;min-height:44px;margin:20px auto 0;padding:10px 18px;border:1px solid var(--border);border-radius:5px;background:var(--surface);color:var(--accent);font:inherit;font-size:12px;cursor:pointer;}
  button:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
  @media(max-width:550px){.build-photo-grid{grid-template-columns:1fr;}.build-photo-button img{height:230px;}.build-photo-heading h2,.build-photo-heading h3{font-size:18px;}}
`;
export default function ProjectPhotos({photos,effects=true,heading='work.realPhotos',level=2}:{photos:PersonalPhoto[];effects?:boolean;heading?:string;level?:2|3}){
  const {t}=useLocale();
  const [index,setIndex]=useState<number|null>(null);
  const [expanded,setExpanded]=useState(false);
  if(photos.length===0)return null;
  const Heading=level===3?'h3':'h2';
  return <>
    <Gallery className="build-photos" data-single={photos.length===1} aria-label={t(heading)}>
      <div className="build-photo-heading"><Heading>{t(heading)}</Heading><span className="build-photo-count">{String(photos.length).padStart(2,'0')} / PHOTO NOTES</span></div>
      <div className="build-photo-grid">{(expanded?photos:photos.slice(0,6)).map((photo,i)=><div className="build-photo-item" key={photo.id}><button className="build-photo-button" type="button" onClick={()=>setIndex(i)} aria-label={`${t('photo.open')}: ${t(photo.title)}`}><img src={photo.thumbnail} srcSet={`${photo.thumbnail} 480w, ${photo.src} ${photo.width}w`} sizes={photos.length===1?'(max-width:640px) 90vw, 600px':'(max-width:550px) 90vw, 40vw'} width={photo.width} height={photo.height} alt={t(photo.alt)} loading="lazy"/><span className="build-photo-label"><span>{t(photo.title)}</span><span aria-hidden="true">↗</span></span></button><PersonalPhotoInfo photo={photo}/></div>)}</div>
      {photos.length>6&&<button className="gallery-more" type="button" aria-expanded={expanded} onClick={()=>setExpanded(v=>!v)}>{t(expanded?'work.fewerPhotos':'work.morePhotos')} · {photos.length}</button>}
    </Gallery>
    <PhotoViewer photos={photos} index={index} setIndex={setIndex} effects={effects}/>
  </>;
}
