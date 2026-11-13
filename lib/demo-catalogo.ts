import type { StripeStoreProduct } from "@/lib/stripe";

/**
 * 30 produtos fictícios para ver o visual da loja sem mexer no Stripe da
 * Carol. Só aparecem em /store?demo=1 (página sem indexação).
 */

type Base = [nome: string, marca: string, categoria: string, animal: string, precos: [string, number][], antigo?: number, extra?: Record<string, string>];

const RACOES: Base[] = [
  ["Royal Canin Adulto Médio", "Royal Canin", "Ração", "cão", [["15 kg", 71.9], ["4 kg", 24.9]], 89.9, { destaque: "mais vendido" }],
  ["Purina Pro Plan Adulto Raças Médias", "Purina Pro Plan", "Ração", "cão", [["15 kg", 72.17], ["3 kg", 21.5]], 84.9],
  ["Premier Fórmula Cães Adultos Frango e Arroz", "Premier", "Ração", "cão", [["15 kg", 58.32], ["2,5 kg", 16.9], ["1 kg", 6.9]], 72.9],
  ["Pedigree Adulto Sabor Carne", "Pedigree", "Ração", "cão", [["15 kg", 47.61], ["3 kg", 12.9]], 52.9],
  ["Hill's Science Diet Adulto", "Hill's", "Ração", "cão", [["12 kg", 79.9]]],
  ["Royal Canin Puppy Mini", "Royal Canin", "Ração", "cão", [["8 kg", 54.9], ["2 kg", 18.5]]],
  ["Purina One Gato Esterilizado", "Purina Pro Plan", "Ração", "gato", [["7,5 kg", 39.9], ["1,5 kg", 11.9]], 44.9],
  ["Whiskas Adulto Atum", "Whiskas", "Ração", "gato", [["7 kg", 26.9]], 29.9],
  ["Royal Canin Indoor Gato", "Royal Canin", "Ração", "gato", [["4 kg", 42.9], ["2 kg", 23.9]], undefined, { destaque: "mais vendido" }],
  ["Hill's Gato Sénior 7+", "Hill's", "Ração", "gato", [["3 kg", 36.5]], 41.9],
];

const OUTROS: Base[] = [
  ["Snack Dentastix Médio", "Pedigree", "Snacks", "cão", [["Pack 28", 9.9]], 11.9],
  ["Bifinhos de Frango Naturais", "Trixie", "Snacks", "cão", [["200 g", 4.5]]],
  ["Dreamies Mix Queijo", "Whiskas", "Snacks", "gato", [["180 g", 3.9]], 4.5],
  ["Ossos de Couro Prensado", "Trixie", "Snacks", "cão", [["Pack 10", 6.5]]],
  ["Bola Kong Classic", "Kong", "Brinquedos", "cão", [["M", 14.9], ["L", 17.9]]],
  ["Corda com Nós", "Trixie", "Brinquedos", "cão", [["Única", 7.9]], 9.9],
  ["Varinha com Penas", "Trixie", "Brinquedos", "gato", [["Única", 4.9]], 5.9],
  ["Arranhador Torre 3 Níveis", "Trixie", "Brinquedos", "gato", [["Única", 49.9]], 59.9],
  ["Champô Pelo Sensível", "Beaphar", "Higiene", "cão, gato", [["250 ml", 8.9]], 10.9],
  ["Toalhitas Higiénicas", "Beaphar", "Higiene", "cão, gato", [["Pack 100", 5.9]], 6.9],
  ["Areia Aglomerante Perfumada", "Catsan", "Higiene", "gato", [["10 L", 12.9]], 14.9],
  ["Escova Desembaraçadora", "Trixie", "Higiene", "cão, gato", [["Única", 9.5]]],
  ["Coleira Nylon Refletora", "Trixie", "Acessórios", "cão", [["S", 8.9], ["M", 9.9], ["L", 10.9]]],
  ["Trela Extensível 5 m", "Flexi", "Acessórios", "cão", [["Única", 24.9]]],
  ["Comedouro Inox Duplo", "Trixie", "Acessórios", "cão, gato", [["Única", 12.9]], 14.9],
  ["Transportadora Rígida", "Ferplast", "Acessórios", "gato", [["Única", 34.9]], 39.9],
  ["Cama Redonda Fofa", "Ferplast", "Camas", "cão, gato", [["M", 29.9], ["L", 39.9]]],
  ["Manta Polar Patinhas", "Trixie", "Camas", "cão, gato", [["Única", 14.9]]],
  ["Antiparasitário Pipetas", "Beaphar", "Saúde", "cão", [["Pack 3", 19.9]]],
  ["Suplemento Articulações", "Beaphar", "Saúde", "cão", [["60 comp.", 22.9]], 26.9],
];

export function catalogoDemo(): StripeStoreProduct[] {
  return [...RACOES, ...OUTROS].map(([nome, marca, categoria, animal, precos, antigo, extra], i) => {
    const id = `prod_demo_${String(i + 1).padStart(2, "0")}`;
    const opcao = categoria === "Ração" || categoria === "Snacks" ? "Peso" : "Tamanho";
    return {
      product: {
        id,
        name: nome,
        description: `${nome} – produto de demonstração para ver o visual da loja.`,
        images: [],
        metadata: { marca, categoria, animal, ...(antigo ? { preco_antigo: String(antigo) } : {}), ...extra },
        created: Math.floor(Date.now() / 1000) - i * 5 * 86400,
        default_price: `${id}_0`,
        active: true,
      },
      prices: precos.map(([valor, preco], j) => ({
        id: `${id}_${j}`,
        unit_amount: Math.round(preco * 100),
        nickname: precos.length > 1 || valor !== "Única" ? `${opcao}: ${valor}` : null,
        metadata: {},
        currency: "eur",
        type: "one_time",
        active: true,
      })),
    } as unknown as StripeStoreProduct;
  });
}
