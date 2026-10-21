"use client";

import Link from "next/link";
import { Factory, MapPin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { CityExplorer } from "@/components/sections/CityExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { Counter } from "@/components/ui/Counter";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export function FactoriesView() {
  const { dictionary } = useLanguage();
  const { factories, ui } = dictionary;

  return (
    <>
      <PageHero
        eyebrow={factories.eyebrow}
        title={factories.title}
        lead={factories.lead}
        index="01"
        stat="50"
        statLabel={factories.statLabel}
        meta={`${factories.cities.length} ${ui.cities} · KAZ`}
        note={ui.mapNote}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#geography" className="btn btn-primary">
            <MapPin className="h-4 w-4" strokeWidth={1.8} />
            {ui.citiesTitle}
          </a>
          <Link href="/polygon" className="btn btn-secondary">
            {dictionary.hero.secondaryCta}
          </Link>
        </div>
      </PageHero>

      <CityExplorer />

      <section className="container-page pb-20 pt-8 sm:pb-24 sm:pt-12">
        <Reveal>
          <div className="grid gap-12 border-t border-white/[0.07] pt-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:pt-20">
            <div>
              <p className="eyebrow">
                <span className="h-px w-7 bg-amber-400/60" aria-hidden="true" />
                {ui.explore} / 02
              </p>
              <h2 className="display-title-sm mt-4 max-w-lg">{factories.title}</h2>
              <div className="mt-8 border-l border-amber-400/35 pl-5">
                <p className="max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">{factories.lead}</p>
              </div>
              <div className="mt-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                <span className="h-1 w-1 rounded-full bg-amber-400" />
                {factories.statLabel}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0d12]/70 p-6 shadow-lift sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_100%_0%,rgba(245,158,11,.075),transparent_60%)]"
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                    {ui.archive} / 50
                  </p>
                  <p className="mt-4 font-display text-6xl font-semibold leading-none tracking-[-0.06em] text-amber-gradient sm:text-7xl">
                    <Counter value={50} duration={2000} />
                  </p>
                  <p className="mt-3 max-w-[16ch] text-sm text-zinc-400">{factories.statLabel}</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-amber-400/20 bg-amber-400/[0.06] text-amber-300">
                  <Factory className="h-5 w-5" strokeWidth={1.5} />
                </span>
              </div>

              <div className="relative mt-9 grid grid-cols-10 gap-1.5 sm:gap-2">
                {Array.from({ length: 50 }).map((_, index) => (
                  <span
                    key={index}
                    className="aspect-square rounded-[3px] bg-amber-400 transition-colors duration-300 hover:bg-amber-300"
                    style={{ opacity: 0.18 + (index % 9) * 0.055 }}
                  />
                ))}
              </div>

              <div className="relative mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4 font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-600">
                <span>{ui.eachDot}</span>
                <span>01 — 50</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand href="/polygon" linkLabel={dictionary.hero.secondaryCta} />
    </>
  );
}
