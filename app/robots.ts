import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Gera o /robots.txt automaticamente (padrão nativo do Next.js App Router).
 *
 * Diz aos robôs o que podem rastrear e aponta o caminho do sitemap.
 * Não é um arquivo estático de propósito: assim o domínio vem sempre de
 * `lib/seo.ts` e nunca fica desatualizado.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/carrinho", // página pessoal, não tem valor de busca
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
