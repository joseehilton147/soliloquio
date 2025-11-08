import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { designTokens } from '@workspace/ui/design-system/tokens'

/**
 * **Typography System**
 *
 * Sistema tipográfico baseado em escala modular com ratio 1.25 (Major Third).
 * Todos os tamanhos seguem progressão harmônica de 12px (xs) até 128px (9xl).
 *
 * Fonte principal: Inter (interface) e JetBrains Mono (código).
 */
const meta = {
  title: 'Design System/Foundations/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Sistema tipográfico completo. Baseado em escala modular com ratio 1.25 para progressão consistente.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ═══════════════════════════════════════════════════════════════════════════
// Typography Components
// ═══════════════════════════════════════════════════════════════════════════

interface FontSizeCardProps {
  name: string
  sizeValue: string | [string, { lineHeight: string }]
  sampleText?: string
}

function FontSizeCard({ name, sizeValue, sampleText = 'The quick brown fox' }: FontSizeCardProps) {
  const [copied, setCopied] = useState(false)

  const fontSize = Array.isArray(sizeValue) ? sizeValue[0] : sizeValue
  const lineHeight = Array.isArray(sizeValue) ? sizeValue[1].lineHeight : '1.5'

  // Converter rem para px
  const pxValue = parseFloat(fontSize) * 16

  const handleCopy = () => {
    navigator.clipboard.writeText(fontSize)
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
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#a855f7',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'JetBrains Mono, monospace',
              marginTop: '0.25rem',
            }}
          >
            {fontSize} • {Math.round(pxValue)}px • LH: {lineHeight}
          </div>
        </div>
        {copied && (
          <div
            style={{
              fontSize: '0.75rem',
              color: '#a855f7',
              fontWeight: '600',
            }}
          >
            ✓ Copiado
          </div>
        )}
      </div>

      {/* Sample Text */}
      <div
        style={{
          fontSize,
          lineHeight,
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {sampleText}
      </div>
    </div>
  )
}

interface FontWeightCardProps {
  name: string
  weight: string
}

function FontWeightCard({ name, weight }: FontWeightCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(weight)
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '0.875rem',
              color: '#a855f7',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '0.5rem',
            }}
          >
            {name} • {weight}
          </div>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: weight,
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            The quick brown fox jumps
          </div>
        </div>
        {copied && (
          <div
            style={{
              fontSize: '0.75rem',
              color: '#a855f7',
              fontWeight: '600',
              marginLeft: '1rem',
            }}
          >
            ✓
          </div>
        )}
      </div>
    </div>
  )
}

interface LetterSpacingCardProps {
  name: string
  spacing: string
}

function LetterSpacingCard({ name, spacing }: LetterSpacingCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(spacing)
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
      <div
        style={{
          fontSize: '0.875rem',
          color: '#a855f7',
          fontWeight: '600',
          fontFamily: 'Inter, sans-serif',
          marginBottom: '0.75rem',
        }}
      >
        {name} • {spacing}
      </div>
      <div
        style={{
          fontSize: '1.25rem',
          letterSpacing: spacing,
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        DESIGN SYSTEM TYPOGRAPHY
      </div>
      {copied && (
        <div
          style={{
            fontSize: '0.75rem',
            color: '#a855f7',
            marginTop: '0.5rem',
          }}
        >
          ✓ Copiado
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Stories
// ═══════════════════════════════════════════════════════════════════════════

export const FontSizes: Story = {
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
          Typography Scale
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Ratio 1.25 (Major Third) • From xs (12px) to 9xl (128px)
        </p>
      </div>

      {/* Font Sizes Grid */}
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        {Object.entries(designTokens.typography.fontSize).map(([name, value]) => (
          <FontSizeCard
            key={name}
            name={name}
            sizeValue={value}
          />
        ))}
      </div>

      {/* Footer Tip */}
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
          Tip: Use consistent font sizes from this scale to maintain visual hierarchy.
        </p>
      </div>
    </div>
  ),
}

export const FontWeights: Story = {
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
          Font Weights
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          From thin (100) to black (900) • Visual hierarchy
        </p>
      </div>

      {/* Font Weights Grid */}
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        {Object.entries(designTokens.typography.fontWeight).map(([name, weight]) => (
          <FontWeightCard
            key={name}
            name={name}
            weight={weight}
          />
        ))}
      </div>

      {/* Footer Tip */}
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
          Tip: Use weight variations to establish clear visual hierarchy and emphasis.
        </p>
      </div>
    </div>
  ),
}

export const LetterSpacing: Story = {
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
          Letter Spacing
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Tracking values for readability and visual refinement
        </p>
      </div>

      {/* Letter Spacing Grid */}
      <div
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        {Object.entries(designTokens.typography.letterSpacing).map(([name, spacing]) => (
          <LetterSpacingCard
            key={name}
            name={name}
            spacing={spacing}
          />
        ))}
      </div>

      {/* Footer Tip */}
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
          Tip: Tighter spacing works well for headings, wider spacing improves readability in body text.
        </p>
      </div>
    </div>
  ),
}

export const FontFamilies: Story = {
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
          Font Families
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Sans-serif for UI • Monospace for code
        </p>
      </div>

      {/* Font Families */}
      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Sans */}
        <div
          style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            borderRadius: '0.75rem',
          }}
        >
          <div
            style={{
              fontSize: '1.25rem',
              color: '#a855f7',
              fontWeight: '600',
              marginBottom: '1rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Sans-serif • Inter
          </div>
          <div
            style={{
              fontSize: '2rem',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '1rem',
            }}
          >
            "Clean, modern, highly legible."
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Used for: UI components, body text, headings, labels
          </div>
        </div>

        {/* Mono */}
        <div
          style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(168, 85, 247, 0.1)',
            borderRadius: '0.75rem',
          }}
        >
          <div
            style={{
              fontSize: '1.25rem',
              color: '#a855f7',
              fontWeight: '600',
              marginBottom: '1rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Monospace • JetBrains Mono
          </div>
          <div
            style={{
              fontSize: '1.5rem',
              color: '#fff',
              fontFamily: 'JetBrains Mono, monospace',
              marginBottom: '1rem',
            }}
          >
            const value = calculateTotal(items)
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Used for: Code blocks, technical values, tokens, IDs
          </div>
        </div>
      </div>

      {/* Footer Tip */}
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
          Tip: Limit font families to maintain consistency and improve performance.
        </p>
      </div>
    </div>
  ),
}
