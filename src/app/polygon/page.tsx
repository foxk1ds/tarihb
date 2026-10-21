import type { Metadata } from "next";
import { PolygonView } from "@/components/pages/PolygonView";

export const metadata: Metadata = {
  title: "Семей полигоны",
  description:
    "Семей ядролық полигоны: 1949–1989 жылдардағы 456 жарылыс, хронология және аумақтық деректер."
};

export default function PolygonPage() {
  return <PolygonView />;
}
