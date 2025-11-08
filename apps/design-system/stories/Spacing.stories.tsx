import type { Meta, StoryObj } from '@storybook/react'
import { designTokens } from '@workspace/ui/design-system/tokens'
import { useState } from 'react'

/**
 * **Espaçamentos Sagrados**
 *
 * Como a geometria sagrada organiza o cosmos em proporções divinas,
 * nossos espaçamentos seguem múltiplos de 4px baseados na proporção áurea.
 *
 * Cada distância carrega uma harmonia visual.
 */
const meta = {
  title: 'Design System/Foundations/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Explore os tokens de espaçamento do Solilóquio Tarot. Baseados em múltiplos de 4px e geometria sagrada.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ═══════════════════════════════════════════════════════════════════════════
// 📏 Spacing Components
// ═══════════════════════════════════════════════════════════════════════════

interface SpacingCardProps {
  name: string
  value: string
}

function SpacingCard({ name, value }: SpacingCardProps) {
  const [copied, setCopied] = useState(false)

  // Converter rem para px
  const pxValue = value === '0'
    ? '0px'
    : value === '1px'
    ? '1px'
    : `${parseFloat(value) * 16}px`

  const widthPx = value === '0'
    ? 0
    : value === '1px'
    ? 1
    : parseFloat(value) * 16

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{
        padding: '1.5rem',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(168, 85, 247, 0.1)',
        borderRadius: '0.75rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)'
        e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      onClick={handleCopy}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#a855f7',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            spacing-{name}
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'JetBrains Mono, monospace',
              marginTop: '0.25rem',
            }}
          >
            {value} • {pxValue}
          </div>
        </div>
        {copied && (
          <div
            style={{
              fontSize: '0.875rem',
              color: '#a855f7',
              fontWeight: '600',
            }}
          >
            ✓ Copiado
          </div>
        )}
      </div>

      {/* Visual Ruler */}
      <div
        style={{
          position: 'relative',
          height: '40px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Spacing Bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${Math.min(widthPx, 384)}px`,
            background: 'linear-gradient(90deg, #a855f7 0%, #8b5cf6 50%, #6366f1 100%)',
            borderRight: '2px solid rgba(255, 255, 255, 0.5)',
            transition: 'width 0.3s ease',
          }}
        />

        {/* Measurement Text */}
        <div
          style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: 'JetBrains Mono, monospace',
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
          }}
        >
          {pxValue}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 📖 Stories
// ═══════════════════════════════════════════════════════════════════════════

export const AllSpacings: Story = {
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
          📏 Espaçamentos Sagrados
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Múltiplos de 4px • De px (1px) até 96 (384px) • Geometria Sagrada
        </p>
      </div>

      {/* Info Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            padding: '1.5rem',
            background: 'rgba(168, 85, 247, 0.05)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '0.75rem',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔢</div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#a855f7',
              marginBottom: '0.5rem',
            }}
          >
            Escala Base
          </div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Múltiplos de 4px (0.25rem) garantem consistência visual e alinhamento perfeito
          </div>
        </div>

        <div
          style={{
            padding: '1.5rem',
            background: 'rgba(139, 92, 246, 0.05)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '0.75rem',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✨</div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#8b5cf6',
              marginBottom: '0.5rem',
            }}
          >
            Uso Comum
          </div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            0.5-4 = interno | 4-8 = entre elementos | 8+ = seções e layouts
          </div>
        </div>

        <div
          style={{
            padding: '1.5rem',
            background: 'rgba(99, 102, 241, 0.05)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '0.75rem',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#6366f1',
              marginBottom: '0.5rem',
            }}
          >
            Proporção Áurea
          </div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Valores crescem harmonicamente seguindo princípios de geometria sagrada
          </div>
        </div>
      </div>

      {/* Small Spacings (px to 4) */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#a855f7',
            marginBottom: '1.5rem',
          }}
        >
          Espaçamentos Pequenos (1px - 16px)
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {Object.entries(designTokens.spacing)
            .filter(([_, value]) => {
              const px = value === '1px' ? 1 : parseFloat(value) * 16
              return px <= 16
            })
            .map(([name, value]) => (
              <SpacingCard key={name} name={name} value={value} />
            ))}
        </div>
      </section>

      {/* Medium Spacings (5 to 16) */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#8b5cf6',
            marginBottom: '1.5rem',
          }}
        >
          Espaçamentos Médios (20px - 64px)
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {Object.entries(designTokens.spacing)
            .filter(([_, value]) => {
              const px = parseFloat(value) * 16
              return px > 16 && px <= 64
            })
            .map(([name, value]) => (
              <SpacingCard key={name} name={name} value={value} />
            ))}
        </div>
      </section>

      {/* Large Spacings (20+) */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#6366f1',
            marginBottom: '1.5rem',
          }}
        >
          Espaçamentos Grandes (80px+)
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {Object.entries(designTokens.spacing)
            .filter(([_, value]) => {
              const px = parseFloat(value) * 16
              return px > 64
            })
            .map(([name, value]) => (
              <SpacingCard key={name} name={name} value={value} />
            ))}
        </div>
      </section>

      {/* Footer Insight */}
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
          ★ O espaço vazio não é vazio. É potencial. É onde a magia respira. ★
        </p>
      </div>
    </div>
  ),
}

export const SpacingComparison: Story = {
  render: () => {
    const commonSpacings = ['2', '4', '6', '8', '12', '16', '24', '32']

    return (
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
            🔄 Comparação Visual
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
            Espaçamentos mais usados lado a lado
          </p>
        </div>

        {/* Visual Comparison */}
        <div
          style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            borderRadius: '0.75rem',
          }}
        >
          {commonSpacings.map((spacing) => {
            const value = designTokens.spacing[spacing as keyof typeof designTokens.spacing]
            const pxValue = parseFloat(value) * 16

            return (
              <div
                key={spacing}
                style={{
                  marginBottom: '2rem',
                  paddingBottom: '2rem',
                  borderBottom: '1px solid rgba(168, 85, 247, 0.1)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: '#a855f7',
                    fontFamily: 'JetBrains Mono, monospace',
                    marginBottom: '1rem',
                  }}
                >
                  spacing-{spacing} • {value} • {pxValue}px
                </div>

                {/* Visual Boxes */}
                <div style={{ display: 'flex', alignItems: 'center', gap: value }}>
                  <div
                    style={{
                      width: '100px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                    }}
                  >
                    Box 1
                  </div>
                  <div
                    style={{
                      width: '100px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                    }}
                  >
                    Box 2
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    ← {pxValue}px de gap →
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Insight */}
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
            ★ Distâncias corretas criam harmonia. Harmonia cria beleza. ★
          </p>
        </div>
      </div>
    )
  },
}
