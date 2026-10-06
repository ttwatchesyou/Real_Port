'use client';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const float = keyframes`0%,100% {transform:translateY(0) rotateX(39deg) rotateZ(-28deg);} 50% {transform:translateY(-18px) rotateX(43deg) rotateZ(-24deg);}`;
const orbit = keyframes`to {transform:rotate(360deg);}`;
const pulse = keyframes`0%,100% {box-shadow:0 0 0 0 var(--shadow);} 50% {box-shadow:0 0 0 6px var(--shadow);}`;
const scan = keyframes`0% {transform:translateY(-100%);opacity:0;} 20%,80% {opacity:.5;} 100% {transform:translateY(400px);opacity:0;}`;
const rise = keyframes`from {opacity:0; transform:translateY(22px);} to {opacity:1; transform:translateY(0);}`;
const blink = keyframes`50% {opacity:0;}`;
const marquee = keyframes`to {transform:translateX(-50%);}`;
const beam = keyframes`0% {background-position:0 -120%;} 100% {background-position:0 220%;}`;
const hudPulse = keyframes`0%,100% {opacity:.38;} 50% {opacity:.85;}`;

export const GlobalStyle = createGlobalStyle`
  :root {--bg:#0b1018;--panel:#12171d;--text:#edf0f2;--muted:#92979b;--accent:#76d9ed;--border:#2b2e33;--font-sans:'Kanit',Arial,sans-serif;--mono:'SFMono-Regular',Consolas,'Liberation Mono',monospace;}
  * {box-sizing:border-box;}
  html {scroll-behavior:smooth;scroll-padding-top:96px;}
  body {margin:0;background:var(--bg);color:var(--text);font-family:var(--font-sans);font-weight:300;-webkit-font-smoothing:antialiased;}
  a {color:inherit;text-decoration:none;}
  button,input,textarea {font:inherit;}
  button,a,input,textarea { -webkit-tap-highlight-color:transparent; }
  button {cursor:pointer;}
  button:focus-visible,a:focus-visible {outline:2px solid var(--accent);outline-offset:5px;}
  ::selection {background:var(--accent);color:var(--bg);}
  ::-webkit-scrollbar {width:6px;}
  ::-webkit-scrollbar-thumb {background:var(--surface-strong);border-radius:6px;}
  .ant-modal .ant-modal-content {border:1px solid var(--border);padding:28px;}
  .ant-modal .ant-modal-title {font-family:var(--font-sans);font-size:22px;}
  .ant-modal .ant-modal-close {color:var(--muted);}
  .ant-form-item-label label {color:var(--muted)!important;}
  body[data-effects='off'] *,body[data-effects='off'] *::before,body[data-effects='off'] *::after {animation:none!important;transition:none!important;scroll-behavior:auto!important;}
  @media(prefers-reduced-motion:reduce) {html{scroll-behavior:auto;} *,*::before,*::after{animation:none!important;transition:none!important;}}
`;

