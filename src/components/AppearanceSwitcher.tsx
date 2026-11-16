'use client';
import styled from 'styled-components';
import { useAppearance } from './AppearanceProvider';
import { useLocale } from './LocaleProvider';
import type { AppearanceMode } from '@/lib/appearance';
const Control=styled.label`
 display:flex;align-items:center;gap:10px;font-size:12px;color:var(--muted);
 select{border:0;border-bottom:1px solid var(--border);border-radius:0;background:var(--bg);color:var(--text);min-height:44px;max-width:110px;padding:7px 4px;font-size:12px;cursor:pointer;}option{background:var(--bg);color:var(--text);}
`;
export default function AppearanceSwitcher(){const {mode,setMode}=useAppearance(),{t}=useLocale();return <Control><span>{t('ed.theme')}</span><select aria-label={t('เลือกธีม')} value={mode} onChange={e=>setMode(e.target.value as AppearanceMode)}><option value="light">{t('สว่าง')}</option><option value="dark">{t('มืด')}</option><option value="auto">{t('ed.system')}</option></select></Control>;}
