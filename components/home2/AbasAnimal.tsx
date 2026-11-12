import { cn } from "@/lib/utils";

/** Botões Gato / Cão por cima das vitrines. */
export default function AbasAnimal({ abas, ativa, onMudar }: { abas: string[]; ativa: string; onMudar: (a: string) => void }) {
  return (
    <div role="tablist" className="mt-6 flex justify-center gap-3">
      {abas.map((a) => (
        <button
          key={a}
          type="button"
          role="tab"
          aria-selected={a === ativa}
          onClick={() => onMudar(a)}
          className={cn(
            "h-12 rounded-full px-7 text-lg font-bold transition-colors sm:text-xl",
            a === ativa ? "bg-blue text-white" : "bg-muted text-foreground hover:bg-blue-soft",
          )}
        >
          {a}
        </button>
      ))}
    </div>
  );
}
