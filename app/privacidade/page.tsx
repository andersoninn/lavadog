import type { Metadata } from "next";
import Link from "next/link";
import PaginaLegal, { Seccao } from "@/components/legal/PaginaLegal";
import IdentificacaoVendedor from "@/components/legal/IdentificacaoVendedor";
import { EMPRESA } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a LavaDog Store recolhe, usa e protege os dados pessoais dos clientes, nos termos do RGPD.",
  alternates: { canonical: "/privacidade" },
};

const email = <a href={`mailto:${EMPRESA.email}`}>{EMPRESA.email}</a>;

export default function PrivacidadePage() {
  return (
    <PaginaLegal titulo="Política de Privacidade" atualizado="novembro de 2026">
      <p>
        A {EMPRESA.nomeComercial} respeita a sua privacidade. Esta política
        explica que dados pessoais recolhemos quando visita a loja online e faz
        uma encomenda, para que os usamos, com quem os partilhamos e quais são
        os seus direitos, nos termos do Regulamento Geral sobre a Proteção de
        Dados (RGPD) e da Lei n.º 58/2019.
      </p>

      <Seccao titulo="1. Responsável pelo tratamento">
        <IdentificacaoVendedor />
        <p>
          Para qualquer questão sobre os seus dados, contacte-nos por {email}.
        </p>
      </Seccao>

      <Seccao titulo="2. Que dados recolhemos">
        <h3>Quando faz uma encomenda</h3>
        <p>Os dados são introduzidos por si na página de pagamento:</p>
        <ul>
          <li>nome e apelido, email e telefone;</li>
          <li>
            morada de entrega completa, incluindo código postal e localidade
            (usados também para calcular os portes);
          </li>
          <li>morada de faturação e NIF, se os indicar para a fatura;</li>
          <li>
            produtos encomendados, valores pagos, cupões usados e histórico da
            encomenda (envio, código de seguimento).
          </li>
        </ul>
        <p>
          Os dados do cartão, MB WAY ou referência Multibanco são recolhidos e
          tratados diretamente pelo Stripe, o nosso prestador de pagamentos
          certificado. A {EMPRESA.nomeComercial} nunca tem acesso aos dados
          completos do seu meio de pagamento.
        </p>
        <h3>Quando navega no site</h3>
        <ul>
          <li>o conteúdo do carrinho de compras (num cookie essencial);</li>
          <li>
            o código postal que indicar para ver o prazo de entrega e os
            produtos que marcar como favoritos, guardados apenas no seu
            navegador;
          </li>
          <li>
            dados técnicos registados automaticamente pelo fornecedor de
            alojamento por razões de segurança (endereço IP, tipo de navegador,
            data e hora dos pedidos).
          </li>
        </ul>
        <h3>Quando nos contacta</h3>
        <p>
          O conteúdo das mensagens que nos envia por email ou WhatsApp e os
          dados que nelas incluir.
        </p>
      </Seccao>

      <Seccao titulo="3. Para que usamos os dados e com que fundamento">
        <ul>
          <li>
            <strong>Processar e entregar a encomenda</strong> (pagamento,
            cálculo dos portes pela morada, preparação, envio, seguimento) —
            execução do contrato.
          </li>
          <li>
            <strong>Enviar emails sobre a encomenda</strong> (confirmação com o
            número, aviso de pagamento pendente, aviso de envio) — execução do
            contrato.
          </li>
          <li>
            <strong>
              Emitir a fatura e cumprir obrigações fiscais e contabilísticas
            </strong>{" "}
            — obrigação legal.
          </li>
          <li>
            <strong>Tratar trocas, devoluções, garantias e reclamações</strong>{" "}
            — execução do contrato e obrigação legal.
          </li>
          <li>
            <strong>Responder aos seus pedidos de informação</strong> —
            diligências a seu pedido.
          </li>
          <li>
            <strong>Garantir a segurança do site e prevenir fraude</strong> —
            interesse legítimo.
          </li>
        </ul>
        <p>
          Não enviamos publicidade nem newsletters, não fazemos perfis de
          cliente e não vendemos dados a terceiros.
        </p>
      </Seccao>

      <Seccao titulo="4. Com quem partilhamos os dados">
        <p>
          Apenas com os prestadores necessários para o funcionamento da loja,
          que tratam os dados por nossa conta e segundo as nossas instruções:
        </p>
        <ul>
          <li>
            <strong>Stripe</strong> — pagamentos e registo das encomendas;
          </li>
          <li>
            <strong>Resend</strong> — envio dos emails da encomenda;
          </li>
          <li>
            <strong>transportadora</strong> (por exemplo, CTT) — nome, morada,
            telefone e email, apenas para a entrega;
          </li>
          <li>
            <strong>fornecedor de alojamento do site</strong> — funcionamento
            técnico do site;
          </li>
          <li>
            <strong>autoridades públicas</strong> — quando a lei o exigir (por
            exemplo, a Autoridade Tributária).
          </li>
        </ul>
        <p>
          Alguns destes prestadores podem tratar dados fora do Espaço Económico
          Europeu (por exemplo, nos Estados Unidos). Nesses casos, a
          transferência é feita com as garantias previstas no RGPD, como o
          Quadro de Privacidade de Dados UE-EUA ou as cláusulas contratuais-tipo
          aprovadas pela Comissão Europeia.
        </p>
      </Seccao>

      <Seccao titulo="5. Durante quanto tempo guardamos os dados">
        <ul>
          <li>
            dados de encomendas e faturação: 10 anos, por obrigação fiscal;
          </li>
          <li>
            dados relativos a garantias e reclamações: durante o prazo de
            garantia e até ao fim de qualquer processo;
          </li>
          <li>
            mensagens de contacto: o tempo necessário para responder e, no
            máximo, 2 anos;
          </li>
          <li>
            carrinho de compras: 30 dias; código postal e favoritos: até os
            apagar no seu navegador.
          </li>
        </ul>
      </Seccao>

      <Seccao titulo="6. Cookies e armazenamento no navegador">
        <p>
          Usamos apenas o estritamente necessário para a loja funcionar, por
          isso não precisamos de pedir consentimento:
        </p>
        <ul>
          <li>
            <strong>carrinho</strong> (cookie essencial, 30 dias) — guarda os
            produtos que pôs no carrinho;
          </li>
          <li>
            <strong>código postal</strong> (armazenamento local) — lembra o
            código postal para mostrar o prazo de entrega;
          </li>
          <li>
            <strong>favoritos</strong> (armazenamento local) — lembra os
            produtos que marcou com o coração.
          </li>
        </ul>
        <p>
          Não usamos cookies de publicidade nem de estatística. A página de
          pagamento do Stripe usa os seus próprios cookies, necessários à
          segurança do pagamento e à prevenção de fraude. Se um produto tiver um
          vídeo, este só é carregado (a partir do YouTube, em modo de
          privacidade reforçada) quando carrega no vídeo. As fotografias das
          avaliações do Google, quando apresentadas, são carregadas a partir dos
          servidores da Google.
        </p>
        <p>
          Pode apagar os cookies e o armazenamento local a qualquer momento nas
          definições do seu navegador.
        </p>
      </Seccao>

      <Seccao titulo="7. Segurança">
        <p>
          O site funciona sempre em ligação segura (HTTPS). Os pagamentos são
          processados num ambiente certificado do Stripe e o acesso às
          encomendas está limitado a quem precisa dele para as tratar.
        </p>
      </Seccao>

      <Seccao titulo="8. Os seus direitos">
        <p>Pode, a qualquer momento e gratuitamente:</p>
        <ul>
          <li>aceder aos seus dados e obter uma cópia;</li>
          <li>pedir a correção de dados incorretos ou incompletos;</li>
          <li>
            pedir o apagamento dos dados que não tenhamos obrigação legal de
            conservar;
          </li>
          <li>
            pedir a limitação do tratamento ou opor-se ao tratamento baseado em
            interesse legítimo;
          </li>
          <li>
            receber os seus dados num formato estruturado (portabilidade).
          </li>
        </ul>
        <p>
          Para exercer estes direitos, escreva para {email}. Respondemos no
          prazo máximo de um mês. Tem ainda o direito de apresentar reclamação à
          Comissão Nacional de Proteção de Dados (
          <a
            href="https://www.cnpd.pt"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.cnpd.pt
          </a>
          ).
        </p>
      </Seccao>

      <Seccao titulo="9. Menores">
        <p>
          A loja destina-se a maiores de idade. Não recolhemos intencionalmente
          dados de menores de 16 anos.
        </p>
      </Seccao>

      <Seccao titulo="10. Alterações a esta política">
        <p>
          Podemos atualizar esta política para refletir alterações na loja ou na
          lei. A data da última atualização está no topo da página. Consulte
          também os nossos <Link href="/termos">Termos e Condições</Link>.
        </p>
      </Seccao>
    </PaginaLegal>
  );
}
