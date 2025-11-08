import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Layers, Sparkles } from 'lucide-react'

/**
 * **Card Component - Modular Mystical Design**
 *
 * Composable card system with mystical aesthetics. Mix and match components
 * like Lego blocks to build various card layouts while maintaining consistent
 * magical effects.
 *
 * Components: Card, CardImage, CardHeader, CardContent, CardFooter
 *
 * Based on the production design from /decks route with enhanced modularity.
 */

// ═══════════════════════════════════════════════════════════════════════════
// Card Root - Container with mystical effects
// ═══════════════════════════════════════════════════════════════════════════

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10 transition-all hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 hover:-translate-y-1 ${className}`}
        {...props}
      >
        {/* Mystical glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-violet-500/0 to-indigo-500/0 opacity-0 group-hover:opacity-100 group-hover:from-purple-500/5 group-hover:via-violet-500/5 group-hover:to-indigo-500/5 transition-all duration-500" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Content */}
        <div className="relative">{children}</div>
      </div>
    )
  }
)
Card.displayName = 'Card'

// ═══════════════════════════════════════════════════════════════════════════
// CardImage - Cover image with zoom effect
// ═══════════════════════════════════════════════════════════════════════════

interface CardImageProps {
  src?: string
  alt?: string
  badge?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

const CardImage = ({ src, alt = '', badge, icon = <Layers className="size-10 text-purple-600/50 dark:text-purple-400/50" strokeWidth={1.5} />, className = '' }: CardImageProps) => {
  const [imageError, setImageError] = React.useState(false)

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-indigo-900/20 ${className}`}>
      {src && !imageError ? (
        <>
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border border-purple-500/30">
            {icon}
          </div>
        </div>
      )}

      {/* Badge (year, category, etc.) */}
      {badge && (
        <div className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-foreground/80 border border-border/40">
          {badge}
        </div>
      )}

      {/* Sparkle icon on hover */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Sparkles className="size-5 text-purple-400 animate-pulse" />
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CardHeader - Title and metadata section
// ═══════════════════════════════════════════════════════════════════════════

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  return <div className={`p-6 space-y-3 ${className}`}>{children}</div>
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

const CardTitle = ({ children, className = '' }: CardTitleProps) => {
  return (
    <h3
      className={`text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-400 dark:group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all ${className}`}
    >
      {children}
    </h3>
  )
}

interface CardMetaProps {
  children: React.ReactNode
  className?: string
}

const CardMeta = ({ children, className = '' }: CardMetaProps) => {
  return (
    <p className={`mt-1.5 text-sm text-muted-foreground flex items-center gap-1.5 ${className}`}>
      <span className="size-1.5 rounded-full bg-purple-500/50" />
      {children}
    </p>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CardContent - Main body section
// ═══════════════════════════════════════════════════════════════════════════

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

const CardContent = ({ children, className = '' }: CardContentProps) => {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>
}

interface CardDescriptionProps {
  children: React.ReactNode
  lines?: number
  className?: string
}

const CardDescription = ({ children, lines = 2, className = '' }: CardDescriptionProps) => {
  return (
    <p className={`line-clamp-${lines} text-sm text-muted-foreground/80 leading-relaxed ${className}`}>
      {children}
    </p>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CardFooter - Stats and actions
// ═══════════════════════════════════════════════════════════════════════════

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

const CardFooter = ({ children, className = '' }: CardFooterProps) => {
  return (
    <div className={`px-6 pb-6 flex items-center gap-6 pt-3 text-xs text-muted-foreground border-t border-border/30 ${className}`}>
      {children}
    </div>
  )
}

interface CardStatProps {
  value: number
  label: string
  color?: 'purple' | 'indigo' | 'violet'
  className?: string
}

const CardStat = ({ value, label, color = 'purple', className = '' }: CardStatProps) => {
  const colorClasses = {
    purple: 'bg-purple-500/70',
    indigo: 'bg-indigo-500/70',
    violet: 'bg-violet-500/70',
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className={`size-1.5 rounded-full ${colorClasses[color]}`} />
      <span className="font-medium">{value}</span>
      <span>{label}</span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// CardSkeleton - Loading state
// ═══════════════════════════════════════════════════════════════════════════

const CardSkeleton = () => {
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
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Modular card system with mystical design. Compose cards using Card, CardImage, CardHeader, CardTitle, CardContent, CardFooter like Lego blocks. Includes hover effects: glow, shimmer, and transformation.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// ═══════════════════════════════════════════════════════════════════════════
// Basic Examples - Showing Composition
// ═══════════════════════════════════════════════════════════════════════════

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: '350px' }}>
      <CardImage
        src="https://picsum.photos/seed/tarot1/800/600"
        alt="Rider-Waite Tarot"
        badge="1909"
      />
      <CardHeader>
        <CardTitle>Rider-Waite Tarot</CardTitle>
        <CardMeta>Tarot Tradicional</CardMeta>
      </CardHeader>
      <CardContent>
        <CardDescription>
          O baralho mais icônico e amplamente utilizado, criado por A. E. Waite e ilustrado por
          Pamela Colman Smith em 1909.
        </CardDescription>
      </CardContent>
      <CardFooter>
        <CardStat value={78} label="cartas" color="purple" />
        <CardStat value={22} label="tags" color="indigo" />
      </CardFooter>
    </Card>
  ),
}

export const WithoutImage: Story = {
  render: () => (
    <Card style={{ maxWidth: '350px' }}>
      <CardImage badge="1650" />
      <CardHeader>
        <CardTitle>Tarot de Marselha</CardTitle>
        <CardMeta>Tradição Francesa</CardMeta>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Baralho clássico francês com simbolismo profundo e cores vibrantes.
        </CardDescription>
      </CardContent>
      <CardFooter>
        <CardStat value={78} label="cartas" color="purple" />
        <CardStat value={15} label="tags" color="indigo" />
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card style={{ maxWidth: '350px' }}>
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardMeta>Just header and content</CardMeta>
      </CardHeader>
      <CardContent>
        <CardDescription>
          You can omit any section. Mix and match components as needed.
        </CardDescription>
      </CardContent>
    </Card>
  ),
}

export const Loading: Story = {
  render: () => (
    <div style={{ maxWidth: '350px' }}>
      <CardSkeleton />
    </div>
  ),
}

// ═══════════════════════════════════════════════════════════════════════════
// Composition Examples - Lego-style assembly
// ═══════════════════════════════════════════════════════════════════════════

export const CompositionExamples: Story = {
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
          Card Composition
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Modular Lego-style components
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Full Composition */}
        <Card>
          <CardImage
            src="https://picsum.photos/seed/tarot-full/800/600"
            alt="Rider-Waite"
            badge="1909"
          />
          <CardHeader>
            <CardTitle>Full Card</CardTitle>
            <CardMeta>All components</CardMeta>
          </CardHeader>
          <CardContent>
            <CardDescription>Image + Header + Content + Footer assembled together.</CardDescription>
          </CardContent>
          <CardFooter>
            <CardStat value={78} label="cards" color="purple" />
            <CardStat value={22} label="tags" color="indigo" />
          </CardFooter>
        </Card>

        {/* No Image */}
        <Card>
          <CardHeader>
            <CardTitle>No Image</CardTitle>
            <CardMeta>Header + Content</CardMeta>
          </CardHeader>
          <CardContent>
            <CardDescription>Works perfectly without CardImage component.</CardDescription>
          </CardContent>
          <CardFooter>
            <CardStat value={44} label="cards" color="violet" />
          </CardFooter>
        </Card>

        {/* Image + Title Only */}
        <Card>
          <CardImage
            src="https://picsum.photos/seed/tarot-minimal/800/600"
            alt="Minimal"
          />
          <CardHeader>
            <CardTitle>Minimal</CardTitle>
          </CardHeader>
        </Card>

        {/* Content Rich */}
        <Card>
          <CardImage badge="2023" />
          <CardHeader>
            <CardTitle>Content Rich</CardTitle>
            <CardMeta>Modern Oracle</CardMeta>
          </CardHeader>
          <CardContent>
            <CardDescription lines={3}>
              This card has more description text to show how the line-clamp works. You can set
              different line limits via the lines prop. Perfect for variable content lengths.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <CardStat value={36} label="cards" color="purple" />
            <CardStat value={8} label="tags" color="violet" />
          </CardFooter>
        </Card>

        {/* Loading State */}
        <CardSkeleton />

        {/* Custom Content */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm">
                🎯 Custom element 1
              </div>
              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm">
                ✨ Custom element 2
              </div>
            </div>
          </CardContent>
        </Card>
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
          💡 Assemble cards like Lego: mix Card, CardImage, CardHeader, CardContent, CardFooter as
          needed
        </p>
      </div>
    </div>
  ),
}
