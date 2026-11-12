@AGENTS.md

# LavaDog Store — Plano do Projeto

Referência visual: `public/Site Model.png` (modelo enviado para aprovação da cliente).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4, mobile-first
- shadcn/ui (componentes escritos manualmente em `components/ui`, seguindo o padrão oficial — o registry `ui.shadcn.com` não tem acesso de rede neste ambiente, mas `components.json` já está configurado para `npx shadcn add` funcionar normalmente na máquina local)
- Fonte: Manrope (`--font-manrope`, usada tanto para título quanto texto corrido)
- GSAP + ScrollTrigger para animações on-scroll (`lib/gsap.ts`, `components/animations/scroll-reveal.tsx`)
- lucide-react para ícones (fixado em `0.577.0` — versões `1.x` quebram Server Components por criar Context no carregamento do módulo)
- Componentização Solid: cada componente com responsabilidade única, máximo 100 linhas (exceto formulários)

## Paleta de cores (tema central)

Todas as cores principais vivem como CSS variables em `app/globals.css` (`:root` + `@theme inline`), o que gera classes Tailwind automaticamente (`bg-*`, `text-*`, `border-*`). Nunca usar hex direto nos componentes — sempre a classe do tema, pra manutenção ficar num lugar só.

| Token | Hex | Classe Tailwind | Uso |
| --- | --- | --- | --- |
| `--background` | `#fdfaf5` | `bg-background` | fundo geral do site |
| `--foreground` | `#221b14` | `text-foreground` | texto padrão |
| `--primary` | `#f5bf5f` | `bg-primary` / `text-primary` | **amarelo padrão da marca** — CTAs, coroa, detalhes |
| `--primary-hover` | `#d5a652` | `bg-primary-hover` / `text-primary-hover` | hover dos CTAs, destaque "amor" |
| `--blue` | `#79a1c8` | `bg-blue` / `text-blue` | **azul padrão da marca** — títulos e texto em destaque |
| `--blue-soft` | `#eaf1f8` | `bg-blue-soft` | fundo claro atrás de ícones/badges azuis |
| `--blue-strong` | `#3a5e80` | `text-blue-strong` | ícones pequenos sobre `blue-soft` (contraste melhor que o azul padrão) |
| `--primary-soft` | `#fdf3e2` | `bg-primary-soft` | fundo claro atrás de ícones/badges amarelos |
| `--muted` / `--card` / `--border` | — | `bg-muted`, `bg-card`, `border-border` | neutros de apoio (cards, divisórias) |

Nota de acessibilidade: `#79a1c8` tem contraste baixo (~2.6:1) contra o fundo claro — ótimo para títulos grandes/negrito, mas evitar em texto pequeno ou parágrafos corridos (usar `blue-strong` nesses casos).

## Fase 1 — Layout inicial (para aprovação da cliente)

- [x] Fundação do projeto: tema de cores (`app/globals.css`), fontes (Poppins + Inter), `lib/utils.ts`, `components/ui/button.tsx`, `components/ui/sheet.tsx`, GSAP configurado
- [x] Navbar (`components/Navbar.tsx`): logo, links, ações (WhatsApp/conta/carrinho), menu mobile com Sheet
- [x] Hero (`components/Hero.tsx`): carrossel de banners integrado à navegação da navbar
- [x] Nossa Store (`components/Store.tsx` + `StoreHighlights`, `StoreCategories`, `StoreMarquee`): vitrine de categorias, mais completa que o previsto — inclui página `/store` própria com filtros (categoria, marca, preço, avaliação, disponibilidade), grid de produtos e paginação
- [x] Footer (`components/Footer.tsx`) e Contatos (`components/Contatos.tsx`)
- [x] Depoimentos (`components/Depoimentos.tsx`): carrossel com auto-rotação a cada 3s + setas, 5 depoimentos placeholder — **construído mas ainda não importado em nenhuma página**, falta conectar
- [x] CTA final (`components/StorePromoBanner.tsx`): card de 20% off — **construído mas ainda não importado em nenhuma página**, falta conectar
- [ ] Por que escolher a LavaDog Store — não iniciado
- [x] ~~Sobre a LavaDog Store~~ e ~~Nossos Serviços~~ — removidos a pedido da cliente, site fica focado só na loja

## Fase 2 — Loja com Stripe (out/2026)

A cliente deixou o Shopify. Decisão: **Stripe** para catálogo e pagamento. O Next.js mostra o catálogo; o pagamento acontece no **Stripe Checkout** (página da Stripe).

