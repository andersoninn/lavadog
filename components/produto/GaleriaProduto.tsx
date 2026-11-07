"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function GaleriaProduto({ imagens, nome }: { imagens: string[]; nome: string }) {
  const [atual, setAtual] = useState(0);

  if (imagens.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-primary-soft text-sm text-muted-foreground">
        Sem imagem
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
        <Image
          src={imagens[atual]}
          alt={nome}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {imagens.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {imagens.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Ver imagem ${i + 1}`}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-xl border-2 bg-muted transition-colors",
                i === atual ? "border-foreground" : "border-transparent hover:border-border",
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
