"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageContext";

export default function GlossaryPage() {
  const { dictionary } = useLanguage();
  const [query, setQuery] = useState("");
  const terms = useMemo(() => dictionary.glossary.items.filter((item) => `${item.term} ${item.definition}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())), [dictionary, query]);
  return <section className="mx-auto max-w-6xl px-5 py-16"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-crimson">{dictionary.glossary.eyebrow}</p><h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">{dictionary.glossary.title}</h1><p className="mt-4 leading-relaxed text-zinc-600">{dictionary.glossary.intro}</p></div><label className="mt-10 block max-w-xl"><span className="sr-only">{dictionary.glossary.search}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={dictionary.glossary.search} className="w-full rounded-xl border border-zinc-300 bg-white px-5 py-4 outline-none transition placeholder:text-zinc-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-200" /></label><div className="mt-7 grid gap-4 sm:grid-cols-2">{terms.map((item) => <details key={item.term} className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition open:border-amber-400 open:shadow-document"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-zinc-900">{item.term}<span className="text-xl text-amber-600 transition group-open:rotate-45">+</span></summary><p className="mt-4 border-t border-zinc-100 pt-4 text-sm leading-relaxed text-zinc-600">{item.definition}</p></details>)}</div>{terms.length === 0 && <p className="mt-8 rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500">{dictionary.glossary.empty}</p>}</section>;
}
