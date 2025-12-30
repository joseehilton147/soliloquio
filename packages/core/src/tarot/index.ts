/**
 * @workspace/core - Tarot Domain
 *
 * Tipos, schemas e validações compartilhadas
 * para o domínio do Tarot
 */

// Schemas e Enums
export {
	CardSuitEnum,
	ReadingTypeEnum,
	readingTypeSchema,
	tarotCardSchema,
	createTarotCardSchema,
	updateTarotCardSchema,
} from './schemas'

// Types dos schemas
export type {
	CardSuitValue,
	ReadingTypeValue,
	ReadingType,
	TarotCard,
	CreateTarotCard,
	UpdateTarotCard,
} from './schemas'

// Types de filtros e paginação
export type {
	TarotCardFilters,
	TarotCardOrderBy,
	SortOrder,
	PaginationParams,
	PaginatedResult,
} from './types'

// Types de spreads (tiragens)
export type {
	SpreadCategory,
	SpreadLayout,
	SpreadPosition,
	TarotSpread,
	CustomSpread,
	SpreadReading,
	SpreadValidation,
	SpreadCanvasConfig,
} from './spread/types'
