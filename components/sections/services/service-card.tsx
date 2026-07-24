import Image from "next/image";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { cn } from "@/lib/utils";

export type ServiceCardProps = {
  image: string;
  icon: LucideIcon;
  variant: "amber" | "blue";
  title: string;
  description: string;
  href: string;
  delay?: number;
};

export function ServiceCard({
  image,
  icon: Icon,
  variant,
  title,
  description,
  href,
  delay = 0,
}: ServiceCardProps) {
  return (
    <ScrollReveal direction="up" delay={delay} className="h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative aspect-[4/3] w-full">
          <Image src={image} alt={title} fill sizes="(min-width: 1024px) 22rem, 90vw" className="object-cover" />
          <span
            className={cn(
              "absolute -bottom-4 left-4 flex size-11 items-center justify-center rounded-full text-white shadow-md",
              variant === "amber" ? "bg-primary-hover" : "bg-blue-strong",
            )}
          >
            <Icon className="size-5" />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-7">
          <p className="font-display text-base font-bold text-foreground">{title}</p>
          <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <a
            href={href}
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-hover"
          >
            Saiba mais
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}
