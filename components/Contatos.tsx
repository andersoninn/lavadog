import Depoimentos from "@/components/Depoimentos";
import { getAvaliacoesGoogle } from "@/lib/google-avaliacoes";

/**
 * Secção de depoimentos da home (avaliações do Google).
 *
 * A âncora #depoimentos existe sempre, mesmo sem avaliações, para o link
 * "Depoimentos" da navbar levar sempre a este ponto da home.
 */
export default async function Contatos() {
  const dados = await getAvaliacoesGoogle();

  if (!dados) return <div id="depoimentos" aria-hidden className="scroll-mt-24" />;

  return (
    <section id="depoimentos" className="mt-44 mb-16 w-full scroll-mt-24 sm:mb-44">
      <Depoimentos dados={dados} />
    </section>
  );
}
