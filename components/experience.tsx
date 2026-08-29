'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Experience({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.85 });
    const onTick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', () => ScrollTrigger.update());
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-image]').forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: 'inset(0 0 100% 0)', scale: 1.04 },
          {
            clipPath: 'inset(0 0 0% 0)',
            scale: 1,
            duration: 1.35,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: element, start: 'top 82%', once: true },
          },
        );
      });

      if (window.matchMedia('(min-width: 1024px)').matches) {
        const steps = gsap.utils.toArray<HTMLElement>('[data-process-step]');
        steps.forEach((step, index) => {
          gsap.fromTo(
            step,
            { opacity: 0.18 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: '#bespoke',
                start: `top+=${index * 22}% top`,
                end: `top+=${(index + 1) * 22}% top`,
                scrub: true,
              },
            },
          );
        });
      }

      gsap.fromTo(
        '[data-timeline-line]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '#journey', start: 'top 72%', end: 'bottom 70%', scrub: true },
        },
      );
    });

    return () => {
      context.revert();
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return children;
}
