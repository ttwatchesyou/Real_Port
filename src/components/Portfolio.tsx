'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import thTH from 'antd/locale/th_TH';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { LanguageSwitcher, useLocale } from './LocaleProvider';
import CircuitPlayground from './CircuitPlayground';
import WorkPhotos from './WorkPhotos';
import ProjectPhotos from './ProjectPhotos';
import WorkIllustration from './work/WorkIllustration';
import { workStudies } from '@/data/workArchive';
import AmbientEffects from './AmbientEffects';
import { Button, ConfigProvider, Form, Input, Modal, theme } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined, ArrowUpOutlined, CheckOutlined, CodeOutlined, EnvironmentOutlined, ExperimentOutlined, GithubOutlined, MenuOutlined, CloseOutlined, PlayCircleOutlined, ThunderboltOutlined, WifiOutlined, ApiOutlined, ToolOutlined, ApartmentOutlined, TrophyOutlined, ReadOutlined } from '@ant-design/icons';
import { Board, Arm, Dashboard, Rover, LogisticsRobot, ControlPanel, CadStudy, PIDPreview } from './Visuals';
import BoardAssembly from './BoardAssembly';
import AppearanceSwitcher from './AppearanceSwitcher';
import { useAppearance } from './AppearanceProvider';
import { usePointerTilt } from '@/hooks/usePointerTilt';
import { GlobalStyle, Shell, ModalContent } from './styles';
import { categories, profile, projects, roles, type Category, type Project } from '@/data/portfolio';

