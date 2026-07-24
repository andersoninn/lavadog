import Image from "next/image";
import { Button } from "@/components/ui/button";

const tabs = ["Sobre a Loja", "O Que Oferecemos", "Benefícios"];

export default function StorePromoBanner() {
  return (
    <div className="relative flex flex-1 items-center overflow-hidden rounded-3xl bg-foreground px-6 text-background sm:px-10 md:bg-[url('/images/bgCtaStore.png')] md:bg-cover md:bg-center lg:px-14">
      <div className="grid w-full items-center gap-6 py-5 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold tracking-wide text-primary uppercase">
            O Cantinho Feliz do Seu Pet
          </span>
          <h2 className="mt-1 text-xl font-bold sm:text-2xl">
            Tudo para a aua família peluda
            <br />
            na nossa Loja
          </h2>

          <div className="mt-3 border-b border-background/20 md:hidden" />

          <div className="mt-3 hidden gap-4 border-b border-background/20 text-sm font-semibold text-background/60 md:flex">
            {tabs.map((tab, index) => (
              <span
                key={tab}
                className={index === 0 ? "border-b-2 border-primary pb-2 text-background" : "pb-2"}
              >
                {tab}
              </span>
            ))}
          </div>

          <p className="mt-3 max-w-md text-sm text-background/70">
            Produtos selecionados com carinho para deixar seu pet feliz e saudável — de brinquedos a
            petiscos, tudo com a qualidade LavaDog Store.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="h-auto px-3 py-1.5 text-xs sm:h-11 sm:px-6 sm:py-2 sm:text-sm"
            >
              <a href="#store">Saiba Mais</a>
            </Button>
            <span className="flex items-center rounded-full bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary md:h-11 md:px-6 md:py-2 md:text-sm">
              -20% na primeira compra
            </span>
          </div>
        </div>

        <div className=" hidden h-full min-h-64 overflow-hidden rounded-lg lg:block">
          <Image
            src="/images/dogCtaStore.png"
            alt="Produtos premium LavaDog Store"
            fill
            className="object-contain ml-36 scale-[1.3333]"
          />
        </div>
      </div>
    </div>
  );
}
