/**
 * Barrel export para domínio de naipes
 *
 * Exporta dados, tipos e configurações relacionadas aos 4 naipes do Tarô.
 * Camada de domínio pura, sem dependências de UI.
 */

// Re-exporta ELEMENT_COLORS do arquivo centralizado com mapeamento de naipes
import { getNaipeColors } from '@/shared/constants/element-colors'

export * from './naipes.data'
export type * from './naipes.types'

/**
 * Configuração de cores dos elementos para páginas de naipes
 * Usa o sistema centralizado de element-colors
 */
export const ELEMENT_COLORS = {
	agua: getNaipeColors('agua'),
	fogo: getNaipeColors('fogo'),
	terra: getNaipeColors('terra'),
	ar: getNaipeColors('ar'),
} as const
