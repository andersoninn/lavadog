import { INSTAGRAM_HREF } from "@/lib/constants";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Store", href: "/store" },
  { label: "Promoções", href: "/#store-promo-banner" },
  // { label: "Quem Somos", href: "#sobre" },
  { label: "Novidades", href: INSTAGRAM_HREF, external: true },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Contatos", href: "/#footer" },
];
