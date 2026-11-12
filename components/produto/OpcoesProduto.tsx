"use client";

import { Check } from "lucide-react";
import { formatPrice, type Product } from "@/lib/store-data";
import { quilosDaOpcao } from "@/lib/preco-kg";
import type { useVariante } from "@/lib/use-variante";
import { cn } from "@/lib/utils";

type Props = {
  product: Pick<Product, "variants" | "options">;
  variante: ReturnType<typeof useVariante>;
};

/** Cartões de escolha (peso, tamanho, cor…). Com uma só opção, cada cartão mostra o preço. */
export default function OpcoesProduto({ product, variante }: Props) {
  const opcoes = product.options.filter((o) => o.values.length > 1);
  const umaSoOpcao = opcoes.length === 1;

  return (
    <>
      {opcoes.map((option) => (
        <div key={option.name} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
          <span className="w-24 shrink-0 pt-3 text-sm font-semibold text-foreground">{option.name}:</span>
          <div className="flex flex-wrap gap-3">
            {option.values.map((value) => {
              const v = variante.varianteCom(option.name, value);
              const escolhido = variante.selected[option.name] === value;
              return (
                <button
                  key={value}
                  type="button"
                  disabled={!v}
                  onClick={() => variante.escolher(option.name, value)}
                  className={cn(
                    "relative flex min-w-24 flex-col items-center justify-center rounded-lg border-2 bg-card px-4 py-2 transition-colors",
                    escolhido ? "border-primary bg-primary-soft" : "border-border hover:border-primary/60",
                    !v && "pointer-events-none opacity-30",
                  )}
                >
                  {escolhido && (
                    <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-primary">
                      <Check className="size-3 text-foreground" strokeWidth={3} />
                    </span>
                  )}
                  <span className={cn("font-bold text-foreground", v && !v.availableForSale && "line-through opacity-50")}>
                    {value}
                  </span>
                  {umaSoOpcao && v && <span className="text-xs text-muted-foreground">{formatPrice(v.price)}</span>}
                  {umaSoOpcao && v && escolhido && quilosDaOpcao(value) && (
                    <span className="text-[11px] text-muted-foreground">
                      ({formatPrice(v.price / (quilosDaOpcao(value) as number))} / kg)
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
