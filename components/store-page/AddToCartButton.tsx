"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addToCart } from "@/lib/cart-actions";
import { formatPrice, type Product } from "@/lib/store-data";
import { cn } from "@/lib/utils";

type AddToCartProduct = Pick<
  Product,
  "name" | "image" | "price" | "oldPrice" | "inStock" | "variantId" | "hasVariants" | "variants" | "options"
>;

const TRIGGER_CLASSES = {
  // Usado na lista: botão compacto que vira um círculo (só ícone) no mobile.
  iconOnly:
    "flex size-9 shrink-0 items-center justify-center gap-1.5 rounded-full border border-border p-0 text-foreground transition-colors duration-300 sm:h-auto sm:w-auto sm:gap-2 sm:rounded-full sm:px-4 sm:py-2 sm:text-xs sm:font-semibold",
  // Usado na grade: mantém a largura total do card, só esconde o texto no
  // mobile (o ícone continua centralizado) — evita o texto quebrar linha e
  // deformar o pill arredondado em telas pequenas.
  full: "flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2 text-center text-[11px] leading-tight font-semibold whitespace-nowrap sm:gap-2 sm:text-xs",
};

export default function AddToCartButton({
  product,
  className,
  iconOnlyBelowSm = false,
}: {
  product: AddToCartProduct;
  className?: string;
  iconOnlyBelowSm?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [justAdded, setJustAdded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  function addVariant(variantId: string, quantity: number) {
    startTransition(async () => {
      await addToCart(variantId, quantity);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    });
  }

  function handleClick() {
    if (product.hasVariants) {
      setModalOpen(true);
      return;
    }
    if (!product.variantId) return;
    addVariant(product.variantId, 1);
  }

  const disabled = !product.inStock || (!product.hasVariants && !product.variantId) || isPending;

  const iconSize = iconOnlyBelowSm ? "size-4 sm:size-3.5" : "size-3.5";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          iconOnlyBelowSm ? TRIGGER_CLASSES.iconOnly : TRIGGER_CLASSES.full,
          "text-foreground transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40 disabled:group-hover:border-border disabled:group-hover:bg-transparent disabled:group-hover:text-foreground",
          className,
        )}
      >
        {justAdded ? (
          <Check className={cn("shrink-0", iconSize)} />
        ) : (
          <ShoppingCart className={cn("shrink-0", iconSize)} />
        )}
        <span className="hidden sm:inline">
          {justAdded
            ? "Adicionado"
            : isPending
              ? "Adicionando..."
              : product.hasVariants
                ? "Escolher Opção"
                : "Adicionar ao Carrinho"}
        </span>
      </button>

      {product.hasVariants && (
        <VariantPickerDialog
          product={product}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onConfirm={(variantId, quantity) => {
            addVariant(variantId, quantity);
            setModalOpen(false);
          }}
          isPending={isPending}
        />
      )}
    </>
  );
}

function VariantPickerDialog({
  product,
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: {
  product: AddToCartProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (variantId: string, quantity: number) => void;
  isPending: boolean;
}) {
  const firstAvailable = product.variants.find((v) => v.availableForSale) ?? product.variants[0];

  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries((firstAvailable?.selectedOptions ?? []).map((o) => [o.name, o.value])),
  );
  const [quantity, setQuantity] = useState(1);

  const matchedVariant = useMemo(
    () =>
      product.variants.find((variant) =>
        variant.selectedOptions.every((option) => selected[option.name] === option.value),
      ),
    [product.variants, selected],
  );

  const canAdd = Boolean(matchedVariant?.availableForSale);
  const showOldPrice = product.oldPrice && matchedVariant && product.oldPrice > matchedVariant.price;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setQuantity(1);
      }}
    >
      <DialogContent className="max-w-md gap-5 p-5">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-4">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted">
            {product.image ? (
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-primary-soft text-[10px] text-muted-foreground">
                Sem imagem
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <h3 className="line-clamp-2 text-base font-bold text-foreground">{product.name}</h3>
            <p className="mt-1 flex items-baseline gap-2">
              {showOldPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.oldPrice as number)}
                </span>
              )}
              <span className="text-xl font-bold text-foreground">
                {matchedVariant ? formatPrice(matchedVariant.price) : formatPrice(product.price)}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {product.options.map((option) => {
            const singleValue = option.values.length <= 1;

            return (
              <div key={option.name} className={cn("flex", singleValue ? "items-center gap-2" : "flex-col")}>
                <p
                  className={cn(
                    "font-semibold text-foreground",
                    singleValue ? "text-sm" : "mb-2 text-sm",
                  )}
                >
                  {option.name}
                </p>

                {singleValue ? (
                  <span className="text-sm text-muted-foreground">{option.values[0]}</span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const isSelected = selected[option.name] === value;
                      const wouldMatch = product.variants.find((variant) =>
                        variant.selectedOptions.every(
                          (o) => (o.name === option.name ? value : selected[o.name]) === o.value,
                        ),
                      );
                      const isAvailable = wouldMatch?.availableForSale ?? false;

                      return (
                        <button
                          key={value}
                          type="button"
                          disabled={!wouldMatch}
                          onClick={() => setSelected((prev) => ({ ...prev, [option.name]: value }))}
                          className={cn(
                            "flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors",
                            isSelected
                              ? "border-foreground bg-foreground text-background"
                              : "border-border text-foreground hover:border-foreground",
                            !wouldMatch && "pointer-events-none opacity-30",
                            wouldMatch && !isAvailable && !isSelected && "text-muted-foreground line-through",
                          )}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {!canAdd && matchedVariant && (
            <p className="text-xs text-red-600">Essa combinação está esgotada.</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-11 shrink-0 items-center rounded-full border border-border">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Diminuir quantidade"
              className="flex size-11 items-center justify-center text-foreground transition-colors hover:text-primary"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-semibold text-foreground">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Aumentar quantidade"
              className="flex size-11 items-center justify-center text-foreground transition-colors hover:text-primary"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            disabled={!canAdd || isPending}
            onClick={() => matchedVariant && onConfirm(matchedVariant.id, quantity)}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-[#3A2C22] transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-40"
          >
            <ShoppingCart className="size-4" />
            {isPending ? "Adicionando..." : "Adicionar ao Carrinho"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