function ArrowUpRightOutlined() { return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function Mark() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M3 8h15M10.5 8v18M15 5h14M22 5v18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square"/><circle cx="27" cy="27" r="2" fill="currentColor"/></svg>; }
function ProjectVisual({ kind, image, studySlug, full = false }: { kind: Project['kind']; image?: Project['image']; studySlug?: string; full?: boolean }) {
  const {t}=useLocale();
  const study=studySlug?workStudies.find(s=>s.slug===studySlug):undefined;
  if(study) return <WorkIllustration visual={study.visual}/>;
  if(image&&full) return <img src={image.src} srcSet={image.personal?`${image.personal.thumbnail} 480w, ${image.src} ${image.personal.width}w`:undefined} sizes={full?'(max-width:640px) 90vw, 580px':'(max-width:640px) 90vw, (max-width:1000px) 45vw, 33vw'} width={image.personal?.width} height={image.personal?.height} alt={t(image.alt)} loading="lazy" className={`project-photo photo-focus-${image.focus??'center'}`}/>;
  if(kind==='pid') return <PIDPreview/>;
  if(kind==='agv') return <LogisticsRobot/>;
  if(kind==='plc') return <ControlPanel/>;
  if(kind==='cad') return <CadStudy/>;
  if(kind==='arm') return <Arm/>;
  if(kind==='board'||kind==='weather') return <Board/>;
  if(kind==='rover') return <Rover/>;
  return <Dashboard code={kind==='code'}/>;
}
function ProjectCard({ p, effects, onSelect }: { p: Project; effects: boolean; onSelect: (project: Project) => void }) {
  const {t}=useLocale();
  const card=useRef<HTMLElement>(null);
  usePointerTilt(card,effects,'.project-visual',7);
  const content=<><div className={`project-visual ${p.kind==='board'||p.kind==='weather'?'board':''}`}><span className="project-number">PRJ_{p.id}</span><span className={`concept-label ${p.status==='CHAMPION'?'award-label':''}`}>{p.status==='CHAMPION'&&<TrophyOutlined/>} {t(p.status)}</span><ProjectVisual kind={p.kind} image={p.image} studySlug={p.studySlug}/><span className="illustration-label">{t("ภาพจำลองเคลื่อนไหว")}</span>{p.image?.personal&&<span className="photo-available">{t('work.photosInside')}</span>}{p.studySlug&&<span className="work-media-available">{t('work.photosInside')}</span>}</div><div className="project-body"><div className="project-category">{t(p.category)}</div><div className="project-title-row"><h3>{t(p.name)}</h3><ArrowUpRightOutlined/></div>{!p.studySlug&&<p className="project-subtitle">{t(p.subtitle)}</p>}<p className="project-note">{t(p.note)}</p><div className="tags">{p.tags.map(tag=><span className="tag" key={t(tag)}>{t(tag)}</span>)}</div></div></>;
  return p.href?<Link className="project-card" ref={el=>{card.current=el;}} href={p.href} aria-label={`${t("View")} ${t(p.subtitle)}`}>{content}</Link>:<button className="project-card" ref={el=>{card.current=el;}} onClick={()=>onSelect(p)} aria-label={`${t("View")} ${t(p.subtitle)}`}>{content}</button>;
}
const techs = [{name:'Mitsubishi FX5U',icon:<ApartmentOutlined/>},{name:'CAD / Simulation',icon:<ToolOutlined/>},{name:'Arduino UNO R4',icon:<ApiOutlined/>},{name:'ESP32',icon:<WifiOutlined/>},{name:'ESP8266',icon:<ThunderboltOutlined/>},{name:'STM32',icon:<ApartmentOutlined/>},{name:'C / C++',icon:<CodeOutlined/>},{name:'Python',icon:<CodeOutlined/>},{name:'Next.js',icon:<ArrowUpRightOutlined/>},{name:'ROS',icon:<ApartmentOutlined/>}];
const logMessages = ['Serial port opened at 115200 baud','Controller ready / I/O checked','Sensor input received / output enabled','Demo complete. Back to the workbench.'];

export default function Portfolio() {
  const {t,locale}=useLocale();
  const { mode, palette, time } = useAppearance();
  const [category,setCategory]=useState<Category>('All projects');
  const [showAll,setShowAll]=useState(false);
  const [selected,setSelected]=useState<Project|null>(null);
  const [contactOpen,setContactOpen]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [active,setActive]=useState('home');
  const [effects,setEffects]=useState(true);
  const heroVisual=useRef<HTMLDivElement>(null);
  usePointerTilt(heroVisual, effects, '.board-response', 10);
  const [ready,setReady]=useState(false);
  const [logCount,setLogCount]=useState(4);
  const [running,setRunning]=useState(false);
  const [draft,setDraft]=useState('');
  const [copied,setCopied]=useState(false);
  const [form]=Form.useForm();
  const root=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion=()=>{let preference: string | null=null;try{preference=localStorage.getItem('nexus-effects');}catch{}setEffects(!motionQuery.matches && preference!=='off');};
    updateMotion();
    motionQuery.addEventListener('change',updateMotion);
    setReady(true);
    const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:.08});
    root.current?.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
    const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting) setActive(entry.target.id);});},{rootMargin:'-15% 0px -55% 0px',threshold:0});
    root.current?.querySelectorAll('section[id]').forEach(el=>sectionObserver.observe(el));
    return ()=>{revealObserver.disconnect();sectionObserver.disconnect();motionQuery.removeEventListener('change',updateMotion);};
  },[]);
  useEffect(()=>{document.body.dataset.effects=effects?'on':'off';},[effects]);
  useEffect(()=>{
    if(!running) return;
    const timer=setInterval(()=>setLogCount(count=>{if(count>=3){setRunning(false);return 4;}return count+1;}),650);
    return ()=>clearInterval(timer);
  },[running]);
  useEffect(()=>{if(!menuOpen)return;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenuOpen(false);};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);},[menuOpen]);

  const filtered=projects.filter(p=>category==='All projects'||p.category===category);
  const visible=showAll||category!=='All projects'?filtered:filtered.slice(0,3);
  const toggleEffects=()=>{const next=!effects && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;setEffects(next);try{localStorage.setItem('nexus-effects',next?'on':'off');}catch{}};
  const submitContact=(values:{name:string;email:string;message:string})=>{
    const text=`${t("Your name / ชื่อ")}: ${values.name}\n${t("Email / อีเมล")}: ${values.email}\n\n${values.message}`;
    setDraft(text);
    setCopied(false);
    if(profile.email) window.location.href=`mailto:${profile.email}?subject=${encodeURIComponent('New project inquiry — '+values.name)}&body=${encodeURIComponent(text)}`;
  };

  return <ConfigProvider locale={locale==='th'?thTH:locale==='zh'?zhCN:enUS} theme={{algorithm:palette.isDark?theme.darkAlgorithm:theme.defaultAlgorithm,token:{colorPrimary:palette.accent,colorBgElevated:palette.surface,colorBgContainer:palette.bg,colorText:palette.text,colorTextSecondary:palette.muted,colorBorder:palette.border,borderRadius:5,fontFamily:'Manrope, Arial, sans-serif'},components:{Button:{primaryColor:palette.onAction,colorPrimary:palette.action,colorPrimaryHover:palette.action}}}}>
    <GlobalStyle/>
    <Shell ref={root} data-ready={ready}>
      <AmbientEffects effects={effects}/>
      <a className="skip-link" href="#main">{t("Skip to content")}</a>
      <header className="nav">
        <div className="wrap nav-inner">
          <a className="logo" href="#home" aria-label={t("Theetawatch home")}><Mark/><span>theetawatch<span>.</span></span></a>
          <nav className={`nav-links ${menuOpen?'open':''}`} id="main-navigation" aria-label={t("Main navigation")}>
            {[['home','Home'],['workbench','Workbench'],['projects','Projects'],['about','About'],['stack','Tech stack']].map(([id,label])=><a key={id} href={`#${id}`} className={`nav-link ${active===id?'active':''}`} aria-current={active===id?'location':undefined} onClick={()=>{setActive(id);setMenuOpen(false);}}>{t(label)}</a>)}
          </nav>
          <div className="nav-tools"><AppearanceSwitcher/><LanguageSwitcher/><button className="nav-contact" onClick={()=>setContactOpen(true)}>{t("Let’s talk")}<ArrowUpRightOutlined/></button>
          <button className="menu-toggle" aria-label={t(menuOpen?'Close navigation':'Open navigation')} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<CloseOutlined/>:<MenuOutlined/>}</button></div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-heading">
          <div className="wrap">
            <div className="hero-main">
              <div className="hero-copy">
                <div className="eyebrow"><span className="status-dot"/>{t("MECHATRONICS / ROBOTICS / AUTOMATION")}</div>
                <h1 id="hero-heading"><span className="hero-intro">{t("Hi, I’m")}</span><span className="hero-name">{profile.firstName}<span className="green">.</span></span><span className="hero-surname">{profile.lastName}</span></h1><p className="hero-thai-name">{profile.thaiName}</p>
                <p className="hero-description">{t("ผมทำหุ่นยนต์และระบบอัตโนมัติ ตั้งแต่ออกแบบกลไก")}<br/>{t("ต่อวงจร ไปจนถึงเขียนโค้ดให้มันทำงานจริง")}<br/>{t("ที่นี่รวมงานแข่งขัน งานทดลอง และสิ่งที่ผมได้เรียนรู้")}</p>
                <a className="achievement-note" href="#projects"><TrophyOutlined/><span>{t("รางวัลชนะเลิศหุ่นยนต์ระดับชาติ")}<small>{t("NATIONAL ROBOTICS CHAMPION")}</small></span><ArrowUpRightOutlined/></a><div className="hero-actions"><a className="primary-button" href="#projects">{t("ดูโปรเจกต์")}<ArrowUpRightOutlined/></a><a className="secondary-button" href="#workbench">{t("ลองรื้อบอร์ดดู")}<ArrowRightOutlined/></a></div>
                <div className="hero-footnote"><span className="handwritten">{t("built, tested, and still learning.")}</span><span className="footnote-arrow">↗</span></div>
              </div>
              <div className="visual" ref={heroVisual}>
                <div className="orbit" aria-hidden="true"/>
                <div className="visual-label top">{t("ON THE DESK / EXPERIMENT 001")}</div>
                <div className="board-response"><div className="board-float"><Board hero/></div></div>
                <div className="visual-label right"><strong>{t("ESP32-WROOM")}</strong><span>{t("DUAL-CORE · 240 MHz")}</span></div>
                <div className="visual-label left">{t("NOT TO SCALE.")}<br/>{t("JUST HERE TO TINKER.")}</div>
                <div className="axis" aria-hidden="true"><svg viewBox="0 0 55 45"><path d="M20 28V5m0 23L2 37m18-9 22 9" fill="none" stroke="currentColor"/><text x="24" y="10" fill="currentColor" fontSize="7">Z</text><text x="43" y="40" fill="currentColor" fontSize="7">X</text><text x="0" y="43" fill="currentColor" fontSize="7">Y</text></svg></div>
                <div className="visual-label bottom"><span className="status-dot"/>{t("VIRTUAL WORKBENCH")}<span className="muted">/ REV. 02</span></div>
              </div>
            </div>
            <div className="hero-bottom"><div className="hero-bottom-left mono local-light"><span className="status-dot"/><span>{t(mode==='auto'?'LIVE LIGHT':mode==='dark'?'MIDNIGHT':'PASTEL CREAM')} <span className="light-time">{time}</span><span className="light-phase"> / {t(palette.phaseLabel)}</span></span></div><a className="scroll-cue mono" href="#workbench">{t("SCROLL TO TAKE A LOOK")}<ArrowDownOutlined/></a></div>
          </div>
        </section>

        <div className="technology-strip" aria-label={t("Arduino, ESP32, ESP8266, STM32, C++, Python, Next.js, ROS 2")}>
          <div className="technology-track" aria-hidden="true">{[0,1].map(n=><div className="technology-group" key={n}>{techs.map(t=><span key={t.name}>{t.icon}{t.name}<span className="tech-divider">✦</span></span>)}</div>)}</div>
        </div>

        <BoardAssembly effects={effects}/>
        <CircuitPlayground effects={effects}/>

        <section className="section wrap" id="projects" aria-labelledby="projects-heading">
          <div className="reveal"><div className="section-label"><span className="line"/>{t("01 / PROJECT NOTEBOOK")}</div><div className="section-head"><h2 id="projects-heading">{t("Some things")}<br/><span className="muted">{t("on my workbench.")}</span></h2><p>{t("งานแข่งขัน ระบบควบคุม และการทดลอง")}<br/>{t("แต่ละชิ้นมีโจทย์และสิ่งที่ได้เรียนรู้ต่างกัน")}</p></div></div>
          <div className="filters" aria-label={t("Filter projects")}>{categories.map(c=><button key={c} className={`filter ${category===c?'selected':''}`} aria-pressed={category===c} onClick={()=>{setCategory(c);setShowAll(false);}}>{t(c)}{c==='All projects'&&<small>{String(projects.length).padStart(2,'0')}</small>}</button>)}<span className="filter-count" aria-live="polite">{String(filtered.length).padStart(2,'0')}{t("PROJECTS & PRACTICE")}</span></div>
          <Link className="notebook-feature" href="/work"><span><strong>{t('work.feature')}</strong><small>{t('work.featureNote')}</small></span><ArrowRightOutlined/></Link>
          <div className="project-grid">{visible.map(p=><ProjectCard key={p.id} p={p} effects={effects} onSelect={setSelected}/>)}</div>
          {category==='All projects'&&<div className="projects-footer"><span className="rule"/><button onClick={()=>setShowAll(!showAll)}>{showAll?t('Show selected projects'):t('View all projects').replace('{count}',String(projects.length))}{showAll?<ArrowUpOutlined/>:<ArrowRightOutlined/>}</button><span className="rule"/></div>}
        </section>

        <WorkPhotos effects={effects}/>

        <section className="about-section" id="about" aria-labelledby="about-heading"><div className="wrap section about-grid">
          <div className="about-copy reveal"><div className="section-label"><span className="line"/>{t("02 / A BIT ABOUT ME")}</div><h2 id="about-heading">{t("Hello again.")}<br/><span className="muted">{t("ผมธีร์ธวัชครับ")}</span></h2><p>{t(profile.about)}</p><p>{t(profile.approach)}</p><p className="about-signature">{profile.firstName} <span> / {profile.thaiName}</span></p><div className="about-meta">{profile.location&&<span><EnvironmentOutlined/>{profile.location}</span>}<span><ExperimentOutlined/>{t("Hardware, software & the bits between.")}</span></div></div>
          <div className="terminal reveal"><div className="terminal-title"><span className="terminal-dots"><i/><i/><i/></span><span>theetawatch@workbench: ~</span><CodeOutlined/></div><div className="terminal-body" aria-live="polite" aria-atomic="true"><p className="command"><span className="green">➜</span> ~ python workbench_demo.py</p>{logMessages.slice(0,logCount).map((line,i)=><p key={t(line)}><span className="ok">[ OK ]</span>{i===3?<span className="green">{t(line)}</span>:t(line)}</p>)}{!running&&<p className="prompt">➜ ~ <span className="cursor"/></p>}</div><button className="terminal-run" onClick={()=>{setLogCount(0);setRunning(true);}} disabled={running}><span>{t(running?'Initializing…':'Run initialization sequence')}</span><PlayCircleOutlined/></button></div>
        </div></section>

        <section className="wrap section" id="stack" aria-labelledby="stack-heading"><div className="reveal"><div className="section-label"><span className="line"/>{t("03 / TOOLS & INTERESTS")}</div><div className="section-head"><h2 id="stack-heading">{t("Code, components,")}<br/><span className="muted">{t("and a few tools.")}</span></h2><p>{t("ฝั่งฮาร์ดแวร์ ซอฟต์แวร์ และสิ่งที่เชื่อมทั้งสองเข้าด้วยกัน")}<br/>{t("เลือกใช้ให้เหมาะกับงานแต่ละชิ้น")}</p></div></div><div className="skill-grid">
          {[{icon:<ApartmentOutlined/>,name:'Robotics & automation',description:'เขียนโปรแกรมควบคุม ออกแบบกลไก และทดสอบระบบอัตโนมัติ',tags:['Mitsubishi FX5U','ROS','Robot control','Sensors & actuators']},{icon:<ThunderboltOutlined/>,name:'Embedded & electronics',description:'ลงมือประกอบวงจรและเชื่อมไมโครคอนโทรลเลอร์กับอุปกรณ์',tags:['Arduino UNO R4','ESP32','Sensor integration','Motor control']},{icon:<ToolOutlined/>,name:'Design & simulation',description:'ออกแบบชิ้นส่วนและตรวจสอบการทำงานก่อนประกอบจริง',tags:['CAD','Simulation','Mechanical design','Prototyping']},{icon:<CodeOutlined/>,name:'Programming & analysis',description:'เขียนโค้ดควบคุมฮาร์ดแวร์ ใช้ Gemini และ Claude ช่วยวิเคราะห์โค้ด แล้วตรวจสอบกับระบบจริง',tags:['Hardware programming','Debugging','Gemini / Claude','Technical documentation']}].map(skill=><div className="skill-card reveal" key={skill.name}><div className="skill-icon">{skill.icon}</div><h3>{t(skill.name)}</h3><p>{t(skill.description)}</p><div className="tags">{skill.tags.map(tag=><span className="tag" key={tag}>{t(tag)}</span>)}</div></div>)}
        </div></section>

        <section className="experience-section" id="experience" aria-labelledby="experience-heading"><div className="wrap section"><div className="section-label"><span className="line"/>{t("04 / BEYOND THE WORKBENCH")}</div><div className="section-head"><h2 id="experience-heading">{t("ทำเอง แล้วส่งต่อ")}<br/><span className="muted">{t("ให้คนอื่นลองทำด้วย")}</span></h2><p>{t("อีกด้านของงาน คือการอธิบายสิ่งที่ทำ")}<br/>{t("และมีส่วนร่วมกับคนรอบตัว")}</p></div><div className="role-grid">{roles.map(item=><article className="role-card reveal" key={item.number}><div className="role-number">{item.number}<ReadOutlined/></div><span className="role-label">{t(item.label)}</span><h3>{t(item.title)}</h3><p>{t(item.description)}</p></article>)}</div><div className="opportunity-note"><EnvironmentOutlined/><span>{t("สนใจโอกาสด้านเมคคาทรอนิกส์ หุ่นยนต์ และระบบอัตโนมัติในพื้นที่ระยอง")}</span><ArrowUpRightOutlined/></div></div></section>

        <section className="wrap contact-section" id="contact" aria-labelledby="contact-heading"><div className="contact-box reveal"><div><div className="eyebrow"><span className="status-dot"/>{t("DROP ME A NOTE")}</div><h2 id="contact-heading">{t("มีเรื่องอยากคุย")}<span className="green">{t("ทักมาได้ครับ")}</span></h2><p>{t("เรื่องโปรเจกต์ โค้ด หรือบอร์ดที่กำลังลองเล่นอยู่")}<br/>{t(profile.email?"ฝากข้อความไว้ได้เลย":"สร้างข้อความไว้คัดลอก หรือติดต่อผ่าน GitHub ได้")}</p></div><div className="contact-actions"><button className="primary-button" onClick={()=>setContactOpen(true)}>{t("เขียนข้อความ")}<ArrowUpRightOutlined/></button><a className="secondary-button" href={profile.github} target="_blank" rel="noreferrer"><GithubOutlined/>{t('GitHub profile')}</a></div></div></section>
      </main>
      <footer className="footer"><div className="wrap footer-inner"><a className="logo" href="#home" aria-label={t("Theetawatch back to top")}><Mark/><span>theetawatch<span>.</span></span></a><span className="footer-note"><span className="theme-explanation">{t(mode==='auto'?'แสงเปลี่ยนตามเวลาเครื่อง · ช่วงเช้า–เย็นโดยประมาณ':mode==='light'?'ครีมพาสเทล / PASTEL CREAM':'โหมดมืด / MIDNIGHT')}</span>© {new Date().getFullYear()} {profile.name}{t("· PERSONAL PORTFOLIO")}</span><a className="footer-social" href={profile.github} target="_blank" rel="noreferrer" aria-label={t('GitHub profile')}><GithubOutlined/>GitHub</a><button className="effects-button" aria-pressed={effects} onClick={toggleEffects}><span className="status-dot"/>{t("MOTION")} {t(effects?'ON':'OFF')}</button></div></footer>
    </Shell>

    <Modal closable={{'aria-label':t("Close")}} transitionName={effects?undefined:""} maskTransitionName={effects?undefined:""} title={selected?t(selected.subtitle):undefined} closeIcon={<span aria-label={t("Close")}><CloseOutlined/></span>} open={!!selected} onCancel={()=>setSelected(null)} footer={<Button onClick={()=>setSelected(null)}>{t("Back to projects")}</Button>} width={620} destroyOnHidden>
      {selected&&<ModalContent><div className="modal-visual"><ProjectVisual kind={selected.kind}/></div>{selected.image?.personal&&<ProjectPhotos photos={[selected.image.personal]} effects={effects} level={3}/>}<div className="modal-kicker">PRJ_{selected.id} / {t(selected.category)} / {t(selected.status)}</div><h3>{t(selected.name)}</h3><p>{t(selected.description)}</p><p className="project-role"><strong>{t("บทบาท / สิ่งที่ลงมือทำ")}</strong><br/>{t(selected.role)}</p><div className="modal-tags">{selected.tags.map(tag=><span className="modal-tag" key={tag}>{t(tag)}</span>)}</div><ul>{selected.details.map(d=><li key={t(d)}>{t(d)}</li>)}</ul>{(!selected.image||selected.image.generated)&&<p className="notice">{t("ภาพจำลองสำหรับอธิบายแนวงาน ภาพและเอกสารจากชิ้นงานจริงจะเพิ่มภายหลัง")}</p>}</ModalContent>}
    </Modal>
    <Modal closable={{'aria-label':t("Close")}} transitionName={effects?undefined:""} maskTransitionName={effects?undefined:""} title={t("ทักทายธีร์ธวัช")} closeIcon={<span aria-label={t("Close")}><CloseOutlined/></span>} open={contactOpen} onCancel={()=>setContactOpen(false)} footer={null} width={520}>
      <ModalContent><p>{t("มีเรื่องอยากคุยหรืออยากถาม ฝากข้อความไว้ได้ครับ")}</p>{!profile.email&&<p className="notice">{t("ยังไม่ได้ตั้งค่าอีเมล แบบฟอร์มนี้สร้างข้อความให้คัดลอก หรือสามารถติดต่อผ่าน GitHub ได้")} <a href={profile.github} target="_blank" rel="noreferrer">{t('Open GitHub profile')} ↗</a></p>}
        <Form key={locale} className="contact-form" form={form} layout="vertical" onFinish={submitContact} requiredMark={false}>
          <Form.Item label={t("Your name / ชื่อ")} name="name" rules={[{required:true,whitespace:true,message:t('กรุณาระบุชื่อ')}]}><Input placeholder={t("What should I call you?")} autoComplete="name" maxLength={100}/></Form.Item>
          <Form.Item label={t("Email / อีเมล")} name="email" rules={[{required:true,message:t('กรุณาระบุอีเมล')},{type:'email',message:t('กรุณาตรวจสอบรูปแบบอีเมล')}]}><Input placeholder={t("you@example.com")} autoComplete="email" maxLength={254}/></Form.Item>
          <Form.Item label={t("Your idea / ไอเดียของคุณ")} name="message" rules={[{required:true,whitespace:true,message:t('เล่าไอเดียของคุณสักนิด')}]}><Input.TextArea rows={4} maxLength={3000} placeholder={t("I have an idea for…")}/></Form.Item>
          <Button htmlType="submit" type="primary" size="large" block>{t(profile.email?'Open email draft':'Create message draft')} <ArrowUpRightOutlined/></Button>
          <p className="form-footnote">{t(profile.email?'เปิดแอปอีเมลของคุณพร้อมข้อความที่กรอก คุณตรวจสอบก่อนส่งได้':'ข้อมูลจะอยู่ในหน้าเว็บนี้เท่านั้น และหายไปเมื่อรีเฟรชหน้า')}</p>
        </Form>
        {draft&&<div aria-live="polite"><pre className="draft-result">{draft}</pre><Button icon={copied?<CheckOutlined/>:undefined} onClick={async()=>{try{await navigator.clipboard.writeText(draft);setCopied(true);}catch{setCopied(false);}}}>{t(copied?'Copied':'Copy message')}</Button></div>}
      </ModalContent>
    </Modal>
  </ConfigProvider>;
}
