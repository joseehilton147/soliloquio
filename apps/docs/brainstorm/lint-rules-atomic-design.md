# ESLint Rules para Atomic Design

**Status:** 📝 Brainstorm / Futuro
**Objetivo:** Criar regras ESLint customizadas que FORCEM desenvolvedores a seguir a estrutura Atomic Design documentada.

---

## Por Que Isso É Importante?

### O Problema

Documentação é ignorável. Code review é manual e falível. Desenvolvedores (humanos e LLMs) podem:
- Importar Organism dentro de Atom
- Criar componente na pasta errada
- Misturar domain-specific com genérico
- Quebrar hierarquia de dependências

### A Solução

**Regras ESLint automatizadas** = Lei do Karma automática. Violou? Erro. Sem exceções.

```
❌ ESLint Error: atomic-design/no-upward-import
   Atoms cannot import from molecules, organisms, or templates.

   Fix: Move this component to molecules/ or remove the import.
```

---

## Regras Propostas

### Categoria 1: Hierarquia de Imports

#### `atomic-design/no-upward-import`

**Severidade:** ERROR

**Descrição:** Impede imports de níveis superiores na hierarquia.

```typescript
// ❌ ERROR - Atom importando Molecule
// atoms/button/button.tsx
import { SearchBar } from '@/components/molecules/search-bar'

// ❌ ERROR - Molecule importando Organism
// molecules/card/card.tsx
import { Header } from '@/components/organisms/header'

// ✅ OK - Molecule importando Atom
// molecules/search-bar/search-bar.tsx
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
```

**Implementação:**
```javascript
// eslint-plugin-atomic-design/rules/no-upward-import.js
const HIERARCHY = ['atoms', 'molecules', 'organisms', 'templates']

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow importing from higher atomic levels',
    },
    fixable: null,
    schema: [],
  },
  create(context) {
    const filename = context.getFilename()
    const currentLevel = HIERARCHY.findIndex(level => filename.includes(`/${level}/`))

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value
        const importLevel = HIERARCHY.findIndex(level => importPath.includes(`/${level}/`))

        if (importLevel > currentLevel && currentLevel !== -1) {
          context.report({
            node,
            message: `${HIERARCHY[currentLevel]} cannot import from ${HIERARCHY[importLevel]}. Move component up or remove import.`,
          })
        }
      },
    }
  },
}
```

---

#### `atomic-design/no-cross-feature-import`

**Severidade:** ERROR

**Descrição:** Impede imports internos entre features diferentes.

```typescript
// ❌ ERROR - Feature importando internos de outra feature
// features/arcanos/components/arcano-card.tsx
import { calculateElement } from '@/features/naipes/domain/utils'

// ✅ OK - Via barrel export
// features/arcanos/components/arcano-card.tsx
import { NaipeUtils } from '@/features/naipes'
```

---

#### `atomic-design/no-domain-in-shared`

**Severidade:** ERROR

**Descrição:** Impede imports domain-specific em packages/ui.

```typescript
// ❌ ERROR - packages/ui importando domain
// packages/ui/src/components/atoms/button.tsx
import { Arcano } from '@/features/arcanos/domain/types'

// ✅ OK - packages/ui é genérico
// packages/ui/src/components/atoms/button.tsx
import type { ButtonProps } from './types'
```

---

### Categoria 2: Nomenclatura

#### `atomic-design/component-naming`

**Severidade:** WARNING

**Descrição:** Valida nomenclatura semântica.

```typescript
// ⚠️ WARNING - Nome genérico
// organisms/tarot/Card.tsx
export function Card() {}  // Qual card? De que domínio?

// ✅ OK - Nome semântico
// organisms/tarot/arcano-card.tsx
export function ArcanoCard() {}
```

---

#### `atomic-design/file-naming`

**Severidade:** ERROR

**Descrição:** Força kebab-case para arquivos.

```
❌ ERROR: ArcanoCard.tsx should be arcano-card.tsx
❌ ERROR: arcanoCard.tsx should be arcano-card.tsx
✅ OK: arcano-card.tsx
```

---

### Categoria 3: Estrutura de Pastas

#### `atomic-design/require-index`

**Severidade:** WARNING

**Descrição:** Exige index.ts em cada pasta de componente.

```
⚠️ WARNING: Missing index.ts in organisms/tarot/spread-canvas/

   Expected structure:
   spread-canvas/
   ├── spread-canvas.tsx
   ├── spread-canvas.test.tsx
   └── index.ts  ← Missing
```

---

#### `atomic-design/domain-separation`

**Severidade:** ERROR

