import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { SlideHero } from "./slides-hero";

/** Um slide: fotos em cartões à esquerda, título e botão à direita. */
export default function SlideHero2({ slide, ativo, primeiro }: { slide: SlideHero; ativo: boolean; primeiro: boolean }) {
  const duas = slide.imagens.length > 1;
  return (
    <div
      aria-hidden={!ativo}
      className={cn(
        "absolute inset-0 grid grid-cols-1 items-center gap-6 px-6 pt-6 pb-14 transition-opacity duration-700 sm:px-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-12 md:px-24 md:py-12",
        slide.fundo,
        ativo ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className={cn("grid h-48 gap-4 sm:h-64 md:h-full md:max-h-[420px]", duas ? "grid-cols-[1.4fr_1fr]" : "grid-cols-1")}>
        {slide.imagens.map((img, i) => (
          <div
            key={img.src}
            className={cn(
              "relative overflow-hidden rounded-md",
              img.ajuste === "contain" ? "" : "bg-card shadow-sm",
              i === 1 && "md:mt-10",
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={primeiro && i === 0}
              sizes="(min-width: 768px) 30vw, 90vw"
              className={img.ajuste === "contain" ? "object-contain" : "object-cover"}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start gap-3 md:gap-5">
        <h2 className="text-3xl leading-tight font-bold text-foreground sm:text-4xl lg:text-5xl">{slide.titulo}</h2>
        <p className="max-w-md text-base text-muted-foreground lg:text-lg">{slide.texto}</p>
        <Link
          href={slide.href}
          tabIndex={ativo ? 0 : -1}
          className="mt-1 inline-flex h-12 items-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
        >
          {slide.cta}
        </Link>
      </div>
    </div>
  );
}
