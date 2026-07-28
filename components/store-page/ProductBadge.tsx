import { cn } from "@/lib/utils";
import type { ProductBadge as ProductBadgeType } from "@/lib/store-data";

const BADGE_STYLES: Record<ProductBadgeType, { label: string; className: string }> = {
  novo: { label: "Novo", className: "bg-blue-soft text-blue-strong" },
  promocao: { label: "Promoção", className: "bg-foreground text-background" },
  "mais-vendido": { label: "Mais Vendido", className: "bg-primary text-primary-foreground" },
};

export default function ProductBadge({ badge }: { badge: ProductBadgeType }) {
  const { label, className } = BADGE_STYLES[badge];

  return (
    <span
      className={cn(
        "absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase",
        className,
      )}
    >
      {label}
    </span>
  );
}
