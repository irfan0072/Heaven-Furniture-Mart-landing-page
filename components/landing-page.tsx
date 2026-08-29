'use client';

import dynamic from 'next/dynamic';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Experience } from '@/components/experience';
import { Hero } from '@/components/hero';
import { media, siteContent } from '@/lib/content';

const BespokeScene = dynamic(
  () => import('@/components/bespoke-scene').then((mod) => mod.BespokeScene),
  { ssr: false },
);

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
    <p className={`mb-5 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.22em] ${light ? 'text-[var(--stone)]' : 'text-[var(--brown)]/65'}`}>
      <span className="h-px w-9 bg-[var(--brass)]" />
      {children}
    </p>
  );
}

export function LandingPage() {
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const update = () => setNavVisible(window.scrollY > window.innerHeight * 0.78);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <Experience>
      <div className="overflow-clip">
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[100] -translate-y-20 bg-white px-4 py-3 text-sm font-bold text-[var(--teal)] focus:translate-y-0"
        >
          Skip to content
        </a>

        <div className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[var(--teal)]/94 text-white backdrop-blur-xl transition-all duration-500 ${navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-14">
            <a href="#top" className="font-editorial text-xl font-semibold">Heaven <span className="text-sm font-normal text-[var(--stone)]">Furniture Mart</span></a>
            <nav className="hidden items-center gap-7 text-[10px] font-bold uppercase tracking-[.14em] md:flex" aria-label="Sticky navigation">
              <a href="#about">About</a>
              <a href="#collections">Collections</a>
              <a href="#bespoke">Bespoke</a>
              <a href="#why-heaven">Why Heaven</a>
              <a href="#showroom">Showroom</a>
            </nav>
            <a href={siteContent.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[var(--ivory)] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[.1em] text-[#102c2b]">
              Quote <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <Hero />

        <div id="main-content">
          <section id="about" className="relative bg-[var(--ivory)] px-5 py-28 sm:px-8 lg:px-14 lg:py-44">
            <div className="mx-auto grid max-w-[1380px] items-center gap-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-24">
              <div data-reveal>
                <Eyebrow>Since 2020 · Chattogram</Eyebrow>
                <h2 className="font-editorial max-w-[720px] text-[clamp(3.5rem,6.8vw,7.8rem)] font-medium leading-[.85] tracking-[-.045em]">
                  More Than Furniture. <em className="font-normal text-[var(--wood)]">A Reflection of You.</em>
                </h2>
                <p className="mt-9 max-w-xl text-[15px] leading-8 text-[var(--brown)]/74">
                  Heaven Furniture Mart is one of Chattogram’s leading bespoke furniture brands. Since 2020, we have designed and crafted premium furniture around the people and spaces it belongs to—not around the limits of mass production.
                </p>
              </div>
              <figure className="relative min-h-[620px] overflow-hidden bg-[var(--stone)]" data-image>
                <img src={media.introduction.src} alt={media.introduction.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <figcaption className="absolute bottom-0 left-0 bg-[var(--ivory)] px-6 py-5 text-[10px] font-bold uppercase tracking-[.18em]">
                  Founded by Abul Kalam Bhuiyan
                </figcaption>
              </figure>
            </div>
          </section>

          <section id="collections" className="bg-[#ebe4d8] px-5 py-28 sm:px-8 lg:px-14 lg:py-40">
            <div className="mx-auto max-w-[1480px]">
              <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end" data-reveal>
                <div>
                  <Eyebrow>Collections</Eyebrow>
                  <h2 className="font-editorial max-w-3xl text-[clamp(3.2rem,6vw,6.8rem)] font-medium leading-[.88] tracking-[-.04em]">Made for Every Part of Your Life</h2>
                </div>
                <p className="max-w-sm text-sm leading-7 text-[var(--brown)]/65">A visual introduction to the rooms we shape. Every piece begins with your dimensions and your way of living.</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {siteContent.collections.map((collection, index) => (
                  <article key={collection.title} className={`group relative overflow-hidden bg-[var(--teal)] ${index === 0 || index === 3 ? 'min-h-[640px]' : 'min-h-[510px]'}`} data-reveal>
                    <img src={collection.image} alt={`Editorial placeholder for the ${collection.title} collection`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-1000 group-hover:scale-[1.035] group-hover:opacity-65" />
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

          <section id="bespoke" className="relative h-[360vh] bg-[var(--teal-deep)] text-white">
            <div className="sticky top-0 h-screen overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(179,148,94,.18),transparent_30%)]" />
              <div className="relative mx-auto grid h-full max-w-[1480px] items-center px-5 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:px-14">
                <div className="relative z-10 py-20 lg:py-24">
                  <Eyebrow light>The Heaven Difference</Eyebrow>
                  <h2 className="font-editorial max-w-2xl text-[clamp(2.85rem,5.8vw,6.9rem)] font-medium leading-[.85] tracking-[-.045em]">
                    Your Space.<br />Your Measurements.<br /><em className="font-normal text-[var(--brass)]">Your Story.</em>
                  </h2>
                  <p className="mt-7 max-w-xl text-sm leading-7 text-white/65">
                    Choose the dimensions, materials, finish, comfort, and character. Our team transforms your ideas into furniture made specifically for your home or workplace.
                  </p>
                  <a href={siteContent.whatsapp} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 border-b border-[var(--brass)] pb-2 text-xs font-extrabold uppercase tracking-[.14em]">
                    Start Your Custom Piece <ArrowRight size={15} />
                  </a>
                  <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 lg:mt-12 lg:max-w-xl lg:gap-x-8 lg:gap-y-7">
                    {siteContent.process.map((step) => (
                      <div key={step.number} data-process-step className="border-t border-white/15 pt-3 opacity-100 lg:pt-4 lg:opacity-20">
                        <span className="text-[10px] font-bold tracking-[.18em] text-[var(--brass)]">{step.number}</span>
                        <h3 className="mt-2 font-editorial text-xl">{step.title}</h3>
                        <p className="mt-1 text-[10px] leading-4 text-white/55 lg:text-[11px] lg:leading-5">{step.copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:relative lg:right-auto lg:block lg:h-[76vh] lg:w-full">
                  <BespokeScene />
                  <div className="absolute right-[10%] top-[22%] hidden items-center gap-3 text-[9px] uppercase tracking-[.18em] text-[var(--stone)] lg:flex"><span className="h-px w-20 bg-[var(--brass)]/50" /> Upholstery</div>
                  <div className="absolute bottom-[22%] left-[7%] hidden items-center gap-3 text-[9px] uppercase tracking-[.18em] text-[var(--stone)] lg:flex">Brass detail <span className="h-px w-20 bg-[var(--brass)]/50" /></div>
                </div>
              </div>
            </div>
          </section>

          <section id="why-heaven" className="bg-[var(--ivory)] px-5 py-28 sm:px-8 lg:px-14 lg:py-44">
            <div className="mx-auto max-w-[1380px]">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-28">
                <div data-reveal>
                  <Eyebrow>Why Heaven</Eyebrow>
                  <h2 className="font-editorial text-[clamp(3.4rem,5.6vw,6.3rem)] font-medium leading-[.88] tracking-[-.04em]">Crafted with Care. Chosen with Confidence.</h2>
                </div>
                <div className="grid sm:grid-cols-2">
                  {siteContent.trust.map((point) => (
                    <div key={point} className="flex min-h-28 gap-4 border-b border-[var(--teal)]/15 py-6 sm:px-5" data-reveal>
                      <Check size={17} strokeWidth={1.4} className="mt-1 shrink-0 text-[var(--brass)]" />
                      <p className="text-sm leading-6 text-[var(--brown)]/78">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-28 space-y-24">
                {craftDetails.map((detail, index) => (
                  <article key={detail.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                    <figure className={`relative min-h-[520px] overflow-hidden ${index % 2 ? 'lg:order-2' : ''}`} data-image>
                      <img src={detail.image.src} alt={detail.image.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                    </figure>
                    <div className={index % 2 ? 'lg:order-1' : ''} data-reveal>
                      <Eyebrow>{detail.label}</Eyebrow>
                      <h3 className="font-editorial text-[clamp(3rem,5vw,5.7rem)] leading-[.9] tracking-[-.04em]">{detail.title}</h3>
                      <p className="mt-7 max-w-md text-sm leading-7 text-[var(--brown)]/68">{detail.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#ded4c5] px-5 py-28 sm:px-8 lg:px-14 lg:py-40">
            <div className="mx-auto grid max-w-[1380px] items-stretch gap-0 lg:grid-cols-[1fr_1.1fr]">
              <figure className="relative min-h-[580px] overflow-hidden" data-image>
                <img src={media.founder.src} alt={media.founder.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              </figure>
              <blockquote className="flex flex-col justify-center bg-[var(--teal)] p-8 text-white sm:p-14 lg:p-20" data-reveal>
                <Sparkles size={24} strokeWidth={1.2} className="mb-9 text-[var(--brass)]" />
                <p className="font-editorial text-[clamp(2.2rem,3.5vw,4.4rem)] leading-[1.03] tracking-[-.025em]">
                  “At Heaven Furniture Mart, we believe furniture is more than just function; it is a reflection of lifestyle, taste, and comfort. Every piece we create is designed to bring lasting elegance into the homes of our clients.”
                </p>
                <footer className="mt-10 border-t border-white/15 pt-6 text-xs uppercase tracking-[.14em] text-white/65">
                  <strong className="block text-white">Abul Kalam Bhuiyan</strong>
                  Managing Director
                </footer>
                <p className="mt-8 text-xs text-[var(--stone)]">Trusted by hundreds of happy homeowners.</p>
              </blockquote>
            </div>
          </section>

          <section id="journey" className="bg-[var(--teal-deep)] px-5 py-28 text-white sm:px-8 lg:px-14 lg:py-44">
            <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[.7fr_1.3fr]">
              <div data-reveal>
                <Eyebrow light>Our Journey</Eyebrow>
                <h2 className="font-editorial text-[clamp(3.5rem,5.5vw,6.5rem)] leading-[.86] tracking-[-.045em]">A young brand, built with purpose.</h2>
              </div>
              <ol className="relative pl-10">
                <span data-timeline-line className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px origin-top bg-[var(--brass)]" />
                {siteContent.timeline.map(([year, event]) => (
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
                  <Eyebrow>Visit Us</Eyebrow>
                  <h2 className="font-editorial text-[clamp(3.4rem,5.8vw,6.5rem)] leading-[.88] tracking-[-.04em]">Experience the Craft in Person.</h2>
                  <p className="mt-8 max-w-md text-sm leading-7 text-[var(--brown)]/68">Visit our Agrabad showroom and explore premium materials, thoughtful details, and furniture created for distinctive spaces.</p>
                  <address className="mt-8 flex gap-4 not-italic text-sm leading-6"><MapPin size={18} className="mt-1 shrink-0 text-[var(--brass)]" />{siteContent.location}</address>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <a href={siteContent.directions} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 bg-[var(--teal)] px-5 text-xs font-bold uppercase tracking-[.1em] text-white">Get Directions <ArrowUpRight size={15} /></a>
                    <a href="tel:+8801960481983" className="inline-flex min-h-12 items-center gap-2 border border-[var(--teal)]/20 px-5 text-xs font-bold uppercase tracking-[.1em]"><Phone size={15} /> Call {siteContent.phone}</a>
                  </div>
                </div>
                <figure className="relative min-h-[620px] overflow-hidden" data-image>
                  <img src={media.showroom.src} alt={media.showroom.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute bottom-6 right-6 bg-[var(--ivory)] p-5 text-[10px] font-bold uppercase tracking-[.16em]">Agrabad · Chattogram</div>
                </figure>
              </div>
            </div>
          </section>

          <section className="relative min-h-[92vh] overflow-hidden bg-[var(--teal)] px-5 py-28 text-white sm:px-8 lg:px-14">
            <img src={media.closing.src} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--teal-deep)] via-[var(--teal)]/90 to-[var(--teal)]/25" />
            <div className="relative mx-auto flex min-h-[70vh] max-w-[1380px] items-center">
              <div className="max-w-4xl" data-reveal>
                <Eyebrow light>Begin your piece</Eyebrow>
                <h2 className="font-editorial text-[clamp(3.7rem,7vw,8.6rem)] leading-[.83] tracking-[-.05em]">Let’s Create Something That Belongs Only to You.</h2>
                <p className="mt-8 max-w-xl text-sm leading-7 text-white/68">Tell us about your space and the piece you have in mind. Begin with a free design consultation.</p>
                <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <a href={siteContent.whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 bg-[var(--ivory)] px-7 text-xs font-extrabold uppercase tracking-[.12em] text-[#102c2b]">Request a Quote on WhatsApp <MessageCircle size={17} /></a>
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
                <p className="mt-4 text-xs uppercase tracking-[.18em] text-[var(--stone)]">{siteContent.tagline}</p>
              </div>
              <div>
                <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--brass)]">Visit</h3>
                <p className="text-sm leading-7 text-white/60">{siteContent.location}</p>
              </div>
              <div>
                <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--brass)]">Contact</h3>
                <a href="tel:+8801960481983" className="block text-sm leading-7 text-white/60">{siteContent.phone}</a>
                <a href={`mailto:${siteContent.email}`} className="block break-all text-sm leading-7 text-white/60">{siteContent.email}</a>
              </div>
              <div>
                <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-[var(--brass)]">Follow</h3>
                <div className="flex gap-3">
                  <a href={siteContent.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-10 place-items-center border border-white/15 text-[10px] font-bold">FB</a>
                  <a href={siteContent.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-10 place-items-center border border-white/15 text-[10px] font-bold">IG</a>
                  <a href={siteContent.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="grid size-10 place-items-center border border-white/15 text-[10px] font-bold">YT</a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 pt-7 text-[10px] uppercase tracking-[.12em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Heaven Furniture Mart. All rights reserved.</p>
              <a href="#top" className="inline-flex items-center gap-2 text-white/65">Back to top <ArrowUp size={14} /></a>
            </div>
          </div>
        </footer>

        <a href={siteContent.whatsapp} target="_blank" rel="noreferrer" className="fixed inset-x-4 bottom-4 z-50 flex min-h-14 items-center justify-center gap-3 bg-[#1f7a50] px-5 text-xs font-extrabold uppercase tracking-[.1em] text-white shadow-2xl md:hidden">
          <MessageCircle size={18} /> Request a Quote
        </a>
      </div>
    </Experience>
  );
}
