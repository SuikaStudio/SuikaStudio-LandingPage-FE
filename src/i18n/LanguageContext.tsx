'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';
import { Locale } from '@/types';
import { dictionaries, Dictionary } from './dictionaries';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const STORAGE_KEY = 'suika_locale';

function subscribeLang(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('suika-lang-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('suika-lang-change', callback);
    window.removeEventListener('storage', callback);
  };
}

function getLangSnapshot(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === 'id' || saved === 'en') return saved;
    return 'en'; // Default English as requested
  } catch {
    return 'en';
  }
}

function getLangServerSnapshot(): Locale {
  return 'en'; // Default English on SSR to prevent hydration blink
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: dictionaries.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribeLang, getLangSnapshot, getLangServerSnapshot);

  const setLocale = (newLocale: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `${STORAGE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      window.dispatchEvent(new Event('suika-lang-change'));
    } catch {
      // Ignore storage errors
    }
  };

  const t = dictionaries[locale] || dictionaries.en;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
