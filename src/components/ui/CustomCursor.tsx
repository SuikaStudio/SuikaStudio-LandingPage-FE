'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

function subscribeDesktop(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getDesktopSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
}

function getServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, getServerSnapshot);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isInsideImageCursor, setIsInsideImageCursor] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
      }

      const target = e.target as HTMLElement | null;
      const labelEl = target
        ? (target.closest('[data-cursor-label]') as HTMLElement | null)
        : null;
      const hasLocalPill = Boolean(labelEl);

      setIsInsideImageCursor(hasLocalPill);

      if (hasLocalPill) {
        setIsHovering(false);
      } else if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, [role="button"], input, select, textarea, [data-hover]')
        );
        setIsHovering(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsInsideImageCursor(false);
    };

    const render = () => {
      // Responsive lerp interpolation (0.28 factor for fluid tracking)
      const lerpFactor = 0.28;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    if (isVisible) {
      animId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isDesktop, isVisible]);

  if (!isDesktop) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision Center Dot Wrapper (Pure GPU transform) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 will-change-transform"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-zinc-950 dark:bg-zinc-50 transition-all duration-200 ease-out ${
            isInsideImageCursor
              ? 'scale-0 opacity-0'
              : isHovering
                ? 'scale-75 opacity-70'
                : 'scale-100 opacity-100'
          }`}
        />
      </div>

      {/* Fluid Trailing Follower Ring Wrapper (Pure GPU transform) */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 will-change-transform"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full border transition-all duration-200 ease-out ${
            isInsideImageCursor
              ? 'scale-0 opacity-0 border-transparent bg-transparent'
              : isHovering
                ? 'scale-135 border-emerald-500/80 bg-emerald-500/15 dark:border-emerald-400 dark:bg-emerald-400/20 backdrop-blur-2xs'
                : 'scale-100 border-zinc-900/35 dark:border-zinc-100/35 bg-transparent'
          }`}
        />
      </div>
    </div>
  );
}
