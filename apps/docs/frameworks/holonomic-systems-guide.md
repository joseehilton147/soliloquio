# Sistemas Holonômicos: Framework Mental Unificador

**O fundamento teórico por trás de Atomic Design, Testing Hierarchy e Feature Folders.**

**Referências e Padrões Aplicados:**
- [Arthur Koestler - "The Ghost in the Machine" (1967)](https://en.wikipedia.org/wiki/The_Ghost_in_the_Machine)
- [Arthur Koestler - "Janus: A Summing Up" (1978)](https://en.wikipedia.org/wiki/Janus:_A_Summing_Up)
- [Self-Contained Systems Architecture](https://scs-architecture.org/)
- [Atomic Design - Brad Frost (2016)](https://atomicdesign.bradfrost.com/)
- [Feature-Sliced Design](https://feature-sliced.design/)

---

## O Que É Um Holon?

Em 1967, o filósofo húngaro-britânico Arthur Koestler criou o termo **holon** para descrever algo que a linguagem comum não conseguia expressar adequadamente.

**Holon** = do grego *holos* (todo) + *-on* (partícula) = **"partícula-todo"**

> Uma entidade que é **simultaneamente um todo completo** e **uma parte de algo maior**.

### O Paradoxo Fundamental

Todo sistema suficientemente complexo enfrenta uma tensão:

| Necessidade | Descrição | Problema |
|-------------|-----------|----------|
| **Coesão** | Partes trabalham juntas harmoniosamente | Quanto mais coeso, mais acoplado |
| **Independência** | Partes evoluem separadamente | Quanto mais independente, mais difícil integrar |

Koestler percebeu que a natureza já resolveu esse problema há bilhões de anos.

---

## As Duas Tendências em Tensão Dinâmica

Todo holon possui duas tendências opostas em equilíbrio:

### 1. Tendência Auto-Afirmativa

- Preservar identidade individual
- Manter autonomia
- Proteger fronteiras
- Funcionar como um **todo completo**

### 2. Tendência Integrativa

- Funcionar como parte de algo maior
- Cooperar com outros holons
- Subordinar alguns interesses ao bem sistêmico
- Funcionar como uma **parte**

Koestler chamou isso de **Efeito Janus** — o deus romano de duas faces, olhando simultaneamente para dentro (identidade) e para fora (integração).

```
┌─────────────────────────────────────────────────────────────┐
│                         HOLON                               │
│                                                             │
│    ◄── AUTO-AFIRMATIVO    │    INTEGRATIVO ──►             │
│                           │                                 │
│    • Identidade própria   │    • Parte do sistema          │
│    • Autonomia            │    • Cooperação                │
│    • Fronteiras claras    │    • Subordinação ao todo      │
│    • Todo completo        │    • Parte funcional           │
│                           │                                 │
│              ════════ EQUILÍBRIO ════════                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Patologias: Quando o Equilíbrio Quebra

### Patologia 1: Câncer (Excesso Auto-Afirmativo)

Quando um holon **perde a tendência integrativa** mas mantém a auto-afirmativa:

**No corpo humano:**
- Célula cresce sem limite
- Ignora sinais do sistema
- Não respeita fronteiras
- Consome recursos sem contribuir

**No código:**
- Componente que cresce sem limite de responsabilidade
- Retesta dependências já testadas (suíte explode exponencialmente)
- Não respeita contratos com outros componentes
- Duplica lógica que deveria ser compartilhada

```typescript
// ❌ PATOLOGIA CÂNCER - Molecule retestando Atom
describe('NaipeCard', () => {
  it('deve aplicar cor correta ao badge', () => {
    render(<NaipeCard naipe={mockNaipe} />)
    // CÂNCER: Testando implementação interna do ElementBadge
    expect(screen.getByTestId('badge')).toHaveClass('bg-red-500')
  })
})
```

### Patologia 2: Morte (Excesso Integrativo)

Quando um holon **perde a tendência auto-afirmativa**:

**No corpo humano:**
- Célula perde identidade
- Não consegue funcionar isoladamente
- Totalmente dependente do sistema
- Sem capacidade de auto-regulação

**No código:**
- Componente sem responsabilidade clara
- Não testável isoladamente
- Totalmente acoplado a outros
- Sem fronteiras definidas

```typescript
// ❌ PATOLOGIA MORTE - Componente sem identidade
function MysteryComponent({ everything }: any) {
  // Faz tudo, não faz nada
  // Depende de 15 contextos
  // Não testável isoladamente
  return <div>{/* caos */}</div>
}
```

### O Equilíbrio Saudável

```typescript
// ✅ HOLON SAUDÁVEL - ElementBadge
// Auto-afirmativo: Funciona isoladamente, tem identidade clara
// Integrativo: Compõe bem com outros, respeita contratos

interface ElementBadgeProps {
  element: Element        // Contrato claro
  showIcon?: boolean      // Configurável
}

export function ElementBadge({ element, showIcon }: ElementBadgeProps) {
  // Responsabilidade única: renderizar badge de elemento
  // Testável isoladamente
  // Compõe bem em NaipeCard, ArcanoCard, etc.
}
```

---

## Holonomia em Componentes (Atomic Design)

**Atomic Design é implementação de princípios holonômicos em UI.**

Cada nível da hierarquia é um holon:

```
┌─────────────────────────────────────────────────────────────┐
│                      TEMPLATE (Holon)                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   ORGANISM (Holon)                    │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │               MOLECULE (Holon)                  │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │              ATOM (Holon)                 │  │  │  │
│  │  │  │   Todo completo + Parte de Molecule      │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  │   Todo completo + Parte de Organism             │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │   Todo completo + Parte de Template                   │  │
│  └───────────────────────────────────────────────────────┘  │
│   Todo completo + Parte de Page                             │
└─────────────────────────────────────────────────────────────┘
```

### Exemplos no Solilóquio

| Componente | Auto-Afirmativo (Todo) | Integrativo (Parte) |
|------------|------------------------|---------------------|
| `Button` | Clicável, estilizado, acessível | Compõe forms, cards, modals |
| `ElementBadge` | Renderiza elemento com cor | Compõe `NaipeCard`, `ArcanoCard` |
| `NaipeCard` | Card completo de naipe | Compõe `NaipeGrid` |
| `NaipeGrid` | Grid funcional de naipes | Compõe `TarotLayout` |
| `TarotLayout` | Layout completo do app | Renderiza na Page |

### Regra de Ouro

> **Cada holon deve ser testável isoladamente (auto-afirmativo) e compor bem com outros (integrativo).**

---

## Holonomia em Testes (Testing Hierarchy Principle)

**O Princípio de Confiança é aplicação direta de holonomia em testes.**

### A Tensão Holonômica em Testes

| Nível | Auto-Afirmativo | Integrativo |
|-------|-----------------|-------------|
| **Atom** | Testa TUDO (comportamento completo) | Confia em nada (é a base) |
| **Molecule** | Testa nova lógica apenas | Confia nos Atoms |
| **Organism** | Testa orquestração apenas | Confia nos Molecules |
| **Template** | Testa layout apenas | Confia nos Organisms |

### Reteste É Câncer

Quando Molecule retesta comportamento de Atom:
- Suite cresce exponencialmente (tumor)
- Manutenção fica impossível
- Refatoração quebra dezenas de testes
- Energia desperdiçada sem valor agregado

```typescript
// ❌ CÂNCER - Molecule retestando Atom
describe('NaipeCard', () => {
  it('deve chamar onClick do botão', () => {
    // Button já testa onClick! Isso é RETESTE
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})

// ✅ SAUDÁVEL - Molecule testando contrato
describe('NaipeCard', () => {
  it('deve passar naipe para onSelect', () => {
    // Teste de INTEGRAÇÃO, não de implementação
    fireEvent.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledWith(mockNaipe)
  })
})
```

### Thresholds de Saúde

| Métrica | Saudável | Atenção | Câncer |
|---------|----------|---------|--------|
| % Reteste | <20% | 20-40% | >40% |
| Crescimento Suite | Linear | Moderado | Exponencial |

---

## Holonomia em Features (Feature Folders)

**Feature Folders são Self-Contained Systems (SCS) em escala frontend.**

### Anatomia de um Holon de Feature

```
features/tiragens/           # HOLON: Tiragens
├── components/              # UI própria (auto-afirmativo)
│   ├── spread-canvas/
│   └── spread-card/
├── domain/                  # Regras próprias (auto-afirmativo)
│   ├── types.ts
│   ├── constants.ts
│   └── utils.ts
├── hooks/                   # Lógica própria (auto-afirmativo)
│   └── use-spread.ts
└── index.ts                 # Contrato público (integrativo)
```

### Características Holonômicas

| Aspecto | Auto-Afirmativo | Integrativo |
|---------|-----------------|-------------|
| **UI** | Componentes próprios | Usa atoms/molecules compartilhados |
| **Dados** | Types co-localizados | Exporta via barrel |
| **Lógica** | Hooks próprios | Respeita contratos globais |
| **Testes** | Testável isoladamente | Integra com outras features |

### Regra de Ouro (SCS)

> "Quando uma feature precisa de dados de outra, ela deve usar o contrato público (index.ts), não importar internos."

```typescript
// ❌ VIOLAÇÃO - Importando interno de outra feature
import { calculateSpread } from '../arcanos/domain/utils'

// ✅ CORRETO - Usando contrato público
import { ArcanoUtils } from '@/features/arcanos'
```

---

## Checklist de Saúde Holonômica

Use este checklist ao criar/revisar código:

### Para Componentes

- [ ] Tem responsabilidade única clara? (auto-afirmativo)
- [ ] É testável isoladamente? (auto-afirmativo)
- [ ] Tem props bem definidas? (contrato integrativo)
- [ ] Compõe bem com outros? (integrativo)
- [ ] Está no nível correto da hierarquia? (equilíbrio)

### Para Testes

- [ ] Testa apenas nova lógica deste nível? (auto-afirmativo)
- [ ] Confia nas dependências já testadas? (integrativo)
- [ ] Suite cresceu linearmente? (sem câncer)
- [ ] Pode refatorar sem quebrar dezenas de testes? (saudável)

### Para Features

- [ ] Tem estrutura consistente (components/, domain/, hooks/)? (auto-afirmativo)
- [ ] Types estão co-localizados? (auto-afirmativo)
- [ ] Exporta via barrel (index.ts)? (integrativo)
- [ ] Não importa internos de outras features? (fronteiras)

### Sinais de Patologia

**🔴 Câncer (excesso auto-afirmativo):**
- Componente com >10 props
- Arquivo com >200 linhas
- Suite de testes crescendo exponencialmente
- Feature que não usa nada compartilhado

**🔴 Morte (excesso integrativo):**
- Componente sem props tipadas
- Código não testável isoladamente
- Feature sem barrel export
- Dependência circular entre features

---

## Evolução Pragmática

O artigo original propõe evolução gradual:

```
1. Monolito Modular        ← Solilóquio está aqui
   └── Código organizado por domínio

2. Separação de Dados      ← Fase 3 do Roadmap (Types DDD)
   └── Types/schemas separados por domínio

3. Mensageria              ← Se escalar muito (improvável)
   └── Comunicação assíncrona entre features

4. Holonomia Completa      ← Para sistemas enterprise
   └── SCS com bancos próprios, deploy independente
```

**Regra de Ouro:**
> "Evolua quando a dor justificar, não por antecipação prematura."

Para o Solilóquio (app pessoal), Monolito Modular + Types DDD é suficiente.

---

## Conexão Espiritual

> "Como os Orixás mantêm equilíbrio entre identidade própria e harmonia do terreiro, assim nossos componentes equilibram autonomia e integração."

### Umbanda: Cada Orixá É Um Holon

```
┌─────────────────────────────────────────────────────────────┐
│                    TERREIRO (Sistema)                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  OGUM (Holon)           IANSÃ (Holon)                 │  │
│  │  • Axé próprio          • Axé próprio                 │  │
│  │  • Domínio: caminhos    • Domínio: ventos             │  │
│  │  • Trabalha com outros  • Trabalha com outros         │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  OXALÁ (Holon)          OXÓSSI (Holon)                │  │
│  │  • Axé próprio          • Axé próprio                 │  │
│  │  • Domínio: sabedoria   • Domínio: precisão           │  │
│  │  • Coordena sem anular  • Trabalha com outros         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Auto-afirmativo**: Cada Orixá tem axé (energia/propósito) próprio, domínio específico, identidade clara.

**Integrativo**: Trabalham juntos no terreiro, respeitam hierarquia de Oxalá, cooperam em trabalhos.

**Patologia Câncer**: Orixá que quer dominar tudo, não respeita outros.

**Patologia Morte**: Orixá que perde identidade, não manifesta seu axé.

### Kardecismo: Lei de Evolução

Allan Kardec ensina que cada espírito:
- **É indivíduo** (auto-afirmativo): consciência própria, livre-arbítrio
- **É parte da humanidade cósmica** (integrativo): evolui junto, ajuda outros

Evolução espiritual = equilibrar essas tendências. Nem egoísmo (só auto), nem anulação (só integração).

### Maçonaria: A Pedra no Templo

Cada pedra do templo maçônico:
- **É perfeita em si** (auto-afirmativo): polida, esquadrejada, com medidas exatas
- **É parte do todo** (integrativo): encaixa com outras, forma o templo

Pedreiro que faz pedra imperfeita → componente mal testado.
Pedreiro que ignora o projeto → componente que não compõe.

### Lição Unificada

> "Componente saudável tem identidade clara E coopera com outros.
> Pessoa saudável tem autonomia E contribui para o coletivo.
> Desequilíbrio em qualquer direção é patologia."

---

## Glossário

**Holon**: Entidade que é simultaneamente todo completo e parte de algo maior.

**Tendência Auto-Afirmativa**: Preservar identidade, autonomia, fronteiras.

**Tendência Integrativa**: Funcionar como parte, cooperar, subordinar ao bem sistêmico.

**Efeito Janus**: Dualidade fundamental do holon (duas faces).

**Patologia Câncer**: Excesso auto-afirmativo, perda de integração.

**Patologia Morte**: Excesso integrativo, perda de identidade.

**SCS (Self-Contained Systems)**: Arquitetura que formaliza princípios holonômicos.

---

## Referências

### Fontes Primárias
- Koestler, Arthur. "The Ghost in the Machine". Hutchinson, 1967.
- Koestler, Arthur. "Janus: A Summing Up". Hutchinson, 1978.

### Arquiteturas
- [SCS Architecture](https://scs-architecture.org/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Atomic Design - Brad Frost](https://atomicdesign.bradfrost.com/)

### Artigo Inspirador
- [FelipeNess - Sistemas Holonômicos (TabNews)](https://www.tabnews.com.br/FelipeNess/sistemas-holonomicos-o-framework-mental-que-faltava-para-decisoes-de-arquitetura)

---

## Documentos Relacionados

- [atomic-design-llm-guide.md](./atomic-design-llm-guide.md) - Holonomia em componentes
- [testing-hierarchy-principle.md](./testing-hierarchy-principle.md) - Holonomia em testes
- [code-review-prompt.md](./code-review-prompt.md) - Validação de saúde holonômica

---

*Framework v1.0 - Baseado em Arthur Koestler (1967)*
*Adaptado do artigo de FelipeNess (TabNews)*
*Última atualização: 2025-12-29*
