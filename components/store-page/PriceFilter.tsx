import { formatPrice } from "@/lib/store-data";

export default function PriceFilter({
  priceBounds,
  value,
  onChange,
}: {
  priceBounds: { min: number; max: number };
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <input
        type="range"
        min={priceBounds.min}
        max={priceBounds.max}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
        aria-label="Preço máximo"
      />
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatPrice(priceBounds.min)}</span>
        <span className="font-semibold text-foreground">até {formatPrice(value)}</span>
      </div>
    </div>
  );
}
