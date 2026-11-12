"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/store-page/ProductCard";
import type { Product } from "@/lib/store-data";
import { cn } from "@/lib/utils";

const SETA =
  "absolute top-1/3 z-10 hidden size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm hover:bg-muted md:flex";

/** Fila horizontal de cartões com setas e barra de progresso do scroll. */
export default function FilaProdutos({ produtos }: { produtos: Product[] }) {
  const fila = React.useRef<HTMLUListElement>(null);
  const [progresso, setProgresso] = React.useState({ inicio: 0, largura: 1 });

  const medir = React.useCallback(() => {
    const el = fila.current;
    if (!el) return;
    const largura = Math.min(1, el.clientWidth / el.scrollWidth);
    const max = el.scrollWidth - el.clientWidth;
    setProgresso({ largura, inicio: max > 0 ? (el.scrollLeft / max) * (1 - largura) : 0 });
  }, []);

  React.useEffect(() => {
    const el = fila.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [produtos, medir]);

  const mover = (dir: number) => fila.current?.scrollBy({ left: dir * fila.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="relative mt-8">
      <button type="button" aria-label="Anteriores" onClick={() => mover(-1)} className={cn(SETA, "-left-4")}>
        <ChevronLeft className="size-5" />
      </button>
      <ul
        ref={fila}
        onScroll={medir}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {produtos.map((p) => (
          <li key={p.id} className="flex w-[70%] shrink-0 snap-start sm:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[19%]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
      <button type="button" aria-label="Seguintes" onClick={() => mover(1)} className={cn(SETA, "-right-4")}>
        <ChevronRight className="size-5" />
      </button>
      {progresso.largura < 1 && (
        <div aria-hidden className="mx-auto mt-6 h-1 w-2/3 max-w-xl rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-[margin] duration-150"
            style={{ width: `${progresso.largura * 100}%`, marginLeft: `${progresso.inicio * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
