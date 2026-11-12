import FilterCard from "@/components/store-page/FilterCard";
import SearchFilter from "@/components/store-page/SearchFilter";
import CategoryFilter from "@/components/store-page/CategoryFilter";
import SpeciesFilter from "@/components/store-page/SpeciesFilter";
import BrandFilter from "@/components/store-page/BrandFilter";
import PriceFilter from "@/components/store-page/PriceFilter";
import AvailabilityFilter from "@/components/store-page/AvailabilityFilter";

import type { Product } from "@/lib/store-data";

export type StoreFiltersProps = {
  categories: string[];
  species: string[];
  brands: string[];
  products: Product[];
  priceBounds: { min: number; max: number };
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  selectedSpecies: string[];
  onToggleSpecies: (species: string) => void;
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  promoOnly: boolean;
  onPromoChange: (value: boolean) => void;
  onClear: () => void;
};

export default function StoreFilters({
  categories,
  species,
  brands,
  products,
  priceBounds,
  search,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
  selectedSpecies,
  onToggleSpecies,
  selectedBrands,
  onToggleBrand,
  maxPrice,
  onMaxPriceChange,
  inStockOnly,
  onInStockChange,
  promoOnly,
  onPromoChange,
  onClear,
}: StoreFiltersProps) {
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          Filtrar resultados
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-blue-strong underline underline-offset-2"
        >
          Limpar
        </button>
      </div>

      <FilterCard title="Pesquisar">
        <SearchFilter value={search} onChange={onSearchChange} />
      </FilterCard>

      <FilterCard title="Marca">
        <BrandFilter
          brands={brands}
          products={products}
          selected={selectedBrands}
          onToggle={onToggleBrand}
        />
      </FilterCard>

      {species.length > 0 && (
        <FilterCard title="Animal">
          <SpeciesFilter
            species={species}
            products={products}
            selected={selectedSpecies}
            onToggle={onToggleSpecies}
          />
        </FilterCard>
      )}

      <FilterCard title="Categoria">
        <CategoryFilter
          categories={categories}
          products={products}
          selected={selectedCategories}
          onToggle={onToggleCategory}
        />
      </FilterCard>

      <FilterCard title="Preço">
        <PriceFilter
          priceBounds={priceBounds}
          value={maxPrice}
          onChange={onMaxPriceChange}
        />
      </FilterCard>

      <FilterCard title="Disponibilidade">
        <AvailabilityFilter
          inStockOnly={inStockOnly}
          onInStockChange={onInStockChange}
          promoOnly={promoOnly}
          onPromoChange={onPromoChange}
        />
      </FilterCard>
    </div>
  );
}
