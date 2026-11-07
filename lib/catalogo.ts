import "server-only";
import { cache } from "react";
import { getStoreProducts } from "@/lib/stripe";
import { mapStripeProducts } from "@/lib/store-data";

/** O catálogo do Stripe, lido uma só vez por pedido (metadata + página). */
export const getCatalogo = cache(async () => mapStripeProducts(await getStoreProducts()));

export async function getProdutoPorSlug(slug: string) {
  const catalogo = await getCatalogo();
  return catalogo.products.find((p) => p.slug === slug) ?? null;
}
