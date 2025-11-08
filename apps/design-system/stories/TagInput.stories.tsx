import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TagInput } from '@workspace/ui/components/atoms'

const meta = {
  title: 'Components/Atoms/TagInput',
  component: TagInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input místico para adicionar tags com autocomplete, navegação por setas e fuzzy search integrado.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>([])

    return (
      <div style={{ width: '400px' }}>
        <TagInput
          placeholder="Digite uma tag e pressione Enter..."
          onAddTag={(tag) => {
            setTags([...tags, tag])
            console.log('Tag adicionada:', tag)
          }}
        />
        {tags.length > 0 && (
          <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: '0.25rem 0.75rem',
                  background: 'linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  },
}

export const WithSuggestions: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>([])
    const [query, setQuery] = React.useState('')

    const allSuggestions = [
      { id: '1', value: 'react', usageCount: 50 },
      { id: '2', value: 'typescript', usageCount: 45 },
      { id: '3', value: 'nextjs', usageCount: 30 },
      { id: '4', value: 'tailwind', usageCount: 25 },
      { id: '5', value: 'storybook', usageCount: 20 },
    ]

    const suggestions = query
      ? allSuggestions.filter((s) =>
          s.value.toLowerCase().includes(query.toLowerCase())
        )
      : []

    return (
      <div style={{ width: '400px' }}>
        <TagInput
          placeholder="Digite para ver sugestões..."
          onAddTag={(tag) => setTags([...tags, tag])}
          suggestions={suggestions}
          onQueryChange={setQuery}
          existingTags={tags}
        />
        {tags.length > 0 && (
          <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: '0.25rem 0.75rem',
                  background: 'linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  },
}

export const MysticalShowcase: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>(['javascript', 'design-system'])
    const [query, setQuery] = React.useState('')

    const allSuggestions = [
      { id: '1', value: 'react', usageCount: 50 },
      { id: '2', value: 'typescript', usageCount: 45 },
      { id: '3', value: 'nextjs', usageCount: 30 },
      { id: '4', value: 'tailwind', usageCount: 25 },
      { id: '5', value: 'storybook', usageCount: 20 },
      { id: '6', value: 'vite', usageCount: 18 },
      { id: '7', value: 'radix-ui', usageCount: 15 },
    ]

    const suggestions = query
      ? allSuggestions.filter((s) =>
          s.value.toLowerCase().includes(query.toLowerCase())
        )
      : []

    return (
      <div style={{ padding: '2rem', background: 'oklch(0.145 0 0)', minHeight: '100vh', maxWidth: '800px' }}>
        <div style={{ marginBottom: '3rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)', borderRadius: '1rem', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', background: 'linear-gradient(90deg, #a855f7 0%, #8b5cf6 50%, #6366f1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
            Mystical TagInput
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
            Input de tags com autocomplete, navegação por setas (↑↓) e Enter para adicionar
          </p>
        </div>

        <section style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(168, 85, 247, 0.1)', borderRadius: '0.75rem' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgba(255, 255, 255, 0.9)' }}>
            Tags de Tecnologia
          </label>
          <TagInput
            placeholder="Digite para ver sugestões (ex: react, typescript)..."
            onAddTag={(tag) => setTags([...tags, tag])}
            suggestions={suggestions}
            onQueryChange={setQuery}
            existingTags={tags}
          />
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            Use ↑↓ para navegar, Enter para selecionar, Escape para fechar
          </p>

          {tags.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.75rem' }}>
                Tags adicionadas ({tags.length}):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '0.375rem 1rem',
                      background: 'linear-gradient(to right, rgba(168, 85, 247, 0.3), rgba(139, 92, 246, 0.3))',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    {tag}
                    <button
                      onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.7)',
                        cursor: 'pointer',
                        padding: '0',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    )
  },
}
