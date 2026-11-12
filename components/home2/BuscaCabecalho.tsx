import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/** Barra de pesquisa: envia para /store?q=… (formulário simples, sem JS). */
export default function BuscaCabecalho({ className }: { className?: string }) {
  return (
    <form action="/store" role="search" className={cn("relative w-full", className)}>
      <label htmlFor="busca-cabecalho" className="sr-only">
        Pesquisar produtos
      </label>
      <input
        id="busca-cabecalho"
        name="q"
        type="search"
        placeholder="Pesquisar produtos"
        className="h-11 w-full rounded-full border border-border bg-card pr-12 pl-5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-blue focus:ring-2 focus:ring-blue/25"
      />
      <button
        type="submit"
        aria-label="Pesquisar"
        className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-foreground hover:bg-muted"
      >
        <Search className="size-5" strokeWidth={1.75} />
      </button>
    </form>
  );
}
