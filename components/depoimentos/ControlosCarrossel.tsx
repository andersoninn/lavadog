import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const seta =
  "flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-primary";

type Props = { paginas: number; atual: number; onIr: (i: number) => void };

/** Setas e pontos do carrossel. */
export default function ControlosCarrossel({ paginas, atual, onIr }: Props) {
  if (paginas < 2) return null;
  const ir = onIr;
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => ir(atual - 1)}
        aria-label="Depoimento anterior"
        className={seta}
      >
        <ChevronLeft className="size-5" />
      </button>
      <div className="flex gap-1.5" role="tablist" aria-label="Depoimentos">
        {Array.from({ length: paginas }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === atual}
            aria-label={`Ir para o depoimento ${i + 1}`}
            onClick={() => ir(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              i === atual
                ? "w-7 bg-primary"
                : "w-2 bg-foreground/20 hover:bg-foreground/40",
            )}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => ir(atual + 1)}
        aria-label="Próximo depoimento"
        className={seta}
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
