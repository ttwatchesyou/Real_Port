'use client';
import styled, { createGlobalStyle } from 'styled-components';
export const GlobalStyle=createGlobalStyle`
  :root{--font-sans:Inter,'IBM Plex Sans Thai','Noto Sans SC',Arial,sans-serif;--mono:'SFMono-Regular',Consolas,monospace;}
  *{box-sizing:border-box;}html{scroll-behavior:smooth;scroll-padding-top:100px;}body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-sans);font-weight:400;-webkit-font-smoothing:antialiased;}
  a{color:inherit;text-decoration:none;}button,input,textarea,select{font:inherit;}button{cursor:pointer;}button,a,input,textarea{-webkit-tap-highlight-color:transparent;}button:focus-visible,a:focus-visible,select:focus-visible,[tabindex='0']:focus-visible{outline:2px solid var(--accent);outline-offset:5px;}
  ::selection{background:var(--text);color:var(--bg);}img{max-width:100%;}h1,h2,h3,p{overflow-wrap:break-word;}h1,h2,h3{text-wrap:balance;}p{text-wrap:pretty;}
  .ant-modal .ant-modal-content{border:1px solid var(--border);padding:28px;border-radius:0;}.ant-modal .ant-modal-title{font-family:var(--font-sans);font-size:21px;font-weight:500;padding-right:26px;}.ant-modal .ant-modal-close{color:var(--muted);}.ant-form-item-label label{color:var(--text)!important;}
  body[data-effects='off'] *,body[data-effects='off'] *::before,body[data-effects='off'] *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important;}html:has(body[data-effects='off']){scroll-behavior:auto;}
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto;}*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important;}}
`;
export const ModalContent=styled.div`
 color:var(--text);p,li{font-size:15px;line-height:1.95;}p{color:var(--muted);}strong{font-weight:500;color:var(--text);}ul{padding-left:20px;}li{padding-block:5px;}.build-photo-heading{margin-top:28px;}
`;
