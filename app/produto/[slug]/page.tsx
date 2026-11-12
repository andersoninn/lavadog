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
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";
import { getProdutoPorSlug } from "@/lib/catalogo";
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
  const [produto, cart] = await Promise.all([
    getProdutoPorSlug(slug).catch(() => null),
    getCurrentCart().catch(() => null),
  ]);
  if (!produto) notFound();

  const selo = produto.badge === "mais-vendido" ? "Mais vendido" : produto.badge === "novo" ? "Novidade" : null;
  const resumo = produto.description ? produto.description.split("\n")[0].slice(0, 220) : null;

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
        <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-24 sm:px-10 lg:px-16">
          <TrilhoProduto categoria={produto.category} nome={produto.name} />

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <GaleriaProduto imagens={produto.images} nome={produto.name} selo={selo} />

            <div className="flex flex-col gap-6">
              <div>
                {produto.brand !== "Sem marca" && (
                  <p className="text-sm font-bold text-blue-strong">{produto.brand}</p>
                )}
                <h1 className="mt-1 text-3xl leading-tight font-bold text-foreground sm:text-4xl">{produto.name}</h1>
                {resumo && <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">{resumo}</p>}
              </div>

              <CompraProduto product={produto} />
              <SelosConfianca />
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_380px]">
            <AbasProduto descricao={produto.description} detalhes={produto.detalhes} />
            <CaixaEntrega />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
