import Link from "next/link";
import { cx } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ТАРИХ — Қазақстан тарихы · XX ғасыр"
      className={cx("group inline-flex items-center gap-3 rounded-xl", className)}
    >
      <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/12 bg-white/[0.035] shadow-inner-line transition-all duration-500 group-hover:border-amber-400/45 group-hover:bg-amber-400/[0.07]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,.18),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <svg viewBox="0 0 36 36" className="relative h-6 w-6 text-amber-400" fill="none" aria-hidden="true">
          <path
            d="M18 2.8 31.9 10.6v14.8L18 33.2 4.1 25.4V10.6L18 2.8Z"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.75"
          />
          <path d="M18 8.4v19.2M9.7 13.2l16.6 9.6M26.3 13.2 9.7 22.8" stroke="currentColor" strokeWidth="0.8" opacity="0.32" />
          <circle cx="18" cy="18" r="2.6" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-semibold tracking-[-0.035em] text-zinc-50">
          ТАРИХ<span className="text-amber-400">.</span>
        </span>
        <span className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.28em] text-zinc-500">
          QAZAQSTAN · XX
        </span>
      </span>
    </Link>
  );
}
