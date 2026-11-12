"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { ProductDetalhes } from "@/lib/store-data";
import { cn } from "@/lib/utils";

type Props = { descricao: string | null; detalhes: ProductDetalhes };

/** Abas Descrição / Composição / Informações nutricionais (só as que têm conteúdo). */
export default function AbasProduto({ descricao, detalhes }: Props) {
  const abas = [
    { id: "descricao", rotulo: "Descrição", tem: Boolean(descricao || detalhes.beneficios.length) },
    { id: "composicao", rotulo: "Composição", tem: Boolean(detalhes.composicao) },
    { id: "nutricao", rotulo: "Informações nutricionais", tem: Boolean(detalhes.nutricao) },
  ].filter((a) => a.tem);
  const [ativa, setAtiva] = useState(abas[0]?.id);

  if (abas.length === 0) return null;

  return (
    <section>
      <div role="tablist" className="flex gap-2 overflow-x-auto border-b border-border">
        {abas.map((a) => (
          <button
            key={a.id}
            role="tab"
            type="button"
            aria-selected={ativa === a.id}
            onClick={() => setAtiva(a.id)}
            className={cn(
              "shrink-0 rounded-t-2xl px-5 py-3 text-sm font-semibold transition-colors",
              ativa === a.id ? "border-b-2 border-primary-hover bg-primary text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {a.rotulo}
          </button>
        ))}
      </div>

      <div className="pt-6">
        {ativa === "descricao" && (
          <div className="grid gap-8 md:grid-cols-2">
            {descricao && (
              <div>
                <h2 className="text-xl font-bold text-foreground">Sobre o produto</h2>
                <p className="mt-3 text-[15px] leading-relaxed whitespace-pre-line text-foreground/80">{descricao}</p>
              </div>
            )}
            {detalhes.beneficios.length > 0 && (
              <div className={cn(descricao && "md:border-l md:border-border md:pl-8")}>
                <h2 className="text-xl font-bold text-foreground">Principais benefícios</h2>
                <ul className="mt-3 space-y-2">
                  {detalhes.beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[15px] text-foreground/80">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 fill-primary text-foreground" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {ativa === "composicao" && <p className="text-[15px] leading-relaxed whitespace-pre-line text-foreground/80">{detalhes.composicao}</p>}
        {ativa === "nutricao" && <p className="text-[15px] leading-relaxed whitespace-pre-line text-foreground/80">{detalhes.nutricao}</p>}
      </div>
    </section>
  );
}
