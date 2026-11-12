import { ShieldCheck, Star, Store, Truck, type LucideIcon } from "lucide-react";

type Item = { icone: LucideIcon; titulo: string; texto: string };

/** Barra por baixo dos depoimentos: nota (se houver Google) e garantias da loja. */
export default function BarraConfianca({
  nota,
  total,
}: {
  nota: number | null;
  total: number | null;
}) {
  const itens: Item[] = [
    ...(nota
      ? [
          {
            icone: Star,
            titulo: `${nota.toLocaleString("pt-PT")}/5`,
            texto: `${total ?? ""} avaliações no Google`.trim(),
          },
        ]
      : []),
    {
      icone: Store,
      titulo: "Loja física",
      texto: "Visite-nos na Trofa",
    },
    {
      icone: Truck,
      titulo: "Entrega rápida",
      texto: "Em todo o território nacional",
    },
    {
      icone: ShieldCheck,
      titulo: "Compras seguras",
      texto: "Com total confiança",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-y-5 rounded-xl sm:grid-cols-2 border border-border bg-card/80 px-5 py-5 md:flex md:divide-x md:divide-border md:px-2">
      {itens.map(({ icone: Icone, titulo, texto }) => (
        <div
          key={titulo}
          className="flex flex-1 items-center gap-3 md:justify-center md:px-4"
        >
          <Icone
            className="size-9 shrink-0 text-primary-hover"
            strokeWidth={1.5}
          />
          <span className="leading-tight">
            <span className="block text-lg font-extrabold text-foreground">
              {titulo}
            </span>
            <span className="block text-xs text-muted-foreground">{texto}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
