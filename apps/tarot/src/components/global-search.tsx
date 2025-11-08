'use client'

import { Search as SearchIcon, Sparkles, Layers, X, ImageIcon } from 'lucide-react'
import Image from 'next/image'
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
      imageUrl: card.imageUrl,
      icon: Sparkles,
    })),
    ...filteredDecks.map((deck) => ({
      type: 'deck' as const,
      id: deck.id,
      name: deck.name,
      slug: deck.slug,
      description: deck.description,
      imageUrl: deck.imageUrl,
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
      className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={handleBackgroundClick}
    >
      {/* Mystical background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 size-96 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 size-96 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <div className="container flex h-full max-w-2xl flex-col items-center justify-center relative px-4">
        <div
          className="w-full rounded-2xl border border-purple-500/20 bg-background/95 backdrop-blur-md shadow-2xl shadow-purple-500/10 animate-in slide-in-from-top-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input místico */}
          <div className="flex items-center gap-3 border-b border-border/40 px-5 py-4 bg-gradient-to-r from-purple-500/5 via-transparent to-indigo-500/5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
              <SearchIcon className="size-5 text-purple-600 dark:text-purple-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar no oráculo sagrado..."
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/60"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="rounded-full p-2 hover:bg-purple-500/10 transition-all hover:scale-110"
              >
                <X className="size-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Results místicos */}
          <div className="max-h-[32rem] overflow-y-auto p-3">
            {query.length < 2 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />
                  <div className="relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
                    <SearchIcon className="size-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                  Busque sabedoria nos arcanos
                </p>
                <p className="mt-2 text-xs text-muted-foreground/60">
                  Digite pelo menos 2 caracteres
                </p>
              </div>
            ) : allResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-purple-500/10" />
                  <div className="relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
                    <Sparkles className="size-8 text-purple-600 dark:text-purple-400 animate-pulse" />
                  </div>
                </div>
                <p className="mt-6 text-sm font-medium">Nenhum arcano encontrado</p>
                <p className="mt-2 text-sm text-muted-foreground/80 leading-relaxed max-w-xs">
                  O oráculo não revela segredos com este termo. Tente outro caminho.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
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
                        'group flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-200',
                        isSelected
                          ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 shadow-lg shadow-purple-500/10 border border-purple-500/20'
                          : 'hover:bg-gradient-to-r hover:from-purple-500/5 hover:to-indigo-500/5 border border-transparent'
                      )}
                    >
                      {/* Image/Icon */}
                      <div className="relative flex-shrink-0">
                        {result.imageUrl ? (
                          <div className="relative size-16 sm:size-20 rounded-xl overflow-hidden border-2 border-purple-500/20 shadow-lg group-hover:border-purple-500/40 group-hover:shadow-purple-500/30 transition-all duration-200">
                            <Image
                              src={result.imageUrl}
                              alt={result.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              sizes="80px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
                          </div>
                        ) : (
                          <div
                            className={cn(
                              'flex size-16 sm:size-20 items-center justify-center rounded-xl shadow-lg transition-all duration-200',
                              result.type === 'card'
                                ? 'bg-gradient-to-br from-purple-500 to-indigo-600 group-hover:shadow-purple-500/50'
                                : 'bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:shadow-indigo-500/50'
                            )}
                          >
                            {result.imageUrl === null || result.imageUrl === undefined ? (
                              <ImageIcon className="size-6 sm:size-8 text-white/50" strokeWidth={1.5} />
                            ) : (
                              <Icon className="size-6 sm:size-8 text-white" strokeWidth={2} />
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-400 dark:group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                          {result.name}
                        </p>
                        {result.description && (
                          <p className="mt-1 text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
                            {result.description}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-purple-500/70" />
                          <p className="text-xs text-muted-foreground/60">
                            {result.type === 'card' ? 'Arcano' : 'Baralho Sagrado'}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                          <kbd className="inline-flex h-6 items-center rounded-lg border border-purple-500/30 bg-purple-500/10 px-2 font-medium">
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

          {/* Footer místico */}
          <div className="flex items-center justify-between border-t border-border/40 px-5 py-3 text-xs text-muted-foreground bg-gradient-to-r from-purple-500/5 via-transparent to-indigo-500/5">
            <div className="flex items-center gap-2">
              <kbd className="inline-flex h-6 items-center gap-1.5 rounded-lg border border-border/40 bg-background/50 px-2 font-medium">
                <span>↑↓</span>
              </kbd>
              <span>navegar</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="inline-flex h-6 items-center gap-1.5 rounded-lg border border-border/40 bg-background/50 px-2 font-medium">
                ESC
              </kbd>
              <span>fechar</span>
            </div>
          </div>
        </div>

        {/* Mystical hint */}
        <p className="mt-4 text-xs text-muted-foreground/50 text-center">
          ★ O oráculo revela seus segredos aos que buscam com intenção pura ★
        </p>
      </div>
    </div>
  )
}
