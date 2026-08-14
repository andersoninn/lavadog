import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Store from "@/components/Store";
import StorePromoBanner from "@/components/StorePromoBanner";
import Contatos from "@/components/Contatos";
import Footer from "@/components/Footer";
import { getCurrentCart } from "@/lib/cart-actions";
import { SITE_TAGLINE } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const cart = await getCurrentCart().catch(() => null);

  return (
    <>
      <Navbar cartCount={cart?.totalQuantity ?? 0} />
      <main className="flex-1">
        {/*
          O Google espera um <h1> por página, e o herói do site é uma imagem —
          não tinha nenhum. Fica invisível para o utilizador (`sr-only`) mas é
          lido por buscadores e leitores de ecrã.
        */}
        <h1 className="sr-only">LavaDog Store — Pet Shop Online em Portugal. {SITE_TAGLINE}.</h1>
        <Hero />
        <Store />
        <StorePromoBanner />
        <Contatos />
      </main>
      <Footer />
    </>
  );
}
