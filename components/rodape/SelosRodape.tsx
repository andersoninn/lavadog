import Image from "next/image";
import { Lock, ShieldCheck, Truck, type LucideIcon } from "lucide-react";

const SELOS = [
  {
    icone: Lock,
    titulo: "Pagamento seguro",
    texto: "Várias formas de pagamento",
  },
  {
    icone: Truck,
    titulo: "Envios para todo o país",
    texto: "Receba a sua encomenda em casa",
  },
  {
    icone: ShieldCheck,
    titulo: "Compra 100% segura",
    texto: "Os seus dados estão protegidos",
  },
];

// Formas de pagamento: logótipo oficial quando a cliente o forneceu, senão ícone genérico.
type Pagamento = {
  nome: string;
  icone?: LucideIcon;
  logo?: { src: string; largura: number };
};
const PAGAMENTOS: Pagamento[] = [
  { nome: "Visa", logo: { src: "/images/pagamentos/visa.webp", largura: 40 } },
  {
    nome: "Mastercard",
    logo: { src: "/images/pagamentos/mastercard.svg", largura: 39 },
  },
  {
    nome: "MB WAY",
    logo: { src: "/images/pagamentos/mbway.webp", largura: 50 },
  },
  {
    nome: "Multibanco",
    logo: { src: "/images/pagamentos/multibanco.webp", largura: 84 },
  },
  {
    nome: "Apple Pay",
    logo: { src: "/images/pagamentos/applepay.webp", largura: 58 },
  },
  {
    nome: "Google Pay",
    logo: { src: "/images/pagamentos/googlepay.svg", largura: 60 },
  },
];

/** Linha de garantias e formas de pagamento do rodapé. */
export default function SelosRodape() {
  return (
    <div className="mx-auto mt-12 w-full max-w-6xl border-t border-background/15 pt-8">
      <ul className="grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-background/15">
        {SELOS.map(({ icone: Icone, titulo, texto }) => (
          <li
            key={titulo}
            className="flex items-center gap-3 sm:justify-center sm:px-4"
          >
            <Icone className="size-9 shrink-0 text-primary" strokeWidth={1.5} />
            <span className="leading-tight">
              <span className="block font-bold">{titulo}</span>
              <span className="block text-sm text-background/70">{texto}</span>
            </span>
          </li>
        ))}
      </ul>
      <ul
        className="mt-8 flex flex-wrap justify-center gap-3"
        aria-label="Formas de pagamento"
      >
        {PAGAMENTOS.map(({ nome, icone: Icone, logo }) => (
          <li
            key={nome}
            className="flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-extrabold text-foreground"
          >
            {logo ? (
              <Image
                src={logo.src}
                alt={nome}
                width={logo.largura}
                height={28}
                className="h-6 w-auto"
                unoptimized={logo.src.endsWith(".svg")}
              />
            ) : (
              <>
                {Icone && (
                  <Icone
                    className="size-5 text-primary-hover"
                    strokeWidth={2}
                  />
                )}
                {nome}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
