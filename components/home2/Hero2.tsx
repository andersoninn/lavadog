"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BannerHero2 from "./BannerHero2";
import { SLIDES_HERO } from "./slides-hero";

const INTERVALO = 6000;
const SETA =
  "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20 sm:flex";

/** Herói em carrossel com setas e barras de progresso (estilo loja), muda a cada 6 s. */
export default function Hero2() {
  const [ativo, setAtivo] = React.useState(0);
  const total = SLIDES_HERO.length;

  // A troca de banner acontece quando a barra acaba de encher (onAnimationEnd).
  // Sem pausa ao passar o rato: o banner ocupa quase o ecrã e parecia travado.
  const ir = (i: number) => setAtivo((i + total) % total);

  return (
    <section
      id="home"
      aria-roledescription="carrossel"
      aria-label="Destaques da loja"
      className="relative aspect-[887/1774] max-h-[calc(100svh-5.5rem)] w-full overflow-hidden bg-primary-soft md:aspect-[1681/935] md:max-h-[calc(100svh-5.5rem)]"
    >
      {SLIDES_HERO.map((slide, i) => (
        <BannerHero2 key={slide.desktop} slide={slide} ativo={i === ativo} primeiro={i === 0} />
      ))}

      <button type="button" aria-label="Destaque anterior" onClick={() => ir(ativo - 1)} className={cn(SETA, "left-4 lg:left-8")}>
        <ChevronLeft className="size-6" strokeWidth={1.5} />
      </button>
      <button type="button" aria-label="Próximo destaque" onClick={() => ir(ativo + 1)} className={cn(SETA, "right-4 lg:right-8")}>
        <ChevronRight className="size-6" strokeWidth={1.5} />
      </button>

      <Link
        href="/store"
        className="absolute bottom-14 left-1/2 z-10 inline-flex h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-7 text-base font-bold whitespace-nowrap text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover md:right-8 md:bottom-12 md:left-auto md:translate-x-0 lg:right-14"
      >
        Conheça nossa loja <ArrowRight className="size-4" />
      </Link>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES_HERO.map((slide, i) => (
          <button
            key={slide.desktop}
            type="button"
            aria-label={`Ir para o destaque ${i + 1}`}
            aria-current={i === ativo}
            onClick={() => ir(i)}
            className="h-1.5 w-14 overflow-hidden rounded-full bg-background/70 sm:w-24"
          >
            <span
              key={i === ativo ? `ativo-${ativo}` : i}
              onAnimationEnd={i === ativo ? () => ir(ativo + 1) : undefined}
              style={i === ativo ? { animationDuration: `${INTERVALO}ms` } : undefined}
              className={cn(
                "block h-full rounded-full bg-blue",
                i < ativo && "w-full",
                i > ativo && "w-0",
                i === ativo && "animate-[progresso-hero_6s_linear_forwards]",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
