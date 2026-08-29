'use client';

import dynamic from 'next/dynamic';
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { siteContent } from '@/lib/content';

const HeroScene = dynamic(() => import('./hero-scene').then((mod) => mod.HeroScene), { ssr: false });

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="grain relative min-h-[100svh] overflow-hidden bg-[var(--teal)] text-[var(--ivory)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_36%,rgba(180,130,85,.22),transparent_31%),linear-gradient(110deg,#102c2b_0%,#102c2b_50%,#0a2221_100%)]" />
      <header className="relative z-20 mx-auto flex h-24 max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a href="#top" className="font-editorial text-xl font-semibold leading-[.85] tracking-[-.02em] sm:text-2xl">
          Heaven <span className="block text-sm font-normal tracking-[.12em] text-[var(--stone)]">Furniture Mart</span>
        </a>
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[.13em] text-[var(--stone)] lg:flex" aria-label="Primary navigation">
          <a href="#about" className="transition-colors hover:text-white">About</a>
          <a href="#collections" className="transition-colors hover:text-white">Collections</a>
          <a href="#bespoke" className="transition-colors hover:text-white">Bespoke</a>
          <a href="#showroom" className="transition-colors hover:text-white">Showroom</a>
        </nav>
        <a href={siteContent.whatsapp} target="_blank" rel="noreferrer" className="hidden items-center gap-2 border border-[var(--brass)] px-5 py-3 text-xs font-bold uppercase tracking-[.11em] text-white transition-colors hover:bg-[var(--brass)] hover:text-[var(--teal)] sm:flex">
          Request a quote <ArrowUpRight size={15} />
        </a>
        <button
          className="grid size-11 place-items-center border border-white/25 lg:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>

      <div id="mobile-navigation" hidden={!menuOpen} className="absolute inset-x-0 top-24 z-30 border-y border-white/10 bg-[var(--teal-deep)] px-5 py-7 lg:hidden">
        <nav className="grid gap-1 text-sm" aria-label="Mobile navigation">
          {[
            ['About', '#about'],
            ['Collections', '#collections'],
            ['Bespoke', '#bespoke'],
            ['Why Heaven', '#why-heaven'],
            ['Showroom', '#showroom'],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-white/10 py-4">{label}</a>
          ))}
        </nav>
      </div>

      <div id="top" className="relative z-10 mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1480px] items-center px-5 pb-14 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:px-14">
        <div className="relative z-10 max-w-2xl pt-8 lg:pt-0">
          <p className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.22em] text-[var(--stone)]"><span className="h-px w-10 bg-[var(--brass)]" /> Bespoke Furniture · Chattogram</p>
          <h1 className="font-editorial text-[clamp(4.2rem,8vw,8.8rem)] font-medium leading-[.78] tracking-[-.055em]">
            Furniture,<br /><em className="font-normal text-[var(--stone)]">Crafted</em> Around You.
          </h1>
          <p className="mt-8 max-w-xl text-sm leading-7 text-[#d9d5ca] sm:text-base">Custom sofas, beds, dining sets, and interior pieces designed around your space, lifestyle, and taste.</p>
          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a href={siteContent.whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 bg-[var(--ivory)] px-7 text-xs font-extrabold uppercase tracking-[.12em] text-[#102c2b] transition-transform hover:-translate-y-1">Request a Quote on WhatsApp <ArrowUpRight size={16} /></a>
            <a href="#about" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.13em] text-[var(--stone)] hover:text-white">Explore our craft <span className="h-px w-8 bg-[var(--brass)]" /></a>
          </div>
        </div>

        <div className="relative -mx-24 h-[48vh] min-h-[360px] lg:-ml-32 lg:mr-[-8vw] lg:h-[76vh] lg:min-h-[560px]">
          <HeroScene />
          <div className="pointer-events-none absolute inset-x-[18%] bottom-[15%] h-px bg-gradient-to-r from-transparent via-[var(--brass)]/40 to-transparent" />
          <p className="absolute bottom-[8%] right-[16%] text-right text-[10px] font-bold uppercase tracking-[.22em] text-[var(--stone)]/80">Designed.<br />Crafted. Customized.</p>
        </div>
      </div>
      <a href="#about" className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 text-[9px] font-bold uppercase tracking-[.25em] text-white/55 lg:flex">Scroll to enter <ArrowDown size={14} /></a>
    </section>
  );
}
