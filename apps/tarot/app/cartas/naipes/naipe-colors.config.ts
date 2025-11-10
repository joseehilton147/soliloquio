/**
 * Configuração Centralizada de Cores dos Naipes
 *
 * Este arquivo é a ÚNICA fonte de verdade para cores dos 4 elementos.
 * Todos os componentes devem consumir daqui para garantir consistência.
 *
 * Elementos e suas cores:
 * - Água (Copas): Azul/Cyan - Emoções
 * - Fogo (Paus): Vermelho/Laranja - Ação
 * - Terra (Ouros): Marrom/Terracota - Materialidade
 * - Ar (Espadas): Cinza/Prata - Intelecto
 */

export interface NaipeColorConfig {
	readonly name: string
	readonly key: 'blue' | 'red' | 'terra' | 'slate'
	readonly tailwindBase: string
	readonly tailwindSecondary: string
	readonly tailwindTertiary: string
	readonly icon: string
	readonly bg: string
	readonly text: string
	readonly gradient: string
	readonly gradientDark: string
	readonly border: string
	readonly shadow: string
	readonly bgGradient: string
}

/**
 * Configuração de cores por elemento
 * Use sempre essas definições em todo o sistema
 */
export const NAIPE_COLORS: Record<'agua' | 'fogo' | 'terra' | 'ar', NaipeColorConfig> = {
	agua: {
		name: 'Copas',
		key: 'blue',
		tailwindBase: 'blue',
		tailwindSecondary: 'cyan',
		tailwindTertiary: 'sky',
		icon: 'text-blue-600 dark:text-blue-400',
		bg: 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20',
		text: 'text-blue-600/80 dark:text-blue-400/80',
		gradient: 'from-blue-600 to-cyan-600',
		gradientDark: 'dark:from-blue-400 dark:to-cyan-400',
		border: 'border-blue-500/30',
		shadow: 'hover:shadow-blue-500/20',
		bgGradient: 'from-blue-500/10 via-cyan-500/10 to-sky-500/10',
	},
	fogo: {
		name: 'Paus',
		key: 'red',
		tailwindBase: 'red',
		tailwindSecondary: 'orange',
		tailwindTertiary: 'rose',
		icon: 'text-red-600 dark:text-red-400',
		bg: 'bg-gradient-to-br from-red-600/20 to-orange-600/20',
		text: 'text-red-600/80 dark:text-red-400/80',
		gradient: 'from-red-600 to-orange-600',
		gradientDark: 'dark:from-red-400 dark:to-orange-400',
		border: 'border-red-500/30',
		shadow: 'hover:shadow-red-500/20',
		bgGradient: 'from-red-500/10 via-orange-500/10 to-rose-500/10',
	},
	terra: {
		name: 'Ouros',
		key: 'terra',
		tailwindBase: 'stone',
		tailwindSecondary: 'amber',
		tailwindTertiary: 'orange',
		icon: 'text-stone-600 dark:text-stone-400',
		bg: 'bg-gradient-to-br from-stone-600/20 to-amber-600/20',
		text: 'text-stone-600/80 dark:text-stone-400/80',
		gradient: 'from-stone-600 to-amber-700',
		gradientDark: 'dark:from-stone-400 dark:to-amber-400',
		border: 'border-stone-500/30',
		shadow: 'hover:shadow-stone-500/20',
		bgGradient: 'from-stone-500/10 via-amber-600/10 to-orange-700/10',
	},
	ar: {
		name: 'Espadas',
		key: 'slate',
		tailwindBase: 'slate',
		tailwindSecondary: 'gray',
		tailwindTertiary: 'zinc',
		icon: 'text-slate-600 dark:text-slate-400',
		bg: 'bg-gradient-to-br from-slate-600/20 to-gray-600/20',
		text: 'text-slate-600/80 dark:text-slate-400/80',
		gradient: 'from-slate-400 to-gray-500',
		gradientDark: 'dark:from-slate-400 dark:to-gray-400',
		border: 'border-slate-400/30',
		shadow: 'hover:shadow-slate-400/20',
		bgGradient: 'from-slate-400/10 via-gray-400/10 to-zinc-400/10',
	},
} as const

/**
 * Helper para obter cores por elemento
 */
export function getNaipeColors(elemento: 'agua' | 'fogo' | 'terra' | 'ar'): NaipeColorConfig {
	return NAIPE_COLORS[elemento]
}

/**
 * Mapeamento legado para retrocompatibilidade com componentes antigos
 * TODO: Migrar todos os componentes para usar NAIPE_COLORS diretamente
 */
export const COLOR_CLASSES = {
	blue: {
		icon: NAIPE_COLORS.agua.icon,
		bg: NAIPE_COLORS.agua.bg,
		text: NAIPE_COLORS.agua.text,
		gradientDark: NAIPE_COLORS.agua.gradientDark,
	},
	red: {
		icon: NAIPE_COLORS.fogo.icon,
		bg: NAIPE_COLORS.fogo.bg,
		text: NAIPE_COLORS.fogo.text,
		gradientDark: NAIPE_COLORS.fogo.gradientDark,
	},
	terra: {
		icon: NAIPE_COLORS.terra.icon,
		bg: NAIPE_COLORS.terra.bg,
		text: NAIPE_COLORS.terra.text,
		gradientDark: NAIPE_COLORS.terra.gradientDark,
	},
	slate: {
		icon: NAIPE_COLORS.ar.icon,
		bg: NAIPE_COLORS.ar.bg,
		text: NAIPE_COLORS.ar.text,
		gradientDark: NAIPE_COLORS.ar.gradientDark,
	},
} as const
