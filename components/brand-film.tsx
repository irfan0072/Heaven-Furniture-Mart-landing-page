'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { useFilmScroll } from '@/components/use-film-scroll';

type Player = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  destroy: () => void;
  getIframe: () => HTMLIFrameElement;
};
type YouTubeAPI = {
  Player: new (
    element: HTMLElement,
    options: {
      host: string;
      videoId: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady: (event: { target: Player }) => void;
        onStateChange: (event: { data: number }) => void;
        onError: () => void;
        onAutoplayBlocked: () => void;
      };
    },
  ) => Player;
};
type YouTubeWindow = Window & {
  YT?: YouTubeAPI;
  onYouTubeIframeAPIReady?: () => void;
};
let apiPromise: Promise<YouTubeAPI> | undefined;

function loadYouTube() {
  const target = window as YouTubeWindow;
  if (target.YT?.Player) return Promise.resolve(target.YT);
  if (!apiPromise) {
    apiPromise = new Promise<YouTubeAPI>((resolve, reject) => {
      const previous = target.onYouTubeIframeAPIReady;
      const timeout = window.setTimeout(
        () => reject(new Error('Video connection timed out')),
        15000,
      );
      target.onYouTubeIframeAPIReady = () => {
        window.clearTimeout(timeout);
        previous?.();
        if (target.YT) resolve(target.YT);
      };
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => {
        window.clearTimeout(timeout);
        reject(new Error('Video connection unavailable'));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

export function BrandFilm() {
  const { text } = useLanguage();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const player = useRef<Player | null>(null);
  const focused = useRef(false);
  const manualPause = useRef(false);
  const preferMuted = useRef(false);
  const fallbackTried = useRef(false);
  const completed = useRef(false);
  const inFocus = useFilmScroll(section, stage);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const continueToCollections = () => {
    manualPause.current = true;
    player.current?.pauseVideo();
    const handled = !window.dispatchEvent(
      new Event('heaven:film-continue', { cancelable: true }),
    );
    if (!handled)
      document.getElementById('collections')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'start',
      });
  };

  useEffect(() => {
    if (!section.current) return;
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          preload.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    preload.observe(section.current);
    const onVisibility = () => {
      if (document.hidden) player.current?.pauseVideo();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      preload.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    focused.current = inFocus;
    if (!ready) return;
    if (!inFocus) {
      player.current?.pauseVideo();
      return;
    }
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (
      manualPause.current ||
      document.hidden ||
      saveData ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    if (preferMuted.current) player.current?.mute();
    else player.current?.unMute();
    player.current?.playVideo();
  }, [inFocus, ready]);

  useEffect(() => {
    if (!near || !mount.current) return;
    let disposed = false;
    let instance: Player | undefined;
    const container = mount.current;
    const placeholder = document.createElement('div');
    container.appendChild(placeholder);
    void loadYouTube()
      .then((api) => {
        if (disposed) return;
        instance = new api.Player(placeholder, {
          host: 'https://www.youtube-nocookie.com',
          videoId: 'qEwoJWbXSTs',
          playerVars: {
            autoplay: 0,
            playsinline: 1,
            controls: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: ({ target }) => {
              if (disposed) return;
              player.current = target;
              target.getIframe().title =
                'Heaven Furniture Mart promotional film';
              target.unMute();
              setReady(true);
            },
            onStateChange: ({ data }) => {
              if (disposed) return;
              setPlaying(data === 1);
              if (data === 1) {
                const isMuted = player.current?.isMuted() ?? false;
                setMuted(isMuted);
                if (!isMuted) setBlocked(false);
                if (!focused.current || document.hidden)
                  player.current?.pauseVideo();
              }
              if (data === 2 && focused.current) manualPause.current = true;
              if (data === 0 && !completed.current) {
                completed.current = true;
                manualPause.current = true;
                if (focused.current && !document.hidden) {
                  const handled = !window.dispatchEvent(
                    new Event('heaven:film-continue', { cancelable: true }),
                  );
                  if (!handled)
                    document.getElementById('collections')?.scrollIntoView({
                      behavior: window.matchMedia(
                        '(prefers-reduced-motion: reduce)',
                      ).matches
                        ? 'instant'
                        : 'smooth',
                      block: 'start',
                    });
                }
              }
            },
            onError: () => {
              if (!disposed) setFailed(true);
            },
            onAutoplayBlocked: () => {
              if (disposed) return;
              setBlocked(true);
              if (!fallbackTried.current && focused.current) {
                fallbackTried.current = true;
                preferMuted.current = true;
                manualPause.current = false;
                player.current?.mute();
                setMuted(true);
                player.current?.playVideo();
              }
            },
          },
        });
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });
    return () => {
      disposed = true;
      instance?.destroy();
      player.current = null;
      container.replaceChildren();
    };
  }, [near]);

  return (
    <section
      ref={section}
      id="brand-film"
      className="brand-film-cinema"
      aria-label={text('Heaven brand film', 'হেভেনের পরিচিতি ভিডিও')}
    >
      <div className="brand-film-viewport">
        <div ref={stage} className="brand-film-content">
          <div data-film-heading className="mb-5 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[.2em] text-white/65">
              {text(
                'Heaven Furniture Mart presents',
                'হেভেন ফার্নিচার মার্টের নিবেদন',
              )}
            </p>
            <h2 className="font-editorial text-3xl leading-tight sm:text-4xl">
              {text('A closer look at Heaven.', 'কাছ থেকে দেখুন হেভেন।')}
            </h2>
          </div>
          <div className="brand-film-stage relative overflow-hidden">
            {!ready && (
              <div className="absolute inset-0 grid place-items-center bg-black">
                <output className="px-6 text-center text-sm text-white/80">
                  {failed
                    ? text(
                        'Watch on YouTube using the link below.',
                        'নিচের লিংকে YouTube-এ দেখুন।',
                      )
                    : text('Preparing the film…', 'ভিডিও প্রস্তুত হচ্ছে…')}
                </output>
              </div>
            )}
            <div ref={mount} className="absolute inset-0" />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              disabled={!ready || failed}
              onClick={() => {
                if (playing) {
                  manualPause.current = true;
                  player.current?.pauseVideo();
                } else {
                  manualPause.current = false;
                  completed.current = false;
                  player.current?.playVideo();
                }
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-sm disabled:opacity-40"
            >
              {playing ? <Pause size={15} /> : <Play size={15} />}
              {playing ? text('Pause', 'থামান') : text('Play', 'চালান')}
            </button>
            <button
              type="button"
              disabled={!ready || failed}
              onClick={() => {
                if (player.current?.isMuted() || blocked) {
                  preferMuted.current = false;
                  manualPause.current = false;
                  player.current?.unMute();
                  player.current?.playVideo();
                  setMuted(false);
                  setBlocked(false);
                } else {
                  preferMuted.current = true;
                  player.current?.mute();
                  setMuted(true);
                }
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-sm disabled:opacity-40"
            >
              {muted || blocked ? <VolumeX size={15} /> : <Volume2 size={15} />}
              {muted || blocked
                ? text('Enable sound', 'শব্দ চালু')
                : text('Mute', 'শব্দ বন্ধ')}
            </button>
            <button
              type="button"
              onClick={continueToCollections}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-sm"
            >
              {text('Skip', 'এড়িয়ে যান')}
              <ArrowDown size={15} />
            </button>
          </div>
          {(failed || blocked) && (
            <output className="mt-2 block text-center text-sm text-white/75">
              {failed
                ? text('Video unavailable here.', 'এখানে ভিডিও চালানো যাচ্ছে না।')
                : text(
                    'Tap Enable sound to hear the film.',
                    'ভিডিও শুনতে “শব্দ চালু” চাপুন।',
                  )}
            </output>
          )}
          {failed && (
            <a
              href="https://www.youtube.com/watch?v=qEwoJWbXSTs"
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex min-h-11 items-center justify-center gap-2 text-sm underline"
            >
              {text('Watch on YouTube', 'YouTube-এ দেখুন')}
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
        <p className="pointer-events-none absolute inset-x-4 bottom-4 text-center text-xs text-white/65">
          {inFocus
            ? text(
                'Keep scrolling to skip · Next section follows the film',
                'এড়িয়ে যেতে স্ক্রল করুন · শেষে পরের অংশে যাবেন',
              )
            : text(
                'Scroll to watch · Keep scrolling to continue',
                'দেখতে স্ক্রল করুন · এগিয়ে যেতে স্ক্রল চালিয়ে যান',
              )}
        </p>
      </div>
    </section>
  );
}
