import "server-only";

/**
 * Envio de emails pela API do Resend (plano grátis: 3.000/mês, 100/dia).
 *
 * Variáveis:
 *   RESEND_API_KEY   – chave do Resend (obrigatória para enviar)
 *   EMAIL_REMETENTE  – ex.: "LavaDog Store <encomendas@lavadogstore.pt>"
 *                      (o domínio tem de estar verificado no Resend)
 *
 * Sem RESEND_API_KEY não envia nada: só regista no log. Assim o site
 * funciona igual antes de o Resend estar configurado.
 */

type Email = { para: string; assunto: string; html: string; responderPara?: string };

export async function enviarEmail({ para, assunto, html, responderPara }: Email): Promise<boolean> {
  const chave = process.env.RESEND_API_KEY;
  const remetente = process.env.EMAIL_REMETENTE ?? "LavaDog Store <encomendas@lavadogstore.pt>";
  if (!chave) {
    console.warn(`Email não enviado (falta RESEND_API_KEY): "${assunto}" para ${para}`);
    return false;
  }

  try {
    const resposta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: remetente,
        to: [para],
        subject: assunto,
        html,
        ...(responderPara ? { reply_to: responderPara } : {}),
      }),
    });
    if (!resposta.ok) {
      console.error(`Resend recusou o email "${assunto}":`, resposta.status, await resposta.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error(`Falha ao enviar o email "${assunto}":`, error);
    return false;
  }
}
