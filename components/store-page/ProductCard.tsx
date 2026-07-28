import { ShoppingCart, Star } from "lucide-react";
import ProductBadge from "@/components/store-page/ProductBadge";
import ProductPrice from "@/components/store-page/ProductPrice";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/store-data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col rounded-2xl bg-card p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105",
            product.image,
          )}
        />

        {product.badge && <ProductBadge badge={product.badge} />}

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
            <span className="rounded-full bg-foreground px-3 py-1 text-[10px] font-bold tracking-wide text-background uppercase">
              Esgotado
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          {product.category}
        </span>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">{product.name}</h3>

        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-3",
                  i < product.rating ? "fill-primary text-primary" : "text-border",
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">({product.reviewsCount})</span>
        </div>

        <ProductPrice price={product.price} oldPrice={product.oldPrice} />

        <button
          type="button"
          disabled={!product.inStock}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-border py-2 text-xs font-semibold text-foreground transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40 disabled:group-hover:border-border disabled:group-hover:bg-transparent disabled:group-hover:text-foreground"
        >
          <ShoppingCart className="size-3.5" />
          Adicionar ao Carrinho
        </button>
      </div>
    </article>
  );
}
