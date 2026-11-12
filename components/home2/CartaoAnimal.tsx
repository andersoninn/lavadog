import Image from "next/image";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Animal = {
  nome: string;
  href: string;
  imagem?: string;
  icone: LucideIcon;
  /** Altura e largura da foto (relativas à área de 160% da altura do cartão). */
  tamanho?: string;
};

/** Cartão azul de espécie: foto (ou ícone) a sair por cima e nome com seta. */
export default function CartaoAnimal({ animal }: { animal: Animal }) {
  const Icone = animal.icone;
  return (
    <Link
      href={animal.href}
      className="group relative flex h-28 items-center justify-end overflow-visible rounded-md bg-blue px-6 transition-transform hover:-translate-y-0.5 sm:h-36 lg:h-44 lg:px-10"
    >
      <span aria-hidden className="absolute inset-0 overflow-hidden rounded-md">
        <span className="absolute -bottom-16 left-1/3 size-40 rounded-full bg-background/10" />
        <span className="absolute -top-10 -right-6 size-28 rounded-full bg-background/10" />
      </span>
      {/* A foto pode sair por cima do cartão, mas é cortada em baixo, rente aos cantos. */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[160%] overflow-hidden rounded-b-md">
        <span className={cn("absolute bottom-0 left-4 lg:left-8", animal.tamanho ?? "h-[78%] w-[40%]")}>
          {animal.imagem ? (
            <Image src={animal.imagem} alt="" fill sizes="(min-width: 640px) 18vw, 50vw" className="object-contain object-bottom" />
          ) : (
            <span className="absolute bottom-3 left-0 flex size-20 items-center justify-center rounded-full bg-background/20 text-white sm:size-24 lg:bottom-5 lg:size-28">
              <Icone className="size-10 sm:size-12 lg:size-14" strokeWidth={1.5} />
            </span>
          )}
        </span>
      </span>
      <span className="relative flex items-center gap-1 text-2xl font-bold text-white lg:text-3xl">
        {animal.nome}
        <ChevronRight className="size-6 transition-transform group-hover:translate-x-1 lg:size-7" strokeWidth={2.5} />
      </span>
    </Link>
  );
}
