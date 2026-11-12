export type SlideHero = {
  titulo: string;
  texto: string;
  cta: string;
  href: string;
  /** Classe de fundo do tema (nunca hex direto). */
  fundo: string;
  imagens: { src: string; alt: string; ajuste?: "cover" | "contain" }[];
};

/** Slides do herói. Trocar as fotos pelas da Carol quando houver. */
export const SLIDES_HERO: SlideHero[] = [
  {
    titulo: "Tudo para o seu melhor amigo",
    texto: "Rações, snacks, brinquedos e acessórios, com entrega em todo Portugal.",
    cta: "Comprar",
    href: "/store",
    fundo: "bg-primary-soft",
    imagens: [
      { src: "/images/dogAndBall.png", alt: "Cachorro a brincar com uma bola" },
      { src: "/images/petToys.png", alt: "Taças, ração, trela e escova para pets" },
    ],
  },
  {
    titulo: "Mimos para o seu gato",
    texto: "Alimentação de qualidade e cuidados para cada fase da vida.",
    cta: "Ver produtos para gato",
    href: "/store?animal=Gatos",
    fundo: "bg-blue-soft",
    imagens: [{ src: "/images/catAndFood.png", alt: "Gato ao lado de uma taça de ração" }],
  },
  {
    titulo: "Passeios com estilo",
    texto: "Peitorais, trelas e coleiras confortáveis para o dia a dia.",
    cta: "Ver acessórios",
    href: "/store",
    fundo: "bg-primary-soft",
    imagens: [{ src: "/images/dogCtaStore.png", alt: "Cão com peitoral florido", ajuste: "contain" }],
  },
];
