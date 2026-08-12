"use client";

import * as React from "react";
import Link from "next/link";
import { Bird, Cat, Dog, Fish, PawPrint, Rabbit, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SPECIES_ICONS: Record<string, LucideIcon> = {
  Gatos: Cat,
  Cães: Dog,
  Peixes: Fish,
  Aves: Bird,
  Coelhos: Rabbit,
};

export default function StoreCategories({ species }: { species: string[] }) {
  const [selected, setSelected] = React.useState(species[0]);

  if (species.length === 0) return null;

  return (
    <div className="text-center">
      <span className="text-[10px] font-semibold tracking-wide text-primary-hover uppercase">
        Categorias
      </span>
      <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
        Escolha o amiguinho e
        <br />
        comece a comprar
      </h2>

      <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6">
        {species.map((label) => {
          const Icon = SPECIES_ICONS[label] ?? PawPrint;
          const active = selected === label;
          return (
            <Link
              key={label}
              href={`/store?animal=${encodeURIComponent(label)}`}
              aria-pressed={active}
              onClick={() => setSelected(label)}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={cn(
                  "flex size-14 items-center justify-center rounded-lg transition-colors sm:size-16",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary-soft text-foreground hover:bg-primary/30",
                )}
              >
                <Icon className="size-6" />
              </div>
              <span className="text-xs font-semibold text-foreground">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
