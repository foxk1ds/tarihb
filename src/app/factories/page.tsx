"use client";

import { FactoryMap } from "@/components/sections/FactoryMap";
import { useLanguage } from "@/components/providers/LanguageContext";

export default function FactoriesPage() {
  const { dictionary } = useLanguage();
  return <section className="mx-auto max-w-6xl px-5 py-16"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-crimson">{dictionary.factories.eyebrow}</p><h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">{dictionary.factories.title}</h1><p className="mt-5 text-lg leading-relaxed text-zinc-600">{dictionary.factories.lead}</p></div><div className="mt-12"><FactoryMap /></div></section>;
}
