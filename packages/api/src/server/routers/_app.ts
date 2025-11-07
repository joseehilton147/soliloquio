/**
 * Router principal do tRPC
 * Combina todos os sub-routers
 */

import { router } from '../trpc';
import { tarotRouter } from './tarot';

export const appRouter = router({
  tarot: tarotRouter,
});

export type AppRouter = typeof appRouter;
