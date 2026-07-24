"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const banners = [
  { desktop: "/images/bannerDesktop1.png", mobile: "/images/bannerMobile1.png" },
  { desktop: "/images/bannerDesktop2.png", mobile: "/images/bannerMobile2.png" },
  { desktop: "/images/bannerDesktop3.png", mobile: "/images/bannerMobile3.png" },
];

export default function Hero() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => (current + 1) % banners.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  function goTo(index: number) {
    setActive((index + banners.length) % banners.length);
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {banners.map((banner, index) => (
        <React.Fragment key={banner.desktop}>
          <Image
            src={banner.desktop}
            alt={`LavaDog Store - banner ${index + 1}`}
            fill
            priority={index === 0}
            className={cn(
              "hidden object-cover transition-opacity duration-1000 ease-in-out md:block",
              index === active ? "opacity-100" : "opacity-0",
            )}
          />
          <Image
            src={banner.mobile}
            alt={`LavaDog Store - banner ${index + 1}`}
            fill
            priority={index === 0}
            className={cn(
              "object-cover transition-opacity duration-1000 ease-in-out md:hidden",
              index === active ? "opacity-100" : "opacity-0",
            )}
          />
        </React.Fragment>
      ))}

      {/* <button
        type="button"
        aria-label="Banner anterior"
        onClick={() => goTo(active - 1)}
        className="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background sm:left-8"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Próximo banner"
        onClick={() => goTo(active + 1)}
        className="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background sm:right-8"
      >
        <ChevronRight className="size-5" />
      </button> */}

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((banner, index) => (
          <button
            key={banner.desktop}
            type="button"
            aria-label={`Ir para o banner ${index + 1}`}
            onClick={() => goTo(index)}
            className={cn(
              "h-2 rounded-full transition-all",
              index === active ? "w-6 bg-primary" : "w-2 bg-background/70",
            )}
          />
        ))}
      </div>

      <Button asChild className="absolute right-4 bottom-16 md:bottom-2 lg:bottom-24  lg:right-14">
        <a href="#store">
          Conheça nossa loja
          <ArrowDown className="size-4" />
        </a>
      </Button>
    </section>
  );
}
