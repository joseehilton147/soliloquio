# Testing Hierarchy Principle

**Fundamento Teórico:** Este princípio é aplicação direta de [Sistemas Holonômicos](./holonomic-systems-guide.md) - cada nível de teste equilibra **autonomia** (testar o próprio) com **confiança** (não retestar dependências).

**Objetivo**: Prevenir duplicação de testes em componentes hierárquicos (Atomic Design) através do "Princípio de Confiança" (Principle of Trust).

**Problema**: Molecules/Organisms retestam comportamento de Atoms/Molecules, causando crescimento exponencial da suite de testes sem ganho de cobertura. Em termos holonômicos, isso é **patologia câncer** - um nível que cresce sem respeitar fronteiras.

**Solução**: Testar **contrato** (o que o componente faz), não **implementação** (como suas dependências funcionam). Equilibrar tendência **auto-afirmativa** (testar TUDO no próprio nível) com **integrativa** (confiar nos níveis abaixo).

---

## Princípio de Confiança

> **"Confie que suas dependências já têm testes próprios. Teste apenas o novo valor que seu componente adiciona."**

### Visão Holonômica

| Nível | Tendência Auto-Afirmativa | Tendência Integrativa |
|-------|---------------------------|----------------------|
| **Atom** | Testa TUDO (é a base) | Confia em nada (não tem dependências) |
| **Molecule** | Testa nova lógica | Confia nos Atoms |
| **Organism** | Testa orquestração | Confia nos Molecules |
| **Template** | Testa layout | Confia nos Organisms |

> **Leia mais:** [holonomic-systems-guide.md](./holonomic-systems-guide.md)

### Regra de Ouro

```
Nível do Componente = Escopo de Teste
- Atoms: Teste TUDO (comportamento isolado)
- Molecules: Teste COMPOSIÇÃO + PROPS + NOVA LÓGICA
- Organisms: Teste ORQUESTRAÇÃO + ESTADO + SIDE EFFECTS
- Templates: Teste LAYOUT + ROTEAMENTO + ESTADO GLOBAL
```

**Corolário crítico**: Cada nível **NÃO** retesta o nível abaixo.

---

## Hierarquia de Testes por Nível

### 1. Atoms: Teste TUDO

**Escopo**: Componentes sem dependências internas (Button, Input, Badge).

**O que testar**:
- ✅ Todas as props (disabled, variant, size, etc.)
- ✅ Todos os eventos (onClick, onChange, onFocus)
- ✅ Todas as variantes visuais (CVA classes)
- ✅ Acessibilidade completa (ARIA, keyboard nav)
- ✅ Edge cases (valores vazios, limites)

**Exemplo (contexto Tarot)**:
```typescript
// src/components/atoms/element-badge/element-badge.test.tsx
describe('ElementBadge', () => {
  it('deve renderizar elemento corretamente', () => {
    render(<ElementBadge element="fogo" />)
    expect(screen.getByText(/fogo/i)).toBeInTheDocument()
  })

  it('deve aplicar cor do elemento', () => {
    render(<ElementBadge element="agua" />)
    expect(screen.getByTestId('element-badge')).toHaveClass('bg-blue-500')
  })

  it('deve renderizar ícone quando showIcon=true', () => {
    render(<ElementBadge element="terra" showIcon />)
    expect(screen.getByRole('img', { name: /terra/i })).toBeInTheDocument()
  })
})
```

**Justificativa**: Atoms são a base da hierarquia. 100% de cobertura aqui elimina necessidade de reteste em níveis superiores.

---

### 2. Molecules: Teste CONTRATO

**Escopo**: Componentes que combinam 2-3 Atoms (NaipeCard = Icon + Text + Badge).

**O que testar**:
- ✅ Props são passadas para dependências corretas
- ✅ Composição/estrutura DOM (layout)
- ✅ **Nova** lógica (estado local, transformação de dados)
- ✅ Customização (className, testId)

**O que NÃO testar**:
- ❌ onClick do Button interno (já testado em Button.test.tsx)
- ❌ Variantes do Badge interno (já testado em Badge.test.tsx)
- ❌ Acessibilidade de Atoms internos (já testado)

