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
          <div className="flex items-center h-full flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-center ">
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
        </ScrollReveal>
      ))}
    </div>
  );
}
