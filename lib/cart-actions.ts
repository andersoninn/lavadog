"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  cartCreate,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  getCart,
  type ShopifyCart,
} from "@/lib/shopify";

const CART_COOKIE = "cartId";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

async function readCartId(): Promise<string | null> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value ?? null;
}

async function persistCartId(cartId: string) {
  const store = await cookies();
  store.set(CART_COOKIE, cartId, {
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

/** Lê o carrinho atual (via cookie). Retorna null se não houver carrinho ainda. */
export async function getCurrentCart(): Promise<ShopifyCart | null> {
  const cartId = await readCartId();
  if (!cartId) return null;

  try {
    return await getCart(cartId);
  } catch {
    // Carrinho expirado/inválido na Shopify — tratamos como vazio.
    return null;
  }
}

export async function addToCart(variantId: string, quantity = 1): Promise<void> {
  const cartId = await readCartId();

  let cart: ShopifyCart;
  if (!cartId) {
    cart = await cartCreate([{ merchandiseId: variantId, quantity }]);
  } else {
    try {
      cart = await cartLinesAdd(cartId, [{ merchandiseId: variantId, quantity }]);
    } catch {
      // Cookie apontava pra um carrinho que não existe mais na Shopify.
      cart = await cartCreate([{ merchandiseId: variantId, quantity }]);
    }
  }

  await persistCartId(cart.id);
  revalidatePath("/", "layout");
}

export async function updateCartLine(lineId: string, quantity: number): Promise<void> {
  const cartId = await readCartId();
  if (!cartId) return;

  if (quantity <= 0) {
    await cartLinesRemove(cartId, [lineId]);
  } else {
    await cartLinesUpdate(cartId, [{ id: lineId, quantity }]);
  }

  revalidatePath("/", "layout");
}

export async function removeCartLine(lineId: string): Promise<void> {
  const cartId = await readCartId();
  if (!cartId) return;

  await cartLinesRemove(cartId, [lineId]);
  revalidatePath("/", "layout");
}
