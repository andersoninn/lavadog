import ProductCard from "@/components/store-page/ProductCard";
import type { Product } from "@/lib/store-data";

export default function ProductGrid({
  products,
  view = "grid",
}: {
  products: Product[];
  view?: "grid" | "list";
}) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-border py-24 text-center">
        <p className="font-semibold text-foreground">Nenhum produto encontrado</p>
        <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou a busca.</p>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} layout="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
