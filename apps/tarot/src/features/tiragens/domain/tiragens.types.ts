/**
 * Types do domínio de Tiragens
 *
 * Tipos compartilhados entre domain e components da feature tiragens.
 */

import type { TarotSpread } from '@workspace/core/tarot'

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
