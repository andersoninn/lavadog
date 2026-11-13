import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero2 from "@/components/home2/Hero2";
import FaixaVantagens2 from "@/components/home2/FaixaVantagens2";
import SecaoAtalhos from "@/components/home2/SecaoAtalhos";
import VitrineAnimal from "@/components/home2/VitrineAnimal";
import CartaoOportunidades from "@/components/home2/CartaoOportunidades";
import { imperdiveis, sugestoes } from "@/components/home2/vitrines";
import Store from "@/components/Store";
import StorePromoBanner from "@/components/StorePromoBanner";
import Contatos from "@/components/Contatos";
import Footer from "@/components/Footer";
import { getCurrentCart } from "@/lib/cart-actions";
import { getCatalogo } from "@/lib/catalogo";
import { getPromocoes } from "@/lib/stripe";
import { catalogoDemo } from "@/lib/demo-catalogo";
import { mapStripeProducts } from "@/lib/store-data";
import { SITE_TAGLINE } from "@/lib/seo";

// Página de teste do novo topo da home: não entra no Google.
export const metadata: Metadata = {
  title: "Home (teste)",
  robots: { index: false, follow: false },
};

export default async function Home2({ searchParams }: { searchParams: Promise<{ demo?: string }> }) {
  // /home2?demo=1 → vitrines com os produtos fictícios, só para ver o visual.
  const demo = (await searchParams).demo === "1";
  const [cart, promocoes, catalogo] = await Promise.all([
    getCurrentCart().catch(() => null),
    getPromocoes().catch(() => []),
    demo ? Promise.resolve(mapStripeProducts(catalogoDemo())) : getCatalogo().catch(() => null),
  ]);
  const produtos = catalogo?.products ?? [];
  if (demo) for (const p of produtos) p.slug = `${p.slug}?demo=1`;

  return (
    <>
      <Navbar cartCount={cart?.totalQuantity ?? 0} />
      <main className="flex-1">
        <h1 className="sr-only">LavaDog Store — Pet Shop Online em Portugal. {SITE_TAGLINE}.</h1>
        <Hero2 />
        <FaixaVantagens2 />
        <SecaoAtalhos />
        <VitrineAnimal
          id="sugestoes"
          titulo="As nossas sugestões"
          subtitulo="Encontre tudo o que precisa para o seu animal de estimação"
          porAnimal={sugestoes(produtos)}
        />
        <VitrineAnimal
          id="imperdiveis"
          titulo="Produtos imperdíveis"
          subtitulo="Não deixe escapar estas oportunidades"
          porAnimal={imperdiveis(produtos)}
          extraHref="&promo=true"
          lateral={<CartaoOportunidades />}
        />
        <Store destaques={false} />
        <StorePromoBanner promocoes={promocoes} compacto />
        <Contatos />
      </main>
      <Footer />
    </>
  );
}
