/**
 * Cliente tRPC para o app Tarot
 * Conecta aos endpoints do PRÓPRIO app (não externa)
 */

import { createTRPCReact, type CreateTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@workspace/api/server'

export const trpc: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter>()
