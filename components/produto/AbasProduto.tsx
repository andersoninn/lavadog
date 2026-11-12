"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Aba = { id: string; rotulo: string; conteudo: ReactNode };

/** Abas do wireframe (Descrição, Composição, Informações nutricionais, Avaliações). */
export default function AbasProduto({ abas }: { abas: Aba[] }) {
  const [ativa, setAtiva] = useState(abas[0]?.id);

  // O link "avaliações" no topo da página abre a aba das avaliações.
  useEffect(() => {
    const abrir = () => {
      const id = window.location.hash.slice(1);
      if (abas.some((a) => a.id === id)) setAtiva(id);
    };
    abrir();
    window.addEventListener("hashchange", abrir);
    return () => window.removeEventListener("hashchange", abrir);
  }, [abas]);

  return (
    <section id="avaliacoes" className="scroll-mt-28">
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-border">
        {abas.map((a) => (
          <button
            key={a.id}
            role="tab"
            type="button"
            aria-selected={ativa === a.id}
            onClick={() => setAtiva(a.id)}
            className={cn(
              "shrink-0 rounded-t-xl px-4 py-2.5 text-sm font-semibold transition-colors",
              ativa === a.id ? "bg-primary text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {a.rotulo}
          </button>
        ))}
      </div>
      <div className="pt-6">{abas.find((a) => a.id === ativa)?.conteudo}</div>
    </section>
  );
}
