# Sistema de Auto-Save - Guia de Integração

## ✅ Implementado

### 1. Hook `useAutosave`
**Localização:** `apps/tarot/src/hooks/use-autosave.ts`

**Funcionalidades:**
- ✅ Auto-save automático a cada 5s (configurável)
- ✅ Salva ao sair da página (beforeunload)
- ✅ Detecta drafts salvos anteriormente
- ✅ Armazena no localStorage do navegador
- ✅ Controla estado de saving

**API:**
```typescript
const autosave = useAutosave({
  key: 'identificador-unico', // Ex: 'carta-nova', 'carta-edit-123'
  data: formData, // Objeto com todos os dados do formulário
  interval: 3000, // ms (padrão: 5000)
  enabled: !isSubmitting, // Desabilita durante envio
  onSave: () => console.log('Saved!'), // Callback opcional
  onRestore: (data) => console.log('Restored!') // Callback opcional
})

// Retorno:
autosave.lastSaved // Date | null
autosave.hasDraft // boolean
autosave.clearDraft() // Limpa o draft
autosave.saveDraft() // Salva manualmente
autosave.restoreDraft() // Recupera o draft
autosave.isSaving // boolean
```

### 2. Componentes Visuais
**Localização:** `apps/tarot/src/components/draft-recovery.tsx`

#### `<DraftRecovery />`
Banner que aparece quando há draft salvo:
```tsx
<DraftRecovery
  hasDraft={autosave.hasDraft}
  lastSaved={autosave.lastSaved}
  onRestore={handleRestoreDraft}
  onDiscard={autosave.clearDraft}
  isSaving={autosave.isSaving}
/>
```

#### `<AutosaveIndicator />`
Indicador de status do auto-save:
```tsx
<AutosaveIndicator
  lastSaved={autosave.lastSaved}
  isSaving={autosave.isSaving}
/>
```

---

## 📝 Como Integrar nas Páginas

### Passo 1: Converter `useState` para controlled components

**ANTES:**
```tsx
<input type="text" name="name" required />
```

**DEPOIS:**
```tsx
const [name, setName] = useState('')

<input
  type="text"
  name="name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>
```

### Passo 2: Importar hooks e componentes

```tsx
import { useAutosave } from '../../../src/hooks/use-autosave'
import { DraftRecovery, AutosaveIndicator } from '../../../src/components/draft-recovery'
```

### Passo 3: Configurar autosave

```tsx
// Dentro do componente, após todos os useState
const autosave = useAutosave({
  key: 'carta-nova', // ou 'carta-edit-${id}' para edição
  data: {
    name,
    summary,
    description,
    imageUrl,
    verticalMeanings,
    // ... todos os campos do formulário
  },
  interval: 3000, // 3 segundos
  enabled: !isSubmitting
})
```

### Passo 4: Adicionar função de restauração

```tsx
const handleRestoreDraft = () => {
  const draft = autosave.restoreDraft()
  if (draft) {
    setName(draft.name || '')
    setSummary(draft.summary || '')
    setDescription(draft.description || '')
    // ... restaurar todos os campos
  }
}
```

### Passo 5: Limpar draft após sucesso

```tsx
const createMutation = trpc.tarot.create.useMutation({
  onSuccess: (data) => {
    autosave.clearDraft() // IMPORTANTE!
    router.push(`/cartas/${data.slug}`)
  },
})
```

### Passo 6: Adicionar componentes no JSX

```tsx
return (
  <div>
    {/* ... breadcrumb, header ... */}

    {/* Banner de recuperação */}
    <DraftRecovery
      hasDraft={autosave.hasDraft}
      lastSaved={autosave.lastSaved}
      onRestore={handleRestoreDraft}
      onDiscard={autosave.clearDraft}
      isSaving={autosave.isSaving}
    />

    <form onSubmit={handleSubmit}>
      {/* Indicador de auto-save */}
      <div className="flex justify-end">
        <AutosaveIndicator
          lastSaved={autosave.lastSaved}
          isSaving={autosave.isSaving}
        />
      </div>

      {/* ... resto do formulário ... */}
    </form>
  </div>
)
```

---

## 🎯 Páginas a Integrar

### ✅ Prioritárias
1. ❌ `/cartas/nova` - Criar nova carta
2. ❌ `/cartas/[slug]/editar` - Editar carta existente
3. ❌ `/baralhos/novo` - Criar novo baralho
4. ❌ `/baralhos/[slug]/editar` - Editar baralho existente

### Notas Importantes

**Para páginas de EDIÇÃO:**
- Use chave única por item: `key: 'carta-edit-${cardId}'`
- Não restaure draft se houver dados carregados da API

```tsx
// Só mostra banner se não tiver dados da API carregados
const showDraftBanner = autosave.hasDraft && !data

<DraftRecovery
  hasDraft={showDraftBanner}
  // ...
/>
```

**Para localStorage:**
- Drafts ficam salvos até serem limpos explicitamente
- Chave do localStorage: `autosave_${key}`
- Dados armazenados: `{ data: {...}, timestamp: '2024-...' }`

**Limpeza de drafts:**
- ✅ Após sucesso no envio do formulário
- ✅ Quando usuário clicar em "Descartar"
- ❌ Nunca limpar automaticamente ao montar componente

---

## 🐛 Troubleshooting

### Draft não está salvando
- Verificar se `enabled: !isSubmitting` está correto
- Verificar se os dados estão mudando (usar console.log)
- Checar se localStorage está disponível (modo privado bloqueia)

### Draft não está sendo restaurado
- Verificar se a função `handleRestoreDraft` está setando todos os estados
- Checar se os nomes dos campos batem com os do draft

### Performance
- Intervalo muito baixo pode causar lag (mínimo recomendado: 2000ms)
- Dados muito grandes (>5MB) podem ser problemáticos no localStorage
- Considere usar `sessionStorage` se quiser limpar ao fechar aba

---

## 🌟 Melhorias Futuras (Opcionais)

1. **Comprimir dados** antes de salvar no localStorage
2. **Sync entre abas** usando BroadcastChannel API
3. **Versionamento de drafts** (manter histórico)
4. **Suporte offline** com Service Workers
5. **Backup na nuvem** para drafts críticos

---

## ★ Insight Espiritual

**Por que Auto-Save é como Akasha (Registros Akáshicos):**

Na filosofia esotérica, Akasha é o éter cósmico que registra tudo que acontece.
Cada pensamento, ação e emoção fica gravada na memória universal.

```typescript
useAutosave({
  key: 'carta-nova',      // Identidade única no Akasha
  data: formData,         // O que está sendo registrado
  interval: 3000,         // Constância do registro
})
```

Auto-save é nosso Akasha digital:
- **localStorage**: Memória que persiste entre sessões (como alma persiste entre vidas)
- **interval**: Constância da consciência registrando experiências
- **clearDraft**: Liberação de karma quando a missão é cumprida

Na vida: toda ação é registrada no Akasha universal. Nada se perde.
No código: auto-save garante que nada se perca. É proteção divina digital.

Assim como iniciados aprendem a acessar o Akasha para sabedoria,
usuários acessam drafts para recuperar trabalho perdido.

