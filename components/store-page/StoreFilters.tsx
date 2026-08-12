import { Button } from "@/components/ui/button";
import FilterCard from "@/components/store-page/FilterCard";
import SearchFilter from "@/components/store-page/SearchFilter";
import CategoryFilter from "@/components/store-page/CategoryFilter";
import SpeciesFilter from "@/components/store-page/SpeciesFilter";
import BrandFilter from "@/components/store-page/BrandFilter";
import PriceFilter from "@/components/store-page/PriceFilter";
import RatingFilter from "@/components/store-page/RatingFilter";
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
  minRating: number;
  onMinRatingChange: (value: number) => void;
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
  minRating,
  onMinRatingChange,
  inStockOnly,
  onInStockChange,
  promoOnly,
  onPromoChange,
  onClear,
}: StoreFiltersProps) {
  return (
    <div className="space-y-4">
      <FilterCard title="Busca">
        <SearchFilter value={search} onChange={onSearchChange} />
      </FilterCard>

      {species.length > 0 && (
        <FilterCard title="Espécie">
          <SpeciesFilter
            species={species}
            products={products}
            selected={selectedSpecies}
            onToggle={onToggleSpecies}
          />
        </FilterCard>
      )}

      <FilterCard title="Categorias">
        <CategoryFilter
          categories={categories}
          products={products}
          selected={selectedCategories}
          onToggle={onToggleCategory}
        />
      </FilterCard>

      <FilterCard title="Faixa de Preço">
        <PriceFilter priceBounds={priceBounds} value={maxPrice} onChange={onMaxPriceChange} />
      </FilterCard>

      <FilterCard title="Marcas">
        <BrandFilter brands={brands} selected={selectedBrands} onToggle={onToggleBrand} />
      </FilterCard>

      <FilterCard title="Disponibilidade">
        <AvailabilityFilter
          inStockOnly={inStockOnly}
          onInStockChange={onInStockChange}
          promoOnly={promoOnly}
          onPromoChange={onPromoChange}
        />
      </FilterCard>

      <FilterCard title="Avaliação">
        <RatingFilter value={minRating} onChange={onMinRatingChange} />
      </FilterCard>

      <Button variant="outline" className="w-full" onClick={onClear}>
        Limpar Filtros
      </Button>
    </div>
  );
}
