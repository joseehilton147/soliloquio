/**
 * Tomando uma Decisão (6 cartas)
 *
 * Layout: Duas colunas (comparação)
 * Propósito: Avaliar duas opções lado a lado
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const TOMANDO_DECISAO: TarotSpread = {
	id: 'tomando-decisao',
	name: 'Tomando uma Decisão',
	slug: 'tomando-decisao',
	cardCount: 6,
	category: 'decision',
	layout: 'custom',
	description: 'Compare duas opções lado a lado, veja consequências de cada caminho e receba orientação para decidir com clareza.',
	whenToUse: 'Quando enfrentar uma escolha importante entre duas opções e precisar ver além da mente racional.',
	source: 'Stefani Caponi',
	difficulty: 3,
	estimatedTime: 30,
	themeColor: '#8B5CF6',
	icon: 'lucide:git-fork',
	tags: ['decisão', 'escolha', 'opções', 'clareza'],
	positions: [
		{
			id: 'situacao',
			order: 1,
			label: 'Situação Atual',
			description: 'O contexto geral. A energia em torno da decisão que você precisa tomar.',
			x: 50,
			y: 15,
			rotation: 0,
			emphasis: 'top',
			connectedTo: ['opcao1-pro', 'opcao2-pro'],
		},
		{
			id: 'opcao1-pro',
			order: 2,
			label: 'Opção 1 - Pró',
			description: 'Os benefícios, vantagens e energias positivas da primeira opção.',
			x: 25,
			y: 40,
			rotation: 0,
		},
		{
			id: 'opcao1-contra',
			order: 3,
			label: 'Opção 1 - Contra',
			description: 'Os desafios, desvantagens ou consequências difíceis da primeira opção.',
			x: 25,
			y: 65,
			rotation: 0,
			connectedTo: ['opcao1-pro'],
		},
		{
			id: 'opcao2-pro',
			order: 4,
			label: 'Opção 2 - Pró',
			description: 'Os benefícios, vantagens e energias positivas da segunda opção.',
			x: 75,
			y: 40,
			rotation: 0,
		},
		{
			id: 'opcao2-contra',
			order: 5,
			label: 'Opção 2 - Contra',
			description: 'Os desafios, desvantagens ou consequências difíceis da segunda opção.',
			x: 75,
			y: 65,
			rotation: 0,
			connectedTo: ['opcao2-pro'],
		},
		{
			id: 'orientacao',
			order: 6,
			label: 'Orientação Final',
			description: 'A sabedoria do universo sobre qual caminho está mais alinhado com seu bem maior.',
			x: 50,
			y: 90,
			rotation: 0,
			emphasis: 'bottom',
			connectedTo: ['opcao1-contra', 'opcao2-contra'],
		},
	],
}
