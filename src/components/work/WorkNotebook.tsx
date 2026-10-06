'use client';
import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Button, ConfigProvider, Input, theme } from 'antd';
import thTH from 'antd/locale/th_TH';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { ArrowLeftOutlined, ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import { useLocale, LanguageSwitcher } from '../LocaleProvider';
import { useAppearance } from '../AppearanceProvider';
import AppearanceSwitcher from '../AppearanceSwitcher';
import { GlobalStyle } from '../styles';
import { workStudies, type WorkStudy, type WorkGroup } from '@/data/workArchive';
import { personalPhotos } from '@/data/personalPhotos';
import { workDetails } from '@/data/workDetails';
import ProjectPhotos from '../ProjectPhotos';
import ProjectVideos from '../ProjectVideos';
import WorkIllustration from './WorkIllustration';
import { Notebook } from './styles';

function Frame({children}:{children:ReactNode}){
  const {locale,t}=useLocale(),{palette}=useAppearance();
  return <ConfigProvider locale={locale==='th'?thTH:locale==='zh'?zhCN:enUS} theme={{algorithm:palette.isDark?theme.darkAlgorithm:theme.defaultAlgorithm,token:{colorPrimary:palette.accent,colorBgContainer:palette.surface,colorBgElevated:palette.surface,colorText:palette.text,colorTextSecondary:palette.muted,colorBorder:palette.border,fontFamily:'Manrope, Arial, sans-serif'}}}>
    <GlobalStyle/><Notebook>
      <header className="book-header"><div className="book-wrap header-inner"><Link href="/" className="book-brand">theetawatch<span>.</span></Link><div className="header-tools"><Link href="/#projects" className="home-link"><ArrowLeftOutlined/>{t('work.home')}</Link><AppearanceSwitcher/><LanguageSwitcher/></div></div></header>
      {children}
      <footer className="book-footer"><div className="book-wrap footer-inner"><Link href="/#projects">← {t('work.home')}</Link><span>Theetawatch tangtakulltanakit / {t('work.title')}</span></div></footer>
    </Notebook>
  </ConfigProvider>;
}
function Entry({study}:{study:WorkStudy}){
  const {locale,t}=useLocale();
  return <Link href={`/work/${study.slug}`} className="entry" data-study={study.slug}>
    <div className="entry-visual"><WorkIllustration visual={study.visual}/><span className="entry-number">NOTE / {study.number}</span><span className="entry-concept">{t('work.concept')}</span></div>
    <div className="entry-body"><span className="entry-group">{t(`work.${study.group}`)}</span><h2>{study.title[locale]}</h2><p>{study.summary[locale]}</p><div className="entry-tags">{study.tags.map(tag=><span key={tag}>{tag}</span>)}</div><div className="entry-open">{t('work.open')}<ArrowRightOutlined/></div></div>
  </Link>;
}
export default function WorkIndex(){
  const {locale,t}=useLocale();
  const [group,setGroup]=useState<WorkGroup|'all'>('all'),[query,setQuery]=useState('');
  const words=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const entries=workStudies.filter(s=>(group==='all'||s.group===group)&&words.every(word=>[...Object.values(s.title),...Object.values(s.summary),...s.tags].join(' ').toLocaleLowerCase().includes(word)));
  const clear=()=>{setGroup('all');setQuery('');};
  return <Frame><main className="book-wrap">
    <section className="book-hero" aria-labelledby="notebook-title"><div><div className="book-label">WORK / PROJECT NOTEBOOK</div><h1 id="notebook-title">{t('work.heading')}</h1><p className="intro">{t('work.intro')}</p><div className="hero-count"><strong>12</strong><span>HARDWARE × SOFTWARE<br/>THEETAWATCH / {t('work.title')}</span></div></div><figure className="desk-photo"><img src={personalPhotos.workbench.src} srcSet={`${personalPhotos.workbench.thumbnail} 480w, ${personalPhotos.workbench.src} 960w`} sizes="(max-width:700px) 90vw, 40vw" width="960" height="1280" alt={t(personalPhotos.workbench.alt)}/><figcaption>{t('work.context')}</figcaption></figure></section>
    <section className="browse" aria-label={t('work.title')}><div className="browse-head"><Input className="search" allowClear prefix={<SearchOutlined/>} placeholder={t('work.search')} aria-label={t('work.search')} value={query} onChange={e=>setQuery(e.target.value)} autoComplete="off"/><span className="result-count" role="status">{String(entries.length).padStart(2,'0')} / 12 · {t('work.count')}</span></div><div className="filters" role="group" aria-label={t('Filter projects')}>{(['all','automation','embedded','robotics','learning'] as const).map(g=><button type="button" key={g} aria-pressed={group===g} onClick={()=>setGroup(g)}>{t(`work.${g}`)}</button>)}</div><div className="book-grid">{entries.map(s=><Entry key={s.slug} study={s}/>)}</div>{entries.length===0&&<div className="empty"><p>{t('work.noResults')}</p><Button onClick={clear}>{t('work.clear')}</Button></div>}</section>
  </main></Frame>;
}
export function WorkDetail({study,source}:{study:WorkStudy;source:string}){
  const {locale,t}=useLocale();
  const [motion,setMotion]=useState(false),[reduced,setReduced]=useState(false);
  useEffect(()=>{const q=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{setReduced(q.matches);setMotion(!q.matches);};update();q.addEventListener('change',update);return()=>q.removeEventListener('change',update);},[]);
  const position=workStudies.findIndex(s=>s.slug===study.slug),prev=workStudies[(position+11)%12],next=workStudies[(position+1)%12];
  const notes=workDetails[study.slug],photos=study.photos??[],videos=study.videos??[];
  const displaySource=source.replace(/\s*\[cite:\s*[^\]]+\]/g,'');
  return <Frame><main className="book-wrap">
    <nav className="breadcrumbs" aria-label={t('work.title')}><Link href="/work">← {t('work.back')}</Link><span>/</span><span>NOTE {study.number}</span></nav>
    <section className="detail-hero" aria-labelledby="study-title"><div><div className="book-label">{t(`work.${study.group}`)} / NOTE {study.number}</div><h1 id="study-title">{study.title[locale]}</h1><p className="detail-summary">{study.summary[locale]}</p><div className="entry-tags">{study.tags.map(tag=><span key={tag}>{tag}</span>)}</div>{photos.length===0&&videos.length===0&&<p className="photo-pending"><span/>{t('work.photosPending')}</p>}</div><div className="detail-art"><div className="drawing"><WorkIllustration visual={study.visual} motion={motion}/></div><div className="art-caption"><span>{t('work.concept')}</span><button type="button" onClick={()=>setMotion(v=>!v)} aria-pressed={motion&&!reduced} disabled={reduced}>{t(motion&&!reduced?'work.motionOff':'work.motionOn')}</button></div></div></section>
    {photos.length>0&&<ProjectPhotos key={study.slug} photos={photos} effects={motion&&!reduced}/>}
    {videos.length>0&&<ProjectVideos key={study.slug} videos={videos}/>}
    <div className="detail-content"><section className="note-panel" aria-labelledby="scope-title"><h2 id="scope-title">{t('work.scope')}</h2><ol className="component-list">{study.scope.map((item,i)=><li key={i}><span className="list-number">{String(i+1).padStart(2,'0')}</span><span>{item[locale]}</span></li>)}</ol>{study.documented&&<div className="method"><h2>{t('work.method')}</h2><p>{t('work.ladder')}</p><p>{t('work.integration')}</p></div>}{notes&&<section className="expanded-study" aria-labelledby="expanded-title"><h2 id="expanded-title">{t('work.expanded')}</h2><p className="editorial-note">{t('work.editorial')}</p><h3>{t('work.goal')}</h3><p>{notes.goal[locale]}</p><h3>{t('work.principle')}</h3><p>{notes.principle[locale]}</p><h3>{t('work.steps')}</h3><ol className="component-list development-steps">{notes.steps.map((item,i)=><li key={i}><span className="list-number">{String(i+1).padStart(2,'0')}</span><span>{item[locale]}</span></li>)}</ol><h3>{t('work.checks')}</h3><ul className="evaluation-list">{notes.checks.map((item,i)=><li key={i}>{item[locale]}</li>)}</ul>{!!notes.references?.length&&<div className="source-links"><h3>{t('work.references')}</h3>{notes.references.map(r=><a key={r.url} href={r.url} target="_blank" rel="noreferrer">{r.label} ↗</a>)}</div>}</section>}{study.visual==='motor'&&<Link className="related-lab" href="/pid-lab"><strong>{t('work.related')} ↗</strong><p>{t('work.relatedNote')}</p></Link>}</section><aside><div className="note-callout"><h2>{t('work.notes')}</h2><p>{t('work.editorial')}</p><p>{t('work.sourceNote')}</p><div className="source-links"><a href={`/documents/work/${study.slug}.md`} download>{t('work.expandedDownload')} ↓</a><a href={`/documents/work/source/${study.slug}.md`} download>{t('work.originalDownload')} ↓</a><a href={`https://drive.google.com/file/d/${study.sourceId}/view`} target="_blank" rel="noreferrer">Google Drive ↗</a></div><details className="source-notes"><summary>{t('work.source')} / TH</summary><pre>{displaySource}</pre></details></div></aside></div>
    <nav className="entry-nav" aria-label={t('work.title')}><Link href={`/work/${prev.slug}`}><span>← {t('work.previous')} / {prev.number}</span><h3>{prev.title[locale]}</h3></Link><Link href={`/work/${next.slug}`}><span>{t('work.next')} / {next.number} →</span><h3>{next.title[locale]}</h3></Link></nav>
  </main></Frame>;
}
