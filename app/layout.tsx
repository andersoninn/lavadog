import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteJsonLd } from "@/components/seo/JsonLd";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  // Base para todas as URLs relativas abaixo (canonical, og:image, etc).
  // Sem isso o Next avisa no build e as imagens de preview saem quebradas.
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    // As outras páginas definem só `title: "Store"` e viram "Store | LavaDog Store".
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "shopping",

  // Canonical: diz ao Google qual é a URL "oficial" de cada página, evitando
  // que www/não-www e variações com query param contem como conteúdo duplicado.
  alternates: {
    canonical: "/",
    languages: { "pt-PT": "/" },
  },

  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — pet shop online em Portugal`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo.png",
  },

  // Preencher quando fizer a verificação no Google Search Console
  // (Search Console > Adicionar propriedade > tag HTML).
  // verification: { google: "COLE_AQUI_O_CODIGO" },
};

export const viewport: Viewport = {
  themeColor: "#f5bf5f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className={`${manrope.variable} h-full scroll-smooth antialiased`}>
      <head>
        {/* Conexão antecipada com o CDN da Shopify — as imagens dos produtos
            vêm de lá, então isso corta alguns ms do LCP na /store. */}
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <SiteJsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } window.scrollTo(0, 0);",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
