"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { FlowingText } from "@/components/ui/FlowingText";

export function Statement() {
  const { t } = useLanguage();

  return (
    <section
      id="manifesto"
      className="w-full border-t border-zinc-200/80 dark:border-zinc-800/80 py-24 sm:py-36 lg:py-44 scroll-mt-20"
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36">
        <div className="">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">
            MANIFESTO
          </p>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug sm:leading-relaxed italic">
            <FlowingText
              text={t.statement.quote}
              prefix="“"
              suffix="”"
              staggerMs={26}
            />
          </blockquote>
        </div>
      </div>
    </section>
  );
}
