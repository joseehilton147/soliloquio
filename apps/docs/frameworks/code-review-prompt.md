# CODE REVIEW AUDIT - Solilóquio

## CONTEXTO
- **Projeto**: Solilóquio (Monorepo Turborepo + React/Next.js/TypeScript)
- **Objetivo**: Auditoria de conformidade técnica e arquitetural
- **Escopo**: Apenas arquivos no git diff
- **Filosofia**: Código é veículo para jornada espiritual. Qualidade é oferenda.
- **Fundamento**: [Sistemas Holonômicos](./holonomic-systems-guide.md) - cada componente equilibra autonomia e integração

---

## FASE 0: ESCOPO (EXECUTAR PRIMEIRO)

Execute os comandos para identificar APENAS os arquivos modificados:

```bash
git status
git diff --name-only
```

### Restrições de Escopo
- ⛔ NÃO analise arquivos fora do diff
- ⛔ NÃO leia o projeto inteiro
- ⛔ NÃO faça suposições sobre arquivos não modificados

---

## FASE 1: LEITURA OBRIGATÓRIA (Condicional por Tipo de Alteração)

### 1.1 Documentação Base (SEMPRE ler)

| Prioridade | Documento | Quando Ler |
|------------|-----------|------------|
| **P0** | `@apps/docs/README.md` | Índice geral da documentação |
| **P0** | `@apps/docs/frameworks/holonomic-systems-guide.md` | Fundamento teórico unificador |
| **P0** | `@apps/docs/frameworks/ai-smell-audit-report.md` | Detecção de code smells |
| **P0** | `@REGRAS-REVISAO.md` | 18 regras obrigatórias |

---

### 1.2 Componentes (SE alterou `src/components/*` ou `src/features/*/components/*`)

| Prioridade | Documento | Quando Ler |
|------------|-----------|------------|
| **P0** | `@apps/docs/guides/03-component-development.md` | CVA, estrutura, acessibilidade |
| **P0** | `@packages/ui/` | **Validação de componentes do design system** |
| **P1** | `@apps/docs/frameworks/atomic-design-llm-guide.md` | Regras de hierarquia Atomic Design |

**⚠️ VALIDAÇÃO OBRIGATÓRIA DE DESIGN SYSTEM:**

Verificar em `packages/ui/`:
- ✅ Componente já existe no design system?
- ✅ Está usando shadcn/ui corretamente?
- ✅ Tokens de cor seguem tema do projeto?
- ✅ Tailwind CSS v4 para customizações?
- ❌ **FINDING se recriar componente que existe em packages/ui**

---

### 1.3 Testes (SE alterou `*.test.tsx` ou `*.spec.ts`)

| Prioridade | Documento | Quando Ler |
|------------|-----------|------------|
| **P0** | `@apps/docs/frameworks/testing-hierarchy-principle.md` | Princípio de Confiança |

**⚠️ VALIDAÇÃO CRÍTICA DE DUPLICAÇÃO DE TESTES:**

- ✅ Atoms testam TUDO (comportamento isolado completo)
- ✅ Molecules testam apenas COMPOSIÇÃO + PROPS + NOVA LÓGICA
- ✅ Organisms testam apenas ORQUESTRAÇÃO + ESTADO + SIDE EFFECTS
- ✅ Templates testam apenas LAYOUT + ROTEAMENTO + ESTADO GLOBAL
- ❌ **FINDING CRÍTICO se Molecule retesta onClick/variant de Atom**
- ❌ **FINDING CRÍTICO se suite cresce exponencialmente (60%+ reteste)**

---

### 1.4 Features (SE alterou `src/features/*`)

| Prioridade | Documento | Quando Ler |
|------------|-----------|------------|
| **P0** | `@apps/docs/REFACTORING-ROADMAP.md` | Estrutura de features |

**Pontos críticos:**
- Cada feature tem: `components/`, `domain/`
- Barrel exports em `index.ts`
- Types co-localizados em `domain/[feature].types.ts`

**Features existentes (5):**
- `arcanos/` - Arcanos Maiores/Menores
- `baralhos/` - Gestão de decks (CRUD)
- `cartas/` - Cartas individuais
- `naipes/` - Copas, Ouros, Espadas, Paus
- `tiragens/` - Spreads (Cruz Celta, Sim/Não, etc)

---

### 1.5 Types/Tipagem (SE alterou `src/types/*` ou `*/domain/types.ts`)

| Prioridade | Documento | Quando Ler |
|------------|-----------|------------|
| **P0** | `@apps/docs/REFACTORING-ROADMAP.md` | Seção Sistema de Types |

