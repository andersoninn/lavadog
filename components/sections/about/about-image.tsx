import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { AboutBadge } from "@/components/sections/about/about-badge";

export function AboutImage() {
  return (
    <ScrollReveal direction="left" className="relative mx-auto w-full max-w-xs sm:max-w-sm">
      <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-xl">
        <Image
          src="/images/about-dog.jpg"
          alt="Poodle enrolado em uma toalha após o banho"
          fill
          sizes="(min-width: 1024px) 24rem, 80vw"
          className="object-cover"
        />
      </div>

      <AboutBadge />
    </ScrollReveal>
  );
}
