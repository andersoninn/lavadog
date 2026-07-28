export default function AvailabilityFilter({
  inStockOnly,
  onInStockChange,
  promoOnly,
  onPromoChange,
}: {
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  promoOnly: boolean;
  onPromoChange: (value: boolean) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockChange(e.target.checked)}
          className="size-3.5 rounded border-border accent-primary"
        />
        Apenas em estoque
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          checked={promoOnly}
          onChange={(e) => onPromoChange(e.target.checked)}
          className="size-3.5 rounded border-border accent-primary"
        />
        Apenas promoções
      </label>
    </div>
  );
}
