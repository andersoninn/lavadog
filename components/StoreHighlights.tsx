import { ArrowRight } from "lucide-react";

export default function StoreHighlights() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="aspect-square rounded-lg bg-primary-soft sm:aspect-auto" />

      <div className="flex flex-col justify-center gap-3">
        <h3 className="text-xl font-bold text-foreground">Alimentação Premium</h3>
        <p className="text-sm text-muted-foreground">
          Nutrição completa e saborosa para o dia a dia do seu pet.
        </p>
        <a
          href="#store"
          className="inline-flex w-fit items-center gap-1 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Ver mais
          <ArrowRight className="size-4" />
        </a>
      </div>

      <div className="aspect-square rounded-lg bg-blue-soft sm:aspect-auto" />
      <div className="aspect-square rounded-lg bg-muted sm:aspect-auto" />
    </div>
  );
}
