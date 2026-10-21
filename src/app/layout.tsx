import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { LanguageProvider } from "@/components/providers/LanguageContext";

export const metadata: Metadata = {
  title: "Қазақстан: әскери зауыттар мен Семей полигоны",
  description: "Educational bilingual project about military factories and the Semipalatinsk Nuclear Test Site in Kazakhstan."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="kk"><body className="document-grid antialiased"><LanguageProvider><Navbar /><main>{children}</main><Footer /></LanguageProvider></body></html>;
}
