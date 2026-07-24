import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Store from "@/components/Store";
import FeaturedProducts from "@/components/FeaturedProducts";
import Contatos from "@/components/Contatos";
import { ScreenScroller } from "@/components/animations/screen-scroller";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ScreenScroller>
          <Hero />
          <Services />
          <Store />
          <FeaturedProducts />
        </ScreenScroller>
        <Contatos />
      </main>
    </>
  );
}
