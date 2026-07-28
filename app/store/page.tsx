import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StorePageContent from "@/components/store-page/StorePageContent";

export const metadata: Metadata = {
  title: "Store | LavaDog Store",
  description: "Encontre os melhores produtos para o seu pet na LavaDog Store.",
};

export default function StorePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <StorePageContent />
      </main>
      <Footer />
    </>
  );
}
