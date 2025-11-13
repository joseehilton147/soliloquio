/**
 * Spread Layout Calculator - Sistema Dinâmico
 *
 * Calcula posicionamento inteligente de cartas baseado no tipo de tiragem.
 * Sistema adaptativo que funciona para qualquer número de cartas.
 */

import type { TarotSpread } from '@workspace/core/tarot'

export interface CalculatedPosition {
	x: number // percentual 0-100
	y: number // percentual 0-100
	rotation?: number
}

/**
 * Configuração de tamanho de carta baseado em viewport
 * Cartas maiores = mais espaçamento necessário
 */
const CARD_CONFIG = {
	// Tamanho aproximado da carta em % do viewport
	widthPercent: 12,  // ~192px em 1600px de largura
	heightPercent: 20, // ~200px em 1000px de altura

	// Espaçamento mínimo entre cartas (em % do viewport)
	minSpacingX: 8,  // Horizontal
	minSpacingY: 12, // Vertical
}

/**
 * Calcula dimensões ideais do container baseado no número de cartas
 */
export function calculateContainerDimensions(cardCount: number): {
	minHeight: string // em vh ou px
	aspectRatio: 'square' | 'landscape' | 'portrait'
} {
	// Para todas as tiragens, usa altura mínima da viewport
	return {
		minHeight: 'calc(100vh - 8rem)', // Desconta header/padding
		aspectRatio: cardCount <= 5 ? 'landscape' : 'square'
	}
}

/**
 * Recalcula posições para evitar sobreposição
 *
 * @param spread - Dados da tiragem
 * @returns Array de posições otimizadas
 */
export function recalculatePositions(spread: TarotSpread): CalculatedPosition[] {
	// Layouts específicos para tiragens conhecidas
	if (spread.slug === 'cruz-celta') {
		return getCelticCrossLayout()
	}

	if (spread.slug === 'conselho-universo') {
		return getUniverseAdviceLayout()
	}

	// Para outras tiragens, otimiza as posições existentes
	return optimizeExistingPositions(spread)
}

/**
 * Layout tradicional da Cruz Celta
 *
 * Estrutura visual EXATA (seguindo imagem de referência):
 *
 *                3 (Coroa)                    10 (Desfecho)
 *                    |                            |
 *     6 (Passado) - 1+2 (Centro) - 4 (Futuro)    9 (Esperanças)
 *                    |                            |
 *                5 (Fundação)                     8 (Entorno)
 *                                                 |
 *                                            7 (Consulente)
 *
 * IMPORTANTE:
 * - Eixo Y cresce para BAIXO (0% = topo, 100% = base)
 * - Carta 3 está ACIMA de 1+2 (y menor)
 * - Carta 5 está ABAIXO de 1+2 (y maior)
 * - Coluna direita: 10 no TOPO (y menor), 7 na BASE (y maior)
 */
