import { HeroContent } from "@/components/sections/hero/hero-content";
import { HeroDesktopImagem } from "@/components/sections/hero/hero-imagem";

export function Hero() {
  return (
    <section id="hero" className="bg-background px-8 pt-16 pb-8 sm:px-6 sm:py-20 lg:px-8 lg:py-20">
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <HeroContent />
        <HeroDesktopImagem />
      </div>
    </section>
  );
}
