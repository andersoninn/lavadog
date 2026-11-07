"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/store-data";

type ComVariantes = Pick<Product, "variants">;

/**
 * Escolha de variante (Tamanho, Cor…) + quantidade. Usado pelo modal de
 * opções da loja e pela página do produto.
 */
export function useVariante(product: ComVariantes) {
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

  /** A variante que existiria se trocasse esta opção por este valor. */
  function varianteCom(nome: string, valor: string) {
    return product.variants.find((variant) =>
      variant.selectedOptions.every((o) => (o.name === nome ? valor : selected[o.name]) === o.value),
    );
  }

  return {
    selected,
    escolher: (nome: string, valor: string) => setSelected((prev) => ({ ...prev, [nome]: valor })),
    quantity,
    setQuantity,
    matchedVariant,
    canAdd: Boolean(matchedVariant?.availableForSale),
    varianteCom,
  };
}
