/**
 * @workspace/api - tRPC Server
 *
 * Exporta routers, context e types para uso nos apps
 */

export { appRouter, type AppRouter } from './routers/_app';
export { createContext, type Context } from './context';
export { router, publicProcedure } from './trpc';
