import type { Metadata } from "next";
import Link from "next/link";
import PaginaLegal, { Seccao } from "@/components/legal/PaginaLegal";
import { EMPRESA, PRAZOS_ENTREGA } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Envios e Portes",
  description:
    "Zonas de entrega, cálculo dos portes por código postal, prazos e acompanhamento das encomendas da LavaDog Store.",
  alternates: { canonical: "/envios" },
};

const zonas = Object.entries(PRAZOS_ENTREGA) as [
  string,
  { min: number; max: number },
][];

// PENDENTE: quando a Carol definir as tarifas de envio, acrescentar a tabela
// de valores (ou o limiar de portes grátis) na secção 3.
export default function EnviosPage() {
  return (
    <PaginaLegal titulo="Envios e Portes" atualizado="novembro de 2026">
      <p>
        Esta página explica para onde enviamos, como são calculados os portes,
        quanto tempo demora a entrega e o que fazer se algo correr mal. Ao fazer
        uma encomenda na loja online da {EMPRESA.nomeComercial} aceita estas
        condições, que fazem parte dos nossos{" "}
        <Link href="/termos">Termos e Condições</Link>.
      </p>

      <Seccao titulo="1. Zonas de entrega">
        <p>Entregamos em todo o território português:</p>
        <ul>
          <li>Portugal continental;</li>
          <li>Região Autónoma da Madeira;</li>
          <li>Região Autónoma dos Açores.</li>
        </ul>
        <p>De momento não fazemos envios para fora de Portugal.</p>
      </Seccao>

      <Seccao titulo="2. Morada de entrega e código postal">
        <p>
          A morada de entrega é indicada pelo próprio cliente na página de
          pagamento: nome, morada completa, código postal, localidade e um
          contacto telefónico para a transportadora. O cliente é responsável por
          confirmar que estes dados estão corretos e completos.
        </p>
        <p>
          Nas páginas de produto pode também indicar o seu código postal para
          ver a zona de entrega e uma estimativa do prazo antes de comprar. Esse
          código fica guardado apenas no seu navegador, para não ter de o
          escrever outra vez, e pode ser alterado a qualquer momento.
        </p>
        <p>
          Se a encomenda não puder ser entregue por morada incorreta, incompleta
          ou por ausência repetida do destinatário, a transportadora devolve-a.
          Nesse caso contactamos o cliente para combinar um novo envio, cujos
          portes podem ser cobrados novamente.
        </p>
      </Seccao>

      <Seccao titulo="3. Cálculo dos portes">
        <p>
          O valor dos portes é calculado automaticamente a partir da morada e do
          código postal de entrega (que definem a zona: continente, Madeira ou
          Açores) e do peso total da encomenda. O valor final é sempre
          apresentado na página de pagamento, de forma clara e separada do preço
          dos produtos, <strong>antes</strong> de confirmar a compra. Nunca é
          cobrado nenhum valor de envio que não tenha visto e aceitado.
        </p>
        <p>
          Sempre que existirem campanhas de portes grátis (por exemplo, a partir
          de um valor mínimo de compra), as condições são indicadas no site e
          aplicadas automaticamente no pagamento.
        </p>
      </Seccao>

      <Seccao titulo="4. Prazos de preparação e entrega">
        <p>
          As encomendas são preparadas em até 2 dias úteis após a confirmação do
          pagamento. A seguir, o prazo estimado de entrega pela transportadora
          é:
        </p>
        <ul>
          {zonas.map(([zona, p]) => (
            <li key={zona}>
              {zona === "Continente" ? "Portugal continental" : zona}: {p.min} a{" "}
              {p.max} dias úteis.
            </li>
          ))}
        </ul>
        <p>
          Os prazos contam em dias úteis (sem sábados, domingos e feriados) e
          são estimativas. Podem ser maiores em épocas de grande volume, em
          condições meteorológicas adversas ou por motivos alheios à loja.
          Encomendas pagas por referência Multibanco só começam a ser preparadas
          quando o pagamento é confirmado.
        </p>
        <p>
          Nos termos da lei, a entrega é feita no prazo máximo de 30 dias a
          contar da encomenda. Se não for possível cumpri-lo, informamos o
          cliente, que pode optar por cancelar a encomenda e receber de volta o
          valor pago.
        </p>
      </Seccao>

      <Seccao titulo="5. Acompanhamento da encomenda">
        <ul>
          <li>
            Ao concluir a compra, recebe um email com o número da encomenda (por
            exemplo LD-261112-AB12C) e o resumo.
          </li>
          <li>
            Quando a encomenda sai da loja, recebe um novo email com o aviso de
            envio e, quando existir, o código de seguimento da transportadora.
          </li>
          <li>Para qualquer dúvida, indique sempre o número da encomenda.</li>
        </ul>
      </Seccao>

      <Seccao titulo="6. Levantamento na loja">
        <p>
          Pode também combinar o levantamento da encomenda na nossa loja física,
          em {EMPRESA.morada.replace(", Portugal", "")}, sem custos de envio.
          Contacte-nos por WhatsApp ou email antes de passar na loja, para
          confirmarmos que a encomenda está pronta.
        </p>
      </Seccao>

      <Seccao titulo="7. Receção e problemas na entrega">
        <p>
          Ao receber a encomenda, verifique se a embalagem está intacta. Se
          notar danos visíveis, registe-os junto da transportadora no momento da
          entrega, se possível, e tire fotografias.
        </p>
        <p>
          Se a encomenda chegar danificada, incompleta, com produtos trocados,
          ou se não chegar no prazo indicado, contacte-nos o mais depressa
          possível por email (
          <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>) ou WhatsApp (
          {EMPRESA.telefone}), indicando o número da encomenda. Resolvemos sem
          custos para si, por substituição ou reembolso, de acordo com a nossa{" "}
          <Link href="/devolucoes">política de trocas e devoluções</Link>.
        </p>
        <p>
          O risco de perda ou dano dos produtos só passa para o cliente no
          momento em que este (ou alguém indicado por ele) recebe a encomenda.
        </p>
      </Seccao>
    </PaginaLegal>
  );
}
