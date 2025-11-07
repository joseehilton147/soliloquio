  🏗️ Arquitetura Proposta - Fase 1 (Tarot)

  Estrutura Recomendada

  soliloquio/
  ├── apps/
  │   ├── web/              # Portal/Hub - interliga todos os apps
  │   ├── tarot/            # App do Tarot (Next.js 15)
  │   └── api/              # API centralizada (Next.js API Routes)
  │
  ├── packages/
  │   ├── ui/               # ✅ Componentes shadcn (já existe)
  │   ├── database/         # 🆕 Prisma + schemas + migrations
  │   ├── core/             # 🆕 Tipos, validações (Zod), regras de negócio
  │   └── config/           # ✅ ESLint/TS configs (já existe)

  Por que essa estrutura?

  1. Separação de Concerns (Mínima, não over-engineering):
  - packages/database - Única fonte de verdade dos dados
  - packages/core - Tipos TypeScript compartilhados entre API e frontends
  - apps/api - Endpoints REST ou tRPC (recomendo tRPC para type-safety)
  - apps/tarot - Interface do usuário focada em Tarot
  - apps/web - Portal que conecta todos os apps (links, navegação)

  2. Escalabilidade para Mobile:
  - API separada permite consumir de qualquer cliente (React Native, Expo)
  - packages/core compartilha validações entre web e mobile
  - Quando criar mobile: só adicionar apps/mobile usando mesmo backend

  3. Evolução Natural (sem over-engineering inicial):

  Fase 1: Tarot
    ├── packages/database + core
    ├── apps/api
    └── apps/tarot

  Fase 2: Diário/Grimório
    └── apps/grimorio (reutiliza database/core/api)

  Fase 3: Estudos
    ├── apps/umbanda
    └── apps/espiritismo

  Fase 4: Mobile
    └── apps/mobile (Expo/React Native)

  🎯 Stack Recomendada (Mínima Necessária)

  | Camada    | Tecnologia           | Por quê?
  |
  |-----------|----------------------|--------------------------------------------------------------------
  |
  | Database  | Prisma + SQLite      | SQLite local para começar, migra para PostgreSQL depois sem código
  |
  | API       | tRPC v11             | Type-safe de ponta a ponta, sem duplicação de tipos
  |
  | Validação | Zod                  | Já está no projeto, integra com Prisma e tRPC
  |
  | State     | TanStack Query v5    | Cache, refetch, otimista - padrão da indústria
  |
  | UI        | shadcn/ui + Tailwind | Já configurado, design system consistente
  |

  Sobre o Objeto da Carta

  Seu JSON está excelente! Alguns ajustes técnicos:

  // Seu objeto (com hífens)
  {
    "vertical-meaning": ["..."],
    "inverted-meaning": ["..."],
    "types-of-reading": [...]
  }

  // Recomendação TypeScript (camelCase)
  {
    "verticalMeaning": ["..."],
    "invertedMeaning": ["..."],
    "typesOfReading": [...]
  }

  Estrutura de Tipos Proposta:

  // packages/core/src/tarot/card.schema.ts
  import { z } from 'zod';

  export const readingTypeSchema = z.object({
    type: z.enum(['general', 'love-relationship', 'career-money', 'personal-spiritual', 'inverted']),
    read: z.string(),
  });

  export const tarotCardSchema = z.object({
    id: z.string().uuid().optional(), // Gerado pelo banco
    name: z.string(),
    summary: z.string(),
    description: z.string(),
    verticalMeaning: z.array(z.string()),
    invertedMeaning: z.array(z.string()),
    numerology: z.string(),
    astrology: z.string().optional(),
    typesOfReading: z.array(readingTypeSchema),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

  export type TarotCard = z.infer<typeof tarotCardSchema>;
  export type ReadingType = z.infer<typeof readingTypeSchema>;

  🗄️ Schema do Prisma (Database)

  // packages/database/prisma/schema.prisma

  model TarotCard {
    id               String         @id @default(uuid())
    name             String         @unique
    summary          String
    description      String
    verticalMeaning  String[]       // Array de strings
    invertedMeaning  String[]
    numerology       String
    astrology        String?
    typesOfReading   ReadingType[]  // Relação 1:N
    createdAt        DateTime       @default(now())
    updatedAt        DateTime       @updatedAt
  }

  model ReadingType {
    id        String     @id @default(uuid())
    type      String     // 'general', 'love-relationship', etc
    read      String     @db.Text
    cardId    String
    card      TarotCard  @relation(fields: [cardId], references: [id], onDelete: Cascade)
  }

  🚀 Plano de Implementação - Fase 1

  Ordem Técnica Lógica (sem estimativas de tempo):

  1. Criar packages/database
    - Inicializar Prisma
    - Criar schema das cartas
    - Criar migration inicial
    - Seed com "O Mago" (seu objeto)
  2. Criar packages/core
    - Schemas Zod das cartas
    - Tipos TypeScript exportados
    - Utilitários de validação
  3. Criar apps/api
    - Setup tRPC v11
    - Routers: tarot.getAll, tarot.getById, tarot.create
    - Integrar com Prisma
  4. Criar apps/tarot
    - Setup Next.js 15
    - tRPC client configurado
    - Páginas: / (lista), /cartas/[id] (detalhe)
    - Componentes: CardGrid, CardDetail
  5. Atualizar apps/web
    - Portal com links para /tarot
    - Navegação entre apps

  💡 Decisões Arquiteturais

  Por que tRPC e não REST puro?

  | Aspecto       | REST                     | tRPC                          |
  |---------------|--------------------------|-------------------------------|
  | Type-safety   | ❌ Duplicar tipos         | ✅ Compartilha automaticamente |
  | Validação     | ⚠️ Manual (Zod separado) | ✅ Zod integrado               |
  | Docs          | ⚠️ Precisa Swagger       | ✅ Autocomplete no editor      |
  | Mobile futuro | ✅ Padrão universal       | ⚠️ Precisa adapter (existe)   |

  Recomendação: Começar com tRPC. Se mobile precisar de GraphQL/REST, adicionar camada depois.

  Por que SQLite → PostgreSQL?

  - Agora: SQLite = zero configuração, arquivo local, perfeito para desenvolvimento
  - Depois: PostgreSQL = produção, Supabase/Vercel Postgres, mesma API Prisma (só trocar connection
  string)

  Por que apps separados (/tarot, /web)?

  - Isolamento: Cada app tem bundle, rotas, deploy independente
  - Performance: Não carrega código do Grimório quando usar Tarot
  - Mobile: API já está separada, fácil consumir
  - Escalabilidade: Time pode trabalhar em apps diferentes sem conflito

  🎨 Fluxo de Dados Proposto

  ┌─────────────┐
  │  apps/web   │  ← Portal/Hub (links para apps)
  │  (Next.js)  │
  └─────────────┘

  ┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
  │ apps/tarot  │────▶│   apps/api   │────▶│ packages/       │
  │  (Next.js)  │     │    (tRPC)    │     │  database       │
  │             │◀────│              │◀────│  (Prisma)       │
  │  - UI       │     │  - Routers   │     │                 │
  │  - TanStack │     │  - Auth      │     │  ┌───────────┐  │
  │    Query    │     │  - Validação │     │  │ SQLite    │  │
  └─────────────┘     └──────────────┘     │  └───────────┘  │
         │                   │              │                 │
         │                   │              └─────────────────┘
         │                   │
         └───────┬───────────┘
                 │
          ┌──────▼──────┐
          │  packages/  │
          │    core     │
          │             │
          │  - Tipos    │
          │  - Schemas  │
          │  - Utils    │
          └─────────────┘

  ⚠️ O que NÃO fazer agora (evitar over-engineering)

  ❌ Microserviços separados (Tarot API, Grimório API...)
  ❌ GraphQL Federation
  ❌ Autenticação complexa (Auth0, Clerk) - deixar para depois
  ❌ Testes E2E completos - começar com alguns unitários
  ❌ CI/CD complexo - começar simples
  ❌ Docker/Kubernetes - desenvolvimento local primeiro
  ❌ Múltiplos bancos de dados