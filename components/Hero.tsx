"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/Marquee";
import { cn } from "@/lib/utils";

const banners = [
  { desktop: "/images/bannerDesktop1.png", mobile: "/images/bannerMobile1.png" },
  { desktop: "/images/bannerDesktop2.png", mobile: "/images/bannerMobile2.png" },
  { desktop: "/images/bannerDesktop3.png", mobile: "/images/bannerMobile3.png" },
];

const marqueeItems = ["Amor", "Cuidado", "Qualidade", "Confiança", "Bem-Estar", "Carinho"];

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
    <section id="home" className="flex h-screen w-full flex-col overflow-hidden">
      <div className="relative w-full flex-1 overflow-hidden">
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

        <Button
          asChild
          size="lg"
          className="absolute bottom-16 left-1/2 -translate-x-1/2 font-bold shadow-xl transition-all hover:scale-105 hover:shadow-2xl focus-visible:ring-offset-2 md:bottom-2 md:left-auto md:right-4 md:translate-x-0 lg:right-14 lg:bottom-24"
        >
          <a href="#store">
            Conheça nossa loja
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>

      {/* <div className="flex  w-full items-center overflow-hidden">
        <Marquee items={marqueeItems} />
      </div> */}
    </section>
  );
}
