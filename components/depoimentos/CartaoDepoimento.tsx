import { PawPrint, Quote, Star } from "lucide-react";
import type { Depoimento } from "@/lib/depoimentos-exemplo";

const iniciais = (nome: string) =>
  nome
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

/** Cartão de um depoimento: foto (ou iniciais), nome, estrelas, legenda e texto. */
export default function CartaoDepoimento({ d }: { d: Depoimento }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-border bg-card/95 p-6 shadow-[0_8px_30px_rgba(34,27,20,0.06)]">
      <div className="flex items-center gap-4">
        {d.foto ? (
          // Foto vinda do Google (domínio externo): <img> simples.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={d.foto}
            alt=""
            referrerPolicy="no-referrer"
            className="size-20 shrink-0 rounded-full border-4 border-primary-soft object-cover"
          />
        ) : (
          <span className="flex size-20 shrink-0 items-center justify-center rounded-full border-4 border-primary-soft bg-primary text-2xl font-extrabold text-foreground">
            {iniciais(d.nome)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-foreground">{d.nome}</p>
          <p
            className="mt-0.5 flex gap-0.5"
            aria-label={`${d.estrelas} de 5 estrelas`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.round(d.estrelas)
                    ? "size-5 fill-primary text-primary"
                    : "size-5 text-border"
                }
              />
            ))}
          </p>
          {d.legenda && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              {d.legenda} <PawPrint className="size-3.5" />
            </p>
          )}
        </div>
      </div>
      <Quote
        aria-hidden
        className="mt-5 size-7 fill-primary/50 text-primary/50"
      />
      <p className="mt-1 text-[15px] leading-relaxed text-foreground/80 italic">
        “{d.texto}”
      </p>
    </article>
  );
}
