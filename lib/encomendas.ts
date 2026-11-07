import "server-only";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { opcoesDoPreco } from "@/lib/stripe-opcoes";
import { stockDoPreco } from "@/lib/stock";

/**
 * Encomendas — tudo vive no Stripe, sem base de dados:
 *
 * - Número: calculado a partir da sessão do Checkout (LD-AAMMDD-XXXXX). É
 *   sempre o mesmo para a mesma sessão, por isso o site, os emails e o painel
 *   mostram o mesmo número sem precisar de o guardar.
 * - Estado: na METADATA do pagamento (PaymentIntent) — `encomenda`,
 *   `processado`, `aviso_pendente`, `enviado_em`, `seguimento`. A descrição
 *   do pagamento passa a "Encomenda LD-…", por isso a Carol encontra-a na
 *   pesquisa do painel do Stripe.
 */

export type ItemEncomenda = { nome: string; opcao: string | null; quantidade: number; total: number };

export type Encomenda = {
  numero: string;
  sessaoId: string;
  data: Date;
  nome: string;
  email: string | null;
  telefone: string | null;
  morada: string[];
  nif: string | null;
  itens: ItemEncomenda[];
  portes: number;
  desconto: number;
  total: number;
  pago: boolean;
  pagamento: Stripe.PaymentIntent | null;
  enviadoEm: string | null;
  seguimento: string | null;
};

export function numeroEncomenda(sessao: { id: string; created: number }): string {
  const d = new Date(sessao.created * 1000);
  const data = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  let h = 0x811c9dc5; // FNV-1a
  for (const c of sessao.id) h = Math.imul(h ^ c.charCodeAt(0), 0x01000193) >>> 0;
  return `LD-${data}-${h.toString(36).toUpperCase().padStart(5, "0").slice(-5)}`;
}

function linhasDaMorada(m: Stripe.Address | null | undefined): string[] {
  if (!m) return [];
  return [m.line1, m.line2, [m.postal_code, m.city].filter(Boolean).join(" "), m.state, m.country]
    .filter((l): l is string => Boolean(l && l.trim()));
}

export async function lerEncomenda(sessaoId: string): Promise<Encomenda> {
  const s = stripe();
  const [sessao, linhas] = await Promise.all([
    s.checkout.sessions.retrieve(sessaoId, { expand: ["payment_intent"] }),
    s.checkout.sessions.listLineItems(sessaoId, { limit: 100, expand: ["data.price.product"] }),
  ]);
  return montarEncomenda(sessao, linhas.data);
}

export function montarEncomenda(sessao: Stripe.Checkout.Session, linhas: Stripe.LineItem[]): Encomenda {
  const pagamento = typeof sessao.payment_intent === "object" ? sessao.payment_intent : null;
  const envio = sessao.collected_information?.shipping_details;
  const meta = pagamento?.metadata ?? {};
  return {
    numero: numeroEncomenda(sessao),
    sessaoId: sessao.id,
    data: new Date(sessao.created * 1000),
    nome: envio?.name ?? sessao.customer_details?.name ?? "Cliente",
    email: sessao.customer_details?.email ?? null,
    telefone: sessao.customer_details?.phone ?? null,
    morada: linhasDaMorada(envio?.address ?? sessao.customer_details?.address),
    nif: sessao.custom_fields.find((c) => c.key === "nif")?.numeric?.value ?? null,
    itens: linhas.map((l) => {
      const opcoes = l.price ? opcoesDoPreco(l.price) : [];
      return {
        nome: l.description ?? "Produto",
        opcao: opcoes.length ? opcoes.map((o) => `${o.name}: ${o.value}`).join(" · ") : null,
        quantidade: l.quantity ?? 1,
        total: l.amount_total / 100,
      };
    }),
    portes: (sessao.total_details?.amount_shipping ?? 0) / 100,
    desconto: (sessao.total_details?.amount_discount ?? 0) / 100,
    total: (sessao.amount_total ?? 0) / 100,
    pago: sessao.payment_status === "paid" || sessao.payment_status === "no_payment_required",
    pagamento,
    enviadoEm: meta.enviado_em ?? null,
    seguimento: meta.seguimento ?? null,
  };
}

/** Guarda estado da encomenda na metadata do pagamento (e o número na descrição). */
export async function marcar(enc: Encomenda, campos: Record<string, string>) {
  if (!enc.pagamento) return;
  await stripe().paymentIntents.update(enc.pagamento.id, {
    description: `Encomenda ${enc.numero}`,
    metadata: { encomenda: enc.numero, ...campos },
  });
}

/** Desconta do stock (metadata `stock`) as unidades vendidas. */
export async function descontarStock(sessaoId: string) {
  const s = stripe();
  const linhas = await s.checkout.sessions.listLineItems(sessaoId, { limit: 100 });
  const descontos = new Map<string, { tipo: "preco" | "produto"; quantidade: number }>();

  for (const l of linhas.data) {
    if (!l.price) continue;
    const preco = await s.prices.retrieve(l.price.id, { expand: ["product"] });
    const produto = preco.product as Stripe.Product;
    const { valor, onde } = stockDoPreco(preco, produto);
    if (valor === null || !onde) continue;
    const id = onde === "preco" ? preco.id : produto.id;
    const atual = descontos.get(id) ?? { tipo: onde, quantidade: 0 };
    atual.quantidade += l.quantity ?? 1;
    descontos.set(id, atual);
  }

  for (const [id, { tipo, quantidade }] of descontos) {
    // Relê o valor atual mesmo antes de gravar, para descontar sobre o mais recente.
    const objeto = tipo === "preco" ? await s.prices.retrieve(id) : await s.products.retrieve(id);
    const atual = Number.parseInt(objeto.metadata?.stock ?? "0", 10) || 0;
    const novo = String(Math.max(atual - quantidade, 0));
    if (tipo === "preco") await s.prices.update(id, { metadata: { stock: novo } });
    else await s.products.update(id, { metadata: { stock: novo } });
  }
}
