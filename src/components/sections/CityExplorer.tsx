"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";
import { MAP_CITIES } from "@/lib/geo";
import { KazakhstanMap } from "./KazakhstanMap";

const cityIds = ["almaty", "petropavl", "oskemen"] as const;

export function CityExplorer() {
  const { dictionary } = useLanguage();
  const { factories, ui } = dictionary;
  const [activeId, setActiveId] = useState<string>("almaty");

  const coordinates = MAP_CITIES.filter((city) => city.id !== "astana");

  return (
    <section id="geography" className="relative py-16 sm:py-20">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.22fr_.78fr] lg:items-start lg:gap-12">
          <Reveal>
            <KazakhstanMap
              cities={factories.cities}
              activeCityId={activeId}
              onCitySelect={setActiveId}
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-600">
              <span>{ui.mapHint}</span>
              <span>{ui.mapNote}</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">
              <span className="h-px w-7 bg-amber-400/60" aria-hidden="true" />
              {ui.citiesEyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-zinc-50 sm:text-[30px]">
              {ui.citiesTitle}
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{ui.citiesHint}</p>

            <div className="mt-7 space-y-2.5">
              {factories.cities.map((city, index) => {
                const id = cityIds[index];
                const active = activeId === id;
                const coordinate = coordinates[index];

                return (
                  <button
                    key={city.city}
                    type="button"
                    onClick={() => setActiveId(id)}
                    aria-pressed={active}
                    className={cx(
                      "group w-full rounded-xl border p-4 text-left transition-all duration-300 sm:p-5",
                      active
                        ? "border-amber-400/30 bg-amber-400/[0.055] shadow-[0_0_50px_-30px_rgba(245,158,11,.5)]"
                        : "border-white/[0.08] bg-white/[0.018] hover:border-white/[0.16] hover:bg-white/[0.035]"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={cx(
                          "pt-0.5 font-mono text-[9px] transition-colors",
                          active ? "text-amber-300" : "text-zinc-600"
                        )}
                      >
                        {city.marker}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-base font-medium tracking-[-0.02em] text-zinc-100">
                            {city.city}
                          </h3>
                          <span
                            className={cx(
                              "h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300",
                              active
                                ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,.8)]"
                                : "bg-zinc-700 group-hover:bg-zinc-500"
                            )}
                          />
                        </div>
                        <p
                          className={cx(
                            "mt-1 text-[13px] font-medium transition-colors",
                            active ? "text-amber-300/90" : "text-zinc-300"
                          )}
                        >
                          {city.label}
                        </p>
                        <p className="mt-1.5 text-xs leading-5 text-zinc-500">{city.detail}</p>

                        <div
                          className={cx(
                            "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.16,1,.3,1)]",
                            active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="mt-3 flex items-end justify-between gap-4 border-t border-white/[0.08] pt-3">
                              <div>
                                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-600">
                                  {ui.coordinates}
                                </p>
                                <p className="mt-1 font-mono text-[10px] text-zinc-400">
                                  {coordinate
                                    ? `${Math.abs(coordinate.lat).toFixed(2)}° N · ${Math.abs(coordinate.lon).toFixed(2)}° E`
                                    : "—"}
                                </p>
                              </div>
                              <ArrowUpRight className="h-4 w-4 text-amber-400/70" strokeWidth={1.6} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
