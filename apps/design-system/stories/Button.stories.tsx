import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@workspace/ui/components/atoms'

/**
 * **Button Component**
 *
 * Primary UI component for user actions. Supports multiple variants,
 * sizes, states, and can render as different elements using the asChild prop.
 *
 * Based on Radix UI Slot for composition flexibility.
 */
const meta = {
  title: 'Components/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Versatile button component with multiple variants, sizes, and states. Built with class-variance-authority for type-safe variant management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Size preset',
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
// Basic Examples
// ═══════════════════════════════════════════════════════════════════════════

export const Default: Story = {
  args: {
    children: 'Button',
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

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '→',
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

// ═══════════════════════════════════════════════════════════════════════════
// Showcase - All Variants
// ═══════════════════════════════════════════════════════════════════════════

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        padding: '2rem',
        background: 'oklch(0.145 0 0)',
        minHeight: '100vh',
      }}
    >
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
          Button Variants
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          All available button styles and sizes
        </p>
      </div>

      {/* Variants */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#a855f7',
            marginBottom: '1.5rem',
          }}
        >
          Variants
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
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#8b5cf6',
            marginBottom: '1.5rem',
          }}
        >
          Sizes
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
          <Button size="icon">→</Button>
        </div>
      </section>

      {/* States */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#6366f1',
            marginBottom: '1.5rem',
          }}
        >
          States
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
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Matrix - All combinations */}
      <section>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#a855f7',
            marginBottom: '1.5rem',
          }}
        >
          Complete Matrix
        </h2>
        <div
          style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            borderRadius: '0.75rem',
          }}
        >
          {(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const).map((variant) => (
            <div
              key={variant}
              style={{
                marginBottom: '2rem',
                paddingBottom: '2rem',
                borderBottom: '1px solid rgba(168, 85, 247, 0.1)',
              }}
            >
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '1rem',
                  textTransform: 'capitalize',
                }}
              >
                {variant}
              </h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button variant={variant} size="sm">
                  Small
                </Button>
                <Button variant={variant} size="default">
                  Default
                </Button>
                <Button variant={variant} size="lg">
                  Large
                </Button>
                <Button variant={variant} disabled>
                  Disabled
                </Button>
              </div>
            </div>
          ))}
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
        <p
          style={{
            margin: 0,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
          }}
        >
          💡 Tip: Use semantic variants (destructive for delete actions, outline for secondary actions) to maintain consistency.
        </p>
      </div>
    </div>
  ),
}
