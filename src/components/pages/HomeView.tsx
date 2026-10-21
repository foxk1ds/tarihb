"use client";

import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { ResearchGrid } from "@/components/sections/ResearchGrid";
import { StatsBand } from "@/components/sections/StatsBand";
import { Timeline } from "@/components/sections/Timeline";
import { CtaBand } from "@/components/sections/CtaBand";
import { useLanguage } from "@/components/providers/LanguageContext";

export function HomeView() {
  const { dictionary } = useLanguage();

  return (
    <>
      <Hero />
      <Marquee />
      <ResearchGrid />
      <StatsBand />
      <Timeline />
      <CtaBand href="/polygon" linkLabel={dictionary.hero.secondaryCta} />
    </>
  );
}
