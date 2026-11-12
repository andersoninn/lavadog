import ListaCheckbox from "@/components/store-page/ListaCheckbox";
import type { Product } from "@/lib/store-data";

type Props = {
  brands: string[];
  products: Product[];
  selected: string[];
  onToggle: (brand: string) => void;
};

export default function BrandFilter({
  brands,
  products,
  selected,
  onToggle,
}: Props) {
  const opcoes = brands
    .map((valor) => ({
      valor,
      total: products.filter((p) => p.brand === valor).length,
    }))
    .sort((a, b) => b.total - a.total);
  return (
    <ListaCheckbox
      opcoes={opcoes}
      selecionadas={selected}
      onAlternar={onToggle}
      pesquisa="Buscar marca..."
      verMais="Ver mais marcas"
    />
  );
}
