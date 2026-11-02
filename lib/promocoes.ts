/**
 * Os cupões do Stripe, já no formato que o banner da home mostra
 * (components/StorePromoBanner.tsx). Fica fora de lib/stripe.ts porque o
 * banner corre no browser e lib/stripe.ts só pode correr no servidor.
 */
export type Promocao = {
  /** O código que o cliente escreve no pagamento (ex.: LAVADOG10). */
  codigo: string;
  /** O destaque grande: "10% off" ou "5 € off". */
  desconto: string;
  /** Onde vale o desconto: "Em toda a loja", "Em compras acima de 30 €"… (o cartão acrescenta "com o cupom CÓDIGO"). */
  condicao: string;
};
