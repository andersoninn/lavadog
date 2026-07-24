import { Navbar } from "@/components/layout/navbar/navbar";
import { Hero } from "@/components/sections/hero/hero";
import { About } from "@/components/sections/about/about";
import { Services } from "@/components/sections/services/services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
      </main>
    </>
  );
}
