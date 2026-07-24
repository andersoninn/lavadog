import { PawPrint, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";

export function ServicesHeader() {
  return (
    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
      <ScrollReveal direction="up" className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <PawPrint className="size-5 text-primary-hover" strokeWidth={2} />
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Nossos Serviços
          </h2>
        </div>
        <p className="text-sm text-muted-foreground sm:text-base">
          Tudo para o bem-estar do seu pet em um só lugar.
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <Button variant="outline" className="bg-card" asChild>
          <a href="#servicos">
            Ver todos os serviços
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </ScrollReveal>
    </div>
  );
}
