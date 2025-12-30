/**
 * Barrel export para componentes de spread
 *
 * Componentes específicos da página de tiragem dinâmica (/tiragens/[slug])
 */

// Cliente principal do spread (alias para compatibilidade)
export { TiragemPageClient, TiragemPageClient as TiragemClient } from './tiragem-client'

// Cards (renderização de cartas)
export { CardBack, CardFront, CardTooltip, CosmicCard } from './cards'

// Effects (efeitos visuais)
export { CosmicBackground, EnergyConnections } from './effects'

// Layouts (posicionamento de cartas)
export {
	CelticCrossLayout,
	recalculatePositions,
	generateGridLayout,
	getCardScale,
	calculateContainerDimensions,
	type CalculatedPosition,
} from './layouts'

// Guides (guias de interpretação)
export { CelticCrossGuide, UniverseAdviceGuide, YesNoGuide } from './guides'
