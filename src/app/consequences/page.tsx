"use client";

import { useLanguage } from "@/components/providers/LanguageContext";
import { InfoCard } from "@/components/ui/InfoCard";

export default function ConsequencesPage() {
  const { dictionary } = useLanguage();
  const { consequences } = dictionary;
  return <section className="mx-auto max-w-6xl px-5 py-16"><div className="max-w-3xl border-l-4 border-crimson pl-6"><p className="text-xs font-bold uppercase tracking-[.2em] text-crimson">{consequences.eyebrow}</p><h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">{consequences.title}</h1><p className="mt-5 text-lg leading-relaxed text-zinc-600">{consequences.lead}</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{consequences.items.map((item, index) => <InfoCard key={item.title} eyebrow={`0${index + 1}`} title={item.title}><p>{item.text}</p></InfoCard>)}</div><div className="mt-10 rounded-2xl bg-zinc-950 p-7 text-zinc-200"><p className="text-sm leading-relaxed">{consequences.lead}</p></div></section>;
}
