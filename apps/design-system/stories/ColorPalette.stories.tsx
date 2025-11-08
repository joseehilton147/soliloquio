import type { Meta, StoryObj } from '@storybook/react'
import { designTokens } from '@workspace/ui/design-system/tokens'
import { useState } from 'react'

/**
 * **Paleta de Cores Místicas**
 *
 * Como cada Sefirá na Árvore da Vida Cabalística possui sua cor sagrada,
 * nosso design system organiza cores em tons harmônicos baseados em OKLCH.
 *
 * Purple (280°) → Chakra da Coroa → Conexão espiritual
 * Violet (290°) → Transmutação → Transformação alquímica
 * Indigo (270°) → Terceiro Olho → Intuição e sabedoria
 */
const meta = {
  title: 'Design System/Foundations/Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Explore a paleta de cores místicas do Solilóquio Tarot. Todas as cores usam OKLCH para consistência perceptual.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 Color Swatch Component
// ═══════════════════════════════════════════════════════════════════════════

interface ColorSwatchProps {
  name: string
  value: string
  onCopy?: (value: string) => void
}

function ColorSwatch({ name, value, onCopy }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    onCopy?.(value)
    setTimeout(() => setCopied(false), 2000)
  }

  // Calcular se o texto deve ser claro ou escuro baseado na luminosidade
  const lightness = parseFloat(value.match(/oklch\(([\d.]+)/)?.[1] || '0.5')
  const textColor = lightness > 0.6 ? '#000' : '#fff'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(168, 85, 247, 0.1)',
        borderRadius: '0.75rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.3)'
        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.1)'
      }}
      onClick={handleCopy}
    >
      {/* Color Preview */}
      <div
        style={{
          width: '100%',
          height: '80px',
          background: value,
          borderRadius: '0.5rem',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          color: textColor,
          fontWeight: 'bold',
        }}
      >
        {copied ? '✓' : ''}
      </div>

      {/* Color Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: '0.7rem',
            color: 'rgba(168, 85, 247, 0.8)',
            marginTop: '0.25rem',
            opacity: copied ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          {copied ? 'Copiado!' : 'Clique para copiar'}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 📖 Stories
// ═══════════════════════════════════════════════════════════════════════════

export const MysticalColors: Story = {
  render: () => {
    const [lastCopied, setLastCopied] = useState<string>('')

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
            🔮 Cores Místicas
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
            Baseadas em OKLCH para percepção visual consistente. Clique em qualquer cor para copiar.
          </p>
          {lastCopied && (
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '0.5rem',
                color: '#a855f7',
                fontSize: '0.875rem',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              ✓ Copiado: {lastCopied}
            </div>
          )}
        </div>

        {/* Purple Scale */}
        <section style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                fontSize: '2rem',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '0.5rem',
              }}
            >
              🔮
            </div>
            <div>
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: '#a855f7',
                  margin: 0,
                }}
              >
                Purple
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                Chakra da Coroa • Hue 280°
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '1rem',
            }}
          >
            {Object.entries(designTokens.colors.mystical.purple).map(([shade, value]) => (
              <ColorSwatch
                key={shade}
                name={`purple-${shade}`}
                value={value}
                onCopy={setLastCopied}
              />
            ))}
          </div>
        </section>

        {/* Violet Scale */}
        <section style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                fontSize: '2rem',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '0.5rem',
              }}
            >
              ✨
            </div>
            <div>
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: '#8b5cf6',
                  margin: 0,
                }}
              >
                Violet
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                Transmutação Alquímica • Hue 290°
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '1rem',
            }}
          >
            {Object.entries(designTokens.colors.mystical.violet).map(([shade, value]) => (
              <ColorSwatch
                key={shade}
                name={`violet-${shade}`}
                value={value}
                onCopy={setLastCopied}
              />
            ))}
          </div>
        </section>

        {/* Indigo Scale */}
        <section style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                fontSize: '2rem',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '0.5rem',
              }}
            >
              👁️
            </div>
            <div>
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: '#6366f1',
                  margin: 0,
                }}
              >
                Indigo
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                Terceiro Olho • Hue 270°
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '1rem',
            }}
          >
            {Object.entries(designTokens.colors.mystical.indigo).map(([shade, value]) => (
              <ColorSwatch
                key={shade}
                name={`indigo-${shade}`}
                value={value}
                onCopy={setLastCopied}
              />
            ))}
          </div>
        </section>

        {/* Semantic Colors */}
        <section>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                fontSize: '2rem',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '0.5rem',
              }}
            >
              🎯
            </div>
            <div>
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: '#a855f7',
                  margin: 0,
                }}
              >
                Cores Semânticas
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                Tokens para componentes e estados
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '1rem',
            }}
          >
            {Object.entries(designTokens.colors.semantic).map(([name, value]) => (
              <ColorSwatch
                key={name}
                name={name}
                value={value}
                onCopy={setLastCopied}
              />
            ))}
          </div>
        </section>

        {/* Footer Insight */}
        <div
          style={{
            marginTop: '4rem',
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
            ★ Cada cor carrega uma vibração. Use-as com intenção consciente. ★
          </p>
        </div>
      </div>
    )
  },
}
