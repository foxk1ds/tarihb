"use client";

import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { InfoCard } from "@/components/ui/InfoCard";
import { useLanguage } from "@/components/providers/LanguageContext";

export default function HomePage() {
  const { dictionary } = useLanguage();
  const cards = [
    ["/factories", dictionary.overview.factoriesTitle, dictionary.overview.factoriesText, "01"],
    ["/polygon", dictionary.overview.polygonTitle, dictionary.overview.polygonText, "02"],
    ["/consequences", dictionary.overview.impactTitle, dictionary.overview.impactText, "03"]
  ];
  return <><Hero /><section className="mx-auto max-w-6xl px-5 py-20"><p className="text-xs font-bold uppercase tracking-[.2em] text-crimson">{dictionary.overview.heading}</p><div className="mt-7 grid gap-5 md:grid-cols-3">{cards.map(([href, title, text, number]) => <Link key={href} href={href}><InfoCard eyebrow={number} title={title}><p>{text}</p><p className="mt-5 font-bold text-amber-700 dark:text-amber-300">{dictionary.common.learnMore} →</p></InfoCard></Link>)}</div></section></>;
}