function getCelticCrossLayout(): CalculatedPosition[] {
	// Definindo coordenadas de forma clara e explícita
	const centerX = 38  // Centro horizontal da cruz
	const centerY = 50  // Centro vertical da cruz
	const staffX = 85   // Posição X da coluna direita (staff)

	return [
		// ════════════════════════════════════════════════════════
		// CRUZ CENTRAL - Cartas 1 e 2 (sobrepostas no centro)
		// ════════════════════════════════════════════════════════
		{
			x: centerX,     // 38%
			y: centerY,     // 50%
			rotation: 0     // Vertical
		},  // Carta 1: Situação Presente

		{
			x: centerX,     // 38% (mesma posição da carta 1)
			y: centerY,     // 50% (mesma posição da carta 1)
			rotation: 90    // Horizontal (cruzada sobre a 1)
		},  // Carta 2: Obstáculo/Cruzamento

		// ════════════════════════════════════════════════════════
		// CRUZ MAIOR - 4 cartas ao redor do centro
		// ════════════════════════════════════════════════════════
		{
			x: centerX,     // 38% (alinhada com centro)
			y: 20,          // 20% (ACIMA do centro - y menor)
			rotation: 0
		},  // Carta 3: Coroa/Consciência (TOPO da cruz)

		{
			x: 68,          // 68% (DIREITA do centro)
			y: centerY,     // 50% (alinhada com centro)
			rotation: 0
		},  // Carta 4: Futuro Próximo (DIREITA da cruz)

		{
			x: centerX,     // 38% (alinhada com centro)
			y: 80,          // 80% (ABAIXO do centro - y maior)
			rotation: 0
		},  // Carta 5: Fundação/Base (BASE da cruz)

		{
			x: 8,           // 8% (ESQUERDA do centro)
			y: centerY,     // 50% (alinhada com centro)
			rotation: 0
		},  // Carta 6: Passado Recente (ESQUERDA da cruz)

		// ════════════════════════════════════════════════════════
		// COLUNA DIREITA (Staff) - 4 cartas verticais
		// Ordem: 10 (topo) → 9 → 8 → 7 (base)
		// ════════════════════════════════════════════════════════
		{
			x: staffX,      // 85%
			y: 80,          // 80% (BASE da coluna - y maior)
			rotation: 0
		},  // Carta 7: Consulente (mais embaixo)

		{
			x: staffX,      // 85%
			y: 60,          // 60% (meio-baixo da coluna)
			rotation: 0
		},  // Carta 8: Entorno/Ambiente

		{
			x: staffX,      // 85%
			y: 40,          // 40% (meio-cima da coluna)
			rotation: 0
		},  // Carta 9: Esperanças/Medos

		{
			x: staffX,      // 85%
			y: 20,          // 20% (TOPO da coluna - y menor)
			rotation: 0
		},  // Carta 10: Desfecho Final (mais acima)
	]
}

/**
 * Layout do Conselho do Universo
 * Pentagrama místico com carta central
 */
function getUniverseAdviceLayout(): CalculatedPosition[] {
	// 1 carta central + 5 em pentagrama ao redor
	const centerX = 50
	const centerY = 50
	const radius = 35

	const positions: CalculatedPosition[] = [
		// Carta central
		{ x: centerX, y: centerY, rotation: 0 },
	]

	// 5 cartas em pentagrama
	for (let i = 0; i < 5; i++) {
		const angle = (i * 72 - 90) * (Math.PI / 180) // -90 para começar no topo
		positions.push({
			x: centerX + radius * Math.cos(angle),
			y: centerY + radius * Math.sin(angle),
			rotation: 0,
		})
	}

	return positions
}

/**
 * Otimiza posições existentes para evitar sobreposição
 * Sistema dinâmico que funciona para qualquer tiragem
 */
function optimizeExistingPositions(spread: TarotSpread): CalculatedPosition[] {
	const positions = spread.positions.map(pos => ({
		x: pos.x,
		y: pos.y,
		rotation: pos.rotation,
	}))

	// Threshold de colisão baseado no tamanho da carta
	const COLLISION_THRESHOLD = Math.max(
		CARD_CONFIG.widthPercent + CARD_CONFIG.minSpacingX,
		CARD_CONFIG.heightPercent + CARD_CONFIG.minSpacingY
	)

	// Múltiplas passadas para garantir não-sobreposição
	const MAX_ITERATIONS = 5
	for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
		let hasCollision = false

		for (let i = 0; i < positions.length; i++) {
			for (let j = i + 1; j < positions.length; j++) {
				const pos1 = positions[i]!
				const pos2 = positions[j]!

				// Calcula distância Euclidiana
				const distance = Math.sqrt(
					Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
				)

				// Se muito próximos, afasta
				if (distance < COLLISION_THRESHOLD) {
					hasCollision = true

					// Calcula ângulo entre as cartas
					const angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x)

					// Offset proporcional à distância faltante
					const offset = (COLLISION_THRESHOLD - distance) / 2

					// Afasta ambas as cartas
					pos1.x -= Math.cos(angle) * offset
					pos1.y -= Math.sin(angle) * offset
					pos2.x += Math.cos(angle) * offset
					pos2.y += Math.sin(angle) * offset

					// Garante limites (margem de 5% nas bordas)
					pos1.x = Math.max(8, Math.min(92, pos1.x))
					pos1.y = Math.max(12, Math.min(88, pos1.y))
					pos2.x = Math.max(8, Math.min(92, pos2.x))
					pos2.y = Math.max(12, Math.min(88, pos2.y))
				}
			}
		}

		// Se nenhuma colisão detectada, para
		if (!hasCollision) break
	}

	return positions
}

