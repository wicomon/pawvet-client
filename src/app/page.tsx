import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Modules from "@/components/landing/Modules";
import Roi from "@/components/landing/Roi";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import WhatsAppFab from "@/components/landing/WhatsAppFab";

// Own metadata: the landing is a distinct public page from the rest of the
// app (which is titled "PawControl" in the root layout).
export const metadata: Metadata = {
  title: "PawControl — Gestión para clínicas veterinarias",
  description:
    "El sistema de gestión en la nube para clínicas veterinarias y pet shops del Perú: expedientes, citas y caja en un solo lugar.",
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-wv-bg font-body text-wv-ink">
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <Modules />
        <Roi />
        <Pricing />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
