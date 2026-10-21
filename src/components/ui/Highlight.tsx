import type { ReactNode } from "react";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function Highlight({ text, query }: { text: string; query: string }): ReactNode {
  const needle = query.trim();
  if (!needle) return text;

  const parts = text.split(new RegExp(`(${escapeRegExp(needle)})`, "gi"));
  const lower = needle.toLocaleLowerCase();

  return parts.map((part, index) =>
    part.toLocaleLowerCase() === lower ? (
      <mark key={`${part}-${index}`} className="term-mark">
        {part}
      </mark>
    ) : (
      part
    )
  );
}
