'use client';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const float = keyframes`0%,100% {transform:translateY(0) rotateX(39deg) rotateZ(-28deg);} 50% {transform:translateY(-18px) rotateX(43deg) rotateZ(-24deg);}`;
const orbit = keyframes`to {transform:rotate(360deg);}`;
const pulse = keyframes`0%,100% {box-shadow:0 0 0 0 var(--shadow);} 50% {box-shadow:0 0 0 6px var(--shadow);}`;
const scan = keyframes`0% {transform:translateY(-100%);opacity:0;} 20%,80% {opacity:.5;} 100% {transform:translateY(400px);opacity:0;}`;
const rise = keyframes`from {opacity:0; transform:translateY(22px);} to {opacity:1; transform:translateY(0);}`;
const blink = keyframes`50% {opacity:0;}`;
const marquee = keyframes`to {transform:translateX(-50%);}`;

export const GlobalStyle = createGlobalStyle`
  @font-face {font-family:'Manrope';src:url('/fonts/manrope.ttf') format('truetype');font-weight:200 800;font-display:swap;}
  :root {--bg:#0b1018;--panel:#12171d;--text:#edf0f2;--muted:#92979b;--accent:#76d9ed;--border:#2b2e33;--mono:'SFMono-Regular',Consolas,'Liberation Mono',monospace;}
  * {box-sizing:border-box;}
  html {scroll-behavior:smooth;scroll-padding-top:96px;}
  body {margin:0;background:var(--bg);color:var(--text);font-family:'Manrope',Arial,sans-serif;-webkit-font-smoothing:antialiased;}
  a {color:inherit;text-decoration:none;}
  button,input,textarea {font:inherit;}
  button,a,input,textarea { -webkit-tap-highlight-color:transparent; }
  button {cursor:pointer;}
  button:focus-visible,a:focus-visible {outline:2px solid var(--accent);outline-offset:5px;}
  ::selection {background:var(--accent);color:var(--bg);}
  ::-webkit-scrollbar {width:6px;}
  ::-webkit-scrollbar-thumb {background:var(--surface-strong);border-radius:6px;}
  .ant-modal .ant-modal-content {border:1px solid var(--border);padding:28px;}
  .ant-modal .ant-modal-title {font-family:'Manrope',Arial,sans-serif;font-size:22px;}
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
  .footer {border-top:1px solid var(--border);padding:25px 0;}
  .footer-inner {display:flex;align-items:center;justify-content:space-between;gap:20px;}
  .footer .logo {font-size:16px;}.footer .logo svg{width:21px;height:21px;}
  .footer-note {font-family:var(--mono);font-size:8px;color:var(--muted);}
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
  .logo {font-size:19px;letter-spacing:-.8px;font-weight:600;}
  .hero h1 {margin:24px 0 16px;font-size:clamp(52px,5.05vw,73px);letter-spacing:-3.6px;line-height:1.12;font-weight:550;}
  .hero-intro {display:block;font-size:27px;letter-spacing:-.8px;color:var(--muted);margin-bottom:12px;font-family:Georgia,serif;font-style:italic;font-weight:400;}
  .hero-name {display:block;white-space:nowrap;}
  .hero-surname {display:block;font-size:clamp(20px,2.1vw,30px);letter-spacing:-.8px;font-weight:400;color:var(--muted);margin-top:13px;}
  .hero-thai-name {font-size:15px;color:var(--muted);margin:0 0 23px;line-height:1.7;}
  .hero-description {font-size:14px;line-height:2;color:var(--muted);margin-bottom:27px;}
  .handwritten {font-family:Georgia,serif;font-style:italic;font-size:18px;letter-spacing:0;color:var(--warm);transform:rotate(-4deg);}
  .footnote-arrow {font-size:30px;color:var(--muted);transform:rotate(-15deg);margin-left:10px;}
  .project-grid {grid-template-columns:1.12fr 1fr 1fr;align-items:start;}
  .project-card {perspective:900px;}
  .project-note {font-size:11px;color:var(--muted);line-height:1.8;margin:0 0 18px;padding-left:10px;border-left:1px solid var(--border);}
  .project-subtitle {margin-bottom:13px;}
  .about-signature {font-family:Georgia,serif;font-style:italic;font-size:24px!important;color:var(--warm)!important;}
  .about-signature span {display:block;font-family:'Manrope',Arial,sans-serif;font-style:normal;font-size:11px;color:var(--muted);}
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
  html[lang='zh-CN'] &{font-family:'Manrope','PingFang SC','Microsoft YaHei',sans-serif;}
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
