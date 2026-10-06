'use client';
import { useLocale } from './LocaleProvider';
import styled from 'styled-components';
import { useAppearance } from './AppearanceProvider';
import type { AppearanceMode } from '@/lib/appearance';

const Control = styled.div`
  display:flex;gap:3px;align-items:center;padding:4px;border:1px solid var(--border);border-radius:24px;background:var(--surface);
  button{display:grid;place-items:center;width:32px;height:32px;background:transparent;border:0;border-radius:50%;color:var(--muted);transition:background .25s,color .25s;}
  button:hover{background:var(--surface-strong);color:var(--text);}
  button[aria-pressed='true']{background:var(--action);color:var(--on-action);box-shadow:0 2px 8px var(--shadow);}
  svg{width:16px;height:16px;}
  @media(max-width:560px){padding:3px;gap:1px;button{width:27px;height:27px;}svg{width:14px;height:14px;}}
`;
function ThemeIcon({ mode }: { mode: AppearanceMode }) {
  if (mode === 'dark') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20 14.3A8.7 8.7 0 0 1 9.7 4 8.8 8.8 0 1 0 20 14.3Z"/></svg>;
  if (mode === 'light') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2 17h20M4 21h16M6 17a6 6 0 1 1 12 0M12 2v3M3 7l2 2m14 0 2-2"/></svg>;
}
export default function AppearanceSwitcher() {
  const {t}=useLocale();
  const { mode, setMode } = useAppearance();
  return <Control role="group" aria-label={t("เลือกธีม")}>{([{ mode:'dark', label:'มืด', title:'โหมดมืด — Midnight' },{ mode:'light', label:'สว่าง', title:'โหมดสว่าง — ครีมพาสเทล' },{ mode:'auto', label:'ตามเวลาจริง', title:'อัตโนมัติ — แสงเปลี่ยนตามเวลาเครื่อง' }] as const).map(option => <button key={option.mode} aria-label={t(option.label)} title={t(option.title)} aria-pressed={mode === option.mode} onClick={() => setMode(option.mode)}><ThemeIcon mode={option.mode}/></button>)}</Control>;
}
