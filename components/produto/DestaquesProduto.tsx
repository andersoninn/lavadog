import { HeartPulse, ShieldPlus, Sparkles } from "lucide-react";

const ICONES = [HeartPulse, Sparkles, ShieldPlus];

/** Cartões "Principais benefícios" do wireframe (metadata "destaques", até 3). */
export default function DestaquesProduto({ destaques }: { destaques: string[] }) {
  if (destaques.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-3">
      {destaques.map((d, i) => {
        const Icone = ICONES[i % ICONES.length];
        return (
          <div
            key={d}
            className="flex flex-col items-center gap-2 rounded-lg border border-border bg-primary-soft/60 px-3 py-4 text-center"
          >
            <Icone className="size-7 text-foreground" strokeWidth={1.5} />
            <span className="text-sm leading-tight font-semibold text-foreground">{d}</span>
          </div>
        );
      })}
    </div>
  );
}
