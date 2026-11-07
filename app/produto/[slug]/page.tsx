import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GaleriaProduto from "@/components/produto/GaleriaProduto";
import CompraProduto from "@/components/produto/CompraProduto";
import ProductBadge from "@/components/store-page/ProductBadge";
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
          <Link href="/store" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="size-4" /> Voltar à loja
          </Link>

          <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-14">
            <div className="relative">
              <GaleriaProduto imagens={produto.images} nome={produto.name} />
              {produto.badge && <ProductBadge badge={produto.badge} />}
            </div>

            <div className="flex flex-col">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {[produto.category, produto.brand !== "Sem marca" ? produto.brand : null].filter(Boolean).join(" · ")}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{produto.name}</h1>

              <div className="mt-6">
                <CompraProduto product={produto} />
              </div>

              {produto.description && (
                <div className="mt-10 border-t border-border pt-6">
                  <h2 className="text-sm font-semibold text-foreground">Descrição</h2>
                  <p className="mt-2 text-[15px] leading-relaxed whitespace-pre-line text-foreground/80">
                    {produto.description}
                  </p>
                </div>
              )}

              <p className="mt-8 text-xs text-muted-foreground">
                Portes calculados no pagamento ·{" "}
                <Link href="/devolucoes" className="underline underline-offset-2">
                  14 dias para devolver
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
