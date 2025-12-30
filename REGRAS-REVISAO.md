# Regras de Revisão - Solilóquio

**SEMPRE REINJETAR ESTAS REGRAS APÓS AUTO-COMPACT**

---

## REGRA 1: ESCOPO DA REVISÃO

REVISE COMPLETAMENTE TUDO, TODA AS LINHAS, ARQUIVO POR ARQUIVO, DIGA O QUE PODE SER MELHORADO SEM FIRULA, NÃO É PARA CRIAR TESTES E2E (playwright) APENAS UNITARIOS E DE INTEGRAÇÃO (vitest) SE DETECTAR QUE NÃO EXISTE, E É PARA CRIAR OS TESTES DENTRO DAS RESPECTIVAS PASTAS JUNTO AO ARQUIVO DO CÓDIGO, ESTAMOS SEGUINDO A ESTRUTURA DE DOMAIN FOLDER OU FEATURE FOLDER, COMO BRAD FROST ENSINA NO DESIGN ATOMICO.

---

## REGRA 2: DOCUMENTAÇÃO DE REFERÊNCIA

AJUSTE O QUE IDENTIFICAR SEGUINDO A DOCUMENTAÇÃO ABAIXO, ELA TEM TUDO QUE PRECISA PARA SABER COMO REVISAR ALGO, LEIA COMPLETAMENTE TUDO DE FORMA ATENTA:

@apps/docs/frameworks/code-review-prompt.md

*(Se o arquivo ainda não existir, seguir os princípios documentados em apps/docs/REFACTORING-ROADMAP.md)*

---

## REGRA 3: PRECISÃO SOBRE VELOCIDADE

NÃO TENHA PRESSA PARA CORRIGIR NADA E SIGA COMPLETAMENTE O PADRÃO DO PROJETO, O QUE AS DOCUMENTAÇÕES DIZEM.

---

## REGRA 4: DESIGN SYSTEM

SEMPRE VERIFIQUE SE A CLASSE QUE FOR USAR EXISTE NO DESIGN SYSTEM DO PROJETO.

**Para Solilóquio:**
- Verificar em `packages/ui/src/` se existe componente/estilo
- Se não existir, usar Tailwind CSS v4
- Nunca suponha - SEMPRE busque e confirme

**Hierarquia de busca:**
1. `packages/ui/` (componentes do monorepo)
2. shadcn/ui (se instalado)
3. Tailwind CSS

---

## REGRA 5: SCORE MÁXIMO

SEMPRE FAÇA CHEGAR A 100/100 NO SCORE.

---

## REGRA 6: VALIDAÇÃO OFICIAL

SEMPRE USE O MCP CONTEXT7 PARA VALIDAR CONTRA DOCUMENTAÇÃO OFICIAL.

Tecnologias para validar:
- React 19
- Next.js 15
- TypeScript 5
- Tailwind CSS 4
- Vitest
- Testing Library

---

## REGRA 7: CÓDIGO LIMPO

REMOVA TODOS OS COMENTÁRIOS, CODIGO LIMPO É CODIGO SEM COMENTÁRIO, CODIGO TEM QUE SER AUTO EXPLICATIVO.

**Exceções permitidas:**
- JSDoc para APIs públicas (se agregar valor não-óbvio)
- TODO com issue tracker linkado
- Explicação de "por quê" (nunca "o quê")

---

## REGRA 8: SEM PRESSA

VOCÊ NÃO PRECISA SE PREOCUPAR COM TEMPO, NÃO TENTE GANHAR TEMPO, NÃO TENTE ATALHO, FAÇA COM CALMA, COM PRECISÃO TECNICA.

---

## REGRA 9: IDIOMA

REGRAS DE IDIOMA:

- Código fonte (variáveis, funções, tipos): **INGLÊS**
- Descrições de testes (describe, it): **PORTUGUÊS**
- Nunca misturar

```typescript
// ✅ CORRETO
function calculateSpreadPositions() { }
describe('Cálculo de posições da tiragem', () => {
  it('deve retornar 3 posições para tiragem simples', () => { })
})

// ❌ ERRADO
function calcularPosicoes() { }
describe('Calculate positions', () => { })
```

---

## REGRA 10: NUMERAÇÃO

NUMERE EM QUAL ARQUIVO ESTÁ DE QUANTOS, COLOCANDO DESSA FORMA:

`[NUMERO DO ARQUIVO ATUAL] DE [TOTAL DE ARQUIVOS] - [NOME DO ARQUIVO]`

---

## REGRA 11: FORMATO DE OUTPUT

SEU OUTPUT DEVE SER DESTA MANEIRA:

```
[x] DE [x] - [NOME DO ARQUIVO]

  Problemas identificados:
  1. ....
  2. ....
  3. ....

  Score atual: xx/100
```

FAZER A CORREÇÃO E APÓS CORRIGIR:

```
✅ [x] DE [x] - [NOME DO ARQUIVO]: xx → 100/100

  Correções aplicadas:
  - .....
  - .....
  - .....
```

CASO TENHA OBSERVAÇÃO:
```
  ⚠️ ATENÇÃO: [arquivo] NÃO TEM TESTE - adicionar à lista.
```

