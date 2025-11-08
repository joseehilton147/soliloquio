/**
 * Seed para criar o baralho Rider-Waite e associar cartas existentes
 *
 * Este script:
 * 1. Habilita extensão pg_trgm (fuzzy search)
 * 2. Cria o deck "Rider-Waite Smith"
 * 3. Associa todas as cartas existentes ao deck
 * 4. Extrai tags de verticalMeaning/invertedMeaning
 *
 * Execução: pnpm tsx src/scripts/seed-rider-waite.ts
 */

import { PrismaClient } from '../../node_modules/.prisma/client/index.js';

// Usar DIRECT_URL para operações administrativas (extensões SQL)
const prisma = new PrismaClient({
  datasourceUrl: process.env.DIRECT_URL,
});

async function main() {
  console.log('🌟 Iniciando seed do Rider-Waite...\n');

  try {
    // ═══════════════════════════════════════════════════════
    // 1. Habilitar pg_trgm para fuzzy search
    // ═══════════════════════════════════════════════════════
    console.log('🔍 Habilitando pg_trgm...');
    await prisma.$executeRawUnsafe('CREATE EXTENSION IF NOT EXISTS pg_trgm;');

    // Criar índice GIN para fuzzy search (se não existir)
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS tarot_tags_value_trgm_idx
      ON tarot_tags
      USING gin (value gin_trgm_ops);
    `);

    console.log('✅ pg_trgm habilitado\n');

    // ═══════════════════════════════════════════════════════
    // 2. Criar deck Rider-Waite (se não existir)
    // ═══════════════════════════════════════════════════════
    console.log('📚 Criando deck Rider-Waite...');

    const riderWaite = await prisma.tarotDeck.upsert({
      where: { slug: 'rider-waite' },
      update: {}, // Não atualiza se já existir
      create: {
        name: 'Rider-Waite Smith',
        slug: 'rider-waite',
        description: 'O baralho de Tarot mais icônico e amplamente utilizado, criado por Arthur Edward Waite e ilustrado por Pamela Colman Smith em 1909. Base para a maioria dos tarôs modernos.',
        publisher: 'Rider Company / US Games Systems',
        year: 1909,
        tradition: 'Hermética e Qabalística',
        imageUrl: null,
      },
    });

    console.log(`✅ Deck criado: ${riderWaite.name} (ID: ${riderWaite.id})\n`);

    // ═══════════════════════════════════════════════════════
    // 3. Associar todas as cartas existentes ao deck
    // ═══════════════════════════════════════════════════════
    console.log('🃏 Associando cartas existentes ao deck...');

    const cardsWithoutDeck = await prisma.tarotCard.findMany({
      where: { deckId: null },
      select: { id: true, name: true },
    });

    if (cardsWithoutDeck.length > 0) {
      console.log(`   Encontradas ${cardsWithoutDeck.length} cartas sem deck`);

      const updatedCards = await prisma.tarotCard.updateMany({
        where: { deckId: null },
        data: { deckId: riderWaite.id },
      });

      console.log(`✅ ${updatedCards.count} cartas associadas ao Rider-Waite\n`);
    } else {
      console.log('   Todas as cartas já possuem deck atribuído\n');
    }

    // ═══════════════════════════════════════════════════════
    // 4. Extrair tags de verticalMeaning/invertedMeaning
    // ═══════════════════════════════════════════════════════
    console.log('🏷️  Extraindo tags dos significados...');

    const allCards = await prisma.tarotCard.findMany({
      where: { deckId: riderWaite.id },
      select: {
        id: true,
        name: true,
        verticalMeaning: true,
        invertedMeaning: true,
      },
    });

    console.log(`   Processando ${allCards.length} cartas...`);

    // Map para contar uso de cada tag
    const tagUsage = new Map<string, number>();

    for (const card of allCards) {
      // Processar significados verticais
      if (Array.isArray(card.verticalMeaning)) {
        for (const meaning of card.verticalMeaning) {
          if (typeof meaning === 'string' && meaning.trim()) {
            const key = `vertical:${meaning.toLowerCase().trim()}`;
            tagUsage.set(key, (tagUsage.get(key) || 0) + 1);
          }
        }
      }

      // Processar significados invertidos
      if (Array.isArray(card.invertedMeaning)) {
        for (const meaning of card.invertedMeaning) {
          if (typeof meaning === 'string' && meaning.trim()) {
            const key = `inverted:${meaning.toLowerCase().trim()}`;
            tagUsage.set(key, (tagUsage.get(key) || 0) + 1);
          }
        }
      }
    }

    console.log(`   Encontradas ${tagUsage.size} tags únicas`);

    // Criar tags no banco
    let createdTags = 0;
    for (const [key, count] of tagUsage.entries()) {
      const [type, value] = key.split(':');

      await prisma.tarotTag.upsert({
        where: {
          deckId_value_type: {
            deckId: riderWaite.id,
            value: value,
            type: type,
          },
        },
        update: {
          usageCount: count, // Atualiza contagem
        },
        create: {
          deckId: riderWaite.id,
          value: value,
          type: type,
          usageCount: count,
        },
      });

      createdTags++;
    }

    console.log(`✅ ${createdTags} tags criadas/atualizadas\n`);

    // ═══════════════════════════════════════════════════════
    // Resumo Final
    // ═══════════════════════════════════════════════════════
    const stats = {
      deck: await prisma.tarotDeck.count(),
      cards: await prisma.tarotCard.count({ where: { deckId: riderWaite.id } }),
      tags: await prisma.tarotTag.count({ where: { deckId: riderWaite.id } }),
      verticalTags: await prisma.tarotTag.count({
        where: { deckId: riderWaite.id, type: 'vertical' },
      }),
      invertedTags: await prisma.tarotTag.count({
        where: { deckId: riderWaite.id, type: 'inverted' },
      }),
    };

    console.log('═══════════════════════════════════════════════════════');
    console.log('✨ Seed concluído com sucesso!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`📊 Estatísticas:`);
    console.log(`   • Decks: ${stats.deck}`);
    console.log(`   • Cartas no Rider-Waite: ${stats.cards}`);
    console.log(`   • Tags totais: ${stats.tags}`);
    console.log(`   • Tags verticais: ${stats.verticalTags}`);
    console.log(`   • Tags invertidas: ${stats.invertedTags}`);
    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Erro durante seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
