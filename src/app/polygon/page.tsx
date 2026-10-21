"use client";

import { Timeline } from "@/components/sections/Timeline";
import { useLanguage } from "@/components/providers/LanguageContext";

export default function PolygonPage() {
  const { dictionary } = useLanguage();
  const { polygon } = dictionary;
  return <><section className="bg-zinc-950 py-16 text-white"><div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[1.15fr_.85fr]"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-300">{polygon.eyebrow}</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{polygon.title}</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-300">{polygon.lead}</p></div><div className="rounded-2xl border border-amber-400/30 bg-zinc-900 p-6"><p className="text-6xl font-black text-amber-400">{polygon.stat}</p><p className="mt-1 font-bold text-zinc-200">{polygon.statLabel}</p><p className="mt-7 border-t border-zinc-700 pt-4 text-sm font-semibold text-zinc-400">{polygon.period}</p></div></div></section><section className="mx-auto max-w-6xl px-5 py-16"><Timeline /></section></>;
}
