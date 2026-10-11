"use client";

import { useState, useEffect, useRef } from "react";
import {
  GithubIcon,
  InstagramIcon,
  TikTokIcon,
  FacebookIcon,
} from "@/components/ui/Icons";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteConfig } from "@/data/siteConfig";

interface SocialChannel {
  name: string;
  href: string;
  icon: React.ReactNode;
}

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
      className={`inline-block w-[3px] sm:w-[4px] h-[0.82em] ml-1.5 bg-emerald-500 dark:bg-emerald-400 align-middle transition-opacity duration-75 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );
}

function CommunitySequenceInner({
  tag,
  title,
  subtitle,
  active,
  socialChannels,
}: {
  tag: string;
  title: string;
  subtitle: string;
  active: boolean;
  socialChannels: SocialChannel[];
}) {
  const [charCount, setCharCount] = useState(0);
  const isTypingComplete = charCount >= title.length;

  useEffect(() => {
    if (!active || isTypingComplete) return;

    const timer = setTimeout(() => {
      setCharCount((prev) => prev + 1);
    }, 25);

    return () => clearTimeout(timer);
  }, [active, charCount, isTypingComplete]);

  const displayedTitle = title.slice(0, charCount);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Step 2 (After Title finishes typing): Tag */}
      <p
        className={`text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 transition-all duration-700 delay-100 ease-out ${
          isTypingComplete
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2.5"
        }`}
      >
        {tag}
      </p>

      {/* Step 1: Typing Title with Invisible Layout Anchor & Single Semantic H2 */}
      <div className="relative mt-3">
        <div
          aria-hidden="true"
          className="invisible pointer-events-none select-none text-3xl sm:text-5xl font-bold tracking-tight"
        >
          <span>{title}</span>
          <span className="inline-block w-[3px] sm:w-[4px] h-[0.82em] ml-1.5 align-middle" />
        </div>
        <h2 className="absolute inset-0 text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          <span className="sr-only">{title}</span>
          <span aria-hidden="true">
            <span>{displayedTitle}</span>
            <BlinkingCaret />
          </span>
        </h2>
      </div>

      {/* Step 3 (After Tag): Subtitle */}
      <p
        className={`mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 transition-all duration-700 delay-[550ms] ease-out ${
          isTypingComplete
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3.5"
        }`}
      >
        {subtitle}
      </p>

      {/* Step 4 (After Subtitle): Social Media Buttons */}
      <div
        className={`mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-[1050ms] ease-out ${
          isTypingComplete
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {socialChannels.map((channel) => (
          <a
            key={channel.name}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 px-4 py-2.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-850 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-2xs cursor-pointer"
          >
            {channel.icon}
            <span>{channel.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function CommunityCta() {
  const { t } = useLanguage();
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const socialChannels: SocialChannel[] = [
    {
      name: "GitHub",
      href: siteConfig.links.github,
      icon: <GithubIcon className="h-4 w-4" />,
    },
    {
      name: "Instagram",
      href: siteConfig.links.instagram,
      icon: <InstagramIcon className="h-4 w-4" />,
    },
    {
      name: "TikTok",
      href: siteConfig.links.tiktok,
      icon: <TikTokIcon className="h-4 w-4" />,
    },
    {
      name: "Facebook",
      href: siteConfig.links.facebook,
      icon: <FacebookIcon className="h-4 w-4" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="community"
      className="w-full py-28 sm:py-36 border-t border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36 mx-auto text-center">
        <CommunitySequenceInner
          key={t.community.title}
          tag={t.community.tag}
          title={t.community.title}
          subtitle={t.community.subtitle}
          active={hasStarted}
          socialChannels={socialChannels}
        />
      </div>
    </section>
  );
}
