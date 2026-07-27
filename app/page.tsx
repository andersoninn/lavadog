import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Store from "@/components/Store";
import FeaturedProducts from "@/components/FeaturedProducts";
import Contatos from "@/components/Contatos";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Store />
        <FeaturedProducts />
        <Contatos />
      </main>
    </>
  );
}
