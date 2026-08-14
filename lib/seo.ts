/**
 * Configuração central de SEO.
 *
 * Tudo que depende do domínio (canonical, sitemap, robots, Open Graph, JSON-LD)
 * lê daqui. Se o domínio mudar, muda só neste arquivo — ou, melhor ainda,
 * define a env `NEXT_PUBLIC_SITE_URL` na Vercel e nem precisa mexer no código.
 */

const FALLBACK_SITE_URL = "https://www.lavadogstore.com";

/** URL absoluta do site, sem barra no final. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/+$/, "");

export const SITE_NAME = "LavaDog Store";

export const SITE_TAGLINE = "Mais que um pet shop, um lugar de amor e cuidado";

/**
 * Título usado na home e como sufixo das outras páginas.
 * Regra prática: até ~60 caracteres, marca + palavra-chave principal.
 */
export const SITE_TITLE = `${SITE_NAME} | Pet Shop Online em Portugal`;

/**
 * Descrição usada como meta description padrão.
 * Regra prática: 140–160 caracteres, com as palavras que o cliente digitaria no Google.
 */
export const SITE_DESCRIPTION =
  "Pet shop online em Portugal: rações, brinquedos, higiene e acessórios para cães, gatos, aves, peixes e coelhos. Produtos premium com entrega rápida.";

export const SITE_LOCALE = "pt_PT";

/** Palavras-chave principais. O Google ignora a meta keywords, mas outros buscadores e o llms.txt usam. */
export const SITE_KEYWORDS = [
  "pet shop online",
  "pet shop Portugal",
  "loja para animais",
  "ração para cães",
  "ração para gatos",
  "brinquedos para pets",
  "acessórios para animais",
  "higiene animal",
  "LavaDog",
  "LavaDog Store",
];

/** Imagem usada nas prévias de link (WhatsApp, Facebook, X, LinkedIn). Ideal: 1200x630. */
export const OG_IMAGE = "/images/bannerDesktop1.png";

/** Monta uma URL absoluta a partir de um caminho relativo. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
