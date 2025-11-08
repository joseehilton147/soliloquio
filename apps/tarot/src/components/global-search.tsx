'use client'

import { Search as SearchIcon, Sparkles, Layers, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { cn } from '@workspace/ui/lib/utils'
import { trpc } from '../lib/trpc'

interface GlobalSearchProps {
  open: boolean
  onClose: () => void
}

/**
 * Global Search Modal - Fuzzy search para cartas e baralhos
 * Design místico com resultados agrupados por tipo
 */
export function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Query cards and decks
  const { data: cardsData } = trpc.tarot.getAll.useQuery(
    { limit: 100, offset: 0 },
    { enabled: query.length >= 2 }
  )
  const { data: decks } = trpc.tarot.getDecks.useQuery(undefined, {
    enabled: query.length >= 2,
  })

  // Filter results based on query
  const filteredCards = (cardsData?.cards || []).filter((card) =>
    card.name.toLowerCase().includes(query.toLowerCase())
  )

  const filteredDecks = (decks || []).filter((deck) =>
    deck.name.toLowerCase().includes(query.toLowerCase())
  )

  // Combine results
  const allResults = [
    ...filteredCards.map((card) => ({
      type: 'card' as const,
      id: card.id,
      name: card.name,
      slug: card.slug,
      description: card.summary,
      icon: Sparkles,
    })),
    ...filteredDecks.map((deck) => ({
      type: 'deck' as const,
      id: deck.id,
      name: deck.name,
      slug: deck.slug,
      description: deck.description,
      icon: Layers,
    })),
  ]

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, allResults.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && allResults[selectedIndex]) {
        e.preventDefault()
        const result = allResults[selectedIndex]
        const url = result.type === 'card' ? `/cartas/${result.slug}` : `/decks/${result.slug}`
        router.push(url)
        onClose()
      } else if (e.key === 'Escape') {
        onClose()
      }
    },
    [allResults, selectedIndex, router, onClose]
  )

  // Close on background click
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Reset on close
  useEffect(() => {
    if (!open) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackgroundClick}
    >
      <div className="container flex h-full max-w-2xl flex-col items-center justify-start pt-32">
        <div
          className="w-full rounded-lg border border-border bg-background shadow-2xl animate-in slide-in-from-top-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 border-b border-border/40 px-4 py-3">
            <SearchIcon className="size-5 text-muted-foreground" strokeWidth={2} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar cartas e baralhos..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="rounded-full p-1 hover:bg-accent transition-colors"
              >
                <X className="size-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto p-2">
            {query.length < 2 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
                  <SearchIcon className="size-6 text-muted-foreground" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Digite pelo menos 2 caracteres para buscar
                </p>
              </div>
            ) : allResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                  <SearchIcon className="size-6 text-muted-foreground" />
                </div>
                <p className="mt-4 text-sm font-medium">Nenhum resultado encontrado</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tente buscar por outro termo
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {allResults.map((result, index) => {
                  const Icon = result.icon
                  const isSelected = index === selectedIndex
                  const url =
                    result.type === 'card'
                      ? `/cartas/${result.slug}`
                      : `/decks/${result.slug}`

                  return (
                    <Link
                      key={`${result.type}-${result.id}`}
                      href={url}
                      onClick={onClose}
                      className={cn(
                        'flex items-start gap-3 rounded-lg px-3 py-2 transition-all',
                        isSelected
                          ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 shadow-sm'
                          : 'hover:bg-accent'
                      )}
                    >
                      <div
                        className={cn(
                          'flex size-8 items-center justify-center rounded-lg transition-colors',
                          result.type === 'card'
                            ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                            : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                        )}
                      >
                        <Icon className="size-4 text-white" strokeWidth={2} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{result.name}</p>
                        {result.description && (
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                            {result.description}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">
                          {result.type === 'card' ? 'Carta' : 'Baralho'}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <kbd className="inline-flex h-5 items-center rounded border border-border/40 bg-muted px-1.5">
                            ⏎
                          </kbd>
                        </div>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border/40 px-4 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border/40 bg-muted px-1.5">
                <span>↑↓</span>
              </kbd>
              <span>navegar</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="inline-flex h-5 items-center gap-1 rounded border border-border/40 bg-muted px-1.5">
                ESC
              </kbd>
              <span>fechar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
