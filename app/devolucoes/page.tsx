import type { Metadata } from "next";
import PaginaLegal, { Seccao } from "@/components/legal/PaginaLegal";
import { EMPRESA } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Trocas e Devoluções",
  description: "Direito de livre resolução de 14 dias, trocas e garantia na LavaDog Store.",
  alternates: { canonical: "/devolucoes" },
};

export default function DevolucoesPage() {
  return (
    <PaginaLegal titulo="Trocas e Devoluções" atualizado="novembro de 2026">
      <Seccao titulo="Direito de livre resolução (14 dias)">
        <p>
          Pode desistir da compra, sem indicar motivo, no prazo de 14 dias a contar do dia em que recebe a encomenda.
          Para isso, envie-nos uma declaração clara a dizer que quer desistir (por exemplo, por email para{" "}
          <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>), indicando o número da encomenda.
        </p>
      </Seccao>

      <Seccao titulo="Como devolver">
        <ul>
          <li>Devolva os produtos no prazo de 14 dias a contar da comunicação da desistência;</li>
          <li>Os produtos devem vir em bom estado, sem uso além do necessário para os examinar;</li>
          <li>O custo da devolução é suportado pelo cliente, salvo se o produto vier com defeito ou trocado;</li>
          <li>Morada para devoluções: {EMPRESA.morada}.</li>
        </ul>
      </Seccao>

      <Seccao titulo="Reembolso">
        <p>
          Devolvemos todos os pagamentos recebidos, incluindo os portes de envio iniciais (no valor da modalidade de
          envio mais barata), no prazo de 14 dias após recebermos a comunicação de desistência. Podemos aguardar a
          receção dos produtos, ou a prova do seu envio, antes de reembolsar. O reembolso é feito pelo mesmo meio de
          pagamento usado na compra.
        </p>
      </Seccao>

      <Seccao titulo="Exceções">
        <p>Por razões de proteção da saúde e de higiene, não é possível desistir da compra de:</p>
        <ul>
          <li>Produtos selados (por exemplo alimentos, snacks e produtos de higiene) que tenham sido abertos;</li>
          <li>Produtos perecíveis ou com prazo de validade curto.</li>
        </ul>
      </Seccao>

      <Seccao titulo="Produtos com defeito (garantia)">
        <p>
          Os produtos têm a garantia legal de conformidade. Se receber um produto com defeito, danificado ou diferente
          do encomendado, contacte-nos com o número da encomenda e uma fotografia; resolvemos por troca, reparação ou
          reembolso, sem custos para si.
        </p>
      </Seccao>
    </PaginaLegal>
  );
}
