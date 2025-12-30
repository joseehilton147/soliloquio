# 03 - Component Development

Guia de desenvolvimento de componentes seguindo padrões Atomic Design e holonômicos.

---

## Princípios Fundamentais

### Holonomia em Componentes

Cada componente deve ser um **holon**: funciona isoladamente E compõe bem.

| Tendência | Aplicação em Componentes |
|-----------|--------------------------|
| **Auto-afirmativa** | Responsabilidade única, testável isolado, props tipadas |
| **Integrativa** | Interface clara, composição via props, respeita contratos |

> **Leitura:** [holonomic-systems-guide.md](../frameworks/holonomic-systems-guide.md)

---

## Estrutura de Componente

### Estrutura de Pasta

```
component-name/
├── component-name.tsx         # Componente principal
├── component-name.test.tsx    # Testes (co-localizado)
├── component-name.styles.ts   # Estilos CVA (opcional)
├── types.ts                   # Types locais (opcional)
└── index.ts                   # Barrel export
```

### Template Básico

```typescript
// component-name.tsx
import { type ComponentProps } from 'react'

interface ComponentNameProps {
  // Props obrigatórias primeiro
  title: string
  // Props opcionais depois
  description?: string
  className?: string
}

export function ComponentName({
  title,
  description,
  className
}: ComponentNameProps) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
```

### Barrel Export

```typescript
// index.ts
export { ComponentName } from './component-name'
export type { ComponentNameProps } from './component-name'
```

---

## Padrões de Estilização

### Tailwind CSS (Padrão)

```typescript
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      // Base styles
      'rounded-lg border bg-card p-4',
      // Hover/focus states
      'hover:shadow-md transition-shadow',
      // Custom className merge
      className
    )}>
      {children}
    </div>
  )
}
```

### CVA (Class Variance Authority)

Para componentes com múltiplas variantes:

```typescript
// button.styles.ts
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  // Base styles (sempre aplicados)
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
```

```typescript
// button.tsx
import { buttonVariants, type ButtonVariants } from './button.styles'

interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  ButtonVariants {
  asChild?: boolean
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

---

## Composição com Radix UI

### Slot Pattern

Para componentes que aceitam `asChild`:

```typescript
import { Slot } from '@radix-ui/react-slot'

interface ButtonProps {
  asChild?: boolean
  children: React.ReactNode
}

export function Button({ asChild, children, ...props }: ButtonProps) {
  // Se asChild=true, renderiza o filho com as props do Button
  const Comp = asChild ? Slot : 'button'

  return <Comp {...props}>{children}</Comp>
}

// Uso
<Button asChild>
  <Link href="/page">Navegar</Link>
</Button>
```

### Primitives do Radix

```typescript
import * as Dialog from '@radix-ui/react-dialog'

export function Modal({ trigger, title, children }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg">
          <Dialog.Title>{title}</Dialog.Title>
          {children}
          <Dialog.Close asChild>
            <button>Fechar</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

---

## Acessibilidade

### Checklist Obrigatório

- [ ] **Semântica HTML**: Use tags corretas (`button`, `nav`, `main`, etc.)
- [ ] **ARIA labels**: Para elementos interativos sem texto visível
- [ ] **Keyboard navigation**: Tab, Enter, Escape funcionam
- [ ] **Focus visible**: Estados de foco claramente visíveis
- [ ] **Contraste**: Texto legível (4.5:1 mínimo)

### Exemplos

```typescript
// ❌ ERRADO - div clicável
<div onClick={handleClick}>Clique aqui</div>

// ✅ CORRETO - button semântico
<button onClick={handleClick}>Clique aqui</button>

// ❌ ERRADO - ícone sem label
<button onClick={handleClose}>
  <XIcon />
</button>

// ✅ CORRETO - com aria-label
<button onClick={handleClose} aria-label="Fechar modal">
  <XIcon aria-hidden="true" />
</button>

// ✅ CORRETO - com sr-only
<button onClick={handleClose}>
  <XIcon aria-hidden="true" />
  <span className="sr-only">Fechar modal</span>
</button>
```

### Focus Management

```typescript
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Foco no botão fechar quando abre
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isOpen])

  // Fechar com Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <div role="dialog" aria-modal="true">
      <button ref={closeButtonRef} onClick={onClose}>
        Fechar
      </button>
      {children}
    </div>
  )
}
```

---

## Testes de Componentes

### Estrutura de Teste

```typescript
// component-name.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ComponentName } from './component-name'

describe('ComponentName', () => {
  // Grupo: Renderização
  describe('renderização', () => {
    it('deve renderizar título corretamente', () => {
      render(<ComponentName title="Teste" />)
      expect(screen.getByText('Teste')).toBeInTheDocument()
    })
  })

  // Grupo: Interação
  describe('interação', () => {
    it('deve chamar onClick quando clicado', () => {
      const onClick = vi.fn()
      render(<ComponentName title="Teste" onClick={onClick} />)

      fireEvent.click(screen.getByRole('button'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  // Grupo: Acessibilidade
  describe('acessibilidade', () => {
    it('deve ter role correto', () => {
      render(<ComponentName title="Teste" />)
      expect(screen.getByRole('article')).toBeInTheDocument()
    })
  })
})
```

### Regras de Teste (Holonômicas)

| Nível | O Que Testar | O Que NÃO Testar |
|-------|--------------|------------------|
| **Atom** | TUDO (props, eventos, variantes, a11y) | - |
| **Molecule** | Composição, nova lógica, props forwarding | Comportamento interno dos Atoms |
| **Organism** | Orquestração, estado, side effects | Comportamento de Molecules |

```typescript
// ❌ ERRADO - Molecule retestando Atom
describe('NaipeCard', () => {
  it('deve aplicar classe disabled no botão', () => {
    // Button já testa isso!
    expect(screen.getByRole('button')).toHaveClass('opacity-50')
  })
})

// ✅ CORRETO - Molecule testando contrato
describe('NaipeCard', () => {
  it('deve passar disabled para o botão', () => {
    render(<NaipeCard naipe={mock} disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

> **Leitura:** [testing-hierarchy-principle.md](../frameworks/testing-hierarchy-principle.md)

---

## Padrões de Props

### Props Tipadas

```typescript
// ❌ ERRADO - any
interface Props {
  data: any
  onClick: any
}

// ✅ CORRETO - tipos específicos
interface CardProps {
  data: CardData
  onClick: (id: string) => void
  variant?: 'default' | 'compact'
}
```

### Extending HTML Props

```typescript
// Para componentes que estendem elementos HTML
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  loading,
  disabled,
  children,
  ...props  // Passa resto para <button>
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}
```

### Children Pattern

```typescript
// Para componentes container
interface CardProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}

