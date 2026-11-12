import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/** Secção do painel de filtros, que abre e fecha (como no wireframe). */
export default function FilterCard({
  title,
  children,
  aberta = true,
}: {
  title: string;
  children: ReactNode;
  aberta?: boolean;
}) {
  return (
    <details
      open={aberta}
      className="group border-t border-border py-4 first:border-t-0 first:pt-0"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-foreground [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
