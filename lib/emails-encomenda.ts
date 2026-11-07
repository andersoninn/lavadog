import "server-only";
import { enviarEmail } from "@/lib/email";
import { EMPRESA } from "@/lib/empresa";
import { formatPrice } from "@/lib/store-data";
import type { Encomenda } from "@/lib/encomendas";

/** Os emails da encomenda: confirmação, aguarda pagamento, enviada, e o aviso à loja. */

const esc = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function moldura(titulo: string, corpo: string) {
  return `<!doctype html><html lang="pt"><body style="margin:0;background:#fdfaf5;font-family:Arial,Helvetica,sans-serif;color:#221b14">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
<p style="font-size:20px;font-weight:bold;margin:0 0 24px">LavaDog Store</p>
<div style="background:#ffffff;border-radius:16px;padding:28px">
<h1 style="font-size:20px;margin:0 0 16px">${titulo}</h1>${corpo}</div>
<p style="font-size:12px;color:#7a6e63;margin-top:24px;line-height:1.6">${EMPRESA.nomeComercial} · ${EMPRESA.morada}<br>
${EMPRESA.email} · ${EMPRESA.telefone}</p></div></body></html>`;
}

function resumo(e: Encomenda) {
  const linhas = e.itens
    .map(
      (i) => `<tr><td style="padding:6px 0">${i.quantidade}× ${esc(i.nome)}${i.opcao ? `<br><span style="color:#7a6e63;font-size:12px">${esc(i.opcao)}</span>` : ""}</td>
<td style="padding:6px 0;text-align:right;white-space:nowrap">${formatPrice(i.total)}</td></tr>`,
    )
    .join("");
  const extra = [
    e.desconto ? `<tr><td>Desconto</td><td style="text-align:right">−${formatPrice(e.desconto)}</td></tr>` : "",
    e.portes ? `<tr><td>Portes</td><td style="text-align:right">${formatPrice(e.portes)}</td></tr>` : "",
  ].join("");
  return `<p style="margin:0 0 4px;color:#7a6e63;font-size:13px">Encomenda</p>
<p style="margin:0 0 20px;font-size:18px;font-weight:bold;letter-spacing:1px">${e.numero}</p>
<table style="width:100%;border-collapse:collapse;font-size:14px">${linhas}${extra}
<tr><td style="padding-top:10px;border-top:1px solid #eee;font-weight:bold">Total</td>
<td style="padding-top:10px;border-top:1px solid #eee;text-align:right;font-weight:bold">${formatPrice(e.total)}</td></tr></table>
${e.morada.length ? `<p style="margin:20px 0 4px;color:#7a6e63;font-size:13px">Entrega</p><p style="margin:0;font-size:14px;line-height:1.5">${esc(e.nome)}<br>${e.morada.map(esc).join("<br>")}</p>` : ""}`;
}

const p = (t: string) => `<p style="font-size:14px;line-height:1.6;margin:0 0 16px">${t}</p>`;

export async function emailConfirmacao(e: Encomenda) {
  if (!e.email) return;
  await enviarEmail({
    para: e.email,
    responderPara: EMPRESA.email,
    assunto: `Encomenda ${e.numero} confirmada`,
    html: moldura(
      "Obrigado pela sua compra!",
      p("O pagamento foi confirmado e já estamos a preparar a sua encomenda. Avisamos por email quando ela sair.") + resumo(e),
    ),
  });
}

export async function emailAguardaPagamento(e: Encomenda) {
  if (!e.email) return;
  await enviarEmail({
    para: e.email,
    responderPara: EMPRESA.email,
    assunto: `Encomenda ${e.numero} recebida – aguarda pagamento`,
    html: moldura(
      "Recebemos a sua encomenda",
      p("Assim que o pagamento da referência Multibanco for confirmado, enviamos-lhe a confirmação e preparamos a encomenda.") + resumo(e),
    ),
  });
}

export async function emailEnviada(e: Encomenda, seguimento: string | null) {
  if (!e.email) return;
  await enviarEmail({
    para: e.email,
    responderPara: EMPRESA.email,
    assunto: `A sua encomenda ${e.numero} foi enviada`,
    html: moldura(
      "A sua encomenda está a caminho!",
      p("A sua encomenda saiu hoje da nossa loja.") +
        (seguimento ? p(`Código de seguimento: <strong>${esc(seguimento)}</strong>`) : "") +
        resumo(e),
    ),
  });
}

export async function emailNovaEncomendaLoja(e: Encomenda) {
  const contacto = [
    e.email && `Email: ${esc(e.email)}`,
    e.telefone && `Telefone: ${esc(e.telefone)}`,
    `NIF para fatura: ${e.nif ? esc(e.nif) : "não indicado (consumidor final)"}`,
  ].filter(Boolean);
  await enviarEmail({
    para: EMPRESA.email,
    responderPara: e.email ?? undefined,
    assunto: `Nova encomenda ${e.numero} – ${formatPrice(e.total)}`,
    html: moldura("Nova encomenda paga", p(contacto.join("<br>")) + resumo(e) + p("<br>Lembrete: emitir a fatura.")),
  });
}
