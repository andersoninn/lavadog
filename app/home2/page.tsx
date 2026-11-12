import type { Metadata } from "next";
import Cabecalho2 from "@/components/home2/Cabecalho2";
import Hero2 from "@/components/home2/Hero2";
import FaixaVantagens2 from "@/components/home2/FaixaVantagens2";
import Store from "@/components/Store";
import StorePromoBanner from "@/components/StorePromoBanner";
import Contatos from "@/components/Contatos";
import Footer from "@/components/Footer";
import { getCurrentCart } from "@/lib/cart-actions";
import { getPromocoes } from "@/lib/stripe";
import { SITE_TAGLINE } from "@/lib/seo";

// Página de teste do novo topo da home: não entra no Google.
export const metadata: Metadata = {
  title: "Home (teste)",
  robots: { index: false, follow: false },
};

export default async function Home2() {
  const [cart, promocoes] = await Promise.all([
    getCurrentCart().catch(() => null),
    getPromocoes().catch(() => []),
  ]);

  return (
    <>
      <Cabecalho2 cartCount={cart?.totalQuantity ?? 0} />
      <main className="flex-1">
        <h1 className="sr-only">LavaDog Store — Pet Shop Online em Portugal. {SITE_TAGLINE}.</h1>
        <Hero2 />
        <FaixaVantagens2 />
        <Store />
        <StorePromoBanner promocoes={promocoes} />
        <Contatos />
      </main>
      <Footer />
    </>
  );
}
