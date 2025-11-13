/**
 * Trabalho de Sombra (7 cartas)
 *
 * Layout: Espelho dividido (Luz e Sombra)
 * Propósito: Integrar aspectos inconscientes e ocultos da personalidade
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const TRABALHO_DE_SOMBRA: TarotSpread = {
	id: 'trabalho-de-sombra',
	name: 'Trabalho de Sombra',
	slug: 'trabalho-de-sombra',
	cardCount: 7,
	category: 'deep',
	layout: 'mirror',
	description: 'Como O Espelho da bruxa que reflete verdades ocultas, esta tiragem trabalha com o conceito jungiano de Sombra, revelando e integrando aspectos negados de si mesmo.',
	whenToUse: 'Quando pronto para encarar partes de si que nega ou rejeita. Trabalho profundo de autoconhecimento e cura.',
	source: 'Carl Jung - Adaptado para Tarot',
	difficulty: 5,
	estimatedTime: 50,
	themeColor: '#6B21A8',
	icon: 'lucide:moon',
	tags: ['sombra', 'jung', 'psicologia', 'profunda', 'integração'],
	positions: [
		{
			id: 'luz-consciente',
			order: 1,
			label: 'Luz - Persona',
			description: 'Quem você pensa que é. A máscara que mostra ao mundo, o eu consciente.',
			x: 25,
			y: 20,
			rotation: 0,
		},
		{
			id: 'luz-dons',
			order: 2,
			label: 'Luz - Dons Reconhecidos',
			description: 'Talentos e virtudes que você já aceita e cultiva em si.',
			x: 25,
			y: 40,
			rotation: 0,
		},
		{
			id: 'luz-valores',
			order: 3,
			label: 'Luz - Valores Conscientes',
			description: 'O que você defende, acredita e valoriza conscientemente.',
			x: 25,
			y: 60,
			rotation: 0,
		},
		{
			id: 'sombra-negada',
			order: 4,
			label: 'Sombra - Eu Negado',
			description: 'Aspectos de si mesmo que nega, rejeita ou não reconhece. A sombra inconsciente.',
			x: 75,
			y: 20,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'sombra-dons-ocultos',
			order: 5,
			label: 'Sombra - Dons Ocultos',
			description: 'Talentos e forças que você tem mas não reconhece. Poder escondido na sombra.',
			x: 75,
			y: 40,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'sombra-medo',
			order: 6,
			label: 'Sombra - Medo Projetado',
			description: 'O que você teme em si e projeta nos outros. A sombra que vê fora.',
			x: 75,
			y: 60,
			rotation: 0,
		},
		{
			id: 'integracao',
			order: 7,
			label: 'Integração - Eu Completo',
			description: 'Como unir luz e sombra. O caminho para se tornar inteiro, aceitando todas as partes.',
			x: 50,
			y: 85,
			rotation: 0,
			emphasis: 'bottom',
		},
	],
}