- Catálogo: produtos e preços ativos do painel do Stripe (`lib/stripe.ts`), convertidos em `lib/store-data.ts` (`mapStripeProducts`).
- Metadata do produto no Stripe: `categoria`, `marca`, `animal` (vírgulas), `preco_antigo`, `esgotado` (`true`), `stock` (número), `slug`, `destaque` (`mais vendido` → selo), `beneficios` (separados por `;`), `composicao`, `info_nutricional`, `destaques` (até 3, separados por `;`, cartões "Principais benefícios"), `video` (link YouTube) — todos opcionais. Preço por kg sai sozinho quando a opção é um peso ("15 kg", "500 g"). Metadata do Stripe aceita até 500 caracteres por valor.
- Variantes: cada preço do produto é uma variante; a opção vem da metadata do preço (ex.: `tamanho` = `M`) ou do apelido (`Tamanho: M`).
- Carrinho: cookie `carrinho` no próprio site (`lib/cart-actions.ts`); `finalizarCompra` cria a sessão de checkout.
- Depois do pagamento: `/carrinho/concluido` (confirma no Stripe e esvazia o carrinho) → `/carrinho/obrigado`.
- Variáveis: `STRIPE_SECRET_KEY` (obrigatória) e `STRIPE_SHIPPING_RATES` (ids das tarifas de envio, separados por vírgulas; opcional).
- O Stripe não controla stock: a cliente marca `esgotado` à mão.
- Cupões: o banner da home (`StorePromoBanner` → `PromoCartao`) mostra os códigos promocionais ativos do Stripe (`getPromocoes`); vários rodam em carrossel, nenhum mostra o convite "Explore". Código escondido do site: metadata `mostrar_no_site` = `nao`. O checkout aceita códigos (`allow_promotion_codes`). A chave precisa de Promotion Codes: Read e Coupons: Read.
- NIF: campo opcional "NIF para fatura" no checkout (`custom_fields`). A Carol emite a fatura à mão em cada venda (vê o NIF no email da encomenda e no painel).
- Encomendas (sem base de dados, tudo no Stripe): webhook `app/api/stripe/webhook` → `lib/processar-encomenda.ts`. Número `LD-AAMMDD-XXXXX` calculado da sessão (`numeroEncomenda`); estado na metadata do PaymentIntent (`encomenda`, `processado`, `aviso_pendente`, `enviado_em`, `seguimento`) e descrição "Encomenda LD-…".
- Emails (Resend, `lib/email.ts` + `lib/emails-encomenda.ts`): confirmação, aguarda pagamento (Multibanco), enviada, e aviso de nova encomenda para a loja. Sem `RESEND_API_KEY` só regista no log.
- Stock automático: metadata `stock` no preço (variante) ou no produto (partilhado). Cada venda paga desconta; 0 = esgotado. Sem `stock`, continua o `esgotado` manual. O checkout recusa mais unidades do que o stock.
- Painel interno `/admin/encomendas` (palavra-passe `ADMIN_PASSWORD`): lista as últimas encomendas, NIF, morada, e "Marcar como enviada" (com código de seguimento) → email ao cliente.
- Página de produto `/produto/[slug]` (slug do nome, ou metadata `slug`), com galeria, opções, descrição (do Stripe) e JSON-LD Product.
- Depoimentos: avaliações reais do Google Business (Places API New, `lib/google-avaliacoes.ts`, cache 24 h). Sem chave, a secção não aparece. O filtro de avaliação da loja foi removido (não havia dados).
- Páginas legais: `/termos`, `/privacidade`, `/devolucoes`, `/envios`; identificação do vendedor em `lib/empresa.ts`; rodapé com Livro de Reclamações.
- Loja `/store` no estilo do wireframe (faixa de vantagens, painel "Filtrar resultados", banner com o cupão ativo, cartões com desconto, favorito, €/kg e botão amarelo). **`/store?demo=1`** mostra 30 produtos fictícios (`lib/demo-catalogo.ts`) só para ver o visual, sem tocar no Stripe; as páginas de produto abertas daí também ficam em demo.
- Só português (decisão da cliente). Sem newsletter.
- Alojamento: a Vercel Hobby não permite uso comercial e o Pro é custo. Preparado para **Cloudflare Workers** (grátis, uso comercial permitido) com `@opennextjs/cloudflare`: `wrangler.jsonc`, `open-next.config.ts` (cache em KV), `npm run deploy`. Next atualizado para 16.4.5 (exigido pelo adaptador e patch de segurança de nov/2026).
- Variáveis: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_SHIPPING_RATES` (opcional), `RESEND_API_KEY`, `EMAIL_REMETENTE` (opcional), `ADMIN_PASSWORD`, `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`.
- Permissões da chave restrita do Stripe: Products Write, Prices Write (stock), Checkout Sessions Write, PaymentIntents Write, Customers Write, Shipping Rates Read, Promotion Codes Read, Coupons Read, Webhook Endpoints (não precisa — o webhook é criado no painel).

- [x] Código da troca Shopify → Stripe (branch `stripe`)
- [x] Acesso do Anderson à sandbox do Stripe (out/2026)
- [ ] Chave de teste da sandbox na Vercel (Preview) e testar a compra
- [ ] Produtos no Stripe (importar do CSV do Shopify, se houver)
- [ ] Tarifas de envio no painel + `STRIPE_SHIPPING_RATES` — **pendente: a Carol ainda está a definir os portes** (atualizar também `/envios`)
- [x] Permissões novas na chave restrita (Customers, PaymentIntents, Products, Prices: Write) — 7/nov
- [x] Webhook no painel do Stripe ("Encomendas site", 2 eventos) + `STRIPE_WEBHOOK_SECRET` na Vercel — 12/nov
- [ ] Resend: conta, domínio lavadogstore.pt verificado (DNS na dominios.pt) + `RESEND_API_KEY`
- [ ] `ADMIN_PASSWORD` para o painel de encomendas
- [ ] Google: Place ID da LavaDog + chave Places API (New) → `GOOGLE_PLACE_ID`, `GOOGLE_PLACES_API_KEY`
- [ ] Migrar alojamento da Vercel para a Cloudflare (conta, Workers Builds ligado ao GitHub, variáveis, DNS)
- [ ] Confirmar com a Carol os prazos de entrega por zona (`PRAZOS_ENTREGA` em `lib/empresa.ts`: continente 2–4, ilhas 4–7 dias úteis) e se há levantamento na loja (caixa da página de produto)
- [ ] Carol rever os textos legais e confirmar prazos (preparação em 2 dias úteis, exceções de devolução) e saber que o NIF dela aparece no rodapé e nos termos
- [ ] Anderson: `git pull --rebase` no PC (a imagem `dogCtaStore` e o favicon já estão no GitHub) e apagar `favico.ico` da raiz
- [ ] Integração CTT Expresso no painel ("Criar envio CTT" → etiqueta PDF, seguimento, recolha, email). Depende de: Carol fazer a Adesão Online Expresso nos CTT, pedir acesso à API (Client ID, Contract ID, Authentication ID — vão para variáveis de ambiente) e pôr o peso dos produtos (metadata `peso` em gramas). DPD seria igual se ela escolher DPD. Sem agregadores pagos (Sendcloud ~28 €/mês).
- [ ] Área de login do cliente com Neon (plano grátis): login por email, dados (nome, morada de entrega/faturação, NIF), pré-preencher checkout, "As minhas encomendas" — layout a definir pelo Anderson
- [ ] Métodos de pagamento (cartão, MB WAY, Multibanco) e marca no checkout
- [ ] Acesso Developer na conta real, chave live na Vercel (Production) e juntar ao `master`

## Fase 3 — Supabase

- [ ] Setup do projeto Supabase
- [ ] Autenticação de usuários
- [ ] Modelagem do banco (serviços, agendamentos — não produtos/pedidos, que ficam no Stripe)

## Fase 4 — Agendamento de serviços

- [ ] Painel da cliente para definir disponibilidade dos serviços
- [ ] Fluxo do usuário do petshop para marcar serviço
- [ ] Pré-pagamento no agendamento — forma de cobrança a definir (Stripe)

## Pendências / decisões em aberto

- Logo definitivo: já integrado (`public/images/logo.png`).
- Fotos do hero (`heroDog1.png`, `heroBgDesktop.png`, `heroMobileBg.png`, `dogfoots.png`): já são os assets reais da cliente.
- Número de WhatsApp no navbar é placeholder (`wa.me/5500000000000`). Atualizar com o número real.
- `Depoimentos` e `StorePromoBanner` existem como componentes prontos mas não estão importados em `app/page.tsx` nem em `Store.tsx` — precisam ser conectados.
- Categorias/filtros atuais (`StoreCategories`, `StoreFilters`) usam dados mockados de `lib/store-data.ts`; vêm do catálogo real no Stripe.
