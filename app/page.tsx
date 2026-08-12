import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Store from "@/components/Store";
import StorePromoBanner from "@/components/StorePromoBanner";
import Contatos from "@/components/Contatos";
import Footer from "@/components/Footer";
import { getCurrentCart } from "@/lib/cart-actions";

export default async function Home() {
  const cart = await getCurrentCart().catch(() => null);

  return (
    <>
      <Navbar cartCount={cart?.totalQuantity ?? 0} />
      <main className="flex-1">
        <Hero />
        <Store />
        <StorePromoBanner />
        <Contatos />
      </main>
      <Footer />
    </>
  );
}
