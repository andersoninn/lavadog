import type { Metadata } from "next";
import { Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginAdmin from "@/components/admin/LoginAdmin";
import CartaoEncomenda from "@/components/admin/CartaoEncomenda";
import ResumoEncomendas from "@/components/admin/ResumoEncomendas";
import { estaAutenticado, sairAdmin } from "@/lib/admin";
import { getCurrentCart } from "@/lib/cart-actions";
import { listarEncomendas } from "@/lib/lista-encomendas";
import type { Encomenda } from "@/lib/encomendas";

export const metadata: Metadata = { title: "Encomendas", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function EncomendasAdminPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  const [autenticado, cart] = await Promise.all([estaAutenticado(), getCurrentCart().catch(() => null)]);

  let encomendas: Encomenda[] = [];
  let falhou = false;
  if (autenticado) {
    try {
      encomendas = await listarEncomendas();
    } catch (error) {
      console.error("Admin: falha ao listar encomendas", error);
      falhou = true;
    }
  }

  return (
    <>
      <Navbar cartCount={cart?.totalQuantity ?? 0} />
      <main className="fundo-paginas flex-1">
        <div className="mx-auto w-full max-w-5xl px-6 pt-32 pb-24 sm:px-10 lg:px-16">
          {!autenticado ? (
            <LoginAdmin erro={erro === "1"} />
          ) : (
            <>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Encomendas</h1>
                <form action={sairAdmin}>
                  <button type="submit" className="text-sm font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground">
                    Sair
                  </button>
                </form>
              </div>

              <ResumoEncomendas encomendas={encomendas} />

              {falhou && (
                <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Não foi possível ler as encomendas do Stripe. Tente novamente em instantes.
                </p>
              )}

              {!falhou && encomendas.length === 0 ? (
                <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-24 text-center">
                  <Package className="size-10 text-muted-foreground" />
                  <p className="font-semibold text-foreground">Ainda não há encomendas</p>
                  <p className="text-sm text-muted-foreground">As novas encomendas pagas aparecem aqui.</p>
                </div>
              ) : (
                <div className="mt-8 flex flex-col gap-3">
                  {encomendas.map((e) => (
                    <CartaoEncomenda key={e.sessaoId} enc={e} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
