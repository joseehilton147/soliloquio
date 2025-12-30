import type { TagSuggestion } from '@workspace/ui/components/atoms/tag-input'
import { useState } from 'react'

import { trpc } from '../lib/trpc'

/**
 * Hook para gerenciar autocomplete de tags com fuzzy search
 * Busca sugestões do banco de dados com pg_trgm
 */
export function useTagAutocomplete(type: 'vertical' | 'inverted') {
	const [query, setQuery] = useState('')

	// Buscar deck Rider-Waite
	const { data: decks } = trpc.tarot.getDecks.useQuery()
	const riderWaiteDeck = decks?.find((d) => d.slug === 'rider-waite')

	// Buscar tags com fuzzy search
	const { data: tags, isLoading } = trpc.tarot.searchTags.useQuery(
		{
			deckId: riderWaiteDeck?.id || '',
			type,
			query,
			limit: 10,
		},
		{
			enabled: !!riderWaiteDeck && query.length > 0,
		},
	)

	const suggestions: TagSuggestion[] =
		tags?.map((tag) => ({
			id: tag.id,
			value: tag.value,
			usageCount: tag.usageCount,
			similarity: tag.similarity,
		})) || []

	return {
		suggestions,
		isLoadingSuggestions: isLoading,
		onQueryChange: setQuery,
	}
}
