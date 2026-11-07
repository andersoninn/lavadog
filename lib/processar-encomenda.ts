import "server-only";
import { descontarStock, lerEncomenda, marcar } from "@/lib/encomendas";
import { emailAguardaPagamento, emailConfirmacao, emailNovaEncomendaLoja } from "@/lib/emails-encomenda";

/**
 * Chamado pelo webhook do Stripe quando um checkout termina ou um pagamento
 * Multibanco é confirmado. Pode ser chamado várias vezes para a mesma sessão
 * (o Stripe repete webhooks): as marcas na metadata evitam repetir emails e
 * descontar o stock duas vezes.
 */
export async function processarSessao(sessaoId: string) {
  const enc = await lerEncomenda(sessaoId);
  const meta = enc.pagamento?.metadata ?? {};

  if (!enc.pago) {
    if (meta.aviso_pendente === "sim") return;
    await marcar(enc, { aviso_pendente: "sim" });
    await emailAguardaPagamento(enc);
    return;
  }

  if (meta.processado === "sim") return;
  // Marca primeiro: se algo falhar a seguir, não volta a descontar stock.
  await marcar(enc, { processado: "sim" });

  const tarefas = await Promise.allSettled([
    descontarStock(sessaoId),
    emailConfirmacao(enc),
    emailNovaEncomendaLoja(enc),
  ]);
  for (const t of tarefas) {
    if (t.status === "rejected") console.error(`Encomenda ${enc.numero}: falha ao processar`, t.reason);
  }
}