export function Card({ children, header, footer }: CardProps) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}
```

### Render Props (Avançado)

```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T) => string
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}

// Uso
<List
  items={naipes}
  keyExtractor={(n) => n.id}
  renderItem={(naipe) => <NaipeCard naipe={naipe} />}
/>
```

---

## Hooks Customizados

### Estrutura

```typescript
// use-feature.ts
import { useState, useCallback } from 'react'

interface UseFeatureOptions {
  initialValue?: string
  onChange?: (value: string) => void
}

interface UseFeatureReturn {
  value: string
  setValue: (value: string) => void
  reset: () => void
}

export function useFeature(options: UseFeatureOptions = {}): UseFeatureReturn {
  const { initialValue = '', onChange } = options
  const [value, setValueState] = useState(initialValue)

  const setValue = useCallback((newValue: string) => {
    setValueState(newValue)
    onChange?.(newValue)
  }, [onChange])

  const reset = useCallback(() => {
    setValueState(initialValue)
  }, [initialValue])

  return { value, setValue, reset }
}
```

### Regras

1. **Prefixo `use`**: Sempre começar com `use`
2. **Retorno tipado**: Interface explícita para retorno
3. **Memoização**: `useCallback` para funções, `useMemo` para valores
4. **Deps corretas**: Sempre listar dependências

---

## Checklist de Componente

### Antes de Criar

- [ ] Já existe em `@workspace/ui`?
- [ ] Já existe em `shared/components`?
- [ ] Qual nível Atomic (atom/molecule/organism)?
- [ ] Vai para feature folder ou shared?

### Durante Desenvolvimento

- [ ] Props tipadas (sem `any`)?
- [ ] Named export (não default)?
- [ ] Acessibilidade (ARIA, keyboard)?
- [ ] Responsividade (mobile-first)?

### Antes de Commit

- [ ] Testes co-localizados?
- [ ] Barrel export no index.ts?
- [ ] Lint passando?
- [ ] Types passando?

---

## Anti-Patterns a Evitar

### 1. Props Drilling Excessivo

```typescript
// ❌ ERRADO - Props atravessando 4+ níveis
<GrandParent user={user}>
  <Parent user={user}>
    <Child user={user}>
      <GrandChild user={user} />
    </Child>
  </Parent>
</GrandParent>

// ✅ CORRETO - Context ou composição
const UserContext = createContext<User | null>(null)

<UserContext.Provider value={user}>
  <GrandParent>
    <Parent>
      <Child>
        <GrandChild />  {/* Usa useContext(UserContext) */}
      </Child>
    </Parent>
  </GrandParent>
</UserContext.Provider>
```

### 2. Componente God

```typescript
// ❌ ERRADO - Faz tudo
function Dashboard() {
  // 500 linhas
  // 20 estados
  // 15 effects
  // Impossível testar
}

// ✅ CORRETO - Composição
function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardMetrics />
      <DashboardCharts />
      <DashboardTable />
    </DashboardLayout>
  )
}
```

### 3. Lógica no JSX

```typescript
// ❌ ERRADO - Lógica complexa inline
<div>
  {items.filter(i => i.active).map(i => (
    <Item
      key={i.id}
      highlight={i.score > 80 && i.recent && !i.archived}
    />
  ))}
</div>

// ✅ CORRETO - Extrair lógica
const activeItems = items.filter(i => i.active)
const shouldHighlight = (item: Item) =>
  item.score > 80 && item.recent && !item.archived

<div>
  {activeItems.map(item => (
    <Item key={item.id} highlight={shouldHighlight(item)} />
  ))}
</div>
```

---

## Referências

- [Atomic Design - Brad Frost](https://atomicdesign.bradfrost.com/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [CVA Documentation](https://cva.style/docs)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)

---

*Última atualização: 2025-12-29*
