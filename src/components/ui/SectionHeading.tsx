import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
  action,
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  index?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <p className="eyebrow">
          <span className="h-px w-7 bg-amber-400/60" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="display-title-sm mt-4">{title}</h2>
        {description && (
          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">{description}</p>
        )}
      </div>
      <div className="flex shrink-0 items-end gap-6">
        {action}
        {index && (
          <div className="flex items-baseline gap-2 font-mono">
            <span className="font-display text-5xl font-medium leading-none tracking-[-0.04em] text-white/[0.09] sm:text-6xl">
              {index}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
