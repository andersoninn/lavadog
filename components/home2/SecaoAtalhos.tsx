import { Cat, Dog, Rabbit } from "lucide-react";
import CartaoAnimal, { type Animal } from "./CartaoAnimal";
import CartaoDestaque, { type Destaque } from "./CartaoDestaque";

const ANIMAIS: Animal[] = [
  { nome: "Gato", href: "/store?animal=Gatos", icone: Cat, imagem: "/images/home/gato.png", tamanho: "h-[96%] w-[46%]" },
  { nome: "Cão", href: "/store?animal=Cães", icone: Dog, imagem: "/images/home/cao.png" },
  { nome: "Outros", href: "/store?animal=outros", icone: Rabbit, imagem: "/images/home/outros.png", tamanho: "h-[82%] w-[42%]" },
];

const DESTAQUES: Destaque[] = [
  {
    titulo: "Numa seleção de alimentação Premium",
    href: "/store?categoria=Ração",
    imagem: "/images/petToys.png",
    alt: "Taças com ração e acessórios para pets",
    selo: "Premium",
    fundo: "bg-primary-soft",
    corSelo: "text-primary [&>span]:text-primary-foreground",
  },
  {
    titulo: "Descontos exclusivos online",
    href: "/store?promo=true",
    imagem: "/images/dogAndBall.png",
    alt: "Cachorro a brincar com uma bola",
    selo: "Só online",
    fundo: "bg-blue-soft",
    corSelo: "text-blue-strong [&>span]:text-white",
  },
];

/** Atalhos logo abaixo do herói: espécies e dois destaques da loja. */
export default function SecaoAtalhos() {
  return (
    <section aria-label="Atalhos da loja" className="mx-auto w-full max-w-7xl px-6 pt-16 pb-8 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-3">
        {ANIMAIS.map((a) => (
          <CartaoAnimal key={a.nome} animal={a} />
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-5">
        {DESTAQUES.map((d) => (
          <CartaoDestaque key={d.titulo} d={d} />
        ))}
      </div>
    </section>
  );
}
