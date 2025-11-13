/**
 * Seu Potencial Relacionamento (5 cartas)
 *
 * Layout: Estrela de 5 pontas
 * Propósito: Explorar relacionamento em potencial
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const POTENCIAL_RELACIONAMENTO: TarotSpread = {
	id: 'potencial-relacionamento',
	name: 'Seu Potencial Relacionamento',
	slug: 'potencial-relacionamento',
	cardCount: 5,
	category: 'relationship',
	layout: 'circle',
	description: 'Explore as dinâmicas de um relacionamento que ainda não existe, mas está no horizonte das possibilidades.',
	whenToUse: 'Quando conhecer alguém novo ou sentir atração por alguém e quiser entender o potencial da conexão.',
	source: 'Stefani Caponi',
	difficulty: 3,
	estimatedTime: 25,
	themeColor: '#F43F5E',
	icon: 'lucide:heart',
	tags: ['relacionamento', 'amor', 'potencial', 'conexão'],
	positions: [
		{
			id: 'voce',
			order: 1,
			label: 'Você Nesta Conexão',
			description: 'Como você se mostra ou se mostraria neste relacionamento. Suas energias e expectativas.',
			x: 50,
			y: 15,
			rotation: 0,
			emphasis: 'top',
		},
		{
			id: 'outro',
			order: 2,
			label: 'A Outra Pessoa',
			description: 'Como a outra pessoa se apresenta energeticamente. Suas intenções e estado emocional.',
			x: 85,
			y: 40,
			rotation: 0,
		},
		{
			id: 'conexao',
			order: 3,
			label: 'A Conexão',
			description: 'A química, a energia que existe entre vocês. O que os une ou poderia unir.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'center',
			connectedTo: ['voce', 'outro', 'desafio', 'potencial'],
		},
		{
			id: 'desafio',
			order: 4,
			label: 'Desafio Potencial',
			description: 'Obstáculos, diferenças ou áreas que precisarão de atenção consciente se seguirem adiante.',
			x: 15,
			y: 40,
			rotation: 0,
		},
		{
			id: 'potencial',
			order: 5,
			label: 'Potencial do Relacionamento',
			description: 'Para onde este relacionamento pode evoluir. O fruto que pode nascer desta semente.',
			x: 50,
			y: 85,
			rotation: 0,
			emphasis: 'bottom',
		},
	],
}
