import "server-only";
import Stripe from "stripe";

/**
 * Ligação ao Stripe — o catálogo e o checkout da loja.
 *
 * A cliente gere os produtos no painel do Stripe (Catálogo de produtos).
 * O que o Shopify tinha e o Stripe não tem fica em METADATA do produto:
 *
 *   categoria      → "Ração", "Brinquedos"…        (filtro de categoria)
 *   marca          → "Royal Canin"…                (filtro de marca)
 *   animal         → "cão, gato"                   (filtro de espécie; vírgulas)
 *   preco_antigo   → "24.90"                       (preço riscado / promoção)
 *   esgotado       → "true"                        (mostra "Esgotado")
 *
 * Variantes (tamanho, cor…): cada PREÇO do produto é uma variante. A opção
 * vem da metadata do preço (ex.: tamanho = "M") ou, se não houver, do
 * apelido do preço (nickname). Um produto com um só preço não tem escolha.
 *
 * Só entram produtos e preços ATIVOS, em EUR e de pagamento único.
 */

let cliente: Stripe | null = null;

export function stripe(): Stripe {
  if (!cliente) {
    const chave = process.env.STRIPE_SECRET_KEY;
    if (!chave) {
      throw new Error("Stripe não configurado: defina STRIPE_SECRET_KEY em .env.local e na Vercel.");
    }
    cliente = new Stripe(chave);
  }
  return cliente;
}

export type StripeStoreProduct = {
  product: Stripe.Product;
  prices: Stripe.Price[];
};

/** Todos os produtos ativos, cada um com os seus preços ativos. */
export async function getStoreProducts(): Promise<StripeStoreProduct[]> {
  const s = stripe();

  const [produtos, precos] = await Promise.all([
    s.products.list({ active: true, limit: 100 }).autoPagingToArray({ limit: 1000 }),
    s.prices.list({ active: true, limit: 100 }).autoPagingToArray({ limit: 5000 }),
  ]);

  const porProduto = new Map<string, Stripe.Price[]>();
  for (const preco of precos) {
    if (preco.currency !== "eur" || preco.type !== "one_time" || preco.unit_amount == null) continue;
    const id = typeof preco.product === "string" ? preco.product : preco.product.id;
    const lista = porProduto.get(id) ?? [];
    lista.push(preco);
    porProduto.set(id, lista);
  }

  return produtos
    .map((product) => {
      const prices = (porProduto.get(product.id) ?? []).sort((a, b) => {
        // O preço por omissão do produto primeiro; os outros do mais barato
        // para o mais caro.
        const def = typeof product.default_price === "string" ? product.default_price : product.default_price?.id;
        if (a.id === def) return -1;
        if (b.id === def) return 1;
        return (a.unit_amount ?? 0) - (b.unit_amount ?? 0);
      });
      return { product, prices };
    })
    .filter((p) => p.prices.length > 0);
}

/** Lê vários preços (com o produto) para montar o carrinho. Ignora os que já não existem. */
export async function getPrices(ids: string[]): Promise<Stripe.Price[]> {
  const s = stripe();
  const resultados = await Promise.all(
    ids.map((id) => s.prices.retrieve(id, { expand: ["product"] }).catch(() => null)),
  );
  return resultados.filter((p): p is NonNullable<typeof p> => {
    if (!p || !p.active || p.unit_amount == null || typeof p.product === "string") return false;
    const produto = p.product;
    return !("deleted" in produto && produto.deleted) && (produto as Stripe.Product).active;
  });
}
