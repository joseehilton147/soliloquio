/**
 * Encruzilhadas (6 cartas)
 *
 * Layout: Cruz dupla (caminho atual + 2 opções)
 * Propósito: Explorar profundamente duas escolhas diferentes
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const ENCRUZILHADAS: TarotSpread = {
	id: 'encruzilhadas',
	name: 'Encruzilhadas',
	slug: 'encruzilhadas',
	cardCount: 6,
	category: 'decision',
	layout: 'crossroads',
	description: 'Como A Cruz do Caminho no baralho cigano (#22 - Crossroads), esta tiragem ilumina decisões complexas mostrando seu caminho atual e as duas direções possíveis.',
	whenToUse: 'Quando está em uma encruzilhada importante da vida e precisa entender profundamente cada opção antes de escolher.',
	source: 'Inspirado em Lenormand #22 Crossroads',
	difficulty: 3,
	estimatedTime: 30,
	themeColor: '#F59E0B',
	icon: 'lucide:route',
	tags: ['decisão', 'escolha', 'encruzilhada', 'terra', 'caminho'],
	positions: [
		{
			id: 'situacao-atual',
			order: 1,
			label: 'Situação Atual',
			description: 'Onde você está agora. O ponto de partida antes da encruzilhada.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'center',
			connectedTo: ['opcaoA1', 'opcaoA2', 'opcaoB1', 'opcaoB2'],
		},
		{
			id: 'opcaoA1',
			order: 2,
			label: 'Opção A - Natureza',
			description: 'A essência da primeira opção. O que ela realmente significa para você.',
			x: 15,
			y: 20,
			rotation: 0,
		},
		{
			id: 'opcaoA2',
			order: 3,
			label: 'Opção A - Resultado',
			description: 'Aonde a primeira opção leva. O destino deste caminho.',
			x: 15,
			y: 80,
			rotation: 0,
			emphasis: 'bottom',
		},
		{
			id: 'opcaoB1',
			order: 4,
			label: 'Opção B - Natureza',
			description: 'A essência da segunda opção. O que ela realmente significa para você.',
			x: 85,
			y: 20,
			rotation: 0,
		},
		{
			id: 'opcaoB2',
			order: 5,
			label: 'Opção B - Resultado',
			description: 'Aonde a segunda opção leva. O destino deste caminho.',
			x: 85,
			y: 80,
			rotation: 0,
			emphasis: 'bottom',
		},
		{
			id: 'conselho',
			order: 6,
			label: 'Conselho do Universo',
			description: 'A orientação espiritual para esta decisão. O que você precisa saber para escolher sabiamente.',
			x: 50,
			y: 20,
			rotation: 0,
			emphasis: 'top',
		},
	],
}
