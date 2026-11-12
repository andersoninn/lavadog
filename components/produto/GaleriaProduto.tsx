"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon, PawPrint, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { imagens: string[]; nome: string; selo?: string | null };

/** Miniaturas na vertical (em baixo no telemóvel) + imagem principal com selo. */
export default function GaleriaProduto({ imagens, nome, selo }: Props) {
  const [atual, setAtual] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row">
      {imagens.length > 1 && (
        <div className="flex gap-3 overflow-x-auto lg:w-24 lg:shrink-0 lg:flex-col lg:overflow-visible">
          {imagens.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Ver imagem ${i + 1}`}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-card transition-colors lg:size-24",
                i === atual
                  ? "border-primary"
                  : "border-border hover:border-primary/60",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-card">
          {/* Decoração da marca: meia-lua e pegada em amarelo suave */}
          <div
            aria-hidden
            className="absolute -bottom-24 -left-24 size-72 rounded-full bg-primary-soft"
          />
          <PawPrint
            aria-hidden
            className="absolute top-1/4 right-6 size-24 rotate-12 text-primary/40"
          />

          {imagens.length > 0 ? (
            <Image
              src={imagens[atual]}
              alt={nome}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="relative object-contain p-6"
            />
          ) : (
            <div className="relative flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageIcon className="size-12" />
              <span className="text-sm">Imagem em breve</span>
            </div>
          )}

          {selo && (
            <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-foreground shadow-sm">
              <Trophy className="size-4" />
              {selo}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
