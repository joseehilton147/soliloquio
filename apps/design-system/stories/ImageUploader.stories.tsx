import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ImageUploader } from '@workspace/ui/components/organisms/image-uploader'

/**
 * **ImageUploader Component - Mystical Design System**
 *
 * Organismo completo de upload de imagens com drag-and-drop, preview e gerenciamento de estado.
 *
 * **Features:**
 * - ⭐ Drag-and-drop zone estilizada
 * - ⭐ Preview de arquivo selecionado
 * - ⭐ Upload automático para API
 * - ⭐ Suporte a imagem existente (modo edição)
 * - ⭐ Estados de loading místicos
 * - ⭐ Validação de tipo e tamanho
 * - ⭐ Substituição de imagem antiga
 */
const meta = {
  title: 'Components/Organisms/ImageUploader',
  component: ImageUploader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Organismo completo de upload com drag-and-drop, preview, loading states e integração com API. Usado em criação/edição de cartas e decks.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    uploadEndpoint: {
      control: 'text',
      description: 'Endpoint da API para upload',
    },
    accept: {
      control: 'text',
      description: 'Tipos de arquivo aceitos',
    },
    maxSize: {
      control: 'number',
      description: 'Tamanho máximo em bytes (padrão: 5MB)',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o uploader',
    },
    existingImageUrl: {
      control: 'text',
      description: 'URL de imagem existente para modo edição',
    },
  },
} satisfies Meta<typeof ImageUploader>

export default meta
type Story = StoryObj<typeof meta>

// ═══════════════════════════════════════════════════════════════════════════
// Basic States
// ═══════════════════════════════════════════════════════════════════════════

export const Default: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <ImageUploader
        onUploadComplete={(url) => console.log('Upload completo:', url)}
        onUploadError={(error) => console.error('Erro no upload:', error)}
      />
    </div>
  ),
}

export const WithExistingImage: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <ImageUploader
        existingImageUrl="https://picsum.photos/seed/tarot-card/400/600"
        onUploadComplete={(url) => console.log('Upload completo:', url)}
        onUploadError={(error) => console.error('Erro no upload:', error)}
      />
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        💡 Modo edição: mostra imagem existente com botão de substituir
      </p>
    </div>
  ),
}

export const CustomAccept: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <ImageUploader
        accept="image/png,image/jpeg"
        onUploadComplete={(url) => console.log('Upload completo:', url)}
        onUploadError={(error) => console.error('Erro no upload:', error)}
      />
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        💡 Aceita apenas PNG e JPEG
      </p>
    </div>
  ),
}

export const CustomMaxSize: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <ImageUploader
        maxSize={2 * 1024 * 1024} // 2MB
        onUploadComplete={(url) => console.log('Upload completo:', url)}
        onUploadError={(error) => console.error('Erro no upload:', error)}
      />
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
        💡 Tamanho máximo: 2MB (padrão é 5MB)
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <ImageUploader
        disabled
        onUploadComplete={(url) => console.log('Upload completo:', url)}
        onUploadError={(error) => console.error('Erro no upload:', error)}
      />
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
        Estado desabilitado
      </p>
    </div>
  ),
}

// ═══════════════════════════════════════════════════════════════════════════
// Use Cases
// ═══════════════════════════════════════════════════════════════════════════

export const CreateCardFlow: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    return (
      <div style={{ width: '500px', padding: '2rem', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', background: 'linear-gradient(90deg, #a855f7 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Nova Carta de Tarot
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Faça upload da imagem da carta
        </p>

        <ImageUploader
          onUploadComplete={(url) => {
            setImageUrl(url)
            setError(null)
            console.log('✓ Upload completo:', url)
          }}
          onUploadError={(err) => {
            setError(err)
            setImageUrl(null)
            console.error('✗ Erro:', err)
          }}
        />

        {imageUrl && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#22c55e', fontWeight: '500' }}>
              ✓ Imagem uploaded com sucesso!
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.25rem' }}>
              {imageUrl}
            </p>
          </div>
        )}

        {error && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#ef4444', fontWeight: '500' }}>
              ✗ Erro no upload
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.25rem' }}>
              {error}
            </p>
          </div>
        )}
      </div>
    )
  },
}

