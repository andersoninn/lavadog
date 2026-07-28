import { categories, products } from "@/lib/store-data";
import { cn } from "@/lib/utils";

export default function CategoryFilter({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (category: string) => void;
}) {
  return (
    <ul className="space-y-2">
      {categories.map((category) => {
        const count = products.filter((product) => product.category === category).length;
        const active = selected.includes(category);

        return (
          <li key={category}>
            <button
              type="button"
              onClick={() => onToggle(category)}
              aria-pressed={active}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
                active ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>{category}</span>
              <span className="text-xs text-muted-foreground">({count})</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