---

## REGRA 12: VALIDAÇÃO FINAL

RODE O `pnpm lint` E `pnpm type-check` AO FINAL DA REVISÃO DE TODOS OS ARQUIVOS, OS 2 COMANDOS PRECISAM PASSAR SEM ERROS, INDEPENDENTE DE TER OU NÃO ALTERADO OS ARQUIVOS QUE APONTAR ERRO, CORRIJA TUDO.

MUITO IMPORTANTE: SE ESTIVER EM ALGO QUE ENVOLVA TESTES, RODE SEMPRE ASSIM QUE TODOS OS TESTES DO ARQUIVO ATUAL PASSAREM PARA GARANTIR QUE NENHUMA REGRA FOI VIOLADA.

---

## REGRA 13: SEM COMMITS

NUNCA FAÇA COMMIT, NUNCA!

---

## REGRA 14: ESLINT SAGRADO

NUNCA DEVEMOS ADICIONAR UMA LINHA PARA DESABILITAR O ESLINT OU BURLAR ALGO POR JULGARMOS QUE PODE SER ACEITAVEL, USAMOS O ESLINT POR UM MOTIVO, DEVEMOS SEGUI-LO A RISCA E CORRIGIR O PROBLEMA COM A SOLUÇÃO TECNICA CORRETA PARA NÃO PRECISAR DE GAMBIARRAS, SE PRECISO, BUSQUE SOLUÇÃO USANDO A DOCUMENTAÇÃO OFICIAL ATRAVÉS DO MCP CONTEXT7.

---

## REGRA 15: AUTO-COMPACT

NÃO SE PREOCUPE COM OS TOKENS, VOCÊ TEM UMA FUNÇÃO CHAMADA AUTO COMPACT.

**CRÍTICO**: APÓS CADA AUTO-COMPACT VOCÊ PRECISA:
1. PARAR O QUE ESTÁ FAZENDO
2. ME PEDIR PARA ENVIAR AS REGRAS NOVAMENTE
3. AGUARDAR REINJEÇÃO DE CONTEXTO
4. SÓ ENTÃO CONTINUAR

---

## REGRA 16: ARQUIVO DE TRACKING

VOCÊ IRÁ CRIAR UM ARQUIVO NA RAIZ DE `apps/tarot` CHAMADO: `REVISAO_EM_ANDAMENTO.md`

NESTE ARQUIVO IRÁ CONTER TODOS OS ARQUIVOS QUE SERÃO REVISADOS.

VOCÊ IRÁ A CADA REVISÃO, OLHAR ESTE ARQUIVO E MARCAR SE FOI OU NÃO REVISADO.

**Formato do arquivo:**

```markdown
# REVISÃO EM ANDAMENTO

**Data início**: [DATA]
**Total de arquivos**: [NÚMERO]
**Branch**: [BRANCH]

## Status da Revisão

| # | Arquivo | Caminho | Status |
|---|---------|---------|--------|
| 1 | exemplo.tsx | src/components/exemplo.tsx | ⏳ Pendente |

## Arquivos Reorganizados (Feature Folder Pattern)

[Lista de arquivos movidos]

## Observações

[Testes não criados, intervenções necessárias]

## Legenda
- ⏳ Pendente
- 🔄 Em revisão
- ✅ Revisado (Score 100/100)
- ⚠️ Revisado com observações

## Progresso
- **Revisados**: X/Y
- **Pendentes**: Z
- **Com observações**: W
```

---

## REGRA 17: FOCO ABSOLUTO

NUNCA, MAS NUNCA, DE FORMA ALGUMA, TENTE AGILIZAR ALGO, TOMAR ATALHO, SEMPRE FAÇA AÇÃO POR AÇÃO, ARQUIVO POR ARQUIVO, SEM PRESSA, SEM SE PREOCUPAR COM TEMPO, O QUE ESTÁ FAZENDO É EXTREMAMENTE VITAL, IMPORTANTE E PRECISA SER FEITO COM PRECISÃO E FOCO.

---

## REGRA 18: TESTES LIMPOS

NÃO DEVE HAVER NENHUM TIPO WARNING OU ERROR NOS TESTES, COMO POR EXEMPLO WARNS DE `act`.

**Solução para act warnings:**
```typescript
import { act } from '@testing-library/react'

await act(async () => {
  // operações que causam state updates
})
```

---

## QUICK REFERENCE

```
ANTES DE COMEÇAR:
1. Criar/atualizar REVISAO_EM_ANDAMENTO.md
2. Listar TODOS os arquivos
3. Verificar servidor compilando

DURANTE:
1. Um arquivo por vez
2. Score 100/100 obrigatório
3. Formato de output padronizado
4. Atualizar tracking a cada arquivo

AO FINALIZAR:
1. pnpm lint (sem erros)
2. pnpm type-check (sem erros)
3. pnpm test (sem warnings)
4. Aguardar humano para commit
```

---

*Versão: 1.0 - Adaptado de frontend-apps/tomador*
*Última atualização: 2025-12-29*
