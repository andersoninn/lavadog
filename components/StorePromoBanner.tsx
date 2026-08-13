'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

// TODO: trocar pelo código real do cupom de 10% que a cliente já tem
// cadastrado na loja inteira (Descontos, no admin da Shopify). A Storefront
// API não permite ler cupons por segurança, então esse valor precisa ser
// atualizado aqui manualmente sempre que o cupom mudar.
const DISCOUNT_CODE = 'LAVADOG10';

export default function StorePromoBanner() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      className="relative mx-[calc(50%-50vw)] lg:mx-[calc(50%-50.5vw)] w-screen bg-[#3A2C22] text-white mt-24 lg:mt-28 pb-24"
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
      <div className="absolute bottom-[-55px] left-1/2 hidden w-[760px] max-w-[90vw] -translate-x-1/2 items-center justify-between rounded-lg bg-[#F4E7C7]  px-10 py-12 shadow-[0_25px_60px_rgba(0,0,0,.18)] lg:flex z-89  bg-[url('/images/bgCtaStoreLight.png')]">
        <div className="flex items-center gap-8">
          <p className="shrink-0 text-6xl font-black leading-none whitespace-nowrap text-[#5B371F]">
            10% off
          </p>

          <div className="mt-2 flex flex-col text-xl font-semibold text-[#6D4B31]">
            <span className="whitespace-nowrap">Em toda a loja usando o</span>
            <span className="whitespace-nowrap font-black tracking-wide">
              cupom {DISCOUNT_CODE}
            </span>
          </div>
        </div>

        <Button
          asChild
          className="rounded-full bg-primary px-10 py-6 text-base font-bold text-[#3A2C22] shadow-[0_10px_25px_rgba(245,191,95,0.45)] transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_14px_30px_rgba(245,191,95,0.55)]"
        >
          <Link href="/store">Comprar Agora</Link>
        </Button>
      </div>

      {/* Mobile Card */}
      <div className="absolute bottom-0 left-1/2 z-20 w-[90vw] max-w-sm -translate-x-1/2 translate-y-1/2 lg:hidden">
        <div className="rounded-xl bg-[#F4E7C7] bg-[url('/images/bgCtaStoreLight.png')] p-5 text-[#5B371F] shadow-xl flex flex-col items-center justify-center text-center gap-2">
          <p className="text-4xl font-black ">10% OFF</p>

          <p className="mt-1 text-sm">
            Em toda a loja usando o cupom{' '}
            <span className="font-black">{DISCOUNT_CODE}</span>
          </p>

          <Button
            asChild
            className="mt-4 w-full rounded-xl bg-primary py-6 font-black text-[#3A2C22] shadow-[0_10px_25px_rgba(245,191,95,0.45)] transition-all hover:bg-primary-hover active:scale-[0.98]"
          >
            <Link href="/store">Comprar Agora</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
