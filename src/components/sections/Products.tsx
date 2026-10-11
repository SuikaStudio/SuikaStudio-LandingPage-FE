"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowUpRight, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteConfig } from "@/data/siteConfig";
import { DesktopSpotlightCard } from "@/components/ui/DesktopSpotlightCard";
import { FlowingText } from "@/components/ui/FlowingText";

interface ZoomTarget {
  title: string;
  src: string;
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

function TypewriterTitleInner({
  text,
  active,
}: {
  text: string;
  active: boolean;
}) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (!active || charCount >= text.length) return;

    const timer = setTimeout(() => {
      setCharCount((prev) => prev + 1);
    }, 25);

    return () => clearTimeout(timer);
  }, [active, charCount, text.length]);

  const displayedText = text.slice(0, charCount);

  return (
    <div className="relative mt-3">
      {/* Invisible layout anchor to prevent layout shift while typing */}
      <div
        aria-hidden="true"
        className="invisible pointer-events-none select-none text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
      >
        <span>{text}</span>
        <span className="inline-block w-[3px] sm:w-[4px] h-[0.82em] ml-1.5 align-middle" />
      </div>

      {/* Single Semantic H2 for SEO & Screen Readers + Visible Typing Layer */}
      <h2 className="absolute inset-0 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          <span>{displayedText}</span>
          <BlinkingCaret />
        </span>
      </h2>
    </div>
  );
}

function ShowcaseTypingTitle({ text }: { text: string }) {
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <TypewriterTitleInner key={text} text={text} active={hasStarted} />
    </div>
  );
}

