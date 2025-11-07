/**
 * Inicialização do tRPC
 */

import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { type Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Exports reutilizáveis
 */
export const router = t.router;
export const publicProcedure = t.procedure;
