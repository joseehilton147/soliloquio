/**
 * Tiragens Predefinidas de Tarot - 3 Tiragens Essenciais
 *
 * Baseado em: "Guia para Leitura Intuitiva" - Stefani Caponi
 *
 * Este módulo organiza as tiragens essenciais de tarot:
 * - quick: Tiragem de 1 carta para respostas diretas (Sim ou Não)
 * - insight: Tiragem de 3 cartas para orientação espiritual (Conselho do Universo)
 * - deep: Tiragem de 10 cartas para análise profunda (Cruz Celta)
 *
 * Cada tiragem contém:
 * - Posições visuais (x, y) em porcentagem (0-100)
 * - Descrições místicas de cada posição
 * - Layout otimizado para visualização
 * - Metadados como dificuldade, tempo estimado e tags
 */

import type { TarotSpread } from '@workspace/core/tarot'

// ═══════════════════════════════════════════════════════
// IMPORTS POR CATEGORIA
// ═══════════════════════════════════════════════════════

// Quick Spreads (1 carta)
import { SIM_OU_NAO } from './quick'

// Insight Spreads (3 cartas)
import { CONSELHO_DO_UNIVERSO } from './insight'

// Deep Spreads (10 cartas)
import { CRUZ_CELTA } from './deep'

// ═══════════════════════════════════════════════════════
// ARRAY CONSOLIDADO - 3 Tiragens Essenciais
// ═══════════════════════════════════════════════════════

/**
 * Array com todas as tiragens disponíveis, ordenadas por número de cartas (cardCount).
 *
 * Total: 3 spreads essenciais
 */
export const ALL_SPREADS: TarotSpread[] = [
	// 1 Carta - Resposta Direta
	SIM_OU_NAO,

	// 3 Cartas - Conselho Espiritual
	CONSELHO_DO_UNIVERSO,

	// 10 Cartas - Análise Profunda
	CRUZ_CELTA,
]

// ═══════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════

/**
 * Busca uma tiragem específica pelo seu slug (URL-friendly identifier)
 *
 * @param slug - Identificador único da tiragem (ex: 'sim-ou-nao', 'cruz-celta')
 * @returns A tiragem encontrada ou undefined se não existir
 *
 * @example
 * ```ts
 * const spread = getSpreadBySlug('cruz-celta')
 * if (spread) {
 *   console.log(spread.name) // "A Cruz Celta"
 * }
 * ```
 */
export function getSpreadBySlug(slug: string): TarotSpread | undefined {
	return ALL_SPREADS.find((spread) => spread.slug === slug)
}

/**
 * Filtra tiragens por categoria
 *
 * @param category - Categoria desejada: 'quick' | 'insight' | 'deep'
 * @returns Array com todas as tiragens da categoria especificada
 *
 * @example
 * ```ts
 * const quickSpreads = getSpreadsByCategory('quick')
 * console.log(quickSpreads.length) // 1
 * ```
 */
export function getSpreadsByCategory(category: TarotSpread['category']): TarotSpread[] {
	return ALL_SPREADS.filter((spread) => spread.category === category)
}

/**
 * Filtra tiragens por número exato de cartas
 *
 * @param count - Número de cartas desejado (1, 3 ou 10)
 * @returns Array com todas as tiragens que usam exatamente esse número de cartas
 *
 * @example
 * ```ts
 * const oneCardSpreads = getSpreadsByCardCount(1)
 * console.log(oneCardSpreads.length) // 1
 * ```
 */
export function getSpreadsByCardCount(count: number): TarotSpread[] {
	return ALL_SPREADS.filter((spread) => spread.cardCount === count)
}

// ═══════════════════════════════════════════════════════
// RE-EXPORTS (para compatibilidade)
// ═══════════════════════════════════════════════════════

// Quick Spreads
export { SIM_OU_NAO }

// Insight Spreads
export { CONSELHO_DO_UNIVERSO }

// Deep Spreads
export { CRUZ_CELTA }
