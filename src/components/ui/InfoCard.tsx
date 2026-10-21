import type { ReactNode } from "react";

type InfoCardProps = { eyebrow?: string; title: string; children: ReactNode; className?: string };

export function InfoCard({ eyebrow, title, children, className = "" }: InfoCardProps) {
  return <article className={`rounded-2xl border border-zinc-200 bg-white p-6 shadow-document transition duration-300 hover:-translate-y-1 hover:border-amber-400 dark:border-zinc-800 dark:bg-zinc-900 ${className}`}>
    {eyebrow && <p className="text-xs font-bold uppercase tracking-[.18em] text-crimson">{eyebrow}</p>}
    <h3 className="mt-2 text-xl font-bold text-zinc-900 dark:text-white">{title}</h3>
    <div className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{children}</div>
  </article>;
}
