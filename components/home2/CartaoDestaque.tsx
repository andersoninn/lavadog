import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Selo from "./Selo";

export type Destaque = {
  titulo: string;
  href: string;
  imagem: string;
  alt: string;
  selo: string;
  fundo: string;
  corSelo: string;
};

/** Cartão grande: selo, foto à esquerda, frase e botão "Comprar" à direita. */
export default function CartaoDestaque({ d }: { d: Destaque }) {
  return (
    <div className={cn("relative grid grid-cols-1 items-center gap-6 rounded-md p-6 sm:grid-cols-2 lg:p-8", d.fundo)}>
      <Selo className={d.corSelo}>{d.selo}</Selo>
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-card">
        <Image src={d.imagem} alt={d.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
      </div>
      <div className="flex flex-col items-start gap-4">
        <h3 className="text-2xl leading-snug font-bold text-foreground lg:text-3xl">{d.titulo}</h3>
        <Link
          href={d.href}
          className="inline-flex h-11 items-center rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Comprar
        </Link>
      </div>
    </div>
  );
}
