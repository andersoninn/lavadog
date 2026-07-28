import type { ReactNode } from "react";

export default function FilterCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl bg-card p-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
