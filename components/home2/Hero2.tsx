"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SlideHero2 from "./SlideHero2";
import { SLIDES_HERO } from "./slides-hero";

const INTERVALO = 6000;
const SETA =
  "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20 sm:flex";

/** Herói em carrossel com setas e barras de progresso (estilo loja). */
export default function Hero2() {
  const [ativo, setAtivo] = React.useState(0);
  const [pausado, setPausado] = React.useState(false);
  const total = SLIDES_HERO.length;

  React.useEffect(() => {
    if (pausado) return;
    const id = setTimeout(() => setAtivo((a) => (a + 1) % total), INTERVALO);
    return () => clearTimeout(id);
  }, [ativo, pausado, total]);

  const ir = (i: number) => setAtivo((i + total) % total);

  return (
    <section
      id="home"
      aria-roledescription="carrossel"
      aria-label="Destaques da loja"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      className="relative h-[560px] w-full overflow-hidden sm:h-[600px] md:h-[520px] lg:h-[560px]"
    >
      {SLIDES_HERO.map((slide, i) => (
        <SlideHero2 key={slide.titulo} slide={slide} ativo={i === ativo} primeiro={i === 0} />
      ))}

      <button type="button" aria-label="Destaque anterior" onClick={() => ir(ativo - 1)} className={cn(SETA, "left-4 lg:left-8")}>
        <ChevronLeft className="size-6" strokeWidth={1.5} />
      </button>
      <button type="button" aria-label="Próximo destaque" onClick={() => ir(ativo + 1)} className={cn(SETA, "right-4 lg:right-8")}>
        <ChevronRight className="size-6" strokeWidth={1.5} />
      </button>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES_HERO.map((slide, i) => (
          <button
            key={slide.titulo}
            type="button"
            aria-label={`Ir para o destaque ${i + 1}`}
            aria-current={i === ativo}
            onClick={() => ir(i)}
            className="h-1.5 w-14 overflow-hidden rounded-full bg-foreground/15 sm:w-24"
          >
            <span
              key={i === ativo ? `${ativo}-${pausado}` : i}
              className={cn(
                "block h-full rounded-full bg-blue",
                i < ativo && "w-full",
                i > ativo && "w-0",
                i === ativo && (pausado ? "w-full" : "animate-[progresso-hero_6s_linear_forwards]"),
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
