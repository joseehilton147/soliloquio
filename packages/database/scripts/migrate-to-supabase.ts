/**
 * Script to migrate "O Mago" card from SQLite to Supabase PostgreSQL
 * Run with: pnpm tsx scripts/migrate-to-supabase.ts
 */

import { PrismaClient } from '../node_modules/.prisma/client/index.js';

// Use direct connection for this migration script
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
});

// Data from the existing SQLite database
const cardData = {
  id: '04a06c3a-3d86-485c-9373-feb85c2f5b3b',
  name: 'O Mago',
  slug: 'o-mago',
  summary: 'Manifestação de poder pessoal e habilidades criativas',
  description: 'O Mago é o arquétipo do manifestador, aquele que possui todas as ferramentas necessárias para transformar a vontade em realidade.',
  imageUrl: '/images/cartas/1736247946887-67885d3a3e85dd001ea62e88.jpg',
  verticalMeaning: ['Manifestação', 'Poder pessoal', 'Habilidade', 'Criatividade'] as any,
  invertedMeaning: ['Manipulação', 'Desconexão com o poder pessoal', 'Falta de foco'] as any,
  numerology: '1',
  astrology: 'Mercúrio',
  typesOfReading: [
    {
      type: 'general',
      read: 'O Mago representa o início de um novo ciclo onde você tem todos os recursos necessários para manifestar seus desejos.',
    },
    {
      type: 'love-relationship',
      read: 'No amor, O Mago indica atração magnética e a capacidade de criar a realidade desejada no relacionamento.',
    },
    {
      type: 'career-money',
      read: 'Profissionalmente, é um momento de usar suas habilidades únicas para criar oportunidades e prosperidade.',
    },
    {
      type: 'personal-spiritual',
      read: 'Espiritualmente, O Mago convida você a reconhecer seu poder de co-criação com o Universo.',
    },
    {
      type: 'inverted',
      read: 'Invertido, O Mago pode indicar uso inadequado de poder, manipulação ou falta de confiança nas próprias capacidades.',
    },
  ],
};

async function migrateData() {
  console.log('🔄 Migrating "O Mago" to Supabase PostgreSQL...\n');

  try {
    // Check if card already exists
    const existing = await prisma.tarotCard.findUnique({
      where: { id: cardData.id },
    });

    if (existing) {
      console.log('⚠️  Card already exists in PostgreSQL, skipping...');
      return;
    }

    // Create card in PostgreSQL
    const card = await prisma.tarotCard.create({
      data: {
        ...cardData,
        typesOfReading: {
          create: cardData.typesOfReading,
        },
      },
      include: {
        typesOfReading: true,
      },
    });

    console.log(`✅ ${card.name} migrated successfully!`);
    console.log(`   - ID: ${card.id}`);
    console.log(`   - Slug: ${card.slug}`);
    console.log(`   - Reading types: ${card.typesOfReading.length}`);
    console.log('\n✨ Migration complete!');
  } catch (error: any) {
    console.error('❌ Error during migration:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrateData();
