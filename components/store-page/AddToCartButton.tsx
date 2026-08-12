"use client";

import { useState, useTransition } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { addToCart } from "@/lib/cart-actions";
import { cn } from "@/lib/utils";

export default function AddToCartButton({
  variantId,
  inStock,
  className,
  iconOnlyBelowSm = false,
}: {
  variantId: string | null;
  inStock: boolean;
  className?: string;
  iconOnlyBelowSm?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    if (!variantId) return;
    startTransition(async () => {
      await addToCart(variantId, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    });
  }

  const disabled = !inStock || !variantId || isPending;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        iconOnlyBelowSm
          ? "flex size-9 shrink-0 items-center justify-center gap-1.5 rounded-full border border-border p-0 text-foreground transition-colors duration-300 sm:h-auto sm:w-auto sm:gap-2 sm:rounded-full sm:px-4 sm:py-2 sm:text-xs sm:font-semibold"
          : "inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2 text-center text-[11px] leading-tight font-semibold sm:gap-2 sm:text-xs",
        "text-foreground transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40 disabled:group-hover:border-border disabled:group-hover:bg-transparent disabled:group-hover:text-foreground",
        className,
      )}
    >
      {justAdded ? (
        <Check className={cn("shrink-0", iconOnlyBelowSm ? "size-4 sm:size-3.5" : "size-3.5")} />
      ) : (
        <ShoppingCart className={cn("shrink-0", iconOnlyBelowSm ? "size-4 sm:size-3.5" : "size-3.5")} />
      )}
      <span className={iconOnlyBelowSm ? "hidden sm:inline" : undefined}>
        {justAdded ? "Adicionado" : isPending ? "Adicionando..." : "Adicionar ao Carrinho"}
      </span>
    </button>
  );
}
