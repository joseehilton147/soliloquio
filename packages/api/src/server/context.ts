/**
 * Contexto tRPC
 * Compartilhado entre todos os routers
 */

import { prisma } from '@workspace/database/client';

export async function createContext() {
  return {
    prisma,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
