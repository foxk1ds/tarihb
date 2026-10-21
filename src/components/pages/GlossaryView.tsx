"use client";

import { useMemo, useState } from "react";
import { BookOpen, Search, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { useGlossary } from "@/components/providers/GlossaryContext";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { TermAccordion } from "@/components/ui/TermAccordion";
import { Reveal } from "@/components/ui/Reveal";

export function GlossaryView() {
  const { dictionary, language } = useLanguage();
  const { open } = useGlossary();
  const { glossary, ui } = dictionary;
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(0);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return glossary.items;
    return glossary.items.filter((item) =>
      `${item.term} ${item.definition}`.toLocaleLowerCase().includes(needle)
    );
  }, [glossary.items, query]);

  return (
    <>
      <PageHero
        eyebrow={glossary.eyebrow}
        title={glossary.title}
        lead={glossary.intro}
        index="04"
        stat={String(glossary.items.length).padStart(2, "0")}
        statLabel={ui.allTerms}
        meta={language === "kk" ? "ҚАЗ · РУС" : "КАЗ · РУС"}
        note={ui.glossarySubtitle}
      >
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={open} className="btn btn-primary">
            <BookOpen className="h-4 w-4" strokeWidth={1.8} />
            {ui.openGlossary}
          </button>
          <span className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500 sm:inline-flex">
            <span className="kbd">⌘K</span>
            {ui.searchShortcut}
          </span>
        </div>
      </PageHero>

      <section className="pb-20 pt-2 sm:pb-24">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[.36fr_.64fr] lg:gap-14">
            <Reveal>
              <aside className="lg:sticky lg:top-28">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl">
                  <p className="eyebrow">
                    <span className="h-px w-6 bg-amber-400/60" aria-hidden="true" />
                    {glossary.eyebrow}
                  </p>
                  <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-zinc-50">
                    {ui.allTerms}
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">{glossary.intro}</p>

                  <div className="relative mt-6">
                    <Search
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                      strokeWidth={1.7}
                    />
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => {
                        setQuery(event.target.value);
                        setExpanded(0);
                      }}
                      placeholder={glossary.search}
                      aria-label={ui.searchTerms}
                      className="input-field pr-10 [&::-webkit-search-cancel-button]:hidden"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label={ui.close}
                        className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </button>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-600">
                    <span>
                      {filtered.length} / {glossary.items.length}
                    </span>
                    <span>{language === "kk" ? "ҚАЗ · РУС" : "КАЗ · РУС"}</span>
                  </div>
                </div>
              </aside>
            </Reveal>

            <Reveal delay={100}>
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090c11]/70 px-5 shadow-lift backdrop-blur-xl sm:px-7">
                <div className="flex items-center justify-between border-b border-white/[0.07] py-4 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                  <span>{query ? ui.searchShortcut : ui.allTerms}</span>
                  <span>{filtered.length}</span>
                </div>

                {filtered.length > 0 ? (
                  filtered.map((item, index) => (
                    <TermAccordion
                      key={item.term}
                      idPrefix="page"
                      variant="page"
                      index={index}
                      term={item.term}
                      definition={item.definition}
                      isOpen={expanded === index}
                      onToggle={() => setExpanded(expanded === index ? -1 : index)}
                      query={query}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-500">
                      <Search className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <p className="text-sm font-medium text-zinc-300">{ui.noResults}</p>
                    <p className="max-w-[260px] text-xs leading-5 text-zinc-500">{glossary.empty}</p>
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400 transition-colors hover:text-amber-300"
                    >
                      {ui.allTerms}
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand href="/polygon" linkLabel={dictionary.hero.secondaryCta} />
    </>
  );
}
