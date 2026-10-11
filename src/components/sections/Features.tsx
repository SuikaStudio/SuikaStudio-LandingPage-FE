'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { FlowingText } from '@/components/ui/FlowingText';

export function Features() {
  const { t } = useLanguage();
  const [pillarsVisible, setPillarsVisible] = useState(false);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pillarsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPillarsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="w-full py-28 sm:py-40 lg:py-52 border-t border-zinc-200/80 dark:border-zinc-800/80 scroll-mt-20"
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        {/* Main Section Statement */}
        <div className="max-w-4xl">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {t.aboutSection.tag}
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
            {t.aboutSection.title}
          </h2>
          <p className="mt-8 text-lg sm:text-2xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            <FlowingText text={t.aboutSection.statement} staggerMs={22} />
          </p>
        </div>

        {/* 3 Pillars Grid — Sequential 1 -> 2 -> 3 reveal with FlowingText descriptions */}
        <div
          ref={pillarsRef}
          className="mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pt-16 border-t border-zinc-200/60 dark:border-zinc-800/60"
        >
          {t.aboutSection.pillars.map((pillar, idx) => {
            const pillarDelay = idx * 450;

            return (
              <div
                key={idx}
                style={{
                  transitionDelay: pillarsVisible ? `${pillarDelay}ms` : '0ms',
                }}
                className={`flex flex-col group transition-all duration-700 ease-out ${
                  pillarsVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                  0{idx + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  <FlowingText
                    text={pillar.desc}
                    active={pillarsVisible}
                    delayMs={pillarDelay + 150}
                    staggerMs={20}
                  />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
