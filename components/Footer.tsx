"use client";

import Link from "next/link";
import { ArrowUp, Facebook, Instagram, Linkedin } from "lucide-react";

const companyLinks = [
  { label: "Quem Somos", href: "#sobre" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
  { label: "Nossos Produtos", href: "#store" },
  { label: "Nossas Lojas", href: "#store" },
  { label: "Central de Ajuda", href: "#contato" },
  { label: "Novidades", href: "#depoimentos" },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative flex h-full w-full items-center bg-foreground px-6 text-background sm:px-12 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="text-xl font-bold">LavaDog Store</p>
          <p className="mt-3 max-w-xs text-sm text-background/70">
            Mais que um pet shop, um lugar de amor e cuidado.
          </p>
          <div className="mt-6 flex max-w-xs items-center gap-2 border-b border-background/30 pb-2">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full bg-transparent text-sm text-background placeholder:text-background/50 focus:outline-none"
            />
            <button
              type="button"
              className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground"
            >
              Inscrever-se
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">Empresa</p>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-background">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Contato</p>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li>Rua das Flores, 123 - São Paulo, SP</li>
            <li>+55 11 0000-0000</li>
            <li>contato@lavadogstore.com</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <Link href="#" aria-label="Facebook" className="text-background/70 hover:text-background">
              <Facebook className="size-4" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-background/70 hover:text-background">
              <Linkedin className="size-4" />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-background/70 hover:text-background">
              <Instagram className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-6 bottom-6 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <ArrowUp className="size-4" />
      </button>
    </footer>
  );
}
