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
      const onFilmContinue = (event: Event) => {
        const collection = document.getElementById('collections');
        if (!collection) return;
        event.preventDefault();
        lenis.scrollTo(collection, { duration: 1.3 });
      };
      window.addEventListener('heaven:film-continue', onFilmContinue);
      lenis.on('scroll', () => ScrollTrigger.update());
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        const heroIntro = gsap.timeline({
          defaults: { ease: 'power3.out' },
          delay: 0.42,
        });
        heroIntro
          .from('.hero-visual', {
            clipPath: 'inset(7% 7% 7% 7%)',
            scale: 1.07,
            duration: 1.15,
          })
          .from('.hero-header', { y: -20, opacity: 0, duration: 0.7 }, '-=.92')
          .from('.hero-eyebrow', { y: 18, opacity: 0, duration: 0.65 }, '-=.5')
          .from(
            '.hero-line',
            { yPercent: 105, opacity: 0, duration: 0.95, stagger: 0.1 },
            '-=.35',
          )
          .from('.hero-summary', { y: 20, opacity: 0, duration: 0.7 }, '-=.55')
          .from(
            '.hero-actions',
            { y: 18, opacity: 0, duration: 0.65 },
            '-=.48',
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
        gsap.to('.hero-product-image', {
          yPercent: 6,
          scale: 1.045,
          ease: 'none',
          scrollTrigger: {
            trigger: '#top',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.matchMedia().add({
          tablet: '(min-width: 768px) and (max-width: 1023px)',
          desktop: '(min-width: 1024px) and (min-height: 700px)',
          shortDesktop: '(min-width: 1024px) and (max-height: 699px)',
        }, (mediaContext) => {
        const isPinnedMaterialStory = Boolean(mediaContext.conditions?.desktop);
        gsap.utils
          .toArray<HTMLElement>('[data-material-story]')
          .forEach((story) => {
                  const stage =
                    story.querySelector<HTMLElement>('[data-layer-stage]');
                  const shells = gsap.utils
                    .toArray<HTMLElement>('[data-material-layer-shell]', story)
                    .sort(
                      (a, b) =>
                        Number(a.dataset.materialLayerShell) -
                        Number(b.dataset.materialLayerShell),
                    );
                  const steps = gsap.utils
                    .toArray<HTMLElement>('[data-material-step]', story)
                    .sort(
                      (a, b) =>
                        Number(a.dataset.materialStep) -
                        Number(b.dataset.materialStep),
                    );
                  if (!stage || shells.length === 0) return;

                  gsap.set(shells, {
                    y: 95,
                    scale: 0.86,
                    opacity: 0,
                    filter: 'blur(9px)',
                  });
                  gsap.set(steps, { backgroundColor: 'transparent' });
                  gsap.set(shells[0], {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                  });
                  gsap.set(steps[0], {
                    backgroundColor: 'rgba(255,255,255,0.4)',
                  });

                  const materialTimeline = gsap.timeline({
                    scrollTrigger: {
                      trigger: isPinnedMaterialStory ? story : stage,
                      start: isPinnedMaterialStory ? 'top top' : 'top 88%',
                      end: isPinnedMaterialStory ? 'bottom bottom' : 'bottom 16%',
                      scrub: 0.65,
                    },
                  });

                  shells.slice(1).forEach((shell, offset) => {
                    const index = offset + 1;
                    const position = 0.55 + offset * 1.15;
                    materialTimeline.to(
                      steps[index - 1],
                      { backgroundColor: 'transparent', duration: 0.22 },
                      position,
                    );
                    materialTimeline
                      .to(
                        shell,
                        {
                          y: 0,
                          scale: 1,
                          opacity: 1,
                          filter: 'blur(0px)',
                          duration: 0.82,
                          ease: 'power3.out',
                        },
                        position,
                      )
                      .to(
                        steps[index],
                        {
                          backgroundColor: 'rgba(255,255,255,0.4)',
                          duration: 0.28,
                          ease: 'power2.out',
                        },
                        position + 0.12,
                      );
                  });

                  materialTimeline.to(
                    stage,
                    {
                      rotateY: 5,
                      rotateX: -2,
                      scale: 1.025,
                      duration: 0.85,
                      ease: 'sine.inOut',
                    },
                    3.35,
                  );
                });
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
        window.removeEventListener('heaven:film-continue', onFilmContinue);
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
