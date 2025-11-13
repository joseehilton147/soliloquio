/**
 * Magia Manifestadora (5 cartas)
 *
 * Layout: Pentagrama (estrela de 5 pontas)
 * Propósito: Manifestar desejos no plano material através da alquimia espiritual
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const MAGIA_MANIFESTADORA: TarotSpread = {
	id: 'magia-manifestadora',
	name: 'Magia Manifestadora',
	slug: 'magia-manifestadora',
	cardCount: 5,
	category: 'decision',
	layout: 'pentagram',
	description: 'Como O Anel do baralho cigano que representa concretização, esta tiragem é um ritual de manifestação. O pentagrama transforma sonho em realidade.',
	whenToUse: 'Quando tem um desejo específico que quer manifestar no mundo físico. Use como ritual de intenção.',
	source: 'Inspirado em práticas de magia natural',
	difficulty: 3,
	estimatedTime: 30,
	themeColor: '#F59E0B',
	icon: 'lucide:sparkles',
	tags: ['manifestação', 'desejo', 'magia', 'terra', 'ritual'],
	positions: [
		{
			id: 'desejo',
			order: 1,
			label: 'O Desejo',
			description: 'O que você verdadeiramente deseja manifestar. Seja específico e claro em sua intenção.',
			x: 50,
			y: 10,
			rotation: 0,
			emphasis: 'top',
		},
		{
			id: 'bloqueios',
			order: 2,
			label: 'Bloqueios',
			description: 'Crenças limitantes, medos ou padrões que impedem a manifestação. O que precisa ser liberado.',
			x: 85,
			y: 35,
			rotation: 0,
		},
		{
			id: 'recursos',
			order: 3,
			label: 'Recursos',
			description: 'Dons, talentos e recursos que você JÁ tem para manifestar esse desejo. Suas ferramentas.',
			x: 70,
			y: 75,
			rotation: 0,
		},
		{
			id: 'acao',
			order: 4,
			label: 'Ação Concreta',
			description: 'O passo prático que você deve dar no mundo físico. Manifestação exige materialização.',
			x: 30,
			y: 75,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'resultado',
			order: 5,
			label: 'Resultado',
			description: 'O fruto que nascerá se você seguir as orientações. A semente plantada hoje, colhida amanhã.',
			x: 15,
			y: 35,
			rotation: 0,
		},
	],
}
