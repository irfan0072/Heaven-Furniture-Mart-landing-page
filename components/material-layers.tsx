'use client';

import { Check } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export function MaterialLayers() {
  const { text } = useLanguage();
  const layers = [
    { number: '04', title: text('Tailored bouclé', 'টেইলার্ড বুকলে'), copy: text('Tactile, durable, precisely tensioned.', 'স্পর্শে আরামদায়ক, টেকসই ও নিখুঁতভাবে টানটান।'), className: 'layer-fabric' },
    { number: '03', title: text('Comfort foam', 'কমফোর্ট ফোম'), copy: text('Balanced support with a softer first touch.', 'প্রথম স্পর্শে নরম, ভেতরে ভারসাম্যপূর্ণ সাপোর্ট।'), className: 'layer-foam' },
    { number: '02', title: text('Webbed support', 'ওয়েবড সাপোর্ট'), copy: text('Even pressure distribution across the seat.', 'পুরো সিটজুড়ে চাপ সমানভাবে বণ্টন করে।'), className: 'layer-webbing' },
    { number: '01', title: text('Walnut frame', 'ওয়ালনাট ফ্রেম'), copy: text('The structure everything else depends on.', 'যে শক্ত কাঠামোর ওপর পুরো আসবাবটি দাঁড়িয়ে।'), className: 'layer-frame' },
  ];

  return (
    <section className="overflow-hidden bg-[#d8cdbd] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36">
      <div className="mx-auto grid max-w-[1380px] items-center gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div data-reveal>
          <p className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.2em] text-[var(--brown)]/65"><span className="h-px w-9 bg-[var(--brass)]" /> {text('Inside the piece', 'আসবাবের ভেতরে')}</p>
          <h2 className="font-editorial text-[clamp(3.4rem,6vw,6.8rem)] leading-[.86] tracking-[-.045em]">{text('Beauty on top. ', 'বাইরে সৌন্দর্য। ')}<em className="text-[var(--wood)]">{text('Integrity beneath.', 'ভেতরে দৃঢ়তা।')}</em></h2>
          <p className="mt-7 max-w-lg text-base leading-8 text-[var(--brown)]/68">{text('A premium sofa is a system, not a silhouette. Explore the four layers we balance for comfort, longevity, and a beautifully resolved form.', 'একটি প্রিমিয়াম সোফা শুধু সুন্দর অবয়ব নয়—এটি একটি পূর্ণাঙ্গ নির্মাণব্যবস্থা। আরাম, স্থায়িত্ব ও নিখুঁত রূপের জন্য আমরা চারটি স্তর ভারসাম্যে তৈরি করি।')}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {layers.map((layer) => <div key={layer.number} className="flex gap-3 border-t border-[var(--teal)]/16 pt-4"><Check size={16} className="mt-1 shrink-0 text-[var(--teal)]" /><div><strong className="text-sm">{layer.title}</strong><p className="mt-1 text-xs leading-5 text-[var(--brown)]/60">{layer.copy}</p></div></div>)}
          </div>
        </div>

        <div className="material-stage relative min-h-[440px] sm:min-h-[580px]" data-layer-stage aria-label={text('Exploded sofa material construction', 'সোফার উপকরণের বিস্তৃত স্তরভিত্তিক নির্মাণ')}>
          <div className="absolute left-1/2 top-1/2 h-[310px] w-[min(82vw,650px)] -translate-x-1/2 -translate-y-1/2 [perspective:1200px] sm:h-[400px]">
            {layers.map((layer, index) => (
              <div key={layer.number} data-material-layer className={`material-layer ${layer.className}`} style={{ '--layer-x': `${(index - 1.5) * 22}px`, '--layer-y': `${(index - 1.5) * 58}px`, '--layer-z': `${(3 - index) * 40}px`, '--layer-mobile-x': `${(index - 1.5) * 10}px`, '--layer-mobile-y': `${(index - 1.5) * 42}px`, '--layer-mobile-z': `${(3 - index) * 25}px` } as React.CSSProperties}>
                <span className="absolute left-4 top-4 text-[10px] font-extrabold tracking-[.16em] text-white/72">{layer.number}</span>
                <span className="absolute bottom-4 right-4 text-xs font-bold text-white/75">{layer.title}</span>
              </div>
            ))}
          </div>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[.16em] text-[var(--brown)]/45">{text('Scroll-driven exploded construction', 'স্ক্রল-চালিত স্তরভিত্তিক নির্মাণ')}</span>
        </div>
      </div>
    </section>
  );
}
