"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/i18n/LanguageContext";
import { siteConfig } from "@/data/siteConfig";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const navLinks = [
    { href: "#showcase", label: t.nav.showcase },
    { href: "#about", label: t.nav.about },
    { href: "#faq", label: t.nav.faq },
  ];

  // Active section watcher / scroll spy
  useEffect(() => {
    const sectionIds = ["showcase", "about", "faq"];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < 200) {
        setActiveSection("");
        return;
      }

      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (
            rect.top <= windowHeight * 0.45 &&
            rect.bottom >= windowHeight * 0.15
          ) {
            current = `#${id}`;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const rafId = requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md transition-colors">
      <div className="relative w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-36 flex h-16 sm:h-20 items-center justify-between">
        {/* Brand Logo (Icon Only) */}
        <Link
          href="/"
          aria-label="Suika Studio"
          className="flex items-center group shrink-0"
        >
          <Image
            src="/brand/logo-icon.png"
            alt="Suika Studio"
            width={40}
            height={40}
            className="h-9 w-9 sm:h-10 sm:w-10 object-contain transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 select-none"
            priority
          />
        </Link>

        {/* Center Desktop Navigation Links with Active Section Watching */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-150 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 font-semibold shadow-2xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/60"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Utility Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Suika Studio"
            title="GitHub"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Trigger & Controls */}
        <div className="flex items-center gap-1.5 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Edge to Edge) */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 px-6 py-4 md:hidden backdrop-blur-md animate-in fade-in-0 duration-150">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 font-semibold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
