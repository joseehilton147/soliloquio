# Framework de Auditoria Atomic Design
## Guia para LLMs - Detecção e Correção de Violações de Design Atômico

**Fundamento Teórico:** Este framework é implementação prática de [Sistemas Holonômicos](./holonomic-systems-guide.md) - cada nível Atomic é um **holon** (todo completo + parte de algo maior).

**Padrões e Referências Aplicados:**
- [Sistemas Holonômicos - Arthur Koestler (1967)](./holonomic-systems-guide.md) ← Fundamento teórico
- [Atomic Design - Brad Frost (2016)](https://atomicdesign.bradfrost.com/)
- [Atomic Design Methodology Explained](https://www.uxpin.com/studio/blog/atomic-design/)
- [Component-Driven Development](https://www.componentdriven.org/)
- [Feature-Sliced Design](https://feature-sliced.design/)

---

## 📦 SEÇÃO 0: PATTERNS DO PROJETO

**Stack Técnico:**
- ✅ Tailwind CSS v4 (utility-first)
- ✅ shadcn/ui (componentes base)
- ✅ CVA (Class Variance Authority)
- ✅ Radix UI (Slot pattern)
- ✅ TypeScript Strict

**Hierarquia Atomic:**

```
apps/tarot/src/
├── components/              # Componentes genéricos Atomic
│   ├── molecules/
│   │   └── tarot/
│   │       └── tiragens-tabs/
│   └── templates/
│       ├── providers/
│       └── tarot/layout/
│
├── features/                # Domain-specific (Feature Folders)
│   ├── arcanos/
│   │   ├── components/      # Organisms domain-specific
│   │   └── domain/          # Types + constants
│   ├── baralhos/
│   │   ├── components/
│   │   └── domain/
│   ├── cartas/
│   │   ├── components/
│   │   └── domain/
│   ├── naipes/
│   │   ├── components/      # 15 componentes Atomic
│   │   └── domain/
│   └── tiragens/
│       ├── components/      # 19 componentes organizados
│       │   ├── page/        # Hero, CTA, etc.
│       │   ├── spread/
│       │   │   ├── cards/   # CardBack, CardFront, CosmicCard
│       │   │   ├── effects/ # CosmicBackground, EnergyConnections
│       │   │   ├── guides/  # CelticCrossGuide, etc.
│       │   │   └── layouts/ # CelticCrossLayout
│       │   └── guides/
│       └── domain/
│
├── shared/                  # Compartilhados entre features
│   ├── components/
│   │   └── layout/          # MysticalLayout
│   └── constants/           # ElementColors, etc.
│
└── types/                   # Barrel de tipos globais
    └── index.ts
```

**Princípio:** Componentes genéricos em `src/components/`, domain-specific em `src/features/[feature]/components/`.

---

## 🧬 FUNDAMENTO HOLONÔMICO

**Por que Atomic Design funciona?** Porque implementa princípios holonômicos de Arthur Koestler (1967).

### Cada Nível É Um Holon

| Nível | Auto-Afirmativo (Todo) | Integrativo (Parte) |
|-------|------------------------|---------------------|
| **Atom** | Funciona isoladamente, testável | Compõe Molecules |
| **Molecule** | Funciona isoladamente, testável | Compõe Organisms |
| **Organism** | Funciona isoladamente, testável | Compõe Templates |
| **Template** | Funciona isoladamente, testável | Renderiza em Pages |

### Patologias a Detectar

| Patologia | Sintoma | Violação |
|-----------|---------|----------|
| **Câncer** | Componente cresce sem limite, retesta dependências | Excesso auto-afirmativo |
| **Morte** | Componente não testável, totalmente acoplado | Excesso integrativo |

> **Leia mais:** [holonomic-systems-guide.md](./holonomic-systems-guide.md)

---

## 📋 INSTRUÇÕES PARA LLM

**PROTOCOLO DE EXECUÇÃO:**

Quando referenciado, você DEVE executar automaticamente:

### 1. IDENTIFICAR CONTEXTO
- Arquivos modificados: `git diff --name-only main...HEAD`
- Escopo: Novo componente? Refatoração? Feature?
- Nível Atomic: Atom? Molecule? Organism? Template?

### 2. EXECUTAR AUDITORIA (6 ETAPAS)

**Etapa 1: Mapear Hierarquia**
```bash
find src/components -type f -name "*.tsx" | grep -v test
```

**Etapa 2: Identificar Violações**
- Detectar AD-001 a AD-006 (Seção 1)
- Priorizar por severidade: CRÍTICA > ALTA > MÉDIA > BAIXA

**Etapa 3: Calcular Métricas**
- Component Level Accuracy (>90%)
- Naming Semantic Score (>85%)
- Feature Folder Coverage (>80%)

**Etapa 4: Validar Nomenclatura**
- Detectar prefixos técnicos
- Validar context in path
- Identificar nomes verbose

**Etapa 5: Scoring Final**
- 90-100: ✅ LIMPO
- 75-89: ⚠️ ATENÇÃO
- 60-74: ❌ CRÍTICO
- <60: 🚫 BLOQUEADOR

### 3. REGRAS ABSOLUTAS

**SEMPRE:**
- ✅ Execute TODAS as 6 Etapas
- ✅ Use Glob/Grep antes de modificar
- ✅ Calcule score numérico exato
- ✅ Priorize context in path
- ✅ Separe ui/ (genérico) de domain/

**NUNCA:**
- ❌ Crie componentes sem verificar se existem
- ❌ Use prefixos técnicos sem contexto
- ❌ Misture UI genérico com domain-specific
- ❌ Pule criação de index.ts

---

## 0. GUIA DE AUTO-REVISÃO (SELF-REVIEW)

**Quando usar:** Criar/mover/renomear componente ANTES de commit.

### Checklist Completo

#### 1. Hierarquia Correta

- [ ] **Atom?** Sem dependências custom
- [ ] **Molecule?** Combina 2+ atoms
- [ ] **Organism?** Seção complexa, pode ser domain-specific
- [ ] **Template?** Layout completo + global state

#### 2. Nomenclatura Semântica

- [ ] Nome revela intenção? (não genérico)
- [ ] Context in Path aplicado?
- [ ] Sem prefixos técnicos?
- [ ] Domain language? (ArcanoCard vs DataCard)
- [ ] Substantivos para componentes?

#### 3. Feature Folders vs UI Genérico

- [ ] Genérico → `organisms/ui/` ou `molecules/ui/`
- [ ] Domain-specific → `organisms/tarot/`, `molecules/tarot/`

#### 4. Index Exports

- [ ] Criou index.ts para feature folder?
- [ ] Re-exporta com nome completo?

---

## 1. TAXONOMIA DE VIOLAÇÕES ATOMIC DESIGN

### 1.1 AD-001: Wrong Component Level

**Definição:** Componente no nível errado da hierarquia.

**Severidade:** CRÍTICA | **Detectável:** SEMI-AUTO

**Exemplo (contexto Tarot):**

```typescript
// ❌ VIOLAÇÃO - Atom importando Molecule
// atoms/element-badge.tsx
import { Badge } from '@/components/atoms/badge'
import { ElementIcon } from '@/components/molecules/element-icon'  // ❌

// ✅ CORREÇÃO - Promover para Molecule
// molecules/tarot/element-badge.tsx
import { Badge } from '@/components/atoms/badge'
import { ElementIcon } from '@/components/molecules/element-icon'  // ✅
```

**Detecção:**
```bash
grep -r "from '@/components/molecules" src/components/atoms/
grep -r "from '@/components/organisms" src/components/molecules/
```

**Threshold:** Component Level Accuracy **>95%**

---

### 1.2 AD-002: Non-Semantic Naming

**Definição:** Nomes sem intenção, prefixos técnicos, não seguem domain language.

**Severidade:** ALTA | **Detectável:** SEMI-AUTO

**Exemplo:**

```typescript
// ❌ VIOLAÇÃO - Nome genérico
// organisms/CardList.tsx
export function CardList() { }

// ✅ CORREÇÃO - Domain language
// organisms/tarot/arcano-grid.tsx
export function ArcanoGrid() { }
```

**Threshold:** Semantic Naming Score **>85%**

---

### 1.3 AD-003: Missing Feature Folders

**Definição:** Domain-specific misturado com UI genérico.

**Severidade:** ALTA | **Detectável:** SEMI-AUTO

**Exemplo:**

```typescript
// ❌ VIOLAÇÃO - Domain-specific em root
molecules/
├── Button.tsx               // Genérico ✅
├── NaipeCard.tsx            // ❌ Domain-specific

// ✅ CORREÇÃO - Feature folders
molecules/ui/                 // Genérico
├── Button.tsx

molecules/tarot/             // Feature
├── naipe-card/
│   ├── naipe-card.tsx
│   └── index.ts
```

**Threshold:** Feature Folder Coverage **>80%**

---

### 1.4 AD-004: Generic/Domain Mix

**Definição:** UI genérico misturado com domain-specific no mesmo diretório.

**Severidade:** MÉDIA | **Detectável:** MANUAL

**Exemplo:**

```typescript
// ❌ VIOLAÇÃO - Mistura
organisms/
├── Drawer.tsx               // ❌ Genérico
├── SpreadCanvas.tsx         // ❌ Domain-specific

// ✅ CORREÇÃO - Hybrid Structure
organisms/ui/                 // Genérico
├── Drawer/

organisms/tarot/              // Domain
└── spread-canvas/
```

---

### 1.5 AD-005: Over-Engineering

**Definição:** Abstração complexa quando solução simples é suficiente.

**Severidade:** MÉDIA | **Detectável:** MANUAL

**Exemplo:**

```typescript
// ❌ VIOLAÇÃO - Abstração prematura (usado 1x)
interface GenericCardProps {
  // ... 15 props
}
export function GenericCard({ ... }: GenericCardProps) {
  // 80 linhas, usado APENAS em ArcanoCard
}

// ✅ CORREÇÃO - Começar simples
interface ArcanoCardProps {
  arcano: Arcano
  selected: boolean
  onSelect: () => void
}
export function ArcanoCard({ arcano, selected, onSelect }: ArcanoCardProps) {
  // 30 linhas específicas
  // Se usado 3+ vezes, DEPOIS extrair
}
```

**Threshold:**
- Avg Props: **<7**
- Max Length: **<150 linhas**

---

### 1.6 AD-006: Missing Index Exports

**Definição:** Falta barrel files (index.ts) para limpar imports.

**Severidade:** BAIXA | **Detectável:** AUTOMÁTICO

**Exemplo:**

```typescript
// ❌ VIOLAÇÃO - Sem index.ts
organisms/tarot/spread-canvas/
├── spread-canvas.tsx
└── spread-canvas.test.tsx

// Import quebradiço:
import { SpreadCanvas } from '@/components/organisms/tarot/spread-canvas/spread-canvas'  // ❌

// ✅ CORREÇÃO - Com index.ts
organisms/tarot/spread-canvas/
├── spread-canvas.tsx
├── spread-canvas.test.tsx
└── index.ts  // ✅

// index.ts
export { SpreadCanvas } from './spread-canvas'

// Import estável:
import { SpreadCanvas } from '@/components/organisms/tarot/spread-canvas'  // ✅
```

**Threshold:** Index Coverage **100%**

---

## 2. PROCESSO DE AUDITORIA

### Visão Geral

```
1. MAPEAR → 2. DETECTAR → 3. MEDIR → 4. VALIDAR → 5. SCORE → 6. RELATÓRIO
```

### Passo 1: Mapear Hierarquia Atual

```bash
echo "📊 ATOMIC DESIGN HIERARCHY MAP"
echo "Atoms:"
find src/components/atoms -name "*.tsx" -not -name "*.test.tsx" 2>/dev/null | wc -l
echo "Molecules:"
find src/components/molecules -name "*.tsx" -not -name "*.test.tsx" 2>/dev/null | wc -l
echo "Organisms:"
find src/components/organisms -name "*.tsx" -not -name "*.test.tsx" 2>/dev/null | wc -l
echo "Templates:"
find src/components/templates -name "*.tsx" -not -name "*.test.tsx" 2>/dev/null | wc -l
```

### Passo 5: Calcular Score Final

**Classificação:**
| Score | Status | Ação |
|-------|--------|------|
| 90-100 | ✅ LIMPO | Aprovar PR |
| 75-89 | ⚠️ ATENÇÃO | Aprovar com ressalvas |
| 60-74 | ❌ CRÍTICO | Bloquear PR |
| <60 | 🚫 BLOQUEADOR | Rejeitar PR |

---

## 3. NOMENCLATURA SEMÂNTICA (BRAD FROST)

### Princípios Fundamentais

1. **Use the Language of Your Users**
   - ❌ DataGrid, RecordList
   - ✅ ArcanoGrid, SpreadList

2. **Context in Path, Not in Name**
   - ❌ `NaipeCard.tsx` em root
   - ✅ `Card.tsx` em organisms/tarot/naipes/

3. **No Technical Prefixes**
   - ❌ Step1, Step2, Form
   - ✅ Selection, Summary, ReadingForm

4. **Substantivos para Componentes**
   - ✅ SpreadSelection
   - ❌ SelectSpread

### Hybrid Structure (Solilóquio)

```
src/
├── components/               # Genéricos (poucos)
│   ├── molecules/tarot/      # Tiragens-tabs
│   └── templates/            # Providers, TarotLayout
│
├── features/                 # Domain-specific (principal)
│   ├── arcanos/components/   # ArcanoPortalCard, HeroSection
│   ├── baralhos/components/  # DeckCard, HeroSection
│   ├── cartas/components/    # ReflectionMessage
│   ├── naipes/components/    # 15 componentes (NaipeCard, etc)
│   └── tiragens/components/  # 19 componentes organizados
│
└── shared/components/        # Entre features (GlobalSearch, etc)
```

**Decisão arquitetural:** Componentes domain-specific vivem DENTRO de suas features, não em `src/components/organisms/tarot/`.

### Regras de Nomenclatura

| Contexto | Regra | ERRADO | CORRETO |
|----------|-------|--------|---------|
| Root | Nome completo | `Card.tsx` | `ArcanoCard.tsx` |
| Feature | Nome curto | `ArcanoCard.tsx` | `Card.tsx` |
| Prefixo | Evitar | `Step1Reading.tsx` | `ReadingStart.tsx` |
| Domain | Sempre | `DataGrid.tsx` | `SpreadGrid.tsx` |

---

## 4. MÉTRICAS E THRESHOLDS

### Benchmarking

| Métrica | Limpo | Atenção | Crítico | Fonte |
|---------|-------|---------|---------|-------|
| Component Level Accuracy | >95% | 85-95% | <85% | Google Eng Practices |
| Naming Semantic Score | >85% | 70-85% | <70% | ISTQB |
| Feature Folder Coverage | >80% | 60-80% | <60% | Atomic Design |
| Generic Separation | >90% | 75-90% | <75% | Feature-Sliced Design |
| Index Coverage | 100% | 90-99% | <90% | Barrel Exports |

---

## 5. GLOSSÁRIO TÉCNICO

**Atomic Design:** Metodologia de Brad Frost. Hierarquia: Atoms → Molecules → Organisms → Templates → Pages.

**Hybrid Structure:** Separa UI genérico (ui/) de domain-specific (tarot/).

**Feature Folders:** Organizar por domain (arcanos/, naipes/) vs tipo técnico.

**Context in Path:** Usar caminho como contexto. `Card.tsx` em `tarot/arcanos/` é claro.

**Domain Language:** Linguagem do negócio (ArcanoCard) vs técnica (DataCard).

### Níveis Atomic

**Atom:** Básico, sem dependências custom. Ex: Button, Input, Badge

**Molecule:** Combina 2+ atoms. Ex: ElementBadge (Badge + Icon)

**Organism:** Seção complexa. Ex: SpreadCanvas, NaipeGrid

**Template:** Layout completo + global state. Ex: TarotLayout

---

## 6. GUIA DE REMEDIAÇÃO

### Estratégia (Ordem de Prioridade)

1. **AD-001** (CRÍTICA): Hierarquia
2. **AD-002** (ALTA): Nomenclatura
3. **AD-003** (ALTA): Feature folders
4. **AD-004** (MÉDIA): Separação ui/
5. **AD-006** (BAIXA): Index exports

### Checklist por Violação

**AD-001 (Wrong Level):**
- [ ] Identificar nível errado
- [ ] Determinar nível correto
- [ ] Mover arquivo
- [ ] Atualizar imports
- [ ] Validar hierarquia

**AD-002 (Naming):**
- [ ] Identificar prefixos técnicos
- [ ] Aplicar context in path
- [ ] Usar domain language (tarot)
- [ ] Renomear arquivos
- [ ] Criar index.ts

**AD-003 (Feature Folders):**
- [ ] Identificar features (arcanos, naipes, tiragens)
- [ ] Criar feature folders
- [ ] Mover domain-specific
- [ ] Manter genérico em ui/

---

## Conexão Espiritual

> "Como os Orixás têm suas hierarquias - Oxalá coordena, cada Orixá tem seu domínio - assim nossos componentes respeitam sua hierarquia."

Atoms são como os elementos fundamentais da natureza (fogo, água, terra, ar). Molecules são como as cartas - combinações desses elementos. Organisms são como os spreads - arranjos significativos. Templates são como o terreiro - o espaço sagrado onde tudo acontece.

Violações de hierarquia são como desrespeitar a ordem natural. A harmonia do código reflete a harmonia espiritual.

---

*Framework v1.1 - Baseado em Brad Frost Atomic Design*
*Adaptado de frontend-apps/tomador*
*Última atualização: 2025-12-30*
