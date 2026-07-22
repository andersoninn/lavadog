import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { cn } from "@/lib/utils";

const iconButtonClass =
  "flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground/80 transition-colors hover:border hover:border-primary hover:bg-card hover:text-foreground sm:size-10";

type NavbarActionsProps = {
  className?: string;
  cartCount?: number;
};

export function NavbarActions({ className, cartCount = 0 }: NavbarActionsProps) {
  return (
    <div className={cn("flex items-center -gap-3 md:gap-3 ", className)}>
      <Link
        href="https://wa.me/5500000000000"
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
        aria-label="Fale conosco pelo WhatsApp"
      >
        <WhatsAppIcon className="size-4.5" />
      </Link>

      <Link href="/conta" className={iconButtonClass} aria-label="Minha conta">
        <User className="size-4.5" />
      </Link>

      <Link
        href="/carrinho"
        className={cn(iconButtonClass, "relative")}
        aria-label="Carrinho de compras"
      >
        <ShoppingBag className="size-4.5" />
        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {cartCount}
        </span>
      </Link>
    </div>
  );
}
