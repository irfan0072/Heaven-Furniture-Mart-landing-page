'use client';

import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, Video, VolumeX, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { siteContent } from '@/lib/content';

const reels = [
  {
    number: '01',
    title: 'From timber to form',
    kicker: 'The frame',
    copy: 'A curved walnut frame is shaped, joined, and checked by hand before upholstery begins.',
    image: '/media/reel-craft.webp',
    alt: 'Craftsperson shaping a curved walnut furniture frame by hand',
  },
  {
    number: '02',
    title: 'Tailored by touch',
    kicker: 'The material',
    copy: 'Bouclé is tensioned and stitched around every curve so the final silhouette feels effortless.',
    image: '/media/reel-material.webp',
    alt: 'Skilled hands tailoring ivory boucle around a curved sofa',
  },
  {
    number: '03',
    title: 'Made for the room',
    kicker: 'The reveal',
    copy: 'The finished piece arrives in proportion to its space—not selected from a warehouse template.',
    image: '/media/reel-room.webp',
    alt: 'Finished curved ivory sofa and walnut table in a warm interior',
  },
] as const;

export function ReelsSection() {
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const { language, text } = useLanguage();
  const localizedReels = reels.map((reel, index) => language === 'bn' ? ({
    ...reel,
    kicker: ['ফ্রেম', 'উপকরণ', 'সম্পূর্ণ রূপ'][index],
    title: ['কাঠ থেকে অবয়ব', 'স্পর্শে নিখুঁত', 'ঘরের জন্য তৈরি'][index],
    copy: ['আপহোলস্টারি শুরুর আগে বাঁকানো কাঠের ফ্রেম হাতে গড়া, জোড়া ও পরীক্ষা করা হয়।', 'প্রতিটি বাঁকের ওপর বুকলে কাপড় টানটান করে সেলাই করা হয়, যাতে অবয়বটি স্বাভাবিক ও নিখুঁত হয়।', 'সম্পূর্ণ আসবাবটি আপনার জায়গার অনুপাতে পৌঁছে যায়—কোনো গুদামের তৈরি মাপ থেকে নয়।'][index],
  }) : reel);

  const close = () => setActive(null);
  const move = (direction: number) => {
    setPaused(false);
    setActive((current) => current === null ? 0 : (current + direction + reels.length) % reels.length);
  };

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === ' ') {
        event.preventDefault();
        setPaused((value) => !value);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  const current = active === null ? null : localizedReels[active];

  return (
    <section id="reels" className="relative overflow-hidden bg-[#050b0b] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-14 lg:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(179,148,94,.13),transparent_34%)]" />
      <div className="relative mx-auto max-w-[1480px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end" data-reveal>
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.2em] text-[var(--stone)]"><span className="h-px w-9 bg-[var(--brass)]" /> {text('Inside Heaven', 'হেভেনের ভেতরের গল্প')}</p>
            <h2 className="font-editorial max-w-4xl text-[clamp(3.4rem,7vw,8rem)] leading-[.82] tracking-[-.05em]">{text('Furniture has a story. ', 'প্রতিটি আসবাবের গল্প আছে। ')}<em className="text-[var(--brass)]">{text('Watch it unfold.', 'দেখুন তার নির্মাণ।')}</em></h2>
          </div>
          <div>
            <p className="max-w-lg text-base leading-8 text-white/62">{text('Three short visual stories—from the first cut of timber to the moment a finished piece belongs in its room.', 'কাঠের প্রথম কাট থেকে ঘরে সম্পূর্ণ আসবাবের স্থান পাওয়া পর্যন্ত—তিনটি ছোট ভিজ্যুয়াল গল্প।')}</p>
            <a href={siteContent.social.instagram} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-white/25 text-xs font-bold uppercase tracking-[.14em] text-white/80">{text('Follow on Instagram', 'Instagram-এ অনুসরণ করুন')} <Video size={16} /></a>
          </div>
        </div>

        <div className="reels-rail mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 sm:gap-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {localizedReels.map((reel, index) => (
            <button key={reel.number} type="button" onClick={() => { setActive(index); setPaused(false); }} className="group relative aspect-[9/14] w-[82vw] max-w-[430px] shrink-0 snap-center overflow-hidden border border-white/12 bg-[var(--teal)] text-left sm:w-[54vw] lg:w-auto lg:max-w-none" data-reveal aria-label={`${text('Play reel', 'রিল চালান')}: ${reel.title}`}>
              <img src={reel.image} alt={reel.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.045]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/25" />
              <span className="absolute left-5 top-5 grid size-12 place-items-center rounded-full border border-white/35 bg-black/15 backdrop-blur-md sm:left-7 sm:top-7"><Play size={17} fill="currentColor" /></span>
              <span className="absolute right-5 top-6 text-xs font-bold tracking-[.16em] text-white/72 sm:right-7">{reel.number} / 03</span>
              <span className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                <span className="block text-xs font-bold uppercase tracking-[.18em] text-[var(--brass)]">{reel.kicker}</span>
                <strong className="mt-2 block font-editorial text-3xl font-normal sm:text-4xl">{reel.title}</strong>
                <span className="mt-3 block max-w-sm text-sm leading-6 text-white/65">{reel.copy}</span>
              </span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-xs uppercase tracking-[.15em] text-white/38 lg:hidden">{text('Swipe to explore · Tap to play', 'দেখতে সোয়াইপ করুন · চালাতে ট্যাপ করুন')}</p>
      </div>

      {current && active !== null && (
        <dialog open className="fixed inset-0 z-[90] m-0 grid h-full max-h-none w-full max-w-none place-items-center border-0 bg-black/92 p-3 text-white backdrop-blur-xl sm:p-6" aria-label={`${current.title} ${text('reel viewer', 'রিল ভিউয়ার')}`}>
          <div className="relative h-[min(92svh,860px)] w-full max-w-[520px] overflow-hidden rounded-[1.6rem] border border-white/18 bg-black shadow-[0_40px_120px_rgba(0,0,0,.65)]">
            <div className="absolute inset-x-4 top-4 z-20 grid grid-cols-3 gap-1">
              {localizedReels.map((reel, index) => (
                <span key={reel.number} className="h-0.5 overflow-hidden rounded-full bg-white/28">
                  <span key={`${active}-${paused}-${index}`} className={`block h-full bg-white ${index < active ? 'w-full' : index === active ? 'reel-progress' : 'w-0'} ${paused ? '[animation-play-state:paused]' : ''}`} onAnimationEnd={() => index === active && move(1)} />
                </span>
              ))}
            </div>
            <img key={current.image} src={current.image} alt={current.alt} className={`reel-zoom absolute inset-0 h-full w-full object-cover ${paused ? '[animation-play-state:paused]' : ''}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35" />
            <div className="absolute inset-x-0 top-7 z-20 flex items-center justify-between px-4">
              <span className="text-xs font-bold uppercase tracking-[.16em]">{text('Heaven Stories', 'হেভেনের গল্প')}</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => setPaused((value) => !value)} className="grid size-10 place-items-center rounded-full bg-black/35" aria-label={paused ? text('Resume reel', 'রিল চালু করুন') : text('Pause reel', 'রিল থামান')}>{paused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}</button>
                <button type="button" onClick={close} className="grid size-10 place-items-center rounded-full bg-black/35" aria-label={text('Close reels', 'রিল বন্ধ করুন')}><X size={19} /></button>
              </div>
            </div>
            <button type="button" onClick={() => move(-1)} className="absolute left-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/25" aria-label={text('Previous reel', 'আগের রিল')}><ArrowLeft size={19} /></button>
            <button type="button" onClick={() => move(1)} className="absolute right-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/25" aria-label={text('Next reel', 'পরের রিল')}><ArrowRight size={19} /></button>
            <div className="absolute inset-x-6 bottom-7 z-20">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-[var(--brass)]">{current.number} · {current.kicker}</span>
              <h3 className="mt-2 font-editorial text-4xl sm:text-5xl">{current.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/70">{current.copy}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/16 pt-4 text-xs text-white/55"><span className="inline-flex items-center gap-2"><VolumeX size={15} /> {text('Visual story', 'ভিজ্যুয়াল গল্প')}</span><a href={siteContent.social.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white">Instagram <ArrowUpRight size={14} /></a></div>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
