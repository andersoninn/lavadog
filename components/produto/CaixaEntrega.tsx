import { CheckCircle2, Store, Truck } from "lucide-react";
import { EMPRESA } from "@/lib/empresa";
import { WHATSAPP_HREF } from "@/lib/constants";

/** Caixa lateral: entrega e loja física. */
export default function CaixaEntrega() {
  return (
    <aside className="h-fit rounded-3xl border border-border bg-primary-soft/60 p-6">
      <div className="flex gap-4">
        <Truck className="mt-0.5 size-7 shrink-0 text-foreground" />
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-bold text-foreground">Entrega em todo Portugal</p>
            <a href="/envios" className="text-sm font-semibold text-blue-strong underline underline-offset-2">
              Saber mais
            </a>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-foreground">
            <CheckCircle2 className="size-4 text-green-600" />
            Encomenda preparada em até 2 dias úteis
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Portes calculados no pagamento.</p>
        </div>
      </div>

      <div className="my-5 border-t border-border" />

      <div className="flex gap-4">
        <Store className="mt-0.5 size-7 shrink-0 text-foreground" />
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-bold text-foreground">Visite a nossa loja</p>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-strong underline underline-offset-2">
              Falar connosco
            </a>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{EMPRESA.morada.replace(", Portugal", "")}</p>
        </div>
      </div>
    </aside>
  );
}
