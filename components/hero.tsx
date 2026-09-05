'use client';

import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { LanguageToggle, useLanguage } from '@/components/language-provider';
import { siteContent } from '@/lib/content';

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { text } = useLanguage();

  return (
    <section
      id="top"
      className="grain hero-section relative min-h-[100svh] overflow-hidden bg-[var(--teal-deep)] text-[var(--ivory)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(180,130,85,.2),transparent_32%),linear-gradient(180deg,#0b2423_0%,#061817_100%)]" />

      <header className="hero-header relative z-40 mx-3 mt-3 flex h-[70px] max-w-[1480px] items-center justify-between border border-white/18 bg-[#071b1a]/45 px-4 backdrop-blur-xl sm:mx-6 sm:mt-5 sm:px-6 lg:mx-auto lg:h-20 lg:px-8">
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
            {text('Stories', 'গল্প')}
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
            [text('Stories', 'গল্প'), '#reels'],
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

      <div className="hero-stage relative z-10 mx-auto max-w-[1480px] p-3 sm:p-6 lg:px-0 lg:pb-7 lg:pt-6">
        <div className="hero-layout relative min-h-[calc(100svh-106px)] overflow-hidden border border-white/14 bg-[#0b2423] sm:min-h-[720px] lg:min-h-[calc(100svh-132px)]">
          <div className="hero-visual absolute inset-0 overflow-hidden lg:left-auto lg:w-[58%]">
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
                className="hero-product-image h-full w-full object-cover"
              />
            </picture>
            <div className="hero-media-shade pointer-events-none absolute inset-0" />
            <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
            <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
            <div className="hero-product-tag absolute right-5 top-5 border border-white/25 bg-[#071716]/55 px-4 py-3 text-[9px] font-bold uppercase tracking-[.17em] text-white/78 backdrop-blur-md sm:right-8 sm:top-8">
              <span className="mb-1 block text-[var(--brass)]">
                01 · Heritage
              </span>
              {text('Solid wood · made to measure', 'সলিড কাঠ · মাপ অনুযায়ী তৈরি')}
            </div>
          </div>

          <div className="hero-copy relative z-10 flex min-h-[calc(100svh-106px)] max-w-[760px] flex-col justify-end px-5 pb-8 pt-56 sm:min-h-[720px] sm:px-10 sm:pb-12 sm:pt-80 lg:min-h-[calc(100svh-132px)] lg:w-[49%] lg:justify-center lg:px-12 lg:py-16 xl:px-16">
            <p className="hero-eyebrow mb-5 flex w-fit items-center gap-3 border border-white/18 bg-black/15 px-4 py-2 text-[9px] font-bold uppercase tracking-[.17em] text-[var(--stone)] backdrop-blur-md sm:text-[10px]">
              <span className="size-1.5 rounded-full bg-[var(--brass)]" />
              {text(
                'Designed in Chattogram · Made for you',
                'চট্টগ্রামে ডিজাইন · আপনার জন্য তৈরি',
              )}
            </p>

            <h1
              aria-label={text(
                'Furniture that belongs to your life.',
                'যে আসবাব আপনারই জীবনের অংশ।',
              )}
              className="hero-heading font-editorial max-w-[720px] text-[clamp(3.25rem,10.5vw,6.8rem)] font-medium leading-[.78] tracking-[-.058em]"
            >
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

            <p className="hero-summary mt-6 max-w-xl text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
              {text(
                'Bespoke furniture, measured for your room and crafted around your taste.',
                'আপনার ঘরের মাপ ও রুচি অনুযায়ী তৈরি কাস্টম আসবাব।',
              )}
            </p>

            <div className="hero-actions mt-7 grid grid-cols-2 gap-2 sm:flex sm:gap-3">
              <a
                href="#bespoke"
                className="inline-flex min-h-13 items-center justify-center gap-2 bg-[var(--ivory)] px-4 text-center text-[10px] font-extrabold uppercase tracking-[.09em] text-[#102c2b] transition-transform hover:-translate-y-1 sm:min-h-14 sm:px-6 sm:text-xs"
              >
                {text('Design a sofa', 'সোফা ডিজাইন করুন')}
                <ArrowUpRight size={15} />
              </a>
              <a
                href="#collections"
                className="inline-flex min-h-13 items-center justify-center border border-white/25 bg-black/10 px-4 text-center text-[10px] font-bold uppercase tracking-[.1em] text-white backdrop-blur-md transition hover:bg-white/10 sm:min-h-14 sm:px-6 sm:text-xs"
              >
                {text('View collection', 'কালেকশন দেখুন')}
              </a>
            </div>

            <div className="hero-proof mt-7 grid grid-cols-3 border-t border-white/18 pt-4 text-[8px] font-bold uppercase leading-4 tracking-[.11em] text-white/66 sm:text-[9px]">
              <span>{text('Made to measure', 'মাপ অনুযায়ী')}</span>
              <span className="border-l border-white/16 pl-3">
                {text('Material guidance', 'উপকরণ পরামর্শ')}
              </span>
              <span className="border-l border-white/16 pl-3">
                {text('Installation support', 'ইনস্টলেশন সহায়তা')}
              </span>
            </div>
          </div>

          <a
            href="#about"
            className="hero-scroll absolute bottom-6 right-7 z-20 hidden items-center gap-3 text-[9px] font-bold uppercase tracking-[.2em] text-white/72 lg:flex"
          >
            {text('Scroll to discover', 'স্ক্রল করে দেখুন')}
            <span className="grid size-9 place-items-center rounded-full border border-white/25">
              <ArrowDown size={14} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
