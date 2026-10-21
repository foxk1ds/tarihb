import type { Metadata } from "next";
import { FactoriesView } from "@/components/pages/FactoriesView";

export const metadata: Metadata = {
  title: "Әскери нысандар",
  description:
    "Қазақстандағы шамамен 50 әскери зауыт және Алматы, Петропавл, Өскемен қалаларындағы өндіріс бағыттары."
};

export default function FactoriesPage() {
  return <FactoriesView />;
}
