import { Heart, RotateCcw, ShieldCheck, Store, Truck } from "lucide-react";

const ITENS = [
  {
    icone: Truck,
    titulo: "Entregas em todo Portugal",
    texto: "Continente e ilhas",
  },
  { icone: ShieldCheck, titulo: "Pagamento seguro", texto: "Pelo Stripe" },
  { icone: RotateCcw, titulo: "Devolução fácil", texto: "Até 14 dias" },
  { icone: Store, titulo: "Loja física", texto: "Na Trofa" },
  { icone: Heart, titulo: "Cuidado e bem-estar", texto: "Em primeiro lugar" },
];

/** Faixa de vantagens por baixo da navbar (como no wireframe). */
export default function FaixaBeneficios() {
  return (
    <div className="border-y border-border bg-primary-soft/60">
      <ul className="mx-auto flex w-full max-w-7xl gap-8 overflow-x-auto px-6 py-3.5 sm:px-10 lg:justify-between lg:px-16">
        {ITENS.map(({ icone: Icone, titulo, texto }) => (
          <li key={titulo} className="flex shrink-0 items-center gap-2.5">
            <Icone className="size-6 text-foreground" strokeWidth={1.5} />
            <span className="leading-tight">
              <span className="block text-sm font-bold text-foreground">
                {titulo}
              </span>
              <span className="block text-xs text-muted-foreground">
                {texto}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
