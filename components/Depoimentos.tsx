import { PawPrint } from "lucide-react";
import CarrosselDepoimentos from "@/components/depoimentos/CarrosselDepoimentos";
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

      <CarrosselDepoimentos depoimentos={depoimentos} />

      <BarraConfianca nota={dados?.nota ?? null} total={dados?.total ?? null} />
    </div>
  );
}
