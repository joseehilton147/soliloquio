/**
 * Tiragem Sim ou Não (1 carta)
 *
 * A tiragem mais simples e direta do tarot para respostas rápidas.
 * Use quando precisar de uma orientação clara sobre uma pergunta específica.
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const SIM_OU_NAO: TarotSpread = {
	id: 'sim-ou-nao',
	name: 'Sim ou Não',
	slug: 'sim-ou-nao',
	cardCount: 1,
	category: 'quick',
	layout: 'single',
	description: 'Tire uma única carta para obter uma resposta direta. Ideal para decisões simples do dia a dia que precisam de orientação rápida.',
	whenToUse: 'Use quando tiver uma pergunta específica que possa ser respondida com sim ou não. Evite perguntas muito complexas ou abertas.',
	themeColor: '#64748B',
	icon: 'lucide:target',
	positions: [
		{
			id: 'resposta',
			order: 1,
			label: 'Resposta da Carta',
			description: 'A carta revelada traz a orientação do universo para sua pergunta. Consulte o guia abaixo para interpretar se a resposta é sim, não, ou se você deve reformular sua pergunta.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
	],
}
