"use client";

import { useLanguage } from "@/components/providers/LanguageContext";
import { cx, type Language } from "@/lib/utils";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const options: { value: Language; label: string }[] = [{ value: "kk", label: "ҚАЗ" }, { value: "ru", label: "РУС" }];

  return <div className="flex rounded-lg border border-zinc-700 bg-zinc-900 p-1" aria-label="Language selector">
    {options.map((option) => <button key={option.value} onClick={() => setLanguage(option.value)} className={cx("rounded-md px-2.5 py-1.5 text-xs font-bold transition", language === option.value ? "bg-amber-400 text-zinc-950" : "text-zinc-400 hover:text-white")} aria-pressed={language === option.value}>{option.label}</button>)}
  </div>;
}
