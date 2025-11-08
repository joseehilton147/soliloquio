/**
 * tRPC Router - Tarot
 * Endpoints para gerenciamento das cartas de Tarot
 */

import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { createTarotCardSchema, updateTarotCardSchema } from '@workspace/core/tarot';
import { generateSlug } from '../../lib/slug';

export const tarotRouter = router({
  /**
   * Buscar todas as cartas
   */
  getAll: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const { limit = 50, offset = 0 } = input || {};

      const [cards, total] = await Promise.all([
        ctx.prisma.tarotCard.findMany({
          take: limit,
          skip: offset,
          include: {
            typesOfReading: true,
          },
          orderBy: {
            numerology: 'asc',
          },
        }),
        ctx.prisma.tarotCard.count(),
      ]);

      return {
        cards,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      };
    }),

  /**
   * Buscar carta por ID
   */
  getById: publicProcedure.input(z.string().uuid()).query(async ({ ctx, input }) => {
    const card = await ctx.prisma.tarotCard.findUnique({
      where: { id: input },
      include: {
        typesOfReading: true,
      },
    });

    if (!card) {
      throw new Error('Carta não encontrada');
    }

    return card;
  }),

  /**
   * Buscar carta por nome
   */
  getByName: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const card = await ctx.prisma.tarotCard.findUnique({
      where: { name: input },
      include: {
        typesOfReading: true,
      },
    });

    if (!card) {
      throw new Error('Carta não encontrada');
    }

    return card;
  }),

  /**
   * Buscar carta por slug
   */
  getBySlug: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const card = await ctx.prisma.tarotCard.findUnique({
      where: { slug: input },
      include: {
        typesOfReading: true,
      },
    });

    if (!card) {
      throw new Error('Carta não encontrada');
    }

    return card;
  }),

  /**
   * Criar nova carta
   */
  create: publicProcedure
    .input(createTarotCardSchema)
    .mutation(async ({ ctx, input }) => {
      const { typesOfReading, ...cardData } = input;

      // Generate slug from card name
      const slug = generateSlug(cardData.name);

      const card = await ctx.prisma.tarotCard.create({
        data: {
          ...cardData,
          slug,
          typesOfReading: {
            create: typesOfReading.map((reading) => ({
              type: reading.type,
              read: reading.read,
            })),
          },
        },
        include: {
          typesOfReading: true,
        },
      });

      return card;
    }),

  /**
   * Atualizar carta existente
   */
  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateTarotCardSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      const { typesOfReading, ...cardData } = data;

      // Generate new slug if name is being updated
      const dataWithSlug = cardData.name
        ? { ...cardData, slug: generateSlug(cardData.name) }
        : cardData;

      // Se typesOfReading foi fornecido, deletar os antigos e criar novos
      if (typesOfReading) {
        await ctx.prisma.readingType.deleteMany({
          where: { cardId: id },
        });
      }

      const card = await ctx.prisma.tarotCard.update({
        where: { id },
        data: {
          ...dataWithSlug,
          ...(typesOfReading && {
            typesOfReading: {
              create: typesOfReading.map((reading) => ({
                type: reading.type,
                read: reading.read,
              })),
            },
          }),
          updatedAt: new Date(),
        },
        include: {
          typesOfReading: true,
        },
      });

      return card;
    }),

  /**
   * Deletar carta
   */
  delete: publicProcedure.input(z.string().uuid()).mutation(async ({ ctx, input }) => {
    await ctx.prisma.tarotCard.delete({
      where: { id: input },
    });

    return { success: true };
  }),

  /**
   * Buscar tags com fuzzy search (para autocomplete)
   */
  searchTags: publicProcedure
    .input(
      z.object({
        deckId: z.string().uuid(),
        type: z.enum(['vertical', 'inverted']),
        query: z.string().min(1),
        limit: z.number().min(1).max(20).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { deckId, type, query, limit } = input;

      // Fuzzy search usando pg_trgm com similarity
      // similarity() retorna valor entre 0 e 1 (quanto maior, mais similar)
      const tags = await ctx.prisma.$queryRaw<
        Array<{ id: string; value: string; usageCount: number; similarity: number }>
      >`
        SELECT
          id,
          value,
          "usageCount",
          similarity(value, ${query}) as similarity
        FROM tarot_tags
        WHERE "deckId" = ${deckId}
          AND type = ${type}
          AND similarity(value, ${query}) > 0.2
        ORDER BY similarity DESC, "usageCount" DESC
        LIMIT ${limit}
      `;

      return tags;
    }),

  /**
   * Buscar todos os decks disponíveis
   */
  getDecks: publicProcedure.query(async ({ ctx }) => {
    const decks = await ctx.prisma.tarotDeck.findMany({
      orderBy: {
        year: 'asc',
      },
      include: {
        _count: {
          select: {
            cards: true,
            tags: true,
          },
        },
      },
    });

    return decks;
  }),
});
