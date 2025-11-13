/**
 * Element Colors Configuration
 *
 * Define as paletas de cores para cada elemento místico (ar, água, fogo, terra, espírito).
 * Cada elemento possui cores primárias, gradientes, efeitos de glow e texturas de veludo.
 *
 * @module ElementColors
 */

/**
 * Configuração de cores para um elemento
 *
 * @interface ElementColors
 * @property {string} primary - Nome da cor primária (ex: 'slate', 'blue')
 * @property {string} rgb - Valores RGB da cor (ex: '148, 163, 184')
 * @property {string} smoke - Cor de fumaça/névoa com transparência
 * @property {string} glow - Box-shadow para efeito de brilho
 * @property {string} gradient - Classes Tailwind para gradiente
 * @property {string} velvet - Gradiente CSS para textura de veludo
 */
export interface ElementColors {
	primary: string
	rgb: string
	smoke: string
	glow: string
	gradient: string
	velvet: string
}

/**
 * Tipos de elementos místicos disponíveis
 */
export type ElementType = 'air' | 'water' | 'fire' | 'earth' | 'spirit'

/**
 * Mapeamento de categorias de tiragem para elementos
 */
export type CategoryType = 'quick' | 'insight' | 'relationship' | 'decision' | 'deep' | 'custom'

/**
 * Configuração completa de cores por elemento
 *
 * Cada elemento possui sua própria paleta que define a atmosfera visual:
 * - **Air (Ar)**: Tons de cinza-azulado para clareza mental
 * - **Water (Água)**: Azuis para emoções e intuição
 * - **Fire (Fogo)**: Vermelhos e laranjas para paixão e ação
 * - **Earth (Terra)**: Âmbares e amarelos para estabilidade
 * - **Spirit (Espírito)**: Roxos e violetas para espiritualidade
 *
 * @constant
 */
export const ELEMENT_COLORS: Record<ElementType, ElementColors> = {
	air: {
		primary: 'slate',
		rgb: '148, 163, 184',
		smoke: 'rgba(148, 163, 184, 0.15)',
		glow: '0 0 30px rgba(148, 163, 184, 0.4)',
		gradient: 'from-slate-400 to-gray-400',
		velvet: 'linear-gradient(135deg, rgba(100, 116, 139, 0.4) 0%, rgba(71, 85, 105, 0.3) 100%)',
	},
	water: {
		primary: 'blue',
		rgb: '96, 165, 250',
		smoke: 'rgba(96, 165, 250, 0.15)',
		glow: '0 0 30px rgba(96, 165, 250, 0.4)',
		gradient: 'from-blue-400 to-cyan-400',
		velvet: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.3) 100%)',
	},
	fire: {
		primary: 'red',
		rgb: '248, 113, 113',
		smoke: 'rgba(248, 113, 113, 0.15)',
		glow: '0 0 30px rgba(248, 113, 113, 0.4)',
		gradient: 'from-red-400 to-orange-400',
		velvet: 'linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(220, 38, 38, 0.3) 100%)',
	},
	earth: {
		primary: 'amber',
		rgb: '251, 191, 36',
		smoke: 'rgba(251, 191, 36, 0.15)',
		glow: '0 0 30px rgba(251, 191, 36, 0.4)',
		gradient: 'from-amber-400 to-yellow-400',
		velvet: 'linear-gradient(135deg, rgba(245, 158, 11, 0.4) 0%, rgba(217, 119, 6, 0.3) 100%)',
	},
	spirit: {
		primary: 'purple',
		rgb: '192, 132, 252',
		smoke: 'rgba(192, 132, 252, 0.15)',
		glow: '0 0 30px rgba(192, 132, 252, 0.4)',
		gradient: 'from-purple-400 to-violet-400',
		velvet: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(147, 51, 234, 0.3) 100%)',
	},
}

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
 *
 * @constant
 */
export const CATEGORY_TO_ELEMENT: Record<CategoryType, ElementType> = {
	quick: 'air',
	insight: 'water',
	relationship: 'fire',
	decision: 'earth',
	deep: 'spirit',
	custom: 'spirit',
}

/**
 * Obtém as cores de um elemento baseado na categoria da tiragem
 *
 * @param {CategoryType} category - Categoria da tiragem
 * @returns {ElementColors} Paleta de cores do elemento correspondente
 *
 * @example
 * ```ts
 * const colors = getElementColors('relationship')
 * // Retorna cores do elemento 'fire'
 * console.log(colors.primary) // 'red'
 * ```
 */
export function getElementColors(category: CategoryType): ElementColors {
	const element = CATEGORY_TO_ELEMENT[category] || 'spirit'
	return ELEMENT_COLORS[element]
}

/**
 * Obtém o tipo de elemento baseado na categoria da tiragem
 *
 * @param {CategoryType} category - Categoria da tiragem
 * @returns {ElementType} Tipo do elemento correspondente
 *
 * @example
 * ```ts
 * const element = getElement('quick')
 * console.log(element) // 'air'
 * ```
 */
export function getElement(category: CategoryType): ElementType {
	return CATEGORY_TO_ELEMENT[category] || 'spirit'
}
