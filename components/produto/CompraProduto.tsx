"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { addToCart } from "@/lib/cart-actions";
import { formatPrice, type Product } from "@/lib/store-data";
import { useVariante } from "@/lib/use-variante";
import { cn } from "@/lib/utils";

type Props = { product: Pick<Product, "price" | "oldPrice" | "inStock" | "variants" | "options"> };

/** Preço, escolha de opção, quantidade e botão de compra da página do produto. */
export default function CompraProduto({ product }: Props) {
  const { selected, escolher, quantity, setQuantity, matchedVariant, canAdd, varianteCom } = useVariante(product);
  const [isPending, startTransition] = useTransition();
  const [adicionado, setAdicionado] = useState(false);

  const preco = matchedVariant?.price ?? product.price;
  const mostrarAntigo = product.oldPrice && product.oldPrice > preco;

  function adicionar() {
    if (!matchedVariant) return;
    startTransition(async () => {
      await addToCart(matchedVariant.id, quantity);
      setAdicionado(true);
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-foreground">{formatPrice(preco)}</span>
        {mostrarAntigo && (
          <span className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice as number)}</span>
        )}
      </p>

      {product.options
        .filter((o) => o.values.length > 1)
        .map((option) => (
          <div key={option.name}>
            <p className="mb-2 text-sm font-semibold text-foreground">{option.name}</p>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const variante = varianteCom(option.name, value);
                const escolhido = selected[option.name] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={!variante}
                    onClick={() => escolher(option.name, value)}
                    className={cn(
                      "flex h-11 min-w-11 items-center justify-center rounded-lg border px-4 text-sm font-semibold transition-colors",
                      escolhido ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
                      !variante && "pointer-events-none opacity-30",
                      variante && !variante.availableForSale && !escolhido && "text-muted-foreground line-through",
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      {!canAdd && <p className="text-sm font-medium text-red-600">Esgotado</p>}

      <div className="flex items-center gap-3">
        <div className="flex h-12 shrink-0 items-center rounded-full border border-border">
          <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Diminuir quantidade" className="flex size-12 items-center justify-center hover:text-primary">
            <Minus className="size-4" />
          </button>
          <span className="w-6 text-center font-semibold">{quantity}</span>
          <button type="button" onClick={() => setQuantity((q) => Math.min(99, q + 1))} aria-label="Aumentar quantidade" className="flex size-12 items-center justify-center hover:text-primary">
            <Plus className="size-4" />
          </button>
        </div>
        <button
          type="button"
          disabled={!canAdd || isPending}
          onClick={adicionar}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary font-bold text-[#3A2C22] transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-40"
        >
          {adicionado && !isPending ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
          {isPending ? "Adicionando..." : adicionado ? "Adicionado" : "Adicionar ao Carrinho"}
        </button>
      </div>

      {adicionado && (
        <Link href="/carrinho" className="text-center text-sm font-semibold text-blue-strong underline underline-offset-2">
          Ver carrinho e finalizar compra
        </Link>
      )}
    </div>
  );
}
