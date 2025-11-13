/**
 * Feature Module: Naipes
 *
 * Módulo completo para gerenciamento dos 4 naipes dos Arcanos Menores:
 * Copas (Água), Paus (Fogo), Ouros (Terra), Espadas (Ar).
 *
 * Estrutura DDD:
 * - domain/: Dados, tipos e configurações (camada pura)
 * - components/: Componentes React para UI dos naipes
 *
 * @example
 * ```tsx
 * import { NAIPES, NaipeCard, NaipesHeroSection } from '@/features/naipes'
 * ```
 */

export * from './domain'
export * from './components'
