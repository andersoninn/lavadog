import type { Encomenda } from "@/lib/encomendas";

/** Contadores no topo do painel: por enviar, aguarda pagamento, enviadas. */
export default function ResumoEncomendas({ encomendas }: { encomendas: Encomenda[] }) {
  const contas = [
    { rotulo: "Por enviar", valor: encomendas.filter((e) => e.pago && !e.enviadoEm).length, destaque: true },
    { rotulo: "Aguarda pagamento", valor: encomendas.filter((e) => !e.pago).length },
    { rotulo: "Enviadas", valor: encomendas.filter((e) => e.enviadoEm).length },
  ];

  return (
    <div className="mt-8 grid grid-cols-3 gap-3">
      {contas.map((c) => (
        <div
          key={c.rotulo}
          className={
            c.destaque
              ? "rounded-2xl border border-primary bg-primary-soft p-4"
              : "rounded-2xl border border-border bg-card p-4"
          }
        >
          <p className="text-2xl font-bold text-foreground sm:text-3xl">{c.valor}</p>
          <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">{c.rotulo}</p>
        </div>
      ))}
    </div>
  );
}