**Descrição:** Domain-specific não pode estar em raiz de molecules/organisms.

```
❌ ERROR: molecules/NaipeCard.tsx
   Domain-specific components must be in feature folders.

   Move to: molecules/tarot/naipe-card/naipe-card.tsx
   Or to: features/naipes/components/naipe-card.tsx
```

---

### Categoria 4: Testes

#### `atomic-design/test-hierarchy`

**Severidade:** WARNING

**Descrição:** Detecta reteste de dependências.

```typescript
// ⚠️ WARNING - Molecule retestando comportamento de Atom
// molecules/search-bar/search-bar.test.tsx
it('deve chamar onClick do botão', () => {
  fireEvent.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalled()  // Button já testa isso!
})
```

**Detecção heurística:**
- Se teste de Molecule usa `fireEvent` em elemento que é Atom → WARNING
- Se teste de Organism mocka Molecules → OK
- Se teste de Organism testa comportamento interno de Molecule → WARNING

---

## Configuração Proposta

### `.eslintrc.js`

```javascript
module.exports = {
  plugins: ['atomic-design'],
  rules: {
    // Hierarquia (CRÍTICO)
    'atomic-design/no-upward-import': 'error',
    'atomic-design/no-cross-feature-import': 'error',
    'atomic-design/no-domain-in-shared': 'error',

    // Nomenclatura
    'atomic-design/component-naming': 'warn',
    'atomic-design/file-naming': 'error',

    // Estrutura
    'atomic-design/require-index': 'warn',
    'atomic-design/domain-separation': 'error',

    // Testes
    'atomic-design/test-hierarchy': 'warn',
  },
  settings: {
    'atomic-design': {
      // Caminhos das pastas Atomic
      atomsPath: 'src/components/atoms',
      moleculesPath: 'src/components/molecules',
      organismsPath: 'src/components/organisms',
      templatesPath: 'src/components/templates',

      // Caminhos de packages compartilhados
      sharedPackages: ['packages/ui', 'packages/core'],

      // Features domain-specific
      featuresPath: 'src/features',

      // Domínios válidos
      domains: ['tarot', 'arcanos', 'naipes', 'tiragens'],
    },
  },
}
```

---

## Roadmap de Implementação

### Fase 1: Regras Críticas (MVP)
- [ ] `no-upward-import` - Hierarquia básica
- [ ] `file-naming` - kebab-case
- [ ] `require-index` - Barrel exports

### Fase 2: Regras de Domínio
- [ ] `no-cross-feature-import`
- [ ] `no-domain-in-shared`
- [ ] `domain-separation`

### Fase 3: Regras de Qualidade
- [ ] `component-naming`
- [ ] `test-hierarchy`

### Fase 4: Integração
- [ ] Publicar como `@soliloquio/eslint-plugin-atomic-design`
- [ ] Adicionar ao `packages/eslint-config`
- [ ] Documentar em `apps/docs`

---

## Alternativas Consideradas

### 1. ESLint Plugin Existente

**`eslint-plugin-import`** já tem algumas regras:
- `import/no-restricted-paths` - Pode simular hierarquia
- `import/no-internal-modules` - Força barrel exports

**Problema:** Não é semântico. Não entende Atomic Design.

### 2. TypeScript Path Aliases

```json
// tsconfig.json
{
  "paths": {
    "@atoms/*": ["src/components/atoms/*"],
    "@molecules/*": ["src/components/molecules/*"]
  }
}
```

**Problema:** Não impede imports errados, só facilita corretos.

### 3. Custom ESLint Plugin (Nossa Escolha)

**Vantagens:**
- Semântico (entende níveis Atomic)
- Configurável (adapta a qualquer projeto)
- Extensível (novas regras conforme necessidade)
- Integrável (CI/CD, pre-commit hooks)

---

## Referências

- [ESLint Plugin Developer Guide](https://eslint.org/docs/developer-guide/working-with-plugins)
- [AST Explorer](https://astexplorer.net/) - Para testar regras
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)
- [Atomic Design - Brad Frost](https://atomicdesign.bradfrost.com/)
- [Feature-Sliced Design - Linting](https://feature-sliced.design/docs/guides/tech/with-eslint)

---

## Conexão Espiritual

> "Regras automatizadas são como a Lei do Karma - não precisam de fiscal. A consequência é automática."

Assim como Exu guarda a encruzilhada sem precisar ser lembrado, ESLint guarda a arquitetura sem precisar de code review manual para violações estruturais.

---

*Criado: 2025-12-29*
*Status: Brainstorm - Aguardando priorização*
*Próximo passo: Validar regras MVP no Solilóquio*
