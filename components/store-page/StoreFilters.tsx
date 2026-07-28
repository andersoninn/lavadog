import { Button } from "@/components/ui/button";
import FilterCard from "@/components/store-page/FilterCard";
import SearchFilter from "@/components/store-page/SearchFilter";
import CategoryFilter from "@/components/store-page/CategoryFilter";
import BrandFilter from "@/components/store-page/BrandFilter";
import PriceFilter from "@/components/store-page/PriceFilter";
import RatingFilter from "@/components/store-page/RatingFilter";
import AvailabilityFilter from "@/components/store-page/AvailabilityFilter";

export type StoreFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
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
  search,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
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

      <FilterCard title="Categorias">
        <CategoryFilter selected={selectedCategories} onToggle={onToggleCategory} />
      </FilterCard>

      <FilterCard title="Faixa de Preço">
        <PriceFilter value={maxPrice} onChange={onMaxPriceChange} />
      </FilterCard>

      <FilterCard title="Marcas">
        <BrandFilter selected={selectedBrands} onToggle={onToggleBrand} />
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
