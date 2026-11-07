import type { Metadata } from "next";
import Link from "next/link";
import PaginaLegal, { Seccao } from "@/components/legal/PaginaLegal";
import IdentificacaoVendedor from "@/components/legal/IdentificacaoVendedor";
import { ENTIDADES_RAL, LISTA_RAL_HREF, LIVRO_RECLAMACOES_HREF } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Termos e condições de venda da loja online LavaDog Store.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <PaginaLegal titulo="Termos e Condições" atualizado="novembro de 2026">
      <Seccao titulo="1. Quem somos">
        <p>Estes termos regulam as compras feitas na loja online www.lavadogstore.pt, explorada por:</p>
        <IdentificacaoVendedor />
      </Seccao>

      <Seccao titulo="2. Encomendas">
        <p>
          Ao finalizar a compra, o cliente é encaminhado para a página de pagamento segura do Stripe, onde indica os
          dados de entrega e de contacto. A encomenda fica confirmada quando o pagamento é aceite; nesse momento
          enviamos um email com o número da encomenda e o resumo da compra.
        </p>
        <p>
          Se um produto ficar indisponível depois da encomenda, contactamos o cliente e devolvemos o valor pago por
          esse produto no prazo máximo de 14 dias.
        </p>
      </Seccao>

      <Seccao titulo="3. Preços e pagamento">
        <p>
          Os preços estão em euros (€) e incluem IVA à taxa legal em vigor. Os portes de envio são apresentados na
          página de pagamento, antes de o cliente confirmar a compra.
        </p>
        <p>
          Aceitamos os métodos de pagamento disponíveis na página de pagamento (por exemplo cartão, MB WAY ou
          referência Multibanco). Os dados de pagamento são tratados diretamente pelo Stripe; a LavaDog Store não tem
          acesso aos dados do cartão.
        </p>
      </Seccao>

      <Seccao titulo="4. Fatura">
        <p>
          Emitimos fatura de todas as compras. Para fatura com NIF, indique o número no campo “NIF para fatura” da
          página de pagamento.
        </p>
      </Seccao>

      <Seccao titulo="5. Entrega">
        <p>
          Os prazos e custos de entrega estão descritos na página <Link href="/envios">Envios e Portes</Link>.
        </p>
      </Seccao>

      <Seccao titulo="6. Devoluções e garantia">
        <p>
          O cliente pode desistir da compra no prazo de 14 dias, nos termos da página{" "}
          <Link href="/devolucoes">Trocas e Devoluções</Link>. Os produtos têm a garantia legal de conformidade
          prevista na lei portuguesa.
        </p>
      </Seccao>

      <Seccao titulo="7. Reclamações e resolução de litígios">
        <p>
          Pode apresentar reclamação através do{" "}
          <a href={LIVRO_RECLAMACOES_HREF} target="_blank" rel="noopener noreferrer">
            Livro de Reclamações Eletrónico
          </a>{" "}
          ou contactar-nos diretamente pelo email ou telefone acima.
        </p>
        <p>
          Em caso de litígio de consumo, o consumidor pode recorrer a uma entidade de Resolução Alternativa de
          Litígios de consumo:
        </p>
        <ul>
          {ENTIDADES_RAL.map((e) => (
            <li key={e.site}>
              <a href={e.site} target="_blank" rel="noopener noreferrer">
                {e.nome}
              </a>
            </li>
          ))}
        </ul>
        <p>
          Mais informação no{" "}
          <a href={LISTA_RAL_HREF} target="_blank" rel="noopener noreferrer">
            Portal do Consumidor
          </a>
          .
        </p>
      </Seccao>

      <Seccao titulo="8. Dados pessoais">
        <p>
          O tratamento dos dados pessoais está descrito na <Link href="/privacidade">Política de Privacidade</Link>.
        </p>
      </Seccao>

      <Seccao titulo="9. Lei aplicável">
        <p>Estes termos regem-se pela lei portuguesa.</p>
      </Seccao>
    </PaginaLegal>
  );
}
