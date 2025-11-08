import type { Meta, StoryObj } from '@storybook/react'
import { designTokens } from '@workspace/ui/design-system/tokens'
import { useState } from 'react'

/**
 * **Tipografia Sagrada**
 *
 * Como os mantras são pronunciados em vibrações específicas,
 * nossa tipografia segue escalas harmônicas baseadas em ratio 1.25 (Quarta Perfeita).
 *
 * Cada tamanho, peso e espaçamento carrega uma intenção visual.
 */
const meta = {
  title: 'Design System/Foundations/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Explore a escala tipográfica do Solilóquio Tarot. Baseada em proporções harmônicas e geometria sagrada.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ═══════════════════════════════════════════════════════════════════════════
// 🔤 Typography Components
// ═══════════════════════════════════════════════════════════════════════════

interface FontSizeCardProps {
  name: string
  sizeValue: string | [string, { lineHeight: string }]
  sampleText?: string
}

function FontSizeCard({ name, sizeValue, sampleText = 'Magia é intenção' }: FontSizeCardProps) {
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
            Como acima, assim abaixo
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
        SOLILÓQUIO TAROT
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
// 📖 Stories
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
          🔤 Escala Tipográfica
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Ratio 1.25 (Quarta Perfeita) • De xs (12px) até 9xl (128px)
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
          ★ A tipografia é o mantra visual. Cada tamanho carrega uma intenção. ★
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
          ⚖️ Pesos Tipográficos
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          De thin (100) até black (900) • Hierarquia visual
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
          ★ O peso da letra carrega o peso da mensagem. Use com sabedoria. ★
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
          ↔️ Espaçamento de Letras
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Kerning e tracking para legibilidade e estética
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
          ★ O espaço entre as letras é o silêncio entre as notas. Ambos são sagrados. ★
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
          🔠 Famílias Tipográficas
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Sans-serif para interface • Mono para código
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
            "O Universo é mental. A Mente é Tudo."
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Usado para: Interfaces, textos de leitura, componentes, títulos
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
            const magic = "intention" + "focus"
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Usado para: Código, valores técnicos, tokens, IDs
          </div>
        </div>
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
          ★ Duas fontes, infinitas possibilidades. Simplicidade é divindade. ★
        </p>
      </div>
    </div>
  ),
}
