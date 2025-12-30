/**
 * Barrel export para componentes de tiragens
 *
 * Exporta componentes React para visualização e interação com tiragens.
 *
 * Estrutura:
 * - page/: Componentes da página /tiragens (index)
 * - spread/: Componentes da página /tiragens/[slug] (dinâmico)
 */

// Componentes genéricos de spread (usados em múltiplos lugares)
export { SpreadCanvas } from './spread-canvas'
export { SpreadCard } from './spread-card'

// Componentes de página (tiragens index)
export {
	TiragensHeroSection,
	TiragensLearningPath,
	TiragemCategoryPortalCard,
	TiragensCustomCTA,
} from './page'

// Componentes de spread dinâmico (/tiragens/[slug])
export {
	// Cliente
	TiragemClient,
	// Cards
	CardBack,
	CardFront,
	CardTooltip,
	CosmicCard,
	// Effects
	CosmicBackground,
	EnergyConnections,
	// Layouts
	CelticCrossLayout,
	recalculatePositions,
	generateGridLayout,
	getCardScale,
	calculateContainerDimensions,
	type CalculatedPosition,
	// Guides
	CelticCrossGuide,
	UniverseAdviceGuide,
	YesNoGuide,
} from './spread'
