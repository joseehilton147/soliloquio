/**
 * Barrel export para componentes de página de tiragens
 *
 * Componentes específicos da página /tiragens (index)
 */

export { TiragensHeroSection } from './tiragens-hero-section'
export { TiragensLearningPath } from './tiragens-learning-path'
export { TiragemCategoryPortalCard } from './tiragem-category-portal-card'
export { TiragensCustomCTA } from './tiragens-custom-cta'

// Re-export type do domain para compatibilidade
export type { TiragemCategoryData } from '../../domain/tiragens.types'
