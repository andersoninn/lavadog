import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import ProductBadge from "@/components/store-page/ProductBadge";
import ProductPrice from "@/components/store-page/ProductPrice";
import AddToCartButton from "@/components/store-page/AddToCartButton";
import BotaoFavorito from "@/components/store-page/BotaoFavorito";
import { formatPrice, type Product } from "@/lib/store-data";
import { precoPorKg } from "@/lib/preco-kg";
import { cn } from "@/lib/utils";

/** Cartão de produto da loja (grelha como no wireframe, ou lista). */
export default function ProductCard({
  product,
  layout = "grid",
}: {
  product: Product;
  layout?: "grid" | "list";
}) {
  const href = `/produto/${product.slug}`;
  const opcao = product.variants[0]?.selectedOptions ?? [];
  const subtitulo = [product.category, opcao[0]?.value]
    .filter(Boolean)
    .join(" · ");
  const porKg = precoPorKg(product.price, opcao);
  const desconto = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;
  const lista = layout === "list";

  const imagem = (
    <Link
      href={href}
      aria-label={product.name}
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-md bg-white",
        lista ? "size-24 sm:size-28" : "aspect-square",
      )}
    >
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={lista ? "112px" : "(min-width: 1024px) 240px, 45vw"}
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center bg-primary-soft/60">
          <Package className="size-10 text-primary-hover" strokeWidth={1.25} />
        </span>
      )}
      {desconto > 0 ? (
        <span className="absolute top-2.5 left-2.5 rounded-full bg-primary px-2.5 py-0.5 text-sm font-bold text-foreground">
          -{desconto}%
        </span>
      ) : (
        product.badge && <ProductBadge badge={product.badge} />
      )}
      {!product.inStock && (
        <span className="absolute inset-0 flex items-center justify-center bg-background/60">
          <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-bold text-background uppercase">
            Esgotado
          </span>
        </span>
      )}
    </Link>
  );

  const textos = (
    <>
      <h3 className="line-clamp-2 font-bold leading-snug text-foreground">
        <Link href={href} className="hover:underline">
          {product.name}
        </Link>
      </h3>
      <p className="mt-0.5 text-sm text-muted-foreground">{subtitulo}</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-x-2">
        <ProductPrice price={product.price} oldPrice={product.oldPrice} />
        {porKg && (
          <span className="pb-1 text-xs whitespace-nowrap text-muted-foreground">
            {formatPrice(porKg)} / kg
          </span>
        )}
      </div>
    </>
  );

  if (lista) {
    return (
      <article className="group flex items-center gap-4 rounded-md border border-border bg-card p-3 transition-shadow hover:shadow-md">
        {imagem}
        <div className="min-w-0 flex-1">{textos}</div>
        <div className="@container hidden w-52 shrink-0 sm:block">
          <AddToCartButton product={product} destaque />
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full w-full flex-col rounded-md border border-border bg-card p-3 transition-shadow hover:shadow-md">
      <BotaoFavorito id={product.id} nome={product.name} />
      {imagem}
      <div className="mt-3 flex flex-1 flex-col">
        {textos}
        <div className="@container mt-auto pt-3">
          <AddToCartButton product={product} destaque />
        </div>
      </div>
    </article>
  );
}
