# 🏛️ Arquitetura do App Tarô Solilóquio

## 📖 Visão Geral

Este documento descreve a arquitetura do app Tarô após refatoração DDD (Domain-Driven Design) implementada em novembro de 2025. O projeto segue princípios de modularização, separação de responsabilidades e preparação para escalabilidade.

---

## 🎯 Princípios Arquiteturais Aplicados

### **Design Patterns**
- **DDD (Domain-Driven Design)**: Organização por domínios de negócio
- **Feature Modules**: Cada feature é autocontida (domain + components + hooks)
- **SOLID Principles**: Single Responsibility, Dependency Inversion
- **Separation of Concerns**: UI separada de lógica de negócio

### **Best Practices**
- **KISS (Keep It Simple, Stupid)**: Simplicidade sobre complexidade
- **DRY (Don't Repeat Yourself)**: Código reutilizável centralizado
- **YAGNI (You Aren't Gonna Need It)**: Implementar apenas o necessário

---

## 📁 Estrutura de Pastas

```
apps/tarot/
├── app/                                # Next.js 15 App Router
│   ├── (portal)/                       # Route Group Principal
│   │   ├── cartas/
│   │   │   ├── page.tsx                # Lista de cartas
│   │   │   ├── [slug]/                 # Carta individual
│   │   │   ├── nova/                   # Criar nova carta
│   │   │   ├── arcanos/
│   │   │   │   ├── page.tsx            # Índice de arcanos
│   │   │   │   ├── maiores/page.tsx
│   │   │   │   └── menores/page.tsx
│   │   │   └── naipes/
│   │   │       ├── page.tsx            # Índice de naipes
│   │   │       ├── copas/page.tsx      # Naipe Água
│   │   │       ├── paus/page.tsx       # Naipe Fogo
│   │   │       ├── ouros/page.tsx      # Naipe Terra
│   │   │       └── espadas/page.tsx    # Naipe Ar
│   │   ├── tiragens/
│   │   │   ├── page.tsx                # Índice de tiragens
│   │   │   └── [slug]/                 # Tiragem dinâmica
│   │   │       ├── page.tsx
│   │   │       └── components/         # Componentes específicos
│   │   │           ├── tiragem-client.tsx
│   │   │           ├── cards/          # Componentes de cartas
│   │   │           ├── effects/        # Efeitos visuais
│   │   │           └── layouts/        # Layouts de tiragens
│   │   └── baralhos/
│   │       ├── page.tsx
│   │       ├── [slug]/page.tsx
│   │       └── novo/page.tsx
│   ├── configuracoes/                  # Configurações do app
│   │   └── page.tsx
│   ├── api/                            # API Routes
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Home page
│   └── not-found.tsx
│
├── src/
│   ├── features/                       # 🎯 Feature Modules (DDD)
│   │   ├── arcanos/
│   │   │   ├── domain/
│   │   │   │   ├── arcanos.data.ts     # Dados dos Arcanos Maiores/Menores
│   │   │   │   ├── arcanos.types.ts    # Tipos TypeScript
│   │   │   │   └── index.ts            # Barrel export
│   │   │   ├── components/
│   │   │   │   ├── arcano-portal-card.tsx
│   │   │   │   ├── arcanos-hero-section.tsx
│   │   │   │   ├── cartas-hero-section.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts                # Feature barrel export
│   │   │
│   │   ├── naipes/
│   │   │   ├── domain/
│   │   │   │   ├── naipes.data.ts      # Dados dos 4 naipes
│   │   │   │   ├── naipes.types.ts     # Tipos de naipes
│   │   │   │   ├── naipe-colors.config.ts
│   │   │   │   └── index.ts
│   │   │   ├── components/             # 15 componentes de UI
│   │   │   │   ├── naipe-card.tsx
│   │   │   │   ├── naipe-header.tsx
│   │   │   │   ├── four-elements-section.tsx
│   │   │   │   └── ... (outros)
│   │   │   └── index.ts
│   │   │
│   │   └── tiragens/
│   │       ├── domain/
│   │       │   └── spreads/            # ✨ Spreads Modulares
│   │       │       ├── quick/          # Tiragens rápidas (1 carta)
│   │       │       │   ├── sim-ou-nao.ts
│   │       │       │   └── index.ts
│   │       │       ├── insight/        # Tiragens de insight (3 cartas)
│   │       │       │   ├── conselho-do-universo.ts
│   │       │       │   └── index.ts
│   │       │       ├── deep/           # Tiragens profundas (10 cartas)
│   │       │       │   ├── cruz-celta.ts
│   │       │       │   └── index.ts
│   │       │       └── index.ts        # Exporta ALL_SPREADS + helpers
│   │       ├── components/
│   │       │   ├── spread-card.tsx
│   │       │   ├── spread-canvas.tsx
│   │       │   └── index.ts
│   │       └── index.ts
│   │
│   ├── shared/                         # 🔗 Código Compartilhado
│   │   ├── components/                 # Componentes cross-feature
│   │   │   ├── mystical-layout.tsx     # Layout principal
│   │   │   ├── global-search.tsx       # Busca global (Cmd+K)
│   │   │   ├── draft-recovery.tsx      # Recuperação de rascunhos
│   │   │   ├── page-loading-indicator.tsx
│   │   │   └── index.ts
│   │   ├── constants/                  # 🎨 Constantes centralizadas
│   │   │   ├── element-colors.ts       # ⭐ Sistema de cores elementais
│   │   │   └── index.ts
│   │   ├── contexts/                   # Contextos React
│   │   │   ├── dock-settings-context.tsx
│   │   │   └── reading-context.tsx
│   │   ├── hooks/                      # Custom hooks
│   │   ├── lib/                        # Utilitários
│   │   └── index.ts
│   │
│   └── providers.tsx                   # Providers do app
│
├── public/                             # Assets estáticos
│   └── images/
│       └── cartas/                     # Imagens dos arcanos
│
├── ARCHITECTURE.md                     # Este arquivo
└── package.json
```

---

## 🎯 Feature Modules (DDD)

### **Padrão de Estrutura**

Cada feature module segue o padrão DDD:

```
features/{nome}/
├── domain/              # 📚 Lógica de negócio, tipos, dados
│   ├── {nome}.data.ts   # Dados do domínio
│   ├── {nome}.types.ts  # Tipos TypeScript
│   └── index.ts         # Barrel export
├── components/          # 🎨 Componentes UI específicos
│   ├── {component}.tsx
│   └── index.ts
├── hooks/              # 🪝 Hooks customizados (opcional)
├── lib/                # 🔧 Utilitários (opcional)
└── index.ts            # Feature barrel export
```

### **Features Implementadas**

#### **1. Arcanos** (`features/arcanos/`)
- **Responsabilidade**: Gerenciar Arcanos Maiores (0-XXI) e Menores (Ases a Reis)
- **Domain**: `arcanos.data.ts` (78 cartas), `arcanos.types.ts`
- **Components**: Portal cards, hero sections
- **Rotas**: `/cartas/arcanos`, `/cartas/arcanos/maiores`, `/cartas/arcanos/menores`

#### **2. Naipes** (`features/naipes/`)
- **Responsabilidade**: Gerenciar os 4 naipes e seus elementos
- **Domain**:
  - `naipes.data.ts`: Copas (Água), Paus (Fogo), Ouros (Terra), Espadas (Ar)
  - `naipe-colors.config.ts`: Configurações de cores por naipe
- **Components**: 15 componentes (grids, headers, sections, etc)
- **Rotas**: `/cartas/naipes/copas`, `/cartas/naipes/paus`, etc

#### **3. Tiragens** (`features/tiragens/`)
- **Responsabilidade**: Gerenciar spreads de tarot e suas visualizações
- **Domain Modular**:
  - `spreads/quick/`: Sim ou Não (1 carta)
  - `spreads/insight/`: Conselho do Universo (3 cartas)
  - `spreads/deep/`: Cruz Celta (10 cartas)
- **Components**: Cards, canvas, layouts específicos
- **Rotas**: `/tiragens`, `/tiragens/sim-ou-nao`, `/tiragens/cruz-celta`

---

## 🎨 Sistema de Cores Elementais

### **Arquivo Centralizado**
📍 **Localização**: `src/shared/constants/element-colors.ts`

### **Conceito**
Sistema unificado de cores para os 5 elementos místicos, preparado para múltiplos temas customizáveis.

### **Elementos**
- **Água** (`agua`): Copas - Azul/Cyan (Emoção, Intuição)
- **Fogo** (`fogo`): Paus - Vermelho/Laranja (Paixão, Energia)
- **Terra** (`terra`): Ouros - Âmbar/Amarelo (Estabilidade, Materialização)
- **Ar** (`ar`): Espadas - Cinza/Prata (Intelecto, Clareza)
- **Espírito** (`espirito`): Quintessência - Roxo/Violeta (Transcendência)

### **Temas Disponíveis**
```typescript
type ElementalTheme = 'mystical' | 'classic' | 'nature' | 'cosmic'
```

- **Mystical** (padrão atual): Tons místicos vibrantes
- **Classic, Nature, Cosmic**: Preparados para implementação futura

### **Uso**
```typescript
import { getElementColors } from '@/shared/constants/element-colors'

// Por elemento direto
const waterColors = getElementColors('agua')
console.log(waterColors.name)       // 'Água'
console.log(waterColors.gradient)   // 'from-blue-600 to-cyan-600'

// Por categoria de tiragem
import { getCategoryColors } from '@/shared/constants/element-colors'
const colors = getCategoryColors('quick')  // Retorna cores de 'ar'
```

### **Configuração Completa**
Cada elemento possui:
- Cores primárias, secundárias, terciárias
- Gradientes (Tailwind classes)
- Neon glow (box-shadow)
- RGB values para inline styles
- Estilos específicos para páginas de naipes (opcional)

---

## 🗂️ Route Groups

### **Estrutura Atual**
```
app/
└── (portal)/           # Route group unificado
    ├── cartas/
    ├── tiragens/
    └── baralhos/
```

### **Benefícios**
- ✅ **Organização**: Agrupa rotas relacionadas visualmente
- ✅ **Layouts compartilhados**: Pode ter layout específico por grupo
- ✅ **URLs limpas**: Route groups não aparecem na URL (`/cartas`, não `/(portal)/cartas`)

### **Decisão Arquitetural**
Optou-se por **um único route group `(portal)`** ao invés de múltiplos `(cartas)`, `(tiragens)`, `(baralhos)` para:
- Simplificar estrutura de pastas
- Compartilhar um único layout entre todos os domínios
- Facilitar navegação cross-domain (breadcrumbs, links)

---

## 🔄 Fluxo de Dados

### **Importação de Módulos**
```typescript
// ✅ Features
import { ARCANOS_DATA, ArcanoPortalCard } from '@/features/arcanos'
import { NAIPES_DATA, NaipeCard } from '@/features/naipes'
import { ALL_SPREADS, getSpreadBySlug } from '@/features/tiragens'

// ✅ Shared
import { MysticalLayout } from '@/shared/components'
import { getElementColors } from '@/shared/constants'
import { useDockSettings } from '@/shared/contexts'

// ✅ Design System (monorepo)
import { Button, Card } from '@workspace/ui'
import type { TarotSpread } from '@workspace/core/tarot'
```

### **Hierarquia de Dependências**
```
app/ (routes - páginas)
  ↓
features/ (domain + UI por feature)
  ↓
shared/ (cross-cutting concerns)
  ↓
packages/ui (design system)
packages/core (business logic, tipos)
```

**Regra**: Nunca importar de níveis superiores (UI não importa de app/, shared/ não importa de features/)

---

## 📋 Convenções de Nomenclatura

### **Arquivos de Domínio**
- **Dados**: `{nome}.data.ts` (ex: `arcanos.data.ts`)
- **Tipos**: `{nome}.types.ts` (ex: `naipes.types.ts`)
- **Config**: `{nome}.config.ts` (ex: `naipe-colors.config.ts`)

### **Componentes**
- **PascalCase**: `NaipeCard.tsx`, `TiragemClient.tsx`
- **Barrel exports**: Sempre criar `index.ts` para re-exports

### **Hooks**
- **camelCase com prefixo `use`**: `use-mystical-layout.ts`

### **Utilitários**
- **camelCase**: `element-colors.ts`, `card-utils.ts`

### **Elementos (português)**
- `agua`, `fogo`, `terra`, `ar`, `espirito` (sempre minúsculo)
- Helpers disponíveis: `normalizeElementName('water')` → `'agua'`

---

## 🎯 Decisões Arquiteturais Importantes

### **✅ Por que DDD?**
- Isola lógica de negócio de apresentação
- Facilita testes unitários (testar domain/ sem UI)
- Melhora manutenibilidade (mudanças localizadas)

### **✅ Por que Feature Modules?**
- Cada feature é independente e pode ser movida/removida facilmente
- Reduz acoplamento entre domínios
- Facilita onboarding (novo dev entende um módulo por vez)

### **✅ Por que Element Colors Centralizado?**
- **Antes**: 3 arquivos duplicados (config/, naipes/domain/, tiragens/[slug]/)
- **Depois**: 1 arquivo centralizado com sistema de temas
- **Benefícios**: Single source of truth, preparado para temas customizáveis

### **✅ Por que Spreads Modulares?**
- **Antes**: `spreads.data.ts` monolítico (1.700+ linhas)
- **Depois**: 3 arquivos de ~60-150 linhas cada (quick, insight, deep)
- **Benefícios**: Fácil adicionar novos spreads, melhor performance (tree-shaking)

### **✅ Por que Route Group Único?**
- Simplifica estrutura vs múltiplos groups
- Permite layout compartilhado entre cartas/tiragens/baralhos
- Facilita navegação cross-domain

---

## 🧪 Testes (Planejado)

### **Estrutura de Testes**
```
src/features/arcanos/
├── domain/
│   ├── arcanos.data.ts
│   └── arcanos.data.test.ts      # Testes de domain
├── components/
│   ├── arcano-portal-card.tsx
│   └── arcano-portal-card.test.tsx  # Testes de componente
```

### **Tipos de Testes**
- **Unit**: Testar funções de domain/ isoladamente
- **Component**: Testar componentes com React Testing Library
- **Integration**: Testar fluxos completos (futuro)

---

## 📦 Packages Compartilhados (Monorepo)

### **@workspace/ui**
- Design System baseado em Atomic Design
- Componentes reutilizáveis (Button, Card, Badge, etc)
- Tema místico (MysticalBackground, SacredEyeLogo)

### **@workspace/core**
- Tipos e schemas compartilhados
- Validações com Zod
- Lógica de negócio pura (sem UI)
- Exemplo: `TarotSpread`, `TarotCard`, schemas de validação

---

## 🚀 Próximos Passos

### **Curto Prazo**
- [ ] Implementar testes unitários para features
- [ ] Adicionar mais spreads (expandir de 3 para 10+)
- [ ] Implementar sistema de temas nas configurações

### **Médio Prazo**
- [ ] Criar Storybook para componentes de features
- [ ] Implementar autenticação e multi-user
- [ ] Adicionar analytics e tracking de uso

### **Longo Prazo**
- [ ] Progressive Web App (PWA)
- [ ] Modo offline com cache de leituras
- [ ] Integração com IA para interpretação automática

---

## 📚 Recursos e Referências

### **Documentação Técnica**
- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Atomic Design](https://atomicdesign.bradfrost.com/)

### **Documentação do Projeto**
- `REFACTORING-ROADMAP.md`: Roteiro completo da refatoração DDD
- `src/shared/constants/element-colors.ts`: Sistema de cores elementais
- `src/data/spreads/index.ts`: Catálogo de tiragens

---

## 🙏 Contribuindo

### **Antes de Criar Nova Feature**
1. Leia este documento completo
2. Verifique se feature já existe em `src/features/`
3. Siga estrutura DDD: `domain/` + `components/` + `index.ts`
4. Use element-colors centralizado (`@/shared/constants`)
5. Crie barrel exports (`index.ts`) para imports limpos

### **Padrão de Commits**
```bash
# Features
git commit -m "feat(arcanos): adicionar arcano XXII O Mundo"

# Refatorações
git commit -m "refactor(naipes): extrair lógica para hook customizado"

# Correções
git commit -m "fix(tiragens): corrigir layout da Cruz Celta em mobile"

# Docs
git commit -m "docs(architecture): atualizar seção de testes"
```

---

## ✨ Filosofia do Projeto

> "Assim como na fé, mantemos o caminho claro e não nos desviamos."

Este projeto é uma **jornada espiritual através do código**. Cada feature, cada refatoração, cada commit é uma evolução consciente. Priorizamos:

- **Clareza sobre complexidade** (KISS)
- **Qualidade sobre quantidade** (3 tiragens perfeitas > 23 medianas)
- **Evolução incremental** (refatoração gradual, não reescrita total)
- **Documentação viva** (código autoexplicativo + docs atualizadas)

Como ensina a Maçonaria: a pedra bruta (código inicial) se transforma em pedra polida (código refatorado) através do trabalho constante e metódico. Este ARCHITECTURE.md é o mapa dessa jornada.

---

**Última atualização**: Novembro 2025
**Versão**: 1.0
**Mantido por**: @Solilóquio Team
