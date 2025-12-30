# Documentação Técnica - Solilóquio Monorepo

> "Código é veículo para jornada espiritual. Estrutura clara permite foco no que importa."

**Localização:** `apps/docs/` (documentação centralizada do monorepo)

## Índice

### Roteiro Principal

| Documento | Descrição | Status |
|-----------|-----------|--------|
| [REFACTORING-ROADMAP.md](./REFACTORING-ROADMAP.md) | Roteiro mestre de refatoração | ✅ Ativo |

---

### Guias de Desenvolvimento

| Guia | Descrição | Status |
|------|-----------|--------|
| [01-getting-started.md](./guides/01-getting-started.md) | Setup inicial do projeto | ✅ Ativo |
| [02-project-structure.md](./guides/02-project-structure.md) | Estrutura de pastas e arquitetura | ✅ Ativo |
| [03-component-development.md](./guides/03-component-development.md) | Padrões de componentes (Atomic Design) | ✅ Ativo |

---

### Frameworks de Qualidade

| Framework | Descrição | Status |
|-----------|-----------|--------|
| [holonomic-systems-guide.md](./frameworks/holonomic-systems-guide.md) | **Fundamento teórico unificador** (Arthur Koestler) | ✅ Ativo |
| [atomic-design-llm-guide.md](./frameworks/atomic-design-llm-guide.md) | Guia Atomic Design para LLMs | ✅ Ativo |
| [testing-hierarchy-principle.md](./frameworks/testing-hierarchy-principle.md) | Princípio de Confiança para testes | ✅ Ativo |
| [code-review-prompt.md](./frameworks/code-review-prompt.md) | Prompt para code review automatizado | ✅ Ativo |
| [ai-smell-audit-report.md](./frameworks/ai-smell-audit-report.md) | Detecção de code smells em código LLM | ✅ Ativo |

---

### Brainstorm (Ideias Futuras)

| Documento | Descrição | Status |
|-----------|-----------|--------|
| [lint-rules-atomic-design.md](./brainstorm/lint-rules-atomic-design.md) | **ESLint plugin para forçar Atomic Design** | 📝 Futuro |

---

## Quick Reference

### Arquitetura de Componentes

```
┌─────────────────────────────────────────────────────────┐
│ packages/ui (COMPARTILHADO - 38 componentes)           │
├─────────────────────────────────────────────────────────┤
│ ├── atoms/        → Button, Logo, MoonPhaseIcon        │
│ ├── molecules/    → PageHeader, RichTextEditor         │
│ ├── organisms/    → AppHeader, LunarCalendar           │
│ └── templates/    → (layouts genéricos)                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ apps/tarot/src/features (DOMAIN-SPECIFIC)              │
├─────────────────────────────────────────────────────────┤
│ ├── arcanos/components/ → ArcanoCard, ArcanoGrid       │
│ ├── naipes/components/  → NaipeCard, ElementBadge      │
│ └── tiragens/components/→ SpreadCanvas, SpreadCard     │
└─────────────────────────────────────────────────────────┘
```

### Regras de Ouro

1. **Atoms**: Teste TUDO (comportamento isolado)
2. **Molecules**: Teste COMPOSIÇÃO + PROPS + NOVA LÓGICA
3. **Organisms**: Teste ORQUESTRAÇÃO + ESTADO + SIDE EFFECTS
4. **Templates**: Teste LAYOUT + ROTEAMENTO + ESTADO GLOBAL

### Thresholds de Qualidade

| Métrica | Limpo | Atenção | Crítico |
|---------|-------|---------|---------|
| Component Level Accuracy | >95% | 85-95% | <85% |
| Naming Semantic Score | >85% | 70-85% | <70% |
| Code Duplication | <5% | 5-15% | >15% |
| JSDoc Noise Ratio | <15% | 15-40% | >40% |
| Function Length | <30 lines | 30-50 | >50 |

---

## Convenções

### Nomenclatura de Arquivos

```
kebab-case.tsx       # Componentes
use-kebab-case.ts    # Hooks
kebab-case.test.tsx  # Testes
entities.ts          # Types de entidades
api.ts               # Types de API
```

### Estrutura de Componente

```
component-name/
├── component-name.tsx       # Componente
├── component-name.test.tsx  # Testes
├── types.ts                 # Types locais
└── index.ts                 # Barrel export
```

### Imports

```typescript
// NUNCA
import Component from './component'
export default Component

// SEMPRE
import { Component } from './component'
export { Component }
```

---

## Workflow de Desenvolvimento

```
1. VIEW    → Entenda a estrutura antes de modificar
2. GREP    → Encontre arquivos relacionados
3. THINK   → Analise impacto das mudanças
4. CODE    → Implemente incrementalmente
5. CHECK   → Valide types, lint, testes
```

---

## Conexão Espiritual

Este projeto é um **diário espiritual digital**. Cada componente, cada linha de código, é oportunidade de prática contemplativa.

**Fundamento Holonômico:** Cada componente é um **holon** - simultaneamente todo completo (auto-afirmativo) e parte de algo maior (integrativo). Assim como cada Orixá tem seu axé próprio mas coopera no terreiro.

**Tradições que nos guiam:**
- **Sistemas Holonômicos**: Equilíbrio entre autonomia e integração (Arthur Koestler)
- **Umbanda**: Hierarquias harmônicas (como Atomic Design) - cada Orixá é um holon
- **Kardecismo**: Causa e efeito (side effects conscientes) - Lei de Evolução
- **Maçonaria**: Polimento contínuo (refatoração) - pedra bruta → polida
- **Budismo**: Impermanência (state management) - fluxo consciente

> "Como Oxalá coordena o terreiro sem anular a autonomia de cada Orixá, assim nossos componentes equilibram identidade própria com cooperação. Cada um com seu axé, cada um com seu propósito, todos em harmonia."

---

## Links Importantes

- **CLAUDE.md**: Instruções para assistentes de IA
- **README.md**: Visão geral do projeto
- **REFACTORING-ROADMAP.md**: Roteiro de migração

---

*Última atualização: 2025-12-29*
