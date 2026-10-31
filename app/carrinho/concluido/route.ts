import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";

/**
 * O Stripe manda o cliente para aqui depois do pagamento
 * (success_url, com ?session_id=...). Confirma no Stripe que a sessão foi
 * mesmo paga, esvazia o carrinho e segue para a página de agradecimento.
 *
 * Com Multibanco o pagamento pode ficar pendente (a referência é paga
 * depois): o pedido está feito, por isso o carrinho também se esvazia.
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("session_id");
  const destino = new URL("/carrinho/obrigado", req.url);

  if (id) {
    try {
      const sessao = await stripe().checkout.sessions.retrieve(id);
      if (sessao.status === "complete") {
        if (sessao.payment_status !== "paid") destino.searchParams.set("pendente", "1");
        const resposta = NextResponse.redirect(destino);
        resposta.cookies.delete("carrinho");
        return resposta;
      }
    } catch (error) {
      console.error("Checkout: não foi possível confirmar a sessão", error);
    }
  }

  return NextResponse.redirect(new URL("/carrinho", req.url));
}
