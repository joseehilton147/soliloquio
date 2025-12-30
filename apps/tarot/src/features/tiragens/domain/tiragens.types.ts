/**
 * Types do domínio de Tiragens
 *
 * Tipos compartilhados entre domain e components da feature tiragens.
 */

import type { TarotSpread } from '@workspace/core/tarot'

import type { ElementColorConfig } from '@/shared/constants/element-colors'

/**
 * Cores elementais para componentes de spread/tiragem
 * Subconjunto de ElementColorConfig usado em visualizações cósmicas
 */
export type SpreadElementColors = Pick<ElementColorConfig, 'rgb' | 'smoke' | 'neonGlow'> & { glow: string }

/**
 * Dados de uma categoria de tiragem
 */
export type TiragemCategoryData = {
	id: string
	name: string
	subtitle: string
	description: string[]
	quote: string
	icon: string
	decorativeIcon: string
	element: 'water' | 'fire' | 'earth' | 'air' | 'spirit'
	color: 'blue' | 'red' | 'amber' | 'slate' | 'purple'
	spreads: TarotSpread[]
	mysticalSymbol: string
}
