'use client';

import React, { useRef, useState, useSyncExternalStore } from 'react';

interface DesktopSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

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

export function DesktopSpotlightCard({
  children,
  className = '',
  glowColor = 'rgba(16, 185, 129, 0.12)',
}: DesktopSpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, getServerSnapshot);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Subtle 3D tilt (max 3.5 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -3.5;
    const tiltY = ((x - centerX) / centerX) * 3.5;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    setMousePos(null);
    setTilt({ x: 0, y: 0 });
  };

  const transformStyle = isDesktop && mousePos
    ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.008, 1.008, 1.008)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isDesktop && !mousePos ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
        willChange: isDesktop ? 'transform' : 'auto',
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Desktop-only Interactive Spotlight Cursor Glow */}
      {isDesktop && mousePos && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 60%)`,
          }}
        />
      )}

      {children}
    </div>
  );
}

