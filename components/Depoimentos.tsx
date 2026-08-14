import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const avatar = (nome: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=fdf3e2&color=6D4B31&size=256&bold=true`;

const depoimentos = [
  {
    quote:
      "Encontrei a LavaDog Store procurando produtos de confiança para o meu golden retriever. A equipe realmente entende do assunto e trata cada pet com muito carinho. Recomendo de olhos fechados.",
    name: "Mariana Silva",
    designation: "Tutora de Cachorro",
    src: avatar("Mariana Silva"),
  },
  {
    quote:
      "Desde que comecei a comprar na LavaDog Store, meu gato nunca esteve tão bem cuidado. Produtos de qualidade, entrega rápida e um atendimento que faz toda a diferença.",
    name: "Carlos Mendes",
    designation: "Tutor de Gato",
    src: avatar("Carlos Mendes"),
  },
  {
    quote:
      "O atendimento da LavaDog Store é impecável. Meu labrador sai sempre feliz com os produtos novos, e a equipe tem uma paciência incrível pra indicar o que é melhor pra ele. Virei cliente fiel.",
    name: "Beatriz Alves",
    designation: "Tutora de Cachorro",
    src: avatar("Beatriz Alves"),
  },
  {
    quote:
      "Adorei a variedade de produtos e a facilidade de comprar online. O desconto na primeira compra foi o empurrão que eu precisava, e agora não troco por nada.",
    name: "Rafael Santos",
    designation: "Tutor de Cachorro",
    src: avatar("Rafael Santos"),
  },
  {
    quote:
      "Atendimento humano, atencioso e que realmente ama animais. Sinto que a LavaDog Store cuida do meu pet como se fosse da família deles.",
    name: "Juliana Costa",
    designation: "Tutora de Gato",
    src: avatar("Juliana Costa"),
  },
];

export default function Depoimentos() {
  return (
    <div className="flex w-full flex-col items-center gap-6 bg-background px-6 py-4 sm:px-12 lg:px-20">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
          Depoimentos
        </span>
        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
          O Que Nossos Clientes Dizem
        </h2>
      </div>

      <CircularTestimonials
        testimonials={depoimentos}
        autoplay
        autoplayInterval={3000}
        colors={{
          name: "#221b14",
          designation: "#6D4B31",
          testimony: "#4b5563",
          arrowBackground: "#f5bf5f",
          arrowForeground: "#221b14",
          arrowHoverBackground: "#d5a652",
        }}
        fontSizes={{
          name: "1.375rem",
          designation: "0.9rem",
          quote: "1.05rem",
        }}
      />
    </div>
  );
}
