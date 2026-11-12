import { RotateCcw, ShieldCheck, Store, TicketPercent, Truck } from "lucide-react";

const ITENS = [
  { icone: Truck, titulo: "Entrega em casa", texto: "Em todo Portugal" },
  { icone: Store, titulo: "Loja física", texto: "Na Trofa" },
  { icone: ShieldCheck, titulo: "Pagamento seguro", texto: "Cartão, MB WAY e Multibanco" },
  { icone: RotateCcw, titulo: "Devolução fácil", texto: "Até 14 dias" },
  { icone: TicketPercent, titulo: "Promoções", texto: "Exclusivas online" },
];

/** Faixa de vantagens logo por baixo do herói. */
export default function FaixaVantagens2() {
  return (
    <div className="border-b border-border bg-card">
      <ul className="mx-auto flex w-full max-w-7xl gap-8 overflow-x-auto px-6 py-5 sm:px-10 lg:justify-between lg:px-16">
        {ITENS.map(({ icone: Icone, titulo, texto }) => (
          <li key={titulo} className="flex shrink-0 items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-blue-soft text-blue-strong">
              <Icone className="size-5" strokeWidth={1.75} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-foreground sm:text-base">{titulo}</span>
              <span className="block text-xs text-muted-foreground sm:text-sm">{texto}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
