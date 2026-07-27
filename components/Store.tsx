import StoreHighlights from "@/components/StoreHighlights";
import StoreCategories from "@/components/StoreCategories";
import StoreMarquee from "@/components/StoreMarquee";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export default function Store() {
  return (
    <section
      id="store"
      className="flex pt-34 w-full flex-col justify-center gap-8 overflow-hidden bg-background py-6"
    >
      <ScrollReveal
        className="flex w-full flex-col gap-8"
        y={100}
        scale={0.9}
        duration={1.1}
        stagger={0.25}
        ease="back.out(1.7)"
      >
        <div className="px-6 sm:px-10 lg:px-16">
          <StoreHighlights />
        </div>
        <StoreCategories />
        <StoreMarquee />
      </ScrollReveal>
    </section>
  );
}
