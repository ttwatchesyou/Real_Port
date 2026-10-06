'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { paletteAt, type AppearanceMode, type AppearancePalette } from '@/lib/appearance';

const initialPalette = paletteAt('dark', 0);
const AppearanceContext = createContext({ mode: 'auto' as AppearanceMode, palette: initialPalette, time: '--:--', setMode: (_: AppearanceMode) => {} });
const ThemeVariables = createGlobalStyle<{ $palette: AppearancePalette }>`
  html:root {
    --bg:${p => p.$palette.bg}; --surface:${p => p.$palette.surface}; --panel:${p => p.$palette.surface};
    --surface-strong:${p => p.$palette.surfaceStrong}; --text:${p => p.$palette.text}; --muted:${p => p.$palette.muted};
    --accent:${p => p.$palette.accent}; --warm:${p => p.$palette.warm}; --border:${p => p.$palette.border};
    --nav:${p => p.$palette.nav}; --action:${p => p.$palette.action}; --on-action:${p => p.$palette.onAction};
    --sky-one:${p => p.$palette.skyOne}; --sky-two:${p => p.$palette.skyTwo}; --glow:${p => p.$palette.glow};
    --grid:${p => p.$palette.grid}; --shadow:${p => p.$palette.shadow};
    color-scheme:${p => p.$palette.isDark ? 'dark' : 'light'};
  }
  html[data-theme-settled='true'] body {transition:background-color .6s ease,color .6s ease;}
  @media(prefers-reduced-motion:reduce){body{transition:none;}}
`;

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ mode: AppearanceMode; now: Date | null }>({ mode: 'auto', now: null });
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem('theetawatch-appearance'); } catch {}
    setState({ mode: saved === 'dark' || saved === 'light' ? saved : 'auto', now: new Date() });
    const update = () => setState(old => ({ ...old, now: new Date() }));
    const interval = setInterval(update, 15000);
    const ready=setTimeout(()=>{document.documentElement.dataset.themeSettled='true';},1500);
    const onVisibility = () => { if (!document.hidden) update(); };
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'theetawatch-appearance') setState({ mode: event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : 'auto', now: new Date() });
    };
    window.addEventListener('focus', update);
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { clearTimeout(ready);clearInterval(interval); window.removeEventListener('focus', update); window.removeEventListener('storage', onStorage); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  const minute = state.now ? state.now.getHours() * 60 + state.now.getMinutes() + state.now.getSeconds() / 60 : 0;
  const palette = useMemo(() => state.now ? paletteAt(state.mode, minute) : initialPalette, [state.mode, state.now, minute]);
  const time = state.now ? `${String(state.now.getHours()).padStart(2, '0')}:${String(state.now.getMinutes()).padStart(2, '0')}` : '--:--';
  const setMode = (mode: AppearanceMode) => {
    setState({ mode, now: new Date() });
    try { localStorage.setItem('theetawatch-appearance', mode); } catch {}
  };
  useEffect(() => {
    document.documentElement.dataset.themeMode = state.mode;
    document.documentElement.dataset.lightPhase = palette.phase;
    document.documentElement.dataset.colorScheme = palette.isDark ? 'dark' : 'light';
  }, [state.mode, palette.phase, palette.isDark]);
  return <AppearanceContext.Provider value={{ mode: state.mode, palette, time, setMode }}><ThemeVariables $palette={palette}/>{children}</AppearanceContext.Provider>;
}
export const useAppearance = () => useContext(AppearanceContext);
