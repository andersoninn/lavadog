"use client";

import * as React from "react";
import { Bird, Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { label: "Gatos", icon: Cat },
  { label: "Cães", icon: Dog },
  { label: "Peixes", icon: Fish },
  { label: "Aves", icon: Bird },
  { label: "Coelhos", icon: Rabbit },
  // { label: "Répteis", icon: Turtle },
];

export default function StoreCategories() {
  const [selected, setSelected] = React.useState("Cães");

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
        {categories.map(({ label, icon: Icon }) => {
          const active = selected === label;
          return (
            <button
              key={label}
              type="button"
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
