"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cx } from "@/lib/utils";

export function SpotlightCard({
  href,
  className,
  children,
  ariaLabel
}: {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      className={cx(
        "glow-card group relative block overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-white/[0.022] p-6 shadow-inner-line backdrop-blur-sm sm:p-8",
        className
      )}
    >
      <span className="card-spotlight" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Link>
  );
}
