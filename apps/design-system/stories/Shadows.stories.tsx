import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { designTokens } from '@workspace/ui/design-system/tokens'

/**
 * **Shadow System**
 *
 * Elevation and depth system using box-shadow. Includes standard
 * elevation levels (sm to 2xl) and custom purple/violet/indigo glows.
 *
 * Shadows create visual hierarchy and depth perception.
 */
const meta = {
  title: 'Design System/Foundations/Shadows',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Complete shadow system including standard elevations and custom glow effects for the mystical theme.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ═══════════════════════════════════════════════════════════════════════════
// Shadow Demo Component
// ═══════════════════════════════════════════════════════════════════════════

interface ShadowCardProps {
  name: string
  value: string
  description?: string
}

function ShadowCard({ name, value, description }: ShadowCardProps) {
  return (
    <div
      style={{
        padding: '1.5rem',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(168, 85, 247, 0.1)',
        borderRadius: '0.75rem',
      }}
    >
      {/* Info */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#a855f7',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '0.25rem',
          }}
        >
          {name}
        </div>
        {description && (
          <div
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {description}
          </div>
        )}
        <div
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: 'JetBrains Mono, monospace',
            marginTop: '0.5rem',
          }}
        >
          {value}
        </div>
      </div>

      {/* Visual Demo */}
      <div
        style={{
          width: '100%',
          height: '120px',
          background: 'oklch(0.205 0 0)',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: value,
        }}
      >
        <div
          style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: '500',
          }}
        >
          Shadow Preview
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Stories
// ═══════════════════════════════════════════════════════════════════════════

export const AllShadows: Story = {
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
          Shadow System
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Elevation levels and glow effects
        </p>
      </div>

      {/* Standard Shadows */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#a855f7',
            marginBottom: '1.5rem',
          }}
        >
          Standard Elevations
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <ShadowCard
            name="shadow-sm"
            value={designTokens.shadows.sm}
            description="Subtle elevation (e.g., buttons, inputs)"
          />
          <ShadowCard
            name="shadow-md"
            value={designTokens.shadows.md}
            description="Standard elevation (e.g., cards)"
          />
          <ShadowCard
            name="shadow-lg"
            value={designTokens.shadows.lg}
            description="Raised elevation (e.g., dropdowns)"
          />
          <ShadowCard
            name="shadow-xl"
            value={designTokens.shadows.xl}
            description="High elevation (e.g., modals)"
          />
          <ShadowCard
            name="shadow-2xl"
            value={designTokens.shadows['2xl']}
            description="Maximum elevation (e.g., popovers)"
          />
          <ShadowCard
            name="shadow-inner"
            value={designTokens.shadows.inner}
            description="Inset shadow (e.g., pressed state)"
          />
        </div>
      </section>

      {/* Glow Shadows */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#8b5cf6',
            marginBottom: '1.5rem',
          }}
        >
          Glow Effects
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <ShadowCard
            name="glow-purple"
            value={designTokens.shadows.glowPurple}
            description="Primary color glow (280° hue)"
          />
          <ShadowCard
            name="glow-violet"
            value={designTokens.shadows.glowViolet}
            description="Secondary color glow (290° hue)"
          />
          <ShadowCard
            name="glow-indigo"
            value={designTokens.shadows.glowIndigo}
            description="Tertiary color glow (270° hue)"
          />
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#6366f1',
            marginBottom: '1.5rem',
          }}
        >
          Usage Examples
        </h2>
        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Button with shadow */}
          <div
            style={{
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(168, 85, 247, 0.1)',
              borderRadius: '0.75rem',
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '1.5rem',
              }}
            >
              Button with shadow-sm
            </h3>
            <button
              style={{
                padding: '0.5rem 1.5rem',
                background: '#a855f7',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: designTokens.shadows.sm,
              }}
            >
              Click me
            </button>
          </div>

          {/* Card with shadow */}
          <div
            style={{
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(168, 85, 247, 0.1)',
              borderRadius: '0.75rem',
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '1.5rem',
              }}
            >
              Card with shadow-lg
            </h3>
            <div
              style={{
                padding: '1.5rem',
                background: 'oklch(0.205 0 0)',
                borderRadius: '0.75rem',
                boxShadow: designTokens.shadows.lg,
              }}
            >
              <div style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Card Title
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                Content with elevated shadow for depth perception.
              </p>
            </div>
          </div>

          {/* Glow effect */}
          <div
            style={{
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(168, 85, 247, 0.1)',
              borderRadius: '0.75rem',
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '1.5rem',
              }}
            >
              Interactive element with glow-purple
            </h3>
            <div
              style={{
                padding: '2rem',
                background: 'oklch(0.205 0 0)',
                borderRadius: '0.75rem',
                border: '2px solid #a855f7',
                boxShadow: designTokens.shadows.glowPurple,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                Focus/active state with purple glow
              </div>
            </div>
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
        <p
          style={{
            margin: 0,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
          }}
        >
          💡 Tip: Use standard shadows for elevation hierarchy. Use glows for focus/hover states and branding elements.
        </p>
      </div>
    </div>
  ),
}

export const ShadowComparison: Story = {
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
          Shadow Comparison
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Side-by-side elevation levels
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '150px',
                height: '150px',
                background: 'oklch(0.205 0 0)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: designTokens.shadows[size],
                marginBottom: '1rem',
              }}
            >
              <span style={{ fontSize: '1.5rem', fontWeight: '600', color: '#a855f7' }}>
                {size}
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              shadow-{size}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}
