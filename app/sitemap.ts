import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getStoreProducts } from "@/lib/stripe";
import { mapStripeProducts } from "@/lib/store-data";

/**
 * Gera o /sitemap.xml automaticamente (padrão nativo do Next.js App Router).
 *
 * As rotas fixas entram sempre. As páginas de categoria e de espécie são lidas
 * do catálogo real no Stripe, então quando a cliente cria uma categoria nova
 * ela aparece no sitemap sozinha — sem ninguém precisar editar código.
 *
 * Revalida de hora em hora.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL, // igual ao canonical da home, sem barra no fim
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/store`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...["/termos", "/privacidade", "/devolucoes", "/envios"].map((rota) => ({
      url: `${SITE_URL}${rota}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  try {
    const catalog = mapStripeProducts(await getStoreProducts());

    const categoryRoutes: MetadataRoute.Sitemap = catalog.categories.map((categoria) => ({
      url: `${SITE_URL}/store?categoria=${encodeURIComponent(categoria)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const speciesRoutes: MetadataRoute.Sitemap = catalog.species.map((animal) => ({
      url: `${SITE_URL}/store?animal=${encodeURIComponent(animal)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const productRoutes: MetadataRoute.Sitemap = catalog.products.map((produto) => ({
      url: `${SITE_URL}/produto/${produto.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: produto.images.slice(0, 1),
    }));

    return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...speciesRoutes];
  } catch (error) {
    // Se o Stripe estiver fora do ar, o sitemap ainda sai com as rotas fixas
    // em vez de quebrar o build.
    console.error("Sitemap: falha ao buscar catálogo no Stripe:", error);
    return staticRoutes;
  }
}
