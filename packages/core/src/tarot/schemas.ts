import { z } from 'zod';

/**
 * Naipes do Tarot (apenas para Arcanos Menores)
 */
export const CardSuitEnum = z.enum([
  'COPAS',    // Elemento Água - Emoções
  'PAUS',     // Elemento Fogo - Ação
  'OUROS',    // Elemento Terra - Material
  'ESPADAS',  // Elemento Ar - Intelecto
]);

export type CardSuitValue = z.infer<typeof CardSuitEnum>;

/**
 * Tipos de leitura disponíveis para cada carta
 */
export const ReadingTypeEnum = z.enum([
  'general',
  'love-relationship',
  'career-money',
  'personal-spiritual',
  'inverted',
]);

export type ReadingTypeValue = z.infer<typeof ReadingTypeEnum>;

/**
 * Schema para um tipo de leitura específico
 */
export const readingTypeSchema = z.object({
  id: z.string().uuid().optional(),
  type: ReadingTypeEnum,
  read: z.string().min(10, 'Leitura deve ter no mínimo 10 caracteres'),
  cardId: z.string().uuid().optional(),
});

export type ReadingType = z.infer<typeof readingTypeSchema>;

/**
 * Schema completo de uma carta de Tarot
 */
export const tarotCardSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Nome da carta é obrigatório'),
  slug: z.string().optional().nullable(),
  deckId: z.string().uuid().optional().nullable(),
  cardType: z.string().optional().nullable(),
  suit: CardSuitEnum.optional().nullable(),
  summary: z.string().min(10, 'Resumo deve ter no mínimo 10 caracteres'),
  description: z.string().min(50, 'Descrição deve ter no mínimo 50 caracteres'),
  imageUrl: z.string().optional().nullable(),
  verticalMeaning: z.array(z.string()).min(1, 'Deve ter ao menos um significado vertical'),
  invertedMeaning: z.array(z.string()).min(1, 'Deve ter ao menos um significado invertido'),
  numerology: z.string(),
  astrology: z.string().optional().nullable(),
  typesOfReading: z.array(readingTypeSchema).min(1, 'Deve ter ao menos um tipo de leitura'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TarotCard = z.infer<typeof tarotCardSchema>;

/**
 * Schema para criação de nova carta (sem IDs e timestamps)
 */
export const createTarotCardSchema = tarotCardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateTarotCard = z.infer<typeof createTarotCardSchema>;

/**
 * Schema para atualização de carta (todos campos opcionais)
 */
export const updateTarotCardSchema = createTarotCardSchema.partial();

export type UpdateTarotCard = z.infer<typeof updateTarotCardSchema>;
