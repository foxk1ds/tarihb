"use client";

import Link from "next/link";
import { CalendarRange, Map, Radiation } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { CtaBand } from "@/components/sections/CtaBand";
import { KazakhstanMap } from "@/components/sections/KazakhstanMap";
import { Timeline } from "@/components/sections/Timeline";
import { Counter } from "@/components/ui/Counter";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

export function PolygonView() {
  const { dictionary } = useLanguage();
  const { polygon, factories, ui } = dictionary;

  const facts = [
    {
      icon: CalendarRange,
      value: polygon.period,
      label: ui.period,
      note: undefined,
      compact: true
    },
    {
      icon: Radiation,
      value: polygon.stat,
      label: polygon.statLabel,
      note: undefined,
      compact: false
    },
    {
      icon: Map,
      value: "3",
      label: ui.regions,
      note: polygon.lead,
      compact: false
    }
  ];

  return (
    <>
      <PageHero
        eyebrow={polygon.eyebrow}
        title={polygon.title}
        lead={polygon.lead}
        index="02"
        stat={polygon.stat}
        statLabel={polygon.statLabel}
        meta={polygon.period}
        note={ui.mapNote}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#timeline" className="btn btn-primary">
            {ui.timelineEyebrow}
            <span aria-hidden="true">↓</span>
          </a>
          <Link href="/consequences" className="btn btn-secondary">
            {dictionary.nav.consequences}
          </Link>
        </div>
      </PageHero>

      <section className="pb-6 pt-2 sm:pb-10">
        <div className="container-page grid gap-3 sm:grid-cols-3">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <Reveal key={fact.label} delay={index * 90}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.022] p-6 transition-colors duration-300 hover:border-amber-400/20">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                      {fact.label}
                    </p>
                    <Icon className="h-4 w-4 text-amber-400/60" strokeWidth={1.5} />
                  </div>
                  <p
                    className={cx(
                      "mt-6 font-display font-semibold tracking-[-0.05em] text-faint-gradient",
                      fact.compact ? "text-3xl sm:text-[34px]" : "text-5xl sm:text-6xl"
                    )}
                  >
                    {fact.compact ? fact.value : <Counter value={Number(fact.value)} />}
                  </p>
                  {fact.note && (
                    <p className="mt-4 border-t border-white/[0.07] pt-4 text-xs leading-5 text-zinc-500">
                      {fact.note}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Timeline />

      <section className="relative py-16 sm:py-20">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
            <Reveal>
              <p className="eyebrow">
                <span className="h-px w-7 bg-amber-400/60" aria-hidden="true" />
                {ui.mapEyebrow}
              </p>
              <h2 className="display-title-sm mt-4 max-w-lg">{dictionary.hero.question}</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400">{polygon.lead}</p>

              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-6">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-600">
                    {ui.testSite}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-zinc-300">49.9° N · 78.6° E</p>
                </div>
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-600">
                    {ui.period}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-zinc-300">{polygon.period}</p>
                </div>
              </div>

              <Link
                href="/factories"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-amber-300 transition-colors hover:text-amber-200"
              >
                {dictionary.nav.factories}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>

            <Reveal delay={120}>
              <KazakhstanMap cities={factories.cities} />
              <div className="mt-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-600">
                <span>{ui.mapHint}</span>
                <span>{ui.mapNote}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand href="/consequences" linkLabel={dictionary.nav.consequences} />
    </>
  );
}
