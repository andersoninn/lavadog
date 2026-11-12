import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Encomenda recebida",
  robots: { index: false, follow: true },
};

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ pendente?: string; encomenda?: string }>;
}) {
  const { pendente, encomenda } = await searchParams;
  const numero = encomenda && /^LD-\d{6}-[0-9A-Z]{5}$/.test(encomenda) ? encomenda : null;

  return (
    <>
      <Navbar cartCount={0} />
      <main className="fundo-paginas flex-1">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center px-6 pt-36 pb-24 text-center">
          <CheckCircle2 className="size-12 text-primary" />
          <h1 className="mt-5 text-2xl font-bold text-foreground sm:text-3xl">Obrigado pela sua compra!</h1>
          {numero && (
            <p className="mt-4 rounded-full bg-primary-soft px-4 py-1.5 text-sm font-semibold text-foreground">
              Encomenda <span className="tracking-wide">{numero}</span>
            </p>
          )}
          <p className="mt-3 text-muted-foreground">
            {pendente
              ? "A sua encomenda foi registada. Assim que o pagamento for confirmado, enviamos-lhe um email de confirmação."
              : "O pagamento foi confirmado. Enviámos a confirmação para o seu email e vamos preparar a sua encomenda."}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Alguma dúvida? Fale connosco pelo WhatsApp.</p>
          <Button asChild className="mt-8">
            <Link href="/store">Continuar a comprar</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
