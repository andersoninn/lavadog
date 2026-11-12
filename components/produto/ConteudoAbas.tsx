import { CheckCircle2, Star } from "lucide-react";
import DestaquesProduto from "@/components/produto/DestaquesProduto";
import type { Aba } from "@/components/produto/AbasProduto";
import type { AvaliacoesGoogle } from "@/lib/google-avaliacoes";
import type { Product } from "@/lib/store-data";

const vazio = (texto: string) => <p className="text-sm text-muted-foreground">{texto}</p>;
const texto = (t: string) => <p className="text-[15px] leading-relaxed whitespace-pre-line text-foreground/80">{t}</p>;

/** Monta o conteúdo das 4 abas a partir dos dados do produto e das avaliações do Google. */
export function conteudoAbas(produto: Product, avaliacoes: AvaliacoesGoogle | null): Aba[] {
  const { detalhes, description } = produto;

  const descricao = (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      <div>
        <h2 className="text-lg font-bold text-foreground">Sobre o produto</h2>
        <div className="mt-2">{description ? texto(description) : vazio("Descrição em breve.")}</div>
        {detalhes.beneficios.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {detalhes.beneficios.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 fill-primary text-foreground" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
      {detalhes.destaques.length > 0 && (
        <>
          <div aria-hidden className="hidden w-px bg-border md:block" />
          <div>
            <h2 className="mb-3 text-lg font-bold text-foreground">Principais benefícios</h2>
            <DestaquesProduto destaques={detalhes.destaques} />
          </div>
        </>
      )}
    </div>
  );

  const listaAvaliacoes = avaliacoes ? (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">Avaliações da LavaDog Store no Google.</p>
      {avaliacoes.avaliacoes.map((a) => (
        <article key={a.nome + a.texto.slice(0, 20)} className="rounded-lg border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            {a.nome}
            <span className="flex">
              {Array.from({ length: Math.round(a.estrelas) }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-primary text-primary" />
              ))}
            </span>
            <span className="text-xs font-normal text-muted-foreground">{a.quando}</span>
          </p>
          <p className="mt-1 text-sm text-foreground/80">{a.texto}</p>
        </article>
      ))}
    </div>
  ) : (
    vazio("Ainda não há avaliações deste produto.")
  );

  return [
    { id: "descricao", rotulo: "Descrição", conteudo: descricao },
    { id: "composicao", rotulo: "Composição", conteudo: detalhes.composicao ? texto(detalhes.composicao) : vazio("Informação em breve.") },
    { id: "nutricao", rotulo: "Informações nutricionais", conteudo: detalhes.nutricao ? texto(detalhes.nutricao) : vazio("Informação em breve.") },
    { id: "avaliacoes", rotulo: avaliacoes ? `Avaliações (${avaliacoes.total})` : "Avaliações", conteudo: listaAvaliacoes },
  ];
}
