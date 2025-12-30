/**
 * Tipos TypeScript para o domínio do Tarot
 * Tipos complementares não gerados pelos schemas Zod
 */

/**
 * Filtros para busca de cartas
 */
export type TarotCardFilters = {
	name?: string;
	numerology?: string;
	astrology?: string;
}

/**
 * Opções de ordenação
 */
export type TarotCardOrderBy = 'name' | 'numerology' | 'createdAt' | 'updatedAt'

export type SortOrder = 'asc' | 'desc'

/**
 * Parâmetros de paginação
 */
export type PaginationParams = {
	page?: number;
	limit?: number;
	orderBy?: TarotCardOrderBy;
	order?: SortOrder;
}

/**
 * Resultado paginado
 */
export type PaginatedResult<T> = {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}
