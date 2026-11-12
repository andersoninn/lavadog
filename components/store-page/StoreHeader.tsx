import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home, PawPrint } from "lucide-react";
import type { Promocao } from "@/lib/promocoes";

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

      <div className="mt-5 grid grid-cols-1 items-center gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
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

        <div className="relative flex h-36 items-center overflow-hidden rounded-md border border-border bg-primary-soft px-6">
          <div className="relative z-10 max-w-[62%] sm:max-w-[55%]">
            <p className="text-lg font-bold text-foreground">Cuidado que</p>
            <p className="mt-0.5 inline-block rounded-md bg-primary px-2.5 py-0.5 text-xl font-extrabold text-foreground">
              faz a diferença
            </p>
            <p className="mt-2 text-xs text-foreground/75">
              As melhores marcas para o seu pet, com preços especiais.
            </p>
          </div>
          <Image
            src="/images/dogCtaStore.png"
            alt=""
            width={220}
            height={147}
            className="absolute right-16 bottom-0 hidden h-36 w-auto object-contain sm:block"
          />
          {promocao && (
            <div className="absolute top-1/2 right-3 z-10 flex size-24 -translate-y-1/2 rotate-6 flex-col items-center justify-center rounded-full bg-primary text-center shadow-md">
              <span className="text-[11px] font-bold text-foreground">
                Cupão
              </span>
              <span className="text-xl leading-none font-black text-foreground">
                {promocao.desconto.replace(" off", "")}
              </span>
              <span className="text-xs font-black text-foreground">OFF</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
