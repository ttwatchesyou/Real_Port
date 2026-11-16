'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import type { AppearanceMode, AppearancePalette } from '@/lib/appearance';
const colors=(dark:boolean):AppearancePalette=>({bg:dark?'#191a18':'#f7f7f2',surface:dark?'#22231f':'#ffffff',surfaceStrong:dark?'#30312c':'#eaeae3',text:dark?'#f0f0e8':'#252622',muted:dark?'#b0b1a7':'#686960',accent:dark?'#e9a17b':'#a34a26',warm:dark?'#e9a17b':'#a34a26',border:dark?'#3b3c35':'#d8d9d0',nav:dark?'#191a18':'#f7f7f2',action:dark?'#f0f0e8':'#252622',onAction:dark?'#191a18':'#f7f7f2',grid:'transparent',glow:'transparent',shadow:'transparent',skyOne:'transparent',skyTwo:'transparent',isDark:dark,phase:dark?'night':'day',phaseLabel:dark?'มืด':'สว่าง'});
const AppearanceContext=createContext({mode:'light' as AppearanceMode,palette:colors(false),time:'',setMode:(_:AppearanceMode)=>{}});
const Variables=createGlobalStyle<{$palette:AppearancePalette}>`
 html:root{--bg:${p=>p.$palette.bg};--surface:${p=>p.$palette.surface};--panel:${p=>p.$palette.surface};--surface-strong:${p=>p.$palette.surfaceStrong};--text:${p=>p.$palette.text};--muted:${p=>p.$palette.muted};--accent:${p=>p.$palette.accent};--warm:${p=>p.$palette.warm};--border:${p=>p.$palette.border};--nav:${p=>p.$palette.nav};--action:${p=>p.$palette.action};--on-action:${p=>p.$palette.onAction};--shadow:transparent;--glow:transparent;--grid:transparent;color-scheme:${p=>p.$palette.isDark?'dark':'light'};}
`;
export function AppearanceProvider({children}:{children:React.ReactNode}){
 const [mode,setModeState]=useState<AppearanceMode>('light'),[systemDark,setSystemDark]=useState(false);
 useEffect(()=>{let saved;try{saved=localStorage.getItem('theetawatch-appearance');}catch{}if(saved==='light'||saved==='dark'||saved==='auto')setModeState(saved);const m=matchMedia('(prefers-color-scheme: dark)');const update=()=>setSystemDark(m.matches);update();m.addEventListener('change',update);return()=>m.removeEventListener('change',update);},[]);
 const palette=colors(mode==='dark'||(mode==='auto'&&systemDark));
 const setMode=(value:AppearanceMode)=>{setModeState(value);try{localStorage.setItem('theetawatch-appearance',value);}catch{}};
 useEffect(()=>{document.documentElement.dataset.themeMode=mode;document.documentElement.dataset.colorScheme=palette.isDark?'dark':'light';},[mode,palette.isDark]);
 return <AppearanceContext.Provider value={{mode,palette,time:'',setMode}}><Variables $palette={palette}/>{children}</AppearanceContext.Provider>;
}
export const useAppearance=()=>useContext(AppearanceContext);
