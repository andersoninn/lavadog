"use client";

import Image from "next/image";
import { ImageIcon, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const MINIATURAS = 4; // como no wireframe: 4 fotos + vídeo
const base = "relative size-[72px] shrink-0 overflow-hidden rounded-lg border-2 bg-card transition-colors";
const estado = (ativa: boolean) => (ativa ? "border-primary" : "border-border hover:border-primary/60");

type Props = {
  imagens: string[];
  temVideo: boolean;
  atual: number;
  /** índice da imagem, ou -1 para o vídeo */
  onEscolher: (indice: number) => void;
};

/** Coluna de miniaturas: fotos, espaços vazios até 4 e o vídeo (se houver). */
export default function MiniaturasProduto({ imagens, temVideo, atual, onEscolher }: Props) {
  const vazias = Math.max(MINIATURAS - imagens.length, 0);

  return (
    <div className="flex gap-2.5 overflow-x-auto lg:flex-col lg:overflow-visible">
      {imagens.map((src, i) => (
        <button
          key={src}
          type="button"
          onClick={() => onEscolher(i)}
          aria-label={`Ver imagem ${i + 1}`}
          className={cn(base, estado(i === atual))}
        >
          <Image src={src} alt="" fill sizes="72px" className="object-cover" />
        </button>
      ))}
      {Array.from({ length: vazias }).map((_, i) => (
        <div
          key={`vazia-${i}`}
          aria-hidden
          className={cn(base, "flex items-center justify-center border-dashed border-border text-muted-foreground/50")}
        >
          <ImageIcon className="size-5" />
        </div>
      ))}
      {temVideo && (
        <button
          type="button"
          onClick={() => onEscolher(-1)}
          aria-label="Ver vídeo do produto"
          className={cn(base, "flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold", estado(atual === -1))}
        >
          <Play className="size-5 fill-foreground" /> Vídeo
        </button>
      )}
    </div>
  );
}
