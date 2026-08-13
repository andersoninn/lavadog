import Image from "next/image";
import { Star } from "lucide-react";
import ProductBadge from "@/components/store-page/ProductBadge";
import ProductPrice from "@/components/store-page/ProductPrice";
import AddToCartButton from "@/components/store-page/AddToCartButton";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/store-data";

export default function ProductCard({
  product,
  layout = "grid",
}: {
  product: Product;
  layout?: "grid" | "list";
}) {
  const rating = product.reviewsCount > 0 && (
    <div className="mt-1.5 flex items-center gap-1">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn("size-3", i < product.rating ? "fill-primary text-primary" : "text-border")}
          />
        ))}
      </div>
      <span className="text-[11px] text-muted-foreground">({product.reviewsCount})</span>
    </div>
  );

  const image = (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-xl bg-muted",
        layout === "list" ? "size-20 sm:size-28" : "aspect-square",
      )}
    >
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={layout === "list" ? "112px" : "(min-width: 1024px) 240px, 45vw"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-primary-soft text-center text-[10px] font-medium text-muted-foreground">
          Sem imagem
        </div>
      )}

      {product.badge && <ProductBadge badge={product.badge} />}

      {!product.inStock && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
          <span className="rounded-full bg-foreground px-2 py-1 text-[9px] font-bold tracking-wide text-background uppercase">
            Esgotado
          </span>
        </div>
      )}
    </div>
  );

  if (layout === "list") {
    return (
      <article className="group flex items-center gap-3 rounded-2xl bg-card p-3 transition-all duration-300 hover:shadow-lg sm:gap-4">
        {image}

        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            {product.category}
          </span>
          <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold text-foreground sm:line-clamp-2">
            {product.name}
          </h3>
          {rating}
          <ProductPrice price={product.price} oldPrice={product.oldPrice} />
        </div>

        <AddToCartButton product={product} iconOnlyBelowSm />
      </article>
    );
  }

  return (
    <article className="group flex flex-col rounded-2xl bg-card p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {image}

      <div className="mt-3 flex flex-1 flex-col">
        <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          {product.category}
        </span>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">{product.name}</h3>

        {rating}

        <ProductPrice price={product.price} oldPrice={product.oldPrice} />

        <AddToCartButton product={product} className="mt-3" />
      </div>
    </article>
  );
}
