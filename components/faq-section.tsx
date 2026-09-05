'use client';

import { ArrowUpRight, MessageCircle, Phone, Plus } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { siteContent } from '@/lib/content';

export function FaqSection() {
  const { language, text } = useLanguage();
  const questions =
    language === 'bn'
      ? [
          [
            'কীভাবে অর্ডার শুরু করব?',
            'WhatsApp-এ মেসেজ দিন বা ফোন করুন। আপনার ঘরের ছবি, আনুমানিক মাপ ও পছন্দ জানালে আমাদের ডিজাইন পরামর্শক পরবর্তী ধাপ বুঝিয়ে দেবেন।',
          ],
          [
            'মাপ কি আমাকে নিজে নিতে হবে?',
            'শুরুতে আনুমানিক মাপ দিলেই হবে। ডিজাইন নিশ্চিত করার আগে আমাদের টিম সরাসরি জায়গা মেপে নেবে।',
          ],
          [
            'কত দিনে আসবাব তৈরি হয়?',
            'ডিজাইন, উপকরণ ও কাজের ধরনের ওপর সময় নির্ভর করে। পরামর্শের সময় আমরা পরিষ্কার সময়সীমা জানিয়ে দিই।',
          ],
          [
            'ডেলিভারি ও ইনস্টলেশন কি পাওয়া যায়?',
            'ডেলিভারি ও ইনস্টলেশন সহায়তা পাওয়া যায়। আপনার চূড়ান্ত কোটেশনে প্রযোজ্য খরচ ও বিস্তারিত পরিষ্কারভাবে উল্লেখ করা হবে।',
          ],
          [
            'কাপড় ও কাঠ সরাসরি দেখে বেছে নেওয়া যাবে?',
            'অবশ্যই। আগ্রাবাদ শোরুমে এসে কাপড়, কাঠের ফিনিশ ও আরামের ধরন কাছ থেকে দেখে বেছে নিতে পারবেন।',
          ],
        ]
      : [
          [
            'How do I start an order?',
            'Message us on WhatsApp or call. Share a room photo, approximate measurements, and what you like; our design consultant will guide you through the next step.',
          ],
          [
            'Do I need to measure the room myself?',
            'An approximate measurement is enough to begin. Our team confirms the space in person before the design is finalized.',
          ],
          [
            'How long does custom furniture take?',
            'Timing depends on the design, materials, and type of work. We provide a clear delivery estimate during your consultation.',
          ],
          [
            'Are delivery and installation available?',
            'Delivery and installation support is available. Applicable costs and details are stated clearly in your final quotation.',
          ],
          [
            'Can I see fabrics and wood finishes in person?',
            'Absolutely. Visit our Agrabad showroom to compare fabrics, wood finishes, and comfort options before deciding.',
          ],
        ];

  return (
    <section
      id="faq"
      className="bg-[#e9e1d5] px-5 py-20 sm:px-8 sm:py-28 lg:px-14 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
        <div data-reveal>
          <p className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.2em] text-[var(--brown)]/65">
            <span className="h-px w-9 bg-[var(--brass)]" />{' '}
            {text('Simple answers', 'সহজ উত্তর')}
          </p>
          <h2 className="font-editorial text-[clamp(3.4rem,5.5vw,6rem)] leading-[.88] tracking-[-.04em]">
            {text('Ordering should feel easy.', 'অর্ডার করুন সহজেই।')}
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-[var(--brown)]/68">
            {text(
              'No technical knowledge is needed. Talk to a real person and we will guide you from first idea to installation.',
              'ঘরের মাপ বা আসবাব নিয়ে অভিজ্ঞতা না থাকলেও চিন্তা নেই। আমাদের পরামর্শকের সঙ্গে কথা বলুন—পছন্দ করা থেকে ঘরে বসানো পর্যন্ত সাহায্য পাবেন।',
            )}
          </p>
          <ol className="mt-7 space-y-4 text-sm leading-7">
            {[
              text(
                'Choose a collection or save a design you like.',
                'পছন্দের আসবাব বা ডিজাইনের ছবি বেছে নিন।',
              ),
              text(
                'Share a room photo and approximate measurements.',
                'ঘরের ছবি ও আনুমানিক মাপ আমাদের পাঠান।',
              ),
              text(
                'Discuss materials, price and delivery before confirming.',
                'অর্ডারের আগে উপকরণ, দাম ও ডেলিভারির সময় জেনে নিন।',
              ),
            ].map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--teal)] text-white">
                  {new Intl.NumberFormat(
                    language === 'bn' ? 'bn-BD' : 'en',
                  ).format(index + 1)}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href={siteContent.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-13 items-center justify-center gap-3 bg-[#1f7a50] px-5 text-sm font-bold text-white"
            >
              <MessageCircle size={18} />{' '}
              {text('Chat on WhatsApp', 'WhatsApp-এ কথা বলুন')}
            </a>
            <a
              href="tel:+8801960481983"
              className="inline-flex min-h-13 items-center justify-center gap-3 border border-[var(--teal)]/20 px-5 text-sm font-bold"
            >
              <Phone size={17} /> {text('Call us', 'ফোন করুন')}
            </a>
          </div>
        </div>
        <div className="border-t border-[var(--teal)]/18" data-reveal>
          {questions.map(([question, answer], index) => (
            <details
              key={question}
              className="group border-b border-[var(--teal)]/18"
            >
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-bold marker:hidden sm:text-lg">
                <span>
                  <span className="mr-4 text-xs text-[var(--brass)]">
                    0{index + 1}
                  </span>
                  {question}
                </span>
                <Plus
                  size={19}
                  className="shrink-0 transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-7 pl-0 text-sm leading-7 text-[var(--brown)]/68 sm:pl-10 sm:text-base sm:leading-8">
                {answer}
              </p>
            </details>
          ))}
          <a
            href={siteContent.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.12em]"
          >
            {text(
              'Still have a question? Ask us directly',
              'আরও প্রশ্ন আছে? সরাসরি জিজ্ঞেস করুন',
            )}{' '}
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
