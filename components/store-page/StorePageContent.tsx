"use client";

import { useEffect, useMemo, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import StoreHeader from "@/components/store-page/StoreHeader";
import StoreToolbar from "@/components/store-page/StoreToolbar";
import StoreFilters from "@/components/store-page/StoreFilters";
import ProductGrid from "@/components/store-page/ProductGrid";
import StorePagination from "@/components/store-page/StorePagination";
import type { SortOption, StoreCatalog } from "@/lib/store-data";

const ITEMS_PER_PAGE = 12;

export default function StorePageContent({
  catalog,
  initialCategory,
  initialSpecies,
}: {
  catalog: StoreCatalog;
  initialCategory?: string;
  initialSpecies?: string;
}) {
  const { products, categories, species, brands, priceBounds } = catalog;
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>(
    initialSpecies ? [initialSpecies] : [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [promoOnly, setPromoOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("recentes");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      if (search && !product.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
      if (
        selectedSpecies.length > 0 &&
        !selectedSpecies.some((s) => product.species.includes(s))
      )
        return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
      if (product.price > maxPrice) return false;
      if (minRating > 0 && product.rating < minRating) return false;
      if (inStockOnly && !product.inStock) return false;
      if (promoOnly && !product.oldPrice) return false;
      return true;
    });

    switch (sort) {
      case "preco-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "preco-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "nome":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "pt-PT"));
      case "recentes":
        return [...filtered].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      case "mais-vendidos":
        // A lista já vem da Shopify ordenada por mais vendidos (sortKey:
        // BEST_SELLING), então só precisamos manter a ordem original.
        return filtered;
      default:
        return filtered;
    }
  }, [
    products,
    search,
    selectedCategories,
    selectedSpecies,
    selectedBrands,
    maxPrice,
    minRating,
    inStockOnly,
    promoOnly,
    sort,
  ]);

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategories, selectedSpecies, selectedBrands, maxPrice, minRating, inStockOnly, promoOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );
  const showingFrom = filteredProducts.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1;
  const showingTo = Math.min(safePage * ITEMS_PER_PAGE, filteredProducts.length);

  function toggleCategory(category: string) {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  }

  function toggleSpecies(speciesLabel: string) {
    setSelectedSpecies((prev) =>
      prev.includes(speciesLabel) ? prev.filter((s) => s !== speciesLabel) : [...prev, speciesLabel],
    );
  }

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  }

  function clearFilters() {
    setSearch("");
    setSelectedCategories([]);
    setSelectedSpecies([]);
    setSelectedBrands([]);
    setMaxPrice(priceBounds.max);
    setMinRating(0);
    setInStockOnly(false);
    setPromoOnly(false);
  }

  const filtersProps = {
    categories,
    species,
    brands,
    products,
    priceBounds,
    search,
    onSearchChange: setSearch,
    selectedCategories,
    onToggleCategory: toggleCategory,
    selectedSpecies,
    onToggleSpecies: toggleSpecies,
    selectedBrands,
    onToggleBrand: toggleBrand,
    maxPrice,
    onMaxPriceChange: setMaxPrice,
    minRating,
    onMinRatingChange: setMinRating,
    inStockOnly,
    onInStockChange: setInStockOnly,
    promoOnly,
    onPromoChange: setPromoOnly,
    onClear: clearFilters,
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
      <StoreHeader />

      <StoreToolbar
        showingFrom={showingFrom}
        showingTo={showingTo}
        total={filteredProducts.length}
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
        onOpenFilters={() => setMobileFiltersOpen(true)}
      />

      <div className="mt-6 flex gap-8 pb-24 lg:gap-10">
        <aside className="hidden w-[280px] shrink-0 lg:block">
          <div className="sticky top-28">
            <StoreFilters {...filtersProps} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <ProductGrid products={paginatedProducts} view={view} />
          <StorePagination currentPage={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>

      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="left" className="overflow-y-auto">
          <h2 className="text-lg font-bold text-foreground">Filtros</h2>
          <StoreFilters {...filtersProps} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
