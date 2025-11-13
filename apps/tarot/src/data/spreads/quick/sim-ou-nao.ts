/**
 * Sim ou Não (1 carta)
 *
 * Layout: Uma carta central
 * Propósito: Resposta direta e objetiva para perguntas fechadas
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const SIM_OU_NAO: TarotSpread = {
	id: 'sim-ou-nao',
	name: 'Sim ou Não',
	slug: 'sim-ou-nao',
	cardCount: 1,
	category: 'quick',
	layout: 'single',
	description: 'A tiragem mais direta possível. Como a Flecha do baralho cigano, vai direto ao alvo. Use para perguntas que exigem apenas sim ou não.',
	whenToUse: 'Quando precisar de uma resposta clara e direta para uma pergunta específica. Melhor para decisões simples do dia a dia.',
	source: 'Tradicional',
	difficulty: 1,
	estimatedTime: 5,
	themeColor: '#64748B',
	icon: 'lucide:target',
	tags: ['rápida', 'direta', 'decisão', 'simples'],
	positions: [
		{
			id: 'resposta',
			order: 1,
			label: 'Resposta',
			description: 'A resposta direta do universo. Cartas positivas (Sol, Estrela, Mundo, Ases) = Sim. Cartas desafiadoras (Torre, Diabo, 5 de Copas) = Não. Cartas neutras pedem reformulação da pergunta.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'highlight',
		},
	],
}
