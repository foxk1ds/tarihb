"use client";

import Link from "next/link";
import { Baby, HeartPulse, Leaf, Quote } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Leaf, Baby, HeartPulse];

export function ConsequencesView() {
  const { dictionary } = useLanguage();
  const { consequences, ui, polygon } = dictionary;

  return (
    <>
      <PageHero
        eyebrow={consequences.eyebrow}
        title={consequences.title}
        lead={consequences.lead}
        index="03"
        stat="03"
        statLabel={ui.impactDirections}
        meta={polygon.period}
        note={ui.lesson}
        accent="crimson"
      >
        <div className="flex flex-wrap gap-3">
          <a href="#impact" className="btn btn-primary">
            {ui.impactDirections}
            <span aria-hidden="true">↓</span>
          </a>
          <Link href="/polygon" className="btn btn-secondary">
            {dictionary.nav.polygon}
          </Link>
        </div>
      </PageHero>

      <section id="impact" className="pb-14 pt-4 sm:pb-20">
        <div className="container-page">
          <Reveal>
            <div className="flex items-end justify-between gap-6 border-t border-white/[0.07] pt-8">
              <div>
                <p className="eyebrow">
                  <span className="h-px w-7 bg-crimson/70" aria-hidden="true" />
                  {ui.impactDirections}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-zinc-50 sm:text-[28px]">
                  {consequences.title}
                </h2>
              </div>
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600 sm:block">
                01 — 03
              </span>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {consequences.items.map((item, index) => {
              const Icon = icons[index] ?? Leaf;
              return (
                <Reveal key={item.title} delay={index * 100}>
                  <article className="glow-card group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-white/[0.022] p-6 shadow-inner-line sm:p-7">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(229,72,77,.12),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <div className="relative flex items-start justify-between gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-crimson/20 bg-crimson/[0.06] text-crimson-400">
                        <Icon className="h-5 w-5" strokeWidth={1.4} />
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                        0{index + 1} / 03
                      </span>
                    </div>

                    <h3 className="relative mt-8 text-xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>

                    <div className="relative mt-auto flex items-end justify-between border-t border-white/[0.07] pt-5">
                      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-600">
                        {ui.legendSite}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-display text-5xl font-semibold leading-none tracking-[-0.06em] text-white/[0.04] transition-colors duration-500 group-hover:text-crimson/[0.09]"
                      >
                        0{index + 1}
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-12 pt-6 sm:pb-16">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0a0d12]/75 px-6 py-12 text-center shadow-lift backdrop-blur-xl sm:px-12 sm:py-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(229,72,77,.09),transparent_62%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
              >
                <span className="absolute inset-12 rounded-full border border-white/[0.04]" />
                <span className="absolute inset-24 rounded-full border border-dashed border-crimson/10" />
              </div>

              <div className="relative">
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-crimson/20 bg-crimson/[0.06] text-crimson-400">
                  <Quote className="h-5 w-5" strokeWidth={1.4} />
                </span>
                <p className="mx-auto mt-7 max-w-3xl text-balance text-xl font-medium leading-8 tracking-[-0.02em] text-zinc-100 sm:text-2xl sm:leading-9">
                  {consequences.lead}
                </p>
                <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  {ui.lesson}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link href="/polygon" className="btn btn-secondary">
                    {dictionary.nav.polygon}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand href="/polygon" linkLabel={dictionary.nav.polygon} />
    </>
  );
}
