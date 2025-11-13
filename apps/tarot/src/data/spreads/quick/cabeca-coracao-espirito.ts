/**
 * Cabeça-Coração-Espírito (3 cartas)
 *
 * Layout: Triângulo (Cabeça no topo, Coração e Espírito na base)
 * Propósito: Integrar três perspectivas diferentes para decisões complexas
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const CABECA_CORACAO_ESPIRITO: TarotSpread = {
	id: 'cabeca-coracao-espirito',
	name: 'Cabeça-Coração-Espírito',
	slug: 'cabeca-coracao-espirito',
	cardCount: 3,
	category: 'quick',
	layout: 'triangle',
	description: 'Como Os Três Pássaros mensageiros, esta tiragem traz três vozes diferentes: a lógica, a emocional e a espiritual. Perfeita quando mente e coração estão em conflito.',
	whenToUse: 'Quando enfrenta decisões onde lógica e sentimento divergem, ou quando precisa incluir a perspectiva espiritual.',
	source: 'Tradicional - Adaptado',
	difficulty: 2,
	estimatedTime: 15,
	themeColor: '#64748B',
	icon: 'lucide:brain-circuit',
	tags: ['rápida', 'decisão', 'integração', 'perspectivas'],
	positions: [
		{
			id: 'cabeca',
			order: 1,
			label: 'Cabeça',
			description: 'O que sua mente lógica está dizendo. Razão, análise, pensamento crítico. O Ar que corta através da confusão.',
			x: 50,
			y: 20,
			rotation: 0,
			emphasis: 'top',
			connectedTo: ['coracao', 'espirito'],
		},
		{
			id: 'coracao',
			order: 2,
			label: 'Coração',
			description: 'O que seu coração está sentindo. Emoções, desejos, paixões. A Água que flui sob a superfície.',
			x: 30,
			y: 70,
			rotation: 0,
			connectedTo: ['cabeca', 'espirito'],
		},
		{
			id: 'espirito',
			order: 3,
			label: 'Espírito',
			description: 'O que sua alma precisa. Propósito maior, intuição profunda, sabedoria ancestral. O Fogo que ilumina o caminho.',
			x: 70,
			y: 70,
			rotation: 0,
			connectedTo: ['cabeca', 'coracao'],
		},
	],
}
