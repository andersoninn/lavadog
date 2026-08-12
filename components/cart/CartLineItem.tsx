"use client";

import { useTransition } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { removeCartLine, updateCartLine } from "@/lib/cart-actions";
import { formatPrice } from "@/lib/store-data";
import type { ShopifyCart } from "@/lib/shopify";

type CartLine = ShopifyCart["lines"]["edges"][number]["node"];

export default function CartLineItem({ line }: { line: CartLine }) {
  const [isPending, startTransition] = useTransition();
  const price = Number(line.merchandise.price.amount);
  const lineTotal = Number(line.cost.totalAmount.amount);

  function changeQuantity(nextQuantity: number) {
    startTransition(async () => {
      await updateCartLine(line.id, nextQuantity);
    });
  }

  function remove() {
    startTransition(async () => {
      await removeCartLine(line.id);
    });
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-card p-3 transition-opacity" style={{ opacity: isPending ? 0.6 : 1 }}>
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
        {line.merchandise.product.featuredImage ? (
          <Image
            src={line.merchandise.product.featuredImage.url}
            alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-primary-soft text-[10px] text-muted-foreground">
            Sem imagem
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
          {line.merchandise.product.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{formatPrice(price)} / un.</p>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center rounded-full border border-border">
            <button
              type="button"
              disabled={isPending}
              onClick={() => changeQuantity(line.quantity - 1)}
              aria-label="Diminuir quantidade"
              className="flex size-7 items-center justify-center text-foreground transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-semibold text-foreground">{line.quantity}</span>
            <button
              type="button"
              disabled={isPending}
              onClick={() => changeQuantity(line.quantity + 1)}
              aria-label="Aumentar quantidade"
              className="flex size-7 items-center justify-center text-foreground transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            disabled={isPending}
            onClick={remove}
            aria-label="Remover item"
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-red-600 disabled:pointer-events-none disabled:opacity-40"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      <p className="shrink-0 text-sm font-bold text-foreground">{formatPrice(lineTotal)}</p>
    </div>
  );
}
