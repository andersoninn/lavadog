import { INSTAGRAM_HREF } from "@/lib/constants";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  /** Mostra o link como botão amarelo (ex.: Loja). */
  destaque?: boolean;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Loja", href: "/store", destaque: true },
  { label: "Promoções", href: "/#store-promo-banner" },
  // { label: "Quem Somos", href: "#sobre" },
  { label: "Novidades", href: INSTAGRAM_HREF, external: true },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Contatos", href: "/#footer" },
];
