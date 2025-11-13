/**
 * Passado, Presente e Futuro (3 cartas)
 *
 * Layout: Linha horizontal (clássico)
 * Propósito: Linha do tempo energética
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const PASSADO_PRESENTE_FUTURO: TarotSpread = {
	id: 'passado-presente-futuro',
	name: 'Passado, Presente e Futuro',
	slug: 'passado-presente-futuro',
	cardCount: 3,
	category: 'insight',
	layout: 'linear',
	description: 'A tiragem clássica que revela a linha do tempo energética: de onde você vem, onde está e para onde vai.',
	whenToUse: 'Para entender a progressão de uma situação ou ver o fluxo temporal de eventos e energias.',
	source: 'Tradicional',
	difficulty: 1,
	estimatedTime: 15,
	themeColor: '#EC4899',
	icon: 'lucide:clock',
	tags: ['clássica', 'tempo', 'linha temporal', 'tradicional'],
	positions: [
		{
			id: 'passado',
			order: 1,
			label: 'Passado',
			description: 'Influências passadas, lições aprendidas ou energias que ainda ecoam no presente.',
			x: 20,
			y: 50,
			rotation: 0,
			connectedTo: ['presente'],
		},
		{
			id: 'presente',
			order: 2,
			label: 'Presente',
			description: 'A energia atual, o momento agora. O que está vivo e pulsando em sua realidade presente.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'center',
			connectedTo: ['passado', 'futuro'],
		},
		{
			id: 'futuro',
			order: 3,
			label: 'Futuro',
			description: 'O potencial que se desenha, a direção para onde a energia está fluindo. Tendências futuras.',
			x: 80,
			y: 50,
			rotation: 0,
			connectedTo: ['presente'],
		},
	],
}
