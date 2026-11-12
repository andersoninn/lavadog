"use client";

import * as React from "react";
import Link from "next/link";
import type { Product } from "@/lib/store-data";
import AbasAnimal from "./AbasAnimal";
import FilaProdutos from "./FilaProdutos";

export type PorAnimal = Record<string, Product[]>;

/** Secção com título, abas Gato/Cão, fila de produtos e "Ver todos". */
export default function VitrineAnimal({
  id,
  titulo,
  subtitulo,
  porAnimal,
  extraHref = "",
  lateral,
}: {
  id: string;
  titulo: string;
  subtitulo: string;
  porAnimal: PorAnimal;
  /** Parâmetros a mais no link "Ver todos" (ex.: "&promo=true"). */
  extraHref?: string;
  lateral?: React.ReactNode;
}) {
  const abas = Object.keys(porAnimal).filter((a) => porAnimal[a].length > 0);
  const [ativa, setAtiva] = React.useState(abas[0]);
  if (!ativa) return null;
  const especie = ativa === "Gato" ? "Gatos" : "Cães";

  return (
    <section id={id} className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-16">
      <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">{titulo}</h2>
      <p className="mt-2 text-center text-muted-foreground">{subtitulo}</p>
      {abas.length > 1 && <AbasAnimal abas={abas} ativa={ativa} onMudar={setAtiva} />}
      <div className={lateral ? "lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6" : undefined}>
        {lateral}
        <FilaProdutos produtos={porAnimal[ativa]} />
      </div>
      <p className="mt-6 text-center">
        <Link href={`/store?animal=${especie}${extraHref}`} className="font-semibold text-blue-strong hover:underline">
          Ver todos os produtos »
        </Link>
      </p>
    </section>
  );
}
