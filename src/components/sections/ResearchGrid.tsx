"use client";

import { ArrowUpRight, Baby, Factory, HeartPulse, Leaf, Radiation } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cx } from "@/lib/utils";

const consequenceIcons = [Leaf, Baby, HeartPulse];

function ArrowBadge() {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.025] text-zinc-400 transition-all duration-500 group-hover:border-amber-400/40 group-hover:bg-amber-400 group-hover:text-zinc-950">
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.7}
      />
    </span>
  );
}

export function ResearchGrid() {
  const { dictionary } = useLanguage();
  const { overview, factories, polygon, consequences, ui } = dictionary;

  return (
    <section id="directions" className="relative py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={ui.explore}
            title={overview.heading}
            description={consequences.lead}
            index="01"
            action={
              <span className="hidden items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500 sm:inline-flex">
                <span className="h-1 w-1 rounded-full bg-amber-400" />
                {polygon.period}
              </span>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7" delay={60}>
            <SpotlightCard
              href="/factories"
              ariaLabel={overview.factoriesTitle}
              className="h-full min-h-[340px] sm:min-h-[380px]"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                    01 / {factories.eyebrow}
                  </p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-zinc-50 sm:text-3xl">
                    {overview.factoriesTitle}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">{overview.factoriesText}</p>
                </div>
                <ArrowBadge />
              </div>

              <div className="mt-auto flex items-end justify-between gap-6 pt-12">
                <div>
                  <p className="font-display text-[68px] font-semibold leading-none tracking-[-0.06em] text-faint-gradient sm:text-[84px]">
                    <Counter value={50} />
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                    {ui.factoriesStat}
                  </p>
                </div>
                <div className="hidden space-y-2.5 sm:block">
                  {factories.cities.map((city) => (
                    <div key={city.city} className="flex items-center gap-2.5 text-[11px] text-zinc-400">
                      <span className="font-mono text-[8px] text-amber-400/70">{city.marker}</span>
                      <span className="h-px w-4 bg-white/10" />
                      {city.city}
                    </div>
                  ))}
                </div>
              </div>

              <Factory
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -right-6 h-48 w-48 text-white/[0.035] transition-all duration-700 group-hover:text-amber-400/[0.07]"
                strokeWidth={0.7}
              />
            </SpotlightCard>
          </Reveal>

          <Reveal className="md:col-span-5" delay={140}>
            <SpotlightCard
              href="/polygon"
              ariaLabel={overview.polygonTitle}
              className="h-full min-h-[340px] overflow-hidden bg-[radial-gradient(120%_100%_at_100%_0%,rgba(229,72,77,.08),transparent_55%)] sm:min-h-[380px]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-crimson/15"
              >
                <span className="absolute inset-10 rounded-full border border-crimson/12" />
                <span className="absolute inset-20 rounded-full border border-crimson/10" />
                <span className="absolute inset-28 rounded-full border border-dashed border-crimson/20" />
              </div>

              <div className="flex items-start justify-between gap-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  02 / {polygon.eyebrow}
                </p>
                <ArrowBadge />
              </div>

              <div className="relative mt-auto pt-14">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-full border border-crimson/25 bg-crimson/[0.07] text-crimson-400">
                  <Radiation className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className="font-display text-[64px] font-semibold leading-none tracking-[-0.06em] text-amber-gradient sm:text-[80px]">
                  {polygon.stat}
                </p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-zinc-200">{polygon.statLabel}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                    {polygon.period}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="md:col-span-12" delay={220}>
            <SpotlightCard
              href="/consequences"
              ariaLabel={overview.impactTitle}
              className="min-h-0 bg-[radial-gradient(80%_120%_at_0%_100%,rgba(229,72,77,.055),transparent_55%)]"
            >
              <div className="grid gap-10 lg:grid-cols-[.9fr_1.4fr] lg:items-center lg:gap-14">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                    03 / {consequences.eyebrow}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-zinc-50 sm:text-3xl">
                    {overview.impactTitle}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">{overview.impactText}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-amber-300/90">
                    {dictionary.common.learnMore}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} />
                  </span>
                </div>

                <div className="grid gap-6 sm:grid-cols-3 sm:gap-0">
                  {consequences.items.map((item, index) => {
                    const Icon = consequenceIcons[index] ?? Leaf;
                    return (
                      <div
                        key={item.title}
                        className={cx(
                          "border-t border-white/[0.08] pt-5 sm:border-l sm:border-t-0 sm:px-5 sm:pt-0",
                          index === 0 && "sm:pl-0",
                          index === consequences.items.length - 1 && "sm:pr-0"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] text-zinc-600">0{index + 1}</span>
                          <Icon className="h-4 w-4 text-crimson-400/80" strokeWidth={1.5} />
                        </div>
                        <h4 className="mt-4 text-sm font-medium text-zinc-100">{item.title}</h4>
                        <p className="mt-2 text-xs leading-5 text-zinc-500">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
