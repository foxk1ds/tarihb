import type { Metadata } from "next";
import { ConsequencesView } from "@/components/pages/ConsequencesView";

export const metadata: Metadata = {
  title: "Сынақтардың зардабы",
  description:
    "Ядролық сынақтардың табиғатқа, балалар денсаулығына және ұзақ мерзімді болашаққа әсері."
};

export default function ConsequencesPage() {
  return <ConsequencesView />;
}
