"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  opcoes: { valor: string; total: number }[];
  selecionadas: string[];
  onAlternar: (valor: string) => void;
  /** Mostra uma caixa de pesquisa (ex.: "Buscar marca...") */
  pesquisa?: string;
  /** Quantas mostrar antes de "Ver mais" */
  visiveis?: number;
  verMais?: string;
};

/** Lista de checkboxes com contagem, pesquisa opcional e "Ver mais". */
export default function ListaCheckbox({
  opcoes,
  selecionadas,
  onAlternar,
  pesquisa,
  visiveis = 5,
  verMais = "Ver mais",
}: Props) {
  const [termo, setTermo] = useState("");
  const [todas, setTodas] = useState(false);
  const filtradas = opcoes.filter((o) =>
    o.valor.toLowerCase().includes(termo.trim().toLowerCase()),
  );
  const mostradas = todas || termo ? filtradas : filtradas.slice(0, visiveis);

  return (
    <div className="space-y-2.5">
      {pesquisa && (
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder={pesquisa}
            className="h-9 w-full rounded-md border border-border bg-background pr-3 pl-8 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
      )}
      <ul className="space-y-2">
        {mostradas.map(({ valor, total }) => {
          const ativa = selecionadas.includes(valor);
          return (
            <li key={valor}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={ativa}
                  onChange={() => onAlternar(valor)}
                  className="size-4 rounded border-border accent-primary"
                />
                <span
                  className={cn(
                    ativa
                      ? "font-semibold text-foreground"
                      : "text-foreground/80",
                  )}
                >
                  {valor}
                </span>
                <span className="text-xs text-muted-foreground">({total})</span>
              </label>
            </li>
          );
        })}
      </ul>
      {!termo && filtradas.length > visiveis && (
        <button
          type="button"
          onClick={() => setTodas((v) => !v)}
          className="flex items-center gap-1 text-sm font-semibold text-blue-strong underline underline-offset-2"
        >
          {todas ? "Ver menos" : verMais}
          <ChevronDown
            className={cn("size-4 transition-transform", todas && "rotate-180")}
          />
        </button>
      )}
    </div>
  );
}
