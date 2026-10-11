'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

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

export function AmbientBackgroundGlow() {
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, getServerSnapshot);
  const glowRef = useRef<HTMLDivElement>(null);

  const targetPos = useRef({ x: -500, y: -500 });
  const currentPos = useRef({ x: -500, y: -500 });

  useEffect(() => {
    if (!isDesktop) return;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const render = () => {
      // Soft, gentle lerp (0.07) for a calm, floating ambient follow
      const lerp = 0.07;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Floating Ambient Aurora Glow (Desktop Hover Interaction) */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-[650px] w-[650px] rounded-full bg-gradient-to-tr from-emerald-500/12 via-rose-500/8 to-transparent dark:from-emerald-400/10 dark:via-sky-500/8 blur-[120px] will-change-transform opacity-75"
      />
    </div>
  );
}

