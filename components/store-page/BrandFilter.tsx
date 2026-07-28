import { brands } from "@/lib/store-data";
import { cn } from "@/lib/utils";

export default function BrandFilter({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (brand: string) => void;
}) {
  return (
    <ul className="space-y-2">
      {brands.map((brand) => {
        const active = selected.includes(brand);

        return (
          <li key={brand}>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={active}
                onChange={() => onToggle(brand)}
                className="size-3.5 rounded border-border text-primary accent-primary"
              />
              <span
                className={cn(
                  "transition-colors",
                  active ? "font-semibold text-foreground" : "text-muted-foreground",
                )}
              >
                {brand}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
