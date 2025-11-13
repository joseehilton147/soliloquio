/**
 * Lei de Atração (5 cartas)
 *
 * Layout: Pirâmide invertida
 * Propósito: Manifestar desejos conscientemente
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const LEI_DE_ATRACAO: TarotSpread = {
	id: 'lei-de-atracao',
	name: 'Lei de Atração',
	slug: 'lei-de-atracao',
	cardCount: 5,
	category: 'insight',
	layout: 'custom',
	description: 'Trabalhe com a lei de atração conscientemente: identifique bloqueios, alinhe energias e manifeste seus desejos.',
	whenToUse: 'Quando quiser manifestar algo específico ou entender por que suas manifestações não estão se concretizando.',
	source: 'Stefani Caponi',
	difficulty: 3,
	estimatedTime: 30,
	themeColor: '#F59E0B',
	icon: 'lucide:zap',
	tags: ['manifestação', 'lei de atração', 'desejo', 'abundância'],
	positions: [
		{
			id: 'desejo',
			order: 1,
			label: 'Seu Desejo',
			description: 'O que você realmente deseja manifestar. A essência do seu sonho ou objetivo.',
			x: 50,
			y: 15,
			rotation: 0,
			emphasis: 'top',
			connectedTo: ['bloqueio', 'apoio'],
		},
		{
			id: 'bloqueio',
			order: 2,
			label: 'Bloqueio Energético',
			description: 'Crenças limitantes, medos ou padrões que bloqueiam a manifestação do seu desejo.',
			x: 30,
			y: 40,
			rotation: 0,
		},
		{
			id: 'apoio',
			order: 3,
			label: 'Apoio Universal',
			description: 'Forças, sincronicidades ou recursos que o universo já colocou ao seu redor para ajudar.',
			x: 70,
			y: 40,
			rotation: 0,
		},
		{
			id: 'acao',
			order: 4,
			label: 'Ação Necessária',
			description: 'O que você precisa FAZER no plano físico. Manifestação requer ação alinhada.',
			x: 35,
			y: 70,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'resultado',
			order: 5,
			label: 'Resultado Provável',
			description: 'O desfecho mais provável se você seguir as orientações das cartas anteriores.',
			x: 65,
			y: 70,
			rotation: 0,
			emphasis: 'highlight',
		},
	],
}
