import { HeroContent } from "@/components/sections/hero/hero-content";
import { HeroImagem } from "@/components/sections/hero/hero-imagem";

export function Hero() {
  return (
    <section id="hero" className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <HeroContent />
        <HeroImagem />
      </div>
    </section>
  );
}
