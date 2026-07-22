import { Crown } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { HeroCtas } from "@/components/sections/hero/hero-ctas";
import { HeroTrustBadges } from "@/components/sections/hero/hero-trust-badges";
import { MobileHeroImage } from "@/components/sections/hero/mobile-hero-image";

export function HeroContent() {
  return (
    <div className="relative flex flex-col items-start gap-6 lg:text-left">
      <ScrollReveal direction="up">
        <Crown className="mx-auto size-7 md:size-10 text-primary lg:mx-0 -mb-4" strokeWidth={1.5} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="relative">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl md:max-w-2xl">
            <span className="block md:inline">Mais que um</span>{" "}
            <span className="block md:inline">pet shop,</span>
            <span className="block md:inline">um lugar de</span>{" "}
            <span className="block whitespace-nowrap md:inline">
              <span className="text-primary">amor</span>{" "}
              <span className="text-primary md:text-blue">e</span>
            </span>{" "}
            <span className="block md:inline text-blue">cuidado.</span>
          </h1>
          <MobileHeroImage />
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <p className="w-[66%] max-w-md text-left text-base leading-relaxed text-muted-foreground sm:w-full sm:text-lg lg:mx-0">
          Produtos premium e serviços especializados para o bem-estar e a felicidade do seu melhor
          amigo, todos os dias.
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.3} className="flex justify-center lg:justify-start">
        <HeroCtas />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.4} className="flex justify-center lg:justify-start">
        <HeroTrustBadges />
      </ScrollReveal>
    </div>
  );
}
