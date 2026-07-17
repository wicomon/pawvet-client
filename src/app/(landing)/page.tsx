import type { Metadata } from "next";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import TrustBar from "./_components/TrustBar";
import ProblemSolution from "./_components/ProblemSolution";
import Modules from "./_components/Modules";
import Roi from "./_components/Roi";
import Pricing from "./_components/Pricing";
import Footer from "./_components/Footer";
import WhatsAppFab from "./_components/WhatsAppFab";

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
