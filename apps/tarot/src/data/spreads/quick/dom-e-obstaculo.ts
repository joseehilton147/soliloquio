/**
 * Dom e Obstáculo (2 cartas)
 *
 * Layout: Duas cartas lado a lado
 * Propósito: Reconhecer seus dons naturais e os desafios a superar
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const DOM_E_OBSTACULO: TarotSpread = {
	id: 'dom-e-obstaculo',
	name: 'Dom e Obstáculo',
	slug: 'dom-e-obstaculo',
	cardCount: 2,
	category: 'quick',
	layout: 'linear',
	description: 'Revela seus dons inatos e os obstáculos que estão impedindo você de manifestá-los plenamente.',
	whenToUse: 'Quando precisar reconectar com suas habilidades naturais ou entender bloqueios que está enfrentando.',
	source: 'Stefani Caponi',
	difficulty: 1,
	estimatedTime: 10,
	themeColor: '#10B981',
	icon: 'lucide:shield-check',
	tags: ['rápida', 'autoconhecimento', 'obstáculos', 'dons'],
	positions: [
		{
			id: 'dom',
			order: 1,
			label: 'Dom',
			description: 'Seu dom natural, talento ou força interior. A luz que você carrega e que pode iluminar seu caminho.',
			x: 35,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
		{
			id: 'obstaculo',
			order: 2,
			label: 'Obstáculo',
			description: 'O desafio ou bloqueio que está impedindo a manifestação plena do seu dom. O que precisa ser transmutado.',
			x: 65,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
	],
}
