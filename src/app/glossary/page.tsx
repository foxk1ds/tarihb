import type { Metadata } from "next";
import { GlossaryView } from "@/components/pages/GlossaryView";

export const metadata: Metadata = {
  title: "Сөздік",
  description:
    "Тарихи түсініктер сөздігі: әскери-өндірістік кешен, полигон, ядролық қару және басқа да терминдер."
};

export default function GlossaryPage() {
  return <GlossaryView />;
}
