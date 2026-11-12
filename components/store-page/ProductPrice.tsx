import { formatPrice } from "@/lib/store-data";

/** Preço antigo riscado (em cima) e preço atual em destaque. */
export default function ProductPrice({ price, oldPrice }: { price: number; oldPrice?: number }) {
  return (
    <p className="flex flex-col">
      {oldPrice && <span className="text-xs text-muted-foreground line-through">{formatPrice(oldPrice)}</span>}
      <span className="text-xl font-extrabold text-foreground">{formatPrice(price)}</span>
    </p>
  );
}
