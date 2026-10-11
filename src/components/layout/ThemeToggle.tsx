'use client';

import { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';

const STORAGE_KEY = 'suika_theme';

function subscribe(callback: () => void) {
  window.addEventListener('suika-theme-change', callback);
  window.addEventListener('storage', callback);
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', callback);
  return () => {
    window.removeEventListener('suika-theme-change', callback);
    window.removeEventListener('storage', callback);
    media.removeEventListener('change', callback);
  };
}

function getSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark') return true;
  if (saved === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const nextDark = !isDark;
    if (nextDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem(STORAGE_KEY, 'light');
    }
    window.dispatchEvent(new Event('suika-theme-change'));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
    >
      {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
    </button>
  );
}