export const Shell = styled.div`
  overflow:clip;
  .wrap {max-width:1320px;margin:0 auto;padding:0 64px;}
  .notebook-feature{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:22px 24px;margin:0 0 26px;border:1px solid var(--border);border-radius:5px;background:var(--surface);color:var(--accent);}
  .notebook-feature strong{display:block;font-size:15px;font-weight:600;line-height:1.7;}.notebook-feature small{display:block;font-size:11px;line-height:1.9;color:var(--muted);margin-top:5px;}.notebook-feature svg{flex-shrink:0;}
  .photo-available,.work-media-available{position:absolute;z-index:2;bottom:12px;left:13px;padding:5px 8px;background:var(--surface);border:1px solid var(--border);border-radius:3px;color:var(--accent);font-size:9px;}
  .mono {font-family:var(--mono);font-size:10px;letter-spacing:1.25px;}
  .muted {color:var(--muted);}
  .green {color:var(--accent);}
  .skip-link {position:fixed;top:-60px;left:16px;z-index:100;background:var(--accent);color:var(--muted);padding:12px;}
  .skip-link:focus {top:12px;}
  .nav {position:sticky;top:0;z-index:20;border-bottom:1px solid var(--border);background:var(--glow);backdrop-filter:blur(18px);}
  .nav-inner {height:86px;display:flex;align-items:center;justify-content:space-between;gap:30px;}
  .logo {display:flex;align-items:center;gap:10px;font-size:22px;font-weight:800;letter-spacing:-1px;}
  .logo svg {color:var(--accent);width:29px;height:29px;}
  .logo span:last-child {color:var(--accent);}
  .nav-links {display:flex;gap:31px;align-items:center;}
  .nav-link {font-size:12px;color:var(--muted);position:relative;padding:10px 0;transition:color .2s;}
  .nav-link:hover,.nav-link.active {color:var(--text);}
  .nav-link.active::after {content:'';width:4px;height:4px;border-radius:50%;position:absolute;bottom:0;left:50%;background:var(--accent);}
  .nav-contact {border:1px solid var(--border);border-radius:5px;padding:10px 15px;font-size:11px;display:flex;gap:20px;align-items:center;background:transparent;color:var(--text);transition:background .2s;}
  .nav-contact:hover {background:var(--surface);}
  .menu-toggle {display:none;background:none;border:0;color:var(--text);font-size:22px;padding:8px;}
  .hero {position:relative;border-bottom:1px solid var(--border);}
  .hero::before {content:'';position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(var(--glow) 1px,transparent 1px),linear-gradient(90deg,var(--glow) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(90deg,transparent 20%,#000 90%);}
  .hero-main {min-height:666px;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:20px;position:relative;}
  .hero-copy {padding:65px 0 57px;position:relative;z-index:2;animation:${rise} .8s both;}
  .eyebrow {display:flex;align-items:center;gap:10px;color:var(--accent);font-family:var(--mono);font-size:10px;letter-spacing:1.7px;}
  .status-dot {width:6px;height:6px;flex-shrink:0;background:var(--accent);border-radius:50%;box-shadow:0 0 10px var(--shadow);animation:${pulse} 2.5s infinite;}
  h1 {font-size:clamp(56px,5.6vw,80px);letter-spacing:-4.5px;line-height:1.09;font-weight:650;margin:28px 0 24px;}
  h1 .green {font-weight:500;}
  .hero-description {max-width:380px;font-size:13px;line-height:1.9;color:var(--muted);margin:0 0 30px;}
  .hero-actions {display:flex;gap:13px;align-items:center;}
  .primary-button,.secondary-button {display:inline-flex;align-items:center;justify-content:center;gap:25px;min-height:44px;padding:0 19px;border-radius:4px;font-size:11px;font-weight:700;transition:transform .2s,background .2s;}
  .primary-button {background:var(--accent);color:var(--muted);border:1px solid var(--accent);}
  .primary-button:hover {background:var(--accent);transform:translateY(-3px);}
  .secondary-button {border:1px solid var(--border);color:var(--muted);background:var(--bg);}
  .secondary-button:hover {background:var(--surface);transform:translateY(-3px);}
  .hero-footnote {display:flex;align-items:center;gap:9px;margin-top:39px;color:var(--muted);font-size:9px;font-family:var(--mono);letter-spacing:.4px;}
  .hero-footnote svg {font-size:13px;color:var(--muted);}
  .visual {height:510px;position:relative;perspective:850px;isolation:isolate;}
  .visual::before {content:'';position:absolute;inset:35px -45px;background:radial-gradient(ellipse,var(--glow),transparent 65%);z-index:-1;}
  .orbit {position:absolute;left:4%;top:11%;width:94%;aspect-ratio:1;border:1px dashed var(--border);border-radius:50%;transform:rotateX(30deg);animation:${orbit} 100s linear infinite;}
  .orbit::before {content:'';position:absolute;inset:36px;border:1px solid var(--border);border-radius:50%;}
  .orbit::after {content:'';position:absolute;top:14%;left:14%;width:5px;height:5px;background:var(--accent);border-radius:50%;box-shadow:0 0 12px var(--shadow);}
  .board-response {position:absolute;inset:0;transform-style:preserve-3d;}
  .board-float {position:absolute;inset:38px -20px 26px -20px;transform:rotateX(39deg) rotateZ(-28deg);transform-style:preserve-3d;animation:${float} 8s ease-in-out infinite;filter:drop-shadow(-22px 40px 22px var(--shadow));transition:filter .4s;}
  .visual:hover .board-float {filter:drop-shadow(-22px 40px 22px var(--shadow)) brightness(1.18);}
  .visual-label {position:absolute;z-index:3;font-family:var(--mono);font-size:8px;letter-spacing:1.1px;color:var(--muted);}
  .visual-label.top {top:43px;left:17px;display:flex;gap:8px;align-items:center;}
  .visual-label.top::before {content:'+';font-size:17px;color:var(--muted);}
  .visual-label.right {top:130px;right:-5px;display:flex;flex-direction:column;gap:6px;}
  .visual-label.right strong {color:var(--text);font-size:10px;font-weight:400;}
  .visual-label.right::after {content:'';position:absolute;top:34px;right:60px;width:53px;height:29px;border-top:1px solid var(--border);border-left:1px solid var(--border);transform:skew(-30deg);}
  .visual-label.bottom {bottom:37px;right:4px;display:flex;align-items:center;gap:9px;}
  .visual-label.left {bottom:104px;left:7px;line-height:1.8;font-size:7px;color:var(--muted);}
  .axis {position:absolute;bottom:32px;left:35px;font-size:9px;color:var(--muted);font-family:var(--mono);}
  .axis svg {width:50px;height:45px;}
  .hero-bottom {border-top:1px solid var(--border);padding:19px 0;display:flex;justify-content:space-between;align-items:center;color:var(--muted);}
  .hero-bottom-left {display:flex;align-items:center;gap:8px;}
  .hero-bottom-left .status-dot {width:4px;height:4px;}
  .scroll-cue {display:flex;align-items:center;gap:14px;font-size:9px;}
  .scroll-cue svg {color:var(--muted);}
  .technology-strip {border-bottom:1px solid var(--border);overflow:hidden;background:var(--bg);}
  .technology-track {display:flex;width:max-content;animation:${marquee} 50s linear infinite;}
  .technology-group {display:flex;align-items:center;gap:62px;padding:27px 31px;white-space:nowrap;}
  .technology-group span {display:flex;align-items:center;gap:12px;color:var(--muted);font-size:16px;font-weight:600;letter-spacing:-.5px;}
  .technology-group svg {font-size:20px;color:var(--muted);}
  .technology-group .tech-divider {font-size:11px;color:var(--muted);}
  .section {padding-top:83px;padding-bottom:83px;}
  .section-label {color:var(--muted);font-family:var(--mono);font-size:9px;letter-spacing:1.4px;display:flex;align-items:center;gap:10px;margin-bottom:18px;}
  .section-label .line {height:1px;width:25px;background:var(--accent);}
  .section-head {display:flex;align-items:flex-end;justify-content:space-between;gap:25px;margin-bottom:31px;}
  h2 {font-size:38px;line-height:1.25;letter-spacing:-1.7px;font-weight:550;margin:0;}
  h2 .muted {color:var(--muted);}
  .section-head p {color:var(--muted);font-size:11px;line-height:1.9;max-width:256px;margin:0 0 2px;}
  .filters {display:flex;gap:7px;margin-bottom:25px;align-items:center;flex-wrap:wrap;}
  .filter {border:1px solid transparent;padding:9px 14px;color:var(--muted);border-radius:4px;background:transparent;font-size:10px;transition:all .2s;}
  .filter:hover {color:var(--text);background:var(--surface);}
  .filter.selected {background:var(--surface);color:var(--accent);border-color:var(--border);}
  .filter small {font-size:8px;margin-left:8px;color:var(--muted);}
  .filter-count {margin-left:auto;color:var(--muted);font-size:9px;font-family:var(--mono);}
  .project-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .project-card {padding:0;text-align:left;background:var(--bg);border:1px solid var(--border);border-radius:7px;overflow:hidden;color:var(--text);transition:transform .3s,border-color .3s,box-shadow .3s;animation:${rise} .45s both;}
  .project-card:hover {transform:translateY(-7px);border-color:var(--border);box-shadow:0 15px 45px var(--shadow);}
  .project-visual {height:239px;position:relative;overflow:hidden;background:radial-gradient(ellipse at 50% 70%,var(--glow),transparent 72%),linear-gradient(var(--surface) 1px,transparent 1px),linear-gradient(90deg,var(--surface) 1px,transparent 1px);background-size:auto,28px 28px,28px 28px;border-bottom:1px solid var(--border);}
  .project-visual::after {content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--accent),transparent);animation:${scan} 7s linear infinite;pointer-events:none;}
  .project-visual > svg {transition:transform .7s;}
  .project-card:hover .project-visual > svg {transform:scale(1.06);}
  .project-visual.board > svg {width:83%;margin-left:8%;transform:rotate(-17deg) scale(.87);}
  .project-card:hover .project-visual.board > svg {transform:rotate(-12deg) scale(.94);}
  .project-number {position:absolute;left:14px;top:12px;z-index:1;font-size:8px;font-family:var(--mono);color:var(--muted);}
  .concept-label {position:absolute;right:12px;top:12px;font-size:7px;font-family:var(--mono);letter-spacing:1px;color:var(--muted);border:1px solid var(--border);padding:4px 6px;border-radius:3px;}
  .project-body {padding:22px 20px 20px;}
  .project-category {font-size:8px;font-family:var(--mono);letter-spacing:1.1px;text-transform:uppercase;color:var(--accent);margin-bottom:10px;}
  .project-title-row {display:flex;align-items:center;justify-content:space-between;gap:8px;}
  .project-title-row h3 {font-size:17px;letter-spacing:-.55px;font-weight:550;margin:0;}
  .project-title-row svg {color:var(--muted);transition:transform .3s;}
  .project-card:hover .project-title-row svg {transform:translate(3px,-3px);}
  .project-subtitle {font-size:10px;color:var(--muted);margin:9px 0 20px;}
  .tags {display:flex;flex-wrap:wrap;gap:6px;}
  .tag {font-family:var(--mono);font-size:8px;padding:5px 7px;background:var(--surface);border:1px solid var(--border);border-radius:3px;color:var(--muted);}
  .projects-footer {display:flex;align-items:center;justify-content:center;gap:17px;margin-top:30px;}
  .projects-footer button {background:transparent;color:var(--muted);border:0;font-size:10px;display:flex;gap:13px;align-items:center;padding:10px;}
  .projects-footer button:hover {color:var(--accent);}
  .projects-footer .rule {width:46px;height:1px;background:var(--surface-strong);}
  .about-section {border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--bg);}
  .about-grid {display:grid;grid-template-columns:1.06fr 1fr;gap:85px;align-items:center;}
  .about-copy h2 {font-size:36px;margin-bottom:22px;}
  .about-copy p {font-size:12px;line-height:2.2;color:var(--muted);margin:0 0 22px;}
  .about-meta {display:flex;gap:25px;font-size:9px;font-family:var(--mono);color:var(--muted);}
  .about-meta span {display:flex;gap:7px;align-items:center;}
  .terminal {border:1px solid var(--border);border-radius:7px;background:var(--bg);box-shadow:0 20px 60px var(--shadow);overflow:hidden;}
  .terminal-title {height:39px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 15px;color:var(--muted);font-family:var(--mono);font-size:8px;}
  .terminal-dots {display:flex;gap:5px;}
  .terminal-dots i {width:6px;height:6px;border-radius:50%;background:var(--surface-strong);}
  .terminal-dots i:first-child {background:var(--accent);}.terminal-dots i:nth-child(2){background:var(--action);}.terminal-dots i:last-child{background:var(--accent);}
  .terminal-body {padding:25px;font-family:var(--mono);font-size:10px;line-height:2.3;min-height:237px;}
  .terminal-body p {margin:0;color:var(--muted);}
  .terminal-body .command {color:var(--accent);margin-bottom:11px;}
  .terminal-body .ok {color:var(--accent);margin-right:10px;}
  .terminal-body .prompt {color:var(--accent);margin-top:13px;}
  .cursor {display:inline-block;width:6px;height:12px;background:var(--accent);vertical-align:middle;animation:${blink} 1s step-end infinite;}
  .terminal-run {padding:9px 14px;border:0;border-top:1px solid var(--border);width:100%;background:var(--bg);text-align:left;color:var(--muted);font-family:var(--mono);font-size:9px;display:flex;align-items:center;justify-content:space-between;}
  .terminal-run:disabled {cursor:wait;color:var(--muted);}
  .skill-grid {display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .skill-card {border-top:1px solid var(--border);padding:25px 0 0;}
  .skill-icon {font-size:24px;color:var(--accent);margin-bottom:20px;}
  .skill-card h3 {font-size:17px;font-weight:500;margin:0 0 11px;letter-spacing:-.5px;}
  .skill-card p {color:var(--muted);font-size:11px;line-height:1.8;max-width:290px;margin:0 0 22px;}
  .skill-card .tags {max-width:300px;gap:7px;}
  .contact-section {padding-top:0;padding-bottom:72px;}
  .contact-box {position:relative;overflow:hidden;border:1px solid var(--border);border-radius:7px;background:var(--surface);padding:47px 45px;display:flex;justify-content:space-between;align-items:center;gap:25px;}
  .contact-box::before {content:'';position:absolute;inset:0;background-image:linear-gradient(var(--glow) 1px,transparent 1px),linear-gradient(90deg,var(--glow) 1px,transparent 1px);background-size:32px 32px;mask-image:linear-gradient(90deg,transparent,#000);pointer-events:none;}
  .contact-box > * {position:relative;}
  .contact-box h2 {font-size:33px;margin-bottom:10px;}
  .contact-box p {font-size:11px;color:var(--muted);margin:0;line-height:1.8;}
  .contact-box .eyebrow {font-size:8px;margin-bottom:17px;}
  .contact-actions {display:flex;align-items:center;justify-content:flex-end;gap:10px;flex-wrap:wrap;}
  .footer {border-top:1px solid var(--border);padding:25px 0;}
  .footer-inner {display:flex;align-items:center;justify-content:space-between;gap:20px;}
  .footer .logo {font-size:16px;}.footer .logo svg{width:21px;height:21px;}
  .footer-note {font-family:var(--mono);font-size:8px;color:var(--muted);}
  .footer-social {display:inline-flex;align-items:center;gap:7px;font-family:var(--mono);font-size:9px;color:var(--muted);padding:8px 0;}
  .footer-social:hover {color:var(--accent);}
  .effects-button {border:0;background:transparent;color:var(--muted);font-family:var(--mono);font-size:8px;display:flex;gap:8px;align-items:center;padding:9px;}
  .effects-button .status-dot {width:4px;height:4px;}
  .effects-button[aria-pressed='false'] .status-dot {background:var(--accent);}
  .reveal {opacity:1;transform:none;}
  &[data-ready='true'] .reveal:not(.visible) {opacity:0;transform:translateY(25px);}
  .reveal.visible {animation:${rise} .7s ease both;}
  @media(min-width:1600px) {.hero-main{min-height:730px;}}
  @media(max-width:1100px) {.wrap{padding-left:36px;padding-right:36px;}h1{font-size:64px;}.visual{height:470px;}.board-float{inset:65px -15px 35px -25px;}.visual-label.right{right:-5px;top:90px;}.project-visual{height:210px;}.project-title-row h3{font-size:15px;}.about-grid{gap:45px;}.technology-group{gap:44px;}}
  @media(max-width:800px) {.nav-inner{height:73px;}.nav-links{gap:21px;}.nav-contact{display:none;}.hero-main{min-height:575px;gap:0;grid-template-columns:1.1fr 1fr;}h1{font-size:54px;letter-spacing:-3px;}.hero-copy{padding:50px 0;}.hero-description{font-size:12px;}.visual{height:400px;margin-right:-15px;}.board-float{inset:90px -35px 50px -30px;}.visual-label.right{display:none;}.visual-label.top{top:49px;font-size:7px;}.visual-label.left{display:none;}.visual-label.bottom{bottom:40px;font-size:7px;}.orbit{top:24%;}.axis{bottom:50px;left:0;}.hero-actions{gap:8px;}.primary-button,.secondary-button{padding:0 13px;gap:15px;font-size:10px;}.project-grid{grid-template-columns:repeat(2,1fr);}.project-card:nth-child(3):last-child{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;}.project-card:nth-child(3):last-child .project-visual{border-bottom:0;border-right:1px solid var(--border);}.project-card:nth-child(3):last-child .project-body{align-self:center;}.section{padding-top:64px;padding-bottom:64px;}h2{font-size:31px;}.about-grid{grid-template-columns:1fr;gap:35px;}.about-copy{max-width:570px;}.terminal{max-width:570px;}.skill-grid{gap:25px;}.skill-card h3{font-size:15px;}.contact-section{padding-top:0;}.contact-box{padding:34px 27px;}.contact-box h2{font-size:27px;}.footer-inner{flex-wrap:wrap;}.footer-note{font-size:7px;}}
  @media(max-width:560px) {.wrap{padding-left:23px;padding-right:23px;}.nav-inner{height:68px;}.logo{font-size:21px;}.menu-toggle{display:block;}.nav-links{display:none;position:absolute;top:68px;left:0;right:0;background:var(--bg);border-bottom:1px solid var(--border);flex-direction:column;align-items:stretch;padding:17px 26px;gap:4px;}.nav-links.open{display:flex;}.nav-link{padding:12px;font-size:13px;}.nav-link.active::after{left:0;bottom:18px;}.hero-main{grid-template-columns:1fr;}.hero-copy{padding:45px 0 0;}.eyebrow{font-size:8px;letter-spacing:1.4px;}h1{font-size:clamp(51px,12.8vw,68px);line-height:1.08;margin:25px 0 20px;letter-spacing:-3.7px;}.hero-description{max-width:330px;font-size:12px;}.hero-actions{gap:12px;}.primary-button,.secondary-button{min-height:44px;padding:0 17px;font-size:10px;gap:20px;}.hero-footnote{margin-top:25px;font-size:8px;}.visual{height:350px;max-width:370px;width:100%;margin:0 auto;}.board-float{inset:24px -5px 0 -5px;}.orbit{top:8%;left:10%;width:80%;}.visual-label.top{top:24px;left:2px;}.visual-label.bottom{bottom:20px;right:1px;}.visual-label.right{display:flex;top:76px;font-size:6px;right:0;}.visual-label.right strong{font-size:7px;}.visual-label.right::after{width:25px;height:18px;right:36px;top:25px;}.axis{bottom:18px;left:10px;}.hero-bottom{padding:15px 0;}.hero-bottom .mono{font-size:7px;letter-spacing:.6px;}.scroll-cue{font-size:7px;gap:8px;}.technology-group{gap:30px;padding:22px 15px;}.technology-group span{font-size:13px;}.technology-group svg{font-size:17px;}.section{padding-top:50px;padding-bottom:50px;}.section-head{display:block;margin-bottom:24px;}.section-head p{margin-top:14px;max-width:320px;}.section-label{font-size:8px;margin-bottom:15px;}h2{font-size:31px;letter-spacing:-1.5px;}.filters{gap:3px;margin-bottom:20px;}.filter{font-size:8px;padding:8px 9px;}.filter small{margin-left:5px;font-size:7px;}.filter-count{display:none;}.project-grid{grid-template-columns:1fr;gap:20px;}.project-visual{height:237px;}.project-card:nth-child(3):last-child{display:block;grid-column:auto;}.project-card:nth-child(3):last-child .project-visual{border-bottom:1px solid var(--border);border-right:0;}.project-body{padding:22px;}.project-title-row h3{font-size:18px;}.project-subtitle{font-size:11px;}.project-category{font-size:9px;}.tag{font-size:9px;}.about-copy h2{font-size:30px;}.about-copy p{font-size:12px;}.about-meta{font-size:8px;gap:16px;}.terminal-body{padding:20px;font-size:9px;min-height:221px;}.skill-grid{grid-template-columns:1fr;gap:30px;}.skill-card{position:relative;padding-left:49px;padding-top:22px;}.skill-icon{position:absolute;top:22px;left:1px;font-size:24px;}.skill-card h3{font-size:17px;}.skill-card p{font-size:11px;}.contact-section{padding-top:0;}.contact-box{display:block;padding:29px 24px;}.contact-box h2{font-size:29px;}.contact-box p{font-size:11px;max-width:250px;}.contact-box .primary-button{margin-top:25px;}.footer-inner{gap:20px;}.footer-note{order:3;flex-basis:100%;border-top:1px solid var(--border);padding-top:18px;line-height:1.8;}.effects-button{margin-left:auto;font-size:8px;}}
  @media(max-width:560px){.contact-actions{justify-content:flex-start;margin-top:25px;}.contact-box .contact-actions .primary-button{margin-top:0;}}
  .logo {font-size:19px;letter-spacing:-.8px;font-weight:600;}
  .hero h1 {margin:24px 0 16px;font-size:clamp(52px,5.05vw,73px);letter-spacing:-3.6px;line-height:1.12;font-weight:550;}
  .hero-intro {display:block;font-size:27px;letter-spacing:-.8px;color:var(--muted);margin-bottom:12px;font-family:var(--font-sans);font-style:italic;font-weight:400;}
  .hero-name {display:block;white-space:nowrap;}
  .hero-surname {display:block;font-size:clamp(20px,2.1vw,30px);letter-spacing:-.8px;font-weight:400;color:var(--muted);margin-top:13px;}
  .hero-thai-name {font-size:15px;color:var(--muted);margin:0 0 23px;line-height:1.7;}
  .hero-description {font-size:14px;line-height:2;color:var(--muted);margin-bottom:27px;}
  .handwritten {font-family:var(--font-sans);font-style:italic;font-size:18px;letter-spacing:0;color:var(--warm);transform:rotate(-4deg);}
  .footnote-arrow {font-size:30px;color:var(--muted);transform:rotate(-15deg);margin-left:10px;}
  .project-grid {grid-template-columns:1.12fr 1fr 1fr;align-items:start;}
  .project-card {perspective:900px;}
  .project-note {font-size:11px;color:var(--muted);line-height:1.8;margin:0 0 18px;padding-left:10px;border-left:1px solid var(--border);}
  .project-subtitle {margin-bottom:13px;}
  .about-signature {font-family:var(--font-sans);font-style:italic;font-size:24px!important;color:var(--warm)!important;}
  .about-signature span {display:block;font-family:var(--font-sans);font-style:normal;font-size:11px;color:var(--muted);}
  .footer .logo{font-size:16px;}
  .footer-note{letter-spacing:.2px;}
  @media(max-width:1100px){.hero h1{font-size:58px;}.hero-surname{font-size:25px;}.nav-links{gap:22px;}.logo{font-size:18px;}.project-title-row h3{line-height:1.5;}}
  @media(max-width:800px){.hero h1{font-size:45px;letter-spacing:-2.3px;}.hero-surname{font-size:22px;}.hero-thai-name{font-size:13px;}.hero-description{font-size:12px;}.nav-links{gap:17px;}.nav-link{font-size:11px;}.logo{font-size:17px;}.project-grid{grid-template-columns:repeat(2,1fr);}.handwritten{font-size:16px;}}
  @media(max-width:560px){.hero h1{font-size:clamp(39px,10.8vw,58px);letter-spacing:-2.6px;}.hero-intro{font-size:25px;margin-bottom:12px;}.hero-surname{font-size:23px;letter-spacing:-.8px;}.hero-thai-name{font-size:14px;}.hero-description{font-size:13px;}.logo{font-size:19px;}.project-grid{grid-template-columns:1fr;}.project-note{font-size:12px;}.hero .eyebrow{font-size:7px;letter-spacing:1px;}.footer .logo{font-size:16px;}.footer-note{overflow-wrap:anywhere;}}
  .achievement-note{display:flex;align-items:center;gap:11px;max-width:360px;margin:-3px 0 25px;color:var(--warm);font-size:12px;line-height:1.65;}
  .achievement-note > .anticon{font-size:23px;}
  .achievement-note small{display:block;font-family:var(--mono);font-size:7px;letter-spacing:1.3px;color:var(--warm);margin-top:2px;}
  .achievement-note > svg{margin-left:auto;}
  .primary-button{background:var(--action);color:var(--muted);border-color:var(--accent);}
  .primary-button:hover{background:var(--action);}
  .handwritten,.footnote-arrow{color:var(--warm);}
  .hero-copy{padding-top:52px;padding-bottom:45px;}
  .hero-footnote{margin-top:25px;}
  .project-title-row h3{letter-spacing:0;line-height:1.6;font-size:16px;}
  .concept-label{display:flex;gap:5px;align-items:center;}
  .award-label{border-color:var(--border);color:var(--warm);background:var(--surface);}
  .illustration-label{position:absolute;bottom:8px;right:10px;font-family:var(--mono);font-size:6px;letter-spacing:.7px;color:var(--muted);}
  .project-note{color:var(--muted);border-color:var(--border);}
  .project-photo{width:100%;height:100%;object-fit:cover;}
  .skill-grid{grid-template-columns:repeat(2,1fr);gap:36px 48px;}
  .skill-card p{max-width:450px;}
  .skill-card .tags{max-width:450px;}
  .skill-icon{color:var(--warm);}
  .experience-section{background:var(--bg);border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:65px;}
  .experience-section h2{letter-spacing:-.5px;font-size:33px;line-height:1.5;}
  .role-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;}
  .role-card{padding:24px 0;border-top:1px solid var(--border);}
  .role-number{display:flex;justify-content:space-between;color:var(--warm);font-family:var(--mono);font-size:13px;margin-bottom:26px;}
  .role-label{font-family:var(--mono);color:var(--accent);font-size:8px;letter-spacing:1px;}
  .role-card h3{font-size:18px;font-weight:500;margin:11px 0;line-height:1.6;}
  .role-card p{color:var(--muted);font-size:12px;line-height:2;margin:0;}
  .opportunity-note{display:flex;align-items:center;gap:13px;font-size:12px;color:var(--muted);border-top:1px solid var(--border);padding-top:25px;margin-top:15px;line-height:1.8;}
  .opportunity-note > svg{margin-left:auto;flex-shrink:0;color:var(--warm);}
  .contact-box h2{letter-spacing:0;font-size:30px;line-height:1.55;}
  @media(max-width:800px){.role-grid{gap:22px;}.role-card h3{font-size:15px;}.role-card p{font-size:11px;}.hero-copy{padding-top:40px;}.achievement-note{font-size:11px;}.achievement-note small{font-size:6px;}.hero-thai-name{margin-bottom:17px;}}
  @media(max-width:560px){.hero-copy{padding-top:38px;padding-bottom:0;}.hero h1{margin-top:21px;}.hero-description{font-size:12px;line-height:2;}.achievement-note{font-size:11px;max-width:300px;margin-bottom:23px;}.achievement-note small{font-size:6px;}.skill-grid{grid-template-columns:1fr;}.role-grid{grid-template-columns:1fr;gap:5px;}.role-card{padding:23px 0;}.role-number{margin-bottom:14px;}.role-card h3{font-size:18px;}.role-card p{font-size:12px;}.experience-section{margin-bottom:45px;}.experience-section h2{font-size:29px;}.opportunity-note{font-size:11px;}.contact-box h2{font-size:25px;}.project-title-row h3{font-size:18px;}.filters{gap:4px;}.filter{font-size:8px;}.hero .eyebrow{letter-spacing:.7px;font-size:7px;}}
  .nav{background:var(--nav);}
  .nav-tools{display:flex;align-items:center;gap:14px;}
  .nav-inner{gap:24px;}
  .nav-links{gap:24px;}
  .nav-contact{white-space:nowrap;}
  .hero{background:radial-gradient(ellipse at 92% 8%,color-mix(in srgb,var(--sky-one) 27%,transparent),transparent 70%),radial-gradient(ellipse at 20% 100%,color-mix(in srgb,var(--sky-two) 23%,transparent),transparent 65%);}
  .hero::before{opacity:.55;}
  .hero .visual::before{background:radial-gradient(ellipse,var(--glow),transparent 65%);}
  .hero .orbit{opacity:.32;}
  .hero .visual-label.right,.hero .visual-label.left,.hero .axis{display:flex;}
  .hero .visual-label.top{top:22px;}
  .hero .visual-label.bottom{bottom:18px;}
  .project-visual{background:radial-gradient(ellipse at 50% 38%,#263c50,#0b1623 75%);isolation:isolate;}
  .project-visual::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,#9fcfff08 0 1px,transparent 1px 28px),repeating-linear-gradient(#9fcfff08 0 1px,transparent 1px 28px);pointer-events:none;}
  .project-visual::after{content:'';display:block;position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,#b6e9ff16 50%,transparent 65%);transform:translateX(-100%);transition:transform .8s;pointer-events:none;}
  .project-card:hover .project-visual::after{transform:translateX(100%);}
  .project-card:hover .project-visual>svg{filter:drop-shadow(0 14px 10px #0008) brightness(1.14);}
  .project-number{background:#101b29d9;color:#edf4fa;padding:5px 7px;border-radius:2px;}
  .project-visual .concept-label{background:#101b29dd;color:#d7e8f3;border-color:#6a7e8e;backdrop-filter:blur(8px);}
  .project-visual .award-label{background:#3a2d1ee8;color:#ffdb9e;border-color:#b58d51;}
  .illustration-label{padding:5px 7px;background:#101b29d9;border-radius:2px;color:#f0f5fa;font-size:7px;letter-spacing:0;}
  .has-photo::before,.has-photo::after{display:none;}
  .project-photo{display:block;transition:transform .7s cubic-bezier(.22,1,.36,1);}
  .photo-real-label{font-size:9px;max-width:calc(100% - 28px);line-height:1.7;}
  .photo-focus-upper{object-position:center 36%;}.photo-focus-lower{object-position:center 76%;}.photo-focus-contain{object-fit:contain;background:var(--surface);}
  .has-photo .concept-label,.has-photo .illustration-label{z-index:2;}
  @media(hover:hover){.project-card:hover .project-photo{transform:scale(1.045);}}
  .project-card:hover .photo-focus-contain,.project-card:focus-visible .photo-focus-contain{transform:none;}
  .project-card:focus-visible .project-photo{transform:scale(1.045);}
  body[data-effects='off'] & .project-photo{transition:none;transform:none;}
  @media(prefers-reduced-motion:reduce){.project-photo{transition:none!important;transform:none!important;}}
  .primary-button,.primary-button:hover{color:var(--on-action);background:var(--action);border-color:var(--action);}
  .primary-button:hover{filter:brightness(1.05);}
  .skip-link{color:var(--bg);}
  .secondary-button{color:var(--text);background:var(--surface);}
  .filter.selected{color:var(--accent);background:var(--surface-strong);border-color:var(--border);}
  .skill-card,.role-card,.project-card,.about-section,.contact-box,.experience-section,.technology-strip,.terminal{transition:background-color .6s,color .6s,border-color .6s;}
  .theme-explanation{display:block;margin-bottom:7px;color:var(--muted);font-size:9px;letter-spacing:0;}
  .local-light{font-size:9px;letter-spacing:.8px;}
  .light-time{color:var(--text);margin-left:9px;font-variant-numeric:tabular-nums;}
  .light-phase{letter-spacing:0;}
  .contact-box{background:linear-gradient(115deg,var(--surface),color-mix(in srgb,var(--sky-two) 18%,var(--surface)));}
  @media(max-width:1100px){.nav-links{gap:16px;}.nav-tools{gap:10px;}.nav-contact{padding:10px;gap:12px;}.nav-inner{gap:18px;}}
  @media(max-width:980px){.nav-contact{display:none;}}
  @media(max-width:800px){.nav-links{gap:13px;}.nav-inner{gap:14px;}.hero .visual{margin-right:0;}}
  @media(max-width:680px) and (min-width:561px){.nav-link{font-size:10px;}.nav-links{gap:10px;}.nav-inner{gap:9px;}.logo{font-size:15px;}.logo svg{width:23px;}.wrap{padding-left:23px;padding-right:23px;}}
  @media(max-width:560px){.nav-inner{gap:6px;}.nav-tools{gap:5px;}.nav .logo{font-size:17px;gap:5px;}.nav .logo svg{width:23px;height:23px;}.menu-toggle{padding:5px;font-size:22px;}.hero .visual-label.top{top:7px;font-size:6px;}.hero .visual-label.bottom{bottom:7px;font-size:6px;}.hero .visual{height:325px;margin-top:18px;}.hero-bottom-left.mono{font-size:7px;}.light-phase{display:none;}.light-time{margin-left:5px;}.theme-explanation{font-size:8px;}}
  @media(max-width:360px){.nav .logo{font-size:15px;}.nav .logo svg{width:21px;}.nav-tools{gap:2px;}.nav-inner{gap:3px;}}
  .skill-card,.role-card{position:relative;transition:transform .3s,background .3s;}
  .skill-card:hover,.role-card:hover{transform:translateY(-5px);background:var(--surface);}
  .skill-icon{transition:transform .4s;}.skill-card:hover .skill-icon{transform:rotate(-12deg) scale(1.15);}
  .lab-rotor{transform-origin:350px 120px;}
  html[lang='th'] & h2,html[lang='zh-CN'] & h2{letter-spacing:-.5px;line-height:1.4;}
  html[lang='zh-CN'] &{font-family:'Kanit','PingFang SC','Microsoft YaHei',sans-serif;}
  @media(max-width:1100px){.nav-links{display:none;}.menu-toggle{display:block;}.nav-links.open{display:flex;position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;padding:18px 30px;background:var(--bg);border-bottom:1px solid var(--border);gap:5px;}.nav-link{padding:12px;}.nav-contact{display:none;}}
  @media(max-width:560px){.hero .visual-label.right{right:0;font-size:6px;top:90px;}.hero .visual-label.left{bottom:52px;font-size:6px;}.hero .axis{left:0;bottom:0;}.board-float{inset:10px 10px;}.nav .logo{font-size:15px;}.nav-tools{gap:5px;}.section-head{align-items:flex-start;}.assembly-bottom{line-height:1.8;}}
  @media(max-width:420px){.nav .logo>span{display:none;}.nav .logo svg{width:27px;height:27px;}.nav-tools{gap:8px;}}
  /* 60 / 30 / 10: cream canvas, sand surfaces, restrained sage/clay accents. */
  html[data-light-phase='day'] &,html[data-theme-mode='light'] &{
    .hero{background:radial-gradient(ellipse at 95% 0%,#d9dfcc40,transparent 55%),var(--bg);}
    .about-section,.experience-section{background:color-mix(in srgb,var(--surface-strong) 65%,var(--bg));}
    .technology-strip,.terminal,.skill-card:hover{background:var(--surface);}
    .project-visual{background:radial-gradient(ellipse at 50% 35%,#d4cec1,#b6b5a8);}
    .project-card{background:var(--surface);}
    .contact-box{background:linear-gradient(110deg,var(--surface-strong),var(--surface));}
    .status-dot{background:#788b75;}.primary-button{background:var(--action);}
  }
  /* Creative direction: an engineering field journal with bold editorial rhythm. */
  position:relative;isolation:isolate;
  &::before{content:'';position:fixed;inset:0;z-index:1000;pointer-events:none;opacity:.18;mix-blend-mode:soft-light;background-image:radial-gradient(circle at 20% 30%,#fff 0 .45px,transparent .7px),radial-gradient(circle at 70% 60%,#fff 0 .35px,transparent .65px);background-size:11px 13px,17px 19px;}
  .wrap{max-width:1420px;padding-left:clamp(28px,5vw,76px);padding-right:clamp(28px,5vw,76px);}
  .nav{top:0;border:0;background:transparent;padding:13px 0;backdrop-filter:none;}
  .nav-inner{height:62px;padding-top:0;padding-bottom:0;padding-left:24px;padding-right:10px;border:1px solid color-mix(in srgb,var(--border) 82%,transparent);border-radius:999px;background:color-mix(in srgb,var(--nav) 93%,transparent);box-shadow:0 15px 45px var(--shadow);backdrop-filter:blur(22px) saturate(1.2);}
  .logo{font-size:18px;font-weight:500;letter-spacing:-.35px;}
  .logo svg{width:32px;height:32px;padding:7px;color:var(--bg);background:var(--accent);border-radius:50%;transform:rotate(-8deg);transition:transform .35s cubic-bezier(.2,.8,.2,1);}
  .logo:hover svg{transform:rotate(0deg) scale(1.08);}
  .nav-link{font-size:11px;font-weight:400;letter-spacing:.25px;}
  .nav-link.active::after{width:18px;height:2px;border-radius:0;left:50%;transform:translateX(-50%);}
  .nav-contact{border:0;border-radius:999px;background:var(--action);color:var(--on-action);padding:11px 17px;font-weight:500;}
  .nav-contact:hover{background:var(--action);filter:brightness(1.06);}
  .hero{min-height:760px;overflow:hidden;}
  .hero::before{opacity:.8;background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(ellipse at 76% 45%,#000 5%,transparent 72%);}
  .hero::after{content:'BUILD\A TEST\A ITERATE';white-space:pre;position:absolute;right:-.035em;top:18%;z-index:0;text-align:right;font-size:clamp(90px,12vw,190px);font-weight:900;line-height:.72;letter-spacing:-.085em;color:var(--text);opacity:.025;pointer-events:none;}
  .hero-main{min-height:690px;grid-template-columns:.9fr 1.1fr;gap:clamp(20px,4vw,68px);}
  .hero-copy{padding:82px 0 58px;padding-left:28px;}
  .hero-copy::before{content:'';position:absolute;left:0;top:86px;width:1px;height:150px;background:linear-gradient(var(--accent),transparent);}
  .hero-copy::after{content:'01';position:absolute;left:-9px;top:60px;color:var(--accent);font:8px var(--mono);letter-spacing:1px;transform:rotate(-90deg);}
  .hero .eyebrow{display:inline-flex;border:1px solid var(--border);border-radius:999px;padding:8px 12px;background:var(--surface);font-size:8px;letter-spacing:1.35px;}
  .hero h1{margin:27px 0 13px;font-size:clamp(64px,6.5vw,98px);font-weight:650;line-height:.86;letter-spacing:-.055em;}
  .hero-intro{font-family:var(--font-sans);font-style:normal;text-transform:uppercase;font-size:clamp(13px,1.25vw,18px);font-weight:300;letter-spacing:.18em;margin-bottom:21px;color:var(--muted);}
  .hero-name{position:relative;z-index:1;text-transform:uppercase;}
  .hero-name::after{content:'';position:absolute;left:.05em;right:.04em;bottom:.05em;height:.11em;z-index:-1;background:var(--warm);opacity:.68;transform:skewX(-18deg) rotate(-1deg);}
  .hero-surname{font-family:var(--font-sans);font-size:clamp(24px,2.8vw,40px);font-weight:500;line-height:1.1;letter-spacing:.025em;text-transform:uppercase;color:transparent;-webkit-text-stroke:1px color-mix(in srgb,var(--text) 48%,transparent);margin-top:19px;}
  .hero-thai-name{display:inline-block;margin:7px 0 22px;padding:4px 10px 5px;color:var(--bg);background:var(--accent);font-size:13px;font-weight:500;transform:rotate(-1deg);}
  .hero-description{font-size:15px;line-height:1.82;max-width:460px;}
  .achievement-note{width:max-content;max-width:100%;padding:11px 16px 10px;margin:0 0 26px;background:color-mix(in srgb,var(--warm) 14%,var(--surface));border:1px dashed var(--warm);transform:rotate(-1.4deg);}
  .achievement-note:hover{transform:rotate(0deg) translateY(-2px);}
  .primary-button,.secondary-button{position:relative;min-height:48px;border-radius:0;padding:0 22px;font-size:12px;font-weight:500;letter-spacing:.1px;box-shadow:5px 5px 0 color-mix(in srgb,var(--border) 65%,transparent);}
  .primary-button:hover,.secondary-button:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 color-mix(in srgb,var(--border) 65%,transparent);}
  .handwritten{font-family:var(--font-sans);font-style:italic;font-weight:300;letter-spacing:.01em;}
  .visual{height:560px;margin-right:-15px;background:radial-gradient(circle at 55% 48%,color-mix(in srgb,var(--sky-one) 23%,transparent),transparent 51%);clip-path:polygon(9% 0,100% 0,100% 88%,89% 100%,0 100%,0 10%);}
  .visual::after{content:'';position:absolute;inset:22px;border:1px solid var(--border);clip-path:polygon(8% 0,100% 0,100% 87%,88% 100%,0 100%,0 10%);pointer-events:none;}
  .orbit{border-style:solid;opacity:.45;}
  .orbit::before{border-style:dashed;}
  .technology-strip{position:relative;z-index:2;background:var(--action);border:0;color:var(--on-action);transform:rotate(-.65deg) scale(1.01);box-shadow:0 14px 35px var(--shadow);}
  .technology-group{padding:21px 28px;gap:54px;}
  .technology-group span,.technology-group svg,.technology-group .tech-divider{color:var(--on-action);}
  .technology-group span{font-size:15px;font-weight:500;}
  .section{padding-top:110px;padding-bottom:110px;}
  .section-label{width:max-content;padding:6px 9px;border:1px solid var(--border);background:var(--surface);font-size:8px;letter-spacing:1.2px;transform:rotate(-1deg);}
  .section-label .line{width:14px;}
  .section-head{margin-bottom:43px;}
  h2{font-size:clamp(42px,4.3vw,62px);font-weight:600;line-height:1.03;letter-spacing:-.045em;}
  h2 .muted{font-weight:300;font-style:italic;}
  .section-head p{font-size:13px;max-width:330px;}
  #projects{position:relative;}
  #projects::before{content:'01';position:absolute;right:5vw;top:40px;font-size:clamp(90px,12vw,170px);font-weight:800;line-height:1;color:transparent;-webkit-text-stroke:1px var(--border);opacity:.55;pointer-events:none;}
  .filters{position:relative;padding:8px;border:1px solid var(--border);background:var(--surface);gap:3px;}
  .filter{border-radius:0;padding:10px 14px;}
  .filter.selected{background:var(--accent);color:var(--bg);border-color:var(--accent);}
  .filter.selected small{color:inherit;}
  .notebook-feature{position:relative;border-style:dashed;border-radius:0;padding:20px 24px;margin-bottom:31px;background:color-mix(in srgb,var(--accent) 6%,var(--surface));overflow:hidden;}
  .notebook-feature::before{content:'OPEN FILE';position:absolute;right:64px;top:-1px;padding:4px 11px;color:var(--bg);background:var(--accent);font:7px var(--mono);letter-spacing:1.2px;}
  .project-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:24px;align-items:start;}
  .project-card{grid-column:span 4;border-radius:0 24px 0 0;background:var(--surface);box-shadow:8px 8px 0 color-mix(in srgb,var(--border) 45%,transparent);overflow:hidden;}
  .project-card:nth-child(6n+1){grid-column:span 5;}
  .project-card:nth-child(6n+2){grid-column:span 4;margin-top:48px;}
  .project-card:nth-child(6n+3){grid-column:span 3;margin-top:104px;}
  .project-card:nth-child(6n+4){grid-column:span 3;}
  .project-card:nth-child(6n+5){grid-column:span 4;margin-top:38px;}
  .project-card:nth-child(6n+6){grid-column:span 5;margin-top:82px;}
  .project-card:hover{transform:translate(-3px,-8px) rotate(-.35deg);border-color:var(--accent);box-shadow:13px 17px 0 color-mix(in srgb,var(--accent) 18%,transparent);}
  .project-card:nth-child(even):hover{transform:translate(3px,-8px) rotate(.35deg);}
  .project-card:nth-child(6n+1) .project-visual,.project-card:nth-child(6n+6) .project-visual{height:300px;}
  .project-card:nth-child(6n+3) .project-visual,.project-card:nth-child(6n+4) .project-visual{height:205px;}
  .project-number{left:0;top:0;padding:8px 11px;border-radius:0;background:var(--accent);color:var(--bg);font-size:8px;}
  .project-body{padding:25px 23px 24px;}
  .project-title-row h3{font-size:20px;font-weight:500;line-height:1.35;}
  .project-category{font-size:8px;letter-spacing:1.35px;}
  .tag{border-radius:999px;padding:5px 9px;background:transparent;}
  .about-section{position:relative;overflow:hidden;background:linear-gradient(115deg,var(--surface) 0 58%,var(--bg) 58%);}
  .about-section::after{content:'02';position:absolute;left:-.04em;bottom:-.22em;font-size:240px;font-weight:900;color:var(--text);opacity:.025;pointer-events:none;}
  .about-grid{grid-template-columns:.9fr 1.1fr;gap:clamp(50px,8vw,130px);}
  .about-copy{position:relative;padding-left:28px;}
  .about-copy::before{content:'';position:absolute;left:0;top:0;bottom:0;border-left:1px dashed var(--border);}
  .about-copy p{font-size:14px;line-height:2;}
  .about-signature{font-family:var(--font-sans);font-weight:500;font-style:italic;transform:rotate(-2deg);}
  .terminal{border-radius:0 34px 0 0;transform:rotate(1.2deg);box-shadow:16px 18px 0 var(--shadow);}
  .terminal:hover{transform:rotate(0deg);}
  .skill-grid{counter-reset:skill;grid-template-columns:repeat(2,1fr);gap:24px;}
  .skill-card{counter-increment:skill;min-height:260px;padding:34px 34px 30px;border:1px solid var(--border);background:var(--surface);overflow:hidden;}
  .skill-card:nth-child(2),.skill-card:nth-child(4){transform:translateY(38px);}
  .skill-card::after{content:'0' counter(skill);position:absolute;right:15px;top:-22px;font-size:100px;font-weight:800;color:var(--text);opacity:.035;}
  .skill-card:hover{transform:translateY(-6px) rotate(-.4deg);border-color:var(--accent);}
  .skill-card:nth-child(2):hover,.skill-card:nth-child(4):hover{transform:translateY(31px) rotate(.4deg);}
  .skill-icon{display:grid;place-items:center;width:48px;height:48px;border:1px solid var(--warm);border-radius:50%;font-size:21px;}
  .skill-card h3{font-size:21px;}
  .experience-section{position:relative;overflow:hidden;background:var(--surface);}
  .experience-section::before{content:'04 / FIELD NOTES';position:absolute;right:-40px;top:50%;font:clamp(50px,8vw,118px) var(--mono);letter-spacing:-.08em;color:var(--text);opacity:.018;transform:rotate(90deg) translateX(50%);transform-origin:right center;}
  .role-grid{gap:0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
  .role-card{min-height:260px;padding:32px 28px;border-top:0;border-right:1px solid var(--border);}
  .role-card:last-child{border-right:0;}
  .role-card:hover{background:var(--bg);transform:translateY(-8px);}
  .role-number{font-size:18px;}
  .contact-box{min-height:260px;padding:55px 58px;border-radius:44px 0 44px 0;border-color:var(--action);background:var(--action);color:var(--on-action);box-shadow:16px 16px 0 color-mix(in srgb,var(--border) 60%,transparent);}
  .contact-box::before{background-image:radial-gradient(color-mix(in srgb,var(--on-action) 22%,transparent) 1px,transparent 1px);background-size:18px 18px;mask-image:linear-gradient(90deg,transparent,#000);}
  .contact-box .eyebrow,.contact-box h2,.contact-box h2 .green,.contact-box p{color:var(--on-action);}
  .contact-box .status-dot{background:var(--on-action);}
  .contact-box .primary-button{background:var(--on-action);color:var(--action);border-color:var(--on-action);}
  .contact-box .secondary-button{background:transparent;color:var(--on-action);border-color:color-mix(in srgb,var(--on-action) 45%,transparent);}
  .footer{padding:37px 0;border-top:0;}
  /* Ant Design's 24-column grid is the layout source of truth. */
  .hero-main.ant-row,.project-grid.ant-row,.about-grid.ant-row,.skill-grid.ant-row,.role-grid.ant-row{display:flex;gap:0;}
  .hero-copy-col,.hero-visual-col{position:relative;}
  .project-grid.ant-row{counter-reset:project;align-items:flex-start;}
  .project-col{counter-increment:project;}
  .project-col .project-card{display:block;grid-column:auto;width:100%;height:100%;margin-top:0;}
  .project-col .project-visual{height:250px;}
  .project-col:nth-child(6n+1) .project-visual,.project-col:nth-child(6n+6) .project-visual{height:300px;}
  .project-col:nth-child(6n+3) .project-visual,.project-col:nth-child(6n+4) .project-visual{height:205px;}
  .skill-grid.ant-row{counter-reset:skill;}
  .skill-grid>.ant-col{display:flex;}
  .skill-grid .skill-card{width:100%;height:100%;transform:none;}
  .skill-grid>.ant-col:nth-child(2) .skill-card,.skill-grid>.ant-col:nth-child(4) .skill-card{transform:translateY(38px);}
  .skill-grid>.ant-col:nth-child(2) .skill-card:hover,.skill-grid>.ant-col:nth-child(4) .skill-card:hover{transform:translateY(31px) rotate(.4deg);}
  .role-grid>.ant-col{display:flex;}
  .role-grid .role-card{width:100%;height:100%;border-right:1px solid var(--border);}
  .role-grid>.ant-col:last-child .role-card{border-right:0;}
  /* Sci-fi HUD layer: bright edges and readable depth instead of dark, sunken panels. */
  .nav-inner{border-radius:5px;border-color:color-mix(in srgb,var(--accent) 48%,var(--border));box-shadow:0 0 0 1px color-mix(in srgb,var(--accent) 6%,transparent),0 18px 50px var(--shadow);}
  .nav-inner::before,.nav-inner::after{content:'';position:absolute;width:12px;height:12px;pointer-events:none;}
  .nav-inner::before{left:-1px;top:-1px;border-left:2px solid var(--accent);border-top:2px solid var(--accent);}
  .nav-inner::after{right:-1px;bottom:-1px;border-right:2px solid var(--accent);border-bottom:2px solid var(--accent);}
  .hero{box-shadow:inset 0 -80px 100px -100px var(--accent);}
  .hero::before{background-image:linear-gradient(color-mix(in srgb,var(--accent) 12%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--accent) 12%,transparent) 1px,transparent 1px),radial-gradient(circle at 78% 45%,color-mix(in srgb,var(--accent) 10%,transparent) 0 1px,transparent 1.5px);background-size:44px 44px,44px 44px,9px 9px;}
  .visual{overflow:hidden;border:1px solid color-mix(in srgb,var(--accent) 48%,var(--border));box-shadow:inset 0 0 70px color-mix(in srgb,var(--accent) 7%,transparent),0 24px 80px var(--shadow);}
  .visual::after{background:linear-gradient(180deg,transparent 0 46%,color-mix(in srgb,var(--accent) 22%,transparent) 49%,color-mix(in srgb,var(--accent) 65%,transparent) 50%,color-mix(in srgb,var(--accent) 22%,transparent) 51%,transparent 54%);background-size:100% 180%;animation:${beam} 7s linear infinite;}
  .visual-label{padding:4px 7px;background:color-mix(in srgb,var(--bg) 74%,transparent);border-left:1px solid var(--accent);backdrop-filter:blur(7px);}
  .technology-strip{transform:none;background:color-mix(in srgb,var(--surface-strong) 88%,var(--bg));border-top:1px solid var(--accent);border-bottom:1px solid color-mix(in srgb,var(--accent) 48%,var(--border));box-shadow:0 0 30px color-mix(in srgb,var(--accent) 10%,transparent);}
  .technology-group span,.technology-group svg{color:var(--accent);}.technology-group .tech-divider{color:var(--warm);}
  .section-label{border-color:color-mix(in srgb,var(--accent) 55%,var(--border));box-shadow:inset 12px 0 22px color-mix(in srgb,var(--accent) 8%,transparent),0 0 18px color-mix(in srgb,var(--accent) 7%,transparent);}
  .section-label .line{box-shadow:0 0 9px var(--accent);animation:${hudPulse} 2.7s ease-in-out infinite;}
  .project-card{position:relative;border-radius:0;clip-path:polygon(0 0,calc(100% - 25px) 0,100% 25px,100% 100%,0 100%);background:linear-gradient(150deg,color-mix(in srgb,var(--surface-strong) 48%,var(--surface)),var(--surface) 52%);box-shadow:none;}
  .project-card::before{content:'';position:absolute;z-index:4;right:0;top:24px;width:1px;height:46px;background:var(--accent);box-shadow:0 0 12px var(--accent);pointer-events:none;}
  .project-card:hover{box-shadow:none;filter:drop-shadow(0 15px 20px var(--shadow));}
  .project-visual{border-bottom-color:color-mix(in srgb,var(--accent) 35%,var(--border));}
  .project-body::before{content:'SYS / PROJECT NODE';display:block;margin:-4px 0 15px;color:var(--muted);font:6px var(--mono);letter-spacing:1.4px;}
  .terminal{border-color:color-mix(in srgb,var(--accent) 50%,var(--border));background:linear-gradient(145deg,var(--bg),color-mix(in srgb,var(--accent) 5%,var(--bg)));box-shadow:14px 17px 0 var(--shadow),0 0 34px color-mix(in srgb,var(--accent) 8%,transparent);}
  .terminal-title{border-bottom-color:color-mix(in srgb,var(--accent) 42%,var(--border));}
  .skill-card{clip-path:polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,0 100%);background:linear-gradient(145deg,color-mix(in srgb,var(--accent) 5%,var(--surface)),var(--surface));border-color:color-mix(in srgb,var(--accent) 30%,var(--border));}
  .role-card{background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 4%,var(--surface)),transparent);}
  .contact-box{border-radius:0;clip-path:polygon(0 0,calc(100% - 38px) 0,100% 38px,100% 100%,38px 100%,0 calc(100% - 38px));border-color:var(--accent);background:linear-gradient(115deg,color-mix(in srgb,var(--accent) 15%,var(--surface)),var(--surface) 62%,color-mix(in srgb,var(--sky-two) 24%,var(--surface)));color:var(--text);box-shadow:none;}
  .contact-box .eyebrow,.contact-box h2,.contact-box h2 .green,.contact-box p{color:var(--text);}
  .contact-box .status-dot{background:var(--accent);}.contact-box .primary-button{background:var(--action);color:var(--on-action);border-color:var(--action);}.contact-box .secondary-button{background:var(--bg);color:var(--text);border-color:var(--border);}
  html[data-color-scheme='dark'] & .project-card,html[data-color-scheme='dark'] & .skill-card{box-shadow:inset 0 0 35px color-mix(in srgb,var(--accent) 4%,transparent);}
  @media(min-width:1200px){.project-col:nth-child(6n+2){padding-top:48px}.project-col:nth-child(6n+3){padding-top:104px}.project-col:nth-child(6n+5){padding-top:38px}.project-col:nth-child(6n+6){padding-top:82px}}
  @media(max-width:1100px){
    .hero-main{grid-template-columns:1fr 1fr;}.hero h1{font-size:67px;}.hero-copy{padding-left:22px;}.visual{height:500px;}
    .project-grid{grid-template-columns:repeat(2,minmax(0,1fr));}.project-card,.project-card:nth-child(n){grid-column:span 1;margin-top:0;}.project-card:nth-child(even){margin-top:42px;}.project-card:nth-child(n) .project-visual{height:250px;}
  }
  @media(max-width:800px){
    .nav{padding:8px 0}.nav-inner{height:58px}.hero{min-height:680px}.hero-main{min-height:610px}.hero h1{font-size:52px}.hero-description{font-size:13px}.visual{height:430px}.section{padding-top:82px;padding-bottom:82px}.about-section{background:var(--surface)}.skill-card{padding:28px}.contact-box{padding:43px 37px}.project-col:nth-child(even){padding-top:32px}.skill-grid>.ant-col:nth-child(2) .skill-card,.skill-grid>.ant-col:nth-child(4) .skill-card{transform:none}.role-grid .role-card{border-right:0;border-bottom:1px solid var(--border)}.role-grid>.ant-col:last-child .role-card{border-bottom:0}
  }
  @media(max-width:560px){
    &::before{display:none}.wrap{padding-left:20px;padding-right:20px}.nav{padding:7px 0}.nav-inner{height:56px;padding-left:15px;padding-right:8px;border-radius:4px}.nav-links.open{top:calc(100% + 4px);border:1px solid var(--border);margin:0 20px;padding:12px;background:var(--nav);border-radius:4px}.logo svg{width:30px;height:30px}.hero{min-height:0}.hero::after{top:27%;font-size:88px}.hero-main{min-height:0}.hero-copy{padding:54px 0 0 18px}.hero-copy::before{top:58px}.hero-copy::after{top:35px}.hero h1{font-size:clamp(42px,12.3vw,55px);letter-spacing:-.055em}.hero-intro{font-size:12px;margin-bottom:17px}.hero-surname{font-size:23px;margin-top:15px}.hero-description{font-size:13px;line-height:1.8}.hero-actions{align-items:stretch;flex-direction:column;max-width:280px}.primary-button,.secondary-button{width:100%}.visual{height:365px;margin:20px -8px 0;width:calc(100% + 16px)}.technology-strip{transform:none}.section{padding-top:72px;padding-bottom:72px}#projects::before{top:20px;font-size:100px}.section-head p{font-size:12px}.project-col{padding-top:0!important}.project-col .project-visual{height:245px}.project-card{border-radius:0}.about-copy{padding-left:20px}.terminal{transform:none}.skill-grid .skill-card{min-height:0;transform:none}.skill-grid .skill-card:hover{transform:translateY(-4px)}.role-card{min-height:0}.contact-box{padding:37px 25px;border-radius:0;box-shadow:none}
  }
  @media(prefers-reduced-motion:reduce) {&[data-ready='true'] .reveal:not(.visible){opacity:1;transform:none;}}
  body[data-effects='off'] &[data-ready='true'] .reveal:not(.visible){opacity:1;transform:none;}
`;

