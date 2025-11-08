/**
 * Script para habilitar Fuzzy Search com pg_trgm no PostgreSQL/Supabase
 *
 * Execução: pnpm tsx src/scripts/enable-fuzzy-search.ts
 */

import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function enableFuzzySearch() {
  console.log('🔍 Habilitando Fuzzy Search com pg_trgm...\n');

  try {
    // Lê o arquivo SQL
    const sqlPath = join(__dirname, '../../prisma/sql/enable-fuzzy-search.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    // Divide por statements (separados por ;) e executa cada um
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      // Pula comentários de bloco
      if (statement.startsWith('/*') || statement.startsWith('COMMENT ON')) {
        await prisma.$executeRawUnsafe(statement + ';');
        continue;
      }

      console.log(`Executando: ${statement.split('\n')[0]}...`);
      await prisma.$executeRawUnsafe(statement + ';');
      console.log('✅ Sucesso\n');
    }

    // Verifica se a extensão está habilitada
    const result = await prisma.$queryRaw<{ extname: string }[]>`
      SELECT extname FROM pg_extension WHERE extname = 'pg_trgm';
    `;

    if (result.length > 0) {
      console.log('✨ pg_trgm habilitado com sucesso!');
      console.log('📊 Índices GIN criados para fuzzy search nas tags');
    } else {
      console.log('⚠️  pg_trgm não foi habilitado. Verifique as permissões.');
    }

  } catch (error) {
    console.error('❌ Erro ao habilitar fuzzy search:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

enableFuzzySearch();
