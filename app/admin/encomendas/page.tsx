import type { Metadata } from "next";
import LoginAdmin from "@/components/admin/LoginAdmin";
import CartaoEncomenda from "@/components/admin/CartaoEncomenda";
import { estaAutenticado, sairAdmin } from "@/lib/admin";
import { listarEncomendas } from "@/lib/lista-encomendas";
import type { Encomenda } from "@/lib/encomendas";

export const metadata: Metadata = { title: "Encomendas", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function EncomendasAdminPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  if (!(await estaAutenticado())) return <LoginAdmin erro={erro === "1"} />;

  let encomendas: Encomenda[] = [];
  let falhou = false;
  try {
    encomendas = await listarEncomendas();
  } catch (error) {
    console.error("Admin: falha ao listar encomendas", error);
    falhou = true;
  }
  const porEnviar = encomendas.filter((e) => e.pago && !e.enviadoEm).length;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Encomendas</h1>
          <p className="text-sm text-muted-foreground">
            {porEnviar} por enviar · últimas {encomendas.length}
          </p>
        </div>
        <form action={sairAdmin}>
          <button type="submit" className="text-sm text-muted-foreground underline underline-offset-2">
            Sair
          </button>
        </form>
      </div>

      {falhou && <p className="mt-6 text-sm text-red-600">Não foi possível ler as encomendas do Stripe.</p>}
      {!falhou && encomendas.length === 0 && <p className="mt-6 text-sm text-muted-foreground">Ainda não há encomendas.</p>}

      <div className="mt-6 flex flex-col gap-4">
        {encomendas.map((e) => (
          <CartaoEncomenda key={e.sessaoId} enc={e} />
        ))}
      </div>
    </main>
  );
}
