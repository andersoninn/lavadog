import StoreHighlights from "@/components/StoreHighlights";
import StoreCategories from "@/components/StoreCategories";
import StoreMarquee from "@/components/StoreMarquee";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { getStoreProducts } from "@/lib/stripe";
import { mapStripeProducts } from "@/lib/store-data";

/** `destaques={false}` esconde o bloco "Alimentação Premium" (a /home2 já tem os atalhos). */
export default async function Store({ destaques = true }: { destaques?: boolean }) {
  let species: string[] = [];

  try {
    species = mapStripeProducts(await getStoreProducts()).species;
  } catch (error) {
    console.error("Falha ao buscar espécies no Stripe:", error);
  }

  return (
    <section
      id="store"
      className={`flex w-full ${destaques ? "pt-34 py-6" : "py-0"} flex-col justify-center gap-8 overflow-hidden bg-background`}
    >
      <ScrollReveal
        className="flex w-full flex-col gap-8"
        y={100}
        scale={0.9}
        duration={1.1}
        stagger={0.25}
        ease="back.out(1.7)"
      >
        {destaques && (
          <div className="px-6 sm:px-10 lg:px-16">
            <StoreHighlights />
          </div>
        )}
        <StoreCategories species={species} />
        <div className={destaques ? "lg:mt-[84px]" : undefined}>
          <StoreMarquee />
        </div>
      </ScrollReveal>
    </section>
  );
}
