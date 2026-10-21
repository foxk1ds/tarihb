"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/utils";

export function Timeline() {
  const { dictionary } = useLanguage();
  const { polygon, ui } = dictionary;
  const [active, setActive] = useState(0);

  const items = polygon.timeline;
  const last = items.length - 1;
  const current = items[active];
  const ratio = last > 0 ? active / last : 0;
  const progressWidth = `${ratio * 75}%`;

  const move = (direction: 1 | -1) => {
    const next = Math.min(last, Math.max(0, active + direction));
    setActive(next);
    document.getElementById(`timeline-tab-${next}`)?.focus();
  };

  return (
    <section id="timeline" className="relative py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={ui.timelineEyebrow}
            title={ui.timelineTitle}
            description={ui.timelineHint}
            index="02"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mt-10 overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-[#090c11]/80 shadow-lift backdrop-blur-xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_85%_0%,rgba(245,158,11,.065),transparent_55%)]"
            />
            <div className="relative p-6 sm:p-9 lg:p-10">
              <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-amber-400" />
                  {polygon.period}
                </span>
                <span>
                  {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>

              <div
                role="tablist"
                aria-label={ui.timelineTitle}
                className="relative mt-9 sm:mt-12"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-[12.5%] right-[12.5%] top-[5px] h-px bg-white/[0.12]"
                />
                <div
                  aria-hidden="true"
                  className="absolute left-[12.5%] top-[5px] h-px bg-gradient-to-r from-amber-500 via-amber-300 to-amber-200 shadow-[0_0_12px_rgba(251,191,36,.6)] transition-[width] duration-500 ease-out"
                  style={{ width: progressWidth }}
                />

                <div className="grid grid-cols-4">
                  {items.map((item, index) => {
                    const isActive = index === active;
                    const isPast = index < active;
                    return (
                      <button
                        key={item.year}
                        id={`timeline-tab-${index}`}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="timeline-panel"
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => setActive(index)}
                        onKeyDown={(event) => {
                          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                            event.preventDefault();
                            move(1);
                          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                            event.preventDefault();
                            move(-1);
                          } else if (event.key === "Home") {
                            event.preventDefault();
                            setActive(0);
                            document.getElementById("timeline-tab-0")?.focus();
                          } else if (event.key === "End") {
                            event.preventDefault();
                            setActive(last);
                            document.getElementById(`timeline-tab-${last}`)?.focus();
                          }
                        }}
                        className="group flex flex-col items-center gap-3 text-center focus-visible:outline-offset-8"
                      >
                        <span
                          className={cx(
                            "relative z-10 grid h-[11px] w-[11px] place-items-center rounded-full border transition-all duration-500",
                            isActive
                              ? "border-amber-300 bg-amber-400 shadow-[0_0_0_5px_rgba(245,158,11,.12),0_0_20px_rgba(245,158,11,.5)]"
                              : isPast
                                ? "border-amber-400/60 bg-amber-400/40"
                                : "border-white/20 bg-[#0b0e13] group-hover:border-amber-400/60"
                          )}
                        >
                          {isActive && <span className="h-1 w-1 rounded-full bg-zinc-950" />}
                        </span>
                        <span
                          className={cx(
                            "font-display text-[12px] font-medium tracking-[-0.01em] transition-colors duration-300 sm:text-[15px]",
                            isActive ? "text-amber-300" : "text-zinc-500 group-hover:text-zinc-200"
                          )}
                        >
                          {item.year}
                        </span>
                        <span
                          className={cx(
                            "hidden max-w-[14ch] text-[10px] leading-4 transition-colors duration-300 sm:block",
                            isActive ? "text-zinc-300" : "text-zinc-600 group-hover:text-zinc-400"
                          )}
                        >
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                id="timeline-panel"
                role="tabpanel"
                aria-labelledby={`timeline-tab-${active}`}
                tabIndex={0}
                key={`${active}-${current.year}`}
                className="mt-12 grid animate-fade-up gap-8 border-t border-white/[0.07] pt-9 sm:mt-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-14"
              >
                <div className="relative">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                    {polygon.eyebrow}
                  </p>
                  <p className="mt-4 font-display text-[clamp(3.4rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-faint-gradient">
                    {current.year}
                  </p>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-amber-400" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                      {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-3xl">
                      {current.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-[15px]">
                      {current.text}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => move(-1)}
                        disabled={active === 0}
                        aria-label={ui.prev}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.025] text-zinc-300 transition-all duration-300 hover:border-amber-400/35 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ArrowLeft className="h-4 w-4" strokeWidth={1.7} />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(1)}
                        disabled={active === last}
                        aria-label={ui.next}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.025] text-zinc-300 transition-all duration-300 hover:border-amber-400/35 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
                      </button>
                    </div>
                    <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600 sm:block">
                      {ui.timelineEyebrow}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
