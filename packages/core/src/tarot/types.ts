/**
 * Tipos TypeScript para o domínio do Tarot
 * Baseados nos schemas Zod e compatíveis com Prisma
 */

export type { TarotCard, ReadingType, CreateTarotCard, UpdateTarotCard, ReadingTypeValue } from './schemas';

/**
 * Filtros para busca de cartas
 */
export interface TarotCardFilters {
  name?: string;
  numerology?: string;
  astrology?: string;
}

/**
 * Opções de ordenação
 */
export type TarotCardOrderBy = 'name' | 'numerology' | 'createdAt' | 'updatedAt';

export type SortOrder = 'asc' | 'desc';

/**
 * Parâmetros de paginação
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: TarotCardOrderBy;
  order?: SortOrder;
}

/**
 * Resultado paginado
 */
export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
