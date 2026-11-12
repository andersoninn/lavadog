import ListaCheckbox from "@/components/store-page/ListaCheckbox";
import type { Product } from "@/lib/store-data";

type Props = {
  species: string[];
  products: Product[];
  selected: string[];
  onToggle: (species: string) => void;
};

export default function SpeciesFilter({
  species,
  products,
  selected,
  onToggle,
}: Props) {
  if (species.length === 0) return null;
  const opcoes = species.map((valor) => ({
    valor,
    total: products.filter((p) => p.species.includes(valor)).length,
  }));
  return (
    <ListaCheckbox
      opcoes={opcoes}
      selecionadas={selected}
      onAlternar={onToggle}
    />
  );
}
