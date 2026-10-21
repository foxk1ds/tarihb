import type { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = {
  title: "Басты бет",
  description:
    "Қазақстандағы әскери зауыттар, Семей ядролық полигоны және сынақтардың зардабы туралы интерактивті білім беру жобасы."
};

export default function HomePage() {
  return <HomeView />;
}
