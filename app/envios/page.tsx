import type { Metadata } from "next";
import PaginaLegal, { Seccao } from "@/components/legal/PaginaLegal";
import { EMPRESA } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Envios e Portes",
  description: "Zonas de entrega, prazos e portes das encomendas da LavaDog Store.",
  alternates: { canonical: "/envios" },
};

// PENDENTE: a Carol ainda está a definir os portes. Quando houver tarifas,
// trocar o texto da secção "Portes" pelos valores reais.
export default function EnviosPage() {
  return (
    <PaginaLegal titulo="Envios e Portes" atualizado="novembro de 2026">
      <Seccao titulo="Onde entregamos">
        <p>Enviamos para todo o território de Portugal (continente e ilhas).</p>
      </Seccao>

      <Seccao titulo="Portes">
        <p>
          O valor dos portes depende da morada de entrega e é sempre apresentado na página de pagamento, antes de
          confirmar a compra.
        </p>
      </Seccao>

      <Seccao titulo="Prazos">
        <p>
          As encomendas pagas são preparadas em até 2 dias úteis. Quando a encomenda sai, enviamos um email com o aviso
          de envio e, se existir, o código de seguimento da transportadora.
        </p>
        <p>
          Encomendas pagas por referência Multibanco só são preparadas depois de o pagamento ser confirmado.
        </p>
      </Seccao>


      <Seccao titulo="Problemas na entrega">
        <p>
          Se a encomenda chegar danificada ou não chegar no prazo indicado, contacte-nos por email (
          <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>) ou WhatsApp ({EMPRESA.telefone}).
        </p>
      </Seccao>
    </PaginaLegal>
  );
}
