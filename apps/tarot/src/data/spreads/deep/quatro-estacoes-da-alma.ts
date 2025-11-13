/**
 * As 4 Estações da Alma (8 cartas)
 *
 * Layout: Roda dividida em 4 quadrantes
 * Propósito: Compreender ciclos e fases da jornada espiritual
 */

import type { TarotSpread } from '@workspace/core/tarot'

export const QUATRO_ESTACOES_DA_ALMA: TarotSpread = {
	id: 'quatro-estacoes-da-alma',
	name: 'As 4 Estações da Alma',
	slug: 'quatro-estacoes-da-alma',
	cardCount: 8,
	category: 'deep',
	layout: 'wheel',
	description: 'Como A Roda que gira eternamente, esta tiragem mapeia os ciclos da sua alma através das 4 estações. Cada estação tem seu tempo sagrado.',
	whenToUse: 'Para entender ciclos de vida, processar mudanças sazonais da alma, ou planejar o ano espiritual.',
	source: 'Baseado em tradições pagãs e Roda do Ano',
	difficulty: 4,
	estimatedTime: 45,
	themeColor: '#8B5CF6',
	icon: 'lucide:compass',
	tags: ['ciclos', 'estações', 'roda', 'tempo', 'profunda'],
	positions: [
		{
			id: 'centro',
			order: 1,
			label: 'Centro - Essência',
			description: 'O núcleo imutável da sua alma. O que permanece através de todas as estações.',
			x: 50,
			y: 50,
			rotation: 0,
			emphasis: 'center',
		},
		{
			id: 'primavera-novos-comecos',
			order: 2,
			label: 'Primavera - Novos Começos',
			description: 'Primavera da alma. O que está nascendo, brotando, despertando em você agora.',
			x: 75,
			y: 20,
			rotation: 0,
		},
		{
			id: 'primavera-plantio',
			order: 3,
			label: 'Primavera - Plantio',
			description: 'Sementes a plantar. Intenções, sonhos e projetos que você deve iniciar.',
			x: 85,
			y: 35,
			rotation: 0,
		},
		{
			id: 'verao-florescimento',
			order: 4,
			label: 'Verão - Florescimento',
			description: 'Verão da alma. O que está em pleno florescer, expressão máxima da sua energia.',
			x: 75,
			y: 80,
			rotation: 0,
		},
		{
			id: 'verao-celebracao',
			order: 5,
			label: 'Verão - Celebração',
			description: 'Conquistas a celebrar. Alegrias, vitórias e abundância da estação quente.',
			x: 85,
			y: 65,
			rotation: 0,
		},
		{
			id: 'outono-colheita',
			order: 6,
			label: 'Outono - Colheita',
			description: 'Outono da alma. Frutos maduros prontos para colher. O que você plantou e agora recebe.',
			x: 25,
			y: 80,
			rotation: 0,
		},
		{
			id: 'outono-gratidao',
			order: 7,
			label: 'Outono - Gratidão',
			description: 'Agradecer e soltar. Sabedoria adquirida, folhas que caem, ciclos que se completam.',
			x: 15,
			y: 65,
			rotation: 0,
		},
		{
			id: 'inverno-descanso',
			order: 8,
			label: 'Inverno - Descanso Sagrado',
			description: 'Inverno da alma. Recolhimento, descanso, morte simbólica. Preparando o renascimento.',
			x: 25,
			y: 20,
			rotation: 0,
		},
	],
}
