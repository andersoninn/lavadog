'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Promocao } from '@/lib/promocoes';

/**
 * O cartão amarelo do banner da home (StorePromoBanner).
 *
 * - Um cupão ativo no Stripe → mostra esse cupão.
 * - Vários → roda entre eles a cada 4 s (pára com o rato por cima), com
 *   pontos para escolher.
 * - Nenhum → mostra um convite para a loja.
 *
 * O desktop e o telemóvel têm o mesmo conteúdo com layouts diferentes.
 */

const INTERVALO = 4000;

const SEM_CUPAO = {
  destaque: 'Explore',
  linha1: 'Rações, brinquedos e acessórios',
  linha2: 'para o seu melhor amigo',
  botao: 'Ver a Loja',
};

function useRotacao(total: number) {
  const [indice, setIndice] = useState(0);
  const [pausa, setPausa] = useState(false);

  useEffect(() => {
    if (total < 2 || pausa) return;
    const id = setInterval(() => setIndice((i) => (i + 1) % total), INTERVALO);
    return () => clearInterval(id);
  }, [total, pausa]);

  return { indice: total ? indice % total : 0, setIndice, setPausa };
}

function Pontos({ total, indice, onEscolher }: { total: number; indice: number; onEscolher: (i: number) => void }) {
  if (total < 2) return null;
  return (
    <div className="flex justify-center gap-1.5" role="tablist" aria-label="Cupões">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === indice}
          aria-label={`Cupão ${i + 1}`}
          onClick={() => onEscolher(i)}
          className={cn(
            'h-1.5 rounded-full transition-all',
            i === indice ? 'w-5 bg-[#5B371F]' : 'w-1.5 bg-[#5B371F]/30 hover:bg-[#5B371F]/50',
          )}
        />
      ))}
    </div>
  );
}

export default function PromoCartao({
  promocoes,
  variante,
}: {
  promocoes: Promocao[];
  variante: 'desktop' | 'mobile';
}) {
  const { indice, setIndice, setPausa } = useRotacao(promocoes.length);
  const atual = promocoes[indice];
  const desktop = variante === 'desktop';

  const destaque = atual ? atual.desconto : SEM_CUPAO.destaque;
  const botao = atual ? 'Comprar Agora' : SEM_CUPAO.botao;

  return (
    <div
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      className={cn('flex flex-col gap-4', desktop ? 'w-full' : 'items-center text-center')}
    >
      <div className={cn(desktop ? 'flex items-center justify-between gap-6' : 'flex flex-col items-center gap-2')}>
        {/* key: ao mudar de cupão, o conteúdo entra com fade */}
        <div
          key={atual?.codigo ?? 'sem-cupao'}
          className={cn(
            'animate-in fade-in duration-500',
            desktop ? 'flex min-w-0 flex-1 items-center gap-6' : 'flex flex-col items-center gap-2',
          )}
        >
          <p
            className={cn(
              'shrink-0 font-black leading-none whitespace-nowrap text-[#5B371F]',
              desktop ? 'text-6xl' : 'text-4xl uppercase',
            )}
          >
            {destaque}
          </p>

          {desktop ? (
            <div className="mt-2 flex min-w-0 flex-col text-xl leading-snug font-semibold text-[#6D4B31]">
              <span>{atual ? atual.condicao : SEM_CUPAO.linha1}</span>
              <span className={cn(atual && 'font-black tracking-wide')}>
                {atual ? `cupom ${atual.codigo}` : SEM_CUPAO.linha2}
              </span>
            </div>
          ) : (
            <p className="mt-1 text-sm text-[#5B371F]">
              {atual ? (
                <>
                  {atual.condicao} cupom <span className="font-black">{atual.codigo}</span>
                </>
              ) : (
                `${SEM_CUPAO.linha1} ${SEM_CUPAO.linha2}`
              )}
            </p>
          )}
        </div>

        {desktop && (
          <Button
            asChild
            className="shrink-0 rounded-full bg-primary px-10 py-6 text-base font-bold text-[#3A2C22] shadow-[0_10px_25px_rgba(245,191,95,0.45)] transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_14px_30px_rgba(245,191,95,0.55)]"
          >
            <Link href="/store">{botao}</Link>
          </Button>
        )}
      </div>

      <Pontos total={promocoes.length} indice={indice} onEscolher={setIndice} />

      {!desktop && (
        <Button
          asChild
          className="w-full rounded-xl bg-primary py-6 font-black text-[#3A2C22] shadow-[0_10px_25px_rgba(245,191,95,0.45)] transition-all hover:bg-primary-hover active:scale-[0.98]"
        >
          <Link href="/store">{botao}</Link>
        </Button>
      )}
    </div>
  );
}
