import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroCtas() {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
      <Button size="lg" asChild>
        <a href="#servicos">
          Conheça nossos serviços
          <ArrowRight className="size-4" />
        </a>
      </Button>

      <a
        href="#video"
        className="group flex items-center gap-3 text-sm font-semibold text-foreground"
      >
        <span className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-primary transition-colors group-hover:border-primary group-hover:text-primary-hover">
          <Play className="size-4 fill-current" />
        </span>
        <span className="text-foreground">Assista ao vídeo</span>
      </a>
    </div>
  );
}