function ImageZoomLightbox({
  target,
  locale,
  onClose,
}: {
  target: ZoomTarget;
  locale: "id" | "en";
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const isId = locale === "id";

  const handleZoomIn = () => {
    setScale((prev) => Math.min(3, +(prev + 0.5).toFixed(2)));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(1, +(prev - 0.5).toFixed(2));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (scale <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    movedRef.current = false;
    dragStartRef.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || scale <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx - pan.x) > 3 || Math.abs(dy - pan.y) > 3) {
      movedRef.current = true;
    }
    setPan({ x: dx, y: dy });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    if (scale === 1) {
      setScale(2);
    } else {
      handleReset();
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${target.title} Preview`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-md p-4 sm:p-6 select-none"
      onClick={onClose}
    >
      {/* Top Bar: Title & Close Button */}
      <div className="fixed top-4 inset-x-4 sm:top-6 sm:inset-x-8 z-20 flex items-center justify-between pointer-events-none">
        <span className="rounded-full border border-zinc-800 bg-zinc-900/85 px-4 py-1.5 text-xs font-mono text-zinc-200 backdrop-blur-md">
          {target.title}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label={isId ? "Tutup gambar" : "Close image"}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/90 text-zinc-100 hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer shadow-lg"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Image Wrapper (Clicking inside image zooms/pans; clicking outside closes immediately) */}
      <div
        onClick={handleImageClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
          transition: isDragging ? "none" : "transform 200ms ease-out",
          touchAction: scale > 1 ? "none" : "manipulation",
        }}
        className={`relative w-full max-w-3xl aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl ${
          scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
        }`}
      >
        <Image
          src={target.src}
          alt={`${target.title} Full Preview`}
          fill
          sizes="100vw"
          className="object-cover pointer-events-none"
          priority
        />
      </div>

      {/* Bottom Floating Zoom Controls */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-6 z-20 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 p-1.5 text-zinc-100 shadow-xl backdrop-blur-md"
      >
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={scale <= 1}
          aria-label="Zoom out"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ZoomOut className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset zoom"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <span>{Math.round(scale * 100)}%</span>
          {scale !== 1 && <RotateCcw className="h-3 w-3 text-zinc-400" />}
        </button>

        <button
          type="button"
          onClick={handleZoomIn}
          disabled={scale >= 3}
          aria-label="Zoom in"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
      </div>
    </div>,
    document.body,
  );
}

function ProjectImageWithCursor({
  title,
  imageSrc,
  visitLabel,
  locale,
  priority = false,
  onSelect,
}: {
  title: string;
  imageSrc: string;
  visitLabel: string;
  locale: "id" | "en";
  priority?: boolean;
  onSelect: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) return;

    let animId: number;

    const render = () => {
      const lerp = 0.25;
      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * lerp;

      if (pillRef.current) {
        pillRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPos.current = { x, y };
    currentPos.current = { x, y };
    if (pillRef.current) {
      pillRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      targetPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      data-cursor-label={visitLabel}
      aria-label={`${visitLabel}: ${title}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-zinc-950 cursor-zoom-in lg:cursor-none"
    >
      <Image
        src={imageSrc}
        alt={`${title} Preview`}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 92vw, 55vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />

      {/* Desktop Floating "Visit Page" Pill — Moves freely & clips naturally inside overflow-hidden image frame */}
      <div
        ref={pillRef}
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute top-0 left-0 z-20 will-change-transform"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 flex h-11 px-5 items-center justify-center rounded-full border border-zinc-200/30 bg-white text-zinc-950 shadow-xl transition-all duration-200 ease-out ${
            isHovered ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide whitespace-nowrap">
            <span>{visitLabel}</span>
            <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
          </span>
        </div>
      </div>

      {/* Mobile Zoom Hint Badge */}
      <div className="lg:hidden absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-zinc-700/70 bg-zinc-950/75 px-3 py-1 text-[11px] font-medium text-zinc-200 backdrop-blur-md pointer-events-none">
        <ZoomIn className="h-3.5 w-3.5" />
        <span>{locale === "id" ? "Perbesar" : "Zoom"}</span>
      </div>
    </div>
  );
}

export function Products() {
  const { t, locale } = useLanguage();
  const s = t.showcaseSection;

  const [zoomTarget, setZoomTarget] = useState<ZoomTarget | null>(null);

  const handleProjectImageClick = (project: {
    title: string;
    url: string;
    imageSrc: string;
  }) => {
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia(
        "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
      ).matches;

    if (isDesktop) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    } else {
      setZoomTarget({
        title: project.title,
        src: project.imageSrc,
      });
    }
  };

  return (
    <section
      id="showcase"
      className="w-full py-28 sm:py-40 lg:py-52 scroll-mt-20 bg-zinc-100/90 dark:bg-zinc-900/60 border-y border-zinc-200/90 dark:border-zinc-800/90 relative backdrop-blur-xs"
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        {/* Section Header */}
        <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 pb-8 mb-24 sm:mb-36 max-w-5xl">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {s.tag}
          </p>
          <ShowcaseTypingTitle text={s.title} />
        </div>

        {/* 2 Core Projects (Expansive Left-Right Split with Desktop Spotlight) */}
        <div className="space-y-36 sm:space-y-52 lg:space-y-64">
          {/* 1. SUIKA BOT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-28 items-center">
            {/* Left: Text & Action */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
                {s.suikaBot.tag}
              </span>
              <h3 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                {s.suikaBot.title}
              </h3>
              <p className="mt-5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                <FlowingText text={s.suikaBot.desc} staggerMs={40} />
              </p>
              <div className="mt-8">
                <a
                  href={siteConfig.links.botInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-950 dark:bg-zinc-50 px-6 py-3 text-xs sm:text-sm font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-xs"
                >
                  <span>{s.suikaBot.inviteBtn}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right: Project Image with Overflow-Clipped "Visit Page" Cursor (Desktop) & Image Zoom (Mobile) */}
            <div className="lg:col-span-7">
              <DesktopSpotlightCard
                glowColor="rgba(16, 185, 129, 0.16)"
                className="group rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-gradient-to-tr from-emerald-500/10 via-zinc-50/90 to-emerald-500/5 dark:from-emerald-950/30 dark:via-zinc-950/70 dark:to-zinc-950 p-3 sm:p-4 shadow-sm transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <ProjectImageWithCursor
                  title={s.suikaBot.title}
                  imageSrc={siteConfig.projectImages.suikaBot}
                  visitLabel={s.visitPage}
                  locale={locale}
                  priority
                  onSelect={() =>
                    handleProjectImageClick({
                      title: s.suikaBot.title,
                      url: siteConfig.links.botInvite,
                      imageSrc: siteConfig.projectImages.suikaBot,
                    })
                  }
                />
              </DesktopSpotlightCard>
            </div>
          </div>

          {/* 2. FAKE SALDO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-28 items-center">
            {/* Left: Text & Action */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-sky-600 dark:text-sky-400 font-semibold">
                {s.fakeSaldo.tag}
              </span>
              <h3 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                {s.fakeSaldo.title}
              </h3>
              <p className="mt-5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                <FlowingText text={s.fakeSaldo.desc} staggerMs={40} />
              </p>
              <div className="mt-8">
                <a
                  href={siteConfig.links.fakeSaldo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-950 dark:bg-zinc-50 px-6 py-3 text-xs sm:text-sm font-semibold text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-xs"
                >
                  <span>{s.fakeSaldo.openBtn}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right: Project Image with Overflow-Clipped "Visit Page" Cursor (Desktop) & Image Zoom (Mobile) */}
            <div className="lg:col-span-7">
              <DesktopSpotlightCard
                glowColor="rgba(14, 165, 233, 0.16)"
                className="group rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-gradient-to-tr from-sky-500/10 via-zinc-50/90 to-sky-500/5 dark:from-sky-950/30 dark:via-zinc-950/70 dark:to-zinc-950 p-3 sm:p-4 shadow-sm transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <ProjectImageWithCursor
                  title={s.fakeSaldo.title}
                  imageSrc={siteConfig.projectImages.fakeSaldo}
                  visitLabel={s.visitPage}
                  locale={locale}
                  onSelect={() =>
                    handleProjectImageClick({
                      title: s.fakeSaldo.title,
                      url: siteConfig.links.fakeSaldo,
                      imageSrc: siteConfig.projectImages.fakeSaldo,
                    })
                  }
                />
              </DesktopSpotlightCard>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Image Zoom Lightbox */}
      {zoomTarget && (
        <ImageZoomLightbox
          target={zoomTarget}
          locale={locale}
          onClose={() => setZoomTarget(null)}
        />
      )}
    </section>
  );
}
