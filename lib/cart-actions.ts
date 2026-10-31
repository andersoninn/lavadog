"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type Stripe from "stripe";
import { getPrices, stripe } from "@/lib/stripe";
import { opcoesDoPreco } from "@/lib/stripe-opcoes";

/**
 * O carrinho vive num cookie do próprio site: uma lista de { preço, quantidade }.
 * O Stripe não tem carrinho; os nomes, fotos e valores são lidos do Stripe na
 * hora (assim um preço mudado no painel aparece logo certo no carrinho).
 *
 * No fim, `finalizarCompra` cria uma sessão do Stripe Checkout com estas
 * linhas e manda o cliente para a página de pagamento do Stripe.
 */

const CART_COOKIE = "carrinho";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias
const MAX_QTD = 99;

type LinhaGuardada = { p: string; q: number };

export type CartLine = {
  /** O id do preço no Stripe (é também o id da linha). */
  id: string;
  quantity: number;
  title: string;
  /** "Tamanho: M" quando o produto tem variantes. */
  variantTitle: string | null;
  image: { url: string; altText: string | null } | null;
  unitPrice: number;
  total: number;
};

export type Cart = {
  totalQuantity: number;
  subtotal: number;
  lines: CartLine[];
};

async function lerLinhas(): Promise<LinhaGuardada[]> {
  const store = await cookies();
  const raw = store.get(CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    const dados = JSON.parse(raw);
    if (!Array.isArray(dados)) return [];
    return dados
      .filter((l) => typeof l?.p === "string" && Number.isInteger(l?.q) && l.q > 0)
      .map((l) => ({ p: l.p, q: Math.min(l.q, MAX_QTD) }));
  } catch {
    return [];
  }
}

async function guardarLinhas(linhas: LinhaGuardada[]) {
  const store = await cookies();
  if (linhas.length === 0) {
    store.delete(CART_COOKIE);
    return;
  }
  store.set(CART_COOKIE, JSON.stringify(linhas), {
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    path: "/",
  });
}

/** Lê o carrinho atual. Retorna null se estiver vazio. */
export async function getCurrentCart(): Promise<Cart | null> {
  const linhas = await lerLinhas();
  if (linhas.length === 0) return null;

  const precos = await getPrices(linhas.map((l) => l.p));
  const porId = new Map(precos.map((p) => [p.id, p]));

  const lines: CartLine[] = linhas.flatMap((l) => {
    const preco = porId.get(l.p);
    if (!preco) return []; // produto apagado ou desativado no painel
    const produto = preco.product as Stripe.Product;
    const opcoes = opcoesDoPreco(preco);
    const unitPrice = (preco.unit_amount ?? 0) / 100;
    return [
      {
        id: preco.id,
        quantity: l.q,
        title: produto.name,
        variantTitle: opcoes.length ? opcoes.map((o) => `${o.name}: ${o.value}`).join(" · ") : null,
        image: produto.images?.[0] ? { url: produto.images[0], altText: produto.name } : null,
        unitPrice,
        total: unitPrice * l.q,
      },
    ];
  });

  if (lines.length === 0) return null;
  return {
    lines,
    totalQuantity: lines.reduce((t, l) => t + l.quantity, 0),
    subtotal: lines.reduce((t, l) => t + l.total, 0),
  };
}

export async function addToCart(priceId: string, quantity = 1): Promise<void> {
  const linhas = await lerLinhas();
  const existente = linhas.find((l) => l.p === priceId);
  if (existente) existente.q = Math.min(existente.q + quantity, MAX_QTD);
  else linhas.push({ p: priceId, q: Math.min(quantity, MAX_QTD) });
  await guardarLinhas(linhas);
  revalidatePath("/", "layout");
}

export async function updateCartLine(priceId: string, quantity: number): Promise<void> {
  const linhas = await lerLinhas();
  const novas =
    quantity <= 0
      ? linhas.filter((l) => l.p !== priceId)
      : linhas.map((l) => (l.p === priceId ? { ...l, q: Math.min(quantity, MAX_QTD) } : l));
  await guardarLinhas(novas);
  revalidatePath("/", "layout");
}

export async function removeCartLine(priceId: string): Promise<void> {
  await updateCartLine(priceId, 0);
}

/** Esvazia o carrinho (usado depois de um pagamento concluído). */
export async function limparCarrinho(): Promise<void> {
  await guardarLinhas([]);
}

/**
 * Cria a sessão do Stripe Checkout com o carrinho e envia o cliente para a
 * página de pagamento do Stripe. Os preços são relidos do Stripe aqui (nunca
 * se confia em valores vindos do browser).
 *
 * Portes: se STRIPE_SHIPPING_RATES tiver ids de tarifas de envio do painel
 * (separados por vírgulas), o cliente escolhe uma delas no checkout.
 * Os métodos de pagamento (cartão, MB WAY, Multibanco…) são os que estiverem
 * ativos no painel do Stripe.
 */
export async function finalizarCompra(): Promise<void> {
  const cart = await getCurrentCart();
  if (!cart) redirect("/carrinho");

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  const origem = `${proto}://${host}`;

  const tarifas = (process.env.STRIPE_SHIPPING_RATES ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const sessao = await stripe().checkout.sessions.create({
    mode: "payment",
    line_items: cart.lines.map((l) => ({ price: l.id, quantity: l.quantity })),
    locale: "pt",
    success_url: `${origem}/carrinho/concluido?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origem}/carrinho`,
    shipping_address_collection: { allowed_countries: ["PT"] },
    phone_number_collection: { enabled: true },
    billing_address_collection: "auto",
    ...(tarifas.length ? { shipping_options: tarifas.map((shipping_rate) => ({ shipping_rate })) } : {}),
  });

  if (!sessao.url) throw new Error("O Stripe não devolveu o link do checkout.");
  redirect(sessao.url);
}
