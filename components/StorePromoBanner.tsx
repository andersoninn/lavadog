'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PromoCartao from '@/components/PromoCartao';
import type { Promocao } from '@/lib/promocoes';

const tabs = [
  {
    label: 'Sobre a Loja',
    text: 'Produtos cuidadosamente selecionados para manter seu pet feliz, saudável e cheio de energia. Brinquedos, acessórios, alimentação e muito mais com a qualidade LavaDog.',
  },
  {
    label: 'O Que Oferecemos',
    text: 'Uma seleção completa de alimentação premium, brinquedos, acessórios e itens de higiene para cães e gatos de todos os portes e idades. Tudo em um só lugar, pensado para o dia a dia do seu pet.',
  },
  {
    label: 'Benefícios',
    text: 'Atendimento próximo e apaixonado por animais, entrega rápida e produtos com a garantia de qualidade LavaDog. Compre com confiança e cuide do seu pet com quem entende do assunto.',
  },
];

/**
 * Os cupões do cartão amarelo vêm do Stripe (getPromocoes em lib/stripe.ts,
 * lido em app/page.tsx). Sem cupões ativos, o cartão mostra um convite para a
 * loja — ver components/PromoCartao.tsx.
 */
export default function StorePromoBanner({
  promocoes = [],
  compacto = false,
}: {
  promocoes?: Promocao[];
  /** Menos espaço por cima (usado na /home2, logo a seguir à faixa de categorias). */
  compacto?: boolean;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      className={`relative mx-[calc(50%-50vw)] lg:mx-[calc(50%-50.5vw)] w-screen overflow-x-clip bg-[#3A2C22] text-white pb-24 ${compacto ? "mt-6 lg:mt-8" : "mt-10 sm:mt-24 lg:mt-[84px]"}`}
      id="store-promo-banner"
    >
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

          <div className="mt-8 flex gap-4 overflow-x-auto border-b border-white/20 pb-3 sm:gap-6 md:gap-8">
            {tabs.map((tab, index) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`shrink-0 cursor-pointer text-xs whitespace-nowrap transition sm:text-sm ${
                  index === activeTab
                    ? 'border-b-2 border-primary pb-2 text-white'
                    : 'pb-2 text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <p className="mt-6 max-w-md text-base leading-7 text-white/75">
            {tabs[activeTab].text}
          </p>

          <Button
            asChild
            className="mt-10 rounded-full bg-white px-8 text-[#5B371F] hover:bg-white/90"
          >
            <Link href="/store">Saiba Mais</Link>
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
      <div className="absolute bottom-[-55px] left-1/2 hidden w-[860px] max-w-[90vw] -translate-x-1/2 rounded-lg bg-[#F4E7C7] px-10 py-12 shadow-[0_25px_60px_rgba(0,0,0,.18)] lg:flex z-89 bg-[url('/images/bgCtaStoreLight.png')]">
        <PromoCartao promocoes={promocoes} variante="desktop" />
      </div>

      {/* Mobile Card */}
      <div className="absolute bottom-0 left-1/2 z-20 w-[90vw] max-w-sm -translate-x-1/2 translate-y-1/2 lg:hidden">
        <div className="rounded-xl bg-[#F4E7C7] bg-[url('/images/bgCtaStoreLight.png')] p-5 text-[#5B371F] shadow-xl">
          <PromoCartao promocoes={promocoes} variante="mobile" />
        </div>
      </div>
    </section>
  );
}