export const EditCardFlow: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = React.useState<string>('https://picsum.photos/seed/tarot-fool/400/600')
    const [hasChanges, setHasChanges] = React.useState(false)

    return (
      <div style={{ width: '500px', padding: '2rem', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', background: 'linear-gradient(90deg, #a855f7 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Editar Carta - O Louco
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Substitua a imagem da carta (opcional)
        </p>

        <ImageUploader
          existingImageUrl={imageUrl}
          onUploadComplete={(url) => {
            setImageUrl(url)
            setHasChanges(true)
            console.log('✓ Imagem substituída:', url)
          }}
          onUploadError={(error) => console.error('✗ Erro:', error)}
        />

        {hasChanges && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#fbbf24', fontWeight: '500' }}>
              ⚠ Imagem alterada (não salva)
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.25rem' }}>
              Clique em "Salvar" para confirmar as mudanças
            </p>
          </div>
        )}
      </div>
    )
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// Showcase - Complete System
// ═══════════════════════════════════════════════════════════════════════════

export const MysticalShowcase: Story = {
  render: () => (
    <div style={{ padding: '2rem', background: 'oklch(0.145 0 0)', minHeight: '100vh', maxWidth: '1200px' }}>
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
          Mystical ImageUploader System
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Upload completo de imagens com drag-and-drop, preview e integração API
        </p>
      </div>

      {/* Features Grid */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#a855f7', marginBottom: '1.5rem' }}>
          Features
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Default */}
          <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(168, 85, 247, 0.1)', borderRadius: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem' }}>
              Drag & Drop Zone
            </h3>
            <ImageUploader
              onUploadComplete={(url) => console.log('Upload:', url)}
              onUploadError={(err) => console.error('Error:', err)}
            />
            <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              Arraste arquivos ou clique para selecionar
            </p>
          </div>

          {/* With Existing */}
          <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(168, 85, 247, 0.1)', borderRadius: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem' }}>
              Modo Edição
            </h3>
            <ImageUploader
              existingImageUrl="https://picsum.photos/seed/tarot-edit/400/600"
              onUploadComplete={(url) => console.log('Upload:', url)}
              onUploadError={(err) => console.error('Error:', err)}
            />
            <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              Preview de imagem existente + botão substituir
            </p>
          </div>
        </div>
      </section>

      {/* Technical Info */}
      <section
        style={{
          padding: '2rem',
          background: 'rgba(168, 85, 247, 0.05)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '0.75rem',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '1rem' }}>
          📋 Especificações Técnicas
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: 'rgba(255, 255, 255, 0.9)' }}>
              Endpoint Padrão
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.25rem' }}>
              <code>/api/upload</code>
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: 'rgba(255, 255, 255, 0.9)' }}>
              Tipos Aceitos
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.25rem' }}>
              <code>image/*</code> (todas as imagens)
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: 'rgba(255, 255, 255, 0.9)' }}>
              Tamanho Máximo
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.25rem' }}>
              5MB (5.242.880 bytes)
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: 'rgba(255, 255, 255, 0.9)' }}>
              Upload Automático
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.25rem' }}>
              Sim, ao selecionar arquivo
            </p>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6366f1', marginBottom: '0.5rem' }}>
            💡 Funcionalidades
          </p>
          <ul style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', marginLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <li>Drag-and-drop com feedback visual</li>
            <li>Preview de arquivo antes do upload</li>
            <li>Loading state com spinner místico</li>
            <li>Substituição de imagem antiga (deleta no servidor)</li>
            <li>Validação de tipo e tamanho</li>
            <li>Callbacks de sucesso e erro</li>
          </ul>
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
          💡 Tip: Configure uploadEndpoint, accept e maxSize para customizar o comportamento
        </p>
      </div>
    </div>
  ),
}
