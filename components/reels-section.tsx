'use client';

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Images,
  Pause,
  Play,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  {
    number: '04',
    title: 'Rest, made personal',
    kicker: 'The bedroom',
    copy: 'A statement bed brings softness, storage, and calm together in one considered composition.',
    image: '/media/reel-bedroom.webp',
    alt: 'Luxury upholstered bed made by Heaven Furniture Mart',
  },
  {
    number: '05',
    title: 'Gather around',
    kicker: 'The dining room',
    copy: 'Balanced proportions make space for everyday meals, long conversations, and every guest.',
    image: '/media/reel-dining.webp',
    alt: 'Luxury dining table and chair set made by Heaven Furniture Mart',
  },
  {
    number: '06',
    title: 'Display with character',
    kicker: 'The showcase',
    copy: 'Storage becomes part of the room through warm timber, glass, and carefully framed details.',
    image: '/media/reel-showcase.webp',
    alt: 'Luxury timber and glass showcase made by Heaven Furniture Mart',
  },
] as const;

export function ReelsSection() {
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const { language, text } = useLanguage();
  const localizedReels = reels.map((reel, index) =>
    language === 'bn'
      ? {
          ...reel,
          kicker: ['ফ্রেম', 'উপকরণ', 'সম্পূর্ণ রূপ', 'বেডরুম', 'ডাইনিং রুম', 'শোকেস'][
            index
          ],
          title: [
            'কাঠ থেকে অবয়ব',
            'স্পর্শে নিখুঁত',
            'ঘরের জন্য তৈরি',
            'আপনার মতো বিশ্রাম',
            'একসঙ্গে বসার আনন্দ',
            'চরিত্রময় প্রদর্শন',
          ][index],
          copy: [
            'আপহোলস্টারি শুরুর আগে বাঁকানো কাঠের ফ্রেম হাতে গড়া, জোড়া ও পরীক্ষা করা হয়।',
            'প্রতিটি বাঁকের ওপর বুকলে কাপড় টানটান করে সেলাই করা হয়, যাতে অবয়বটি স্বাভাবিক ও নিখুঁত হয়।',
            'সম্পূর্ণ আসবাবটি আপনার জায়গার অনুপাতে পৌঁছে যায়—কোনো গুদামের তৈরি মাপ থেকে নয়।',
            'স্টেটমেন্ট বেডে কোমলতা, ব্যবহারিক স্টোরেজ ও প্রশান্তি একসঙ্গে সুন্দরভাবে মিলে যায়।',
            'সুষম অনুপাত প্রতিদিনের খাবার, দীর্ঘ আড্ডা ও অতিথিদের জন্য আরামদায়ক জায়গা করে দেয়।',
            'উষ্ণ কাঠ, কাচ ও যত্নে গড়া ডিটেইলে স্টোরেজও হয়ে ওঠে ঘরের সৌন্দর্যের অংশ।',
          ][index],
        }
      : reel,
  );

  const close = () => {
    dialogRef.current?.close();
    setActive(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  };
  const move = (direction: number) => {
    setPaused(false);
    setActive((current) =>
      current === null
        ? 0
        : (current + direction + reels.length) % reels.length,
    );
  };

  useEffect(() => {
    if (active === null) return;
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
      const target = event.target as HTMLElement | null;
      const isInteractive = target?.closest(
        'button, a, input, select, textarea, summary',
      );
      if (event.key === ' ' && !isInteractive) {
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
    <section
      id="reels"
      className="relative overflow-hidden bg-[#050b0b] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-14 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(179,148,94,.13),transparent_34%)]" />
      <div className="relative mx-auto max-w-[1480px]">
        <div
          className="grid gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end"
          data-reveal
        >
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.2em] text-[var(--stone)]">
              <span className="h-px w-9 bg-[var(--brass)]" />{' '}
              {text('Heaven visual stories', 'হেভেনের ভিজ্যুয়াল গল্প')}
            </p>
            <h2 className="font-editorial max-w-4xl text-[clamp(3.4rem,7vw,8rem)] leading-[.82] tracking-[-.05em]">
              {text('Furniture has a story. ', 'প্রতিটি আসবাবের গল্প আছে। ')}
              <em className="text-[var(--brass)]">
                {text('See it unfold.', 'দেখুন তার নির্মাণ।')}
              </em>
            </h2>
          </div>
          <div>
            <p className="max-w-lg text-base leading-8 text-white/62">
              {text(
                'Six visual stories—from the first cut of timber to the moment a finished piece belongs in its room.',
                'কাঠের প্রথম কাট থেকে ঘরে সম্পূর্ণ আসবাবের স্থান পাওয়া পর্যন্ত—ছয়টি ভিজ্যুয়াল গল্প।',
              )}
            </p>
            <a
              href={siteContent.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-white/25 text-xs font-bold uppercase tracking-[.14em] text-white/80"
            >
              {text('Follow on Instagram', 'Instagram-এ অনুসরণ করুন')}{' '}
              <Images size={16} />
            </a>
          </div>
        </div>

        <div className="reels-rail mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 sm:gap-6">
          {localizedReels.map((reel, index) => (
            <button
              key={reel.number}
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setActive(index);
                setPaused(false);
              }}
              className="group relative aspect-[9/14] w-[82vw] max-w-[430px] shrink-0 snap-center overflow-hidden border border-white/12 bg-[var(--teal)] text-left sm:w-[54vw] lg:w-[31vw] xl:w-[28vw]"
              data-reveal
              aria-label={`${text('Open visual story', 'ভিজ্যুয়াল গল্প খুলুন')}: ${reel.title}`}
            >
              <img
                src={reel.image}
                alt={reel.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.045]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/25" />
              <span className="absolute left-5 top-5 grid size-12 place-items-center rounded-full border border-white/35 bg-black/15 backdrop-blur-md sm:left-7 sm:top-7">
                <Play size={17} fill="currentColor" />
              </span>
              <span className="absolute right-5 top-6 text-xs font-bold tracking-[.16em] text-white/72 sm:right-7">
                {reel.number} / {String(reels.length).padStart(2, '0')}
              </span>
              <span className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                <span className="block text-xs font-bold uppercase tracking-[.18em] text-[var(--brass)]">
                  {reel.kicker}
                </span>
                <strong className="mt-2 block font-editorial text-3xl font-normal sm:text-4xl">
                  {reel.title}
                </strong>
                <span className="mt-3 block max-w-sm text-sm leading-6 text-white/65">
                  {reel.copy}
                </span>
              </span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-xs uppercase tracking-[.15em] text-white/65">
          {text(
            'Swipe to explore · Tap to open',
            'দেখতে সোয়াইপ করুন · খুলতে ট্যাপ করুন',
          )}
        </p>
      </div>

      {current && active !== null && (
        <dialog
          ref={dialogRef}
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          className="fixed inset-0 z-[90] m-0 h-full max-h-none w-full max-w-none place-items-center border-0 bg-black/92 p-3 text-white backdrop-blur-xl open:grid sm:p-6"
          aria-modal="true"
          aria-label={`${current.title} ${text('visual story viewer', 'ভিজ্যুয়াল গল্প ভিউয়ার')}`}
        >
          <div className="relative h-[min(92svh,860px)] w-full max-w-[520px] overflow-hidden rounded-[1.6rem] border border-white/18 bg-black shadow-[0_40px_120px_rgba(0,0,0,.65)]">
            <div
              className="absolute inset-x-4 top-4 z-20 grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${localizedReels.length}, minmax(0, 1fr))`,
              }}
            >
              {localizedReels.map((reel, index) => (
                <span
                  key={reel.number}
                  className="h-0.5 overflow-hidden rounded-full bg-white/28"
                >
                  <span
                    key={`${active}-${paused}-${index}`}
                    className={`block h-full bg-white ${index < active ? 'w-full' : index === active ? 'reel-progress' : 'w-0'} ${paused ? '[animation-play-state:paused]' : ''}`}
                    onAnimationEnd={() => index === active && move(1)}
                  />
                </span>
              ))}
            </div>
            <img
              key={current.image}
              src={current.image}
              alt={current.alt}
              className={`reel-zoom absolute inset-0 h-full w-full object-cover ${paused ? '[animation-play-state:paused]' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35" />
            <div className="absolute inset-x-0 top-7 z-20 flex items-center justify-between px-4">
              <span className="text-xs font-bold uppercase tracking-[.16em]">
                {text('Heaven Stories', 'হেভেনের গল্প')}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaused((value) => !value)}
                  className="grid size-10 place-items-center rounded-full bg-black/35"
                  aria-label={
                    paused
                      ? text('Resume story', 'গল্প চালু করুন')
                      : text('Pause story', 'গল্প থামান')
                  }
                >
                  {paused ? (
                    <Play size={16} fill="currentColor" />
                  ) : (
                    <Pause size={16} fill="currentColor" />
                  )}
                </button>
                <button
                  autoFocus
                  type="button"
                  onClick={close}
                  className="grid size-10 place-items-center rounded-full bg-black/35"
                  aria-label={text(
                    'Close visual stories',
                    'ভিজ্যুয়াল গল্প বন্ধ করুন',
                  )}
                >
                  <X size={19} />
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => move(-1)}
              className="absolute left-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/25"
              aria-label={text('Previous reel', 'আগের রিল')}
            >
              <ArrowLeft size={19} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="absolute right-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/25"
              aria-label={text('Next reel', 'পরের রিল')}
            >
              <ArrowRight size={19} />
            </button>
            <div className="absolute inset-x-6 bottom-7 z-20">
              <span className="text-xs font-bold uppercase tracking-[.18em] text-[var(--brass)]">
                {current.number} · {current.kicker}
              </span>
              <h3 className="mt-2 font-editorial text-4xl sm:text-5xl">
                {current.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
                {current.copy}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-white/16 pt-4 text-xs text-white/55">
                <span className="inline-flex items-center gap-2">
                  <Images size={15} />{' '}
                  {text('Animated visual story', 'অ্যানিমেটেড ভিজ্যুয়াল গল্প')}
                </span>
                <a
                  href={siteContent.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white"
                >
                  Instagram <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
