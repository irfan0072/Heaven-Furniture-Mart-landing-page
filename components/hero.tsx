'use client';

import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { LanguageToggle, useLanguage } from '@/components/language-provider';
import { siteContent } from '@/lib/content';

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { text } = useLanguage();

  const tilt = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)')
        .matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.transform = `perspective(1400px) rotateX(${y * -3}deg) rotateY(${x * 4}deg) scale(.992)`;
  };

  return (
    <section
      id="top"
      className="grain relative overflow-hidden bg-[var(--teal-deep)] pb-5 text-[var(--ivory)] sm:pb-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(180,130,85,.19),transparent_36%),linear-gradient(180deg,#0b2423_0%,#081d1c_58%,#061514_100%)]" />
      <header className="hero-header relative z-40 mx-3 mt-3 flex h-[70px] max-w-[1480px] items-center justify-between border border-white/18 px-4 sm:mx-6 sm:mt-5 sm:px-6 lg:mx-auto lg:h-20 lg:px-8">
        <a
          href="#top"
          className="font-editorial text-lg font-semibold leading-[.85] tracking-[-.02em] sm:text-2xl"
        >
          Heaven{' '}
          <span className="block text-[11px] font-normal tracking-[.14em] text-[var(--stone)] sm:text-sm">
            Furniture Mart
          </span>
        </a>
        <nav
          className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[.13em] text-[var(--stone)] lg:flex"
          aria-label="Primary navigation"
        >
          <a href="#about" className="transition-colors hover:text-white">
            {text('About', 'আমাদের সম্পর্কে')}
          </a>
          <a href="#collections" className="transition-colors hover:text-white">
            {text('Collections', 'কালেকশন')}
          </a>
          <a href="#reels" className="transition-colors hover:text-white">
            {text('Reels', 'রিলস')}
          </a>
          <a href="#bespoke" className="transition-colors hover:text-white">
            {text('Design Studio', 'ডিজাইন স্টুডিও')}
          </a>
          <a href="#showroom" className="transition-colors hover:text-white">
            {text('Showroom', 'শোরুম')}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <a
            href={siteContent.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-11 items-center gap-2 bg-[var(--ivory)] px-5 text-xs font-extrabold uppercase tracking-[.1em] text-[var(--teal)] transition hover:bg-[var(--brass)] xl:inline-flex"
          >
            {text('Request a quote', 'কোটেশন নিন')} <ArrowUpRight size={15} />
          </a>
          <button
            className="grid size-11 place-items-center border border-white/25 lg:hidden"
            aria-label={
              menuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        hidden={!menuOpen}
        className="absolute inset-x-3 top-[84px] z-50 border border-white/15 bg-[#061313]/98 px-5 py-5 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:top-[100px] lg:hidden"
      >
        <nav className="grid text-sm" aria-label="Mobile navigation">
          {[
            [text('About', 'আমাদের সম্পর্কে'), '#about'],
            [text('Collections', 'কালেকশন'), '#collections'],
            [text('Reels', 'রিলস'), '#reels'],
            [text('Design Studio', 'ডিজাইন স্টুডিও'), '#bespoke'],
            [text('Why Heaven', 'কেন হেভেন'), '#why-heaven'],
            [text('Showroom', 'শোরুম'), '#showroom'],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-12 items-center justify-between border-b border-white/10 last:border-0"
            >
              {label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </nav>
      </div>

      <div className="hero-stage relative z-10 mx-auto max-w-[1480px] px-3 pt-16 sm:px-6 sm:pt-20 lg:pt-24">
        <div className="hero-copy mx-auto max-w-[1040px] text-center">
          <p className="hero-eyebrow mx-auto mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--stone)] sm:text-xs">
            <span className="size-1.5 rounded-full bg-[var(--brass)]" />{' '}
            {text(
              'Designed in Chattogram · Made for you',
              'চট্টগ্রামে ডিজাইন · আপনার জন্য তৈরি',
            )}
          </p>
          <h1 className="hero-heading font-editorial text-[clamp(3.6rem,9vw,9.2rem)] font-medium leading-[.78] tracking-[-.058em]">
            <span className="hero-line block">
              {text('Furniture that', 'যে আসবাব')}
            </span>
            <span className="hero-line block">
              <em className="font-normal text-[var(--brass)]">
                {text('belongs', 'আপনারই')}
              </em>{' '}
              {text('to your life.', 'জীবনের অংশ।')}
            </span>
          </h1>
          <p className="hero-summary mx-auto mt-8 max-w-2xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
            {text(
              'Bespoke sofas, beds, dining sets, and interior pieces—measured for your room, crafted around your taste, installed by our team.',
              'আপনার ঘরের মাপ, রুচি ও জীবনযাপনের জন্য তৈরি কাস্টম সোফা, বেড, ডাইনিং সেট ও ইন্টেরিয়র ফার্নিচার—ডেলিভারি ও ইনস্টলেশনসহ।',
            )}
          </p>
          <div className="hero-actions mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href="#bespoke"
              className="inline-flex min-h-14 items-center justify-center gap-3 whitespace-nowrap bg-[var(--ivory)] px-6 text-xs font-extrabold uppercase tracking-[.1em] text-[#102c2b] transition-transform hover:-translate-y-1"
            >
              {text('Design Your Sofa', 'আপনার সোফা ডিজাইন করুন')}{' '}
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#reels"
              className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/18 px-6 text-xs font-bold uppercase tracking-[.11em] text-white hover:bg-white/8"
            >
              <span className="grid size-7 place-items-center rounded-full border border-white/28 text-[9px]">
                ▶
              </span>{' '}
              {text('Watch the craft', 'কারুশিল্প দেখুন')}
            </a>
          </div>
        </div>

        <div className="hero-visual mt-14 aspect-[4/5] min-h-[480px] sm:aspect-[16/11] sm:min-h-0 lg:mt-20 lg:aspect-[16/7]">
          <div
            className="hero-depth-card relative h-full w-full overflow-hidden rounded-[1.25rem] border border-white/14 bg-[var(--teal)] transition-transform duration-300 ease-out sm:rounded-[1.75rem] lg:rounded-[2rem]"
            onMouseMove={tilt}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = '';
            }}
          >
            <picture className="absolute inset-0 block h-full w-full">
              <source
                media="(max-width: 639px)"
                srcSet="/hero-v2-mobile.webp"
              />
              <img
                src="/hero-v2.webp"
                width="1448"
                height="1086"
                alt="Classic solid-wood sofa collection by Heaven Furniture Mart"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover object-center"
              />
            </picture>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3 border-t border-white/25 pt-4 text-xs uppercase tracking-[.16em] text-white/75 sm:inset-x-8 sm:bottom-7 sm:flex-row sm:items-center sm:justify-between lg:inset-x-10 lg:bottom-9">
              <span>
                <strong className="mr-2 text-[var(--brass)]">01</strong>{' '}
                {text('The Chattogram Classic', 'দ্য চট্টগ্রাম ক্লাসিক')}
              </span>
              <span className="text-white/48">
                {text('Hand-finished solid wood', 'হাতে ফিনিশ করা সলিড কাঠ')}
              </span>
            </div>
            <span className="absolute left-[7%] top-[12%] hidden rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[10px] uppercase tracking-[.16em] backdrop-blur-md lg:block">
              {text(
                'Solid wood · custom upholstery',
                'সলিড কাঠ · কাস্টম আপহোলস্টারি',
              )}
            </span>
            <span className="absolute bottom-[16%] right-[6%] hidden rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[10px] uppercase tracking-[.16em] backdrop-blur-md lg:block">
              {text('Made to measure', 'মাপ অনুযায়ী তৈরি')}
            </span>
          </div>
        </div>

        <div className="grid border-x border-b border-white/14 text-center text-[10px] font-bold uppercase tracking-[.14em] text-white/48 sm:grid-cols-3 sm:text-xs">
          {[
            text('Measured for your room', 'আপনার ঘরের মাপে'),
            text('Materials chosen with you', 'আপনার পছন্দের উপকরণ'),
            text('Delivered & installed', 'ডেলিভারি ও ইনস্টলেশন'),
          ].map((item) => (
            <span
              key={item}
              className="border-b border-white/12 px-4 py-5 last:border-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <a
        href="#about"
        className="mx-auto mt-8 flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[.22em] text-white/45"
      >
        {text('Scroll to enter', 'স্ক্রল করে দেখুন')} <ArrowDown size={14} />
      </a>
    </section>
  );
}
