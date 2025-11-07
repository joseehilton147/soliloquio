// Importa diretamente do cliente gerado para evitar problemas de resolução em monorepo
import { PrismaClient } from '../node_modules/.prisma/client/index.js';

// Singleton pattern para Prisma Client
// Evita múltiplas instâncias em desenvolvimento (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Re-exporta tipos do Prisma
export * from '../node_modules/.prisma/client/index.js';
