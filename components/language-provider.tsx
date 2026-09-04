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

  useEffect(() => {
    const saved = window.localStorage.getItem('heaven-language');
    const preferred = saved === 'bn' || (!saved && window.navigator.language.toLowerCase().startsWith('bn')) ? 'bn' : 'en';
    if (preferred === 'en') return;
    const timeout = window.setTimeout(() => setLanguage(preferred), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'bn' ? 'bn' : 'en';
    document.body.classList.toggle('language-bn', language === 'bn');
    window.localStorage.setItem('heaven-language', language);
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    text: (english: string, bangla: string) => language === 'bn' ? bangla : english,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="inline-flex shrink-0 border border-current/20 p-1 text-[10px] font-extrabold uppercase tracking-[.1em]" aria-label="Language selector">
      <button type="button" onClick={() => setLanguage('en')} aria-pressed={language === 'en'} className={`min-h-8 px-2.5 ${language === 'en' ? 'bg-current' : ''}`}><span className={language === 'en' ? 'text-[var(--teal)]' : ''}>EN</span></button>
      <button type="button" onClick={() => setLanguage('bn')} aria-pressed={language === 'bn'} className={`min-h-8 px-2.5 ${language === 'bn' ? 'bg-current' : ''}`}><span className={language === 'bn' ? 'text-[var(--teal)]' : ''}>বাংলা</span></button>
    </div>
  );
}
