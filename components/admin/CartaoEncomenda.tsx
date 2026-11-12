import { marcarEnviada } from "@/lib/admin";
import { formatPrice } from "@/lib/store-data";
import type { Encomenda } from "@/lib/encomendas";
import { cn } from "@/lib/utils";

function Estado({ enc }: { enc: Encomenda }) {
  const [texto, cor] = !enc.pago
    ? ["Aguarda pagamento", "bg-muted text-muted-foreground"]
    : enc.enviadoEm
      ? ["Enviada", "bg-blue-soft text-blue-strong"]
      : ["Por enviar", "bg-primary-soft text-foreground"];
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", cor)}>{texto}</span>;
}

export default function CartaoEncomenda({ enc }: { enc: Encomenda }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-bold tracking-wide text-foreground">{enc.numero}</p>
          <p className="text-xs text-muted-foreground">
            {enc.data.toLocaleString("pt-PT", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Lisbon" })}
          </p>
        </div>
        <Estado enc={enc} />
      </header>

      <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <p className="font-semibold text-foreground">{enc.nome}</p>
          <p className="text-muted-foreground">{enc.morada.join(", ")}</p>
          <p className="mt-1 text-muted-foreground">{[enc.telefone, enc.email].filter(Boolean).join(" · ")}</p>
          <p className="mt-1 font-medium text-foreground">NIF: {enc.nif ?? "consumidor final"}</p>
        </div>
        <ul className="space-y-1">
          {enc.itens.map((i, n) => (
            <li key={n} className="flex justify-between gap-3">
              <span>
                {i.quantidade}× {i.nome}
                {i.opcao && <span className="block text-xs text-muted-foreground">{i.opcao}</span>}
              </span>
              <span className="whitespace-nowrap">{formatPrice(i.total)}</span>
            </li>
          ))}
          <li className="flex justify-between border-t border-border pt-1 font-bold">
            <span>Total</span>
            <span>{formatPrice(enc.total)}</span>
          </li>
        </ul>
      </div>

      {enc.pago && !enc.enviadoEm && (
        <form action={marcarEnviada} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input type="hidden" name="sessao" value={enc.sessaoId} />
          <input
            name="seguimento"
            placeholder="Código de seguimento (opcional)"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
          />
          <button type="submit" className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-[#3A2C22] hover:bg-primary-hover">
            Marcar como enviada
          </button>
        </form>
      )}
      {enc.enviadoEm && enc.seguimento && (
        <p className="mt-3 text-xs text-muted-foreground">Seguimento: {enc.seguimento}</p>
      )}
    </article>
  );
}
