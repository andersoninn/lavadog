import StoreHighlights from "@/components/StoreHighlights";
import StoreCategories from "@/components/StoreCategories";
import StoreMarquee from "@/components/StoreMarquee";

export default function Store() {
  return (
    <section className="flex h-screen w-full flex-col justify-center gap-8 overflow-hidden bg-background py-6">
      <div className="px-6 sm:px-10 lg:px-16">
        <StoreHighlights />
      </div>
      <StoreCategories />
      <StoreMarquee />
    </section>
  );
}
