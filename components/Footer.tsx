'use client';

import Link from 'next/link';
import { ArrowUp, Facebook, Instagram, Linkedin } from 'lucide-react';
import { WHATSAPP_HREF, INSTAGRAM_HREF } from '@/lib/constants';

const companyLinks = [
  { label: 'Home', href: '/' },
  { label: 'Nossos Produtos', href: '/store' },
  { label: 'Promoções', href: '/store?promo=true' },
  { label: 'Novidades', href: INSTAGRAM_HREF, external: true },
  { label: 'Central de ajuda', href: WHATSAPP_HREF, external: true },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full bg-foreground px-6 py-16 text-background sm:px-12 lg:px-20 lg:py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="text-xl font-bold">LavaDog Store</p>
          <p className="mt-3 max-w-xs text-sm text-background/70">
            Mais que um pet shop, um lugar de amor e cuidado.
          </p>
          {/* <div className="mt-6 flex max-w-xs items-center gap-2 border-b border-background/30 pb-2">
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
          </div> */}
        </div>

        <div>
          <p className="text-sm font-semibold">Empresa</p>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="transition-colors hover:text-background"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Contato</p>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li> Rua 16 de Maio 41 Santiago e Bougado, 4785-607 Trofa</li>
            <li>+351 926 777 360</li>
            {/* <li>contato@lavadogstore.com</li> */}
          </ul>
          <div className="mt-4 flex gap-3">
            <Link
              href="https://www.facebook.com/lavadogtere"
              aria-label="Facebook"
              className="text-background/70 hover:text-background"
              target="_blank"
            >
              <Facebook className="size-4" />
            </Link>
            {/* <Link
              href="#"
              aria-label="LinkedIn"
              className="text-background/70 hover:text-background"
            >
              <Linkedin className="size-4" />
            </Link> */}
            <Link
              href={INSTAGRAM_HREF}
              aria-label="Instagram"
              className="text-background/70 hover:text-background"
              target="_blank"
            >
              <Instagram className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col items-center gap-2 border-t border-background/20 pt-6 text-xs text-background/60 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} LavaDog Store. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por{' '}
          {/* TODO: trocar "#" pelo link real do site da Oak Technologies quando estiver disponível */}
          <Link
            href="#"
            className="font-semibold text-background/80 transition-colors hover:text-background"
          >
            Oak Technologies
          </Link>
        </p>
      </div>

      <button
        type="button"
        aria-label="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute right-6 bottom-6 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <ArrowUp className="size-4" />
      </button>
    </footer>
  );
}
