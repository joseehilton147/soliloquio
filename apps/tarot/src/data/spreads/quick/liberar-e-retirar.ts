/**
 * Liberar e Retirar (2 cartas)
 *
 * Layout: Duas cartas lado a lado
 * Propósito: Identificar o que soltar e o que buscar
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const LIBERAR_E_RETIRAR: TarotSpread = {
	id: 'liberar-e-retirar',
	name: 'Liberar e Retirar',
	slug: 'liberar-e-retirar',
	cardCount: 2,
	category: 'quick',
	layout: 'linear',
	description: 'Uma tiragem simples porém poderosa para identificar padrões que precisam ser liberados e energias que devem ser cultivadas.',
	whenToUse: 'Quando sentir que está preso em padrões antigos ou precisa de clareza sobre mudanças necessárias.',
	source: 'Stefani Caponi',
	difficulty: 1,
	estimatedTime: 10,
	themeColor: '#8B5CF6',
	icon: 'lucide:scale',
	tags: ['rápida', 'mudança', 'transformação', 'simples'],
	positions: [
		{
			id: 'liberar',
			order: 1,
			label: 'Liberar',
			description: 'O que você precisa soltar, liberar ou deixar ir. Padrões, crenças ou comportamentos que não servem mais ao seu crescimento.',
			x: 35,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'retirar',
			order: 2,
			label: 'Retirar',
			description: 'O que você precisa buscar, cultivar ou trazer para sua vida. Novas energias, hábitos ou perspectivas que apoiam sua jornada.',
			x: 65,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
	],
}
