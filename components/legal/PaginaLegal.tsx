import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrentCart } from "@/lib/cart-actions";

/** Moldura comum das páginas legais (termos, privacidade, devoluções, envios). */
export default async function PaginaLegal({
  titulo,
  atualizado,
  children,
}: {
  titulo: string;
  atualizado: string;
  children: ReactNode;
}) {
  const cart = await getCurrentCart().catch(() => null);

  return (
    <>
      <Navbar cartCount={cart?.totalQuantity ?? 0} />
      <main className="fundo-paginas flex-1">
        <article className="mx-auto w-full max-w-3xl px-6 pt-32 pb-24 sm:px-10">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{titulo}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Última atualização: {atualizado}</p>
          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/85 [&_a]:font-medium [&_a]:text-blue-strong [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:font-semibold [&_h3]:text-foreground [&_ul>li]:ml-5 [&_ul>li]:list-disc [&_ol>li]:ml-5 [&_ol>li]:list-decimal [&_ol]:mt-2 [&_ol]:space-y-1 [&_p+p]:mt-3 [&_ul+p]:mt-3 [&_ol+p]:mt-3 [&_ul]:mt-2 [&_ul]:space-y-1">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export function Seccao({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section>
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}
