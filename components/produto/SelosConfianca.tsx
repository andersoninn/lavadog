import { RotateCcw, ShieldCheck, Store, Truck } from "lucide-react";

const SELOS = [
  { icone: ShieldCheck, titulo: "Compra segura", texto: "Pagamento pelo Stripe" },
  { icone: RotateCcw, titulo: "Devolução fácil", texto: "Até 14 dias" },
  { icone: Truck, titulo: "Envio rápido", texto: "Para todo Portugal" },
  { icone: Store, titulo: "Loja física", texto: "Na Trofa" },
];

export default function SelosConfianca() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-3">
      {SELOS.map(({ icone: Icone, titulo, texto }) => (
        <li key={titulo} className="flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-soft">
            <Icone className="size-4 text-blue-strong" />
          </span>
          <span className="leading-tight whitespace-nowrap">
            <span className="block text-xs font-bold text-foreground">{titulo}</span>
            <span className="block text-[11px] text-muted-foreground">{texto}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
