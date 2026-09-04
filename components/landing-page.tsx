'use client';

import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { DesignStudio } from '@/components/design-studio';
import { Experience } from '@/components/experience';
import { FaqSection } from '@/components/faq-section';
import { Hero } from '@/components/hero';
import { LanguageToggle, useLanguage } from '@/components/language-provider';
import { MaterialLayers } from '@/components/material-layers';
import { ReelsSection } from '@/components/reels-section';
import { media, siteContent } from '@/lib/content';

const craftDetails = [
  {
    label: 'Measured for your life',
    title: 'Every centimetre considered.',
    copy: 'Rooms are personal. We shape proportion, comfort, and function around how your home or workplace is actually used.',
    image: media.craft,
  },
  {
    label: 'Material with character',
    title: 'Made to age beautifully.',
    copy: 'Wood, upholstery, hardware, and finish are selected as one composition—balanced for touch, durability, and quiet elegance.',
    image: media.founder,
  },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.2em] ${light ? 'text-[var(--stone)]' : 'text-[var(--brown)]/65'}`}>
      <span className="h-px w-9 bg-[var(--brass)]" />
      {children}
    </p>
  );
}

export function LandingPage() {
  const [navVisible, setNavVisible] = useState(false);
  const [stickyMenuOpen, setStickyMenuOpen] = useState(false);
  const { language, text } = useLanguage();

  const collections = siteContent.collections.map((item, index) => ({
    ...item,
    title: language === 'bn' ? ['লিভিং রুম', 'বেডরুম', 'ডাইনিং', 'অফিস ও স্টাডি'][index] : item.title,
    copy: language === 'bn' ? ['সোফা, কফি টেবিল, টিভি ইউনিট ও কনসোল।', 'বেড, ওয়ারড্রোব, ড্রেসিং টেবিল ও বেডসাইড টেবিল।', 'ডাইনিং টেবিল, চেয়ার ও ক্যাবিনেট।', 'এক্সিকিউটিভ টেবিল, বুকশেলফ ও ওয়ার্কস্টেশন।'][index] : item.copy,
  }));
  const trust = language === 'bn' ? [
    'বিনামূল্যে ডিজাইন পরামর্শ', 'আপনার জায়গার জন্য সম্পূর্ণ কাস্টম', 'প্রিমিয়াম কাঠ ও উপকরণ', 'দক্ষ নিজস্ব কারিগর', 'আগ্রাবাদে বড় শোরুম', 'ডেলিভারি ও ইনস্টলেশন অন্তর্ভুক্ত', 'সহজ পেমেন্ট সুবিধা', 'শত শত সন্তুষ্ট বাড়ির মালিকের আস্থা',
  ] : siteContent.trust;
  const timeline = language === 'bn' ? [
    ['২০২০', 'আবুল কালাম ভূঁইয়া কর্তৃক প্রতিষ্ঠিত'], ['২০২১', 'আগ্রাবাদ শোরুম উদ্বোধন'], ['২০২৪–২০২৫', 'ইন্টারন্যাশনাল ফার্নিচার ফেয়ার, চট্টগ্রামে অংশগ্রহণ'], ['২০২৫', 'চেম্বার অব কমার্সের সদস্যপদ অর্জন'], ['২০২৬', 'দেশব্যাপী BFIOA স্বীকৃতি অর্জন'],
  ] : siteContent.timeline;
  const localizedCraft = language === 'bn' ? [
    { label: 'আপনার জীবনের জন্য মাপা', title: 'প্রতিটি সেন্টিমিটার গুরুত্বপূর্ণ।', copy: 'প্রতিটি ঘর আলাদা। আপনার বাড়ি বা কর্মস্থল যেভাবে ব্যবহৃত হয়, তার ভিত্তিতে আমরা অনুপাত, আরাম ও কার্যকারিতা তৈরি করি।', image: media.craft },
    { label: 'চরিত্রময় উপকরণ', title: 'সময়ের সঙ্গে আরও সুন্দর।', copy: 'কাঠ, কাপড়, হার্ডওয়্যার ও ফিনিশ—সবকিছু একসঙ্গে বেছে নেওয়া হয় স্পর্শ, স্থায়িত্ব ও নীরব সৌন্দর্যের ভারসাম্যে।', image: media.founder },
  ] : craftDetails;

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setNavVisible(!entry.isIntersecting), { threshold: 0.05 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <Experience>
      <div className="overflow-clip">
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[100] -translate-y-20 bg-white px-4 py-3 text-sm font-bold text-[var(--teal)] focus:translate-y-0"
        >
          {text('Skip to content', 'মূল কনটেন্টে যান')}
        </a>

        <div aria-hidden={!navVisible} className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[var(--teal)]/96 text-white backdrop-blur-xl transition-all duration-500 ${navVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}>
          <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-14">
            <a href="#top" className="font-editorial text-xl font-semibold">Heaven <span className="hidden text-sm font-normal text-[var(--stone)] sm:inline">Furniture Mart</span></a>
            <nav className="hidden items-center gap-7 text-[10px] font-bold uppercase tracking-[.14em] xl:flex" aria-label="Sticky navigation">
              <a href="#about">{text('About', 'আমাদের সম্পর্কে')}</a>
              <a href="#collections">{text('Collections', 'কালেকশন')}</a>
              <a href="#reels">{text('Reels', 'রিলস')}</a>
              <a href="#bespoke">{text('Bespoke', 'কাস্টম ডিজাইন')}</a>
              <a href="#why-heaven">{text('Why Heaven', 'কেন হেভেন')}</a>
              <a href="#showroom">{text('Showroom', 'শোরুম')}</a>
            </nav>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <button type="button" onClick={() => setStickyMenuOpen((open) => !open)} aria-expanded={stickyMenuOpen} aria-controls="sticky-mobile-menu" aria-label={stickyMenuOpen ? text('Close section menu', 'সেকশন মেনু বন্ধ করুন') : text('Open section menu', 'সেকশন মেনু খুলুন')} className="grid size-10 place-items-center border border-white/20 xl:hidden">{stickyMenuOpen ? <X size={18} /> : <Menu size={18} />}</button>
              <a href={siteContent.whatsapp} target="_blank" rel="noreferrer" className="hidden min-h-10 items-center gap-2 bg-[var(--ivory)] px-4 text-[10px] font-extrabold uppercase tracking-[.1em] text-[#102c2b] xl:inline-flex">{text('Quote', 'কোটেশন')} <ArrowUpRight size={14} /></a>
            </div>
          </div>
          {stickyMenuOpen && (
            <nav id="sticky-mobile-menu" className="grid border-t border-white/12 bg-[var(--teal-deep)] px-5 py-3 text-sm xl:hidden" aria-label={text('Section navigation', 'সেকশন নেভিগেশন')}>
              {[[text('About', 'আমাদের সম্পর্কে'), '#about'], [text('Collections', 'কালেকশন'), '#collections'], [text('Reels', 'রিলস'), '#reels'], [text('Design your sofa', 'সোফা ডিজাইন করুন'), '#bespoke'], [text('Why Heaven', 'কেন হেভেন'), '#why-heaven'], [text('Visit showroom', 'শোরুমে আসুন'), '#showroom'], [text('Common questions', 'সাধারণ প্রশ্ন'), '#faq']].map(([label, href]) => <a key={href} href={href} onClick={() => setStickyMenuOpen(false)} className="flex min-h-12 items-center justify-between border-b border-white/10 last:border-0">{label}<ArrowUpRight size={14} /></a>)}
            </nav>
          )}
        </div>

        <Hero />

        <div id="main-content">
          <section id="about" className="relative bg-[var(--ivory)] px-5 py-20 sm:px-8 lg:px-14 lg:py-44">
            <div className="mx-auto grid max-w-[1380px] items-center gap-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-24">
              <div data-reveal>
                <Eyebrow>{text('Since 2020 · Chattogram', '২০২০ থেকে · চট্টগ্রাম')}</Eyebrow>
                <h2 className="font-editorial max-w-[720px] text-[clamp(3.5rem,6.8vw,7.8rem)] font-medium leading-[.85] tracking-[-.045em]">
                  {text('More Than Furniture. ', 'শুধু আসবাব নয়। ')}<em className="font-normal text-[var(--wood)]">{text('A Reflection of You.', 'আপনারই প্রতিচ্ছবি।')}</em>
                </h2>
                <p className="mt-9 max-w-xl text-base leading-8 text-[var(--brown)]/74">
                  {text('Heaven Furniture Mart is one of Chattogram’s leading bespoke furniture brands. Since 2020, we have designed and crafted premium furniture around the people and spaces it belongs to—not around the limits of mass production.', 'হেভেন ফার্নিচার মার্ট চট্টগ্রামের অন্যতম শীর্ষ কাস্টম ফার্নিচার ব্র্যান্ড। ২০২০ সাল থেকে আমরা গণ-উৎপাদনের সীমা নয়, মানুষ ও তার জায়গাকে কেন্দ্র করে প্রিমিয়াম আসবাব ডিজাইন ও তৈরি করছি।')}
                </p>
              </div>
              <figure className="relative min-h-[420px] overflow-hidden bg-[var(--stone)] sm:min-h-[620px]" data-image>
                <img src={media.introduction.src} alt={media.introduction.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <figcaption className="absolute bottom-0 left-0 bg-[var(--ivory)] px-6 py-5 text-[10px] font-bold uppercase tracking-[.18em]">
                  {text('Founded by Abul Kalam Bhuiyan', 'প্রতিষ্ঠাতা আবুল কালাম ভূঁইয়া')}
                </figcaption>
              </figure>
            </div>
          </section>

          <section id="collections" className="bg-[#ebe4d8] px-5 py-20 sm:px-8 lg:px-14 lg:py-40">
            <div className="mx-auto max-w-[1480px]">
              <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end" data-reveal>
                <div>
                  <Eyebrow>{text('Collections', 'কালেকশন')}</Eyebrow>
                  <h2 className="font-editorial max-w-3xl text-[clamp(3.2rem,6vw,6.8rem)] font-medium leading-[.88] tracking-[-.04em]">{text('Made for Every Part of Your Life', 'আপনার জীবনের প্রতিটি মুহূর্তের জন্য')}</h2>
                </div>
                <p className="max-w-sm text-base leading-7 text-[var(--brown)]/65">{text('A visual introduction to the rooms we shape. Every piece begins with your dimensions and your way of living.', 'আমাদের তৈরি ঘরগুলোর একটি ঝলক। প্রতিটি আসবাব শুরু হয় আপনার মাপ ও জীবনযাপনের ধরন থেকে।')}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {collections.map((collection, index) => (
                  <article key={collection.title} className={`group relative min-h-[460px] overflow-hidden bg-[var(--teal)] sm:min-h-[520px] ${index === 0 || index === 3 ? 'lg:min-h-[640px]' : 'lg:min-h-[510px]'}`} data-reveal>
                    <img src={collection.image} alt={`${collection.title} furniture collection`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-1000 group-hover:scale-[1.035] group-hover:opacity-65" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071b1a]/90 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-white sm:p-10">
                      <div>
                        <span className="mb-4 block text-[10px] font-bold uppercase tracking-[.2em] text-[var(--stone)]">0{index + 1}</span>
                        <h3 className="font-editorial text-4xl sm:text-5xl">{collection.title}</h3>
                        <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">{collection.copy}</p>
                      </div>
                      <ArrowUpRight className="mb-2 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <ReelsSection />

          <DesignStudio />

          <MaterialLayers />

          <section id="why-heaven" className="bg-[var(--ivory)] px-5 py-20 sm:px-8 lg:px-14 lg:py-44">
            <div className="mx-auto max-w-[1380px]">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-28">
                <div data-reveal>
                  <Eyebrow>{text('Why Heaven', 'কেন হেভেন')}</Eyebrow>
                  <h2 className="font-editorial text-[clamp(3.4rem,5.6vw,6.3rem)] font-medium leading-[.88] tracking-[-.04em]">{text('Crafted with Care. Chosen with Confidence.', 'যত্নে তৈরি। আস্থায় নির্বাচিত।')}</h2>
                </div>
                <div className="grid sm:grid-cols-2">
                  {trust.map((point) => (
                    <div key={point} className="flex min-h-28 gap-4 border-b border-[var(--teal)]/15 py-6 sm:px-5" data-reveal>
                      <Check size={17} strokeWidth={1.4} className="mt-1 shrink-0 text-[var(--brass)]" />
                      <p className="text-base leading-7 text-[var(--brown)]/78">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-20 space-y-20 lg:mt-28 lg:space-y-24">
                {localizedCraft.map((detail, index) => (
                  <article key={detail.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                    <figure className={`relative min-h-[400px] overflow-hidden sm:min-h-[520px] ${index % 2 ? 'lg:order-2' : ''}`} data-image>
                      <img src={detail.image.src} alt={detail.image.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                    </figure>
                    <div className={index % 2 ? 'lg:order-1' : ''} data-reveal>
                      <Eyebrow>{detail.label}</Eyebrow>
                      <h3 className="font-editorial text-[clamp(3rem,5vw,5.7rem)] leading-[.9] tracking-[-.04em]">{detail.title}</h3>
                      <p className="mt-7 max-w-md text-base leading-8 text-[var(--brown)]/68">{detail.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#ded4c5] px-5 py-28 sm:px-8 lg:px-14 lg:py-40">
            <div className="mx-auto grid max-w-[1380px] items-stretch gap-0 lg:grid-cols-[1fr_1.1fr]">
              <figure className="relative min-h-[430px] overflow-hidden sm:min-h-[580px]" data-image>
                <img src={media.founder.src} alt={media.founder.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              </figure>
              <blockquote className="flex flex-col justify-center bg-[var(--teal)] p-8 text-white sm:p-14 lg:p-20" data-reveal>
                <Sparkles size={24} strokeWidth={1.2} className="mb-9 text-[var(--brass)]" />
                <p className="font-editorial text-[clamp(2.2rem,3.5vw,4.4rem)] leading-[1.03] tracking-[-.025em]">{text('“At Heaven Furniture Mart, we believe furniture is more than just function; it is a reflection of lifestyle, taste, and comfort. Every piece we create is designed to bring lasting elegance into the homes of our clients.”', '“হেভেন ফার্নিচার মার্টে আমরা বিশ্বাস করি, আসবাব শুধু ব্যবহারিক বস্তু নয়; এটি জীবনধারা, রুচি ও আরামের প্রতিফলন। আমাদের প্রতিটি সৃষ্টি গ্রাহকের ঘরে দীর্ঘস্থায়ী সৌন্দর্য নিয়ে আসার জন্য ডিজাইন করা।”')}</p>
                <footer className="mt-10 border-t border-white/15 pt-6 text-xs uppercase tracking-[.14em] text-white/65">
                  <strong className="block text-white">Abul Kalam Bhuiyan</strong>
                  {text('Managing Director', 'ব্যবস্থাপনা পরিচালক')}
                </footer>
                <p className="mt-8 text-xs text-[var(--stone)]">{text('Trusted by hundreds of happy homeowners.', 'শত শত সন্তুষ্ট বাড়ির মালিকের আস্থা।')}</p>
              </blockquote>
            </div>
          </section>

          <section id="journey" className="bg-[var(--teal-deep)] px-5 py-28 text-white sm:px-8 lg:px-14 lg:py-44">
            <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[.7fr_1.3fr]">
              <div data-reveal>
                <Eyebrow light>{text('Our Journey', 'আমাদের পথচলা')}</Eyebrow>
                <h2 className="font-editorial text-[clamp(3.5rem,5.5vw,6.5rem)] leading-[.86] tracking-[-.045em]">{text('A young brand, built with purpose.', 'নতুন প্রজন্মের ব্র্যান্ড, দৃঢ় উদ্দেশ্যে তৈরি।')}</h2>
              </div>
              <ol className="relative pl-10">
                <span data-timeline-line className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px origin-top bg-[var(--brass)]" />
                {timeline.map(([year, event]) => (
                  <li key={year + event} className="relative grid gap-2 border-b border-white/12 py-8 sm:grid-cols-[150px_1fr]" data-reveal>
                    <span className="absolute -left-[43px] top-10 size-[7px] rounded-full bg-[var(--brass)]" />
                    <strong className="font-editorial text-3xl font-normal text-[var(--brass)]">{year}</strong>
                    <span className="text-sm leading-7 text-white/72">{event}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section id="showroom" className="bg-[var(--ivory)] px-5 py-28 sm:px-8 lg:px-14 lg:py-44">
            <div className="mx-auto max-w-[1380px]">
              <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
                <div className="flex flex-col justify-center" data-reveal>
                  <Eyebrow>{text('Visit Us', 'আমাদের শোরুমে আসুন')}</Eyebrow>
                  <h2 className="font-editorial text-[clamp(3.4rem,5.8vw,6.5rem)] leading-[.88] tracking-[-.04em]">{text('Experience the Craft in Person.', 'নিজ চোখে দেখুন আমাদের কারুশিল্প।')}</h2>
                  <p className="mt-8 max-w-md text-base leading-8 text-[var(--brown)]/68">{text('Visit our Agrabad showroom and explore premium materials, thoughtful details, and furniture created for distinctive spaces.', 'আগ্রাবাদ শোরুমে এসে প্রিমিয়াম উপকরণ, সূক্ষ্ম ডিটেইল এবং বিশেষ জায়গার জন্য তৈরি আসবাব কাছ থেকে দেখুন।')}</p>
                  <address className="mt-8 flex gap-4 not-italic text-sm leading-6"><MapPin size={18} className="mt-1 shrink-0 text-[var(--brass)]" />{text(siteContent.location, 'আগ্রাবাদ অ্যাক্সেস রোড, চট্টগ্রাম, বাংলাদেশ')}</address>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <a href={siteContent.directions} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 bg-[var(--teal)] px-5 text-xs font-bold uppercase tracking-[.1em] text-white">{text('Get Directions', 'দিকনির্দেশনা নিন')} <ArrowUpRight size={15} /></a>
                    <a href="tel:+8801960481983" className="inline-flex min-h-12 items-center gap-2 border border-[var(--teal)]/20 px-5 text-xs font-bold uppercase tracking-[.1em]"><Phone size={15} /> {text('Call', 'কল করুন')} {siteContent.phone}</a>
                  </div>
                </div>
                <figure className="relative min-h-[420px] overflow-hidden sm:min-h-[620px]" data-image>
                  <img src={media.showroom.src} alt={media.showroom.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute bottom-6 right-6 bg-[var(--ivory)] p-5 text-[10px] font-bold uppercase tracking-[.16em]">{text('Agrabad · Chattogram', 'আগ্রাবাদ · চট্টগ্রাম')}</div>
                </figure>
              </div>
            </div>
          </section>

          <FaqSection />

          <section className="relative min-h-[92vh] overflow-hidden bg-[var(--teal)] px-5 py-28 text-white sm:px-8 lg:px-14">
            <img src={media.closing.src} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--teal-deep)] via-[var(--teal)]/90 to-[var(--teal)]/25" />
            <div className="relative mx-auto flex min-h-[70vh] max-w-[1380px] items-center">
              <div className="max-w-4xl" data-reveal>
                <Eyebrow light>{text('Begin your piece', 'আপনার ডিজাইন শুরু করুন')}</Eyebrow>
                <h2 className="font-editorial text-[clamp(3.7rem,7vw,8.6rem)] leading-[.83] tracking-[-.05em]">{text('Let’s Create Something That Belongs Only to You.', 'চলুন এমন কিছু তৈরি করি, যা শুধুই আপনার।')}</h2>
                <p className="mt-8 max-w-xl text-sm leading-7 text-white/68">{text('Tell us about your space and the piece you have in mind. Begin with a free design consultation.', 'আপনার জায়গা ও পছন্দের আসবাব সম্পর্কে বলুন। বিনামূল্যে ডিজাইন পরামর্শ দিয়ে শুরু করুন।')}</p>
                <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <a href={siteContent.whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 bg-[var(--ivory)] px-7 text-xs font-extrabold uppercase tracking-[.12em] text-[#102c2b]">{text('Request a Quote on WhatsApp', 'WhatsApp-এ কোটেশন নিন')} <MessageCircle size={17} /></a>
                  <a href={`mailto:${siteContent.email}`} className="inline-flex items-center gap-2 text-xs text-white/75"><Mail size={15} />{siteContent.email}</a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="bg-[#061817] px-5 pb-28 pt-20 text-white sm:px-8 lg:px-14 lg:pb-12">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-12 border-b border-white/12 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
              <div>
                <div className="font-editorial text-4xl">Heaven Furniture Mart</div>
                <p className="mt-4 text-xs uppercase tracking-[.18em] text-[var(--stone)]">{text(siteContent.tagline, 'ডিজাইনড। ক্রাফটেড। কাস্টমাইজড।')}</p>
              </div>
              <div>
                <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--brass)]">{text('Visit', 'ঠিকানা')}</h3>
                <p className="text-sm leading-7 text-white/60">{text(siteContent.location, 'আগ্রাবাদ অ্যাক্সেস রোড, চট্টগ্রাম, বাংলাদেশ')}</p>
              </div>
              <div>
                <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--brass)]">{text('Contact', 'যোগাযোগ')}</h3>
                <a href="tel:+8801960481983" className="block text-sm leading-7 text-white/60">{siteContent.phone}</a>
                <a href={`mailto:${siteContent.email}`} className="block break-all text-sm leading-7 text-white/60">{siteContent.email}</a>
              </div>
              <div>
                <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--brass)]">{text('Follow', 'অনুসরণ করুন')}</h3>
                <div className="flex gap-3">
                  <a href={siteContent.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-10 place-items-center border border-white/15 text-[10px] font-bold">FB</a>
                  <a href={siteContent.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-10 place-items-center border border-white/15 text-[10px] font-bold">IG</a>
                  <a href={siteContent.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="grid size-10 place-items-center border border-white/15 text-[10px] font-bold">YT</a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 pt-7 text-[10px] uppercase tracking-[.12em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Heaven Furniture Mart. {text('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}</p>
              <a href="#top" className="inline-flex items-center gap-2 text-white/65">{text('Back to top', 'উপরে ফিরে যান')} <ArrowUp size={14} /></a>
            </div>
          </div>
        </footer>

        {navVisible && (
          <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[var(--teal)]/10 bg-[var(--ivory)]/96 p-2 pb-[max(.5rem,env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,.12)] backdrop-blur-xl md:hidden">
            <a href="tel:+8801960481983" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[var(--teal)]/15 text-sm font-bold text-[var(--teal)]"><Phone size={17} /> {text('Call us', 'ফোন করুন')}</a>
            <a href={siteContent.whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#1f7a50] text-sm font-bold text-white"><MessageCircle size={18} /> WhatsApp</a>
          </div>
        )}
      </div>
    </Experience>
  );
}
