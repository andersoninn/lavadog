import Image from "next/image";
import { PawPrint } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { HeroFloatingCard } from "@/components/sections/hero/hero-floating-card";

export function HeroMedia() {
  return (
    <ScrollReveal direction="right" delay={0.15} className="relative mx-auto w-full max-w-md">
      <PawPrint
        className="absolute -left-2 -top-4 size-10 rotate-12 text-muted-foreground/25"
        strokeWidth={1.5}
      />
      <PawPrint
        className="absolute -right-3 top-1/3 size-7 -rotate-12 text-muted-foreground/20"
        strokeWidth={1.5}
      />

      <div className="relative aspect-[260/367] w-full overflow-hidden rounded-tl-[3.5rem] rounded-tr-2xl rounded-bl-2xl rounded-br-[3.5rem] shadow-xl">
        <Image
          src="/images/hero-dog.jpg"
          alt="Golden retriever feliz, deitado em uma caminha aconchegante"
          fill
          priority
          sizes="(min-width: 1024px) 28rem, 90vw"
          className="object-cover"
        />
      </div>

      <HeroFloatingCard />
    </ScrollReveal>
  );
}
