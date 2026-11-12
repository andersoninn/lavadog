"use client";

import { useState, useSyncExternalStore } from "react";
import { CheckCircle2, Store, Truck } from "lucide-react";
import { EMPRESA, MAPA_LOJA_HREF } from "@/lib/empresa";
import { janelaDeEntrega, zonaDoCodigoPostal } from "@/lib/prazos";

const CHAVE = "lavadog_codigo_postal";
const EVENTO = "lavadog-cp";

// Código postal lembrado neste browser (só conveniência; pode não existir).
let memoria = ""; // quando o browser não deixa guardar
function lerCp() {
  try {
    return localStorage.getItem(CHAVE) ?? memoria;
  } catch {
    return memoria;
  }
}
function subscrever(aviso: () => void) {
  window.addEventListener(EVENTO, aviso);
  window.addEventListener("storage", aviso);
  return () => {
    window.removeEventListener(EVENTO, aviso);
    window.removeEventListener("storage", aviso);
  };
}
const link = "shrink-0 text-sm font-semibold whitespace-nowrap text-blue-strong underline underline-offset-2";

/** Entrega (com código postal e prazo estimado) e loja física. */
export default function CaixaEntrega() {
  const cp = useSyncExternalStore(subscrever, lerCp, () => "");
  const [aEditar, setAEditar] = useState(false);
  const zona = zonaDoCodigoPostal(cp);

  function guardar(valor: string) {
    memoria = valor.trim();
    try {
      localStorage.setItem(CHAVE, valor.trim());
    } catch {}
    window.dispatchEvent(new Event(EVENTO));
  }

  return (
    <aside className="h-fit rounded-xl border border-border bg-primary-soft/60 p-5">
      <div className="flex gap-3.5">
        <Truck className="mt-0.5 size-6 shrink-0 text-foreground" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-bold text-foreground">{zona ? `Entrega para ${cp} – ${zona}` : "Entrega em todo Portugal"}</p>
            <button type="button" onClick={() => setAEditar((v) => !v)} className={link}>
              {zona ? "Alterar" : "Calcular prazo"}
            </button>
          </div>
          {aEditar && (
            <input
              autoFocus
              inputMode="numeric"
              placeholder="Código postal (ex.: 4785-607)"
              defaultValue={cp}
              onKeyDown={(e) => e.key === "Enter" && (guardar(e.currentTarget.value), setAEditar(false))}
              onBlur={(e) => (guardar(e.currentTarget.value), setAEditar(false))}
              className="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-foreground"
            />
          )}
          <p className="mt-2 flex items-start gap-1.5 text-sm text-foreground">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />
            {zona ? `Receba entre ${janelaDeEntrega(zona)}` : "Indique o código postal para ver o prazo"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Portes calculados no pagamento.</p>
        </div>
      </div>

      <div className="my-4 border-t border-border" />

      <div className="flex gap-3.5">
        <Store className="mt-0.5 size-6 shrink-0 text-foreground" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-bold text-foreground">Retirada em loja</p>
            <a href={MAPA_LOJA_HREF} target="_blank" rel="noopener noreferrer" className={link}>
              Ver no mapa
            </a>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Levante na nossa loja: {EMPRESA.morada.replace(", Portugal", "")}</p>
        </div>
      </div>
    </aside>
  );
}
