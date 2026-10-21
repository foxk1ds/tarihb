"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, Compass } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { cx } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  index: string;
  stat: string;
  statLabel: string;
  meta?: string;
  note?: string;
  children?: ReactNode;
  accent?: "amber" | "crimson";
};

export function PageHero({
  eyebrow,
  title,
  lead,
  index,
  stat,
  statLabel,
  meta,
  note,
  children,
  accent = "amber"
}: PageHeroProps) {
  const { dictionary } = useLanguage();

  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_70%_at_78%_10%,rgba(245,158,11,.09),transparent_60%),radial-gradient(40%_50%_at_12%_40%,rgba(229,72,77,.035),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div className="container-page relative">
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <div className="animate-fade-up">
            <nav aria-label={dictionary.ui.page} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              <Link href="/" className="transition-colors hover:text-amber-300">
                {dictionary.nav.home}
              </Link>
              <ChevronRight className="h-3 w-3 text-zinc-700" strokeWidth={1.8} />
              <span className="text-zinc-400">{eyebrow}</span>
            </nav>

            <p className="eyebrow mt-8">
              <span className={cx("h-px w-7", accent === "amber" ? "bg-amber-400/60" : "bg-crimson/70")} aria-hidden="true" />
              {dictionary.ui.section} {index}
            </p>

            <h1 className="display-title mt-5 max-w-[13ch]">{title}</h1>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-zinc-400 sm:text-base">{lead}</p>
            {children && <div className="mt-9">{children}</div>}
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="absolute -left-10 top-0 hidden h-[78%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent xl:block" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[linear-gradient(160deg,rgba(255,255,255,.05),rgba(255,255,255,.012)_45%,rgba(255,255,255,0))] p-7 shadow-lift backdrop-blur-xl sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/[0.06]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-amber-400/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_100%_0%,rgba(245,158,11,.08),transparent_60%)]"
              />

              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                  {dictionary.ui.archive} / {index}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                  <Compass className="h-3 w-3 text-amber-400/70" strokeWidth={1.6} />
                  KAZ · 48°N
                </span>
              </div>

              <div className="relative mt-10">
                <p className="font-display text-[clamp(4.5rem,9vw,7.5rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-faint-gradient">
                  {stat}
                </p>
                <p className="mt-5 max-w-[18ch] text-sm font-medium leading-6 text-zinc-300">{statLabel}</p>
              </div>

              <div className="relative mt-10 flex items-end justify-between gap-4 border-t border-white/[0.08] pt-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                    {dictionary.ui.coordinates}
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] text-zinc-400">{meta ?? dictionary.polygon.period}</p>
                </div>
                <div aria-hidden="true" className="flex items-end gap-[3px]">
                  {[10, 18, 12, 24, 15, 30, 20, 34, 24, 38].map((height, i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-full bg-amber-400/40"
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {note && (
              <p className="mt-4 text-right font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                {note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
