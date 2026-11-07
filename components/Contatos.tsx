import Depoimentos from "@/components/Depoimentos";
import { getAvaliacoesGoogle } from "@/lib/google-avaliacoes";

/** Secção de depoimentos da home: só aparece quando há avaliações do Google. */
export default async function Contatos() {
  const dados = await getAvaliacoesGoogle();
  if (!dados) return null;

  return (
    <section id="depoimentos" className="mt-44 mb-16 w-full sm:mb-44">
      <Depoimentos dados={dados} />
    </section>
  );
}
