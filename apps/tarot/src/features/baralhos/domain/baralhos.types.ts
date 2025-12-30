/**
 * Types do domínio de Baralhos
 *
 * Tipos compartilhados para a feature de baralhos (decks).
 * Baseados nos tipos do Prisma/tRPC mas simplificados para UI.
 */

import type { TarotCard } from '@workspace/core/tarot'

/**
 * Dados básicos de um baralho para listagem
 */
export type DeckListItem = {
	id: string
	name: string
	slug: string
	description: string | null
	tradition: string | null
	publisher: string | null
	year: number | null
	imageUrl: string | null
	_count: {
		cards: number
		tags: number
	}
}

/**
 * Dados completos de um baralho para detalhes
 */
export type DeckDetail = DeckListItem & {
	cards: TarotCard[]
	tags: {
		id: string
		name: string
	}[]
	createdAt: Date
	updatedAt: Date
}

/**
 * Dados para criar um novo baralho
 */
export type CreateDeckInput = {
	name: string
	description?: string
	tradition?: string
	publisher?: string
	year?: number
	imageUrl?: string
}

/**
 * Dados para atualizar um baralho
 */
export type UpdateDeckInput = Partial<CreateDeckInput> & {
	id: string
}
