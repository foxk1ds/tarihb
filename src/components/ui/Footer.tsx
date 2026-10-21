"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { useGlossary } from "@/components/providers/GlossaryContext";
import { Logo } from "./Logo";

export function Footer() {
  const { dictionary } = useLanguage();
  const { open } = useGlossary();
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: dictionary.nav.home },
    { href: "/factories", label: dictionary.nav.factories },
    { href: "/polygon", label: dictionary.nav.polygon },
    { href: "/consequences", label: dictionary.nav.consequences }
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.07]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_20%_100%,rgba(245,158,11,.06),transparent_60%)]"
      />
      <div className="container-page relative pt-16 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_.7fr_.9fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-6 text-zinc-400">{dictionary.footer.tagline}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
              <span className="h-1 w-1 rounded-full bg-amber-400" />
              {dictionary.footer.edition}
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {dictionary.footer.explore}
            </p>
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-zinc-300 transition-colors hover:text-amber-300"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="h-3 w-3 text-zinc-600 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      strokeWidth={1.8}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {dictionary.footer.dictionary}
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <button
                  type="button"
                  onClick={open}
                  className="group inline-flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-amber-300"
                >
                  <BookOpen className="h-3.5 w-3.5 text-amber-400/80" strokeWidth={1.6} />
                  {dictionary.ui.openGlossary}
                </button>
              </li>
              <li>
                <Link
                  href="/glossary"
                  className="inline-flex items-center gap-1.5 text-sm text-zinc-300 transition-colors hover:text-amber-300"
                >
                  {dictionary.ui.fullGlossary}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {dictionary.footer.sources}
            </p>
            <p className="mt-5 text-sm leading-6 text-zinc-300">{dictionary.footer.sourceValue}</p>
            <p className="mt-3 text-xs leading-5 text-zinc-500">{dictionary.common.sourceNote}</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:border-amber-400/30 hover:text-amber-300"
            >
              <ArrowUp
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
              {dictionary.ui.backToTop}
            </button>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.06] py-6">
          <div className="flex flex-col justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600 sm:flex-row sm:items-center">
            <p>
              © {year} · ТАРИХ<span className="text-amber-400/70">.</span> — {dictionary.footer.rights}
            </p>
            <p>{dictionary.polygon.period} · {dictionary.hero.eyebrow}</p>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none relative -mb-[3.5vw] select-none whitespace-nowrap text-center font-display text-[18vw] font-semibold leading-none tracking-[-0.06em] text-white/[0.022]"
      >
        1949 — 1989
      </div>
    </footer>
  );
}
