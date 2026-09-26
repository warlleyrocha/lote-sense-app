# Lote Sense App

React + TypeScript + Vite + Tailwind CSS v4 + React Router. Web mobile-first: a coluna de conteúdo tem no máximo 390px e fica centralizada em telas maiores.

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — type-check e build de produção
- `npm run lint` — ESLint
- `npm run preview` — preview do build

## Estrutura (`src/`)

- `components/` — UI compartilhada sem regra de negócio (`Icon`, `IconButton`, `BottomNavigation`, `ScreenHeader`, `SegmentedControl`, `AppShell`)
- `hooks/` — hooks compartilhados (`useGreeting`)
- `pages/` — páginas fora de features (`PlaceholderPage` para Perfil)
- `features/lots/` — nano-lotes
  - `components/`, `pages/`, `hooks/` (`useLots`, `useLot`)
  - `data/` — dados mockados (trocar o interior dos hooks por API quando existir)
  - `types.ts`, `constants.ts` (rótulos, faixas de referência, classes por status), `utils.ts` (formatação)
- `index.css` — Tailwind + tokens do design (`@theme`)

Rotas: `/` · `/inicio` · `/lotes/:id` · `/lotes/:id/sensor` · `/lotes/:id/historico` · `/alertas` · `/perfil`. O alias `@` aponta para `src/`.
