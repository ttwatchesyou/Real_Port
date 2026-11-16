'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button, ConfigProvider, Form, Input, Modal, theme } from 'antd';
import thTH from 'antd/locale/th_TH';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { ArrowLeftOutlined, ArrowRightOutlined, SearchOutlined, MenuOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useLocale, LanguageSwitcher } from './LocaleProvider';
import { useAppearance } from './AppearanceProvider';
import AppearanceSwitcher from './AppearanceSwitcher';
import { PhotoViewer } from './WorkPhotos';
import ProjectPhotos from './ProjectPhotos';
import { GlobalStyle, ModalContent } from './styles';
import { Editorial } from './editorialStyles';
import { categories, profile, projects, roles, type Category, type Project } from '@/data/portfolio';
import { personalPhotos, photoCollection, type PersonalPhoto } from '@/data/personalPhotos';
import { messages } from '@/i18n/messages';
import { workStudies } from '@/data/workArchive';

export function Arrow() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5"/></svg>; }
export function projectPhoto(p:Project):PersonalPhoto|undefined {
  if(p.studySlug)return workStudies.find(s=>s.slug===p.studySlug)?.photos?.[0];
  // Each photograph stays with the work it documents. Documents are identified in the caption.
  return p.image?.personal?.id==='robot-system-design'?undefined:p.image?.personal;
}
const heroPhotos=[personalPhotos.handsOn,personalPhotos.workbench,personalPhotos.fieldTest];
const displayPhotos=photoCollection.filter(p=>p.id!=='robot-system-design');
const journalPhotos=displayPhotos.filter(p=>p.kind==='photo');
const featured=['three-wheel-omni-robot','three-phase-board','pid-motor-trainer','bottle-filling-conveyor','smart-water-pump','allen-bradley-training-station'];
const initialProjects=[...featured.flatMap(slug=>projects.filter(p=>p.studySlug===slug)),...projects.filter(p=>p.kind!=='pid'&&!featured.includes(p.studySlug??''))];
const skillGroups=[
  {name:'Robotics & automation',tools:'Mitsubishi FX5U · ROS · Robot control · Sensors & actuators'},
  {name:'Embedded & electronics',tools:'Arduino UNO R4 · ESP32 · STM32 · Motor control'},
  {name:'Design & simulation',tools:'CAD · SolidWorks · Simulation · Prototyping'},
  {name:'Programming & analysis',tools:'C / C++ · Python · Hardware programming · Technical documentation'},
];
export default function Portfolio(){
  const {t,locale}=useLocale(),{palette}=useAppearance();
  const [category,setCategory]=useState<Category>('All projects'),[query,setQuery]=useState(''),[showAll,setShowAll]=useState(false);
  const [menu,setMenu]=useState(false),[selected,setSelected]=useState<Project|null>(null),[hero,setHero]=useState(0),[viewer,setViewer]=useState<number|null>(null);
  const [effects,setEffects]=useState(true),[draft,setDraft]=useState(''),[copied,setCopied]=useState(false),[copyError,setCopyError]=useState(false);
  const swiped=useRef(false);
  const rail=useRef<HTMLDivElement>(null),gesture=useRef<{x:number;y:number}|null>(null);
  const [form]=Form.useForm();
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>{let saved='';try{saved=localStorage.getItem('nexus-effects')??'';}catch{}setEffects(!media.matches&&saved!=='off');};
    update();media.addEventListener('change',update);return()=>{media.removeEventListener('change',update);delete document.body.dataset.effects;};
  },[]);
  useEffect(()=>{document.body.dataset.effects=effects?'on':'off';},[effects]);
  const filtered=initialProjects.filter(p=>(category==='All projects'||p.category===category)&&query.trim().toLowerCase().split(/\s+/).every(word=>[p.name,p.subtitle,p.description,p.note,p.category,...p.tags].flatMap(value=>[value,t(value),...Object.values(messages[value]??{})]).join(' ').toLowerCase().includes(word)));
  const visible=showAll||query.trim()||category!=='All projects'?filtered:filtered.slice(0,6);
  const changeHero=(n:number)=>setHero(v=>(v+n+heroPhotos.length)%heroPhotos.length);
  const openHero=()=>{if(swiped.current){swiped.current=false;return;}setViewer(displayPhotos.findIndex(p=>p.id===heroPhotos[hero].id));};
  const submit=(values:{name:string;email:string;message:string})=>{
    const text=`${t('Your name / ชื่อ')}: ${values.name.trim()}\n${t('Email / อีเมล')}: ${values.email.trim()}\n\n${values.message.trim()}`;
    setDraft(text);setCopied(false);setCopyError(false);
    if(profile.email)window.location.href=`mailto:${profile.email}?subject=${encodeURIComponent('Portfolio inquiry — '+values.name)}&body=${encodeURIComponent(text)}`;
  };
  const reset=()=>{setCategory('All projects');setQuery('');setShowAll(false);};
  return <ConfigProvider locale={locale==='th'?thTH:locale==='zh'?zhCN:enUS} theme={{algorithm:palette.isDark?theme.darkAlgorithm:theme.defaultAlgorithm,token:{colorPrimary:palette.action,colorBgContainer:palette.bg,colorBgElevated:palette.surface,colorText:palette.text,colorTextSecondary:palette.muted,colorBorder:palette.border,borderRadius:0,fontFamily:'Inter, "IBM Plex Sans Thai", sans-serif'}}}>
    <GlobalStyle/><Editorial>
      <a className="skip-link" href="#main">{t('Skip to content')}</a>
      <header className="masthead"><div className="wrap nav-inner"><a className="brand" href="#home" aria-label={t('Theetawatch home')}><span className="brand-mark" aria-hidden="true">tt</span><span>theetawatch</span></a>
        <nav id="main-navigation" className={`nav-links ${menu?'open':''}`} aria-label={t('Main navigation')}>{[['projects','ed.work'],['about','About'],['journal','ed.journal'],['contact','ed.contact']].map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{t(label)}</a>)}<Link href="/work" onClick={()=>setMenu(false)}>{t('ed.archive')}</Link></nav>
        <div className="nav-tools"><LanguageSwitcher/><a className="text-link nav-contact" href="#contact">{t('Let’s talk')}<Arrow/></a><button className="menu-toggle" aria-label={t(menu?'Close navigation':'Open navigation')} aria-expanded={menu} aria-controls="main-navigation" onClick={()=>setMenu(v=>!v)}>{menu?<CloseOutlined/>:<MenuOutlined/>}</button></div>
      </div></header>
      <main id="main">
        <section className="intro wrap" id="home" aria-labelledby="hero-heading"><div className="intro-meta"><span>PORTFOLIO / MECHATRONICS & ROBOTICS</span><span>{t('ed.personal')}</span></div><div className="wordmark" aria-hidden="true">THEETAWATCH</div>
          <div className="hero-grid"><div className="hero-copy"><h1 id="hero-heading">{t('ed.hero')}</h1><p>{t('ed.lead')}</p><div className="hero-links"><a className="action" href="#projects">{t('ดูโปรเจกต์')}<Arrow/></a><a className="text-link" href="#about">{t('ed.me')}<ArrowRightOutlined/></a></div><a className="hero-credit" href="#projects">{t('รางวัลชนะเลิศหุ่นยนต์ระดับชาติ')}<small>{t('ed.credit')}</small></a></div>
            <figure className="carousel" aria-roledescription={t('ed.carousel')} aria-label={t('ed.labPhotos')}><div className="carousel-window" onPointerDown={e=>{swiped.current=false;gesture.current={x:e.clientX,y:e.clientY};}} onPointerUp={e=>{const g=gesture.current;gesture.current=null;if(g&&Math.abs(e.clientX-g.x)>60&&Math.abs(e.clientX-g.x)>Math.abs(e.clientY-g.y)*1.2){swiped.current=true;changeHero(e.clientX<g.x?1:-1);}}} onPointerCancel={()=>{gesture.current=null;}}><button onClick={openHero} aria-label={`${t('photo.open')}: ${t(heroPhotos[hero].title)}`}><img key={heroPhotos[hero].id} src={heroPhotos[hero].src} width={heroPhotos[hero].width} height={heroPhotos[hero].height} alt={t(heroPhotos[hero].alt)} fetchPriority="high" draggable={false}/></button></div><figcaption className="carousel-caption"><span className="caption-copy" aria-live="polite">{t(heroPhotos[hero].title)}<br/>{t('ed.originalPhotos')}</span><div className="carousel-controls"><button aria-label={t('photo.previous')} onClick={()=>changeHero(-1)}><ArrowLeftOutlined/></button><span>{String(hero+1).padStart(2,'0')} / 03</span><button aria-label={t('photo.next')} onClick={()=>changeHero(1)}><ArrowRightOutlined/></button></div></figcaption></figure>
          </div>
        </section>
        <section className="section wrap" id="projects" aria-labelledby="projects-heading"><div className="section-top"><div><div className="section-label">01 / {t('ed.work')}</div><h2 id="projects-heading">{t('ed.selected')}</h2></div><p>{t('ed.workIntro')}</p></div>
          <div className="browse-bar"><label className="search-field"><SearchOutlined aria-hidden="true"/><input type="search" aria-label={t('work.search')} placeholder={t('work.search')} value={query} onChange={e=>{setQuery(e.target.value);setShowAll(true);}}/>{query&&<button aria-label={t('ed.clearSearch')} onClick={()=>setQuery('')}><CloseOutlined/></button>}</label><span className="result-count" role="status">{filtered.length} / {initialProjects.length} {t('ed.projects')}</span></div>
          <div className="filters" role="group" aria-label={t('Filter projects')}>{categories.map(c=><button className="filter" key={c} aria-pressed={c===category} onClick={()=>{setCategory(c);setShowAll(false);}}>{t(c)}</button>)}</div>
          <div className="project-grid">{visible.map(p=>{const photo=projectPhoto(p);const content=<><div className={`project-image ${!photo?'no-photo':photo.kind==='document'?'is-document':''}`}>{photo?<img src={photo.src} srcSet={`${photo.thumbnail} 480w, ${photo.src} ${photo.width}w`} sizes="(max-width:760px) 100vw, 50vw" width={photo.width} height={photo.height} alt={t(photo.alt)} loading="lazy"/>:<span>{t(p.name)}</span>}</div><div className="project-info"><div className="project-kicker"><span>{t(p.category)}</span><span>{photo?.kind==='document'?t('album.document'):t(p.status)}</span></div><div className="project-title"><h3>{t(p.name)}</h3><Arrow/></div><p>{t(p.note)}</p><div className="project-tags">{p.tags.map(tag=><span key={tag}>{t(tag)}</span>)}</div></div></>;return p.href?<Link className="project-card" href={p.href} key={p.id}>{content}</Link>:<button className="project-card" key={p.id} onClick={()=>setSelected(p)}>{content}</button>;})}</div>
          {!filtered.length&&<div className="empty"><p>{t('work.noResults')}</p><Button onClick={reset}>{t('work.clear')}</Button></div>}
          <div className="projects-footer">{filtered.length>6&&category==='All projects'&&!query?<button className="plain-button text-link" aria-expanded={showAll} onClick={()=>setShowAll(v=>!v)}>{t(showAll?'Show selected projects':'ed.allProjects')} ({filtered.length})<ArrowRightOutlined/></button>:<span className="result-count">{visible.length} {t('ed.projects')}</span>}<Link className="text-link" href="/work">{t('ed.archive')} · 12<Arrow/></Link></div>
        </section>
        <section className="section wrap" id="about" aria-labelledby="about-heading"><div className="about-grid"><figure className="portrait"><img src={personalPhotos.handsOn.src} width={960} height={1280} alt={t(personalPhotos.handsOn.alt)} loading="lazy"/><figcaption>{t('ed.portrait')}</figcaption></figure><div className="about-copy"><div className="section-label">02 / {t('About')}</div><h2 id="about-heading">{t('ed.aboutTitle')}</h2><p>{t(profile.about)}</p><p>{t(profile.approach)}</p><div className="about-name">{profile.thaiName}<small>{profile.name}</small></div><div className="skills">{skillGroups.map((skill,i)=><div className="skill-row" key={skill.name}><span>0{i+1}</span><h3>{t(skill.name)}</h3><p>{skill.tools}</p></div>)}</div></div></div></section>
        <section className="section wrap" id="journal" aria-labelledby="journal-heading"><div className="journal-heading"><div><div className="section-label">03 / {t('ed.journal')}</div><h2 id="journal-heading">{t('ed.journalTitle')}</h2></div><div className="journal-tools"><button className="round-control" aria-label={t('photo.previous')} onClick={()=>rail.current?.scrollBy({left:-(rail.current.clientWidth*.7),behavior:effects?'smooth':'instant'})}><ArrowLeftOutlined/></button><button className="round-control" aria-label={t('photo.next')} onClick={()=>rail.current?.scrollBy({left:rail.current.clientWidth*.7,behavior:effects?'smooth':'instant'})}><ArrowRightOutlined/></button></div></div><div className="journal-rail" ref={rail} tabIndex={0} role="region" aria-label={t('ed.labPhotos')}>{journalPhotos.map((photo,i)=><button className="journal-item" key={photo.id} onClick={()=>setViewer(displayPhotos.findIndex(p=>p.id===photo.id))} aria-label={`${t('photo.open')}: ${t(photo.title)}`}><img src={photo.thumbnail} srcSet={`${photo.thumbnail} 480w, ${photo.src} ${photo.width}w`} sizes="(max-width:760px) 80vw, 30vw" width={photo.width} height={photo.height} alt={t(photo.alt)} loading="lazy"/><span>{t(photo.title)}</span><small>{String(i+1).padStart(2,'0')} / {t('ed.originalPhotos')}</small></button>)}</div></section>
        <section className="section wrap" aria-labelledby="experience-heading"><div className="section-label">04 / {t('ed.beyond')}</div><h2 id="experience-heading">{t('ทำเอง แล้วส่งต่อ')}</h2><div className="role-grid">{roles.map(item=><article key={item.number}><small>{item.number} / {t(item.label)}</small><h3>{t(item.title)}</h3><p>{t(item.description)}</p></article>)}</div><div className="projects-footer"><span className="result-count">{t('ed.labIntro')}</span><Link className="text-link" href="/pid-lab">PID Lab<Arrow/></Link></div></section>
        <section className="section contact wrap" id="contact" aria-labelledby="contact-heading"><div className="contact-grid"><div><div className="section-label">05 / {t('ed.contact')}</div><h2 id="contact-heading">{t('ed.contactTitle')}</h2><p>{t('ed.contactIntro')}</p><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub / ttwatchesyou<Arrow/></a><p className="form-note">{t(profile.email?'เปิดแอปอีเมลของคุณพร้อมข้อความที่กรอก คุณตรวจสอบก่อนส่งได้':'ed.contactNote')}</p></div><div><Form form={form} className="contact-form" layout="vertical" onFinish={submit} requiredMark={false}>
          <Form.Item label={t('Your name / ชื่อ')} name="name" rules={[{required:true,whitespace:true,message:t('กรุณาระบุชื่อ')}]}><Input autoComplete="name" maxLength={100}/></Form.Item>
          <Form.Item label={t('Email / อีเมล')} name="email" rules={[{required:true,message:t('กรุณาระบุอีเมล')},{type:'email',message:t('กรุณาตรวจสอบรูปแบบอีเมล')}]}><Input autoComplete="email" type="email" maxLength={254}/></Form.Item>
          <Form.Item label={t('Your idea / ไอเดียของคุณ')} name="message" rules={[{required:true,whitespace:true,message:t('เล่าไอเดียของคุณสักนิด')}]}><Input.TextArea rows={4} maxLength={3000}/></Form.Item><Button htmlType="submit" type="primary" block>{t(profile.email?'Open email draft':'Create message draft')} <Arrow/></Button></Form>
          {draft&&<div role="status"><pre className="draft-result">{draft}</pre><Button icon={copied?<CheckOutlined/>:undefined} onClick={async()=>{try{await navigator.clipboard.writeText(draft);setCopied(true);setCopyError(false);}catch{setCopyError(true);}}}>{t(copied?'Copied':'Copy message')}</Button>{copyError&&<p>{t('ed.copyError')}</p>}</div>}
        </div></div></section>
      </main>
      <footer className="footer"><div className="wrap footer-inner"><span>© {new Date().getFullYear()} Theetawatch tangtakulltanakit</span><div className="footer-controls"><AppearanceSwitcher/><button aria-pressed={effects} onClick={()=>{setEffects(v=>!v);try{localStorage.setItem('nexus-effects',effects?'off':'on');}catch{}}}>{t('MOTION')} / {t(effects?'ON':'OFF')}</button><a className="text-link" href="#home">{t('ed.top')} ↑</a></div></div></footer>
    </Editorial>
    <PhotoViewer photos={displayPhotos} index={viewer} setIndex={setViewer} effects={effects}/>
    <Modal open={!!selected} title={selected?t(selected.name):''} onCancel={()=>setSelected(null)} footer={<Button onClick={()=>setSelected(null)}>{t('Back to projects')}</Button>} width={760} destroyOnHidden closable={{'aria-label':t('Close')}} transitionName={effects?undefined:''} maskTransitionName={effects?undefined:''}>
      {selected&&<ModalContent><p>{t(selected.description)}</p><p><strong>{t('บทบาท / สิ่งที่ลงมือทำ')}</strong><br/>{t(selected.role)}</p><ul>{selected.details.map(item=><li key={item}>{t(item)}</li>)}</ul>{projectPhoto(selected)&&<ProjectPhotos photos={[projectPhoto(selected)!]} effects={effects} level={3}/>}</ModalContent>}
    </Modal>
  </ConfigProvider>;
}
