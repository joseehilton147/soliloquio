/**
 * Sistema de Cores dos 4 Elementos
 *
 * Define paletas de cores consistentes para cada elemento da natureza,
 * permitindo reutilização em todas as páginas de naipes.
 *
 * Elementos:
 * - Água (Copas): Azul/Cyan
 * - Fogo (Paus): Vermelho/Laranja
 * - Terra (Ouros): Marrom/Terracota
 * - Ar (Espadas): Cinza/Prata
 */

export interface ElementColorScheme {
	readonly name: string
	readonly element: string
	readonly primary: string
	readonly secondary: string
	readonly tertiary: string
	readonly border: string
	readonly nebula: string
	readonly circles: readonly string[]
	readonly energy1: string
	readonly energy2: string
	readonly particles: string
	readonly symbols: readonly string[]
	readonly triangle: string
	readonly iconBg: string
	readonly iconBorder: string
	readonly iconColor: string
	readonly gradient: string
	readonly subtitle: string
	readonly text: string
	readonly description: string
	readonly divider: string
	readonly dividerIcon: string
	readonly breadcrumbSeparator: string
	readonly breadcrumbHover: string
	readonly cardHover: string
	readonly cardBg: string
}

export const ELEMENT_COLORS = {
	agua: {
		name: 'Copas',
		element: 'Água',
		primary: 'blue',
		secondary: 'cyan',
		tertiary: 'sky',
		border: 'border-blue-500/30',
		nebula: 'from-blue-900/20 via-blue-950/10',
		circles: [
			'border-blue-500/5',
			'border-cyan-500/10',
			'border-blue-500/15',
			'border-cyan-500/20',
			'border-blue-500/25',
		],
		energy1: 'from-blue-600/10 via-cyan-600/5',
		energy2: 'from-cyan-600/10 via-blue-600/5',
		particles: 'bg-blue-400/40',
		symbols: ['text-blue-500', 'text-cyan-500', 'text-sky-500', 'text-blue-500'],
		triangle: 'text-blue-500/20',
		iconBg: 'from-blue-500/10 to-cyan-500/10',
		iconBorder: 'border-blue-500/20',
		iconColor: 'text-blue-600 dark:text-blue-400',
		gradient: 'from-blue-600 to-cyan-600',
		subtitle: 'text-blue-400/70',
		text: 'text-blue-200/90',
		description: 'text-blue-200/80',
		divider: 'via-blue-500/30',
		dividerIcon: 'text-blue-400/50',
		breadcrumbSeparator: 'text-blue-500/50',
		breadcrumbHover: 'hover:text-blue-600 dark:hover:text-blue-400',
		cardHover: 'hover:shadow-blue-500/20 hover:border-blue-500/30',
		cardBg: 'from-blue-500/10 via-cyan-500/10 to-sky-500/10',
	},
	fogo: {
		name: 'Paus',
		element: 'Fogo',
		primary: 'red',
		secondary: 'orange',
		tertiary: 'rose',
		border: 'border-red-500/30',
		nebula: 'from-red-900/20 via-red-950/10',
		circles: [
			'border-red-500/5',
			'border-orange-500/10',
			'border-red-500/15',
			'border-orange-500/20',
			'border-red-500/25',
		],
		energy1: 'from-red-600/10 via-orange-600/5',
		energy2: 'from-orange-600/10 via-red-600/5',
		particles: 'bg-red-400/40',
		symbols: ['text-red-500', 'text-orange-500', 'text-rose-500', 'text-red-500'],
		triangle: 'text-red-500/20',
		iconBg: 'from-red-500/10 to-orange-500/10',
		iconBorder: 'border-red-500/20',
		iconColor: 'text-red-600 dark:text-red-400',
		gradient: 'from-red-600 to-orange-600',
		subtitle: 'text-red-400/70',
		text: 'text-red-200/90',
		description: 'text-red-200/80',
		divider: 'via-red-500/30',
		dividerIcon: 'text-red-400/50',
		breadcrumbSeparator: 'text-red-500/50',
		breadcrumbHover: 'hover:text-red-600 dark:hover:text-red-400',
		cardHover: 'hover:shadow-red-500/20 hover:border-red-500/30',
		cardBg: 'from-red-500/10 via-orange-500/10 to-rose-500/10',
	},
	terra: {
		name: 'Ouros',
		element: 'Terra',
		primary: 'stone',
		secondary: 'amber',
		tertiary: 'orange',
		border: 'border-stone-500/30',
		nebula: 'from-stone-900/20 via-stone-950/10',
		circles: [
			'border-stone-500/5',
			'border-amber-500/10',
			'border-stone-500/15',
			'border-amber-500/20',
			'border-stone-500/25',
		],
		energy1: 'from-stone-600/10 via-amber-600/5',
		energy2: 'from-amber-600/10 via-stone-600/5',
		particles: 'bg-stone-400/40',
		symbols: ['text-stone-500', 'text-amber-500', 'text-orange-500', 'text-stone-500'],
		triangle: 'text-stone-500/20',
		iconBg: 'from-stone-500/10 to-amber-600/10',
		iconBorder: 'border-stone-500/20',
		iconColor: 'text-stone-600 dark:text-stone-400',
		gradient: 'from-stone-600 to-amber-700',
		subtitle: 'text-stone-400/70',
		text: 'text-stone-200/90',
		description: 'text-stone-200/80',
		divider: 'via-stone-500/30',
		dividerIcon: 'text-stone-400/50',
		breadcrumbSeparator: 'text-stone-500/50',
		breadcrumbHover: 'hover:text-stone-600 dark:hover:text-stone-400',
		cardHover: 'hover:shadow-stone-500/20 hover:border-stone-500/30',
		cardBg: 'from-stone-500/10 via-amber-600/10 to-orange-700/10',
	},
	ar: {
		name: 'Espadas',
		element: 'Ar',
		primary: 'slate',
		secondary: 'gray',
		tertiary: 'zinc',
		border: 'border-slate-400/30',
		nebula: 'from-slate-900/20 via-slate-950/10',
		circles: [
			'border-slate-400/5',
			'border-gray-400/10',
			'border-slate-400/15',
			'border-gray-400/20',
			'border-slate-400/25',
		],
		energy1: 'from-slate-400/10 via-gray-400/5',
		energy2: 'from-gray-400/10 via-slate-400/5',
		particles: 'bg-slate-400/40',
		symbols: ['text-slate-400', 'text-gray-400', 'text-zinc-400', 'text-slate-400'],
		triangle: 'text-slate-400/20',
		iconBg: 'from-slate-400/10 to-gray-400/10',
		iconBorder: 'border-slate-400/20',
		iconColor: 'text-slate-600 dark:text-slate-400',
		gradient: 'from-slate-400 to-gray-500',
		subtitle: 'text-slate-400/70',
		text: 'text-slate-200/90',
		description: 'text-slate-200/80',
		divider: 'via-slate-400/30',
		dividerIcon: 'text-slate-400/50',
		breadcrumbSeparator: 'text-slate-400/50',
		breadcrumbHover: 'hover:text-slate-600 dark:hover:text-slate-400',
		cardHover: 'hover:shadow-slate-400/20 hover:border-slate-400/30',
		cardBg: 'from-slate-400/10 via-gray-400/10 to-zinc-400/10',
	},
} as const

export type ElementType = keyof typeof ELEMENT_COLORS
