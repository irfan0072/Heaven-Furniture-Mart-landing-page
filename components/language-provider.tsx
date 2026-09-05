'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'bn';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  text: (english: string, bangla: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem('heaven-language');
    } catch {
      // Language switching remains available when browser storage is blocked.
    }
    const preferred =
      saved === 'bn' ||
      (!saved && window.navigator.language.toLowerCase().startsWith('bn'))
        ? 'bn'
        : 'en';
    const timeout = window.setTimeout(() => {
      setLanguage(preferred);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language === 'bn' ? 'bn' : 'en';
    document.body.classList.toggle('language-bn', language === 'bn');
    try {
      window.localStorage.setItem('heaven-language', language);
    } catch {
      // Preferences can still be used for the current visit.
    }
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) window.dispatchEvent(new Event('resize'));
    });
    return () => {
      cancelled = true;
    };
  }, [language, ready]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      text: (english: string, bangla: string) =>
        language === 'bn' ? bangla : english,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      className="inline-flex shrink-0 border border-current/20 p-1 text-xs font-bold"
      aria-label={language === 'bn' ? 'ভাষা বেছে নিন' : 'Choose language'}
    >
      <button
        type="button"
        lang="en"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`min-h-11 min-w-11 px-2 ${language === 'en' ? 'bg-current' : ''}`}
      >
        <span className={language === 'en' ? 'text-[var(--teal)]' : ''}>
          EN
        </span>
      </button>
      <button
        type="button"
        lang="bn"
        style={{ fontFamily: 'var(--font-bengali), sans-serif' }}
        onClick={() => setLanguage('bn')}
        aria-pressed={language === 'bn'}
        className={`min-h-11 min-w-11 px-2 ${language === 'bn' ? 'bg-current' : ''}`}
      >
        <span className={language === 'bn' ? 'text-[var(--teal)]' : ''}>
          বাংলা
        </span>
      </button>
    </div>
  );
}
