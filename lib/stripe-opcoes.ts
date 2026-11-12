import type Stripe from "stripe";
import { CHAVES_DE_CONTROLO } from "@/lib/stock";

/**
 * Fica num ficheiro à parte de lib/stripe.ts porque é usado por
 * lib/store-data.ts, que também é importado por componentes do browser — e
 * lib/stripe.ts só pode correr no servidor (tem a chave secreta).
 */

/** Opções escolhidas de um preço (variante): metadata do preço ou o apelido. */
export function opcoesDoPreco(preco: Stripe.Price): { name: string; value: string }[] {
  // "esgotado", "stock" e "peso" são de controlo, não opções.
  const meta = Object.entries(preco.metadata ?? {}).filter(
    ([k, v]) => !CHAVES_DE_CONTROLO.includes(k) && v && v.trim(),
  );
  if (meta.length > 0) {
    return meta.map(([k, v]) => ({ name: k.charAt(0).toUpperCase() + k.slice(1), value: v.trim() }));
  }
  if (preco.nickname) {
    // "Tamanho: M" → { Tamanho, M }; "M" → { Opção, M }
    const [a, b] = preco.nickname.split(/:\s*/);
    return b ? [{ name: a.trim(), value: b.trim() }] : [{ name: "Opção", value: a.trim() }];
  }
  return [];
}
