import Depoimentos from "@/components/Depoimentos";
import Footer from "@/components/Footer";

export default function Contatos() {
  return (
    <section className="flex w-full flex-col md:h-screen">
      <div className="h-screen w-full md:h-1/2">
        <Depoimentos />
      </div>
      <div className="h-screen w-full md:h-1/2">
        <Footer />
      </div>
    </section>
  );
}
