/**
 * Tiragens Predefinidas de Tarot - Modularizadas por Categoria
 *
 * Baseado em: "Guia para Leitura Intuitiva" - Stefani Caponi
 *
 * Este módulo organiza todas as tiragens de tarot em categorias semânticas:
 * - quick: Tiragens rápidas de 1-3 cartas para insights do dia a dia
 * - insight: Tiragens para autoconhecimento e orientação espiritual
 * - decision: Tiragens focadas em escolhas e manifestação prática
 * - relationship: Tiragens para explorar conexões e amor
 * - deep: Tiragens avançadas para trabalho espiritual intenso
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

// Quick Spreads (1-3 cartas) - 5 spreads
import {
	SIM_OU_NAO,
	LIBERAR_E_RETIRAR,
	DOM_E_OBSTACULO,
	CABECA_CORACAO_ESPIRITO,
	MENSAGEM_DO_VENTO,
} from './quick'

// Insight Spreads (3-5 cartas) - 4 spreads
import {
	CONSELHO_DO_UNIVERSO,
	PASSADO_PRESENTE_FUTURO,
	MENTE_CORPO_ESPIRITO,
	LEI_DE_ATRACAO,
} from './insight'

// Decision Spreads (3-6 cartas) - 6 spreads
import {
	PROBLEMA_FAZER_EVITAR,
	PROS_E_CONTRAS,
	MAGIA_MANIFESTADORA,
	RAIZES_E_FRUTOS,
	ENCRUZILHADAS,
	TOMANDO_DECISAO,
} from './decision'

// Relationship Spreads (5-6 cartas) - 2 spreads
import {
	POTENCIAL_RELACIONAMENTO,
	RELACIONAMENTO_EXISTENTE,
} from './relationship'

// Deep Spreads (7-10 cartas) - 5 spreads
import {
	JORNADA_DA_ALMA,
	TRABALHO_DE_SOMBRA,
	QUATRO_ESTACOES_DA_ALMA,
	DESPERTAR_ESPIRITUAL,
	CRUZ_CELTA,
} from './deep'

// ═══════════════════════════════════════════════════════
// ARRAY CONSOLIDADO - Todas as 22 Tiragens
// ═══════════════════════════════════════════════════════

/**
 * Array com todas as tiragens disponíveis, ordenadas por número de cartas (cardCount).
 *
 * Total: 22 spreads distribuídos em 5 categorias
 */
export const ALL_SPREADS: TarotSpread[] = [
	// 1 Carta
	SIM_OU_NAO,

	// 2 Cartas
	LIBERAR_E_RETIRAR,
	DOM_E_OBSTACULO,

	// 3 Cartas
	CONSELHO_DO_UNIVERSO,
	PASSADO_PRESENTE_FUTURO,
	MENTE_CORPO_ESPIRITO,
	CABECA_CORACAO_ESPIRITO,
	MENSAGEM_DO_VENTO,
	PROBLEMA_FAZER_EVITAR,

	// 4 Cartas
	PROS_E_CONTRAS,

	// 5 Cartas
	POTENCIAL_RELACIONAMENTO,
	LEI_DE_ATRACAO,
	MAGIA_MANIFESTADORA,
	RAIZES_E_FRUTOS,

	// 6 Cartas
	RELACIONAMENTO_EXISTENTE,
	ENCRUZILHADAS,
	TOMANDO_DECISAO,

	// 7 Cartas
	JORNADA_DA_ALMA,
	TRABALHO_DE_SOMBRA,

	// 8 Cartas
	QUATRO_ESTACOES_DA_ALMA,

	// 9 Cartas
	DESPERTAR_ESPIRITUAL,

	// 10 Cartas
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
 * @param category - Categoria desejada: 'quick' | 'insight' | 'decision' | 'relationship' | 'deep'
 * @returns Array com todas as tiragens da categoria especificada
 *
 * @example
 * ```ts
 * const quickSpreads = getSpreadsByCategory('quick')
 * console.log(quickSpreads.length) // 5
 * ```
 */
export function getSpreadsByCategory(category: TarotSpread['category']): TarotSpread[] {
	return ALL_SPREADS.filter((spread) => spread.category === category)
}

/**
 * Filtra tiragens por número exato de cartas
 *
 * @param count - Número de cartas desejado (1-10)
 * @returns Array com todas as tiragens que usam exatamente esse número de cartas
 *
 * @example
 * ```ts
 * const threecardSpreads = getSpreadsByCardCount(3)
 * console.log(threecardSpreads.length) // 6
 * ```
 */
export function getSpreadsByCardCount(count: number): TarotSpread[] {
	return ALL_SPREADS.filter((spread) => spread.cardCount === count)
}

// ═══════════════════════════════════════════════════════
// RE-EXPORTS (para compatibilidade)
// ═══════════════════════════════════════════════════════

// Quick Spreads
export {
	SIM_OU_NAO,
	LIBERAR_E_RETIRAR,
	DOM_E_OBSTACULO,
	CABECA_CORACAO_ESPIRITO,
	MENSAGEM_DO_VENTO,
}

// Insight Spreads
export {
	CONSELHO_DO_UNIVERSO,
	PASSADO_PRESENTE_FUTURO,
	MENTE_CORPO_ESPIRITO,
	LEI_DE_ATRACAO,
}

// Decision Spreads
export {
	PROBLEMA_FAZER_EVITAR,
	PROS_E_CONTRAS,
	MAGIA_MANIFESTADORA,
	RAIZES_E_FRUTOS,
	ENCRUZILHADAS,
	TOMANDO_DECISAO,
}

// Relationship Spreads
export {
	POTENCIAL_RELACIONAMENTO,
	RELACIONAMENTO_EXISTENTE,
}

// Deep Spreads
export {
	JORNADA_DA_ALMA,
	TRABALHO_DE_SOMBRA,
	QUATRO_ESTACOES_DA_ALMA,
	DESPERTAR_ESPIRITUAL,
	CRUZ_CELTA,
}
