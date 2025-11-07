/**
 * Cliente tRPC para o app Tarot
 * Conecta aos endpoints do PRÓPRIO app (não externa)
 */

import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@workspace/api/server'

export const trpc = createTRPCReact<AppRouter>()
