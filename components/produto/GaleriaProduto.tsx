"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon, PawPrint, Sparkles, Trophy } from "lucide-react";
import MiniaturasProduto from "@/components/produto/MiniaturasProduto";
import { idYoutube } from "@/lib/preco-kg";

type Props = { imagens: string[]; nome: string; selo?: string | null; video?: string | null };

/** Miniaturas na lateral (em baixo no telemóvel) + imagem principal com selo. */
export default function GaleriaProduto({ imagens, nome, selo, video }: Props) {
  const [atual, setAtual] = useState(0);
  const idVideo = video ? idYoutube(video) : null;
  const aVerVideo = idVideo !== null && atual === -1;

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row">
      <MiniaturasProduto imagens={imagens} temVideo={idVideo !== null} atual={atual} onEscolher={setAtual} />

      <div className="min-w-0 flex-1">
        <div className="relative aspect-[8/7] w-full overflow-hidden rounded-3xl border border-border bg-card">
          <div aria-hidden className="absolute -bottom-20 -left-20 size-56 rounded-full bg-primary-soft" />
          <PawPrint aria-hidden className="absolute top-1/3 right-5 size-20 rotate-12 text-primary/40" />

          {aVerVideo ? (
            <iframe
              className="absolute inset-0 size-full"
              src={`https://www.youtube-nocookie.com/embed/${idVideo}?autoplay=1`}
              title={`Vídeo: ${nome}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : imagens.length > 0 ? (
            <Image
              src={imagens[Math.max(atual, 0)]}
              alt={nome}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="relative object-contain p-6"
            />
          ) : (
            <div className="relative flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageIcon className="size-12" />
              <span className="text-sm">Imagem em breve</span>
            </div>
          )}

          {selo && !aVerVideo && (
            <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-sm font-bold text-foreground shadow-sm">
              {selo === "Novidade" ? <Sparkles className="size-4" /> : <Trophy className="size-4" />}
              {selo}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
