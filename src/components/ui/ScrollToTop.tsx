'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function ScrollToTop() {
  const { locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const rafId = requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const label = locale === 'id' ? 'Kembali ke atas' : 'Back to top';

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={label}
        title={label}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 shadow-md backdrop-blur-md hover:text-zinc-950 dark:hover:text-zinc-50 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:-translate-y-1 active:translate-y-0 cursor-pointer"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}

