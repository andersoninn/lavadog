"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { useNavbarHidden } from "@/components/ui/use-navbar-hidden";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/nav-links";

const WHATSAPP_HREF = "https://wa.me/5500000000000";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const navHidden = useNavbarHidden() && !open;

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-7xl rounded-md border border-transparent transition-[all,transform] duration-300 ease-out",
        {
          "top-4 inset-x-[2.5%] w-auto border-border bg-background/95 shadow backdrop-blur-lg supports-backdrop-filter:bg-background/50 lg:inset-x-0 lg:w-full lg:max-w-6xl":
            scrolled && !open,
          "bg-background/90": open,
          "md:translate-y-[calc(-100%-2rem)] lg:translate-y-0": navHidden,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-20 w-full items-center justify-between px-4 md:h-16 md:transition-all md:ease-out",
          { "px-2": scrolled },
        )}
      >
        <Link href="/" aria-label="LavaDog Store, ir para o início" className="shrink-0">
          {/* <Image
            src="/images/logo.png"
            alt="LavaDog Store"
            width={140}
            height={40}
            className="h-10 w-auto"
            priority
          /> */}
          <p className="text-lg font-bold">Lava Dog</p>
        </Link>

        <div className="flex items-center gap-2 md:gap-3 lg:gap-6">
          <div className="hidden shrink-0 items-center gap-1 lg:flex lg:mr-38">
            {navLinks.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <Link
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fale conosco pelo WhatsApp"
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <WhatsAppIcon className="size-4" />
            </Link>
            <Link
              href="/conta"
              aria-label="Minha conta"
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <User className="size-4" />
            </Link>
            <Link
              href="/carrinho"
              aria-label="Carrinho de compras"
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "hidden lg:inline-flex")}
            >
              <ShoppingCart className="size-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fale conosco pelo WhatsApp"
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <WhatsAppIcon className="size-4" />
            </Link>
            <Link
              href="/carrinho"
              aria-label="Carrinho de compras"
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <ShoppingCart className="size-4" />
            </Link>
          </div>

          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen(!open)}
            className="lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-x-0 top-20 bottom-0 z-50 flex flex-col overflow-hidden border-y bg-background/95 backdrop-blur-lg md:top-16 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className="data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 flex h-full w-full flex-col justify-between gap-y-2 p-4 ease-out"
        >
          <div className="grid gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                className={buttonVariants({ variant: "ghost", className: "justify-start" })}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2 md:hidden">
            <Button className="w-full" asChild onClick={() => setOpen(false)}>
              <a href="/conta">Login</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
