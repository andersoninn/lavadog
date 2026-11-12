import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LinhaCarrinho from "@/components/carrinho/LinhaCarrinho";
import ResumoCarrinho from "@/components/carrinho/ResumoCarrinho";
import CarrinhoVazio from "@/components/carrinho/CarrinhoVazio";
import CaixaEntrega from "@/components/produto/CaixaEntrega";
import SelosConfianca from "@/components/produto/SelosConfianca";
import ProdutosRelacionados from "@/components/produto/ProdutosRelacionados";
import { getCurrentCart } from "@/lib/cart-actions";
import { getCatalogo } from "@/lib/catalogo";
import { getPromocoes } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Revise os itens do seu carrinho antes de finalizar a compra.",
  // Página pessoal e sem valor de busca: não deve ser indexada.
  robots: { index: false, follow: true },
};

const AVISOS: Record<string, string> = {
  pagamento: "Não foi possível abrir o pagamento agora. Tente novamente em instantes ou fale connosco pelo WhatsApp.",
  stock: "Algum produto do carrinho já não tem unidades suficientes. Reduza a quantidade ou fale connosco pelo WhatsApp.",
};

export default async function CarrinhoPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  const [cart, catalogo, promocoes] = await Promise.all([
    getCurrentCart().catch(() => null),
    getCatalogo().catch(() => null),
    getPromocoes().catch(() => []),
  ]);
  const lines = cart?.lines ?? [];
  const produtos = new Map((catalogo?.products ?? []).map((p) => [p.id, p]));
  const doCarrinho = lines.map((l) => produtos.get(l.productId)).filter((p) => p !== undefined);

  return (
    <>
      <Navbar cartCount={cart?.totalQuantity ?? 0} />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-24 sm:px-10">
          <nav aria-label="Trilho" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="flex items-center gap-1.5 hover:text-foreground">
              <Home className="size-4" /> Início
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="font-medium text-foreground">Carrinho</span>
          </nav>

          <h1 className="mt-5 text-2xl font-bold text-foreground sm:text-3xl">
            O seu carrinho
            {cart && (
              <span className="ml-2 text-base font-medium text-muted-foreground">
                ({cart.totalQuantity} {cart.totalQuantity === 1 ? "artigo" : "artigos"})
              </span>
            )}
          </h1>

          {erro && AVISOS[erro] && cart && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{AVISOS[erro]}</p>
          )}

          {!cart ? (
            <div className="mt-6">
              <CarrinhoVazio />
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="flex flex-col gap-6">
                <ul className="divide-y divide-border rounded-xl border border-border bg-card px-5">
                  {lines.map((line) => {
                    const p = produtos.get(line.productId);
                    return (
                      <LinhaCarrinho
                        key={line.id}
                        line={line}
                        href={p ? `/produto/${p.slug}` : null}
                        marca={p && p.brand !== "Sem marca" ? p.brand : null}
                      />
                    );
                  })}
                </ul>
                <SelosConfianca />
              </div>

              <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
                <ResumoCarrinho cart={cart} promocao={promocoes[0] ?? null} />
                <CaixaEntrega />
              </div>
            </div>
          )}

          {catalogo && (
            <ProdutosRelacionados
              todos={catalogo.products}
              categorias={[...new Set(doCarrinho.map((p) => p.category))]}
              excluir={doCarrinho.map((p) => p.id)}
              titulo={cart ? "Também pode gostar" : "Sugestões para o seu pet"}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
