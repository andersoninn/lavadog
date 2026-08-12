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

## Fase 2 — Integração Shopify (headless)

Decisão de arquitetura: **sem Stripe**. Pagamento e checkout ficam 100% no Shopify. O Next.js é só o front-end (headless), lendo o catálogo da cliente direto da Storefront API dela.

- [ ] Cliente cadastra os produtos dela no admin do Shopify
- [ ] Obter credenciais: domínio da loja Shopify + Storefront API access token
- [ ] Conectar a Storefront API e buscar produtos/categorias reais
- [ ] Mapear categorias do Shopify para as categorias já usadas em `StoreCategories` / `StoreFilters` (ajustar nomes, imagens e filtros pra ficarem compatíveis com os dados reais)
- [ ] Trocar dados mockados de `lib/store-data.ts` e `ProductCard`/`ProductGrid` pelos dados vindos da API
- [ ] Carrinho e checkout redirecionam para o checkout hospedado do Shopify

## Fase 3 — Supabase

- [ ] Setup do projeto Supabase
- [ ] Autenticação de usuários
- [ ] Modelagem do banco (serviços, agendamentos — não produtos/pedidos, que ficam no Shopify)

## Fase 4 — Agendamento de serviços

- [ ] Painel da cliente para definir disponibilidade dos serviços
- [ ] Fluxo do usuário do petshop para marcar serviço
- [ ] Pré-pagamento no agendamento — forma de cobrança a definir (Shopify não cobre agendamento nativamente)

## Pendências / decisões em aberto

- Logo definitivo: já integrado (`public/images/logo.png`).
- Fotos do hero (`heroDog1.png`, `heroBgDesktop.png`, `heroMobileBg.png`, `dogfoots.png`): já são os assets reais da cliente.
- Número de WhatsApp no navbar é placeholder (`wa.me/5500000000000`). Atualizar com o número real.
- `Depoimentos` e `StorePromoBanner` existem como componentes prontos mas não estão importados em `app/page.tsx` nem em `Store.tsx` — precisam ser conectados.
- Falta receber da cliente: domínio da loja Shopify e o Storefront API access token, pra iniciar a Fase 2.
- Categorias/filtros atuais (`StoreCategories`, `StoreFilters`) usam dados mockados de `lib/store-data.ts`; serão ajustados assim que o catálogo real do Shopify estiver conectado.
