'use client';

import { useEffect } from 'react';

export function Experience({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let disposed = false;
    let cancelSchedule = () => {};
    let teardown = () => {};

    const setupMotion = async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.85,
        anchors: true,
      });
      const onTick = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', () => ScrollTrigger.update());
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        const heroIntro = gsap.timeline({ defaults: { ease: 'power3.out' } });
        heroIntro
          .from('.hero-header', { y: -20, opacity: 0, duration: 0.7 })
          .from('.hero-eyebrow', { y: 18, opacity: 0, duration: 0.65 }, '-=.3')
          .from(
            '.hero-line',
            { yPercent: 105, opacity: 0, duration: 0.95, stagger: 0.1 },
            '-=.35',
          )
          .from('.hero-summary', { y: 20, opacity: 0, duration: 0.7 }, '-=.55')
          .from('.hero-actions', { y: 18, opacity: 0, duration: 0.65 }, '-=.48')
          .from(
            '.hero-visual',
            { xPercent: 4, opacity: 0, duration: 1.15 },
            '-=.9',
          );

        gsap.to('.hero-copy', {
          yPercent: -8,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: '#top',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('.hero-visual', {
          yPercent: 9,
          rotateX: -2,
          ease: 'none',
          scrollTrigger: {
            trigger: '#top',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.utils
          .toArray<HTMLElement>('[data-layer-stage]')
          .forEach((stage) => {
            gsap.fromTo(
              stage,
              { rotateY: -7, rotateX: 2 },
              {
                rotateY: 7,
                rotateX: -2,
                ease: 'none',
                scrollTrigger: {
                  trigger: stage,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.8,
                },
              },
            );
          });

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.fromTo(
            element,
            { y: 24, opacity: 0.45 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: element, start: 'top 92%', once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-image]').forEach((element) => {
          gsap.fromTo(
            element,
            { clipPath: 'inset(0 0 16% 0)', scale: 1.015 },
            {
              clipPath: 'inset(0 0 0% 0)',
              scale: 1,
              duration: 0.9,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: element, start: 'top 92%', once: true },
            },
          );
        });

        gsap.fromTo(
          '[data-timeline-line]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '#journey',
              start: 'top 72%',
              end: 'bottom 70%',
              scrub: true,
            },
          },
        );

        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      teardown = () => {
        context.revert();
        gsap.ticker.remove(onTick);
        lenis.destroy();
      };
    };

    const timeoutId = window.setTimeout(() => {
      void setupMotion();
    }, 250);
    cancelSchedule = () => window.clearTimeout(timeoutId);

    return () => {
      disposed = true;
      cancelSchedule();
      teardown();
    };
  }, []);

  return children;
}
