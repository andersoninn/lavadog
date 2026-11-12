"use client";

import { useSyncExternalStore } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Coração dos cartões: guarda os favoritos neste browser (conveniência
 * por visitante; ainda não há página de favoritos nem conta de cliente).
 */
const CHAVE = "lavadog_favoritos";
const EVENTO = "lavadog-favoritos";
let memoria: string[] = [];

function ler(): string {
  try {
    return localStorage.getItem(CHAVE) ?? JSON.stringify(memoria);
  } catch {
    return JSON.stringify(memoria);
  }
}
function subscrever(aviso: () => void) {
  window.addEventListener(EVENTO, aviso);
  return () => window.removeEventListener(EVENTO, aviso);
}

export default function BotaoFavorito({
  id,
  nome,
}: {
  id: string;
  nome: string;
}) {
  const favoritos: string[] = JSON.parse(
    useSyncExternalStore(subscrever, ler, () => "[]"),
  );
  const ativo = favoritos.includes(id);

  function alternar() {
    memoria = ativo ? favoritos.filter((f) => f !== id) : [...favoritos, id];
    try {
      localStorage.setItem(CHAVE, JSON.stringify(memoria));
    } catch {}
    window.dispatchEvent(new Event(EVENTO));
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={ativo}
      aria-label={
        ativo ? `Tirar ${nome} dos favoritos` : `Guardar ${nome} nos favoritos`
      }
      className="absolute top-2.5 right-2.5 z-10 flex size-9 items-center justify-center rounded-full bg-card/90 shadow-sm transition-colors hover:text-red-500"
    >
      <Heart
        className={cn(
          "size-5",
          ativo ? "fill-red-500 text-red-500" : "text-foreground",
        )}
      />
    </button>
  );
}
