import type { Product } from "@/lib/store-data";
import type { PorAnimal } from "./VitrineAnimal";

const MAXIMO = 10;
const ESPECIES = { Gato: "Gatos", Cão: "Cães" } as const;

function porEspecie(produtos: Product[], ordenar: (a: Product, b: Product) => number): PorAnimal {
  const out: PorAnimal = {};
  for (const [aba, especie] of Object.entries(ESPECIES)) {
    out[aba] = produtos.filter((p) => p.inStock && p.species.includes(especie)).sort(ordenar).slice(0, MAXIMO);
  }
  return out;
}

const desconto = (p: Product) => (p.oldPrice ? 1 - p.price / p.oldPrice : 0);

/** "As nossas sugestões": mais vendidos primeiro, depois os mais recentes. */
export const sugestoes = (produtos: Product[]) =>
  porEspecie(produtos, (a, b) =>
    Number(b.badge === "mais-vendido") - Number(a.badge === "mais-vendido") || b.createdAt.localeCompare(a.createdAt),
  );

/** "Produtos imperdíveis": só com preço antigo, maior desconto primeiro. */
export const imperdiveis = (produtos: Product[]) =>
  porEspecie(produtos.filter((p) => p.oldPrice), (a, b) => desconto(b) - desconto(a));
