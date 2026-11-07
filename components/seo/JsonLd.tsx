import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  OG_IMAGE,
} from "@/lib/seo";
import { INSTAGRAM_HREF, WHATSAPP_HREF } from "@/lib/constants";

/**
 * Dados estruturados (JSON-LD / schema.org).
 *
 * É o que permite ao Google mostrar rich results — logo da marca, links de
 * sitelinks, caixa de pesquisa interna — em vez de só um link azul.
 *
 * Quando a loja tiver morada física, trocar "OnlineStore" por "PetStore" e
 * preencher `address` + `geo`: é isso que faz aparecer no Google Maps e nas
 * buscas do tipo "petshop perto de mim".
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "LavaDog",
  url: SITE_URL,
  logo: absoluteUrl("/images/logo.png"),
  image: absoluteUrl(OG_IMAGE),
  description: SITE_DESCRIPTION,
  currenciesAccepted: "EUR",
  areaServed: {
    "@type": "Country",
    name: "Portugal",
  },
  sameAs: [INSTAGRAM_HREF],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+351926777360",
      url: WHATSAPP_HREF,
      availableLanguage: ["Portuguese"],
      areaServed: "PT",
    },
  ],
  // TODO: quando houver loja física, descomentar e preencher:
  // address: {
  //   "@type": "PostalAddress",
  //   streetAddress: "",
  //   addressLocality: "",
  //   postalCode: "",
  //   addressCountry: "PT",
  // },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "pt-PT",
  publisher: { "@id": `${SITE_URL}/#organization` },
  // Nota: não declaramos `potentialAction: SearchAction` porque a busca da
  // /store hoje é só estado no cliente — não existe URL do tipo
  // `/store?busca=racao`. Declarar um endpoint que não funciona faz o Google
  // marcar o schema como inválido. Assim que a busca virar query param,
  // é só adicionar aqui.
};

function Schema({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" escapado: um texto com "</script>" não consegue sair do bloco.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Dados estruturados globais — renderizado uma vez no layout raiz. */
export function SiteJsonLd() {
  return (
    <>
      <Schema data={organizationSchema} />
      <Schema data={websiteSchema} />
    </>
  );
}

/** Breadcrumb de uma página interna. Ajuda o Google a montar a trilha no resultado. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <Schema
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

/** Produto: preço, disponibilidade e imagens para o Google (rich results). */
export function ProductJsonLd({
  produto,
}: {
  produto: { name: string; slug: string; description: string | null; images: string[]; brand: string; price: number; inStock: boolean };
}) {
  return (
    <Schema
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: produto.name,
        description: produto.description ?? undefined,
        image: produto.images.length ? produto.images : undefined,
        brand: produto.brand !== "Sem marca" ? { "@type": "Brand", name: produto.brand } : undefined,
        offers: {
          "@type": "Offer",
          url: absoluteUrl(`/produto/${produto.slug}`),
          priceCurrency: "EUR",
          price: produto.price.toFixed(2),
          availability: produto.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          seller: { "@id": `${SITE_URL}/#organization` },
        },
      }}
    />
  );
}
