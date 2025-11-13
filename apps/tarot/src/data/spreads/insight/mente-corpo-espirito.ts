/**
 * Mente, Corpo e Espírito (3 cartas)
 *
 * Layout: Triângulo vertical
 * Propósito: Integração dos três aspectos do ser
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const MENTE_CORPO_ESPIRITO: TarotSpread = {
	id: 'mente-corpo-espirito',
	name: 'Mente, Corpo e Espírito',
	slug: 'mente-corpo-espirito',
	cardCount: 3,
	category: 'insight',
	layout: 'triangle',
	description: 'Uma tiragem holística que examina os três aspectos fundamentais do seu ser e como estão interagindo.',
	whenToUse: 'Para check-ins de bem-estar integral ou quando sentir desalinhamento entre pensamento, corpo e alma.',
	source: 'Stefani Caponi',
	difficulty: 2,
	estimatedTime: 20,
	themeColor: '#14B8A6',
	icon: 'lucide:heart-handshake',
	tags: ['holístico', 'bem-estar', 'integração', 'equilíbrio'],
	positions: [
		{
			id: 'mente',
			order: 1,
			label: 'Mente',
			description: 'Seus padrões mentais, crenças e pensamentos predominantes. O que sua mente está processando.',
			x: 50,
			y: 20,
			rotation: 0,
			emphasis: 'top',
			connectedTo: ['corpo', 'espirito'],
		},
		{
			id: 'corpo',
			order: 2,
			label: 'Corpo',
			description: 'Seu estado físico, necessidades corporais e como seu corpo está respondendo à vida.',
			x: 30,
			y: 70,
			rotation: 0,
			connectedTo: ['mente', 'espirito'],
		},
		{
			id: 'espirito',
			order: 3,
			label: 'Espírito',
			description: 'Sua essência espiritual, conexão com o divino e propósito maior. A voz da alma.',
			x: 70,
			y: 70,
			rotation: 0,
			connectedTo: ['mente', 'corpo'],
		},
	],
}
