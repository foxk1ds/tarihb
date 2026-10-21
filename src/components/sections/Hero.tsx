"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Radar } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { useGlossary } from "@/components/providers/GlossaryContext";
import { Counter } from "@/components/ui/Counter";
import { KazakhstanMap } from "./KazakhstanMap";

export function Hero() {
  const { dictionary } = useLanguage();
  const { open } = useGlossary();
  const { hero, polygon, factories, ui } = dictionary;

  const words = hero.title.split(" ");
  const splitAt = Math.min(4, Math.max(1, words.length - 1));
  const titleLead = words.slice(0, splitAt).join(" ");
  const titleAccent = words.slice(splitAt).join(" ");

  const stats = [
    { value: 50, label: ui.factoriesStat },
    { value: Number.parseInt(polygon.stat, 10) || 456, label: polygon.statLabel },
    { value: 40, label: ui.yearsStat }
  ];

  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,.07),transparent_65%)] blur-2xl"
      />
      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] xl:gap-20">
          <div className="relative z-10">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 shadow-inner-line backdrop-blur-xl">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-200 sm:text-[10px]">
                  {hero.eyebrow}
                </span>
                <span aria-hidden="true" className="h-3 w-px bg-white/15" />
                <span className="font-mono text-[9px] text-amber-300 sm:text-[10px]">1949—1989</span>
              </span>
            </div>

            <h1 className="display-title mt-7 max-w-[17ch] animate-fade-up [animation-delay:80ms]">
              <span className="text-faint-gradient">{titleLead}</span>{" "}
              <span className="text-amber-gradient">{titleAccent}</span>
            </h1>

            <p className="mt-6 max-w-xl animate-fade-up text-[15px] leading-7 text-zinc-400 [animation-delay:160ms] sm:text-base">
              {hero.summary}
            </p>

            <div className="mt-7 flex max-w-xl animate-fade-up gap-4 border-l border-amber-400/35 pl-4 [animation-delay:220ms]">
              <span className="mt-1 font-display text-2xl leading-none text-amber-400" aria-hidden="true">
                ?
              </span>
              <p className="text-[15px] font-medium leading-6 text-zinc-200 sm:text-base">{hero.question}</p>
            </div>

            <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:280ms] sm:flex-row sm:items-center">
              <button type="button" onClick={open} className="btn btn-primary">
                <BookOpen className="h-4 w-4" strokeWidth={1.8} />
                {hero.primaryCta}
                <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.8} />
              </button>
              <Link href="/polygon" className="btn btn-secondary">
                <Radar className="h-4 w-4 text-amber-400" strokeWidth={1.7} />
                {hero.secondaryCta}
              </Link>
            </div>

            <div className="mt-10 grid max-w-lg animate-fade-up grid-cols-3 divide-x divide-white/[0.08] border-y border-white/[0.07] [animation-delay:340ms]">
              {stats.map((stat) => (
                <div key={stat.label} className="py-4 pr-4 first:pl-0 last:pl-4 [&:not(:first-child)]:pl-4">
                  <p className="font-display text-2xl font-semibold leading-none tracking-[-0.04em] text-zinc-100 sm:text-[28px]">
                    <Counter value={stat.value} />
                  </p>
                  <p className="mt-2 font-mono text-[8px] uppercase leading-4 tracking-[0.14em] text-zinc-500 sm:text-[9px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:180ms]">
            <div className="mb-4 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
              <span className="flex items-center gap-2">
                <span className="h-px w-6 bg-amber-400/60" aria-hidden="true" />
                {ui.mapEyebrow}
              </span>
              <span className="hidden sm:inline">{ui.archive} · 1949—1989</span>
            </div>

            <KazakhstanMap cities={factories.cities}>
              <div className="relative z-20 flex items-center gap-4 border-t border-white/[0.08] bg-[#0a0d12]/85 px-5 py-5 backdrop-blur-xl sm:gap-5 sm:px-6">
                <div className="relative shrink-0">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-full bg-amber-400/[0.07] blur-xl"
                  />
                  <p className="relative font-display text-5xl font-semibold leading-none tracking-[-0.06em] text-amber-gradient sm:text-[56px]">
                    <Counter value={Number.parseInt(polygon.stat, 10) || 456} />
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-[13px] font-medium text-zinc-100 sm:text-sm">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                    </span>
                    {polygon.statLabel}
                  </p>
                  <p className="mt-1.5 truncate font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-500 sm:text-[9px]">
                    {polygon.period} · {ui.testSite}
                  </p>
                </div>
                <Link
                  href="/polygon"
                  aria-label={ui.nextSection}
                  className="group grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition-all duration-300 hover:border-amber-400/40 hover:bg-amber-400 hover:text-zinc-950"
                >
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
                </Link>
              </div>
            </KazakhstanMap>

            <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-600">
              <span>{ui.mapNote}</span>
              <Link href="/factories" className="group inline-flex items-center gap-1.5 transition-colors hover:text-amber-300">
                {dictionary.nav.factories}
                <ArrowRight className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 xl:block"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.34em] text-zinc-700 [writing-mode:vertical-rl]">
          Archive · Qazaqstan · 1949—1989
        </span>
      </div>
    </section>
  );
}
