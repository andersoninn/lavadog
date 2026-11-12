import ListaCheckbox from "@/components/store-page/ListaCheckbox";
import type { Product } from "@/lib/store-data";

type Props = {
  categories: string[];
  products: Product[];
  selected: string[];
  onToggle: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  products,
  selected,
  onToggle,
}: Props) {
  const opcoes = categories.map((valor) => ({
    valor,
    total: products.filter((p) => p.category === valor).length,
  }));
  return (
    <ListaCheckbox
      opcoes={opcoes}
      selecionadas={selected}
      onAlternar={onToggle}
      visiveis={6}
      verMais="Ver mais categorias"
    />
  );
}
