"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageContext";

export function Footer() {
  const { dictionary } = useLanguage();
  return <footer className="mt-16 border-t border-zinc-800 bg-zinc-950"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-5 py-8 text-sm text-zinc-400 sm:flex-row"><p>{dictionary.common.sourceNote}</p><Link href="/" className="font-medium text-amber-400 hover:text-amber-300">← {dictionary.common.backHome}</Link></div></footer>;
}
