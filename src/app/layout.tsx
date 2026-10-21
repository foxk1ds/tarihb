import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageContext";
import { GlossaryProvider } from "@/components/providers/GlossaryContext";
import { GlossaryDrawer } from "@/components/ui/GlossaryDrawer";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import type { Language } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Қазақстан: әскери зауыттар мен Семей полигоны",
    template: "%s · ТАРИХ"
  },
  description:
    "Қазақстандағы әскери өнеркәсіп пен Семей ядролық полигоны туралы екі тілді білім беру жобасы.",
  keywords: ["Қазақстан тарихы", "Семей полигоны", "әскери зауыттар", "ядролық сынақтар"],
  authors: [{ name: "ТАРИХ" }]
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const store = await cookies();
  const language: Language = store.get("tarihb-language")?.value === "ru" ? "ru" : "kk";
  const skipLabel = language === "ru" ? "Перейти к содержанию" : "Мазмұнға өту";

  return (
    <html lang={language}>
      <body className="antialiased">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-night"
        >
          <div className="site-grid absolute inset-0 opacity-80" />
          <div className="absolute -top-64 left-1/2 h-[720px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,.105),transparent_63%)] blur-2xl" />
          <div className="absolute -right-40 top-[30%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(229,72,77,.065),transparent_66%)] blur-3xl" />
          <div className="absolute -left-48 top-[65%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,.04),transparent_68%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,9,12,0),rgba(7,9,12,.35)_55%,#07090c_100%)]" />
        </div>

        <a href="#main" className="skip-link">
          {skipLabel}
        </a>

        <div className="relative z-10">
          <LanguageProvider initialLanguage={language}>
            <GlossaryProvider>
              <Navbar />
              <GlossaryDrawer />
              <main id="main">{children}</main>
              <Footer />
            </GlossaryProvider>
          </LanguageProvider>
        </div>
      </body>
    </html>
  );
}
