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
  searchParams: Promise<{ pendente?: string }>;
}) {
  const { pendente } = await searchParams;

  return (
    <>
      <Navbar cartCount={0} />
      <main className="flex-1">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center px-6 pt-36 pb-24 text-center">
          <CheckCircle2 className="size-12 text-primary" />
          <h1 className="mt-5 text-2xl font-bold text-foreground sm:text-3xl">Obrigado pela sua compra!</h1>
          <p className="mt-3 text-muted-foreground">
            {pendente
              ? "A sua encomenda foi registada. Assim que o pagamento for confirmado, enviamos-lhe um email com o recibo."
              : "O pagamento foi confirmado. Enviámos o recibo para o seu email e vamos preparar a sua encomenda."}
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
