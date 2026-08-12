import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CartLineItem from "@/components/cart/CartLineItem";
import { getCurrentCart } from "@/lib/cart-actions";
import { formatPrice } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Carrinho | LavaDog Store",
  description: "Revise os itens do seu carrinho antes de finalizar a compra.",
};

export default async function CarrinhoPage() {
  const cart = await getCurrentCart().catch(() => null);
  const lines = cart?.lines.edges.map((edge) => edge.node) ?? [];
  const isEmpty = lines.length === 0;

  return (
    <>
      <Navbar cartCount={cart?.totalQuantity ?? 0} />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-6 pt-32 pb-24 sm:px-10 lg:px-16">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Seu Carrinho</h1>

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
                    {formatPrice(Number(cart?.cost.subtotalAmount.amount ?? 0))}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(Number(cart?.cost.totalAmount.amount ?? 0))}
                  </span>
                </div>

                <Button asChild className="mt-5 w-full">
                  <a href={cart?.checkoutUrl}>Finalizar Compra</a>
                </Button>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  O pagamento é finalizado com segurança no checkout da Shopify.
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
