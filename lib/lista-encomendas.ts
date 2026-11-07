import "server-only";
import { stripe } from "@/lib/stripe";
import { montarEncomenda, type Encomenda } from "@/lib/encomendas";

/** As encomendas mais recentes (checkouts concluídos), para o painel. */
export async function listarEncomendas(limite = 30): Promise<Encomenda[]> {
  const s = stripe();
  const sessoes = await s.checkout.sessions.list({
    status: "complete",
    limit: limite,
    expand: ["data.payment_intent"],
  });
  return Promise.all(
    sessoes.data.map(async (sessao) => {
      const linhas = await s.checkout.sessions.listLineItems(sessao.id, { limit: 100 });
      return montarEncomenda(sessao, linhas.data);
    }),
  );
}
