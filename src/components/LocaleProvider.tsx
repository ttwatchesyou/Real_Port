'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { messages } from '@/i18n/messages';
export type Locale = 'th' | 'en' | 'zh';
const LocaleContext = createContext<{locale: Locale; setLocale: (locale: Locale) => void; t: (text: string) => string}>({locale:'th',setLocale:()=>{},t:text=>text});
export function LocaleProvider({children}:{children:React.ReactNode}) {
  const pathname=usePathname();
  const [locale,setLanguage]=useState<Locale>('th');
  useEffect(()=>{try{const saved=localStorage.getItem('theetawatch-language');if(saved==='th'||saved==='en'||saved==='zh')setLanguage(saved);}catch{}},[]);
  useEffect(()=>{document.documentElement.lang=locale==='zh'?'zh-CN':locale;document.title=pathname==='/pid-lab'?'PID Lab — Theetawatch':pathname?.startsWith('/work')?`Theetawatch — ${locale==='th'?'สมุดผลงาน':locale==='zh'?'项目笔记':'Project notebook'}`:`Theetawatch — ${locale==='th'?'ผลงานและการทดลอง':locale==='zh'?'作品与实验':'Projects & experiments'}`;},[locale,pathname]);
  const setLocale=(value:Locale)=>{setLanguage(value);try{localStorage.setItem('theetawatch-language',value);}catch{}};
  const t=(text:string)=>messages[text]?.[locale] ?? text;
  return <LocaleContext.Provider value={{locale,setLocale,t}}>{children}</LocaleContext.Provider>;
}
export const useLocale=()=>useContext(LocaleContext);
const Language = styled.label`
  display:flex;align-items:center;border:1px solid var(--border);border-radius:6px;background:var(--surface);color:var(--text);
  select{appearance:none;background:transparent;color:inherit;border:0;padding:10px 18px 10px 9px;font:11px var(--mono);cursor:pointer;width:68px;}
  option{background:var(--surface);color:var(--text);}
  &::after{content:'⌄';margin-left:-14px;pointer-events:none;font-size:10px;}
  @media(max-width:560px){select{width:52px;padding:9px 11px 9px 5px;font-size:10px;}}
`;
export function LanguageSwitcher(){const {locale,setLocale,t}=useLocale();return <Language><select aria-label={t('Language')} value={locale} onChange={e=>setLocale(e.target.value as Locale)}><option value="th">ไทย</option><option value="zh">中文</option><option value="en">EN</option></select></Language>;}
