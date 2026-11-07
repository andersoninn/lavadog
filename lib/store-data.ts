import type { StripeStoreProduct } from "@/lib/stripe";
import { opcoesDoPreco } from "@/lib/stripe-opcoes";
import { stockDoPreco } from "@/lib/stock";

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
  /** Endereço da página do produto: /produto/<slug>. */
  slug: string;
  name: string;
  description: string | null;
  images: string[];
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

// Categoria usada quando o produto ainda não tem a metadata "categoria" no
// painel do Stripe.
const FALLBACK_CATEGORY = "Outros";

const NEW_PRODUCT_WINDOW_DAYS = 30;

// Espécie do pet: vem da metadata "animal" do produto no Stripe, separada por
// vírgulas (ex: "cão, gato"). Cada valor passa por aqui como uma "tag":
// 1) palavras conhecidas (cão, gato, peixe…) viram as espécies de sempre;
// 2) qualquer outra palavra (ex: "hamster") vira uma espécie nova sozinha,
//    sem precisar mexer em código.
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

  for (const raw of normalizedTags) {
    const tag = raw.startsWith("animal:") ? raw.slice("animal:".length).trim() : raw;
    if (!tag) continue;
    const conhecida = SPECIES_KEYWORDS.find(({ keywords }) => keywords.some((k) => tag.includes(k)));
    if (conhecida) speciesSet.add(conhecida.label);
    else speciesSet.add(tag.split(/\s+/).map(capitalize).join(" "));
  }

  return Array.from(speciesSet);
}

/** "Ração Premium Cão 3kg" → "racao-premium-cao-3kg" */
export function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export type StoreCatalog = {
  products: Product[];
  categories: string[];
  brands: string[];
  species: string[];
  priceBounds: { min: number; max: number };
};

/**
 * Converte os produtos do Stripe pro formato que o resto do site
 * (ProductCard, filtros, etc.) já sabe renderizar. Categorias, marcas e
 * espécies saem da metadata de cada produto, então qualquer categoria nova
 * criada no painel aparece aqui sozinha — sem mexer em código.
 */
export function mapStripeProducts(stripeProducts: StripeStoreProduct[]): StoreCatalog {
  const categorySet = new Set<string>();
  const brandSet = new Set<string>();
  const speciesSet = new Set<string>();

  const products: Product[] = stripeProducts.map(({ product: sp, prices }) => {
    const meta = sp.metadata ?? {};

    const category = meta.categoria?.trim() || FALLBACK_CATEGORY;
    categorySet.add(category);

    const brand = meta.marca?.trim() || "Sem marca";
    brandSet.add(brand);

    const species = deriveSpecies((meta.animal ?? "").split(","));
    species.forEach((label) => speciesSet.add(label));

    const esgotado = meta.esgotado?.trim().toLowerCase() === "true";

    const variants: ProductVariant[] = prices.map((pr) => ({
      id: pr.id,
      title: pr.nickname ?? sp.name,
      availableForSale:
        !esgotado &&
        pr.metadata?.esgotado?.trim().toLowerCase() !== "true" &&
        stockDoPreco(pr, sp).valor !== 0,
      price: (pr.unit_amount ?? 0) / 100,
      selectedOptions: opcoesDoPreco(pr),
    }));

    const price = Math.min(...variants.map((v) => v.price));
    const compareAt = Number(String(meta.preco_antigo ?? "").replace(",", "."));
    const oldPrice = compareAt && compareAt > price ? compareAt : undefined;

    const createdAt = new Date(sp.created * 1000).toISOString();
    const isNew = Date.now() - sp.created * 1000 < NEW_PRODUCT_WINDOW_DAYS * 24 * 60 * 60 * 1000;
    const badge: ProductBadge | undefined = oldPrice ? "promocao" : isNew ? "novo" : undefined;

    // Opções (Tamanho: P, M, G…) juntadas a partir das variantes.
    const optionMap = new Map<string, string[]>();
    for (const v of variants) {
      for (const o of v.selectedOptions) {
        const values = optionMap.get(o.name) ?? [];
        if (!values.includes(o.value)) values.push(o.value);
        optionMap.set(o.name, values);
      }
    }
    const options: ProductOption[] = Array.from(optionMap, ([name, values]) => ({ name, values }));

    return {
      id: sp.id,
      // A Carol pode fixar o endereço com a metadata "slug"; senão vem do nome.
      slug: slugify(meta.slug?.trim() || sp.name) || sp.id,
      name: sp.name,
      description: sp.description ?? null,
      images: sp.images ?? [],
      category,
      brand,
      price,
      oldPrice,
      rating: 0,
      reviewsCount: 0,
      badge,
      inStock: !esgotado && variants.some((v) => v.availableForSale),
      image: sp.images?.[0] ?? null,
      createdAt,
      species,
      variantId: variants[0]?.id ?? null,
      hasVariants: variants.length > 1,
      variants,
      options,
    };
  });

  // Dois produtos com o mesmo nome: o segundo leva o fim do id no endereço.
  const usados = new Set<string>();
  for (const p of products) {
    if (usados.has(p.slug)) p.slug = `${p.slug}-${p.id.slice(-6).toLowerCase()}`;
    usados.add(p.slug);
  }

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
