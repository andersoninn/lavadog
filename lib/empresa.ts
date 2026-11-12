/**
 * Identificação do vendedor — obrigatória no comércio eletrónico
 * (páginas legais e rodapé). Alterar aqui atualiza o site todo.
 */
export const EMPRESA = {
  nomeComercial: "LavaDog Store",
  titular: "Caroline Souza de Queiroz",
  nif: "317793233",
  morada: "Rua 16 de Maio, 41, Loja 41, 4785-607 Trofa, Portugal",
  email: "lavadogstorept@gmail.com",
  telefone: "+351 926 777 360",
};

export const LIVRO_RECLAMACOES_HREF = "https://www.livroreclamacoes.pt/Inicio/";

/** Entidades de Resolução Alternativa de Litígios de consumo (RAL). */
export const ENTIDADES_RAL = [
  {
    nome: "CICAP – Centro de Informação de Consumo e Arbitragem do Porto",
    site: "https://www.cicap.pt",
  },
  {
    nome: "CNIACC – Centro Nacional de Informação e Arbitragem de Conflitos de Consumo",
    site: "https://www.cniacc.pt",
  },
];

export const LISTA_RAL_HREF = "https://www.consumidor.gov.pt";

/**
 * Prazos de entrega em dias úteis, por zona (mostrados na página do produto).
 * PENDENTE: confirmar com a Carol quando escolher a transportadora.
 */
export const PRAZOS_ENTREGA = {
  Continente: { min: 2, max: 4 },
  Madeira: { min: 4, max: 7 },
  Açores: { min: 4, max: 7 },
} as const;

export const MAPA_LOJA_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "LavaDog Store, Rua 16 de Maio 41, 4785-607 Trofa",
)}`;
