"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { cx } from "@/lib/utils";

export function FactoryMap() {
  const { dictionary } = useLanguage();
  const [selected, setSelected] = useState(0);
  const cities = dictionary.factories.cities;
  const city = cities[selected];
  return <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]"><div className="rounded-2xl bg-zinc-950 p-6 text-white"><p className="text-xs font-bold uppercase tracking-[.18em] text-amber-300">{dictionary.factories.title}</p><p className="mt-5 text-6xl font-black text-amber-400">50<span className="text-2xl">≈</span></p><p className="text-sm text-zinc-300">{dictionary.factories.statLabel}</p><p className="mt-7 border-t border-zinc-800 pt-5 text-sm leading-relaxed text-zinc-400">{dictionary.factories.lead}</p></div><div className="grid gap-3 sm:grid-cols-3">{cities.map((item, index) => <button key={item.city} onClick={() => setSelected(index)} className={cx("rounded-2xl border p-5 text-left transition", index === selected ? "border-amber-400 bg-amber-50 shadow-document dark:bg-amber-400/10" : "border-zinc-200 bg-white hover:border-amber-300 dark:border-zinc-800 dark:bg-zinc-900")}><span className="text-sm font-bold text-crimson">{item.marker}</span><h3 className="mt-8 text-xl font-bold text-zinc-900 dark:text-white">{item.city}</h3><p className="mt-2 text-sm font-semibold text-amber-700 dark:text-amber-300">{item.label}</p><p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{item.detail}</p></button>)}</div><div className="lg:col-span-2 rounded-xl border-l-4 border-crimson bg-zinc-100 px-5 py-4 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"><strong>{city.city}:</strong> {city.label} · {city.detail}</div></div>;
}
