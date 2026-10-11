'use client';

import { useState, useEffect, useRef } from 'react';

interface FlowingTextProps {
  text: string;
  prefix?: string;
  suffix?: string;
  staggerMs?: number;
  delayMs?: number;
  active?: boolean;
}

export function FlowingText({
  text,
  prefix = '',
  suffix = '',
  staggerMs = 24,
  delayMs = 0,
  active,
}: FlowingTextProps) {
  const [observedVisible, setObservedVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (active !== undefined) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setObservedVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  const isVisible = active !== undefined ? active : observedVisible;

  const fullText = `${prefix}${text}${suffix}`;
  const words = fullText.split(' ');

  return (
    <span ref={containerRef} className="inline">
      {words.map((word, idx) => (
        <span key={idx} className="inline">
          <span
            style={{
              transitionDelay: isVisible ? `${delayMs + idx * staggerMs}ms` : '0ms',
            }}
            className={`inline-block transition-all duration-500 ease-out will-change-[opacity,transform,filter] ${
              isVisible
                ? 'opacity-100 translate-y-0 blur-none'
                : 'opacity-0 translate-y-2.5 blur-[3px]'
            }`}
          >
            {word}
          </span>
          {idx < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

