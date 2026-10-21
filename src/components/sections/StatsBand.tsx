"use client";

import { CalendarRange, Factory, Radiation } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

export function StatsBand() {
  const { dictionary } = useLanguage();
  const { polygon, ui } = dictionary;

  const stats = [
    { value: 50, label: ui.factoriesStat, icon: Factory },
    { value: Number.parseInt(polygon.stat, 10) || 456, label: polygon.statLabel, icon: Radiation },
    { value: 40, label: ui.yearsStat, icon: CalendarRange }
  ];

  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.012] py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_100%_at_75%_0%,rgba(245,158,11,.045),transparent_60%)]"
      />
      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.5fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-7 bg-amber-400/60" aria-hidden="true" />
              {ui.archive}
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-zinc-50 sm:text-[28px]">
              {ui.statsTitle}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">{ui.statsText}</p>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-3 sm:gap-0">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Reveal
                  key={stat.label}
                  delay={80 + index * 90}
                  className={
                    index === 0
                      ? "sm:pr-6"
                      : index === 1
                        ? "border-t border-white/[0.08] pt-8 sm:border-l sm:border-t-0 sm:px-6 sm:pt-0"
                        : "border-t border-white/[0.08] pt-8 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0"
                  }
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-zinc-600">0{index + 1}</span>
                    <Icon className="h-4 w-4 text-amber-400/60" strokeWidth={1.5} />
                  </div>
                  <p className="mt-6 font-display text-5xl font-semibold leading-none tracking-[-0.05em] text-faint-gradient sm:text-6xl">
                    <Counter value={stat.value} duration={2000} />
                  </p>
                  <p className="mt-3 max-w-[14ch] font-mono text-[9px] uppercase leading-4 tracking-[0.16em] text-zinc-500">
                    {stat.label}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
