import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CartLineItem from "@/components/cart/CartLineItem";
import { finalizarCompra, getCurrentCart } from "@/lib/cart-actions";
import { formatPrice } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Revise os itens do seu carrinho antes de finalizar a compra.",
  // Página pessoal e sem valor de busca: não deve ser indexada nem gastar
  // orçamento de rastreio do Google.
  robots: { index: false, follow: true },
};

export default async function CarrinhoPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;
  const cart = await getCurrentCart().catch(() => null);
  const lines = cart?.lines ?? [];
  const isEmpty = lines.length === 0;

  return (
    <>
      <Navbar cartCount={cart?.totalQuantity ?? 0} />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-6 pt-32 pb-24 sm:px-10 lg:px-16">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Seu Carrinho</h1>

          {erro === "pagamento" && !isEmpty && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Não foi possível abrir o pagamento agora. Tente novamente em instantes ou fale connosco pelo WhatsApp.
            </p>
          )}

          {isEmpty ? (
            <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-24 text-center">
              <ShoppingBag className="size-10 text-muted-foreground" />
              <p className="font-semibold text-foreground">Seu carrinho está vazio</p>
              <p className="text-sm text-muted-foreground">
                Explore a loja e encontre produtos para o seu pet.
              </p>
              <Button asChild className="mt-2">
                <Link href="/store">Ir para a loja</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
              <div className="flex flex-col gap-3">
                {lines.map((line) => (
                  <CartLineItem key={line.id} line={line} />
                ))}
              </div>

              <div className="h-fit rounded-2xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Resumo do pedido
                </h2>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {formatPrice(cart?.subtotal ?? 0)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Portes</span>
                  <span className="text-muted-foreground">Calculados no pagamento</span>
                </div>

                <form action={finalizarCompra}>
                  <Button type="submit" className="mt-5 w-full">
                    Finalizar Compra
                  </Button>
                </form>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  O pagamento é feito com segurança na página da Stripe.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