**Pontos críticos:**
- **Domínios**: arcanos/, baralhos/, cartas/, naipes/, tiragens/
- **Tipos centralizados**: `src/types/index.ts` (barrel)
- **Nomenclatura**: kebab-case arquivos, PascalCase interfaces
- **Anti-patterns críticos**:
  - ❌ Re-export entre domínios (BLOQUEADOR)
  - ❌ `any` no código (CRÍTICO)
  - ❌ JSDoc óbvio (threshold <15%)
  - ❌ Tipos duplicados (usar SpreadElementColors centralizado)
- **shared/** apenas para types usados em 3+ domínios

---

### 1.6 Packages Internos

#### SE alterou `packages/ui/*`

| Prioridade | Documento | Quando Ler |
|------------|-----------|------------|
| **P0** | `@packages/ui/README.md` (se existir) | Componentes compartilhados |

**Pontos críticos:**
- Componentes acessíveis (ARIA)
- Composição com Radix UI
- Tailwind CSS para estilos

---

#### SE alterou `packages/core/*`

| Prioridade | Documento | Quando Ler |
|------------|-----------|------------|
| **P1** | `@packages/core/README.md` (se existir) | Lógica compartilhada |

---

#### SE alterou `packages/database/*`

| Prioridade | Documento | Quando Ler |
|------------|-----------|------------|
| **P1** | `@packages/database/README.md` (se existir) | Schema e queries |

---

## FASE 2: VALIDAÇÃO COM FONTES OFICIAIS (Context7)

Use o MCP Context7 para buscar documentação OFICIAL:

| Tecnologia | Quando Usar |
|------------|-------------|
| **React 19** | Hooks, composição, renderização, memo, useCallback |
| **Next.js 15** | App Router, Server Components, metadata, routing |
| **TypeScript 5** | Type safety, inferência, generics, utility types |
| **Testing Library** | Queries (getBy*, findBy*, queryBy*), user-event, waitFor |
| **Radix UI** | Padrões de acessibilidade, primitives, composição |
| **Tailwind CSS 4** | Classes utilitárias, configuração, plugins |
| **Vitest** | Configuração, matchers, mocking |

---

## FASE 3: VALIDAÇÃO DE DUPLICAÇÃO DE TESTES

**REGRA CRÍTICA**: Componentes hierárquicos (Atomic Design) NÃO devem retestar dependências internas.

### Checklist de Validação

**Para Molecules:**

- [ ] ❌ **RED FLAG**: Testa `onClick` de Button interno?
  - Correção: Testar apenas que `onClick` é **passado** corretamente

- [ ] ❌ **RED FLAG**: Testa `variant`/`size` de componente Atom?
  - Correção: Confiar que Atom já testa variants

**Para Organisms:**

- [ ] ❌ **RED FLAG**: Testa comportamento isolado de Molecule interno?
  - Correção: Mockar Molecules, testar apenas orquestração

### Código de Exemplo

**❌ ERRADO - Molecule retestando Atom:**
```typescript
// spread-card.test.tsx (Molecule)
it('deve chamar onClick do botão', () => {
  const onClick = vi.fn()
  render(<SpreadCard onClick={onClick} />)
  fireEvent.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalled() // RED FLAG
})
```

**✅ CORRETO - Molecule testando contrato:**
```typescript
// spread-card.test.tsx (Molecule)
it('deve passar posição selecionada para onSelect', () => {
  const onSelect = vi.fn()
  render(<SpreadCard spread={mockSpread} onSelect={onSelect} />)

  fireEvent.click(screen.getByRole('button'))

  expect(onSelect).toHaveBeenCalledWith(mockSpread.id)
})
```

### Thresholds
- ✅ **<20% reteste**: Conforme
- ⚠️ **20-40% reteste**: Revisar
- ❌ **>40% reteste**: Refatorar

---

## FASE 4: CRITÉRIOS DE AVALIAÇÃO

| Princípio | O Que Verificar |
|-----------|-----------------|
| **Saúde Holonômica** | Equilíbrio auto-afirmativo/integrativo, sem patologias (câncer/morte) |
| **Clean Code** | Nomenclatura, funções pequenas (<30 linhas), abstração adequada |
| **DRY** | Duplicação de lógica (<5%), componentes, tipos |
| **SOLID** | SRP em componentes, OCP em extensões |
| **KISS** | Complexidade desnecessária, over-engineering |
| **Atomic Design** | Hierarquia atoms→molecules→organisms→templates (holons aninhados) |
| **Acessibilidade** | ARIA labels, semântica HTML, keyboard navigation |
| **Test Hierarchy** | Princípio de Confiança, zero reteste (confiança holonômica) |
| **Performance** | Memoização, lazy loading |

### Benchmarks

| Métrica | Threshold | Fonte |
|---------|-----------|-------|
| Code Duplication | <5% | SonarQube |
| JSDoc Ruído | <15% | GitClear 2025 |
| Function Length | <30 linhas | Clean Code |
| Cyclomatic Complexity | <10 | McCabe |
| Naming Score | >85% | ISTQB |
| Component Level Accuracy | >95% | Google Eng Practices |

---

## FASE 5: FORMATO DO RELATÓRIO

### RESUMO EXECUTIVO

```
📊 Code Review: [nome da branch/PR]
📅 Data: [data]
📁 Arquivos analisados: X
🔴 Críticos: X | 🟠 Altos: X | 🟡 Médios: X | 🟢 Baixos: X
📈 Score de conformidade: XX/100
```

---

### 🔴 CRÍTICO (Breaking/Security)

```
[ARQUIVO]: path/to/file.tsx
[LINHA]: XX-YY
[PRINCÍPIO VIOLADO]: <princípio>
[PROBLEMA]: Descrição objetiva
[EVIDÊNCIA]:
```typescript
// Código problemático
```
[CORREÇÃO SUGERIDA]:
```typescript
// Código corrigido
```
[REFERÊNCIA]: <Link Context7 ou Documento interno>
```

---

### 🟠 ALTO | 🟡 MÉDIO | 🟢 BAIXO

(mesmo formato acima)

---

### ✅ CONFORMIDADES POSITIVAS

Liste o que está bem implementado:
- Padrões seguidos corretamente
- Boas práticas aplicadas

---

### MATRIZ DE ADERÊNCIA

| Documento Lido | Status | Observações |
|----------------|--------|-------------|
| HOLONOMIC_SYSTEMS_GUIDE | ✅/⚠️/❌ | Fundamento teórico unificador |
| AI_SMELL_AUDIT_REPORT | ✅/⚠️/❌ | ... |
| ATOMIC_DESIGN_LLM_GUIDE | ✅/⚠️/❌ | ... |
| TESTING_HIERARCHY_PRINCIPLE | ✅/⚠️/❌ | ... |
| REGRAS-REVISAO | ✅/⚠️/❌ | ... |

**Legenda:** ✅ Conforme | ⚠️ Parcial | ❌ Violação | ➖ N/A

---

### PRÓXIMOS PASSOS RECOMENDADOS

1. **[Prioridade Alta]** - Bloqueantes para merge
2. **[Prioridade Média]** - Melhorias importantes
3. **[Prioridade Baixa]** - Nice-to-have

---

## RESTRIÇÕES

### ⛔ NÃO FAZER

- Commits ou alterações sem solicitação
- Suposições sem evidência no código
- Correções automáticas sem solicitação explícita
- Analisar arquivos fora do diff
- Inventar regras não documentadas
- Desabilitar ESLint

### ✅ OBRIGATÓRIO

- Usar Context7 para validação oficial
- Citar fonte para cada finding
- Manter rastreabilidade: arquivo → linha → problema → solução → referência
- Seguir as 18 regras de REGRAS-REVISAO.md

---

## QUICK REFERENCE: Documentos por Tipo

```
DECISÃO ARQUITETURAL        → HOLONOMIC_SYSTEMS_GUIDE (fundamento teórico)
src/components/*            → ATOMIC_DESIGN_LLM_GUIDE, packages/ui
src/features/*              → REFACTORING-ROADMAP, HOLONOMIC_SYSTEMS_GUIDE
src/types/*                 → REFACTORING-ROADMAP (Sistema de Types)
*.test.tsx                  → TESTING_HIERARCHY_PRINCIPLE
packages/ui/*               → packages/ui/README
packages/core/*             → packages/core/README
QUALQUER arquivo            → AI_SMELL_AUDIT_REPORT, REGRAS-REVISAO
```

---

## CONEXÃO ESPIRITUAL

> "Revisão de código é como Exu guardando a encruzilhada - só passa o que está em harmonia."

Cada finding é oportunidade de evolução. Cada correção é polimento da pedra bruta.

A qualidade não é destino, é jornada. Como ensina Allan Kardec: "Fora da caridade não há salvação" - fora da qualidade, não há manutenibilidade.

---

*Versão do prompt*: 1.1
*Última atualização*: 2025-12-30
*Compatível com*: MCP Context7
*Adaptado de*: frontend-apps/tomador v2.3
