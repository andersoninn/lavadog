import type { Metadata } from "next";
import PaginaLegal, { Seccao } from "@/components/legal/PaginaLegal";
import IdentificacaoVendedor from "@/components/legal/IdentificacaoVendedor";
import { EMPRESA } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a LavaDog Store trata os dados pessoais dos clientes (RGPD).",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <PaginaLegal titulo="Política de Privacidade" atualizado="novembro de 2026">
      <Seccao titulo="1. Responsável pelo tratamento">
        <IdentificacaoVendedor />
      </Seccao>

      <Seccao titulo="2. Que dados recolhemos">
        <ul>
          <li>Nome, email e telefone;</li>
          <li>Morada de entrega e, se indicada, morada de faturação e NIF;</li>
          <li>Produtos comprados e valores pagos.</li>
        </ul>
        <p>
          Os dados do cartão ou de outro meio de pagamento são recolhidos e tratados pelo Stripe e nunca chegam à
          LavaDog Store.
        </p>
      </Seccao>

      <Seccao titulo="3. Para que usamos os dados">
        <ul>
          <li>Processar a encomenda, fazer a entrega e emitir a fatura (execução do contrato);</li>
          <li>Enviar emails sobre a encomenda: confirmação e aviso de envio (execução do contrato);</li>
          <li>Cumprir obrigações fiscais e contabilísticas (obrigação legal).</li>
        </ul>
        <p>Não enviamos publicidade nem vendemos dados a terceiros.</p>
      </Seccao>

      <Seccao titulo="4. Com quem partilhamos">
        <ul>
          <li>Stripe – processamento de pagamentos;</li>
          <li>Resend – envio dos emails da encomenda;</li>
          <li>Transportadora – apenas os dados necessários à entrega;</li>
          <li>Fornecedor de alojamento do site.</li>
        </ul>
        <p>
          Alguns destes fornecedores podem tratar dados fora do Espaço Económico Europeu, com as garantias previstas
          no RGPD (por exemplo, cláusulas contratuais-tipo da Comissão Europeia).
        </p>
      </Seccao>

      <Seccao titulo="5. Durante quanto tempo">
        <p>
          Os dados das encomendas e faturas são guardados pelo prazo exigido pela lei fiscal (10 anos). Os restantes
          dados são apagados quando deixam de ser necessários.
        </p>
      </Seccao>

      <Seccao titulo="6. Cookies">
        <p>
          O site usa apenas um cookie essencial, que guarda o conteúdo do carrinho de compras durante 30 dias. Não
          usamos cookies de publicidade nem de análise.
        </p>
      </Seccao>

      <Seccao titulo="7. Os seus direitos">
        <p>
          Pode pedir acesso, correção, apagamento, limitação ou portabilidade dos seus dados, ou opor-se ao
          tratamento, escrevendo para <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>. Tem ainda o direito de
          apresentar reclamação à Comissão Nacional de Proteção de Dados (
          <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">
            www.cnpd.pt
          </a>
          ).
        </p>
      </Seccao>
    </PaginaLegal>
  );
}
