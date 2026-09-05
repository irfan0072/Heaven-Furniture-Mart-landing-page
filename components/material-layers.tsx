'use client';

import { Check } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export function MaterialLayers() {
  const { text } = useLanguage();
  const layers = [
    {
      number: '04',
      title: text('Fabric cover', 'কাপড়ের আবরণ'),
      copy: text(
        'Tactile, durable, precisely tensioned.',
        'স্পর্শে আরামদায়ক, টেকসই ও নিখুঁতভাবে টানটান।',
      ),
      className: 'layer-fabric',
    },
    {
      number: '03',
      title: text('Comfort foam', 'আরামদায়ক ফোম'),
      copy: text(
        'Balanced support with a softer first touch.',
        'প্রথম স্পর্শে নরম, ভেতরে ভারসাম্যপূর্ণ সাপোর্ট।',
      ),
      className: 'layer-foam',
    },
    {
      number: '02',
      title: text('Support belts', 'সিটের সাপোর্ট বেল্ট'),
      copy: text(
        'Even pressure distribution across the seat.',
        'পুরো সিটজুড়ে চাপ সমানভাবে বণ্টন করে।',
      ),
      className: 'layer-webbing',
    },
    {
      number: '01',
      title: text('Wooden frame', 'মজবুত কাঠের ফ্রেম'),
      copy: text(
        'The structure everything else depends on.',
        'যে শক্ত কাঠামোর ওপর পুরো আসবাবটি দাঁড়িয়ে।',
      ),
      className: 'layer-frame',
    },
  ];
  const constructionSteps = [...layers].reverse();

  return (
    <section
      id="materials"
      className="material-story relative bg-[#d8cdbd]"
      data-material-story
    >
      <div className="material-story__viewport px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
        <div className="material-story__grid mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-12">
          <div data-material-copy-panel>
            <p className="mb-3 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.2em] text-[var(--brown)]/65 sm:mb-5 sm:text-xs">
              <span className="h-px w-9 bg-[var(--brass)]" />{' '}
              {text('Inside every seat', 'প্রতিটি সিটের ভেতরে')}
            </p>
            <h2 className="font-editorial max-w-xl text-[clamp(2.4rem,8.5vw,4.6rem)] leading-[.9] tracking-[-.045em] lg:text-[clamp(3.4rem,6vw,6.8rem)]">
              {text('Comfort, built ', 'আরাম, তৈরি হয় ')}
              <em className="text-[var(--wood)]">
                {text('layer by layer.', 'স্তরে স্তরে।')}
              </em>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--brown)]/80 lg:mt-7 lg:text-base lg:leading-8">
              {text(
                'Discover the four layers that bring structure, support and comfort to a seat. Materials are confirmed with your final design.',
                'কাঠের ফ্রেম থেকে কাপড়ের আবরণ—চারটি স্তর মিলে তৈরি হয় বসার আরাম। আপনার ডিজাইন অনুযায়ী উপকরণ নিশ্চিত করা হবে।',
              )}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 lg:mt-8">
              {constructionSteps.map((layer, index) => (
                <div
                  key={layer.number}
                  data-material-step={index}
                  className="rounded-lg border border-[var(--teal)]/25 p-3"
                >
                  <div className="flex items-start gap-2 lg:gap-3">
                    <Check
                      size={15}
                      className="mt-0.5 hidden shrink-0 text-[var(--teal)] sm:block"
                    />
                    <div>
                      <span className="block text-xs font-bold text-[var(--brown)]">
                        {layer.number}
                      </span>
                      <strong className="mt-1 block text-sm leading-6">
                        {layer.title}
                      </strong>
                      <p className="mt-1 text-sm leading-6 text-[var(--brown)]/80">
                        {layer.copy}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="material-stage relative min-w-0"
            data-layer-stage
            aria-label={text(
              'Exploded sofa seat construction study',
              'সোফা সিটের বিস্তৃত স্তরভিত্তিক নির্মাণ স্টাডি',
            )}
          >
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[min(100%,650px)] -translate-x-1/2 -translate-y-1/2 [perspective:1200px] sm:h-[360px] lg:h-[400px]">
              {layers.map((layer, index) => (
                <div
                  key={layer.number}
                  data-material-layer-shell={3 - index}
                  className="absolute inset-0"
                >
                  <div
                    className={`material-layer ${layer.className}`}
                    style={
                      {
                        '--layer-x': `${(index - 1.5) * 22}px`,
                        '--layer-y': `${(index - 1.5) * 58}px`,
                        '--layer-z': `${(3 - index) * 40}px`,
                        '--layer-mobile-x': `${(index - 1.5) * 10}px`,
                        '--layer-mobile-y': `${(index - 1.5) * 42}px`,
                        '--layer-mobile-z': `${(3 - index) * 25}px`,
                      } as React.CSSProperties
                    }
                  >
                    <span className="material-layer-label absolute left-4 top-4 text-xs font-extrabold text-white">
                      {layer.number}
                    </span>
                    <span className="material-layer-label absolute bottom-4 right-4 text-sm font-bold text-white">
                      {layer.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="material-scroll-hint absolute bottom-0 left-1/2 -translate-x-1/2 items-center gap-2 whitespace-nowrap text-xs font-bold text-[var(--brown)]">
              <span>{text('Scroll to assemble', 'তৈরি করতে স্ক্রল করুন')}</span>
              <span aria-hidden="true">↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
