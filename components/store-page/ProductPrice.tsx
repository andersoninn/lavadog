import { formatPrice } from "@/lib/store-data";

export default function ProductPrice({
  price,
  oldPrice,
}: {
  price: number;
  oldPrice?: number;
}) {
  return (
    <p className="mt-1 flex items-baseline gap-1.5 text-sm">
      {oldPrice && (
        <span className="text-muted-foreground line-through">{formatPrice(oldPrice)}</span>
      )}
      <span className={oldPrice ? "font-bold text-foreground" : "font-semibold text-foreground"}>
        {formatPrice(price)}
      </span>
    </p>
  );
}
