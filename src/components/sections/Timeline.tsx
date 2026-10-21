"use client";

import { useLanguage } from "@/components/providers/LanguageContext";

export function Timeline() {
  const { dictionary } = useLanguage();
  return <ol className="relative mx-auto max-w-4xl border-l border-amber-400/50 pl-8 sm:pl-12">{dictionary.polygon.timeline.map((event) => <li key={event.year} className="relative pb-10 last:pb-0"><span className="absolute -left-[2.55rem] grid h-5 w-5 place-items-center rounded-full border-4 border-paper bg-crimson dark:border-zinc-950 sm:-left-[3.55rem]" /><p className="text-sm font-bold tracking-wide text-crimson">{event.year}</p><h3 className="mt-1 text-xl font-bold text-zinc-950 dark:text-white">{event.title}</h3><p className="mt-2 max-w-xl leading-relaxed text-zinc-600 dark:text-zinc-300">{event.text}</p></li>)}</ol>;
}
