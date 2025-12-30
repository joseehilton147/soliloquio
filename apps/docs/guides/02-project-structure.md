# 02 - Project Structure

Guia da estrutura de pastas e organização arquitetural do projeto Solilóquio.

---

## Visão Geral

O projeto segue uma arquitetura **holonômica**: cada módulo é simultaneamente um todo funcional e parte de algo maior.

> **Leitura recomendada:** [holonomic-systems-guide.md](../frameworks/holonomic-systems-guide.md)

---

## Estrutura do Monorepo

```
soliloquio/
├── apps/                          # Aplicações
│   ├── tarot/                     # App principal
│   ├── design-system/             # Storybook
│   └── docs/                      # Documentação
├── packages/                      # Pacotes compartilhados
│   ├── ui/                        # Componentes UI
│   ├── core/                      # Lógica de negócio
│   ├── api/                       # Camada tRPC
│   ├── database/                  # Schema Prisma
│   ├── eslint-config/             # ESLint compartilhado
│   └── typescript-config/         # TSConfig compartilhado
├── CLAUDE.md                      # Instruções para AI
├── REGRAS-REVISAO.md              # 18 regras de revisão
├── CONTEXTO-REINJECAO.md          # Sistema de reinjeção
├── turbo.json                     # Configuração Turborepo
└── pnpm-workspace.yaml            # Configuração workspaces
```

---

## Estrutura do App Tarot

```
apps/tarot/
├── src/
│   ├── app/                       # Next.js App Router
│   ├── components/                # Componentes globais
│   │   ├── providers.tsx          # Context providers
│   │   ├── tarot-layout.tsx       # Layout principal
│   │   └── tabs/                  # Componentes de tabs
│   ├── config/                    # Configurações
│   ├── contexts/                  # React Contexts
│   ├── data/                      # Dados estáticos
│   │   └── spreads/               # Tiragens por categoria
│   │       ├── quick/             # Tiragens rápidas
│   │       ├── insight/           # Tiragens de insight
│   │       └── deep/              # Tiragens profundas
│   ├── features/                  # Feature folders (holons)
│   │   ├── arcanos/               # Feature: Arcanos
│   │   ├── naipes/                # Feature: Naipes
│   │   └── tiragens/              # Feature: Tiragens
│   ├── hooks/                     # Hooks globais
│   ├── lib/                       # Bibliotecas/utils
│   └── shared/                    # Recursos compartilhados
│       ├── components/            # Componentes shared
│       │   └── layout/            # Componentes de layout
│       └── constants/             # Constantes globais
├── docs/                          # Documentação do app
│   ├── frameworks/                # Frameworks de qualidade
│   └── guides/                    # Guias de desenvolvimento
└── public/                        # Arquivos estáticos
```

---

## Feature Folders (Holons)

Cada feature é um **holon**: funciona isoladamente E integra com outras.

### Estrutura Padrão de Feature

```
features/[feature-name]/
├── components/                    # Componentes da feature
│   ├── component-name.tsx         # Componente
│   └── component-name.test.tsx    # Teste (co-localizado)
├── domain/                        # Lógica de domínio
│   ├── types.ts                   # Tipos TypeScript
│   ├── constants.ts               # Constantes
│   └── utils.ts                   # Utilitários
├── hooks/                         # Hooks da feature (opcional)
│   └── use-feature.ts
├── api/                           # Endpoints API (opcional)
│   └── feature.api.ts
└── index.ts                       # Barrel export
```

### Features Existentes

#### `features/arcanos/`
Gerencia os 78 arcanos do Tarot (22 maiores + 56 menores).

```
arcanos/
├── components/
│   ├── arcano-portal-card.tsx     # Card de arcano
│   └── arcanos-hero-section.tsx   # Seção hero
└── domain/
    ├── types.ts                   # Arcano, ArcanoMaior, ArcanoMenor
    └── constants.ts               # Dados dos arcanos
```

#### `features/naipes/`
Gerencia os 4 naipes (Copas, Espadas, Ouros, Paus) e seus elementos.

```
naipes/
├── components/
│   ├── element-badge.tsx          # Badge de elemento
│   ├── naipe-card.tsx             # Card de naipe
│   └── naipe-cards-grid.tsx       # Grid de naipes
└── domain/
    ├── types.ts                   # Naipe, Elemento
    └── element-colors.ts          # Cores por elemento
```

#### `features/tiragens/`
Gerencia spreads/tiragens de Tarot.

```
tiragens/
├── components/
│   ├── spread-canvas.tsx          # Canvas de tiragem
│   └── spread-card.tsx            # Card de posição
└── domain/
    ├── types.ts                   # Spread, Position
    └── constants.ts               # Tipos de tiragem
```

