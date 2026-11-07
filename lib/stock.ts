import type Stripe from "stripe";

/**
 * Stock opcional, guardado na METADATA do Stripe:
 *
 *   stock = "12"   no PREÇO (variante)  → stock só dessa variante
 *   stock = "12"   no PRODUTO           → stock partilhado por todas as variantes
 *
 * Sem `stock`, o produto não tem controlo de quantidade (como antes; a Carol
 * marca `esgotado` à mão). Com `stock`, cada venda paga desconta sozinha
 * (webhook do Stripe) e, ao chegar a 0, o produto aparece "Esgotado".
 *
 * Fica fora de lib/stripe.ts porque também é usado no browser (store-data).
 */

/** Chaves de metadata que são de controlo, não opções de variante. */
export const CHAVES_DE_CONTROLO = ["esgotado", "stock"];

export function lerStock(meta: Stripe.Metadata | null | undefined): number | null {
  const bruto = meta?.stock?.trim();
  if (!bruto) return null;
  const n = Number.parseInt(bruto, 10);
  return Number.isFinite(n) ? Math.max(n, 0) : null;
}

/** O stock que vale para este preço: o da variante ou, se não houver, o do produto. */
export function stockDoPreco(preco: Stripe.Price, produto: Stripe.Product): { valor: number | null; onde: "preco" | "produto" | null } {
  const doPreco = lerStock(preco.metadata);
  if (doPreco !== null) return { valor: doPreco, onde: "preco" };
  const doProduto = lerStock(produto.metadata);
  if (doProduto !== null) return { valor: doProduto, onde: "produto" };
  return { valor: null, onde: null };
}
