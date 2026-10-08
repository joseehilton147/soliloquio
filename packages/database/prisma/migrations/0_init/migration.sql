-- CreateEnum
CREATE TYPE "CardSuit" AS ENUM ('COPAS', 'PAUS', 'OUROS', 'ESPADAS');

-- CreateEnum
CREATE TYPE "SpreadCategory" AS ENUM ('QUICK', 'INSIGHT', 'RELATIONSHIP', 'DECISION', 'DEEP', 'CUSTOM');

-- CreateEnum
CREATE TYPE "SpreadLayout" AS ENUM ('LINEAR', 'TRIANGLE', 'CROSS', 'HORSESHOE', 'CELTIC', 'CIRCLE', 'CUSTOM');

-- CreateTable
CREATE TABLE "tarot_decks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "publisher" TEXT,
    "year" INTEGER,
    "tradition" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tarot_decks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarot_tags" (
    "id" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tarot_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarot_cards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "deckId" TEXT,
    "cardType" TEXT,
    "suit" "CardSuit",
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "verticalMeaning" JSONB NOT NULL,
    "invertedMeaning" JSONB NOT NULL,
    "numerology" TEXT NOT NULL,
    "astrology" TEXT,
    "reflectionMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tarot_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_types" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "read" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "reading_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_spreads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "whenToUse" TEXT NOT NULL,
    "category" "SpreadCategory" NOT NULL,
    "layout" "SpreadLayout" NOT NULL,
    "cardCount" INTEGER NOT NULL,
    "difficulty" INTEGER,
    "estimatedTime" INTEGER,
    "themeColor" TEXT,
    "icon" TEXT,
    "source" TEXT,
    "tags" TEXT[],
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "custom_spreads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spread_positions" (
    "id" TEXT NOT NULL,
    "spreadId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "positionKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "rotation" INTEGER,
    "emphasis" TEXT,
    "connections" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spread_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spread_readings" (
    "id" TEXT NOT NULL,
    "spreadId" TEXT NOT NULL,
    "question" TEXT,
    "interpretation" TEXT,
    "drawnCards" JSONB NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spread_readings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tarot_decks_name_key" ON "tarot_decks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tarot_decks_slug_key" ON "tarot_decks"("slug");

-- CreateIndex
CREATE INDEX "tarot_tags_deckId_type_value_idx" ON "tarot_tags"("deckId", "type", "value");

-- CreateIndex
CREATE UNIQUE INDEX "tarot_tags_deckId_value_type_key" ON "tarot_tags"("deckId", "value", "type");

-- CreateIndex
CREATE INDEX "tarot_cards_deckId_idx" ON "tarot_cards"("deckId");

-- CreateIndex
CREATE UNIQUE INDEX "tarot_cards_deckId_slug_key" ON "tarot_cards"("deckId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "custom_spreads_slug_key" ON "custom_spreads"("slug");

-- CreateIndex
CREATE INDEX "custom_spreads_category_idx" ON "custom_spreads"("category");

-- CreateIndex
CREATE INDEX "custom_spreads_isPublic_idx" ON "custom_spreads"("isPublic");

-- CreateIndex
CREATE INDEX "spread_positions_spreadId_order_idx" ON "spread_positions"("spreadId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "spread_positions_spreadId_positionKey_key" ON "spread_positions"("spreadId", "positionKey");

-- CreateIndex
CREATE INDEX "spread_readings_spreadId_idx" ON "spread_readings"("spreadId");

-- CreateIndex
CREATE INDEX "spread_readings_readAt_idx" ON "spread_readings"("readAt");

-- AddForeignKey
ALTER TABLE "tarot_tags" ADD CONSTRAINT "tarot_tags_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "tarot_decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarot_cards" ADD CONSTRAINT "tarot_cards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "tarot_decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_types" ADD CONSTRAINT "reading_types_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "tarot_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spread_positions" ADD CONSTRAINT "spread_positions_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "custom_spreads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spread_readings" ADD CONSTRAINT "spread_readings_spreadId_fkey" FOREIGN KEY ("spreadId") REFERENCES "custom_spreads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

