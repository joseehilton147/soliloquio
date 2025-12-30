# Análise TanStack Libraries para Solilóquio

**Data**: 2025-12-29
**Projeto**: Solilóquio Tarot App
**Framework**: Next.js 15 + React 19 + TypeScript

---

## Bibliotecas TanStack Disponíveis

| Biblioteca | Descrição | Score | Snippets |
|------------|-----------|-------|----------|
| TanStack Query | Data fetching e state management | 89.9 | 2156 |
| TanStack Form | Gerenciamento de formulários | 91.65 | 958 |
| TanStack Table | Tabelas headless | 87.1 | 1831 |
| TanStack Router | Router tipado | 76.9 | 3005 |
| TanStack Pacer | Rate limiting, debounce, throttle | - | - |

---

## Status Atual no Projeto

### ✅ Já Instalado
- **@tanstack/react-query v5.68.0** - Usado em providers.tsx com tRPC

### ❌ Não Utilizado
- TanStack Form
- TanStack Table
- TanStack Router
- TanStack Pacer

---

## Análise por Biblioteca

### 1. TanStack Pacer - **RECOMENDADO** ⭐

**Casos de uso encontrados no projeto:**

#### GlobalSearch (src/shared/components/global-search.tsx)
```typescript
// PROBLEMA ATUAL: Query executa a cada caractere
const { data: cardsData } = trpc.tarot.getAll.useQuery(
  { limit: 100, offset: 0 },
  { enabled: query.length >= 1 }  // Dispara imediatamente!
)
```

**Impacto sem debounce:**
- Usuário digita "arcano maior" = 12 requisições ao backend
- Carga desnecessária no servidor
- UI pode piscar entre estados de loading

**Solução com TanStack Pacer:**
```typescript
import { useDebounce } from '@tanstack/pacer'

const debouncedQuery = useDebounce(query, { wait: 300 })

const { data: cardsData } = trpc.tarot.getAll.useQuery(
  { limit: 100, offset: 0 },
  { enabled: debouncedQuery.length >= 1 }
)
```

**Benefícios:**
- Reduz requisições em ~90%
- UX mais suave
- Menor carga no servidor
- Menor consumo de dados móveis

**Veredicto**: ✅ **INSTALAR** - Uso imediato no GlobalSearch

---

### 2. TanStack Form - **RECOMENDADO** ⭐

**Casos de uso encontrados no projeto:**

#### Formulários manuais (4 encontrados):
1. `baralhos/novo/page.tsx` - Novo baralho
2. `baralhos/[slug]/editar/page.tsx` - Editar baralho
3. `cartas/nova/page.tsx` - Nova carta
4. `cartas/[slug]/editar/page.tsx` - Editar carta

**Código atual (repetitivo):**
```typescript
// baralhos/novo/page.tsx - 5 useState individuais
const [name, setName] = useState('')
const [description, setDescription] = useState('')
const [publisher, setPublisher] = useState('')
const [year, setYear] = useState('')
const [tradition, setTradition] = useState('')

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setIsSubmitting(true)
  // ... lógica manual
}
```

**Problemas:**
- 5+ useState por formulário = ~20 useState totais
- Validação manual ou inexistente
- Nenhum feedback visual de erros
- Código duplicado entre formulários

**Solução com TanStack Form:**
```typescript
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'

const form = useForm({
  defaultValues: { name: '', description: '', publisher: '', year: '', tradition: '' },
  validatorAdapter: zodValidator,
  onSubmit: async ({ value }) => {
    await createMutation.mutateAsync(value)
  }
})
```

**Benefícios:**
- Validação integrada com Zod (já usamos)
- Feedback visual automático
- Menos código repetitivo
- TypeScript-first
- Performance otimizada (field-level updates)

**Veredicto**: ✅ **INSTALAR** - Refatorar 4 formulários

---

### 3. TanStack Table - **NÃO RECOMENDADO**

**Análise do projeto:**
- Não há tabelas de dados no projeto
- Design é card-based (grids de cartas, baralhos)
- UI é visual/mística, não tabular

**Veredicto**: ❌ **NÃO INSTALAR** - Sem caso de uso

---

### 4. TanStack Router - **NÃO RECOMENDADO**

**Análise do projeto:**
- Já usamos Next.js App Router
- Routing funciona bem com file-based routing
- Não há necessidade de routing client-side complexo

**Veredicto**: ❌ **NÃO INSTALAR** - Next.js já resolve

---

## Plano de Implementação

### Fase 1: TanStack Pacer (Quick Win)

**Escopo:**
1. Instalar `@tanstack/pacer`
2. Refatorar GlobalSearch com useDebounce

**Arquivos afetados:**
- `src/shared/components/global-search.tsx`

**Estimativa técnica:**
- 1 arquivo modificado
- ~10 linhas alteradas

### Fase 2: TanStack Form (Médio Prazo)

**Escopo:**
1. Instalar `@tanstack/react-form` e `@tanstack/zod-form-adapter`
2. Criar schema de validação compartilhado
3. Refatorar formulários gradualmente

**Arquivos afetados:**
- `app/(portal)/baralhos/novo/page.tsx`
- `app/(portal)/baralhos/[slug]/editar/page.tsx`
- `app/(portal)/cartas/nova/page.tsx`
- `app/(portal)/cartas/[slug]/editar/page.tsx`

**Estimativa técnica:**
- 4 arquivos modificados
- ~200 linhas refatoradas

---

## Comandos de Instalação

```bash
# Fase 1 - Pacer (imediato)
pnpm add @tanstack/pacer --filter @workspace/tarot

# Fase 2 - Form (quando iniciar refatoração)
pnpm add @tanstack/react-form @tanstack/zod-form-adapter --filter @workspace/tarot
```

---

## Resumo Final

| Biblioteca | Recomendação | Prioridade | Caso de Uso |
|------------|--------------|------------|-------------|
| **Pacer** | ✅ Instalar | Alta | GlobalSearch debounce |
| **Form** | ✅ Instalar | Média | 4 formulários CRUD |
| **Table** | ❌ Não instalar | - | Sem tabelas no projeto |
| **Router** | ❌ Não instalar | - | Next.js já resolve |

---

*Documento criado durante revisão Atomic Design - Fase 1*
