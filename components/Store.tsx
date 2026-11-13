import StoreCategories from "@/components/StoreCategories";
import StoreMarquee from "@/components/StoreMarquee";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { getStoreProducts } from "@/lib/stripe";
import { mapStripeProducts } from "@/lib/store-data";

export default async function Store() {
  let species: string[] = [];

  try {
    species = mapStripeProducts(await getStoreProducts()).species;
  } catch (error) {
    console.error("Falha ao buscar espécies no Stripe:", error);
  }

  return (
    <section
      id="store"
      className="flex w-full flex-col justify-center gap-8 overflow-hidden bg-background"
    >
      <ScrollReveal
        className="flex w-full flex-col gap-8"
        y={100}
        scale={0.9}
        duration={1.1}
        stagger={0.25}
        ease="back.out(1.7)"
      >
        <StoreCategories species={species} />
        <div>
          <StoreMarquee />
        </div>
      </ScrollReveal>
    </section>
  );
}
