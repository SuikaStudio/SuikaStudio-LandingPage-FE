'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Faq() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="w-full py-28 sm:py-40 lg:py-52 scroll-mt-20 bg-zinc-100/90 dark:bg-zinc-900/60 border-y border-zinc-200/90 dark:border-zinc-800/90 relative backdrop-blur-xs"
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        {/* Section Header (Centered) */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-24">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {t.faq.tag}
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Minimalist Accordion List (Centered, All Answers Rendered in DOM for SEO) */}
        <div className="mx-auto max-w-3xl divide-y divide-zinc-200/80 dark:divide-zinc-800/80 border-y border-zinc-200/80 dark:border-zinc-800/80">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="group transition-colors">
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                    className="w-full py-7 sm:py-8 flex items-center justify-between text-left gap-6 cursor-pointer"
                  >
                    <span className="text-lg sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {item.question}
                    </span>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-45 bg-zinc-200/60 dark:bg-zinc-800' : 'rotate-0'
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </div>
                  </button>
                </h3>

                <div
                  className={`grid transition-all duration-200 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 pb-8 pt-1'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
