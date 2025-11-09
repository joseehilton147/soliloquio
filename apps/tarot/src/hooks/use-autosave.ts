import { useEffect, useRef, useState, useCallback } from 'react'

export interface AutosaveOptions {
	key: string // Chave única para identificar o draft (ex: 'carta-nova', 'carta-edit-123')
	data: any // Dados do formulário
	interval?: number // Intervalo de auto-save em ms (padrão: 5000ms = 5s)
	onSave?: () => void // Callback quando salvar
	onRestore?: (data: any) => void // Callback quando restaurar
	enabled?: boolean // Se o auto-save está habilitado (padrão: true)
}

export interface AutosaveReturn {
	lastSaved: Date | null
	hasDraft: boolean
	clearDraft: () => void
	saveDraft: () => void
	restoreDraft: () => any | null
	isSaving: boolean
}

/**
 * Hook para auto-save de formulários usando localStorage
 * Salva automaticamente os dados a cada X segundos quando há mudanças
 */
export function useAutosave({
	key,
	data,
	interval = 5000, // 5 segundos
	onSave,
	onRestore,
	enabled = true
}: AutosaveOptions): AutosaveReturn {
	const [lastSaved, setLastSaved] = useState<Date | null>(null)
	const [hasDraft, setHasDraft] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const previousDataRef = useRef<string>('')
	const timeoutRef = useRef<NodeJS.Timeout>()

	// Chave do localStorage
	const storageKey = `autosave_${key}`

	// Verifica se há draft salvo ao montar
	useEffect(() => {
		if (!enabled) return

		const savedDraft = localStorage.getItem(storageKey)
		if (savedDraft) {
			setHasDraft(true)
			const parsed = JSON.parse(savedDraft)
			setLastSaved(parsed.timestamp ? new Date(parsed.timestamp) : null)
		}
	}, [storageKey, enabled])

	// Salva o draft
	const saveDraft = useCallback(() => {
		if (!enabled) return

		try {
			setIsSaving(true)
			const draft = {
				data,
				timestamp: new Date().toISOString()
			}
			localStorage.setItem(storageKey, JSON.stringify(draft))
			setLastSaved(new Date())
			setHasDraft(true)
			onSave?.()
		} catch (error) {
			console.error('[Autosave] Erro ao salvar draft:', error)
		} finally {
			setIsSaving(false)
		}
	}, [data, enabled, onSave, storageKey])

	// Limpa o draft
	const clearDraft = useCallback(() => {
		try {
			localStorage.removeItem(storageKey)
			setHasDraft(false)
			setLastSaved(null)
		} catch (error) {
			console.error('[Autosave] Erro ao limpar draft:', error)
		}
	}, [storageKey])

	// Restaura o draft
	const restoreDraft = useCallback(() => {
		try {
			const savedDraft = localStorage.getItem(storageKey)
			if (!savedDraft) return null

			const parsed = JSON.parse(savedDraft)
			onRestore?.(parsed.data)
			return parsed.data
		} catch (error) {
			console.error('[Autosave] Erro ao restaurar draft:', error)
			return null
		}
	}, [onRestore, storageKey])

	// Auto-save quando os dados mudarem
	useEffect(() => {
		if (!enabled) return

		const currentData = JSON.stringify(data)

		// Só salva se os dados mudaram
		if (currentData !== previousDataRef.current && currentData !== '{}' && currentData !== 'null') {
			previousDataRef.current = currentData

			// Limpa timeout anterior
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}

			// Agenda novo save
			timeoutRef.current = setTimeout(() => {
				saveDraft()
			}, interval)
		}

		// Cleanup
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [data, enabled, interval, saveDraft])

	// Salva ao sair da página (beforeunload)
	useEffect(() => {
		if (!enabled) return

		const handleBeforeUnload = () => {
			saveDraft()
		}

		window.addEventListener('beforeunload', handleBeforeUnload)
		return () => window.removeEventListener('beforeunload', handleBeforeUnload)
	}, [enabled, saveDraft])

	return {
		lastSaved,
		hasDraft,
		clearDraft,
		saveDraft,
		restoreDraft,
		isSaving
	}
}
