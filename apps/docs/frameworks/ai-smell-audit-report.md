# AI Smell Audit Report

Framework para detecção de code smells em código, com foco especial em padrões problemáticos comuns em código gerado por AI.

**Referências:**
- [GitClear Code Quality Report 2025](https://www.gitclear.com/)
- [SonarQube Code Smells](https://docs.sonarqube.org/latest/user-guide/concepts/)
- [Martin Fowler - Refactoring](https://refactoring.com/catalog/)
- [Sistemas Holonômicos](./holonomic-systems-guide.md)

---

## Visão Geral

### Por Que Este Framework?

Código gerado por AI (LLMs) frequentemente apresenta padrões que parecem corretos superficialmente, mas introduzem problemas de manutenibilidade:

| Problema | Sintoma | Impacto |
|----------|---------|---------|
| **Verbosidade** | Código 2-3x maior que necessário | Manutenção custosa |
| **Over-commenting** | JSDoc óbvio, comentários redundantes | Ruído, desatualização |
| **Duplicação sutil** | Lógica similar em múltiplos lugares | Inconsistência |
| **Abstração prematura** | Generalizações não usadas | Complexidade desnecessária |
| **Inconsistência de estilo** | Padrões misturados | Confusão, bugs |

---

## Taxonomia de Code Smells

### Categoria 1: Verbosidade (VERB)

#### VERB-001: Código Inflado

**Definição:** Implementação significativamente maior que o necessário.

**Severidade:** MÉDIA | **Detectável:** SEMI-AUTO

**Exemplo:**

```typescript
// ❌ SMELL - 15 linhas para algo simples
function formatUserName(user: User): string {
  // Check if user exists
  if (!user) {
    return ''
  }

  // Get first name
  const firstName = user.firstName

  // Get last name
  const lastName = user.lastName

  // Combine names
  const fullName = `${firstName} ${lastName}`

  // Return formatted name
  return fullName.trim()
}

// ✅ LIMPO - 1 linha
const formatUserName = (user?: User) =>
  user ? `${user.firstName} ${user.lastName}`.trim() : ''
```

**Threshold:** >2x linhas do necessário

---

#### VERB-002: JSDoc Óbvio

**Definição:** Documentação que repete o que o código já diz.

**Severidade:** BAIXA | **Detectável:** AUTO

**Exemplo:**

```typescript
// ❌ SMELL - JSDoc não agrega valor
/**
 * Gets the user by ID
 * @param id - The user ID
 * @returns The user object
 */
function getUserById(id: string): User {
  return users.find(u => u.id === id)
}

// ✅ LIMPO - Sem JSDoc (código é auto-explicativo)
function getUserById(id: string): User {
  return users.find(u => u.id === id)
}

// ✅ OK - JSDoc com valor real
/**
 * Busca usuário incluindo dados de cache.
 * Retorna null se usuário foi deletado nos últimos 30 dias.
 */
function getUserById(id: string): User | null {
  // ...
}
```

**Threshold:** >15% JSDoc óbvio

**Detecção:**
```bash
# Contar JSDoc vs linhas de código
grep -c "@param\|@returns" src/**/*.ts
```

---

#### VERB-003: Comentários Redundantes

**Definição:** Comentários que explicam O QUE, não POR QUÊ.

**Severidade:** BAIXA | **Detectável:** SEMI-AUTO

**Exemplo:**

```typescript
// ❌ SMELL - Explica o óbvio
// Increment counter
counter++

// Loop through users
for (const user of users) {
  // Check if user is active
  if (user.active) {
    // Add to list
    activeUsers.push(user)
  }
}

// ✅ LIMPO - Sem comentários (código claro)
counter++

const activeUsers = users.filter(u => u.active)

// ✅ OK - Explica o POR QUÊ
// Delay necessário por rate limit da API externa
await delay(1000)
```

**Threshold:** >20% comentários redundantes

---

### Categoria 2: Duplicação (DUP)

#### DUP-001: Código Duplicado

**Definição:** Lógica idêntica ou muito similar em múltiplos lugares.

**Severidade:** ALTA | **Detectável:** AUTO

**Exemplo:**

```typescript
// ❌ SMELL - Lógica duplicada
function validateEmail(email: string) {
  if (!email) return false
  if (!email.includes('@')) return false
  if (email.length < 5) return false
  return true
}

function validateUserEmail(user: User) {
  if (!user.email) return false
  if (!user.email.includes('@')) return false
  if (user.email.length < 5) return false
  return true
}

// ✅ LIMPO - Reutilização
function validateEmail(email?: string): boolean {
  return Boolean(email && email.includes('@') && email.length >= 5)
}

function validateUserEmail(user: User) {
  return validateEmail(user.email)
}
```

**Threshold:** <5% duplicação

**Detecção:**
```bash
# Usar jscpd ou similar
npx jscpd src/ --threshold 5
```

---

#### DUP-002: Duplicação Estrutural

**Definição:** Componentes com estrutura quase idêntica.

**Severidade:** MÉDIA | **Detectável:** MANUAL

**Exemplo:**

```typescript
// ❌ SMELL - Dois componentes quase iguais
function ArcanoCard({ arcano }: { arcano: Arcano }) {
  return (
    <div className="card">
      <img src={arcano.image} />
      <h3>{arcano.name}</h3>
      <p>{arcano.description}</p>
    </div>
  )
}

function NaipeCard({ naipe }: { naipe: Naipe }) {
  return (
    <div className="card">
      <img src={naipe.image} />
      <h3>{naipe.name}</h3>
      <p>{naipe.description}</p>
    </div>
  )
}

// ✅ LIMPO - Componente genérico
interface CardItem {
  image: string
  name: string
  description: string
}

function ItemCard({ item }: { item: CardItem }) {
  return (
    <div className="card">
      <img src={item.image} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  )
}

// Uso
<ItemCard item={arcano} />
<ItemCard item={naipe} />
```

---

### Categoria 3: Complexidade (COMP)

#### COMP-001: Função Longa

**Definição:** Função com mais de 30 linhas.

**Severidade:** MÉDIA | **Detectável:** AUTO

**Threshold:** <30 linhas por função

**Detecção:**
```bash
# Listar funções longas
grep -n "function\|=>" src/**/*.ts | # encontrar funções
# Analisar manualmente ou usar ferramenta
```

---

#### COMP-002: Complexidade Ciclomática Alta

**Definição:** Muitos caminhos de execução (if/else/switch aninhados).

**Severidade:** ALTA | **Detectável:** AUTO

**Exemplo:**

```typescript
// ❌ SMELL - Complexidade ciclomática 12
function processOrder(order: Order) {
  if (order.status === 'pending') {
    if (order.payment === 'card') {
      if (order.amount > 1000) {
        // ...
      } else {
        if (order.customer.premium) {
          // ...
        } else {
          // ...
        }
      }
    } else if (order.payment === 'pix') {
      // ...
    }
  } else if (order.status === 'processing') {
    // ...
  }
}

// ✅ LIMPO - Early returns + estratégia
function processOrder(order: Order) {
  const strategy = getPaymentStrategy(order.payment)
  const handler = getStatusHandler(order.status)

  return handler(order, strategy)
}
```

**Threshold:** <10 complexidade ciclomática

---

#### COMP-003: Props Excessivas

**Definição:** Componente com mais de 7 props.

**Severidade:** MÉDIA | **Detectável:** AUTO

**Exemplo:**

```typescript
// ❌ SMELL - 12 props
interface CardProps {
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  onClick: () => void
  onHover: () => void
  variant: 'default' | 'compact'
  size: 'sm' | 'md' | 'lg'
  disabled: boolean
  loading: boolean
  className: string
}

// ✅ LIMPO - Agrupamento lógico
interface CardProps {
  content: CardContent      // title, subtitle, description
  image: CardImage          // src, alt
  actions: CardActions      // onClick, onHover
  appearance?: CardAppearance  // variant, size, className
  state?: CardState         // disabled, loading
}
```

**Threshold:** <7 props por componente

---

### Categoria 4: Acoplamento (COUP)

#### COUP-001: Import de Internos

**Definição:** Importar arquivos internos de outras features/módulos.

**Severidade:** CRÍTICA | **Detectável:** AUTO

**Exemplo:**

```typescript
// ❌ SMELL - Import de interno
import { calculateElement } from '../naipes/domain/utils'
import { ELEMENT_COLORS } from '../naipes/domain/constants'

// ✅ LIMPO - Via barrel export
import { NaipeUtils, NAIPE_CONSTANTS } from '@/features/naipes'
```

**Detecção:**
```bash
grep -r "from '\.\./.*/" src/features/ | grep -v "index"
```

---

#### COUP-002: Dependência Circular

**Definição:** Módulo A importa B que importa A.

**Severidade:** CRÍTICA | **Detectável:** AUTO

**Detecção:**
```bash
npx madge --circular src/
```

---

### Categoria 5: Naming (NAME)

#### NAME-001: Nome Genérico

**Definição:** Nomes que não revelam intenção.

**Severidade:** MÉDIA | **Detectável:** SEMI-AUTO

**Exemplo:**

```typescript
// ❌ SMELL
const data = fetchData()
const items = getItems()
const result = process(input)
function handleClick() {}
function Component() {}

// ✅ LIMPO
const arcanos = fetchArcanos()
const activeNaipes = getActiveNaipes()
const validatedSpread = validateSpread(rawSpread)
function handleCardSelection() {}
function ArcanoCard() {}
```

---

#### NAME-002: Prefixo Técnico

**Definição:** Nomes com prefixos que não agregam valor.

**Severidade:** BAIXA | **Detectável:** AUTO

**Exemplo:**

```typescript
// ❌ SMELL
IUserInterface       // Prefixo I
UserType            // Sufixo Type
handleClickHandler  // Redundante
dataData           // Repetição

// ✅ LIMPO
User
User
handleClick
userData
```

---

### Categoria 6: Testes (TEST)

#### TEST-001: Reteste de Dependências

**Definição:** Testar comportamento de dependências já testadas.

**Severidade:** ALTA | **Detectável:** MANUAL

> **Leitura:** [testing-hierarchy-principle.md](./testing-hierarchy-principle.md)

**Exemplo:**

```typescript
// ❌ SMELL - Molecule retestando Atom
describe('NaipeCard', () => {
  it('deve aplicar classe correta ao badge', () => {
    render(<NaipeCard naipe={mock} />)
    // ElementBadge já testa isso!
    expect(screen.getByTestId('badge')).toHaveClass('bg-red-500')
  })
})
```

**Threshold:** <20% reteste

---

#### TEST-002: Teste Frágil

**Definição:** Teste que quebra com mudanças de implementação.

**Severidade:** MÉDIA | **Detectável:** MANUAL

**Exemplo:**

```typescript
// ❌ SMELL - Testa implementação
it('deve ter 3 divs', () => {
  render(<Card />)
  expect(container.querySelectorAll('div')).toHaveLength(3)
})

// ✅ LIMPO - Testa comportamento
it('deve renderizar título e descrição', () => {
  render(<Card title="T" description="D" />)
  expect(screen.getByText('T')).toBeInTheDocument()
  expect(screen.getByText('D')).toBeInTheDocument()
})
```

---

## Processo de Auditoria

### Passo 1: Coleta Automatizada

```bash
# 1. Duplicação
npx jscpd src/ --threshold 5 --output report/

# 2. Complexidade
npx complexity-report src/ > report/complexity.json

# 3. Dependências circulares
npx madge --circular src/

# 4. Linhas por arquivo
find src -name "*.tsx" -exec wc -l {} \; | sort -rn | head -20
```

### Passo 2: Análise Manual

Revisar com base nos thresholds:

| Categoria | Métrica | Threshold |
|-----------|---------|-----------|
| VERB | JSDoc óbvio | <15% |
| DUP | Duplicação | <5% |
| COMP | Linhas/função | <30 |
| COMP | Complexidade | <10 |
| COMP | Props/componente | <7 |
| COUP | Imports internos | 0 |
| COUP | Circulares | 0 |
| TEST | Reteste | <20% |

### Passo 3: Scoring

```
Score = 100 - (CRÍTICOS × 10) - (ALTOS × 5) - (MÉDIOS × 2) - (BAIXOS × 1)
```

| Score | Status | Ação |
|-------|--------|------|
| 90-100 | ✅ LIMPO | Aprovar |
| 75-89 | ⚠️ ATENÇÃO | Aprovar com ressalvas |
| 60-74 | ❌ CRÍTICO | Bloquear |
| <60 | 🚫 BLOQUEADOR | Rejeitar |

---

## Template de Relatório

```markdown
# AI Smell Audit Report

**Data:** YYYY-MM-DD
**Escopo:** [arquivos analisados]
**Score:** XX/100

## Resumo

| Severidade | Quantidade |
|------------|------------|
| 🔴 Crítico | X |
| 🟠 Alto | X |
| 🟡 Médio | X |
| 🟢 Baixo | X |

## Findings

### 🔴 CRÍTICOS

#### COUP-001: Import de internos
- **Arquivo:** src/features/arcanos/...
- **Linha:** XX
- **Código:**
```typescript
// código problemático
```
- **Correção:**
```typescript
// código corrigido
```

### 🟠 ALTOS
...

## Métricas

| Métrica | Valor | Threshold | Status |
|---------|-------|-----------|--------|
| Duplicação | X% | <5% | ✅/❌ |
| JSDoc óbvio | X% | <15% | ✅/❌ |
| ...

## Recomendações

1. [Prioridade Alta] ...
2. [Prioridade Média] ...
```

---

## Integração com CI/CD

### GitHub Actions (Exemplo)

```yaml
- name: Code Smell Check
  run: |
    npx jscpd src/ --threshold 5 --exitCode
    npx madge --circular src/ --warning

- name: Complexity Check
  run: |
    npx complexity-report src/ --maxComplexity 10
```

---

## Referências

- [REFACTORING-ROADMAP.md](../REFACTORING-ROADMAP.md)
- [testing-hierarchy-principle.md](./testing-hierarchy-principle.md)
- [holonomic-systems-guide.md](./holonomic-systems-guide.md)
- [code-review-prompt.md](./code-review-prompt.md)

---

*Framework v1.0*
*Última atualização: 2025-12-29*
