import ProductsGrid from "@/components/ProductsGrid";
import StorePromoBanner from "@/components/StorePromoBanner";

export default function FeaturedProducts() {
  return (
    <section className="flex h-screen w-full flex-col justify-center gap-4 overflow-hidden bg-background px-6 pt-20 pb-4 sm:px-10 lg:px-16">
      <ProductsGrid />
      <StorePromoBanner />
    </section>
  );
}
