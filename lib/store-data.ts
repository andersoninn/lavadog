import type { ShopifyStoreProduct } from "@/lib/shopify";

export type ProductBadge = "novo" | "promocao" | "mais-vendido";

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: number;
  selectedOptions: { name: string; value: string }[];
};

export type ProductOption = {
  name: string;
  values: string[];
};

export type Product = {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: ProductBadge;
  inStock: boolean;
  image: string | null;
  createdAt: string;
  species: string[];
  /** Único id de variante quando o produto não tem escolha real (tamanho, cor, etc). */
  variantId: string | null;
  /** true quando o produto tem mais de uma variante — precisa abrir o seletor antes de adicionar ao carrinho. */
  hasVariants: boolean;
  variants: ProductVariant[];
  options: ProductOption[];
};

// Coleção "vitrine" que a Shopify cria automaticamente pra loja online —
// não é uma categoria de verdade, então ignoramos ela na hora de mapear.
const IGNORED_COLLECTION_HANDLES = new Set(["frontpage"]);

// Categoria usada quando um produto ainda não foi colocado em nenhuma
// coleção real no admin da Shopify.
const FALLBACK_CATEGORY = "Outros";

const NEW_PRODUCT_WINDOW_DAYS = 30;

// Espécie do pet é derivada das tags do produto no Shopify. Duas formas:
// 1) tag no formato "animal:nome" (ex: "animal:hamster") — o que vier depois
//    dos dois-pontos vira categoria automaticamente, sem precisar mexer em
//    código. É a forma recomendada pra cliente marcar espécies novas.
// 2) palavras-chave já usadas nos produtos que ela importou (ex: tag solta
//    "cão") — mantidas por compatibilidade com o que já está cadastrado.
const SPECIES_KEYWORDS: { label: string; keywords: string[] }[] = [
  { label: "Cães", keywords: ["cão", "cao", "cachorro", "dog"] },
  { label: "Gatos", keywords: ["gato", "felino", "cat"] },
  { label: "Peixes", keywords: ["peixe", "aquário", "aquario", "fish"] },
  { label: "Aves", keywords: ["ave", "pássaro", "passaro", "bird"] },
  { label: "Coelhos", keywords: ["coelho", "rabbit"] },
];

const KNOWN_SPECIES_LABELS = SPECIES_KEYWORDS.map(({ label }) => label);

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function deriveSpecies(tags: string[]): string[] {
  const normalizedTags = tags.map((tag) => tag.trim().toLowerCase());
  const speciesSet = new Set<string>();

  // 1) tags explícitas "animal:xxx"
  for (const tag of normalizedTags) {
    if (tag.startsWith("animal:")) {
      const value = tag.slice("animal:".length).trim();
      if (value) speciesSet.add(value.split(/\s+/).map(capitalize).join(" "));
    }
  }

  // 2) palavras-chave conhecidas em tags soltas
  for (const { label, keywords } of SPECIES_KEYWORDS) {
    if (keywords.some((keyword) => normalizedTags.some((tag) => tag.includes(keyword)))) {
      speciesSet.add(label);
    }
  }

  return Array.from(speciesSet);
}

export type StoreCatalog = {
  products: Product[];
  categories: string[];
  brands: string[];
  species: string[];
  priceBounds: { min: number; max: number };
};

/**
 * Converte os produtos vindos da Storefront API pro formato que o resto do
 * site (ProductCard, filtros, etc.) já sabe renderizar. As categorias e
 * marcas são derivadas dos dados reais (coleções e vendor), então qualquer
 * coleção nova criada na Shopify aparece automaticamente aqui — sem precisar
 * mexer em código.
 */
export function mapShopifyProducts(shopifyProducts: ShopifyStoreProduct[]): StoreCatalog {
  const categorySet = new Set<string>();
  const brandSet = new Set<string>();
  const speciesSet = new Set<string>();

  const products: Product[] = shopifyProducts.map((sp) => {
    const realCollections = sp.collections.edges
      .map((edge) => edge.node)
      .filter((collection) => !IGNORED_COLLECTION_HANDLES.has(collection.handle));

    const category = realCollections[0]?.title.trim() || FALLBACK_CATEGORY;
    categorySet.add(category);

    const brand = sp.vendor.trim() || "Sem marca";
    brandSet.add(brand);

    const species = deriveSpecies(sp.tags);
    species.forEach((label) => speciesSet.add(label));

    const price = Number(sp.priceRange.minVariantPrice.amount);
    const compareAtAmount = sp.compareAtPriceRange.minVariantPrice.amount;
    const compareAtPrice = compareAtAmount ? Number(compareAtAmount) : undefined;
    const oldPrice = compareAtPrice && compareAtPrice > price ? compareAtPrice : undefined;

    const isNew =
      Date.now() - new Date(sp.createdAt).getTime() <
      NEW_PRODUCT_WINDOW_DAYS * 24 * 60 * 60 * 1000;
    const badge: ProductBadge | undefined = oldPrice ? "promocao" : isNew ? "novo" : undefined;

    const variants: ProductVariant[] = sp.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      availableForSale: edge.node.availableForSale,
      price: Number(edge.node.price.amount),
      selectedOptions: edge.node.selectedOptions,
    }));

    // A Shopify sempre cria pelo menos uma opção ("Title"/"Default Title")
    // mesmo em produtos sem variação real — por isso o critério de "tem
    // escolha de verdade" é ter mais de uma variante, não só ter `options`.
    const hasVariants = variants.length > 1;

    return {
      id: sp.id,
      name: sp.title,
      category,
      brand,
      price,
      oldPrice,
      rating: 0,
      reviewsCount: 0,
      badge,
      inStock: sp.availableForSale,
      image: sp.featuredImage?.url ?? null,
      createdAt: sp.createdAt,
      species,
      variantId: variants[0]?.id ?? null,
      hasVariants,
      variants,
      options: sp.options,
    };
  });

  const prices = products.map((p) => p.price).filter((p) => p > 0);

  // Espécies conhecidas (Cães, Gatos...) primeiro, na ordem de sempre;
  // qualquer espécie nova marcada via tag "animal:xxx" entra depois, em
  // ordem alfabética — assim a lista cresce sozinha conforme a cliente
  // cadastra produtos de bichos novos.
  const knownSpecies = KNOWN_SPECIES_LABELS.filter((label) => speciesSet.has(label));
  const extraSpecies = Array.from(speciesSet)
    .filter((label) => !KNOWN_SPECIES_LABELS.includes(label))
    .sort((a, b) => a.localeCompare(b, "pt-PT"));

  return {
    products,
    categories: Array.from(categorySet).sort((a, b) => a.localeCompare(b, "pt-PT")),
    brands: Array.from(brandSet).sort((a, b) => a.localeCompare(b, "pt-PT")),
    species: [...knownSpecies, ...extraSpecies],
    priceBounds: {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    },
  };
}

export type SortOption =
  | "recentes"
  | "mais-vendidos"
  | "preco-asc"
  | "preco-desc"
  | "nome";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recentes", label: "Mais recentes" },
  { value: "mais-vendidos", label: "Mais vendidos" },
  { value: "preco-asc", label: "Preço ↑" },
  { value: "preco-desc", label: "Preço ↓" },
  { value: "nome", label: "Nome" },
];

export function formatPrice(value: number) {
  return value.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}
