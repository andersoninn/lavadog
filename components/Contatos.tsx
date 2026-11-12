import Depoimentos from "@/components/Depoimentos";
import { getAvaliacoesGoogle } from "@/lib/google-avaliacoes";

/**
 * Secção de depoimentos da home: avaliações do Google quando a API está
 * ligada; até lá, depoimentos de exemplo.
 */
export default async function Contatos() {
  const dados = await getAvaliacoesGoogle();

  return (
    <section id="depoimentos" className="mt-44 mb-16 w-full scroll-mt-24 sm:mb-44">
      <Depoimentos dados={dados} />
    </section>
  );
}
