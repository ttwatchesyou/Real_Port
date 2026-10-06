'use client';

import { useEffect, type RefObject } from 'react';

// A paused Web Animation keeps transforms out of inline styles and React renders.
export function usePointerTilt(ref: RefObject<HTMLElement | null>, enabled: boolean, selector: string, strength = 12) {
  useEffect(() => {
    const host = ref.current;
    const target = host?.querySelector<HTMLElement>(selector);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!host || !target || !enabled || motion.matches) return;
    const animation = target.animate([{ transform: 'rotateX(0deg) rotateY(0deg)' }], { duration: 1, fill: 'both' });
    animation.pause();
    animation.currentTime = 1;
    let frame = 0;
    let x = 0, y = 0, tx = 0, ty = 0;
    const tick = () => {
      x += (tx - x) * .12;
      y += (ty - y) * .12;
      (animation.effect as KeyframeEffect).setKeyframes([{ transform: `rotateX(${-y * strength}deg) rotateY(${x * strength}deg)` }]);
      frame = Math.abs(tx - x) + Math.abs(ty - y) > .001 ? requestAnimationFrame(tick) : 0;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const box = host.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
      ty = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const reset = () => { tx = 0; ty = 0; if (!frame) frame = requestAnimationFrame(tick); };
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', reset);
    host.addEventListener('pointercancel', reset);
    return () => {
      cancelAnimationFrame(frame);
      animation.cancel();
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', reset);
      host.removeEventListener('pointercancel', reset);
    };
  }, [ref, enabled, selector, strength]);
}
