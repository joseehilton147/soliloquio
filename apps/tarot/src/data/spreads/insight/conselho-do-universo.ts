/**
 * Conselho do Universo (3 cartas)
 *
 * Layout: Triângulo (1 em cima, 2 embaixo)
 * Propósito: Mensagem direta do universo
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const CONSELHO_DO_UNIVERSO: TarotSpread = {
	id: 'conselho-do-universo',
	name: 'Conselho do Universo',
	slug: 'conselho-do-universo',
	cardCount: 3,
	category: 'insight',
	layout: 'triangle',
	description: 'Uma mensagem cósmica de três camadas: onde focar, que ação tomar e a sabedoria central que integra tudo.',
	whenToUse: 'Quando buscar orientação direta do universo sobre situações complexas ou decisões importantes.',
	themeColor: '#6366F1',
	icon: 'lucide:sparkles',
	positions: [
		{
			id: 'foco',
			order: 1,
			label: 'Onde Focar',
			description: 'No que você deve direcionar sua atenção e energia agora. O foco que trará clareza.',
			x: 25,
			y: 60,
			rotation: 0,
		},
		{
			id: 'acao',
			order: 2,
			label: 'Ação a Tomar',
			description: 'A ação concreta e prática que você deve tomar. O passo que transformará intenção em manifestação.',
			x: 75,
			y: 60,
			rotation: 0,
		},
		{
			id: 'conselho',
			order: 3,
			label: 'Conselho do Universo',
			description: 'A mensagem central. A sabedoria cósmica que integra foco e ação, iluminando seu caminho.',
			x: 50,
			y: 30,
			rotation: 0,
			emphasis: 'center',
			connectedTo: ['foco', 'acao'],
		},
	],
}
