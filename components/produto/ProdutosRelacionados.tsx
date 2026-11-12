import Link from "next/link";
import ProductCard from "@/components/store-page/ProductCard";
import type { Product } from "@/lib/store-data";

const QUANTOS = 4;

type Props = {
  todos: Product[];
  /** Categorias a sugerir primeiro (a do produto, ou as do carrinho). */
  categorias: string[];
  /** Produtos a não sugerir (o próprio, ou os que já estão no carrinho). */
  excluir: string[];
  titulo?: string;
};

/** Sugestões: primeiro produtos das mesmas categorias; se faltarem, completa com outros. */
export default function ProdutosRelacionados({ todos, categorias, excluir, titulo }: Props) {
  const outros = todos.filter((p) => !excluir.includes(p.id) && p.inStock);
  const mesmaCategoria = outros.filter((p) => categorias.includes(p.category));
  const resto = outros.filter((p) => !categorias.includes(p.category));
  const sugestoes = [...mesmaCategoria, ...resto].slice(0, QUANTOS);
  const categoria = categorias.length === 1 ? categorias[0] : null;

  if (sugestoes.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          {titulo ?? (categoria && mesmaCategoria.length > 0 ? `Mais em ${categoria}` : "Também pode gostar")}
        </h2>
        <Link
          href={categoria ? `/store?categoria=${encodeURIComponent(categoria)}` : "/store"}
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
