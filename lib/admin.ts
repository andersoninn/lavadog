"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { lerEncomenda, marcar } from "@/lib/encomendas";
import { emailEnviada } from "@/lib/emails-encomenda";

/**
 * Painel interno /admin/encomendas — protegido por uma palavra-passe
 * (variável ADMIN_PASSWORD). O cookie guarda só um hash, nunca a palavra-passe.
 */

const COOKIE = "admin_lavadog";

// Espaços no início/fim (comuns ao copiar e colar) não contam.
const senhaConfigurada = () => process.env.ADMIN_PASSWORD?.trim() || null;

function token(): string | null {
  const senha = senhaConfigurada();
  return senha ? createHash("sha256").update(`lavadog-admin:${senha}`).digest("hex") : null;
}

export async function estaAutenticado(): Promise<boolean> {
  const esperado = token();
  const atual = (await cookies()).get(COOKIE)?.value;
  if (!esperado || !atual || atual.length !== esperado.length) return false;
  return timingSafeEqual(Buffer.from(atual), Buffer.from(esperado));
}

export async function entrarAdmin(formData: FormData) {
  const senha = String(formData.get("senha") ?? "").trim();
  const esperado = token();
  if (!esperado || senha !== senhaConfigurada()) {
    redirect("/admin/encomendas?erro=1");
  }
  (await cookies()).set(COOKIE, esperado, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin/encomendas");
}

export async function sairAdmin() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
  redirect("/admin/encomendas");
}

/** Marca a encomenda como enviada e manda o email ao cliente (com o código de seguimento, se houver). */
export async function marcarEnviada(formData: FormData) {
  if (!(await estaAutenticado())) redirect("/admin/encomendas");
  const sessaoId = String(formData.get("sessao") ?? "");
  const seguimento = String(formData.get("seguimento") ?? "").trim().slice(0, 100) || null;
  if (!sessaoId.startsWith("cs_")) return;

  const enc = await lerEncomenda(sessaoId);
  if (!enc.pago || enc.enviadoEm) return;
  await marcar(enc, { enviado_em: new Date().toISOString(), seguimento: seguimento ?? "" });
  await emailEnviada(enc, seguimento);
  revalidatePath("/admin/encomendas");
}
