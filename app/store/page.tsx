import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StorePageContent from "@/components/store-page/StorePageContent";
import { getStoreProducts } from "@/lib/shopify";
import { mapShopifyProducts, type SortOption, type StoreCatalog } from "@/lib/store-data";
import { getCurrentCart } from "@/lib/cart-actions";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  // O sufixo "| LavaDog Store" vem do template definido em app/layout.tsx.
  title: "Store",
  description:
    "Catálogo completo da LavaDog Store: rações, brinquedos, higiene e acessórios para cães, gatos, aves, peixes e coelhos. Filtre por categoria, marca e preço.",
  alternates: { canonical: "/store" },
  openGraph: {
    title: "Store | LavaDog Store",
    description:
      "Catálogo completo da LavaDog Store: rações, brinquedos, higiene e acessórios para o seu pet.",
    url: "/store",
    type: "website",
  },
};

const EMPTY_CATALOG: StoreCatalog = {
  products: [],
  categories: [],
  brands: [],
  species: [],
  priceBounds: { min: 0, max: 0 },
};

const VALID_SORT_OPTIONS: SortOption[] = [
  "recentes",
  "mais-vendidos",
  "preco-asc",
  "preco-desc",
  "nome",
];

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const initialCategory = typeof params.categoria === "string" ? params.categoria : undefined;
  const initialSpecies = typeof params.animal === "string" ? params.animal : undefined;
  const initialPromoOnly = params.promo === "true";
  const initialSort =
    typeof params.sort === "string" && VALID_SORT_OPTIONS.includes(params.sort as SortOption)
      ? (params.sort as SortOption)
      : undefined;

  let catalog = EMPTY_CATALOG;
  let loadError = false;

  try {
    const shopifyProducts = await getStoreProducts();
    catalog = mapShopifyProducts(shopifyProducts);
  } catch (error) {
    console.error("Falha ao buscar produtos da Shopify:", error);
    loadError = true;
  }

  const cart = await getCurrentCart().catch(() => null);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Store", path: "/store" },
        ]}
      />
      <Navbar cartCount={cart?.totalQuantity ?? 0} />
      <main className="flex-1">
        {loadError && (
          <p className="mx-auto mt-6 w-full max-w-7xl px-6 text-sm text-red-600 sm:px-10 lg:px-16">
            Não foi possível carregar o catálogo da loja agora. Tente novamente em instantes.
          </p>
        )}
        <StorePageContent
          key={`${initialCategory ?? ""}-${initialSpecies ?? ""}-${initialPromoOnly}-${initialSort ?? ""}`}
          catalog={catalog}
          initialCategory={initialCategory}
          initialSpecies={initialSpecies}
          initialPromoOnly={initialPromoOnly}
          initialSort={initialSort}
        />
      </main>
      <Footer />
    </>
  );
}
