import ProductsGrid from "@/components/ProductsGrid";
import StorePromoBanner from "@/components/StorePromoBanner";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export default function FeaturedProducts() {
  return (
    <section className="flex  w-full flex-col justify-center gap-4 bg-background px-6 pt-20 pb-4 sm:px-10 lg:px-16">
      <ScrollReveal
        className="flex w-full flex-1 flex-col justify-center gap-4"
        y={100}
        scale={0.9}
        duration={1.1}
        stagger={0.25}
        ease="back.out(1.7)"
        start="top center"
      >
        <ProductsGrid />
        <StorePromoBanner />
      </ScrollReveal>
    </section>
  );
}
