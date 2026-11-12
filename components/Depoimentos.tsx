import { PawPrint } from "lucide-react";
import CartaoDepoimento from "@/components/depoimentos/CartaoDepoimento";
import BarraConfianca from "@/components/depoimentos/BarraConfianca";
import {
  DEPOIMENTOS_EXEMPLO,
  type Depoimento,
} from "@/lib/depoimentos-exemplo";
import type { AvaliacoesGoogle } from "@/lib/google-avaliacoes";

/** "O que nossos clientes dizem": avaliações do Google ou, sem elas, os exemplos. */
export default function Depoimentos({
  dados,
}: {
  dados: AvaliacoesGoogle | null;
}) {
  const depoimentos: Depoimento[] = dados
    ? dados.avaliacoes.map((a) => ({
        nome: a.nome,
        texto: a.texto,
        estrelas: a.estrelas,
        legenda: a.quando,
        foto: a.foto,
      }))
    : DEPOIMENTOS_EXEMPLO;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:px-10">
      <div className="text-center">
        <span className="relative inline-flex">
          <PawPrint className="size-10 fill-foreground text-foreground" />
          <span
            aria-hidden
            className="absolute -top-2 -left-6 h-0.5 w-4 -rotate-[30deg] rounded bg-primary"
          />
          <span
            aria-hidden
            className="absolute -top-2 -right-6 h-0.5 w-4 rotate-[30deg] rounded bg-primary"
          />
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-5xl">
          O que nossos <span className="text-primary">clientes</span> dizem
        </h2>
        <p className="mt-3 text-base text-foreground/75">
          A confiança de quem já escolhe a LavaDog para o bem-estar do seu pet.
        </p>
      </div>

      {/* 3 por linha no computador; no telemóvel desliza para o lado */}
      <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
        {depoimentos.slice(0, 6).map((d) => (
          <div
            key={d.nome + d.texto.slice(0, 12)}
            className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-auto"
          >
            <CartaoDepoimento d={d} />
          </div>
        ))}
      </div>

      <BarraConfianca nota={dados?.nota ?? null} total={dados?.total ?? null} />
    </div>
  );
}
