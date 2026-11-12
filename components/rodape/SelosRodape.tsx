import {
  CreditCard,
  Landmark,
  Lock,
  ShieldCheck,
  Smartphone,
  Truck,
  Wallet,
} from "lucide-react";

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

// Formas de pagamento com ícones genéricos (sem logótipos de marcas).
const PAGAMENTOS = [
  { nome: "Cartão", icone: CreditCard },
  { nome: "MB WAY", icone: Smartphone },
  { nome: "Multibanco", icone: Landmark },
  { nome: "Apple Pay", icone: Wallet },
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
        {PAGAMENTOS.map(({ nome, icone: Icone }) => (
          <li
            key={nome}
            className="flex items-center gap-2 rounded-md bg-background px-4 py-2 text-sm font-extrabold text-foreground"
          >
            <Icone className="size-5 text-primary-hover" strokeWidth={2} />
            {nome}
          </li>
        ))}
      </ul>
    </div>
  );
}
