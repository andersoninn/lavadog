import { cn } from "@/lib/utils";

type Props = { paginas: number; atual: number; onIr: (i: number) => void };

/** Pontos do carrossel (o carrossel avança sozinho; os pontos deixam saltar). */
export default function ControlosCarrossel({ paginas, atual, onIr }: Props) {
  if (paginas < 2) return null;
  return (
    <div className="flex justify-center gap-1.5" role="tablist" aria-label="Depoimentos">
      {Array.from({ length: paginas }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === atual}
          aria-label={`Ir para o depoimento ${i + 1}`}
          onClick={() => onIr(i)}
          className={cn(
            "h-2 rounded-full transition-all duration-500",
            i === atual ? "w-7 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40",
          )}
        />
      ))}
    </div>
  );
}
