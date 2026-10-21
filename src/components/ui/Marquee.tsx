"use client";

import { useLanguage } from "@/components/providers/LanguageContext";
import { cx } from "@/lib/utils";

export function Marquee() {
  const { dictionary } = useLanguage();

  const items = [
    { label: dictionary.polygon.period, accent: false },
    { label: dictionary.polygon.eyebrow, accent: false },
    { label: `${dictionary.polygon.stat} ${dictionary.polygon.statLabel}`, accent: true },
    { label: `50 ${dictionary.ui.factoriesStat}`, accent: false },
    { label: "Семей-21", accent: false },
    { label: dictionary.hero.eyebrow, accent: false },
    { label: "1949 / 1989", accent: true }
  ];

  const row = (hidden = false) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-9 pr-9 sm:gap-12 sm:pr-12"
    >
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex shrink-0 items-center gap-9 sm:gap-12">
          <span
            className={cx(
              "font-mono text-[10px] uppercase tracking-[0.22em]",
              item.accent ? "text-amber-300/90" : "text-zinc-500"
            )}
          >
            {item.label}
          </span>
          <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-amber-400/35" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.012] py-4">
      <div className="mask-fade-x">
        <div className="marquee">
          {row()}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
