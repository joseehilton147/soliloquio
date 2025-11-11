/**
 * Element Colors Configuration
 *
 * Sistema centralizado de cores dos 5 elementos místicos.
 * Usado em naipes, tiragens, e todos os componentes que trabalham com elementos.
 *
 * Elementos:
 * - Água (Water): Emoção, Intuição, Fluxo
 * - Fogo (Fire): Paixão, Energia, Transformação
 * - Terra (Earth): Manifestação, Materialização, Estabilidade
 * - Ar (Air): Intelecto, Pensamento, Clareza
 * - Espírito (Spirit): Transcendência, Totalidade, Sabedoria
 *
 * Baseado em:
 * - Baralho Cigano (Petit Lenormand)
 * - Tarot tradicional
 * - Alquimia clássica (4 elementos + quintessência)
 */

export type ElementType = 'water' | 'fire' | 'earth' | 'air' | 'spirit'

export interface ElementColorConfig {
	/** Nome do elemento em português */
	name: string
	/** Cor principal (nome Tailwind) */
	color: string
	/** Classes Tailwind para gradiente */
	gradient: string
	/** Classes Tailwind para gradiente de border */
	borderGradient: string
	/** Classe Tailwind para border com opacidade */
	border: string
	/** Box-shadow neon glow (inline style) */
	neonGlow: string
	/** Classes Tailwind para inner glow gradient */
	innerGlow: string
	/** Classes Tailwind para gradient de texto */
	textGradient: string
	/** Text-shadow / Drop-shadow glow (inline style) */
	textGlow: string
	/** Cor de smoke/névoa (rgba inline style) */
	smoke: string
	/** Background base para hover/glow effects */
	hoverGlow: string
	/** RGB values para uso em rgba() */
	rgb: {
		primary: string // ex: "96, 165, 250" para blue-400
		secondary: string // ex: "59, 130, 246" para blue-500
		light: string // ex: "147, 197, 253" para blue-300
	}
}

/**
 * Configuração completa de cores para cada elemento
 */
export const ELEMENT_COLORS: Record<ElementType, ElementColorConfig> = {
	/**
	 * ÁGUA (Water)
	 * Elemento: Copas no Tarot
	 * Cor: Blue/Cyan (Calma, profundidade emocional)
	 * Energia: Yin, Receptiva, Fluida
	 */
	water: {
		name: 'Água',
		color: 'blue',
		gradient: 'from-blue-600 to-cyan-600',
		borderGradient: 'from-blue-400 via-cyan-400 to-blue-500',
		border: 'border-blue-400/40',
		neonGlow: '0 0 30px rgba(96, 165, 250, 0.4), 0 0 60px rgba(59, 130, 246, 0.2), inset 0 0 30px rgba(96, 165, 250, 0.1)',
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
	},

	/**
	 * FOGO (Fire)
	 * Elemento: Paus no Tarot
	 * Cor: Red/Orange (Paixão, transformação)
	 * Energia: Yang, Ativa, Expansiva
	 */
	fire: {
		name: 'Fogo',
		color: 'red',
		gradient: 'from-red-600 to-orange-600',
		borderGradient: 'from-red-400 via-orange-400 to-red-500',
		border: 'border-red-400/40',
		neonGlow: '0 0 30px rgba(248, 113, 113, 0.4), 0 0 60px rgba(239, 68, 68, 0.2), inset 0 0 30px rgba(248, 113, 113, 0.1)',
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
	},

	/**
	 * TERRA (Earth)
	 * Elemento: Ouros no Tarot
	 * Cor: Amber/Yellow (Materialização, prosperidade)
	 * Energia: Yin, Estável, Concreta
	 */
	earth: {
		name: 'Terra',
		color: 'amber',
		gradient: 'from-amber-600 to-yellow-600',
		borderGradient: 'from-amber-400 via-yellow-400 to-amber-500',
		border: 'border-amber-400/40',
		neonGlow: '0 0 30px rgba(251, 191, 36, 0.4), 0 0 60px rgba(245, 158, 11, 0.2), inset 0 0 30px rgba(251, 191, 36, 0.1)',
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
	},

	/**
	 * AR (Air)
	 * Elemento: Espadas no Tarot
	 * Cor: Slate/Gray (Intelecto, clareza mental)
	 * Energia: Yang, Ativa, Mental
	 */
	air: {
		name: 'Ar',
		color: 'slate',
		gradient: 'from-slate-400 to-gray-500',
		borderGradient: 'from-slate-400 via-gray-400 to-slate-500',
		border: 'border-slate-400/40',
		neonGlow: '0 0 30px rgba(148, 163, 184, 0.4), 0 0 60px rgba(100, 116, 139, 0.2), inset 0 0 30px rgba(148, 163, 184, 0.1)',
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
	},

	/**
	 * ESPÍRITO (Spirit)
	 * Elemento: Quintessência/Éter (5º elemento)
	 * Cor: Purple/Violet (Transcendência, magia)
	 * Energia: Neutra, Transcendente, Unificadora
	 */
	spirit: {
		name: 'Espírito',
		color: 'purple',
		gradient: 'from-purple-600 to-violet-600',
		borderGradient: 'from-purple-400 via-violet-400 to-purple-500',
		border: 'border-purple-400/40',
		neonGlow: '0 0 30px rgba(192, 132, 252, 0.4), 0 0 60px rgba(168, 85, 247, 0.2), inset 0 0 30px rgba(192, 132, 252, 0.1)',
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
	},
}

/**
 * Ícones Iconify para cada elemento
 */
export const ELEMENT_ICONS: Record<ElementType, string> = {
	water: 'mdi:water',
	fire: 'mdi:fire',
	earth: 'mdi:mountain',
	air: 'mdi:weather-windy',
	spirit: 'game-icons:magic-swirl',
}

/**
 * Helper: Busca configuração de cores por tipo de elemento
 */
export function getElementColors(element: ElementType): ElementColorConfig {
	return ELEMENT_COLORS[element]
}

/**
 * Helper: Busca ícone por tipo de elemento
 */
export function getElementIcon(element: ElementType): string {
	return ELEMENT_ICONS[element]
}

/**
 * Helper: Retorna apenas as classes Tailwind de um elemento
 * (útil para componentes que não precisam de inline styles)
 */
export function getElementTailwindClasses(element: ElementType) {
	const colors = ELEMENT_COLORS[element]
	return {
		gradient: colors.gradient,
		borderGradient: colors.borderGradient,
		border: colors.border,
		innerGlow: colors.innerGlow,
		textGradient: colors.textGradient,
		hoverGlow: colors.hoverGlow,
	}
}

/**
 * Helper: Retorna apenas os inline styles de um elemento
 * (útil para componentes que precisam de box-shadow, text-shadow, etc)
 */
export function getElementInlineStyles(element: ElementType) {
	const colors = ELEMENT_COLORS[element]
	return {
		neonGlow: colors.neonGlow,
		textGlow: colors.textGlow,
		smoke: colors.smoke,
	}
}

/**
 * Type guard para validar se string é ElementType válido
 */
export function isValidElement(element: string): element is ElementType {
	return ['water', 'fire', 'earth', 'air', 'spirit'].includes(element)
}
