'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Locale } from '@/types';

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Pilih bahasa / Select language"
        className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
      >
        <Globe className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-1.5 shadow-lg backdrop-blur-md z-50 animate-in fade-in-0 zoom-in-95 duration-150"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => selectLanguage('id')}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
              locale === 'id'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">ID</span>
              <span>Bahasa Indonesia</span>
            </div>
            {locale === 'id' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => selectLanguage('en')}
            className={`mt-0.5 flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
              locale === 'en'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">EN</span>
              <span>English</span>
            </div>
            {locale === 'en' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
          </button>
        </div>
      )}
    </div>
  );
}
