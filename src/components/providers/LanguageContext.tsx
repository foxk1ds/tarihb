"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getDictionary, type Dictionary, type Language } from "@/lib/utils";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  dictionary: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("kk");

  useEffect(() => {
    const stored = window.localStorage.getItem("site-language");
    if (stored === "kk" || stored === "ru") setLanguageState(stored);
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    window.localStorage.setItem("site-language", nextLanguage);
    setLanguageState(nextLanguage);
  };

  const value = useMemo(() => ({ language, setLanguage, dictionary: getDictionary(language) }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
