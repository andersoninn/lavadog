import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

/** Início / Categoria / Produto */
export default function TrilhoProduto({ categoria, nome }: { categoria: string; nome: string }) {
  return (
    <nav aria-label="Trilho" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      <Link href="/" className="flex items-center gap-1.5 hover:text-foreground">
        <Home className="size-4" /> Início
      </Link>
      <ChevronRight className="size-3.5" />
      <Link href={`/store?categoria=${encodeURIComponent(categoria)}`} className="hover:text-foreground">
        {categoria}
      </Link>
      <ChevronRight className="size-3.5" />
      <span className="line-clamp-1 font-medium text-foreground">{nome}</span>
    </nav>
  );
}
