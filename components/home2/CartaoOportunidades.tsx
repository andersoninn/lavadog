import Image from "next/image";
import Link from "next/link";
import { Percent } from "lucide-react";

/** Cartão lateral dos "Produtos imperdíveis" (só em ecrãs grandes). */
export default function CartaoOportunidades() {
  return (
    <div className="relative mt-8 hidden h-[calc(100%-2rem)] min-h-96 flex-col overflow-hidden rounded-md bg-primary lg:flex">
      <div className="bg-foreground px-5 pt-6 pb-10 [clip-path:ellipse(120%_100%_at_50%_0%)]">
        <p className="text-lg font-bold text-primary">Corra para estas</p>
        <p className="text-2xl leading-tight font-bold text-white">oportunidades!</p>
      </div>
      <Percent aria-hidden className="absolute top-32 left-4 size-10 rotate-12 rounded-full bg-background p-2 text-primary-hover" />
      <Percent aria-hidden className="absolute top-52 right-4 size-12 -rotate-12 rounded-full bg-background p-2 text-primary-hover" />
      <div className="relative flex-1">
        <Image src="/images/home/cao.png" alt="" fill sizes="240px" className="object-contain object-bottom" />
      </div>
      <Link
        href="/store?promo=true"
        className="absolute bottom-5 left-1/2 inline-flex h-11 -translate-x-1/2 items-center rounded-full bg-blue-strong px-7 whitespace-nowrap font-semibold text-white shadow-md hover:bg-foreground"
      >
        Ver todas
      </Link>
    </div>
  );
}
