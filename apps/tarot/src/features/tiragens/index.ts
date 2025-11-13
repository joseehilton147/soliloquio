/**
 * Feature Module: Tiragens
 *
 * Módulo completo para sistema de tiragens de Tarô.
 * Gerencia categorias, visualização e interação com spreads.
 *
 * Estrutura DDD:
 * - domain/: Categorias e dados das tiragens (camada pura)
 * - components/: Componentes React para UI de tiragens
 *
 * @example
 * ```tsx
 * import { ALL_CATEGORIES, SpreadCanvas, SpreadCard } from '@/features/tiragens'
 * ```
 */

export * from './domain'
export * from './components'
