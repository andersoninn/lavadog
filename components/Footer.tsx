"use client";

import { ArrowUp } from "lucide-react";
import ColunaLinks from "@/components/rodape/ColunaLinks";
import SelosRodape from "@/components/rodape/SelosRodape";
import MarcaRodape from "@/components/rodape/MarcaRodape";
import ContactoRodape from "@/components/rodape/ContactoRodape";
import { WHATSAPP_HREF, INSTAGRAM_HREF } from "@/lib/constants";
import { EMPRESA, LIVRO_RECLAMACOES_HREF } from "@/lib/empresa";

const EMPRESA_LINKS = [
  { label: "Home", href: "/" },
  { label: "Nossos Produtos", href: "/store" },
  { label: "Promoções", href: "/store?promo=true" },
  { label: "Novidades", href: INSTAGRAM_HREF, external: true },
  { label: "Central de ajuda", href: WHATSAPP_HREF, external: true },
];
const LEGAIS = [
  { label: "Termos e Condições", href: "/termos" },
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Trocas e Devoluções", href: "/devolucoes" },
  { label: "Envios e Portes", href: "/envios" },
];
const CATEGORIAS = ["Ração", "Acessórios", "Brinquedos", "Higiene"].map(
  (c) => ({
    label: c,
    href: `/store?categoria=${encodeURIComponent(c)}`,
  }),
);

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full bg-foreground px-6 pt-16 pb-8 text-background sm:px-12 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1.1fr_0.9fr_1.4fr]">
        <MarcaRodape />

        <ColunaLinks titulo="Empresa" links={EMPRESA_LINKS} />
        <ColunaLinks titulo="Informações" links={LEGAIS}>
          <a
            href={LIVRO_RECLAMACOES_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-md border border-background/40 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-background"
          >
            Livro de Reclamações
          </a>
        </ColunaLinks>
        <ColunaLinks titulo="Categorias" links={CATEGORIAS} />

        <ContactoRodape />
      </div>

      <SelosRodape />

      <div className="mx-auto mt-8 flex w-full max-w-6xl flex-col items-center gap-2 border-t border-background/15 pt-6 text-xs text-background/60 sm:flex-row sm:justify-between">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} {EMPRESA.nomeComercial} ·{" "}
          {EMPRESA.titular} · NIF {EMPRESA.nif}
        </p>
        <p>
          Desenvolvido por{" "}
          <a
            href="https://oaktechnologies.pt/"
            target="_blank"
            rel="noopener"
            className="font-semibold text-background/80 transition-colors hover:text-background"
          >
            Oak Technologies
          </a>
        </p>
      </div>

      <button
        type="button"
        aria-label="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-6 bottom-6 flex size-11 items-center justify-center rounded-full bg-primary text-foreground shadow-md"
      >
        <ArrowUp className="size-5" />
      </button>
    </footer>
  );
}
