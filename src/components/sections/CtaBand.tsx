"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { useGlossary } from "@/components/providers/GlossaryContext";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand({
  href = "/glossary",
  linkLabel
}: {
  href?: string;
  linkLabel?: string;
}) {
  const { dictionary } = useLanguage();
  const { open } = useGlossary();
  const { ui, glossary } = dictionary;

  return (
    <section className="relative pb-20 pt-10 sm:pb-28 sm:pt-16">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0a0d12]/85 shadow-lift backdrop-blur-xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_120%_at_15%_0%,rgba(245,158,11,.11),transparent_58%),radial-gradient(60%_90%_at_100%_100%,rgba(229,72,77,.06),transparent_60%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(to_right,rgba(255,255,255,.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.028)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]"
            />
            <span aria-hidden="true" className="absolute left-5 top-5 h-3 w-3 border-l border-t border-white/20" />
            <span aria-hidden="true" className="absolute right-5 top-5 h-3 w-3 border-r border-t border-white/20" />

            <div className="relative grid gap-10 p-7 sm:p-12 lg:grid-cols-[1.25fr_.75fr] lg:items-center lg:p-16">
              <div>
                <p className="eyebrow">
                  <span className="h-px w-7 bg-amber-400/60" aria-hidden="true" />
                  {ui.readDictionary}
                </p>
                <h2 className="display-title-sm mt-5 max-w-xl">{ui.ctaTitle}</h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400">{ui.ctaText}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <button type="button" onClick={open} className="btn btn-primary w-full lg:w-auto">
                  <BookOpen className="h-4 w-4" strokeWidth={1.8} />
                  {dictionary.hero.primaryCta}
                  <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.8} />
                </button>
                <Link href={href} className="btn btn-secondary w-full lg:w-auto">
                  {linkLabel ?? ui.fullGlossary}
                </Link>
              </div>
            </div>

            <div className="relative flex flex-col justify-between gap-2 border-t border-white/[0.07] px-7 py-5 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600 sm:flex-row sm:items-center sm:px-12 lg:px-16">
              <span>
                {glossary.items.length} {ui.terms} · {ui.ctaNote}
              </span>
              <span className="flex items-center gap-2">
                <span className="kbd">⌘K</span>
                {ui.searchShortcut}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
