import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const RATING_OPTIONS = [4, 3, 2, 1];

export default function RatingFilter({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <ul className="space-y-2">
      {RATING_OPTIONS.map((rating) => {
        const active = value === rating;

        return (
          <li key={rating}>
            <button
              type="button"
              onClick={() => onChange(active ? 0 : rating)}
              aria-pressed={active}
              className={cn(
                "flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
                active ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn("size-3.5", i < rating ? "fill-primary text-primary" : "text-border")}
                  />
                ))}
              </div>
              <span>e acima</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
