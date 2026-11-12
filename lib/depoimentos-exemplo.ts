/**
 * Depoimentos de exemplo, mostrados enquanto a API do Google Business não
 * está ligada (GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID). Quando houver
 * avaliações reais, o site usa essas e ignora estas.
 */

export type Depoimento = {
  nome: string;
  texto: string;
  estrelas: number;
  /** "Tutora do Thor", "há 2 meses"… */
  legenda: string;
  foto: string | null;
};

export const DEPOIMENTOS_EXEMPLO: Depoimento[] = [
  {
    nome: "Mariana Costa",
    legenda: "Tutora do Thor",
    estrelas: 5,
    foto: null,
    texto:
      "Produtos de excelente qualidade e o meu Thor adora a ração! O atendimento foi super atencioso e a entrega chegou muito rápido. Já sou cliente fiel da LavaDog!",
  },
  {
    nome: "Rui Ferreira",
    legenda: "Tutor da Luna",
    estrelas: 5,
    foto: null,
    texto:
      "Adorei a experiência de compra! O site é muito prático, os preços são ótimos e a encomenda chegou bem embalada. A Luna ficou encantada com o novo brinquedo!",
  },
  {
    nome: "Ana Martins",
    legenda: "Tutora do Bolt",
    estrelas: 5,
    foto: null,
    texto:
      "Atendimento impecável, sempre prontos a tirar dúvidas. Os acessórios têm muita qualidade e nota-se a preocupação com o bem-estar dos animais. Recomendo a 100%!",
  },
];
