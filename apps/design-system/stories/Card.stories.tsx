import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Layers, Sparkles } from 'lucide-react'
import Image from 'next/image'

/**
 * **Card Component**
 *
 * Card component with mystical design patterns used in the Tarot app.
 * Features gradient backgrounds, hover effects, shimmer animations, and
 * spiritual aesthetics.
 *
 * This demonstrates the actual card pattern used in /decks route.
 */

// ═══════════════════════════════════════════════════════════════════════════
// Deck Card - Production Design from /decks
// ═══════════════════════════════════════════════════════════════════════════

interface DeckCardProps {
  name: string
  tradition?: string
  description?: string
  imageUrl?: string
  year?: number
  cardCount?: number
  tagCount?: number
  onClick?: () => void
}

function DeckCard({
  name,
  tradition,
  description,
  imageUrl,
  year,
  cardCount = 78,
  tagCount = 12,
  onClick,
}: DeckCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10 transition-all hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 hover:-translate-y-1 cursor-pointer"
    >
      {/* Mystical glow backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-violet-500/0 to-indigo-500/0 opacity-0 group-hover:opacity-100 group-hover:from-purple-500/5 group-hover:via-violet-500/5 group-hover:to-indigo-500/5 transition-all duration-500" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Cover Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-indigo-900/20">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border border-purple-500/30">
              <Layers className="size-10 text-purple-600/50 dark:text-purple-400/50" strokeWidth={1.5} />
            </div>
          </div>
        )}

        {/* Year badge */}
        {year && (
          <div className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-foreground/80 border border-border/40">
            {year}
          </div>
        )}

        {/* Sparkle icon on hover */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Sparkles className="size-5 text-purple-400 animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-3">
        <div>
          <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-400 dark:group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
            {name}
          </h3>
          {tradition && (
            <p className="mt-1.5 text-sm text-muted-foreground flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-purple-500/50" />
              {tradition}
            </p>
          )}
        </div>

        {description && (
          <p className="line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed">
            {description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 pt-3 text-xs text-muted-foreground border-t border-border/30">
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-purple-500/70" />
            <span className="font-medium">{cardCount}</span>
            <span>cartas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-indigo-500/70" />
            <span className="font-medium">{tagCount}</span>
            <span>tags</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Loading Skeleton
// ═══════════════════════════════════════════════════════════════════════════

function DeckCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10">
      <div className="aspect-[4/3] w-full animate-pulse bg-gradient-to-br from-muted to-muted/50" />
      <div className="p-6 space-y-3">
        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted/70" />
        <div className="h-3 w-full animate-pulse rounded bg-muted/50" />
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Storybook Configuration
// ═══════════════════════════════════════════════════════════════════════════

const meta = {
  title: 'Components/Molecules/Card',
  component: DeckCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Mystical card component with gradient backgrounds, hover effects, and shimmer animations. This is the actual design pattern used in the /decks route of the Tarot application.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DeckCard>

export default meta
type Story = StoryObj<typeof meta>

// ═══════════════════════════════════════════════════════════════════════════
// Basic Examples
// ═══════════════════════════════════════════════════════════════════════════

export const Default: Story = {
  args: {
    name: 'Rider-Waite Tarot',
    tradition: 'Tarot Tradicional',
    description:
      'O baralho mais icônico e amplamente utilizado, criado por A. E. Waite e ilustrado por Pamela Colman Smith em 1909.',
    imageUrl: 'https://images.unsplash.com/photo-1636690619969-d90d84815c84?w=800&auto=format&fit=crop',
    year: 1909,
    cardCount: 78,
    tagCount: 22,
  },
}

export const WithoutImage: Story = {
  args: {
    name: 'Tarot de Marselha',
    tradition: 'Tradição Francesa',
    description: 'Baralho clássico francês com simbolismo profundo e cores vibrantes.',
    year: 1650,
    cardCount: 78,
    tagCount: 15,
  },
}

export const Loading: Story = {
  render: () => <DeckCardSkeleton />,
}

// ═══════════════════════════════════════════════════════════════════════════
// Showcase - Multiple Cards
// ═══════════════════════════════════════════════════════════════════════════

export const DeckGrid: Story = {
  render: () => (
    <div
      style={{
        padding: '2rem',
        background: 'oklch(0.145 0 0)',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: '3rem',
          padding: '2rem',
          background:
            'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)',
          borderRadius: '1rem',
          border: '1px solid rgba(168, 85, 247, 0.2)',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #a855f7 0%, #8b5cf6 50%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
          }}
        >
          Deck Cards
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Production card design with mystical effects
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <DeckCard
          name="Rider-Waite Tarot"
          tradition="Tarot Tradicional"
          description="O baralho mais icônico e amplamente utilizado, criado por A. E. Waite e ilustrado por Pamela Colman Smith em 1909."
          imageUrl="https://images.unsplash.com/photo-1636690619969-d90d84815c84?w=800&auto=format&fit=crop"
          year={1909}
          cardCount={78}
          tagCount={22}
        />
        <DeckCard
          name="Tarot de Marselha"
          tradition="Tradição Francesa"
          description="Baralho clássico francês com simbolismo profundo e cores vibrantes que remontam ao século XVII."
          imageUrl="https://images.unsplash.com/photo-1595123550441-d377e1f7d46b?w=800&auto=format&fit=crop"
          year={1650}
          cardCount={78}
          tagCount={15}
        />
        <DeckCard
          name="Thoth Tarot"
          tradition="Thelema"
          description="Criado por Aleister Crowley e Lady Frieda Harris, um baralho esotérico profundamente simbólico."
          imageUrl="https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&auto=format&fit=crop"
          year={1969}
          cardCount={78}
          tagCount={18}
        />
        <DeckCard
          name="Oracle Cards"
          tradition="Oráculo Moderno"
          description="Conjunto místico de cartas oraculares para guiar jornadas espirituais e autoconhecimento."
          cardCount={44}
          tagCount={8}
        />
        <DeckCard
          name="Lenormand Deck"
          tradition="Cartomancia"
          description="Sistema de 36 cartas com simbolismo direto e prático, perfeito para leituras cotidianas."
          year={1850}
          cardCount={36}
          tagCount={10}
        />
        <DeckCardSkeleton />
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(168, 85, 247, 0.05)',
          borderRadius: '0.75rem',
          border: '1px solid rgba(168, 85, 247, 0.2)',
        }}
      >
        <p
          style={{
            margin: 0,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
          }}
        >
          💡 Hover over cards to see mystical effects: glow, shimmer, and transformation
        </p>
      </div>
    </div>
  ),
}

// ═══════════════════════════════════════════════════════════════════════════
// Interactive States
// ═══════════════════════════════════════════════════════════════════════════

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        padding: '2rem',
        background: 'oklch(0.145 0 0)',
        minHeight: '100vh',
      }}
    >
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#a855f7',
          marginBottom: '1.5rem',
        }}
      >
        Card States
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Default State */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.9)' }}>
            Default State
          </h3>
          <DeckCard
            name="Sample Deck"
            tradition="Traditional"
            description="This is how the card appears in its default state."
            cardCount={78}
            tagCount={12}
          />
        </div>

        {/* With Image */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.9)' }}>
            With Image
          </h3>
          <DeckCard
            name="Visual Deck"
            tradition="Modern"
            description="Card with cover image and year badge."
            imageUrl="https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&auto=format&fit=crop"
            year={2023}
            cardCount={78}
            tagCount={12}
          />
        </div>

        {/* Loading State */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.9)' }}>
            Loading State
          </h3>
          <DeckCardSkeleton />
        </div>
      </div>
    </div>
  ),
}
