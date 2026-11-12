import Link from "next/link";
import { ChevronRight, Home, PawPrint } from "lucide-react";
import type { Promocao } from "@/lib/promocoes";
import BannerLoja from "@/components/store-page/BannerLoja";

type Props = {
  titulo: string;
  descricao: string;
  categoria: string | null;
  promocao: Promocao | null;
};

/** Trilho + título da secção (com ícone) e banner da promoção à direita. */
export default function StoreHeader({
  titulo,
  descricao,
  categoria,
  promocao,
}: Props) {
  return (
    <div>
      <nav
        aria-label="Trilho"
        className="flex items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 hover:text-foreground"
        >
          <Home className="size-4" /> Início
        </Link>
        <ChevronRight className="size-3.5" />
        {categoria ? (
          <>
            <Link href="/store" className="hover:text-foreground">
              Loja
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="font-medium text-foreground">{categoria}</span>
          </>
        ) : (
          <span className="font-medium text-foreground">Loja</span>
        )}
      </nav>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-foreground sm:text-4xl">
            <PawPrint
              className="size-9 shrink-0 text-primary"
              strokeWidth={1.5}
            />
            {titulo}
          </h1>
          <p className="mt-2 max-w-md text-[15px] text-muted-foreground">
            {descricao}
          </p>
        </div>

        <BannerLoja promocao={promocao} />
      </div>
    </div>
  );
}
