import type { Product } from "@/lib/store-data";
import { cn } from "@/lib/utils";

export default function SpeciesFilter({
  species,
  products,
  selected,
  onToggle,
}: {
  species: string[];
  products: Product[];
  selected: string[];
  onToggle: (species: string) => void;
}) {
  if (species.length === 0) return null;

  return (
    <ul className="space-y-2">
      {species.map((option) => {
        const count = products.filter((product) => product.species.includes(option)).length;
        const active = selected.includes(option);

        return (
          <li key={option}>
            <button
              type="button"
              onClick={() => onToggle(option)}
              aria-pressed={active}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
                active ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>{option}</span>
              <span className="text-xs text-muted-foreground">({count})</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
