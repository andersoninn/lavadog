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

/** "Mostrando 1–12 de 30 produtos" · Ordenar por · grelha/lista (no telemóvel: Filtros + pesquisa). */
export default function StoreToolbar(props: StoreToolbarProps) {
  const {
    showingFrom,
    showingTo,
    total,
    sort,
    onSortChange,
    view,
    onViewChange,
  } = props;
  const vista = (ativa: boolean) =>
    cn(
      "flex size-10 items-center justify-center rounded-md border transition-colors",
      ativa
        ? "border-primary bg-primary text-foreground"
        : "border-border bg-card text-muted-foreground hover:text-foreground",
    );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={props.onOpenFilters}
          className="flex h-10 shrink-0 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-semibold text-foreground"
        >
          <SlidersHorizontal className="size-4" /> Filtros
        </button>
        <div className="flex-1">
          <SearchFilter value={props.search} onChange={props.onSearchChange} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Mostrando {showingFrom}–{showingTo} de {total} produtos
        </p>
        <div className="flex items-center gap-2">
          <label
            className="hidden text-sm text-foreground sm:block"
            htmlFor="ordenar"
          >
            Ordenar por:
          </label>
          <select
            id="ordenar"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="h-10 rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-primary"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            aria-label="Ver em grelha"
            aria-pressed={view === "grid"}
            onClick={() => onViewChange("grid")}
            className={vista(view === "grid")}
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Ver em lista"
            aria-pressed={view === "list"}
            onClick={() => onViewChange("list")}
            className={vista(view === "list")}
          >
            <List className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
