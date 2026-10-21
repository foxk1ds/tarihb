"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, Menu, Search, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { useGlossary } from "@/components/providers/GlossaryContext";
import { cx } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

export function Navbar() {
  const { dictionary } = useLanguage();
  const { open: openGlossary } = useGlossary();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const links = [
    { href: "/", label: dictionary.nav.home },
    { href: "/factories", label: dictionary.nav.factories },
    { href: "/polygon", label: dictionary.nav.polygon },
    { href: "/consequences", label: dictionary.nav.consequences }
  ];

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 12);
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const openDictionary = () => {
    setMenuOpen(false);
    openGlossary();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="h-[2px] w-full bg-white/[0.04]">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-crimson transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div
          className={cx(
            "border-b transition-all duration-500",
            scrolled
              ? "border-white/[0.07] bg-night/80 shadow-[0_18px_50px_-30px_rgba(0,0,0,.9)] backdrop-blur-2xl"
              : "border-transparent bg-night/25 backdrop-blur-md"
          )}
        >
          <div className="container-page relative flex h-[70px] items-center justify-between gap-3">
            <Logo />

            <nav
              aria-label={dictionary.ui.menu}
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/[0.07] bg-white/[0.025] p-1 backdrop-blur-xl lg:flex"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  data-active={isActive(link.href)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openDictionary}
                className="hidden h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 text-[12px] font-medium text-zinc-300 transition-all duration-300 hover:border-amber-400/35 hover:bg-white/[0.06] hover:text-white md:inline-flex"
                aria-label={dictionary.ui.openGlossary}
              >
                <Search className="h-3.5 w-3.5 text-amber-400" strokeWidth={1.8} />
                <span>{dictionary.ui.glossary}</span>
                <kbd className="kbd ml-0.5 hidden xl:inline">⌘K</kbd>
              </button>

              <LanguageSwitcher className="hidden sm:inline-flex" />

              <button
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-zinc-300 transition-colors hover:border-amber-400/35 hover:text-white lg:hidden"
                aria-label={menuOpen ? dictionary.ui.close : dictionary.ui.menu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? <X className="h-4 w-4" strokeWidth={1.8} /> : <Menu className="h-4 w-4" strokeWidth={1.8} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-white/[0.06] bg-night/95 backdrop-blur-2xl lg:hidden"
        >
          <div className="container-page flex min-h-full flex-col py-8">
            <p className="eyebrow">
              <span className="h-px w-6 bg-amber-400/60" />
              {dictionary.ui.page} / 2026
            </p>
            <nav aria-label={dictionary.ui.menu} className="mt-6">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cx(
                    "group flex items-center justify-between border-b border-white/[0.07] py-5 transition-colors",
                    isActive(link.href) ? "text-amber-300" : "text-zinc-100 hover:text-amber-300"
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-zinc-600">0{index + 1}</span>
                    <span className="text-2xl font-medium tracking-[-0.03em]">{link.label}</span>
                  </span>
                  <ArrowUpRight
                    className={cx(
                      "h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                      isActive(link.href) ? "text-amber-400" : "text-zinc-600"
                    )}
                    strokeWidth={1.5}
                  />
                </Link>
              ))}
              <button
                type="button"
                onClick={openDictionary}
                className="group flex w-full items-center justify-between border-b border-white/[0.07] py-5 text-left text-zinc-100 transition-colors hover:text-amber-300"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-zinc-600">05</span>
                  <span className="text-2xl font-medium tracking-[-0.03em]">{dictionary.nav.glossary}</span>
                </span>
                <BookOpen className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-amber-400" strokeWidth={1.5} />
              </button>
            </nav>

            <div className="mt-auto pt-10">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  {dictionary.ui.languageLabel}
                </span>
                <LanguageSwitcher />
              </div>
              <p className="mt-6 border-t border-white/[0.06] pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                {dictionary.common.sourceNote}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
