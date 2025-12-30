/**
 * Cliente tRPC para o app Tarot
 * Conecta aos endpoints do PRÓPRIO app (não externa)
 */

import { createTRPCReact, type CreateTRPCReact } from '@trpc/react-query'
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@workspace/api/server'

export const trpc: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter>()

// Tipos inferidos do router para reutilização
type RouterOutputs = inferRouterOutputs<AppRouter>
export type TarotCardFromRouter = RouterOutputs['tarot']['getAll']['cards'][number]