**Exemplo ERRADO**:
```typescript
// ❌ naipe-card.test.tsx - RETESTANDO ElementBadge
it('deve aplicar cor correta ao badge de elemento', () => {
  render(<NaipeCard naipe={mockNaipe} />)

  // RED FLAG: Testando implementação interna do ElementBadge
  expect(screen.getByTestId('element-badge')).toHaveClass('bg-red-500')
})
```

**Exemplo CORRETO**:
```typescript
// ✅ naipe-card.test.tsx - TESTANDO CONTRATO
it('deve passar elemento correto para ElementBadge', () => {
  render(<NaipeCard naipe={{ ...mockNaipe, elemento: 'fogo' }} />)

  // Teste apenas o contrato: NaipeCard → ElementBadge recebe elemento
  expect(screen.getByText(/fogo/i)).toBeInTheDocument()
})

it('deve renderizar nome e descrição do naipe', () => {
  render(<NaipeCard naipe={mockNaipe} />)

  // Teste de COMPOSIÇÃO (novo valor do NaipeCard)
  expect(screen.getByText(mockNaipe.nome)).toBeInTheDocument()
  expect(screen.getByText(mockNaipe.descricao)).toBeInTheDocument()
})
```

**Justificativa**: ElementBadge já garante que cores funcionam. NaipeCard só precisa garantir que **passa** o elemento corretamente.

---

### 3. Organisms: Teste ORQUESTRAÇÃO

**Escopo**: Componentes complexos com múltiplos Molecules/Atoms (SpreadCanvas).

**O que testar**:
- ✅ Estado interno (Zustand, useState)
- ✅ Side effects (useEffect, React Query mutations)
- ✅ Orquestração entre Molecules (interação entre subcomponentes)
- ✅ Regras de negócio (validações, cálculos)

**O que NÃO testar**:
- ❌ Comportamento isolado de Molecules internos
- ❌ Eventos de Atoms dentro de Molecules
- ❌ Renderização de Molecules (já testado)

**Estratégia**: Mock Molecules/Atoms internos, teste **orquestração**.

**Exemplo CORRETO (contexto Tiragem)**:
```typescript
// ✅ spread-canvas.test.tsx - TESTANDO ORQUESTRAÇÃO
import { vi } from 'vitest'

// Mock Molecules
vi.mock('@/features/tiragens/components/spread-card', () => ({
  SpreadCard: ({ position, onSelect }: any) => (
    <div data-testid={`position-${position.id}`} onClick={() => onSelect(position)}>
      Position {position.id}
    </div>
  )
}))

describe('SpreadCanvas', () => {
  it('deve atualizar estado ao selecionar posição', () => {
    const onPositionSelect = vi.fn()
    render(<SpreadCanvas spread={mockSpread} onPositionSelect={onPositionSelect} />)

    fireEvent.click(screen.getByTestId('position-1'))

    // Teste de ORQUESTRAÇÃO: SpreadCanvas coordena seleção
    expect(onPositionSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }))
  })

  it('deve renderizar todas as posições do spread', () => {
    render(<SpreadCanvas spread={mockSpread} />)

    // Teste de estrutura (não de implementação de SpreadCard)
    expect(screen.getAllByTestId(/position-/)).toHaveLength(mockSpread.positions.length)
  })
})
```

---

### 4. Templates: Teste LAYOUT

**Escopo**: Estruturas de página (TarotLayout, ReadingTemplate).

**O que testar**:
- ✅ Layout/grid/posicionamento
- ✅ Roteamento (Next.js router)
- ✅ Estado global (Zustand store)
- ✅ Slots/children renderizados corretamente

**O que NÃO testar**:
- ❌ Lógica de Organisms internos
- ❌ Mutações de Organisms
- ❌ Validações de Molecules

**Estratégia**: Mock **todos** Organisms, teste apenas estrutura.

