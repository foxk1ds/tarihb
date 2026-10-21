"use client";

import { useLanguage } from "@/components/providers/LanguageContext";
import { cx, type Language } from "@/lib/utils";

const options: { value: Language; label: string; name: string }[] = [
  { value: "kk", label: "ҚАЗ", name: "Қазақ тілі" },
  { value: "ru", label: "РУС", name: "Русский язык" }
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage, dictionary } = useLanguage();

  return (
    <div
      className={cx(
        "relative inline-flex rounded-full border border-white/10 bg-white/[0.035] p-1 backdrop-blur-md",
        className
      )}
      role="group"
      aria-label={dictionary.ui.languageLabel}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-amber-400 shadow-[0_0_18px_rgba(245,158,11,.35)] transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
        style={{ transform: language === "ru" ? "translateX(100%)" : "translateX(0)" }}
      />
      {options.map((option) => {
        const active = language === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLanguage(option.value)}
            aria-pressed={active}
            aria-label={option.name}
            title={option.name}
            className={cx(
              "relative z-10 h-7 w-11 rounded-full font-mono text-[10px] font-medium tracking-[0.08em] transition-colors duration-300",
              active ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
