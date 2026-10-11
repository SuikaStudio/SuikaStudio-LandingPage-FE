"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

function BlinkingCaret() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block w-[3px] sm:w-[5px] h-[0.82em] ml-1.5 bg-emerald-500 dark:bg-emerald-400 align-middle transition-opacity duration-75 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );
}

function HeroCenterpiece({
  fullTitle,
  subtitle,
  exploreBtn,
  aboutBtn,
}: {
  fullTitle: string;
  subtitle: string;
  exploreBtn: string;
  aboutBtn: string;
}) {
  const [charCount, setCharCount] = useState(1);
  const isTypingComplete = charCount >= fullTitle.length;

  useEffect(() => {
    if (charCount >= fullTitle.length) return;

    const timer = setTimeout(() => {
      setCharCount((prev) => prev + 1);
    }, 40);

    return () => clearTimeout(timer);
  }, [charCount, fullTitle.length]);

  const displayedText = fullTitle.slice(0, charCount);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center my-auto">
      {/* 1. Brand Logo with Text (Appears FIRST after title finishes typing) */}
      <div
        className={`relative mb-8 sm:mb-10 group cursor-pointer transition-all duration-700 delay-100 ease-out ${
          isTypingComplete
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-3 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative transition-transform duration-500 ease-out group-hover:scale-105">
          <Image
            src="/brand/logo-light.png"
            alt="Suika Studio"
            width={332}
            height={128}
            sizes="(max-width: 640px) 208px, 332px"
            className="h-20 sm:h-28 lg:h-32 w-auto block dark:hidden object-contain drop-shadow-xl select-none"
            priority
          />
          <Image
            src="/brand/logo-dark.png"
            alt="Suika Studio"
            width={332}
            height={128}
            sizes="(max-width: 640px) 208px, 332px"
            className="h-20 sm:h-28 lg:h-32 w-auto hidden dark:block object-contain drop-shadow-xl select-none"
            priority
          />
        </div>
      </div>

      {/* Grand Expansive Typographic Title with Typewriter Animation (Appears First) */}
      <div className="relative max-w-6xl w-full">
        {/* In-flow invisible layout anchor locks exact multi-line height from frame 0 (Zero CLS) */}
        <div
          aria-hidden="true"
          className="invisible pointer-events-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.08]"
        >
          <span>{fullTitle}</span>
          <span className="inline-block w-[3px] sm:w-[5px] h-[0.82em] ml-1.5 align-middle" />
        </div>

        {/* Single Semantic H1 for SEO & Screen Readers + Visible Typing Layer */}
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.08] z-10">
          <span className="sr-only">{fullTitle}</span>
          <span aria-hidden="true">
            <span>{displayedText}</span>
            <BlinkingCaret />
          </span>
        </h1>
      </div>

      {/* 2. Punchy Expansive Subtitle (Appears SECOND after Logo) */}
      <p
        className={`mt-8 text-base sm:text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400 max-w-4xl font-normal leading-relaxed transition-all duration-700 delay-[650ms] ease-out ${
          isTypingComplete
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        {subtitle}
      </p>

      {/* 3. CTA Buttons (Appear THIRD after Subtitle) */}
      <div
        className={`mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4 transition-all duration-700 delay-[1200ms] ease-out ${
          isTypingComplete
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <a
          href="#showcase"
          className="inline-flex items-center gap-2.5 rounded-full bg-zinc-950 dark:bg-zinc-50 px-8 py-4 text-sm sm:text-base font-semibold text-white dark:text-zinc-950 shadow-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span>{exploreBtn}</span>
          <ArrowDown className="h-4 w-4" />
        </a>
        <a
          href="#about"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-8 py-4 text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-zinc-50 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span>{aboutBtn}</span>
        </a>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const fullTitle = t.hero.title;

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] w-full flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36 py-12 sm:py-16 overflow-hidden">
      {/* Background ambient glowing orbs ala antigravity.google */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="h-[600px] w-[600px] sm:h-[850px] sm:w-[850px] rounded-full bg-gradient-to-tr from-rose-500/15 via-emerald-500/10 to-transparent dark:from-rose-600/15 dark:via-emerald-500/10 blur-[150px] opacity-80" />
      </div>

      {/* Top spacer */}
      <div />

      {/* Main Centerpiece (Expansive & Wide ala Antigravity) */}
      <HeroCenterpiece
        key={fullTitle}
        fullTitle={fullTitle}
        subtitle={t.hero.subtitle}
        exploreBtn={t.hero.exploreBtn}
        aboutBtn={t.hero.aboutBtn}
      />

      {/* Bottom Scroll Cue (Directs to Manifesto section) */}
      {/* <div className="flex justify-center pt-8">
        <a
          href="#manifesto"
          aria-label={t.hero.scrollHint}
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
        >
          <span>{t.hero.scrollHint}</span>
          <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
        </a>
      </div> */}
    </section>
  );
}