**Exemplo**:
```typescript
// ✅ tarot-layout.test.tsx
vi.mock('@/components/organisms/sidebar', () => ({
  Sidebar: () => <aside data-testid="sidebar">Sidebar</aside>
}))

vi.mock('@/components/organisms/header', () => ({
  Header: () => <header data-testid="header">Header</header>
}))

describe('TarotLayout', () => {
  it('deve renderizar Sidebar, Header e children', () => {
    render(
      <TarotLayout>
        <div data-testid="content">Content</div>
      </TarotLayout>
    )

    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })
})
```

---

## Red Flags de Duplicação

### Red Flag 1: Testando Eventos de Componentes Internos

```typescript
// ❌ RED FLAG
it('deve chamar onClick do botão revelar', () => {
  render(<ArcanoCard arcano={mockArcano} />)
  fireEvent.click(screen.getByRole('button', { name: /revelar/i }))
  expect(mockOnReveal).toHaveBeenCalled()
})
```

**Por quê?**: Se Button já testa onClick, ArcanoCard não precisa retestar.

**Solução**: Teste apenas que `onReveal` é **passado** para Button.

---

### Red Flag 2: Suite Crescendo Exponencialmente

**Sintoma**:
- Atom: 10 testes
- Molecule usando Atom: 25 testes (10 retestando Atom + 15 novos)
- Organism usando Molecule: 60 testes (25 retestando Molecule + 35 novos)

**Diagnóstico**: Reteste em cadeia.

**Solução**:
- Atom: 10 testes
- Molecule: 5 testes (apenas nova lógica)
- Organism: 8 testes (apenas orquestração)

---

## Checklist de Code Review

**Ao revisar testes de Molecules/Organisms/Templates**, perguntar:

### 1. Estou testando NOVA LÓGICA ou dependências já testadas?

- ✅ **Nova lógica**: Estado local, transformação de dados, regras de negócio
- ❌ **Dependências**: onClick de Button, validação de Input

### 2. Estou testando COMPOSIÇÃO ou IMPLEMENTAÇÃO?

- ✅ **Composição**: Props passadas, estrutura DOM, ordem de componentes
- ❌ **Implementação**: Como Button renderiza variant, como Badge aplica cor

### 3. Suite de testes cresceu >50% ao adicionar Molecule?

- ❌ **Sim**: Provável reteste de Atoms
- ✅ **Não**: Apenas nova lógica sendo testada

---

## Thresholds de Conformidade

**Fórmula de Reteste**:
```
Reteste % = (Testes Nível N - Nova Lógica) / Testes Totais Nível N × 100
```

**Thresholds**:
- ✅ **<20% reteste**: Conforme
- ⚠️ **20-40% reteste**: Revisar
- ❌ **>40% reteste**: Refatorar

---

## Conclusão

**Princípio de Confiança**:
1. Atoms: Teste **TUDO** (dependências zero)
2. Molecules: Teste **CONTRATO** (confie em Atoms)
3. Organisms: Teste **ORQUESTRAÇÃO** (confie em Molecules)
4. Templates: Teste **LAYOUT** (confie em Organisms)

**Benefícios**:
- Redução de 60-80% em testes duplicados
- Suite cresce linearmente, não exponencialmente
- Refactoring mais seguro (alteração em Atom não quebra 50 testes)
- Code review mais rápido (foco em nova lógica)

---

## Conexão Espiritual

> "Como os Orixás confiam em suas hierarquias - Oxalá coordena sem microgerenciar cada Orixá - assim nossos testes confiam em suas dependências."

Cada nível da hierarquia tem seu **axé** (propósito). Atoms carregam a responsabilidade fundamental. Molecules coordenam. Organisms orquestram. Templates dão forma ao todo.

Retestar dependências é como duvidar da hierarquia espiritual - desperdiça energia (código) e quebra harmonia (manutenibilidade).

---

**Última atualização**: 2025-12-29
**Adaptado de**: frontend-apps/tomador
**Relacionado**: [code-review-prompt.md](./code-review-prompt.md), [atomic-design-llm-guide.md](./atomic-design-llm-guide.md)
