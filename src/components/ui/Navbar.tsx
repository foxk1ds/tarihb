"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cx } from "@/lib/utils";

export function Navbar() {
  const { dictionary } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [
    ["/", dictionary.nav.home], ["/glossary", dictionary.nav.glossary], ["/factories", dictionary.nav.factories], ["/polygon", dictionary.nav.polygon], ["/consequences", dictionary.nav.consequences]
  ];

  return <header className="sticky top-0 z-50 border-b border-zinc-800/90 bg-zinc-950/90 backdrop-blur">
    <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3.5">
      <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-white"><span className="grid h-8 w-8 place-items-center rounded bg-amber-400 text-zinc-950">✦</span><span>Тарих <span className="text-amber-400">дәптері</span></span></Link>
      <div className="flex items-center gap-3"><div className="hidden items-center gap-1 md:flex">{links.map(([href, label]) => <Link key={href} href={href} className={cx("rounded-md px-3 py-2 text-sm transition", pathname === href ? "bg-zinc-800 text-amber-300" : "text-zinc-300 hover:bg-zinc-900 hover:text-white")}>{label}</Link>)}</div><LanguageSwitcher /><button onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded border border-zinc-700 text-zinc-300 md:hidden" aria-label="Open menu" aria-expanded={open}>☰</button></div>
      {open && <div className="grid w-full gap-1 border-t border-zinc-800 pt-3 md:hidden">{links.map(([href, label]) => <Link onClick={() => setOpen(false)} key={href} href={href} className={cx("rounded-md px-3 py-2.5 text-sm", pathname === href ? "bg-zinc-800 text-amber-300" : "text-zinc-300")}>{label}</Link>)}</div>}
    </nav>
  </header>;
}
