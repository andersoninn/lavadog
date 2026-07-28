export type ProductBadge = "novo" | "promocao" | "mais-vendido";

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
  image: string;
};

export const categories = [
  "Brinquedos",
  "Ração",
  "Acessórios",
  "Higiene & Banho",
  "Camas & Conforto",
  "Saúde",
] as const;

export const brands = [
  "LavaDog",
  "PetLove",
  "Vitalcan",
  "Golden",
  "Premier",
  "Furmax",
] as const;

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
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const swatches = ["bg-primary-soft", "bg-blue-soft", "bg-muted"];

function swatch(index: number) {
  return swatches[index % swatches.length];
}

export const products: Product[] = [
  { id: "p1", name: "Coleira Estampada para Cães", category: "Acessórios", brand: "LavaDog", price: 90, rating: 4, reviewsCount: 32, inStock: true, image: swatch(0) },
  { id: "p2", name: "Kit Acessórios para Gatos", category: "Acessórios", brand: "PetLove", price: 120, oldPrice: 150, rating: 4, reviewsCount: 18, badge: "promocao", inStock: true, image: swatch(1) },
  { id: "p3", name: "Escova Removedora de Pelos", category: "Higiene & Banho", brand: "Furmax", price: 60, rating: 5, reviewsCount: 54, badge: "mais-vendido", inStock: true, image: swatch(2) },
  { id: "p4", name: "Kit de Ossinhos Naturais", category: "Brinquedos", brand: "LavaDog", price: 90, rating: 5, reviewsCount: 41, inStock: true, image: swatch(0) },
  { id: "p5", name: "Brinquedo Mordedor Resistente", category: "Brinquedos", brand: "Golden", price: 45, rating: 4, reviewsCount: 27, badge: "novo", inStock: true, image: swatch(1) },
  { id: "p6", name: "Arranhador Torre para Gatos", category: "Acessórios", brand: "PetLove", price: 220, oldPrice: 260, rating: 5, reviewsCount: 12, badge: "promocao", inStock: false, image: swatch(2) },
  { id: "p7", name: "Cama Pet Confort Ortopédica", category: "Camas & Conforto", brand: "Premier", price: 190, rating: 4, reviewsCount: 65, inStock: true, image: swatch(0) },
  { id: "p8", name: "Ração Premium Adulto 10kg", category: "Ração", brand: "Vitalcan", price: 180, rating: 5, reviewsCount: 88, badge: "mais-vendido", inStock: true, image: swatch(1) },
  { id: "p9", name: "Shampoo Neutro Hipoalergênico", category: "Higiene & Banho", brand: "Furmax", price: 55, rating: 4, reviewsCount: 21, inStock: true, image: swatch(2) },
  { id: "p10", name: "Comedouro Duplo em Inox", category: "Acessórios", brand: "Golden", price: 70, rating: 3, reviewsCount: 9, inStock: true, image: swatch(0) },
  { id: "p11", name: "Guia Retrátil 5 Metros", category: "Acessórios", brand: "LavaDog", price: 95, oldPrice: 115, rating: 4, reviewsCount: 37, badge: "promocao", inStock: true, image: swatch(1) },
  { id: "p12", name: "Roupinha de Inverno para Cães", category: "Acessórios", brand: "PetLove", price: 85, rating: 5, reviewsCount: 16, badge: "novo", inStock: true, image: swatch(2) },
  { id: "p13", name: "Ração Filhotes Frango 3kg", category: "Ração", brand: "Vitalcan", price: 75, rating: 5, reviewsCount: 44, inStock: true, image: swatch(0) },
  { id: "p14", name: "Bola Interativa com Dispenser", category: "Brinquedos", brand: "Golden", price: 65, rating: 4, reviewsCount: 23, badge: "novo", inStock: true, image: swatch(1) },
  { id: "p15", name: "Caminha Redonda Pelúcia", category: "Camas & Conforto", brand: "Premier", price: 140, rating: 4, reviewsCount: 31, inStock: false, image: swatch(2) },
  { id: "p16", name: "Suplemento Vitamínico Pet", category: "Saúde", brand: "Vitalcan", price: 50, rating: 4, reviewsCount: 19, inStock: true, image: swatch(0) },
  { id: "p17", name: "Antipulgas e Carrapatos", category: "Saúde", brand: "Furmax", price: 68, rating: 5, reviewsCount: 72, badge: "mais-vendido", inStock: true, image: swatch(1) },
  { id: "p18", name: "Escova de Dentes Pet", category: "Higiene & Banho", brand: "PetLove", price: 28, rating: 3, reviewsCount: 8, inStock: true, image: swatch(2) },
  { id: "p19", name: "Corda de Nós para Cães", category: "Brinquedos", brand: "LavaDog", price: 35, rating: 4, reviewsCount: 29, inStock: true, image: swatch(0) },
  { id: "p20", name: "Casinha de Madeira Média", category: "Camas & Conforto", brand: "Premier", price: 320, oldPrice: 380, rating: 5, reviewsCount: 14, badge: "promocao", inStock: true, image: swatch(1) },
  { id: "p21", name: "Petisco Natural Desidratado", category: "Ração", brand: "Golden", price: 42, rating: 4, reviewsCount: 33, badge: "novo", inStock: true, image: swatch(2) },
  { id: "p22", name: "Bebedouro Fonte Automático", category: "Acessórios", brand: "Furmax", price: 165, rating: 5, reviewsCount: 47, inStock: true, image: swatch(0) },
  { id: "p23", name: "Tapete Higiênico Ultra Absorvente", category: "Higiene & Banho", brand: "Vitalcan", price: 58, rating: 4, reviewsCount: 61, inStock: true, image: swatch(1) },
  { id: "p24", name: "Transportadora de Viagem M", category: "Acessórios", brand: "Premier", price: 210, rating: 4, reviewsCount: 22, inStock: false, image: swatch(2) },
];

export const priceBounds = {
  min: Math.min(...products.map((product) => product.price)),
  max: Math.max(...products.map((product) => product.price)),
};
