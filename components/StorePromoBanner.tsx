import Image from "next/image";
import { Button } from "@/components/ui/button";

const tabs = ["Sobre a Loja", "O Que Oferecemos", "Benefícios"];

export default function StorePromoBanner() {
  return (
    <section className="relative mx-[calc(50%-50vw)] lg:mx-[calc(50%-50.5vw)] w-screen bg-[#3A2C22] text-white mt-24 lg:mt-28 pb-24" id="store-promo-banner">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/images/bgCtaStore.png')] bg-cover bg-center opacity-15" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-14 lg:py-20">
        {/* LEFT */}
        <div className="max-w-lg">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary">
            O CANTINHO FELIZ DO SEU PET
          </span>

          <h2 className="mt-4 text-4xl leading-tight font-bold lg:text-5xl">
            Tudo para a sua
            <br />
            família peluda
            <br />
            na LavaDog Store
          </h2>

          <div className="mt-8 hidden gap-8 border-b border-white/20 pb-3 md:flex">
            {tabs.map((tab, index) => (
              <span
                key={tab}
                className={`cursor-pointer text-sm transition ${
                  index === 0
                    ? "border-b-2 border-primary pb-2 text-white"
                    : "pb-2 text-white/60 hover:text-white"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-md text-base leading-7 text-white/75">
            Produtos cuidadosamente selecionados para manter seu pet feliz, saudável e cheio de
            energia. Brinquedos, acessórios, alimentação e muito mais com a qualidade LavaDog.
          </p>

          <Button className="mt-10 rounded-full bg-white px-8 text-[#5B371F] hover:bg-white/90">
            Saiba Mais
          </Button>
        </div>

        {/* RIGHT */}
        <div className="relative hidden h-[520px] lg:block">
          <Image
            src="/images/dogCtaStore.png"
            alt="Dog"
            fill
            priority
            className="translate-x-10 -translate-y-8 scale-[1.55] object-contain object-bottom"
          />
        </div>
      </div>

      {/* Floating Card */}
      <div className="absolute bottom-[-55px] left-1/2 hidden w-[760px] max-w-[90vw] -translate-x-1/2 items-center justify-between rounded-lg bg-[#F4E7C7] px-10 py-12 shadow-[0_25px_60px_rgba(0,0,0,.18)] lg:flex z-99">
        <div className="flex items-center gap-8">
          <div className="flex gap-8">
            <p className="text-6xl font-black leading-none text-[#5B371F]">20% off</p>

            <p className="mt-2 text-xl font-semibold text-[#6D4B31]">
              Desconto na sua
              <br />
              primeira compra online
            </p>
          </div>
        </div>

        <Button className="rounded-full bg-white px-8 text-[#5B371F] hover:bg-white/90">
          Comprar Agora
        </Button>
      </div>

      {/* Mobile Card */}
      <div className="absolute bottom-0 left-1/2 z-20 w-[90vw] max-w-sm -translate-x-1/2 translate-y-1/2 lg:hidden">
        <div className="rounded-xl bg-[#F4E7C7] p-5 text-[#5B371F] shadow-xl flex flex-col items-center justify-center text-center gap-2">
          <p className="text-4xl font-black">20% OFF</p>

          <p className="mt-1 text-sm">Desconto na sua primeira compra online.</p>

          <Button className="mt-4 w-full rounded-xl hover:bg-[#4A2F1A] bg-white font-black text-[#5B371F]">
            Comprar Agora
          </Button>
        </div>
      </div>
    </section>
  );
}
