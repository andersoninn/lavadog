@AGENTS.md

# LavaDog Store — Plano do Projeto

Referência visual: `public/Site Model.png` (modelo enviado para aprovação da cliente).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4, mobile-first
- shadcn/ui (componentes escritos manualmente em `components/ui`, seguindo o padrão oficial — o registry `ui.shadcn.com` não tem acesso de rede neste ambiente, mas `components.json` já está configurado para `npx shadcn add` funcionar normalmente na máquina local)
- GSAP + ScrollTrigger para animações on-scroll (`lib/gsap.ts`, `components/animations/scroll-reveal.tsx`)
- lucide-react para ícones
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
| `--muted` / `--card` / `--border` | — | `bg-muted`, `bg-card`, `border-border` | neutros de apoio (cards, divisórias) |

Nota de acessibilidade: `#79a1c8` tem contraste baixo (~2.6:1) contra o fundo claro — ótimo para títulos grandes/negrito, mas evitar em texto pequeno ou parágrafos corridos (usar `blue-strong` nesses casos).

## Fase 1 — Layout inicial (para aprovação da cliente)

- [x] Fundação do projeto: tema de cores (`app/globals.css`), fontes (Poppins + Inter), `lib/utils.ts`, `components/ui/button.tsx`, `components/ui/sheet.tsx`, GSAP configurado
- [x] Navbar (`components/layout/navbar/`): logo, links, ações (WhatsApp/conta/carrinho), menu mobile com Sheet
- [x] Hero (`components/sections/hero/`): headline, CTAs, badges de confiança, imagem com card flutuante, animação on-scroll
- [ ] Sobre a LavaDog Store
- [ ] Nossos Serviços
- [ ] Nossa Store (vitrine de categorias)
- [ ] Por que escolher a LavaDog Store
- [ ] Depoimentos
- [ ] CTA final + Footer

## Fase 2 — Store própria (Stripe)

- [ ] Catálogo de produtos próprios
- [ ] Carrinho
- [ ] Checkout com Stripe

## Fase 3 — Produtos dropship (Shopify)

- [ ] Definir estratégia de integração (Storefront API vs. importação de catálogo)
- [ ] Exibição diferenciada dos produtos dropship na loja

## Fase 4 — Supabase

- [ ] Setup do projeto Supabase
- [ ] Autenticação de usuários
- [ ] Modelagem do banco (produtos, pedidos, serviços, agendamentos)

## Fase 5 — Agendamento de serviços

- [ ] Painel da cliente para definir disponibilidade dos serviços
- [ ] Fluxo do usuário do petshop para marcar serviço
- [ ] Pré-pagamento no agendamento (Stripe)

## Pendências / decisões em aberto

- Logo definitivo da cliente: usando placeholder (ícone de cachorro + "LavaDog Store" em texto). Substituir pelo logo real assim que recebido.
- Foto do hero (`public/images/hero-dog.jpg`) é um recorte temporário do `Site Model.png`, só para visualização do layout. Substituir pela fotografia definitiva da cliente.
- Número de WhatsApp no navbar é placeholder (`wa.me/5500000000000`). Atualizar com o número real.
- Links da navbar apontam para âncoras (`#sobre`, `#servicos`, etc.) que serão criadas conforme as seções forem construídas.
