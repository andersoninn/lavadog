import Link from "next/link";
import ProductCard from "@/components/store-page/ProductCard";
import type { Product } from "@/lib/store-data";

const QUANTOS = 4;

/** Sugestões: primeiro produtos da mesma categoria; se faltarem, completa com outros. */
export default function ProdutosRelacionados({ produto, todos }: { produto: Product; todos: Product[] }) {
  const outros = todos.filter((p) => p.id !== produto.id && p.inStock);
  const mesmaCategoria = outros.filter((p) => p.category === produto.category);
  const resto = outros.filter((p) => p.category !== produto.category);
  const sugestoes = [...mesmaCategoria, ...resto].slice(0, QUANTOS);

  if (sugestoes.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          {mesmaCategoria.length > 0 ? `Mais em ${produto.category}` : "Também pode gostar"}
        </h2>
        <Link
          href={`/store?categoria=${encodeURIComponent(produto.category)}`}
          className="text-sm font-semibold text-blue-strong underline underline-offset-2"
        >
          Ver todos
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {sugestoes.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
