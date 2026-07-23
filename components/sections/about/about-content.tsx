import { Crown } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { AboutFeatures } from "@/components/sections/about/about-features";

export function AboutContent() {
  return (
    <div className="flex flex-col gap-5">
      <ScrollReveal direction="up">
        <Crown className="size-7 text-primary" strokeWidth={1.5} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Sobre a <span className="text-primary">LavaDog</span>{" "}
          <span className="text-blue">Store</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Nascemos do amor pelos pets e da vontade de oferecer o melhor em
          cada detalhe. Aqui, qualidade, carinho e segurança caminham juntos
          para transformar a rotina e a vida do seu melhor amigo.
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.3}>
        <AboutFeatures />
      </ScrollReveal>
    </div>
  );
}
