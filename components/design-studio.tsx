'use client';

import dynamic from 'next/dynamic';
import {
  ArrowUpRight,
  Check,
  Copy,
  Move3D,
  RotateCcw,
  Ruler,
  Sofa,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { siteContent } from '@/lib/content';

const ConfiguratorScene = dynamic(
  () =>
    import('@/components/configurator-scene').then(
      (mod) => mod.ConfiguratorScene,
    ),
  { ssr: false },
);

const fabrics = [
  { name: 'Ivory Bouclé', color: '#ded5c6', premium: 12000 },
  { name: 'Camel Weave', color: '#9d684a', premium: 8000 },
  { name: 'Forest Velvet', color: '#284b42', premium: 16000 },
  { name: 'Graphite Linen', color: '#494846', premium: 10000 },
];

const woods = [
  { name: 'Walnut', color: '#765036' },
  { name: 'Natural Oak', color: '#b58a58' },
  { name: 'Espresso', color: '#35251e' },
];

const firmnessOptions = ['Soft', 'Balanced', 'Supportive'] as const;
const formatFeetInches = (centimetres: number) => {
  const totalInches = Math.round(centimetres / 2.54);
  return `${Math.floor(totalInches / 12)}′ ${totalInches % 12}″`;
};

export function DesignStudio() {
  const [fabricIndex, setFabricIndex] = useState(0);
  const [woodIndex, setWoodIndex] = useState(0);
  const [width, setWidth] = useState(220);
  const [roomWidth, setRoomWidth] = useState(330);
  const [firmness, setFirmness] =
    useState<(typeof firmnessOptions)[number]>('Balanced');
  const [copied, setCopied] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [cameraDistance, setCameraDistance] = useState(6.2);
  const [viewReset, setViewReset] = useState(0);
  const sceneHost = useRef<HTMLDivElement>(null);
  const { language, text } = useLanguage();

  const fabric = fabrics[fabricIndex];
  const wood = woods[woodIndex];
  const clearance = roomWidth - width;
  const fit =
    clearance >= 50
      ? text('Comfortable fit', 'আরামদায়কভাবে মানানসই')
      : clearance >= 20
        ? text('Compact fit', 'কমপ্যাক্টভাবে মানানসই')
        : text('More room needed', 'আরও জায়গা প্রয়োজন');
  const fabricName =
    language === 'bn'
      ? ['আইভরি বুকলে', 'ক্যামেল উইভ', 'ফরেস্ট ভেলভেট', 'গ্রাফাইট লিনেন'][fabricIndex]
      : fabric.name;
  const woodName =
    language === 'bn' ? ['ওয়ালনাট', 'ন্যাচারাল ওক', 'এসপ্রেসো'][woodIndex] : wood.name;
  const firmnessName =
    language === 'bn'
      ? { Soft: 'নরম', Balanced: 'ভারসাম্যপূর্ণ', Supportive: 'দৃঢ়' }[firmness]
      : firmness;
  const summary = text(
    `Heaven custom sofa — ${width} cm wide, ${fabricName}, ${woodName} legs, ${firmnessName.toLowerCase()} comfort. Room width: ${roomWidth} cm (${fit.toLowerCase()}). Please confirm the final design, materials, and quotation.`,
    `হেভেন কাস্টম সোফা — প্রস্থ ${width} সেমি, ${fabricName}, ${woodName} পা, ${firmnessName} আরাম। ঘরের প্রস্থ ${roomWidth} সেমি (${fit})। চূড়ান্ত ডিজাইন, উপকরণ ও কোটেশন নিশ্চিত করুন।`,
  );
  const whatsapp = `https://wa.me/8801960481983?text=${encodeURIComponent(text(`Hello Heaven Furniture Mart, I designed a sofa on your website. ${summary} I would like a final consultation.`, `হ্যালো হেভেন ফার্নিচার মার্ট, আপনাদের ওয়েবসাইটে আমি একটি সোফা ডিজাইন করেছি। ${summary} আমি চূড়ান্ত পরামর্শ নিতে চাই।`))}`;
  const process =
    language === 'bn'
      ? [
          {
            number: '০১',
            title: 'পরামর্শ',
            copy: 'আপনার প্রয়োজন, জায়গা ও ভাবনা আমরা মন দিয়ে শুনি।',
          },
          {
            number: '০২',
            title: 'ডিজাইন',
            copy: 'মাপ, উপকরণ ও সূক্ষ্ম ডিটেইল একসঙ্গে পরিমার্জন করি।',
          },
          {
            number: '০৩',
            title: 'কারুশিল্প',
            copy: 'দক্ষ কারিগরের হাতে অনুমোদিত ডিজাইন বাস্তব রূপ পায়।',
          },
          {
            number: '০৪',
            title: 'ডেলিভারি ও ইনস্টলেশন',
            copy: 'আপনার আসবাব যত্নে পৌঁছে দিয়ে স্থাপন করা হয়।',
          },
        ]
      : siteContent.process;

  useEffect(() => {
    if (!sceneHost.current || !('IntersectionObserver' in window)) {
      setSceneReady(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSceneReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' },
    );
    observer.observe(sceneHost.current);
    return () => observer.disconnect();
  }, []);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="bespoke"
      className="relative overflow-hidden bg-[var(--teal-deep)] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_42%,rgba(179,148,94,.17),transparent_32%)]" />
      <div className="relative mx-auto max-w-[1480px]">
        <div className="mb-12 grid gap-7 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div data-reveal>
            <p className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.2em] text-[var(--stone)]">
              <span className="h-px w-9 bg-[var(--brass)]" />{' '}
              {text('The Bespoke Atelier', 'আপনার পছন্দের সোফা')}
            </p>
            <h2 className="font-editorial max-w-4xl text-[clamp(3.2rem,6.4vw,7.2rem)] leading-[.84] tracking-[-.045em]">
              {text('Made for your ', 'আপনার ঘরের জন্য ')}
              <em className="font-normal text-[var(--brass)]">
                {text('way of living.', 'আপনার মতো করে।')}
              </em>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-white/68" data-reveal>
            {text(
              'Explore an artisan-built sofa in 360°, check its proportion, and save size, comfort, and finish preferences in a clear brief for our craftsmen.',
              'কারুকার্যময় সোফাটি ৩৬০° ঘুরিয়ে দেখুন, অনুপাত যাচাই করুন এবং মাপ, আরাম ও ফিনিশের পছন্দ আমাদের কারিগরদের জন্য একটি পরিষ্কার ব্রিফে সংরক্ষণ করুন।',
            )}
          </p>
        </div>

        <div className="grid overflow-hidden border border-white/12 bg-[#0d2524] shadow-[0_35px_100px_rgba(0,0,0,.25)] lg:grid-cols-[1.25fr_.75fr]">
          <div
            ref={sceneHost}
            className="relative min-h-[430px] overflow-hidden border-b border-white/10 sm:min-h-[560px] md:min-h-[620px] lg:min-h-[720px] lg:border-b-0 lg:border-r"
          >
            <div className="absolute left-3 top-3 z-10 flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-black/25 px-3 text-xs text-white/78 backdrop-blur-md sm:left-5 sm:top-5 sm:px-4">
              <Move3D size={15} />{' '}
              <span className="hidden min-[520px]:inline">
                {text(
                  'Drag to rotate · Scroll or pinch to zoom',
                  'ঘোরাতে ড্র্যাগ · স্ক্রল বা পিঞ্চ করে জুম',
                )}
              </span>
            </div>
            <div className="absolute right-3 top-3 z-20 flex overflow-hidden rounded-full border border-white/14 bg-black/35 text-white backdrop-blur-md sm:right-5 sm:top-5">
              <button
                type="button"
                onClick={() =>
                  setCameraDistance((value) => Math.max(4.4, value - 0.65))
                }
                className="grid size-11 place-items-center border-r border-white/12 transition hover:bg-white/10"
                aria-label={text('Zoom in on sofa', 'সোফা জুম ইন করুন')}
                title={text('Zoom in', 'জুম ইন')}
              >
                <ZoomIn size={17} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCameraDistance((value) => Math.min(8.4, value + 0.65))
                }
                className="grid size-11 place-items-center border-r border-white/12 transition hover:bg-white/10"
                aria-label={text('Zoom out from sofa', 'সোফা জুম আউট করুন')}
                title={text('Zoom out', 'জুম আউট')}
              >
                <ZoomOut size={17} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCameraDistance(6.2);
                  setViewReset((value) => value + 1);
                }}
                className="grid size-11 place-items-center transition hover:bg-white/10"
                aria-label={text('Reset sofa view', 'সোফার ভিউ রিসেট করুন')}
                title={text('Reset view', 'ভিউ রিসেট')}
              >
                <RotateCcw size={17} />
              </button>
            </div>
            <div className="pointer-events-none absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[var(--brass)]">
                  {text(
                    'Interactive 3D size preview',
                    'ইন্টারঅ্যাক্টিভ ৩ডি সাইজ প্রিভিউ',
                  )}
                </p>
                <p className="mt-1 max-w-xs text-xs leading-5 text-white/50">
                  {text(
                    'Preview colours and proportion here, then confirm the final finish against physical samples before production.',
                    'এখানে রঙ ও অনুপাত প্রিভিউ করুন, তারপর তৈরির আগে সরাসরি ম্যাটেরিয়াল স্যাম্পলের সাথে চূড়ান্ত ফিনিশ নিশ্চিত করুন।',
                  )}
                </p>
              </div>
              <span className="hidden rounded-full border border-white/12 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[.14em] text-white/55 sm:block">
                360°
              </span>
            </div>
            {sceneReady ? (
              <ConfiguratorScene
                widthScale={1 + (width - 220) / 500}
                fabricColor={fabric.color}
                woodColor={wood.color}
                cameraDistance={cameraDistance}
                resetKey={viewReset}
                label={text(
                  'Interactive three-dimensional artisan sofa preview',
                  'ইন্টারঅ্যাক্টিভ ত্রিমাত্রিক কারুকার্যময় সোফার প্রিভিউ',
                )}
              />
            ) : (
              <div className="grid h-full min-h-[430px] place-items-center text-center text-white/55 sm:min-h-[560px] md:min-h-[620px] lg:min-h-[720px]">
                <div>
                  <Sofa
                    className="mx-auto mb-3 text-[var(--brass)]"
                    size={28}
                    strokeWidth={1.25}
                  />
                  <p className="text-xs uppercase tracking-[.15em]">
                    {text('Preparing 3D preview', '৩ডি প্রিভিউ প্রস্তুত হচ্ছে')}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col bg-[#f1ebe0] p-6 text-[var(--teal)] sm:p-9 lg:p-10">
            <div className="flex items-center justify-between border-b border-[var(--teal)]/12 pb-6">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[var(--brown)]/55">
                  {text('Your sofa', 'আপনার সোফা')}
                </p>
                <h3 className="mt-2 font-editorial text-3xl">
                  {text('The Heritage Sofa', 'দ্য হেরিটেজ সোফা')}
                </h3>
              </div>
              <Sofa
                size={25}
                strokeWidth={1.3}
                className="text-[var(--brass)]"
              />
            </div>

            <fieldset className="mt-7">
              <legend className="text-sm font-bold">
                {text('Save fabric preference', 'কাপড়ের পছন্দ সংরক্ষণ করুন')}
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {fabrics.map((option, index) => (
                  <button
                    key={option.name}
                    type="button"
                    aria-pressed={fabricIndex === index}
                    onClick={() => setFabricIndex(index)}
                    className={`flex min-h-12 items-center gap-3 border px-3 text-left text-xs font-semibold transition ${fabricIndex === index ? 'border-[var(--teal)] bg-white' : 'border-[var(--teal)]/12 hover:border-[var(--teal)]/35'}`}
                  >
                    <span
                      className="size-5 shrink-0 rounded-full border border-black/10"
                      style={{ backgroundColor: option.color }}
                    />
                    {language === 'bn'
                      ? [
                          'আইভরি বুকলে',
                          'ক্যামেল উইভ',
                          'ফরেস্ট ভেলভেট',
                          'গ্রাফাইট লিনেন',
                        ][index]
                      : option.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="text-sm font-bold">
                {text('Save wood preference', 'কাঠের পছন্দ সংরক্ষণ করুন')}
              </legend>
              <div className="mt-3 flex gap-3">
                {woods.map((option, index) => (
                  <button
                    key={option.name}
                    type="button"
                    aria-label={
                      language === 'bn'
                        ? ['ওয়ালনাট', 'ন্যাচারাল ওক', 'এসপ্রেসো'][index]
                        : option.name
                    }
                    aria-pressed={woodIndex === index}
                    onClick={() => setWoodIndex(index)}
                    className={`size-10 rounded-full border-2 transition ${woodIndex === index ? 'border-[var(--brass)] ring-2 ring-[var(--brass)]/25' : 'border-white'}`}
                    style={{ backgroundColor: option.color }}
                  />
                ))}
                <span className="self-center text-xs text-[var(--brown)]/65">
                  {woodName}
                </span>
              </div>
            </fieldset>

            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <label className="text-sm font-bold">
                {text('Sofa width', 'সোফার প্রস্থ')}{' '}
                <span className="float-right font-normal text-[var(--brown)]/60">
                  {width} {text('cm', 'সেমি')} · {formatFeetInches(width)}
                </span>
                <input
                  aria-label={text(
                    'Sofa width in centimetres',
                    'সেন্টিমিটারে সোফার প্রস্থ',
                  )}
                  type="range"
                  min="180"
                  max="260"
                  step="10"
                  value={width}
                  onChange={(event) => setWidth(Number(event.target.value))}
                  className="mt-4 w-full accent-[var(--teal)]"
                />
              </label>
              <label className="text-sm font-bold">
                {text('Room width', 'ঘরের প্রস্থ')}{' '}
                <span className="float-right font-normal text-[var(--brown)]/60">
                  {roomWidth} {text('cm', 'সেমি')} ·{' '}
                  {formatFeetInches(roomWidth)}
                </span>
                <input
                  aria-label={text(
                    'Room width in centimetres',
                    'সেন্টিমিটারে ঘরের প্রস্থ',
                  )}
                  type="range"
                  min="220"
                  max="500"
                  step="10"
                  value={roomWidth}
                  onChange={(event) => setRoomWidth(Number(event.target.value))}
                  className="mt-4 w-full accent-[var(--teal)]"
                />
              </label>
            </div>

            <div className="mt-5">
              <p className="text-xs font-bold text-[var(--brown)]/65">
                {text(
                  'Or choose a common sofa size',
                  'অথবা সাধারণ একটি সোফার মাপ বেছে নিন',
                )}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { width: 180, en: 'Small', bn: 'ছোট' },
                  { width: 220, en: 'Standard', bn: 'সাধারণ' },
                  { width: 260, en: 'Large', bn: 'বড়' },
                ].map((preset) => (
                  <button
                    key={preset.width}
                    type="button"
                    onClick={() => setWidth(preset.width)}
                    aria-pressed={width === preset.width}
                    className={`min-h-12 border px-2 text-xs font-bold ${width === preset.width ? 'border-[var(--teal)] bg-white' : 'border-[var(--teal)]/14'}`}
                  >
                    <span className="block">
                      {language === 'bn' ? preset.bn : preset.en}
                    </span>
                    <span className="mt-0.5 block font-normal text-[var(--brown)]/55">
                      {preset.width} {text('cm', 'সেমি')}
                      <span className="block">
                        {formatFeetInches(preset.width)}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <details className="mt-3 border border-[var(--teal)]/12 bg-white/45 px-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-xs font-bold marker:hidden">
                  <Ruler size={15} />{' '}
                  {text('How do I measure my room?', 'ঘরের মাপ কীভাবে নেব?')}
                </summary>
                <p className="pb-4 text-xs leading-5 text-[var(--brown)]/62">
                  {text(
                    'Measure the clear wall from one side to the other. An approximate number is fine—our team confirms it before production.',
                    'এক পাশ থেকে অন্য পাশ পর্যন্ত খালি দেয়ালটি মাপুন। আনুমানিক মাপ দিলেই হবে—তৈরির আগে আমাদের টিম সঠিক মাপ নিশ্চিত করবে।',
                  )}
                </p>
              </details>
            </div>

            <fieldset className="mt-7">
              <legend className="text-sm font-bold">
                {text('Comfort', 'আরাম')}
              </legend>
              <div className="mt-3 grid grid-cols-3 border border-[var(--teal)]/14">
                {firmnessOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={firmness === option}
                    onClick={() => setFirmness(option)}
                    className={`min-h-11 border-r border-[var(--teal)]/14 px-2 text-xs font-bold last:border-r-0 ${firmness === option ? 'bg-[var(--teal)] text-white' : 'hover:bg-white'}`}
                  >
                    {language === 'bn'
                      ? { Soft: 'নরম', Balanced: 'ভারসাম্য', Supportive: 'দৃঢ়' }[
                          option
                        ]
                      : option}
                  </button>
                ))}
              </div>
            </fieldset>

            <div
              className={`mt-7 border p-5 ${clearance >= 20 ? 'border-[#6f876f]/40 bg-[#e6ece3]' : 'border-[#a45c4b]/35 bg-[#f2dfd8]'}`}
            >
              <div className="flex items-start gap-3">
                {clearance >= 20 ? (
                  <Check size={18} className="mt-0.5 text-[#50704f]" />
                ) : (
                  <Ruler size={18} className="mt-0.5 text-[#9a513f]" />
                )}
                <div>
                  <strong className="text-sm">{fit}</strong>
                  <p className="mt-1 text-xs leading-5 text-[var(--brown)]/65">
                    {clearance >= 0
                      ? text(
                          `${clearance} cm total clearance in your room.`,
                          `আপনার ঘরে মোট ${clearance} সেমি খালি জায়গা থাকবে।`,
                        )
                      : text(
                          `The sofa exceeds the room width by ${Math.abs(clearance)} cm.`,
                          `সোফাটি ঘরের প্রস্থের চেয়ে ${Math.abs(clearance)} সেমি বড়।`,
                        )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-7">
              <p className="text-xs uppercase tracking-[.15em] text-[var(--brown)]/52">
                {text('Your quotation', 'আপনার কোটেশন')}
              </p>
              <p className="mt-1 font-editorial text-3xl">
                {text('Confirmed personally', 'সরাসরি নিশ্চিত করা হবে')}
              </p>
              <p className="mt-2 text-xs leading-5 text-[var(--brown)]/55">
                {text(
                  'Our team confirms pricing after reviewing your measurements, materials, comfort preference, and delivery requirements.',
                  'আপনার মাপ, উপকরণ, আরামের পছন্দ ও ডেলিভারির প্রয়োজন দেখে আমাদের টিম মূল্য নিশ্চিত করবে।',
                )}
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-13 items-center justify-center gap-2 bg-[var(--teal)] px-5 text-xs font-extrabold uppercase tracking-[.1em] text-white"
                >
                  {text('Send This Design', 'ডিজাইনটি পাঠান')}{' '}
                  <ArrowUpRight size={15} />
                </a>
                <button
                  type="button"
                  onClick={copySummary}
                  className="inline-flex min-h-13 items-center justify-center gap-2 border border-[var(--teal)]/18 px-4 text-xs font-bold"
                  aria-live="polite"
                >
                  <Copy size={15} />{' '}
                  {copied
                    ? text('Copied', 'কপি হয়েছে')
                    : text('Copy details', 'বিবরণ কপি করুন')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 border-t border-white/12 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <div key={step.number} data-reveal>
              <span className="text-xs font-bold tracking-[.18em] text-[var(--brass)]">
                {step.number}
              </span>
              <h3 className="mt-3 font-editorial text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
