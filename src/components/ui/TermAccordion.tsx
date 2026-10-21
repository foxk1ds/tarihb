"use client";

import { ChevronDown } from "lucide-react";
import { cx } from "@/lib/utils";
import { Highlight } from "./Highlight";

type TermAccordionProps = {
  index: number;
  term: string;
  definition: string;
  isOpen: boolean;
  onToggle: () => void;
  query?: string;
  idPrefix: string;
  variant?: "drawer" | "page";
};

export function TermAccordion({
  index,
  term,
  definition,
  isOpen,
  onToggle,
  query = "",
  idPrefix,
  variant = "drawer"
}: TermAccordionProps) {
  const triggerId = `${idPrefix}-trigger-${index}`;
  const panelId = `${idPrefix}-panel-${index}`;
  const isPage = variant === "page";

  return (
    <div
      className={cx(
        "group border-b border-white/[0.07] transition-colors duration-300",
        isOpen && "bg-white/[0.018]"
      )}
    >
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={cx(
          "flex w-full items-center gap-4 text-left",
          isPage ? "py-6 pl-1 pr-2" : "py-5"
        )}
      >
        <span className="w-6 shrink-0 font-mono text-[10px] tabular-nums text-zinc-600 transition-colors group-hover:text-amber-400/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cx(
            "flex-1 font-medium tracking-[-0.015em] text-zinc-100 transition-colors duration-300 group-hover:text-white",
            isPage ? "text-base sm:text-lg" : "text-[15px]"
          )}
        >
          <Highlight text={term} query={query} />
        </span>
        <span
          className={cx(
            "grid shrink-0 place-items-center rounded-full border transition-all duration-300",
            isPage ? "h-9 w-9" : "h-7 w-7",
            isOpen
              ? "border-amber-400/50 bg-amber-400/10 text-amber-300"
              : "border-white/10 bg-white/[0.02] text-zinc-500 group-hover:border-amber-400/30 group-hover:text-amber-300"
          )}
        >
          <ChevronDown
            className={cx("h-3.5 w-3.5 transition-transform duration-300", isOpen && "rotate-180")}
            strokeWidth={1.8}
          />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={cx(
          "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cx(
              "text-zinc-400",
              isPage ? "pb-7 pl-10 pr-12 text-[15px] leading-7" : "pb-5 pl-10 pr-10 text-[13px] leading-6"
            )}
          >
            <Highlight text={definition} query={query} />
          </div>
        </div>
      </div>
    </div>
  );
}
