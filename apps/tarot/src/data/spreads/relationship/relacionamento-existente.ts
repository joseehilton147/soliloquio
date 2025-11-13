/**
 * Seu Relacionamento Existente (6 cartas)
 *
 * Layout: Hexágono
 * Propósito: Análise profunda de relacionamento atual
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const RELACIONAMENTO_EXISTENTE: TarotSpread = {
	id: 'relacionamento-existente',
	name: 'Seu Relacionamento Existente',
	slug: 'relacionamento-existente',
	cardCount: 6,
	category: 'relationship',
	layout: 'circle',
	description: 'Uma análise profunda e honesta de um relacionamento já estabelecido, revelando dinâmicas, desafios e potenciais.',
	whenToUse: 'Para check-ins de relacionamentos sérios ou quando precisar de clareza sobre dinâmicas atuais.',
	source: 'Stefani Caponi',
	difficulty: 3,
	estimatedTime: 35,
	themeColor: '#EC4899',
	icon: 'lucide:heart',
	tags: ['relacionamento', 'amor', 'casal', 'dinâmica'],
	positions: [
		{
			id: 'voce',
			order: 1,
			label: 'Você Agora',
			description: 'Seu estado emocional e energético atual dentro do relacionamento.',
			x: 25,
			y: 25,
			rotation: 0,
		},
		{
			id: 'parceiro',
			order: 2,
			label: 'Seu Parceiro(a)',
			description: 'O estado emocional e energético do seu parceiro(a) no momento presente.',
			x: 75,
			y: 25,
			rotation: 0,
		},
		{
			id: 'fundacao',
			order: 3,
			label: 'Fundação',
			description: 'A base do relacionamento. O que os mantém juntos, valores compartilhados.',
			x: 50,
			y: 40,
			rotation: 0,
			emphasis: 'center',
			connectedTo: ['voce', 'parceiro', 'desafio', 'crescimento', 'futuro'],
		},
		{
			id: 'desafio',
			order: 4,
			label: 'Desafio Atual',
			description: 'O obstáculo ou tensão que vocês estão navegando juntos agora.',
			x: 20,
			y: 60,
			rotation: 0,
		},
		{
			id: 'crescimento',
			order: 5,
			label: 'Oportunidade de Crescimento',
			description: 'Como este relacionamento está (ou pode estar) fazendo vocês evoluírem.',
			x: 80,
			y: 60,
			rotation: 0,
		},
		{
			id: 'futuro',
			order: 6,
			label: 'Futuro Juntos',
			description: 'Para onde o relacionamento está caminhando. O potencial de longo prazo.',
			x: 50,
			y: 80,
			rotation: 0,
			emphasis: 'bottom',
		},
	],
}
