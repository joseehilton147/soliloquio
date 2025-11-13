/**
 * Mensagem do Vento (3 cartas)
 *
 * Layout: Linha horizontal (fluxo temporal)
 * Propósito: Entender o movimento e fluxo de energias em sua vida
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const MENSAGEM_DO_VENTO: TarotSpread = {
	id: 'mensagem-do-vento',
	name: 'Mensagem do Vento',
	slug: 'mensagem-do-vento',
	cardCount: 3,
	category: 'quick',
	layout: 'linear',
	description: 'Como As Nuvens que se movem pelo céu, esta tiragem revela o que está chegando, o que permanece e o que está partindo de sua vida.',
	whenToUse: 'Para entender ciclos de mudança, quando sentir que algo está em movimento mas não sabe exatamente o quê.',
	source: 'Inspirado em tradições xamânicas',
	difficulty: 2,
	estimatedTime: 15,
	themeColor: '#94A3B8',
	icon: 'lucide:wind',
	tags: ['rápida', 'mudança', 'ciclos', 'transição'],
	positions: [
		{
			id: 'chega',
			order: 1,
			label: 'O que Chega',
			description: 'Energias, pessoas ou situações que estão entrando em sua vida. O vento que sopra trazendo o novo.',
			x: 20,
			y: 50,
			rotation: 0,
			emphasis: 'left',
		},
		{
			id: 'permanece',
			order: 2,
			label: 'O que Permanece',
			description: 'Aquilo que é estável e duradouro. A rocha que não se move mesmo com o vento. Sua fundação.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'parte',
			order: 3,
			label: 'O que Parte',
			description: 'O que está deixando sua vida, completando um ciclo. O vento que sopra levando o antigo.',
			x: 80,
			y: 50,
			rotation: 0,
			emphasis: 'right',
		},
	],
}
