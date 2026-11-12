import { MessageCircle, Star } from "lucide-react";
import { WHATSAPP_HREF } from "@/lib/constants";
import type { AvaliacoesGoogle } from "@/lib/google-avaliacoes";

/**
 * Linha de avaliação do wireframe. Ainda não há avaliações por produto, por
 * isso mostra a nota da loja no Google (quando a API está ligada) e o
 * contacto para dúvidas.
 */
export default function AvaliacaoLoja({ dados }: { dados: AvaliacoesGoogle | null }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
      {dados && (
        <a href="#avaliacoes" className="flex items-center gap-1.5 hover:underline">
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={i < Math.round(dados.nota) ? "size-4 fill-primary text-primary" : "size-4 text-border"}
              />
            ))}
          </span>
          <span className="font-semibold text-foreground">{dados.nota.toLocaleString("pt-PT")}</span>
          <span className="text-muted-foreground">({dados.total} avaliações da loja no Google)</span>
        </a>
      )}
      {dados && <span aria-hidden className="h-4 w-px bg-border" />}
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <MessageCircle className="size-4" /> Dúvidas? Fale connosco
      </a>
    </div>
  );
}