/**
 * Algoritmo de grid automático para tiragens sem coordenadas
 * Distribui cartas uniformemente com espaçamento adequado
 */
export function generateGridLayout(cardCount: number): CalculatedPosition[] {
	const positions: CalculatedPosition[] = []

	// Layouts otimizados por número de cartas
	if (cardCount === 1) {
		// Carta única centrada
		positions.push({ x: 50, y: 50, rotation: 0 })

	} else if (cardCount === 2) {
		// Duas cartas lado a lado
		positions.push(
			{ x: 30, y: 50, rotation: 0 },
			{ x: 70, y: 50, rotation: 0 }
		)

	} else if (cardCount === 3) {
		// Três cartas em linha (Passado, Presente, Futuro)
		positions.push(
			{ x: 20, y: 50, rotation: 0 },
			{ x: 50, y: 50, rotation: 0 },
			{ x: 80, y: 50, rotation: 0 }
		)

	} else if (cardCount === 4) {
		// Grid 2x2 ou cruz simples
		positions.push(
			{ x: 25, y: 30, rotation: 0 },
			{ x: 75, y: 30, rotation: 0 },
			{ x: 25, y: 70, rotation: 0 },
			{ x: 75, y: 70, rotation: 0 }
		)

	} else if (cardCount === 5) {
		// Pentagrama (5 pontas)
		const radius = 38
		const centerX = 50
		const centerY = 50
		for (let i = 0; i < 5; i++) {
			const angle = (i * 72 - 90) * (Math.PI / 180)
			positions.push({
				x: centerX + radius * Math.cos(angle),
				y: centerY + radius * Math.sin(angle),
				rotation: 0,
			})
		}

	} else if (cardCount === 6) {
		// Duas fileiras de 3
		const y1 = 35
		const y2 = 65
		const xs = [20, 50, 80]

		xs.forEach(x => positions.push({ x, y: y1, rotation: 0 }))
		xs.forEach(x => positions.push({ x, y: y2, rotation: 0 }))

	} else if (cardCount === 7) {
		// Hexagrama + centro
		const radius = 38
		const centerX = 50
		const centerY = 50

		// Centro
		positions.push({ x: centerX, y: centerY, rotation: 0 })

		// 6 ao redor
		for (let i = 0; i < 6; i++) {
			const angle = (i * 60 - 90) * (Math.PI / 180)
			positions.push({
				x: centerX + radius * Math.cos(angle),
				y: centerY + radius * Math.sin(angle),
				rotation: 0,
			})
		}

	} else {
		// Grid genérico para 8+ cartas
		const cols = Math.ceil(Math.sqrt(cardCount))
		const rows = Math.ceil(cardCount / cols)

		// Padding adaptativo
		const paddingX = 12
		const paddingY = 15

		// Espaçamento entre cartas
		const spaceX = (100 - 2 * paddingX) / (cols - 1 || 1)
		const spaceY = (100 - 2 * paddingY) / (rows - 1 || 1)

		for (let i = 0; i < cardCount; i++) {
			const col = i % cols
			const row = Math.floor(i / cols)
			positions.push({
				x: paddingX + col * spaceX,
				y: paddingY + row * spaceY,
				rotation: 0,
			})
		}
	}

	return positions
}

/**
 * Calcula escala da carta baseado no número de cartas
 * Mais cartas = cartas menores para caberem na tela
 */
export function getCardScale(cardCount: number): string {
	if (cardCount <= 3) return 'scale-100'
	if (cardCount <= 6) return 'scale-90'
	if (cardCount <= 10) return 'scale-80'
	return 'scale-75'
}
