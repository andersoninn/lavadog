"use client";

import { useEffect, useMemo, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import StoreHeader from "@/components/store-page/StoreHeader";
import StoreToolbar from "@/components/store-page/StoreToolbar";
import StoreFilters from "@/components/store-page/StoreFilters";
import ProductGrid from "@/components/store-page/ProductGrid";
import StorePagination from "@/components/store-page/StorePagination";
import type { SortOption, StoreCatalog } from "@/lib/store-data";
import type { Promocao } from "@/lib/promocoes";

const ITEMS_PER_PAGE = 12;

export default function StorePageContent({
  catalog,
  initialCategory,
  initialSpecies,
  initialPromoOnly,
  initialSort,
  initialSearch,
  promocao = null,
}: {
  catalog: StoreCatalog;
  promocao?: Promocao | null;
  initialCategory?: string;
  initialSpecies?: string;
  initialPromoOnly?: boolean;
  initialSort?: SortOption;
  initialSearch?: string;
}) {
  const { products, categories, species, brands, priceBounds } = catalog;
  const [search, setSearch] = useState(initialSearch ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  );
  // ?animal=outros → todas as espécies menos cães e gatos.
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>(() => {
    if (!initialSpecies) return [];
    if (initialSpecies.toLowerCase() === "outros")
      return species.filter((s) => s !== "Cães" && s !== "Gatos");
    return [initialSpecies];
  });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [promoOnly, setPromoOnly] = useState(initialPromoOnly ?? false);
  const [sort, setSort] = useState<SortOption>(initialSort ?? "recentes");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const termo = search.trim().toLowerCase();
      if (
        termo &&
        !`${product.name} ${product.brand} ${product.category}`
          .toLowerCase()
          .includes(termo)
      )
        return false;
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      )
        return false;
      if (
        selectedSpecies.length > 0 &&
        !selectedSpecies.some((s) => product.species.includes(s))
      )
        return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand))
        return false;
      if (product.price > maxPrice) return false;
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
        return [...filtered].sort((a, b) =>
          a.name.localeCompare(b.name, "pt-PT"),
        );
      case "recentes":
        return [...filtered].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      case "mais-vendidos":
        // O Stripe não conta vendas: primeiro os marcados com destaque
        // "mais vendido", depois os restantes na ordem em que chegam.
        return [...filtered].sort(
          (a, b) =>
            Number(b.badge === "mais-vendido") -
            Number(a.badge === "mais-vendido"),
        );
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
    inStockOnly,
    promoOnly,
    sort,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    search,
    selectedCategories,
    selectedSpecies,
    selectedBrands,
    maxPrice,
    inStockOnly,
    promoOnly,
    sort,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );
  const showingFrom =
    filteredProducts.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1;
  const showingTo = Math.min(
    safePage * ITEMS_PER_PAGE,
    filteredProducts.length,
  );

  function toggleCategory(category: string) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }

  function toggleSpecies(speciesLabel: string) {
    setSelectedSpecies((prev) =>
      prev.includes(speciesLabel)
        ? prev.filter((s) => s !== speciesLabel)
        : [...prev, speciesLabel],
    );
  }

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  }

  function clearFilters() {
    setSearch("");
    setSelectedCategories([]);
    setSelectedSpecies([]);
    setSelectedBrands([]);
    setMaxPrice(priceBounds.max);
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
    inStockOnly,
    onInStockChange: setInStockOnly,
    promoOnly,
    onPromoChange: setPromoOnly,
    onClear: clearFilters,
  };

  const categoriaUnica =
    selectedCategories.length === 1 ? selectedCategories[0] : null;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pt-6 sm:px-10 lg:px-16">
      <div className="flex gap-8 pb-24 lg:gap-10">
        <aside className="hidden w-[280px] shrink-0 lg:block">
          <div className="sticky top-28">
            <StoreFilters {...filtersProps} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <StoreHeader
            titulo={categoriaUnica ?? "Loja"}
            descricao={
              categoriaUnica
                ? `Os melhores produtos de ${categoriaUnica.toLowerCase()} para o seu pet, com entrega em todo Portugal.`
                : "Rações, snacks, brinquedos, higiene e acessórios para cães, gatos e outros animais."
            }
            categoria={categoriaUnica}
            promocao={promocao}
          />
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
          <div>
            <ProductGrid products={paginatedProducts} view={view} />
            <StorePagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="left" className="overflow-y-auto p-4">
          <StoreFilters {...filtersProps} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
