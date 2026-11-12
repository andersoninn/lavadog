import type { Metadata } from "next";
import Link from "next/link";
import PaginaLegal, { Seccao } from "@/components/legal/PaginaLegal";
import { EMPRESA } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Trocas e Devoluções",
  description:
    "Direito de livre resolução de 14 dias, como devolver, reembolsos, exceções e garantia legal na LavaDog Store.",
  alternates: { canonical: "/devolucoes" },
};

const email = <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>;

export default function DevolucoesPage() {
  return (
    <PaginaLegal titulo="Trocas e Devoluções" atualizado="novembro de 2026">
      <p>
        Queremos que fique satisfeito com a sua compra. Esta política segue o
        regime dos contratos celebrados à distância (Decreto-Lei n.º 24/2014) e
        o regime da garantia dos bens de consumo (Decreto-Lei n.º 84/2021).
      </p>

      <Seccao titulo="1. Direito de livre resolução (14 dias)">
        <p>
          Enquanto consumidor, pode desistir da compra sem indicar qualquer
          motivo, no prazo de <strong>14 dias</strong> a contar do dia em que
          recebe os produtos (ou, numa encomenda com vários volumes entregues em
          dias diferentes, do dia em que recebe o último).
        </p>
        <p>
          Para exercer este direito, envie-nos uma declaração clara a dizer que
          pretende desistir, por email para {email}, indicando o número da
          encomenda. Pode, se quiser, usar o modelo da secção 7. Basta que a
          comunicação seja enviada antes de terminar o prazo de 14 dias.
        </p>
      </Seccao>

      <Seccao titulo="2. Como devolver os produtos">
        <ol>
          <li>
            Comunique-nos a desistência, como indicado acima. Respondemos com a
            confirmação e as instruções.
          </li>
          <li>
            Embale os produtos com cuidado, de preferência na embalagem
            original, com todos os acessórios e etiquetas.
          </li>
          <li>
            Envie os produtos no prazo de 14 dias a contar da comunicação, para:{" "}
            {EMPRESA.morada}. Também os pode entregar diretamente na loja.
          </li>
        </ol>
        <p>
          Os custos diretos da devolução são suportados pelo cliente, exceto
          quando o produto tem defeito, não está conforme ou foi enviado por
          engano. Recomendamos um envio com seguimento, já que o cliente é
          responsável pelos produtos até chegarem à loja.
        </p>
        <p>
          O cliente responde pela eventual perda de valor dos produtos
          resultante de uma utilização para além do necessário para verificar a
          sua natureza, características e funcionamento (como faria numa loja
          física).
        </p>
      </Seccao>

      <Seccao titulo="3. Reembolso">
        <ul>
          <li>
            Devolvemos todos os pagamentos recebidos, incluindo os portes de
            envio iniciais, no prazo máximo de 14 dias a contar da data em que
            recebemos a comunicação de desistência.
          </li>
          <li>
            Se tiver escolhido uma modalidade de envio mais cara do que a mais
            económica que oferecemos, o reembolso dos portes corresponde à
            modalidade mais económica.
          </li>
          <li>
            Podemos aguardar a receção dos produtos, ou a prova do seu envio,
            antes de fazer o reembolso.
          </li>
          <li>
            O reembolso é feito pelo mesmo meio de pagamento usado na compra,
            sem custos para o cliente, salvo acordo expresso em contrário.
          </li>
        </ul>
      </Seccao>

      <Seccao titulo="4. Exceções ao direito de livre resolução">
        <p>Nos termos da lei, não é possível desistir da compra de:</p>
        <ul>
          <li>
            produtos selados que não possam ser devolvidos por razões de
            proteção da saúde ou de higiene e cujo selo tenha sido aberto após a
            entrega (por exemplo, alimentos, snacks, suplementos, produtos de
            higiene e antiparasitários);
          </li>
          <li>
            produtos que, pela sua natureza, se deteriorem ou fiquem rapidamente
            fora de prazo;
          </li>
          <li>
            produtos feitos de acordo com especificações do cliente ou
            claramente personalizados (por exemplo, coleiras ou placas
            gravadas).
          </li>
        </ul>
      </Seccao>

      <Seccao titulo="5. Trocas">
        <p>
          Se quiser trocar um produto por outro tamanho, cor ou modelo,
          contacte-nos dentro do prazo de 14 dias. Sempre que houver stock,
          fazemos a troca; se houver diferença de preço, acertamos o valor. A
          troca segue as mesmas condições de estado do produto descritas na
          secção 2.
        </p>
      </Seccao>

      <Seccao titulo="6. Produtos com defeito e garantia legal">
        <p>
          Todos os produtos têm a{" "}
          <strong>garantia legal de conformidade de 3 anos</strong> a contar da
          entrega. Se um produto tiver um defeito, não corresponder à descrição,
          chegar danificado ou for diferente do encomendado, contacte-nos por{" "}
          {email} ou WhatsApp ({EMPRESA.telefone}) com o número da encomenda e
          uma fotografia.
        </p>
        <p>
          Nestes casos tem direito, sem custos, à reparação ou substituição do
          produto e, nas situações previstas na lei, à redução do preço ou à
          resolução do contrato com reembolso. Os custos de envio associados são
          da nossa responsabilidade. A garantia não cobre danos provocados por
          uso indevido, acidente ou desgaste normal.
        </p>
      </Seccao>

      <Seccao titulo="7. Modelo de formulário de livre resolução">
        <p>
          (Só deve preencher e enviar este formulário se quiser desistir da
          compra.)
        </p>
        <div className="mt-3 rounded-md border border-border bg-card p-4 text-sm">
          <p>
            Para: {EMPRESA.nomeComercial} ({EMPRESA.titular}), {EMPRESA.morada},{" "}
            {EMPRESA.email}
          </p>
          <p>
            Pelo presente comunico que desisto do meu contrato de compra dos
            seguintes bens: …………… Número da encomenda: ……………
          </p>
          <p>Encomendado em / recebido em: ……………</p>
          <p>Nome do consumidor: ……………</p>
          <p>Morada do consumidor: ……………</p>
          <p>Data e assinatura (só se enviado em papel): ……………</p>
        </div>
      </Seccao>

      <Seccao titulo="8. Contactos e reclamações">
        <p>
          Para qualquer questão sobre trocas e devoluções fale connosco por{" "}
          {email} ou WhatsApp ({EMPRESA.telefone}). Os meios de reclamação e de
          resolução alternativa de litígios estão nos{" "}
          <Link href="/termos">Termos e Condições</Link>.
        </p>
      </Seccao>
    </PaginaLegal>
  );
}
