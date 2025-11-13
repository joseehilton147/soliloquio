/**
 * Sistema Centralizado de Cores Elementais com Suporte a Temas
 *
 * @module ElementColors
 * @description Mapeia elementos (Água, Fogo, Terra, Ar, Espírito) para cores temáticas.
 * Preparado para sistema de temas customizáveis onde usuário escolhe tema
 * nas configurações e aplica em toda aplicação.
 *
 * Elementos:
 * - Água (agua): Emoção, Intuição, Fluxo → Copas no Tarot
 * - Fogo (fogo): Paixão, Energia, Transformação → Paus no Tarot
 * - Terra (terra): Manifestação, Estabilidade → Ouros no Tarot
 * - Ar (ar): Intelecto, Pensamento, Clareza → Espadas no Tarot
 * - Espírito (espirito): Transcendência, Totalidade, Sabedoria → Quintessência
 *
 * @example
 * ```tsx
 * import { getElementColors, type ElementalTheme } from '@/shared/constants/element-colors'
 *
 * const theme: ElementalTheme = 'mystical' // do contexto de tema
 * const waterColors = getElementColors('agua', theme)
 * ```
 */

// ═══════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════

export type Element = 'agua' | 'fogo' | 'terra' | 'ar' | 'espirito'

export type ElementalTheme = 'mystical' | 'classic' | 'nature' | 'cosmic'

/**
 * Configuração completa de cores de um elemento
 */
