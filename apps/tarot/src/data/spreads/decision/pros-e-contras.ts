/**
 * Prós e Contras (4 cartas)
 *
 * Layout: 2x2 (Opção A e B, cada com Prós e Contras)
 * Propósito: Avaliar duas opções diferentes de forma equilibrada
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const PROS_E_CONTRAS: TarotSpread = {
	id: 'pros-e-contras',
	name: 'Prós e Contras',
	slug: 'pros-e-contras',
	cardCount: 4,
	category: 'decision',
	layout: 'grid',
	description: 'Como A Balança do baralho cigano que pesa os dois lados, esta tiragem ajuda a ver benefícios e desafios de cada opção com clareza.',
	whenToUse: 'Quando está entre duas escolhas e precisa ver os dois lados de forma equilibrada e prática.',
	source: 'Tradicional',
	difficulty: 2,
	estimatedTime: 20,
	themeColor: '#F59E0B',
	icon: 'lucide:scale',
	tags: ['decisão', 'escolha', 'equilíbrio', 'terra', 'prático'],
	positions: [
		{
			id: 'opcaoA-pro',
			order: 1,
			label: 'Opção A - Benefício',
			description: 'O lado positivo da primeira opção. O que você ganha se escolher este caminho.',
			x: 25,
			y: 30,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'opcaoA-contra',
			order: 2,
			label: 'Opção A - Desafio',
			description: 'O lado desafiador da primeira opção. O que você pode perder ou enfrentar.',
			x: 25,
			y: 70,
			rotation: 0,
		},
		{
			id: 'opcaoB-pro',
			order: 3,
			label: 'Opção B - Benefício',
			description: 'O lado positivo da segunda opção. O que você ganha se escolher este caminho.',
			x: 75,
			y: 30,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'opcaoB-contra',
			order: 4,
			label: 'Opção B - Desafio',
			description: 'O lado desafiador da segunda opção. O que você pode perder ou enfrentar.',
			x: 75,
			y: 70,
			rotation: 0,
		},
	],
}
