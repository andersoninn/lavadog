import { Heart, PawPrint, ShieldCheck, Star } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const features = [
  {
    icon: PawPrint,
    title: "Amor em\ncada detalhe",
    description: "Tratamos seu pet\ncomo parte da \nnossa família.",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade\npremium",
    description: "Selecionamos apenas \nprodutos seguros e \nde alta qualidade.",
  },
  {
    icon: Heart,
    title: "Cuidado que\nfaz a diferença",
    description: "Cada serviço e produto\né pensado no bem-estar e felicidade do seu pet.",
  },
  {
    icon: Star,
    title: "Confiança que você sente",
    description: "Transparência, respeito e dedicação em tudo \no que fazemos.",
  },
];

export function AboutFeatures() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {features.map(({ icon: Icon, title, description }, index) => (
        <ScrollReveal key={title} direction="up" delay={index * 0.08}>
          <div className="relative h-full">
            {index === features.length - 1 && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-8 z-0 hidden size-12 rotate-12 bg-muted opacity-90 lg:block"
                style={{
                  WebkitMask:
                    "url('/images/dogfoot.png') center / contain no-repeat",
                  mask: "url('/images/dogfoot.png') center / contain no-repeat",
                }}
              />
            )}

            <div className="relative z-10 flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#F2E2D2] text-blue-strong">
                <Icon className="size-8 text-blue" />
              </span>
              <p className="font-display whitespace-pre-line text-sm font-bold leading-snug text-foreground">
                {title}
              </p>
              <p className="whitespace-pre-line text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