---

## Convenções de Nomenclatura

### Arquivos

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | `kebab-case.tsx` | `naipe-card.tsx` |
| Testes | `kebab-case.test.tsx` | `naipe-card.test.tsx` |
| Hooks | `use-kebab-case.ts` | `use-spread.ts` |
| Types | `kebab-case.ts` | `types.ts`, `entities.ts` |
| Utils | `kebab-case.ts` | `format-date.ts` |
| Constantes | `kebab-case.ts` | `element-colors.ts` |

### Exports

```typescript
// ❌ NUNCA usar default export
export default function Component() {}

// ✅ SEMPRE usar named export
export function Component() {}
export { Component }
```

### Barrel Exports

Cada pasta deve ter `index.ts` para re-export:

```typescript
// features/naipes/index.ts
export { NaipeCard } from './components/naipe-card'
export { NaipeGrid } from './components/naipe-cards-grid'
export { ElementBadge } from './components/element-badge'
export type { Naipe, Elemento } from './domain/types'
```

---

## Regras de Dependência

### Hierarquia de Imports

```
┌─────────────────────────────────────────────────────────────┐
│                    packages/* (shared)                      │
│         Pode ser importado por qualquer lugar               │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│                    src/shared/*                             │
│         Pode ser importado por features e components        │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│                    src/features/*                           │
│         Importa apenas via barrel (index.ts)                │
│         Nunca importa internos de outras features           │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│                    src/components/*                         │
│         Componentes de página/layout                        │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│                    src/app/* (pages)                        │
│         Orquestra tudo                                      │
└─────────────────────────────────────────────────────────────┘
```

### Imports Corretos vs Errados

```typescript
// ❌ ERRADO - Importando interno de outra feature
import { calculateElement } from '../naipes/domain/utils'

// ✅ CORRETO - Usando barrel export
import { ElementUtils } from '@/features/naipes'

// ❌ ERRADO - Import relativo longo
import { Button } from '../../../shared/components/button'

// ✅ CORRETO - Alias de path
import { Button } from '@/shared/components/button'

// ✅ MELHOR - Usando package compartilhado
import { Button } from '@workspace/ui'
```

---

## Packages Compartilhados

### `@workspace/ui`
Componentes UI reutilizáveis (buttons, inputs, cards).

```typescript
import { Button, Input, Card } from '@workspace/ui'
```

### `@workspace/core`
Lógica de negócio compartilhada.

```typescript
import { calculateAscendant, getZodiacSign } from '@workspace/core'
```

### `@workspace/api`
Routers tRPC e procedures.

```typescript
import { appRouter } from '@workspace/api'
```

### `@workspace/database`
Schema Prisma e cliente.

```typescript
import { prisma } from '@workspace/database'
```

---

## Estrutura Alvo (Atomic Design)

A estrutura atual está em transição para Atomic Design:

```
src/components/                    # ESTRUTURA ALVO
├── atoms/                         # Componentes básicos
│   ├── button/
│   ├── input/
│   └── badge/
├── molecules/                     # Composição 2-3 atoms
│   ├── ui/                        # Genérico
│   └── tarot/                     # Domain-specific
├── organisms/                     # Seções complexas
│   ├── ui/                        # Genérico (Modal, Drawer)
│   └── tarot/                     # Domain-specific
└── templates/                     # Layouts completos
    └── tarot/
```

> **Leitura recomendada:** [atomic-design-llm-guide.md](../frameworks/atomic-design-llm-guide.md)

---

## Paths e Aliases

Configurados em `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"]
    }
  }
}
```

---

## Checklist de Organização

### Para Novos Arquivos

- [ ] Está na pasta correta (feature vs shared vs components)?
- [ ] Nome segue convenção kebab-case?
- [ ] Tem barrel export no index.ts?
- [ ] Imports usam aliases (@/)?
- [ ] Não importa internos de outras features?

### Para Novas Features

- [ ] Criou pasta em `features/`?
- [ ] Estrutura: components/, domain/, index.ts?
- [ ] Types co-localizados em domain/types.ts?
- [ ] Barrel export configurado?

---

## Referências

- [REFACTORING-ROADMAP.md](../REFACTORING-ROADMAP.md) - Roteiro de migração
- [holonomic-systems-guide.md](../frameworks/holonomic-systems-guide.md) - Fundamento teórico
- [atomic-design-llm-guide.md](../frameworks/atomic-design-llm-guide.md) - Hierarquia de componentes

---

*Última atualização: 2025-12-29*
