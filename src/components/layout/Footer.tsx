"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteConfig } from "@/data/siteConfig";

function FullWidthWordmark({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSizePx, setFontSizePx] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const updateSize = () => {
      const containerWidth = container.clientWidth;
      const baseWidth = measure.getBoundingClientRect().width;
      if (containerWidth > 0 && baseWidth > 0) {
        // Measure span uses 100px base font-size; 0.988 safety factor prevents right-edge glyph clipping on 'o'
        const calculated = (containerWidth / baseWidth) * 100 * 0.988;
        setFontSizePx(calculated);
      }
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-clip select-none"
    >
      {/* Hidden 100px reference span clipped within container bounds to prevent mobile horizontal overflow */}
      <div
        aria-hidden="true"
        className="pointer-events-none invisible absolute inset-0 overflow-hidden"
      >
        <span
          ref={measureRef}
          style={{ fontSize: "100px" }}
          className="inline-block whitespace-nowrap font-bold tracking-tighter leading-none"
        >
          {text}
        </span>
      </div>

      {/* Visible Full-Width Monumental Display Text */}
      <div
        style={fontSizePx ? { fontSize: `${fontSizePx}px` } : undefined}
        className={`w-full whitespace-nowrap font-bold tracking-tighter leading-[0.82] text-zinc-950 dark:text-zinc-50 ${
          fontSizePx ? "" : "text-[13.8vw]"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  const currentYear = 2026;
  const subChars = "Developers".split("");

  return (
    <footer className="w-full overflow-x-clip border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 transition-colors">
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36 pt-16 sm:pt-24 pb-12 sm:pb-16">
        {/* Top Row: Tagline on Left, Navigation Columns on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Studio Tagline / Description */}
          <div className="md:col-span-6 lg:col-span-6 max-w-md">
            <p className="text-base sm:text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 leading-relaxed">
              {f.description}
            </p>
          </div>

          {/* Right Col 1: Projects */}
          <div className="md:col-span-3 lg:col-start-8 lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500 mb-4">
              {f.projectsTitle}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <li>
                <a
                  href={siteConfig.links.botInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                >
                  Suika Bot
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.fakeSaldo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                >
                  Fake Saldo
                </a>
              </li>
            </ul>
          </div>

          {/* Right Col 2: Social & Community */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500 mb-4">
              {f.socialsTitle}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-500 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Centerpiece: Giant Edge-to-Edge "Suika Studio" + Justified "Developers" */}
        <div className="my-14 sm:my-20 lg:my-24 w-full">
          <FullWidthWordmark text="Suika Studio" />
          <div
            aria-label="Developers"
            className="mt-1 sm:mt-2 px-1 sm:px-2.5 flex w-full items-center justify-between text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold uppercase text-zinc-900 dark:text-zinc-100 select-none"
          >
            {subChars.map((char, idx) => (
              <span key={idx} className="leading-none">
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Logo & Copyright on Left, Quick Links on Right */}
        <div className="pt-8 border-t border-zinc-200/70 dark:border-zinc-800/70 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/brand/logo-light.png"
                alt="Suika Studio"
                width={120}
                height={30}
                className="h-6 w-auto block dark:hidden object-contain transition-transform group-hover:scale-[1.02]"
              />
              <Image
                src="/brand/logo-dark.png"
                alt="Suika Studio"
                width={120}
                height={30}
                className="h-6 w-auto hidden dark:block object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
              •
            </span>
            <p className="font-mono text-[11px] sm:text-xs">
              © {currentYear} {siteConfig.name} ({siteConfig.domain}).{" "}
              {f.rights}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-xs text-zinc-600 dark:text-zinc-400">
            <a
              href="#showcase"
              className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
            >
              {t.nav.showcase}
            </a>
            <a
              href="#about"
              className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
            >
              {t.nav.about}
            </a>
            <a
              href="#faq"
              className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
            >
              {t.nav.faq}
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