export const ModalContent = styled.div`
  color:var(--muted);font-size:13px;line-height:1.9;
  .modal-visual {height:245px;background:radial-gradient(ellipse,var(--glow),transparent);margin:15px 0;border:1px solid var(--border);border-radius:6px;overflow:hidden;}
  .modal-visual svg{max-height:100%;}
  .modal-visual .project-photo{width:100%;height:100%;object-fit:contain;}
  .modal-kicker{font-family:var(--mono);font-size:10px;color:var(--accent);margin:20px 0 8px;}
  h3{font-size:20px;color:var(--text);font-weight:500;margin:0;}
  ul{padding-left:20px;}
  .notice{font-size:11px;padding:12px 15px;background:var(--surface);border:1px solid var(--border);border-radius:5px;color:var(--muted);}
  .modal-tags{display:flex;gap:7px;flex-wrap:wrap;margin:18px 0;}
  .modal-tag{font-size:10px;border:1px solid var(--border);padding:3px 8px;border-radius:3px;}
  .contact-form{margin-top:24px;}
  .ant-input,.ant-input-affix-wrapper{background:var(--bg);border-color:var(--border);}
  .ant-btn-primary{color:var(--on-action);font-weight:600;}
  .form-footnote{font-size:11px;color:var(--muted);}
  .draft-result {white-space:pre-wrap;background:var(--bg);padding:16px;border:1px solid var(--border);border-radius:4px;font-family:inherit;font-size:12px;}
`;
