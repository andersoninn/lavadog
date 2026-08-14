import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getStoreProducts } from "@/lib/shopify";
import { mapShopifyProducts } from "@/lib/store-data";

/**
 * Gera o /sitemap.xml automaticamente (padrão nativo do Next.js App Router).
 *
 * As rotas fixas entram sempre. As páginas de categoria e de espécie são lidas
 * do catálogo real da Shopify, então quando a cliente cria uma categoria nova
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
  ];

  try {
    const catalog = mapShopifyProducts(await getStoreProducts());

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

    return [...staticRoutes, ...categoryRoutes, ...speciesRoutes];
  } catch (error) {
    // Se a Shopify estiver fora do ar, o sitemap ainda sai com as rotas fixas
    // em vez de quebrar o build.
    console.error("Sitemap: falha ao buscar catálogo da Shopify:", error);
    return staticRoutes;
  }
}
