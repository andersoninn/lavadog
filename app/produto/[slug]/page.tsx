import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GaleriaProduto from "@/components/produto/GaleriaProduto";
import CompraProduto from "@/components/produto/CompraProduto";
import SelosConfianca from "@/components/produto/SelosConfianca";
import AbasProduto from "@/components/produto/AbasProduto";
import CaixaEntrega from "@/components/produto/CaixaEntrega";
import TrilhoProduto from "@/components/produto/TrilhoProduto";
import AvaliacaoLoja from "@/components/produto/AvaliacaoLoja";
import ProdutosRelacionados from "@/components/produto/ProdutosRelacionados";
import { conteudoAbas } from "@/components/produto/ConteudoAbas";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";
import { getCatalogo, getProdutoPorSlug } from "@/lib/catalogo";
import { getAvaliacoesGoogle } from "@/lib/google-avaliacoes";
import { getCurrentCart } from "@/lib/cart-actions";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const produto = await getProdutoPorSlug(slug).catch(() => null);
  if (!produto) return { title: "Produto não encontrado", robots: { index: false } };
  const descricao =
    produto.description?.slice(0, 160) ?? `${produto.name} na LavaDog Store – ${produto.category} para o seu pet.`;
  return {
    title: produto.name,
    description: descricao,
    alternates: { canonical: `/produto/${produto.slug}` },
    openGraph: {
      title: produto.name,
      description: descricao,
      url: `/produto/${produto.slug}`,
      images: produto.images.slice(0, 1),
    },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const [catalogo, cart, avaliacoes] = await Promise.all([
    getCatalogo().catch(() => null),
    getCurrentCart().catch(() => null),
    getAvaliacoesGoogle(),
  ]);
  const produto = catalogo?.products.find((p) => p.slug === slug);
  if (!catalogo || !produto) notFound();

  const selo = produto.badge === "mais-vendido" ? "Mais vendido" : produto.badge === "novo" ? "Novidade" : null;
  const resumo = produto.description ? produto.description.split("\n")[0].slice(0, 200) : null;

  return (
    <>
      <Navbar cartCount={cart?.totalQuantity ?? 0} />
      <ProductJsonLd produto={produto} />
      <BreadcrumbJsonLd
        items={[
          { name: "Store", path: "/store" },
          { name: produto.name, path: `/produto/${produto.slug}` },
        ]}
      />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-24 sm:px-10">
          <TrilhoProduto categoria={produto.category} nome={produto.name} />

          <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
            <GaleriaProduto imagens={produto.images} nome={produto.name} selo={selo} video={produto.detalhes.video} />

            <div className="flex flex-col gap-4">
              <div>
                {produto.brand !== "Sem marca" && <p className="text-sm font-bold text-blue-strong">{produto.brand}</p>}
                <h1 className="mt-0.5 text-2xl leading-tight font-bold text-foreground sm:text-3xl">{produto.name}</h1>
              </div>
              <AvaliacaoLoja dados={avaliacoes} />
              {resumo && (
                <div>
                  <p className="text-sm font-bold text-foreground">Descrição resumida</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground/75">{resumo}</p>
                </div>
              )}
              <CompraProduto product={produto} />
              <SelosConfianca />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <AbasProduto abas={conteudoAbas(produto, avaliacoes)} />
            <CaixaEntrega />
          </div>

          <ProdutosRelacionados produto={produto} todos={catalogo.products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
