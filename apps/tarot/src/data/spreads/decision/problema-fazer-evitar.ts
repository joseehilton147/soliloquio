/**
 * Problema-Fazer-Evitar (3 cartas)
 *
 * Layout: Triângulo invertido (Problema no topo, ações na base)
 * Propósito: Decisão prática com ações concretas a seguir ou evitar
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const PROBLEMA_FAZER_EVITAR: TarotSpread = {
	id: 'problema-fazer-evitar',
	name: 'Problema-Fazer-Evitar',
	slug: 'problema-fazer-evitar',
	cardCount: 3,
	category: 'decision',
	layout: 'triangle-inverted',
	description: 'Como As Pedras do baralho cigano que mostram obstáculos e caminhos, esta tiragem oferece clareza direta: o problema, o que fazer e o que não fazer.',
	whenToUse: 'Quando enfrenta um problema específico e precisa de orientação prática e direta sobre como agir.',
	source: 'Tradicional',
	difficulty: 2,
	estimatedTime: 15,
	themeColor: '#F59E0B',
	icon: 'lucide:signpost',
	tags: ['decisão', 'prática', 'ação', 'terra'],
	positions: [
		{
			id: 'problema',
			order: 1,
			label: 'O Problema',
			description: 'O cerne da questão. O desafio ou obstáculo que você está enfrentando. A pedra no caminho.',
			x: 50,
			y: 20,
			rotation: 0,
			emphasis: 'top',
		},
		{
			id: 'fazer',
			order: 2,
			label: 'Fazer Isso',
			description: 'Ação recomendada. O que você DEVE fazer, cultivar ou buscar. O caminho da esquerda - ativo e construtivo.',
			x: 30,
			y: 70,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'evitar',
			order: 3,
			label: 'Evitar Isso',
			description: 'Ação a evitar. O que você NÃO deve fazer. O caminho da direita - o que afasta da solução.',
			x: 70,
			y: 70,
			rotation: 0,
		},
	],
}
