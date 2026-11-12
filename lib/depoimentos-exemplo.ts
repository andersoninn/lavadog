/**
 * Depoimentos de exemplo, mostrados enquanto a API do Google Business não
 * está ligada (GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID). Quando houver
 * avaliações reais, o site usa essas e ignora estas.
 */

export const avatar = (nome: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=fdf3e2&color=6D4B31&size=256&bold=true`;

export const DEPOIMENTOS_EXEMPLO = [
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
