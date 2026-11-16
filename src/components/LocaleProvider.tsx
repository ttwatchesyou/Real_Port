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
  useEffect(()=>{document.documentElement.lang=locale==='zh'?'zh-CN':locale;},[locale,pathname]);
  const setLocale=(value:Locale)=>{setLanguage(value);try{localStorage.setItem('theetawatch-language',value);}catch{}};
  const t=(text:string)=>messages[text]?.[locale] ?? text;
  return <LocaleContext.Provider value={{locale,setLocale,t}}>{children}</LocaleContext.Provider>;
}
export const useLocale=()=>useContext(LocaleContext);
const Language = styled.label`
  display:flex;align-items:center;color:var(--text);
  select{background:var(--bg);color:inherit;border:0;border-bottom:1px solid var(--border);border-radius:0;padding:10px 4px;min-height:44px;font-family:var(--font-sans);font-size:12px;cursor:pointer;width:65px;}
  option{background:var(--bg);color:var(--text);}
`;
export function LanguageSwitcher(){const {locale,setLocale,t}=useLocale();return <Language><select aria-label={t('Language')} value={locale} onChange={e=>setLocale(e.target.value as Locale)}><option value="th">ไทย</option><option value="zh">中文</option><option value="en">EN</option></select></Language>;}
