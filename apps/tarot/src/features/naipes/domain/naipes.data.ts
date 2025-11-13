import type { Naipe } from './naipes.types'
import { ELEMENT_COLORS } from '../../../src/config/element-colors'

/**
 * Dados dos 4 naipes do Tarô com suas propriedades elementais e simbólicas
 *
 * Cada naipe representa um elemento da alquimia/esoterismo:
 * - Copas (Água): Azul - Emoções e sentimentos
 * - Paus (Fogo): Vermelho - Ação e energia vital
 * - Ouros (Terra): Âmbar/Dourado - Material e estabilidade
 * - Espadas (Ar): Cinza azulado claro - Intelecto e pensamento
 *
 * As cores refletem a essência visual de cada elemento natural.
 * Cores unificadas com o sistema de tiragens através de element-colors.ts
 */
export const NAIPES: readonly Naipe[] = [
	{
		name: 'Copas',
		symbol: '♥',
		element: 'Água',
		elementIcon: 'mdi:water',
		color: 'blue',
		gradient: 'from-blue-600 to-cyan-600',
		bgGradient: 'from-blue-500/10 via-cyan-500/10 to-sky-500/10',
		borderColor: 'border-blue-500/30',
		shadowColor: 'hover:shadow-blue-500/20',
		description: 'O naipe das emoções, sentimentos, amor e intuição',
		zodiac: 'Câncer, Escorpião, Peixes',
		theme: 'Emoções, relacionamentos, amor, intuição, sentimentos profundos',
		href: '/cartas/naipes/copas'
	},
	{
		name: 'Paus',
		symbol: '♣',
		element: 'Fogo',
		elementIcon: 'mdi:fire',
		color: 'red',
		gradient: 'from-red-600 to-orange-600',
		bgGradient: 'from-red-500/10 via-orange-500/10 to-rose-500/10',
		borderColor: 'border-red-500/30',
		shadowColor: 'hover:shadow-red-500/20',
		description: 'O naipe da ação, paixão, criatividade e energia vital',
		zodiac: 'Áries, Leão, Sagitário',
		theme: 'Ação, paixão, criatividade, energia, iniciativa, força vital',
		href: '/cartas/naipes/paus'
	},
	{
		name: 'Ouros',
		symbol: '♦',
		element: 'Terra',
		elementIcon: 'mdi:mountain',
		color: 'amber',
		gradient: 'from-amber-600 to-yellow-600',
		bgGradient: 'from-amber-500/10 via-yellow-500/10 to-amber-600/10',
		borderColor: 'border-amber-500/30',
		shadowColor: 'hover:shadow-amber-500/20',
		description: 'O naipe do material, dinheiro, trabalho e estabilidade',
		zodiac: 'Touro, Virgem, Capricórnio',
		theme: 'Material, dinheiro, trabalho, estabilidade, prosperidade, segurança',
		href: '/cartas/naipes/ouros'
	},
	{
		name: 'Espadas',
		symbol: '♠',
		element: 'Ar',
		elementIcon: 'mdi:weather-windy',
		color: 'slate',
		gradient: 'from-slate-400 to-gray-500',
		bgGradient: 'from-slate-400/10 via-gray-400/10 to-zinc-400/10',
		borderColor: 'border-slate-400/30',
		shadowColor: 'hover:shadow-slate-400/20',
		description: 'O naipe do intelecto, pensamento, comunicação e desafios',
		zodiac: 'Gêmeos, Libra, Aquário',
		theme: 'Intelecto, pensamento, comunicação, lógica, desafios mentais',
		href: '/cartas/naipes/espadas'
	}
] as const
