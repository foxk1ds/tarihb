"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, Search, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { useGlossary } from "@/components/providers/GlossaryContext";
import { cx } from "@/lib/utils";
import { TermAccordion } from "./TermAccordion";

export function GlossaryDrawer() {
  const { isOpen, close } = useGlossary();
  const { dictionary } = useLanguage();
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<number | null>(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const items = dictionary.glossary.items;
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return items;
    return items.filter((item) =>
      `${item.term} ${item.definition}`.toLocaleLowerCase().includes(needle)
    );
  }, [items, query]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (isOpen) panel.removeAttribute("inert");
    else panel.setAttribute("inert", "");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("no-scroll");
    setQuery("");
    setExpanded(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 220);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("no-scroll");
      previousFocus.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);

      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    setExpanded(filtered.length > 0 ? 0 : null);
  }, [query, filtered.length]);

  return (
    <div
      className={cx("fixed inset-0 z-[70]", isOpen ? "visible" : "invisible")}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        aria-hidden="true"
        className={cx(
          "absolute inset-0 bg-[#030405]/75 backdrop-blur-md transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="glossary-title"
        inert
        className={cx(
          "absolute right-0 top-0 flex h-[100dvh] w-full flex-col overflow-hidden border-l border-white/[0.09] bg-[rgba(8,11,16,0.97)] shadow-[-40px_0_120px_rgba(0,0,0,.6)] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] sm:max-w-[580px]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_50%_at_100%_0%,rgba(245,158,11,.09),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(255,255,255,.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.028)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]"
        />

        <div className="relative flex items-start justify-between gap-4 px-6 pb-5 pt-7 sm:px-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="eyebrow text-amber-300">{dictionary.nav.glossary} / LEXICON</span>
              <span className="h-px w-7 bg-amber-400/40" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                {items.length} {dictionary.ui.terms}
              </span>
            </div>
            <h2
              id="glossary-title"
              className="mt-3 text-[26px] font-semibold tracking-[-0.04em] text-zinc-50 sm:text-[30px]"
            >
              {dictionary.glossary.title}
            </h2>
            <p className="mt-2 max-w-md text-[13px] leading-6 text-zinc-400">
              {dictionary.glossary.intro}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:border-amber-400/35 hover:text-white"
            aria-label={dictionary.ui.closeDrawer}
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        <div className="relative px-6 sm:px-8">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              strokeWidth={1.7}
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dictionary.glossary.search}
              aria-label={dictionary.ui.searchTerms}
              className="input-field pr-12 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
                aria-label={dictionary.ui.close}
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.8} />
              </button>
            ) : (
              <span className="absolute right-4 top-1/2 hidden -translate-y-1/2 sm:block">
                <span className="kbd">esc</span>
              </span>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
            <span>{dictionary.ui.allTerms}</span>
            <span>
              {filtered.length} / {items.length}
            </span>
          </div>
        </div>

        <div className="relative mt-1 flex-1 overflow-y-auto px-6 pb-8 sm:px-8">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <TermAccordion
                key={`${item.term}-${query}`}
                idPrefix="drawer"
                index={index}
                term={item.term}
                definition={item.definition}
                isOpen={expanded === index}
                onToggle={() => setExpanded(expanded === index ? null : index)}
                query={query}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 px-6 py-14 text-center">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-500">
                <Search className="h-4 w-4" strokeWidth={1.6} />
              </span>
              <p className="text-sm font-medium text-zinc-300">{dictionary.ui.noResults}</p>
              <p className="max-w-[240px] text-xs leading-5 text-zinc-500">{dictionary.glossary.empty}</p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400 transition-colors hover:text-amber-300"
              >
                {dictionary.ui.allTerms}
              </button>
            </div>
          )}
        </div>

        <div className="relative border-t border-white/[0.07] bg-white/[0.015] px-6 py-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/glossary"
              onClick={close}
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-200 transition-colors hover:text-amber-300"
            >
              <BookOpen className="h-4 w-4 text-amber-400" strokeWidth={1.6} />
              {dictionary.ui.fullGlossary}
              <ArrowUpRight
                className="h-3.5 w-3.5 text-zinc-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-600">
              <span className="kbd">⌘K</span>
              <span>{dictionary.ui.open}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
