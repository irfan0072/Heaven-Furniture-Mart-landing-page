'use client';

import { useEffect, useState, type RefObject } from 'react';

/** The stage wraps the film heading, player, and controls inside the sticky viewport. */
export function useFilmScroll(
  section: RefObject<HTMLElement | null>,
  stage: RefObject<HTMLDivElement | null>,
) {
  const [inFocus, setInFocus] = useState(false);

  useEffect(() => {
    const root = section.current;
    const content = stage.current;
    if (!root || !content) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let focused = false;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const ease = (value: number) => value * value * (3 - 2 * value);

    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = clamp(-rect.top / Math.max(1, rect.height - viewport));
      const cinema =
        !motion.matches && rect.top <= 1 && rect.bottom >= viewport - 1;
      document.body.classList.toggle('film-cinema-active', cinema);

      let next: boolean;
      if (motion.matches) {
        content.style.removeProperty('transform');
        content.style.removeProperty('opacity');
        content.style.removeProperty('visibility');
        const bounds = content.getBoundingClientRect();
        const visible = Math.max(
          0,
          Math.min(bounds.bottom, viewport) - Math.max(bounds.top, 0),
        );
        next = visible >= Math.min(bounds.height * 0.65, viewport * 0.65);
      } else {
        const entrance = ease(clamp(progress / 0.28));
        const exit = ease(clamp((progress - 0.72) / 0.28));
        const opacity = entrance * (1 - exit);
        content.style.opacity = String(opacity);
        content.style.visibility = opacity < 0.015 ? 'hidden' : 'visible';
        content.style.transform = `translate3d(0, ${(1 - entrance) * 38 - exit * 38}svh, 0) scale(${0.94 + entrance * 0.06 - exit * 0.04})`;
        next = cinema && progress >= 0.28 && progress <= 0.72;
      }
      if (next !== focused) {
        focused = next;
        setInFocus(next);
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(root);
    observer.observe(content);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    motion.addEventListener('change', requestUpdate);
    requestUpdate();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      motion.removeEventListener('change', requestUpdate);
      document.body.classList.remove('film-cinema-active');
      content.style.removeProperty('transform');
      content.style.removeProperty('opacity');
      content.style.removeProperty('visibility');
    };
  }, [section, stage]);

  return inFocus;
}
