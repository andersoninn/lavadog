"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Check, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { addToCart, comprarAgora } from "@/lib/cart-actions";
import { formatPrice, type Product } from "@/lib/store-data";
import { useVariante } from "@/lib/use-variante";
import PrecoProduto from "@/components/produto/PrecoProduto";
import OpcoesProduto from "@/components/produto/OpcoesProduto";

type Props = { product: Pick<Product, "price" | "oldPrice" | "variants" | "options"> };

/** Preço, opções, quantidade, "Adicionar ao carrinho" e "Comprar agora". */
export default function CompraProduto({ product }: Props) {
  const variante = useVariante(product);
  const { quantity, setQuantity, matchedVariant, canAdd } = variante;
  const [aAdicionar, startAdicionar] = useTransition();
  const [aComprar, startComprar] = useTransition();
  const [adicionado, setAdicionado] = useState(false);

  const preco = matchedVariant?.price ?? product.price;
  const ocupado = aAdicionar || aComprar;

  return (
    <div className="flex flex-col gap-6">
      {/* O preço antigo (metadata preco_antigo) refere-se ao preço principal do produto. */}
      <PrecoProduto preco={preco} precoAntigo={preco === product.price ? product.oldPrice : undefined} />

      <OpcoesProduto product={product} variante={variante} />

      {!canAdd && <p className="text-sm font-semibold text-red-600">Esgotado</p>}

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="hidden w-24 shrink-0 text-sm font-semibold text-foreground sm:block">Quantidade:</span>
          <div className="flex h-12 shrink-0 items-center rounded-full border border-border bg-card">
            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Diminuir quantidade" className="flex size-12 items-center justify-center hover:text-primary-hover">
              <Minus className="size-4" />
            </button>
            <span className="w-6 text-center font-semibold">{quantity}</span>
            <button type="button" onClick={() => setQuantity((q) => Math.min(99, q + 1))} aria-label="Aumentar quantidade" className="flex size-12 items-center justify-center hover:text-primary-hover">
              <Plus className="size-4" />
            </button>
          </div>
          <button
            type="button"
            disabled={!canAdd || ocupado}
            onClick={() =>
              matchedVariant &&
              startAdicionar(async () => {
                await addToCart(matchedVariant.id, quantity);
                setAdicionado(true);
              })
            }
            className="flex h-12 min-w-56 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 font-bold whitespace-nowrap text-foreground transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-40"
          >
            {adicionado && !aAdicionar ? <Check className="size-5" /> : <ShoppingCart className="size-5" />}
            {aAdicionar ? "A adicionar..." : adicionado ? "Adicionado" : "Adicionar ao carrinho"}
          </button>
        </div>

        <button
          type="button"
          disabled={!canAdd || ocupado}
          onClick={() => matchedVariant && startComprar(() => comprarAgora(matchedVariant.id, quantity))}
          className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-blue-strong font-bold text-blue-strong transition-colors hover:bg-blue-soft disabled:pointer-events-none disabled:opacity-40"
        >
          <Zap className="size-5" />
          {aComprar ? "A abrir o pagamento..." : "Comprar agora"}
        </button>

        {adicionado && (
          <Link href="/carrinho" className="text-center text-sm font-semibold text-blue-strong underline underline-offset-2">
            Ver carrinho · {formatPrice(preco * quantity)}
          </Link>
        )}
      </div>
    </div>
  );
}
