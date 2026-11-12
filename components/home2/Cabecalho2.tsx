import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBasket } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { WHATSAPP_HREF } from "@/lib/constants";
import BuscaCabecalho from "./BuscaCabecalho";
import { LINKS_CABECALHO } from "./LinksCabecalho";

const ICONE = "relative flex size-10 items-center justify-center rounded-full text-blue-strong hover:bg-blue-soft";

/** Cabeçalho de loja: logótipo, pesquisa, ações e linha de categorias. */
export default function Cabecalho2({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 pt-3 sm:px-6 lg:gap-10 lg:px-10">
        <Link href="/" aria-label="LavaDog Store, ir para o início" className="shrink-0">
          <Image src="/images/logo.png" alt="LavaDog Store" width={140} height={48} className="h-10 w-auto lg:h-12" priority />
        </Link>
        <BuscaCabecalho className="mx-auto hidden max-w-2xl md:block" />
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" aria-label="Fale connosco pelo WhatsApp" className={ICONE}>
            <WhatsAppIcon className="size-5" />
          </a>
          <Link href="/store" aria-label="Favoritos" className={ICONE}>
            <Heart className="size-5" strokeWidth={1.75} />
          </Link>
          <Link href="/carrinho" aria-label="Carrinho de compras" className={ICONE}>
            <ShoppingBasket className="size-5" strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="px-4 pt-3 sm:px-6 md:hidden">
        <BuscaCabecalho />
      </div>
      <nav aria-label="Categorias" className="mx-auto w-full max-w-7xl">
        <ul className="flex gap-6 overflow-x-auto px-4 py-3 text-sm font-semibold whitespace-nowrap text-foreground sm:px-6 md:justify-center md:gap-10 md:text-base">
          {LINKS_CABECALHO.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="transition-colors hover:text-blue-strong">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