export interface ElementColorConfig {
	/** Nome do elemento em português */
	readonly name: string
	/** Nome do naipe correspondente (se houver) */
	readonly naipe?: string
	/** Cor principal (nome Tailwind) */
	readonly color: string
	/** Cor secundária */
	readonly secondary: string
	/** Cor terciária */
	readonly tertiary: string
	/** Classes Tailwind para gradiente */
	readonly gradient: string
	/** Classes Tailwind para gradiente de border */
	readonly borderGradient: string
	/** Classe Tailwind para border com opacidade */
	readonly border: string
	/** Box-shadow neon glow (inline style) */
	readonly neonGlow: string
	/** Classes Tailwind para inner glow gradient */
	readonly innerGlow: string
	/** Classes Tailwind para gradient de texto */
	readonly textGradient: string
	/** Text-shadow / Drop-shadow glow (inline style) */
	readonly textGlow: string
	/** Cor de smoke/névoa (rgba inline style) */
	readonly smoke: string
	/** Background base para hover/glow effects */
	readonly hoverGlow: string
	/** RGB values para uso em rgba() */
	readonly rgb: {
		primary: string // ex: "96, 165, 250" para blue-400
		secondary: string // ex: "59, 130, 246" para blue-500
		light: string // ex: "147, 197, 253" para blue-300
	}
	/** Classes extras para páginas de naipes */
	readonly naipeStyles?: {
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
}

// ═══════════════════════════════════════════════════════
// TEMA: MYSTICAL (Padrão atual do projeto)
// ═══════════════════════════════════════════════════════

const MYSTICAL_THEME: Record<Element, ElementColorConfig> = {
	agua: {
		name: 'Água',
		naipe: 'Copas',
		color: 'blue',
		secondary: 'cyan',
		tertiary: 'sky',
		gradient: 'from-blue-600 to-cyan-600',
		borderGradient: 'from-blue-400 via-cyan-400 to-blue-500',
		border: 'border-blue-400/40',
		neonGlow:
			'0 0 30px rgba(96, 165, 250, 0.4), 0 0 60px rgba(59, 130, 246, 0.2), inset 0 0 30px rgba(96, 165, 250, 0.1)',
		innerGlow: 'from-blue-500/20 via-cyan-500/10',
		textGradient: 'from-blue-400 via-cyan-400 to-blue-500',
		textGlow: '0 0 20px rgba(96, 165, 250, 0.8)',
		smoke: 'rgba(96, 165, 250, 0.15)',
		hoverGlow: 'bg-blue-500/20',
		rgb: {
			primary: '96, 165, 250', // blue-400
			secondary: '59, 130, 246', // blue-500
			light: '147, 197, 253', // blue-300
		},
		naipeStyles: {
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
	},
	fogo: {
		name: 'Fogo',
		naipe: 'Paus',
		color: 'red',
		secondary: 'orange',
		tertiary: 'rose',
		gradient: 'from-red-600 to-orange-600',
		borderGradient: 'from-red-400 via-orange-400 to-red-500',
		border: 'border-red-400/40',
		neonGlow:
			'0 0 30px rgba(248, 113, 113, 0.4), 0 0 60px rgba(239, 68, 68, 0.2), inset 0 0 30px rgba(248, 113, 113, 0.1)',
		innerGlow: 'from-red-500/20 via-orange-500/10',
		textGradient: 'from-red-400 via-orange-400 to-red-500',
		textGlow: '0 0 20px rgba(248, 113, 113, 0.8)',
		smoke: 'rgba(248, 113, 113, 0.15)',
		hoverGlow: 'bg-red-500/20',
		rgb: {
			primary: '248, 113, 113', // red-400
			secondary: '239, 68, 68', // red-500
			light: '252, 165, 165', // red-300
		},
		naipeStyles: {
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
	},
	terra: {
		name: 'Terra',
		naipe: 'Ouros',
		color: 'amber',
		secondary: 'yellow',
		tertiary: 'orange',
		gradient: 'from-amber-600 to-yellow-600',
		borderGradient: 'from-amber-400 via-yellow-400 to-amber-500',
		border: 'border-amber-400/40',
		neonGlow:
			'0 0 30px rgba(251, 191, 36, 0.4), 0 0 60px rgba(245, 158, 11, 0.2), inset 0 0 30px rgba(251, 191, 36, 0.1)',
		innerGlow: 'from-amber-500/20 via-yellow-500/10',
		textGradient: 'from-amber-400 via-yellow-400 to-amber-500',
		textGlow: '0 0 20px rgba(251, 191, 36, 0.8)',
		smoke: 'rgba(251, 191, 36, 0.15)',
		hoverGlow: 'bg-amber-500/20',
		rgb: {
			primary: '251, 191, 36', // amber-400
			secondary: '245, 158, 11', // amber-500
			light: '252, 211, 77', // amber-300
		},
		naipeStyles: {
			nebula: 'from-amber-900/20 via-amber-950/10',
			circles: [
				'border-amber-500/5',
				'border-yellow-500/10',
				'border-amber-500/15',
				'border-yellow-500/20',
				'border-amber-500/25',
			],
			energy1: 'from-amber-600/10 via-yellow-600/5',
			energy2: 'from-yellow-600/10 via-amber-600/5',
			particles: 'bg-amber-400/40',
			symbols: ['text-amber-500', 'text-yellow-500', 'text-orange-500', 'text-amber-500'],
			triangle: 'text-amber-500/20',
			iconBg: 'from-amber-500/10 to-yellow-600/10',
			iconBorder: 'border-amber-500/20',
			iconColor: 'text-amber-600 dark:text-amber-400',
			subtitle: 'text-amber-400/70',
			text: 'text-amber-200/90',
			description: 'text-amber-200/80',
			divider: 'via-amber-500/30',
			dividerIcon: 'text-amber-400/50',
			breadcrumbSeparator: 'text-amber-500/50',
			breadcrumbHover: 'hover:text-amber-600 dark:hover:text-amber-400',
			cardHover: 'hover:shadow-amber-500/20 hover:border-amber-500/30',
			cardBg: 'from-amber-500/10 via-yellow-600/10 to-orange-700/10',
		},
	},
	ar: {
		name: 'Ar',
		naipe: 'Espadas',
		color: 'slate',
		secondary: 'gray',
		tertiary: 'zinc',
		gradient: 'from-slate-400 to-gray-500',
		borderGradient: 'from-slate-400 via-gray-400 to-slate-500',
		border: 'border-slate-400/40',
		neonGlow:
			'0 0 30px rgba(148, 163, 184, 0.4), 0 0 60px rgba(100, 116, 139, 0.2), inset 0 0 30px rgba(148, 163, 184, 0.1)',
		innerGlow: 'from-slate-500/20 via-gray-500/10',
		textGradient: 'from-slate-400 via-gray-400 to-slate-500',
		textGlow: '0 0 20px rgba(148, 163, 184, 0.8)',
		smoke: 'rgba(148, 163, 184, 0.15)',
		hoverGlow: 'bg-slate-400/20',
		rgb: {
			primary: '148, 163, 184', // slate-400
			secondary: '100, 116, 139', // slate-500
			light: '203, 213, 225', // slate-300
		},
		naipeStyles: {
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
	},
	espirito: {
		name: 'Espírito',
		naipe: 'Quintessência',
		color: 'purple',
		secondary: 'violet',
		tertiary: 'fuchsia',
		gradient: 'from-purple-600 to-violet-600',
		borderGradient: 'from-purple-400 via-violet-400 to-purple-500',
		border: 'border-purple-400/40',
		neonGlow:
			'0 0 30px rgba(192, 132, 252, 0.4), 0 0 60px rgba(168, 85, 247, 0.2), inset 0 0 30px rgba(192, 132, 252, 0.1)',
		innerGlow: 'from-purple-500/20 via-violet-500/10',
		textGradient: 'from-purple-400 via-violet-400 to-purple-500',
		textGlow: '0 0 20px rgba(192, 132, 252, 0.8)',
		smoke: 'rgba(192, 132, 252, 0.15)',
		hoverGlow: 'bg-purple-500/20',
		rgb: {
			primary: '192, 132, 252', // purple-400
			secondary: '168, 85, 247', // purple-500
			light: '216, 180, 254', // purple-300
		},
		naipeStyles: {
			nebula: 'from-purple-900/20 via-purple-950/10',
			circles: [
				'border-purple-500/5',
				'border-violet-500/10',
				'border-purple-500/15',
				'border-violet-500/20',
				'border-purple-500/25',
			],
			energy1: 'from-purple-600/10 via-violet-600/5',
			energy2: 'from-violet-600/10 via-purple-600/5',
			particles: 'bg-purple-400/40',
			symbols: ['text-purple-500', 'text-violet-500', 'text-fuchsia-500', 'text-purple-500'],
			triangle: 'text-purple-500/20',
			iconBg: 'from-purple-500/10 to-violet-500/10',
			iconBorder: 'border-purple-500/20',
			iconColor: 'text-purple-600 dark:text-purple-400',
			subtitle: 'text-purple-400/70',
			text: 'text-purple-200/90',
			description: 'text-purple-200/80',
			divider: 'via-purple-500/30',
			dividerIcon: 'text-purple-400/50',
			breadcrumbSeparator: 'text-purple-500/50',
			breadcrumbHover: 'hover:text-purple-600 dark:hover:text-purple-400',
			cardHover: 'hover:shadow-purple-500/20 hover:border-purple-500/30',
			cardBg: 'from-purple-500/10 via-violet-500/10 to-fuchsia-500/10',
		},
	},
}

// ═══════════════════════════════════════════════════════
// TEMAS ADICIONAIS (para futuro sistema de temas)
// ═══════════════════════════════════════════════════════

// TODO: Implementar temas classic, nature, cosmic quando sistema de temas for ativado
const CLASSIC_THEME: Record<Element, ElementColorConfig> = MYSTICAL_THEME // Placeholder
const NATURE_THEME: Record<Element, ElementColorConfig> = MYSTICAL_THEME // Placeholder
const COSMIC_THEME: Record<Element, ElementColorConfig> = MYSTICAL_THEME // Placeholder

/**
 * Definição de cores por elemento em cada tema disponível
 */
export const ELEMENT_COLORS_BY_THEME: Record<ElementalTheme, Record<Element, ElementColorConfig>> = {
	mystical: MYSTICAL_THEME,
	classic: CLASSIC_THEME,
	nature: NATURE_THEME,
	cosmic: COSMIC_THEME,
}

/**
 * Tema padrão do sistema (será sobrescrito por preferência do usuário no futuro)
 */
export const DEFAULT_THEME: ElementalTheme = 'mystical'

// ═══════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════

/**
 * Obtém configuração completa de cores de um elemento no tema atual
 *
 * @param element - Elemento a buscar cores
 * @param theme - Tema ativo (padrão: mystical)
 * @returns Objeto com todas as configurações de cores
 */
export function getElementColors(element: Element, theme: ElementalTheme = DEFAULT_THEME): ElementColorConfig {
	return ELEMENT_COLORS_BY_THEME[theme][element]
}

/**
 * Obtém todas as cores do tema atual
 *
 * @param theme - Tema ativo
 * @returns Objeto com todas as cores elementais
 */
export function getThemeColors(theme: ElementalTheme = DEFAULT_THEME): Record<Element, ElementColorConfig> {
	return ELEMENT_COLORS_BY_THEME[theme]
}

/**
 * Converte elemento para naipe correspondente
 *
 * @param element - Elemento a converter
 * @returns Nome do naipe em português
 */
export function elementToNaipe(element: Element): string {
	const mapping: Record<Element, string> = {
		agua: 'Copas',
		fogo: 'Paus',
		terra: 'Ouros',
		ar: 'Espadas',
		espirito: 'Quintessência',
	}
	return mapping[element]
}

/**
 * Converte naipe para elemento correspondente
 *
 * @param naipe - Nome do naipe
 * @returns Código do elemento
 */
export function naipeToElement(naipe: string): Element {
	const mapping: Record<string, Element> = {
		Copas: 'agua',
		Paus: 'fogo',
		Ouros: 'terra',
		Espadas: 'ar',
		Quintessência: 'espirito',
	}
	return mapping[naipe] || 'agua'
}

/**
 * Type guard para validar se string é Element válido
 */
export function isValidElement(element: string): element is Element {
	return ['agua', 'fogo', 'terra', 'ar', 'espirito'].includes(element)
}

/**
 * Ícones Iconify para cada elemento (compatibilidade com código antigo)
 */
export const ELEMENT_ICONS: Record<Element, string> = {
	agua: 'mdi:water',
	fogo: 'mdi:fire',
	terra: 'mdi:mountain',
	ar: 'mdi:weather-windy',
	espirito: 'game-icons:magic-swirl',
}

/**
 * Helper: Busca ícone por tipo de elemento
 */
export function getElementIcon(element: Element): string {
	return ELEMENT_ICONS[element]
}

/**
 * Compatibilidade com código antigo que usa 'water', 'fire', etc
 */
export function normalizeElementName(element: string): Element {
	const mapping: Record<string, Element> = {
		water: 'agua',
		fire: 'fogo',
		earth: 'terra',
		air: 'ar',
		spirit: 'espirito',
		// Já em português
		agua: 'agua',
		fogo: 'fogo',
		terra: 'terra',
		ar: 'ar',
		espirito: 'espirito',
	}
	return mapping[element.toLowerCase()] || 'agua'
}

// ═══════════════════════════════════════════════════════
// COMPATIBILIDADE COM TIRAGENS
// ═══════════════════════════════════════════════════════

/**
 * Tipos de categorias de tiragens
 */
export type CategoryType = 'quick' | 'insight' | 'relationship' | 'decision' | 'deep' | 'custom'

/**
 * Mapeamento de categoria de tiragem para tipo de elemento
 *
 * Define qual elemento corresponde a cada tipo de tiragem:
 * - Rápidas (quick) → Ar (clareza rápida)
 * - Insights (insight) → Água (profundidade emocional)
 * - Relacionamentos (relationship) → Fogo (paixão)
 * - Decisões (decision) → Terra (praticidade)
 * - Profundas (deep) → Espírito (transcendência)
 * - Customizadas (custom) → Espírito (versatilidade)
 */
export const CATEGORY_TO_ELEMENT: Record<CategoryType, Element> = {
	quick: 'ar',
	insight: 'agua',
	relationship: 'fogo',
	decision: 'terra',
	deep: 'espirito',
	custom: 'espirito',
}

/**
 * Obtém o tipo de elemento baseado na categoria da tiragem
 *
 * @param category - Categoria da tiragem
 * @returns Tipo do elemento correspondente
 *
 * @example
 * ```ts
 * const element = getCategoryElement('quick')
 * console.log(element) // 'ar'
 * ```
 */
export function getCategoryElement(category: CategoryType): Element {
	return CATEGORY_TO_ELEMENT[category] || 'espirito'
}

/**
 * Obtém as cores de um elemento baseado na categoria da tiragem
 *
 * @param category - Categoria da tiragem
 * @param theme - Tema ativo (padrão: mystical)
 * @returns Paleta de cores do elemento correspondente
 *
 * @example
 * ```ts
 * const colors = getCategoryColors('relationship')
 * // Retorna cores do elemento 'fogo'
 * console.log(colors.name) // 'Fogo'
 * ```
 */
export function getCategoryColors(
	category: CategoryType,
	theme: ElementalTheme = DEFAULT_THEME,
): ElementColorConfig {
	const element = getCategoryElement(category)
	return getElementColors(element, theme)
}

/**
 * Type helper para componentes de naipes
 * Combina naipeStyles com props base (color, secondary, tertiary, gradient, border)
 */
export type NaipeColorScheme = NonNullable<ElementColorConfig['naipeStyles']> &
	Pick<ElementColorConfig, 'color' | 'secondary' | 'tertiary' | 'gradient' | 'border'>

/**
 * Obtém configuração de cores formatada para componentes de naipes
 *
 * @param element - Elemento a buscar cores
 * @param theme - Tema ativo (padrão: mystical)
 * @returns Objeto com cores no formato esperado por componentes de naipes
 *
 * @example
 * ```ts
 * const colors = getNaipeColors('agua')
 * // Retorna: { color, secondary, tertiary, gradient, border, nebula, circles, ... }
 * ```
 */
export function getNaipeColors(element: Element, theme: ElementalTheme = DEFAULT_THEME): NaipeColorScheme {
	const config = getElementColors(element, theme)

	if (!config.naipeStyles) {
		throw new Error(`Element ${element} does not have naipeStyles configured`)
	}

	return {
		...config.naipeStyles,
		color: config.color,
		secondary: config.secondary,
		tertiary: config.tertiary,
		gradient: config.gradient,
		border: config.border,
	}
}
