"use client";

import { useEffect, useState } from "react";
import CartaoDepoimento from "@/components/depoimentos/CartaoDepoimento";
import ControlosCarrossel from "@/components/depoimentos/ControlosCarrossel";
import type { Depoimento } from "@/lib/depoimentos-exemplo";
import { cn } from "@/lib/utils";

const INTERVALO = 5000;

/** Quantos cartões cabem: 1 no telemóvel, 2 no tablet, 3 no computador. */
function usePorVista() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const atualizar = () =>
      setN(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    atualizar();
    window.addEventListener("resize", atualizar);
    return () => window.removeEventListener("resize", atualizar);
  }, []);
  return n;
}

/** Carrossel de depoimentos: avança sozinho (pára com o rato por cima), setas e pontos. */
export default function CarrosselDepoimentos({
  depoimentos,
}: {
  depoimentos: Depoimento[];
}) {
  const porVista = usePorVista();
  const paginas = Math.max(depoimentos.length - porVista + 1, 1);
  const [indice, setIndice] = useState(0);
  const [pausa, setPausa] = useState(false);
  const atual = indice % paginas;

  useEffect(() => {
    if (pausa || paginas < 2) return;
    const id = setInterval(
      () => setIndice((i) => (i + 1) % paginas),
      INTERVALO,
    );
    return () => clearInterval(id);
  }, [pausa, paginas]);

  const ir = (i: number) => setIndice((i + paginas) % paginas);

  return (
    <div
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      className="flex flex-col gap-6"
    >
      <div className="-mx-2.5 overflow-hidden py-2">
        <ul
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${(atual * 100) / porVista}%)` }}
        >
          {depoimentos.map((d, i) => {
            const visivel = i >= atual && i < atual + porVista;
            return (
              <li
                key={d.nome + i}
                aria-hidden={!visivel}
                className={cn(
                  "shrink-0 px-2.5 transition-[opacity,transform] duration-700",
                  visivel ? "scale-100 opacity-100" : "scale-95 opacity-40",
                )}
                style={{ width: `${100 / porVista}%` }}
              >
                <CartaoDepoimento d={d} />
              </li>
            );
          })}
        </ul>
      </div>

      <ControlosCarrossel paginas={paginas} atual={atual} onIr={ir} />
    </div>
  );
}
