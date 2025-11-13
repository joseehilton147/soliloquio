/**
 * Raízes e Frutos (5 cartas)
 *
 * Layout: Árvore (raiz, tronco, 3 galhos)
 * Propósito: Entender causas profundas e possíveis resultados futuros
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const RAIZES_E_FRUTOS: TarotSpread = {
	id: 'raizes-e-frutos',
	name: 'Raízes e Frutos',
	slug: 'raizes-e-frutos',
	cardCount: 5,
	category: 'decision',
	layout: 'tree',
	description: 'Como A Árvore do baralho cigano que representa crescimento e vida, esta tiragem mostra raízes (causas), tronco (presente) e frutos (possibilidades).',
	whenToUse: 'Quando quer entender as causas profundas de uma situação e explorar diferentes possibilidades futuras.',
	source: 'Baseado em sabedoria ancestral',
	difficulty: 3,
	estimatedTime: 25,
	themeColor: '#10B981',
	icon: 'lucide:tree-deciduous',
	tags: ['crescimento', 'causas', 'possibilidades', 'terra', 'natureza'],
	positions: [
		{
			id: 'raiz',
			order: 1,
			label: 'Raiz (Causa)',
			description: 'A causa profunda, a origem da situação. O que está enterrado sob a terra, alimentando tudo.',
			x: 50,
			y: 80,
			rotation: 0,
			emphasis: 'bottom',
		},
		{
			id: 'tronco',
			order: 2,
			label: 'Tronco (Presente)',
			description: 'Sua situação atual. O momento presente que cresce da raiz e sustenta os galhos.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
			connectedTo: ['raiz', 'fruto1', 'fruto2', 'fruto3'],
		},
		{
			id: 'fruto1',
			order: 3,
			label: 'Fruto 1 (Caminho A)',
			description: 'Primeira possibilidade futura. Um fruto que pode nascer se seguir este caminho.',
			x: 20,
			y: 20,
			rotation: 0,
		},
		{
			id: 'fruto2',
			order: 4,
			label: 'Fruto 2 (Caminho B)',
			description: 'Segunda possibilidade futura. Outro fruto que pode nascer com escolhas diferentes.',
			x: 50,
			y: 10,
			rotation: 0,
			emphasis: 'top',
		},
		{
			id: 'fruto3',
			order: 5,
			label: 'Fruto 3 (Caminho C)',
			description: 'Terceira possibilidade futura. Um terceiro fruto mostrando alternativa inesperada.',
			x: 80,
			y: 20,
			rotation: 0,
		},
	],
}
