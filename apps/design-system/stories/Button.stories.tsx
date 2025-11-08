import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button, Icon, ButtonGroup } from '@workspace/ui/components/atoms'
import { Skeleton } from '@workspace/ui/components/atoms'

/**
 * **Button Component - Mystical Design System**
 *
 * Componente de botão místico com gradientes purple/violet/indigo,
 * efeitos de shimmer, estados de loading integrados e composição modular.
 *
 * **Novas Features:**
 * - ⭐ Variantes místicas: `gradient` (shimmer) e `glow`
 * - ⭐ Loading state integrado com prop `loading` + `loadingText`
 * - ⭐ Tamanhos de ícone: `icon-sm`, `icon-lg`
 * - ⭐ Integração com Icon atom
 * - ⭐ ButtonGroup para composição
 */
const meta = {
  title: 'Components/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Botão místico com 8 variantes, 6 tamanhos, loading state integrado e efeitos purple/violet/indigo. Suporta composição com Icon e ButtonGroup.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'gradient', 'glow'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'Size preset',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state (shows spinner, disables button)',
    },
    loadingText: {
      control: 'text',
      description: 'Alternative text when loading',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element (Radix Slot pattern)',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ═══════════════════════════════════════════════════════════════════════════
// Basic Variants
// ═══════════════════════════════════════════════════════════════════════════

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
}

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Gradient Shimmer',
  },
}

export const Glow: Story = {
  args: {
    variant: 'glow',
    children: 'Glow Effect',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// Sizes
// ═══════════════════════════════════════════════════════════════════════════

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
}

export const IconButton: Story = {
  args: {
    size: 'icon',
    children: <Icon name="Heart" />,
  },
}

export const IconSmall: Story = {
  args: {
    size: 'icon-sm',
    children: <Icon name="X" size="sm" />,
  },
}

export const IconLarge: Story = {
  args: {
    size: 'icon-lg',
    children: <Icon name="Sparkles" size="lg" />,
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// Loading States
// ═══════════════════════════════════════════════════════════════════════════

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Salvando...',
  },
}

export const LoadingWithText: Story = {
  args: {
    loading: true,
    loadingText: 'Processando...',
    children: 'Salvar',
  },
}

export const LoadingGradient: Story = {
  args: {
    variant: 'gradient',
    loading: true,
    loadingText: 'Carregando magia...',
    children: 'Iniciar',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// With Icons
// ═══════════════════════════════════════════════════════════════════════════

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon name="Sparkles" />
        Magical Action
      </>
    ),
  },
}

export const WithIconGradient: Story = {
  args: {
    variant: 'gradient',
    children: (
      <>
        <Icon name="Zap" />
        Power Button
      </>
    ),
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// States
// ═══════════════════════════════════════════════════════════════════════════

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const LoadingSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Skeleton className="h-9 w-24 rounded-lg bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-500/20 animate-pulse" />
      <Skeleton className="h-9 w-32 rounded-lg bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-500/20 animate-pulse" />
      <Skeleton className="size-9 rounded-lg bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-500/20 animate-pulse" />
    </div>
  ),
}

// ═══════════════════════════════════════════════════════════════════════════
// Button Groups
// ═══════════════════════════════════════════════════════════════════════════

export const HorizontalGroup: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
}

export const VerticalGroup: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
}

export const GroupWithGap: Story = {
  render: () => (
    <ButtonGroup attached={false}>
      <Button variant="gradient">Action 1</Button>
      <Button variant="gradient">Action 2</Button>
      <Button variant="gradient">Action 3</Button>
    </ButtonGroup>
  ),
}

// ═══════════════════════════════════════════════════════════════════════════
// Showcase - Complete System
// ═══════════════════════════════════════════════════════════════════════════

export const MysticalShowcase: Story = {
  render: () => (
    <div style={{ padding: '2rem', background: 'oklch(0.145 0 0)', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          marginBottom: '3rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)',
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
          Mystical Button System
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          8 variants × 6 sizes × loading states × icon integration
        </p>
      </div>

      {/* Mystical Variants */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#a855f7', marginBottom: '1.5rem' }}>
          ⭐ Mystical Variants (New)
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            borderRadius: '0.75rem',
          }}
        >
          <Button variant="default">Default (Gradient)</Button>
          <Button variant="gradient">
            <Icon name="Sparkles" />
            Gradient Shimmer
          </Button>
          <Button variant="glow">
            <Icon name="Zap" />
            Glow Effect
          </Button>
        </div>
      </section>

      {/* All Variants */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '1.5rem' }}>
          All Variants
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            borderRadius: '0.75rem',
          }}
        >
          <Button variant="default">Default</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="glow">Glow</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1', marginBottom: '1.5rem' }}>
          All Sizes
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            borderRadius: '0.75rem',
          }}
        >
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon-sm"><Icon name="X" size="sm" /></Button>
          <Button size="icon"><Icon name="Heart" /></Button>
          <Button size="icon-lg"><Icon name="Sparkles" size="lg" /></Button>
        </div>
      </section>

      {/* Loading States */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#a855f7', marginBottom: '1.5rem' }}>
          Loading States
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            borderRadius: '0.75rem',
          }}
        >
          <Button loading>Salvando...</Button>
          <Button variant="gradient" loading loadingText="Processando...">Salvar</Button>
          <Button variant="glow" loading>Carregando</Button>
          <Skeleton className="h-9 w-24 rounded-lg bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-500/20 animate-pulse" />
        </div>
      </section>

      {/* With Icons */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '1.5rem' }}>
          With Icons
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            borderRadius: '0.75rem',
          }}
        >
          <Button><Icon name="Heart" />Favorite</Button>
          <Button variant="gradient"><Icon name="Sparkles" />Magic</Button>
          <Button variant="glow"><Icon name="Zap" />Power</Button>
          <Button variant="outline"><Icon name="Download" />Download</Button>
          <Button variant="destructive"><Icon name="Trash2" />Delete</Button>
        </div>
      </section>

      {/* Button Groups */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1', marginBottom: '1.5rem' }}>
          Button Groups
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            borderRadius: '0.75rem',
          }}
        >
          <div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Horizontal Attached:</div>
            <ButtonGroup>
              <Button variant="outline">Left</Button>
              <Button variant="outline">Middle</Button>
              <Button variant="outline">Right</Button>
            </ButtonGroup>
          </div>
          <div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>With Gap:</div>
            <ButtonGroup attached={false}>
              <Button variant="gradient">One</Button>
              <Button variant="gradient">Two</Button>
              <Button variant="gradient">Three</Button>
            </ButtonGroup>
          </div>
          <div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Vertical:</div>
            <ButtonGroup orientation="vertical">
              <Button variant="outline">Top</Button>
              <Button variant="outline">Middle</Button>
              <Button variant="outline">Bottom</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

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
        <p style={{ margin: 0, textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
          💡 Tip: Use `variant="gradient"` para ações principais místicas, `glow` para CTAs especiais, e `loading` para estados assíncronos
        </p>
      </div>
    </div>
  ),
}
