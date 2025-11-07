/**
 * Script to populate slug field for existing tarot cards
 * Run with: pnpm tsx scripts/populate-slugs.ts
 */

import { PrismaClient } from '../node_modules/.prisma/client/index.js';

const prisma = new PrismaClient();

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function populateSlugs() {
  console.log('🔄 Starting slug population...\n');

  const cards = await prisma.tarotCard.findMany({
    where: {
      slug: null,
    },
    select: {
      id: true,
      name: true,
    },
  });

  console.log(`📊 Found ${cards.length} cards without slugs\n`);

  for (const card of cards) {
    const slug = generateSlug(card.name);

    try {
      await prisma.tarotCard.update({
        where: { id: card.id },
        data: { slug },
      });

      console.log(`✅ ${card.name} -> ${slug}`);
    } catch (error) {
      console.error(`❌ Failed to update ${card.name}:`, error);
    }
  }

  console.log('\n✨ Slug population complete!');
}

populateSlugs()
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
