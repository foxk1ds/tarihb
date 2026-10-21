import kk from "@/content/kk.json";
import ru from "@/content/ru.json";

export const languages = ["kk", "ru"] as const;
export type Language = (typeof languages)[number];
export type Dictionary = typeof kk;

const dictionaries: Record<Language, Dictionary> = { kk, ru };

export function getDictionary(language: Language): Dictionary {
  return dictionaries[language];
}

export function cx(...classes: Array<string | undefined | false>): string {
  return classes.filter(Boolean).join(" ");
}
