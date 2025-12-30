'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

export type AutosaveOptions<T> = {
	key: string // Chave única para identificar o draft (ex: 'carta-nova', 'carta-edit-123')
	data: T // Dados do formulário (tipado)
	interval?: number // Intervalo de auto-save em ms (padrão: 5000ms = 5s)
	onSave?: () => void // Callback quando salvar
	onRestore?: (data: T) => void // Callback quando restaurar (tipado)
	enabled?: boolean // Se o auto-save está habilitado (padrão: true)
}

export type AutosaveReturn<T> = {
	lastSaved: Date | null
	hasDraft: boolean
	clearDraft: () => void
	saveDraft: () => void
	restoreDraft: () => T | null // Retorno tipado
	isSaving: boolean
}

type StoredDraft<T> = {
	data: T
	timestamp: string
}

/**
 * Hook para auto-save de formulários usando localStorage
 * Salva automaticamente os dados a cada X segundos quando há mudanças
 *
 * @template T - Tipo dos dados do formulário
 */
export function useAutosave<T>({
	key,
	data,
	interval = 5000, // 5 segundos
	onSave,
	onRestore,
	enabled = true,
}: AutosaveOptions<T>): AutosaveReturn<T> {
	const [lastSaved, setLastSaved] = useState<Date | null>(null)
	const [hasDraft, setHasDraft] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const previousDataRef = useRef<string>('')
	const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

	// Chave do localStorage
	const storageKey = `autosave_${key}`

	// Verifica se há draft salvo ao montar
	useEffect(() => {
		if (!enabled) {return}

		const savedDraft = localStorage.getItem(storageKey)
		if (savedDraft) {
			setHasDraft(true)
			const parsed = JSON.parse(savedDraft) as StoredDraft<T>
			setLastSaved(parsed.timestamp ? new Date(parsed.timestamp) : null)
		}
	}, [storageKey, enabled])

	// Salva o draft
	const saveDraft = useCallback(() => {
		if (!enabled) {return}

		try {
			setIsSaving(true)
			const draft: StoredDraft<T> = {
				data,
				timestamp: new Date().toISOString(),
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
	const restoreDraft = useCallback((): T | null => {
		try {
			const savedDraft = localStorage.getItem(storageKey)
			if (!savedDraft) {return null}

			const parsed = JSON.parse(savedDraft) as StoredDraft<T>
			onRestore?.(parsed.data)
			return parsed.data
		} catch (error) {
			console.error('[Autosave] Erro ao restaurar draft:', error)
			return null
		}
	}, [onRestore, storageKey])

	// Auto-save quando os dados mudarem
	useEffect(() => {
		if (!enabled) {return}

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
		if (!enabled) {return}

		const handleBeforeUnload = () => {
			saveDraft()
		}

		globalThis.addEventListener('beforeunload', handleBeforeUnload)
		return () => { globalThis.removeEventListener('beforeunload', handleBeforeUnload) }
	}, [enabled, saveDraft])

	return {
		lastSaved,
		hasDraft,
		clearDraft,
		saveDraft,
		restoreDraft,
		isSaving,
	}
}
