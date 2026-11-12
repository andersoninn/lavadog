import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CarrinhoVazio() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card py-20 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-primary-soft">
        <ShoppingBag className="size-8 text-foreground" />
      </span>
      <p className="text-lg font-bold text-foreground">O seu carrinho está vazio</p>
      <p className="text-sm text-muted-foreground">Explore a loja e encontre produtos para o seu pet.</p>
      <Link
        href="/store"
        className="mt-2 flex h-12 items-center justify-center rounded-full bg-primary px-8 font-bold text-foreground transition-colors hover:bg-primary-hover"
      >
        Ir para a loja
      </Link>
    </div>
  );
}
