import type { Metadata } from "next";
import Link from "next/link";
import PaginaLegal, { Seccao } from "@/components/legal/PaginaLegal";
import IdentificacaoVendedor from "@/components/legal/IdentificacaoVendedor";
import {
  EMPRESA,
  ENTIDADES_RAL,
  LISTA_RAL_HREF,
  LIVRO_RECLAMACOES_HREF,
} from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description:
    "Condições gerais de venda da loja online LavaDog Store: encomendas, preços, portes, pagamento, entrega, devoluções e reclamações.",
  alternates: { canonical: "/termos" },
};

const email = <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>;

export default function TermosPage() {
  return (
    <PaginaLegal titulo="Termos e Condições" atualizado="novembro de 2026">
      <p>
        Estas condições gerais regulam as compras feitas na loja online
        www.lavadogstore.pt. Ao concluir uma encomenda declara que leu e aceita
        estes termos. Recomendamos que os guarde ou imprima.
      </p>

      <Seccao titulo="1. Identificação do vendedor">
        <IdentificacaoVendedor />
      </Seccao>

      <Seccao titulo="2. Âmbito">
        <p>
          A loja destina-se à venda de produtos para animais de companhia a
          consumidores e empresas com morada de entrega em Portugal (continente
          e ilhas). As compras podem ser feitas sem criar conta.
        </p>
      </Seccao>

      <Seccao titulo="3. Produtos e informação">
        <ul>
          <li>
            Procuramos descrever cada produto com rigor (composição, tamanho,
            peso, características). As fotografias são ilustrativas e as cores
            podem variar ligeiramente consoante o ecrã.
          </li>
          <li>
            A disponibilidade é indicada em cada produto. Os produtos sem stock
            aparecem como “Esgotado” e não podem ser encomendados.
          </li>
          <li>
            As informações sobre alimentação e cuidados não substituem o
            aconselhamento de um médico veterinário.
          </li>
        </ul>
      </Seccao>

      <Seccao titulo="4. Preços">
        <ul>
          <li>Os preços estão em euros e incluem IVA à taxa legal em vigor.</li>
          <li>
            Os portes de envio não estão incluídos no preço dos produtos. São
            calculados automaticamente a partir da morada e do código postal de
            entrega indicados pelo cliente e do peso da encomenda, e
            apresentados no pagamento antes da confirmação (ver{" "}
            <Link href="/envios">Envios e Portes</Link>).
          </li>
          <li>
            O preço aplicável é o que está indicado no momento da encomenda. Em
            caso de erro manifesto de preço, informamos o cliente, que pode
            confirmar a encomenda ao preço correto ou cancelá-la, com reembolso
            integral.
          </li>
        </ul>
      </Seccao>

      <Seccao titulo="5. Como encomendar">
        <ol>
          <li>
            Escolha os produtos (e, quando existir, o tamanho ou peso) e
            adicione-os ao carrinho.
          </li>
          <li>
            No carrinho, reveja os produtos e as quantidades e carregue em
            “Finalizar compra”.
          </li>
          <li>
            Na página de pagamento segura do Stripe, indique o email, o nome, a
            morada de entrega com código postal, o telefone e, se quiser, o NIF
            para a fatura e um código de desconto.
          </li>
          <li>
            Confira o resumo final — produtos, portes calculados para a sua
            morada, descontos e total — e confirme o pagamento.
          </li>
        </ol>
        <p>
          O contrato considera-se celebrado quando o pagamento é confirmado.
          Nesse momento recebe um email com o número da encomenda e o respetivo
          resumo. Se, por motivo excecional, um produto deixar de estar
          disponível depois da encomenda, informamos o cliente e reembolsamos o
          valor correspondente no prazo máximo de 14 dias.
        </p>
      </Seccao>

      <Seccao titulo="6. Pagamento">
        <ul>
          <li>
            Aceitamos os meios de pagamento apresentados na página de pagamento
            (por exemplo, cartão de crédito ou débito, MB WAY e referência
            Multibanco).
          </li>
          <li>
            O pagamento é processado pelo Stripe, em ambiente seguro. A{" "}
            {EMPRESA.nomeComercial} não tem acesso aos dados completos do meio
            de pagamento.
          </li>
          <li>
            No pagamento por referência Multibanco, a encomenda fica registada e
            só é preparada depois de o pagamento ser confirmado. Se a referência
            não for paga dentro do prazo indicado, a encomenda é cancelada
            automaticamente.
          </li>
        </ul>
      </Seccao>

      <Seccao titulo="7. Códigos de desconto">
        <p>
          Os códigos promocionais são introduzidos na página de pagamento e
          aplicam-se segundo as condições de cada campanha (validade, valor
          mínimo, produtos abrangidos ou primeira compra). Salvo indicação em
          contrário, não são acumuláveis, não podem ser trocados por dinheiro e
          só podem ser usados uma vez por encomenda.
        </p>
      </Seccao>

      <Seccao titulo="8. Fatura">
        <p>
          Emitimos fatura de todas as compras, enviada para o email indicado na
          encomenda. Para fatura com contribuinte, indique o NIF no campo “NIF
          para fatura” da página de pagamento. Depois de emitida, a fatura não
          pode ser alterada para outro NIF.
        </p>
      </Seccao>

      <Seccao titulo="9. Entrega">
        <p>
          Entregamos na morada indicada pelo cliente, nos prazos e condições
          descritos em <Link href="/envios">Envios e Portes</Link>. O risco de
          perda ou dano dos produtos passa para o cliente no momento da entrega.
        </p>
      </Seccao>

      <Seccao titulo="10. Livre resolução, trocas e garantia">
        <p>
          O consumidor pode desistir da compra no prazo de 14 dias após a
          receção, sem indicar motivo, e todos os produtos têm a garantia legal
          de conformidade de 3 anos. As condições, exceções e o formulário de
          livre resolução estão em{" "}
          <Link href="/devolucoes">Trocas e Devoluções</Link>.
        </p>
      </Seccao>

      <Seccao titulo="11. Responsabilidade">
        <p>
          Não nos responsabilizamos por danos resultantes de uma utilização dos
          produtos contrária às instruções do fabricante ou ao seu fim normal,
          nem por atrasos ou falhas causados por situações de força maior (por
          exemplo, greves, catástrofes naturais ou falhas gerais de
          comunicações). Nada nestes termos limita os direitos que a lei
          reconhece aos consumidores.
        </p>
      </Seccao>

      <Seccao titulo="12. Propriedade intelectual">
        <p>
          Os textos, fotografias, logótipo e restantes conteúdos do site
          pertencem à {EMPRESA.nomeComercial} ou aos respetivos titulares e não
          podem ser reproduzidos sem autorização. As marcas dos produtos
          pertencem aos seus fabricantes.
        </p>
      </Seccao>

      <Seccao titulo="13. Dados pessoais">
        <p>
          Os dados indicados na encomenda são tratados apenas para a processar,
          entregar e faturar, como explicado na{" "}
          <Link href="/privacidade">Política de Privacidade</Link>.
        </p>
      </Seccao>

      <Seccao titulo="14. Reclamações e resolução de litígios">
        <p>
          Se tiver algum problema, contacte-nos primeiro por {email} ou WhatsApp
          ({EMPRESA.telefone}): respondemos o mais depressa possível. Pode
          também apresentar reclamação no{" "}
          <a
            href={LIVRO_RECLAMACOES_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            Livro de Reclamações Eletrónico
          </a>
          .
        </p>
        <p>
          Em caso de litígio de consumo, pode recorrer a uma das seguintes
          entidades de Resolução Alternativa de Litígios:
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

      <Seccao titulo="15. Alterações e lei aplicável">
        <p>
          Podemos atualizar estes termos a qualquer momento; a cada encomenda
          aplicam-se os que estavam em vigor na data em que foi feita. Estes
          termos regem-se pela lei portuguesa, sem prejuízo das normas
          imperativas de proteção do consumidor e do direito de recorrer aos
          tribunais do seu domicílio.
        </p>
      </Seccao>
    </PaginaLegal>
  );
}
