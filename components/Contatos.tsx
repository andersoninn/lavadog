import Depoimentos from "@/components/Depoimentos";
import { getAvaliacoesGoogle } from "@/lib/google-avaliacoes";

/**
 * Secção de depoimentos da home: avaliações do Google quando a API está
 * ligada; até lá, depoimentos de exemplo. Fundo com patinhas e ondas.
 */
export default async function Contatos() {
  const dados = await getAvaliacoesGoogle();

  return (
    <section id="depoimentos" className="fundo-paginas fundo-secao w-full scroll-mt-24 py-24 sm:py-28">
      <Depoimentos dados={dados} />
    </section>
  );
}
