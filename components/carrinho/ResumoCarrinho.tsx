import Link from "next/link";
import { ArrowLeft, Lock, TicketPercent } from "lucide-react";
import { finalizarCompra, type Cart } from "@/lib/cart-actions";
import { formatPrice } from "@/lib/store-data";
import type { Promocao } from "@/lib/promocoes";

/** Caixa "Resumo do pedido" com cupão ativo, total e botões. */
export default function ResumoCarrinho({ cart, promocao }: { cart: Cart; promocao: Promocao | null }) {
  const linha = "flex items-center justify-between text-sm";

  return (
    <div className="rounded-md border border-border bg-card p-6">
      <h2 className="text-lg font-bold text-foreground">Resumo do pedido</h2>

      <div className="mt-4 space-y-2.5">
        <p className={linha}>
          <span className="text-muted-foreground">
            Subtotal ({cart.totalQuantity} {cart.totalQuantity === 1 ? "artigo" : "artigos"})
          </span>
          <span className="font-semibold text-foreground">{formatPrice(cart.subtotal)}</span>
        </p>
        <p className={linha}>
          <span className="text-muted-foreground">Portes</span>
          <span className="text-muted-foreground">Calculados no pagamento</span>
        </p>
      </div>

      {promocao && (
        <div className="mt-4 flex gap-3 rounded-md bg-primary-soft p-3.5">
          <TicketPercent className="mt-0.5 size-5 shrink-0 text-foreground" />
          <p className="text-sm text-foreground">
            <span className="font-bold">{promocao.desconto}</span> {promocao.condicao.toLowerCase()} com o cupom{" "}
            <span className="font-black tracking-wide">{promocao.codigo}</span>.
            <span className="block text-xs text-muted-foreground">Insira o código na página de pagamento.</span>
          </p>
        </div>
      )}

      <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
        <span className="font-bold text-foreground">Total</span>
        <span className="text-3xl font-extrabold text-foreground">{formatPrice(cart.subtotal)}</span>
      </div>
      <p className="text-right text-xs text-muted-foreground">IVA incluído · sem portes</p>

      <form action={finalizarCompra} className="mt-5">
        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary font-bold text-foreground transition-colors hover:bg-primary-hover"
        >
          <Lock className="size-4" /> Finalizar compra
        </button>
      </form>
      <Link
        href="/store"
        className="mt-3 flex h-12 items-center justify-center gap-2 rounded-md border-2 border-blue-strong font-bold text-blue-strong transition-colors hover:bg-blue-soft"
      >
        <ArrowLeft className="size-4" /> Continuar a comprar
      </Link>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        O pagamento é feito com segurança na página do Stripe.
      </p>
    </div>
  );
}
