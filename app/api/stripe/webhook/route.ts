import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { processarSessao } from "@/lib/processar-encomenda";

/**
 * Webhook do Stripe: https://www.lavadogstore.pt/api/stripe/webhook
 *
 * Eventos a ativar no painel (Developers → Webhooks):
 *   checkout.session.completed
 *   checkout.session.async_payment_succeeded
 *
 * Variável: STRIPE_WEBHOOK_SECRET (o "Signing secret" whsec_… do webhook).
 */
export async function POST(req: Request) {
  const segredo = process.env.STRIPE_WEBHOOK_SECRET;
  const assinatura = req.headers.get("stripe-signature");
  if (!segredo || !assinatura) return new Response("Webhook não configurado", { status: 400 });

  let evento: Stripe.Event;
  try {
    evento = stripe().webhooks.constructEvent(await req.text(), assinatura, segredo);
  } catch (error) {
    console.error("Webhook: assinatura inválida", error);
    return new Response("Assinatura inválida", { status: 400 });
  }

  if (
    evento.type === "checkout.session.completed" ||
    evento.type === "checkout.session.async_payment_succeeded"
  ) {
    try {
      await processarSessao(evento.data.object.id);
    } catch (error) {
      // 500 faz o Stripe tentar de novo mais tarde.
      console.error("Webhook: falha ao processar a encomenda", error);
      return new Response("Erro ao processar", { status: 500 });
    }
  }

  return Response.json({ recebido: true });
}
