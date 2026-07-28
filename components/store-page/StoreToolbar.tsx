import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import SearchFilter from "@/components/store-page/SearchFilter";
import { sortOptions, type SortOption } from "@/lib/store-data";
import { cn } from "@/lib/utils";

export type StoreToolbarProps = {
  showingFrom: number;
  showingTo: number;
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  view: "grid" | "list";
  onViewChange: (value: "grid" | "list") => void;
  onOpenFilters: () => void;
};

export default function StoreToolbar({
  showingFrom,
  showingTo,
  total,
  search,
  onSearchChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  onOpenFilters,
}: StoreToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-center md:justify-between md:gap-6">
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={onOpenFilters}
          className="flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground"
        >
          <SlidersHorizontal className="size-4" />
          Filtros
        </button>
        <div className="flex-1 md:hidden">
          <SearchFilter value={search} onChange={onSearchChange} />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Mostrando {showingFrom}–{showingTo} de {total} produtos
      </p>

      <div className="hidden max-w-sm flex-1 md:block">
        <SearchFilter value={search} onChange={onSearchChange} />
      </div>

      <div className="flex items-center gap-2">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="h-10 rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1 rounded-full border border-border p-1">
          <button
            type="button"
            aria-label="Ver em grade"
            aria-pressed={view === "grid"}
            onClick={() => onViewChange("grid")}
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-colors",
              view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Ver em lista"
            aria-pressed={view === "list"}
            onClick={() => onViewChange("list")}
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-colors",
              view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <List className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
