'use client'

import { Search as SearchIcon, Sparkles, Layers, X, ImageIcon, Hash, Star, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { cn } from '@workspace/ui/lib/utils'
import { trpc } from '../lib/trpc'
import { SearchFieldBadge } from './search-field-badge'

interface GlobalSearchProps {
  open: boolean
  onClose: () => void
}

interface SearchMatch {
  field: 'nome' | 'numerologia' | 'astrologia' | 'tag' | 'significado' | 'descrição'
  value: string
}

/**
 * Global Search Modal - Fuzzy search para cartas e baralhos
 * Design místico com resultados agrupados por tipo
 * Expandido para buscar: nome, tags, símbolos, numerologia, astrologia, significados
 */
export function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Query cards and decks
  const { data: cardsData } = trpc.tarot.getAll.useQuery(
    { limit: 100, offset: 0 },
    { enabled: query.length >= 1 }
  )
  const { data: decks } = trpc.tarot.getDecks.useQuery(undefined, {
    enabled: query.length >= 1,
  })

  // Advanced filter function for cards - busca em múltiplos campos
  const filterCards = useCallback((cards: any[] | undefined) => {
    if (!cards) return []

    const searchTerm = query.toLowerCase().trim()

    return cards.filter((card) => {
      // Busca no nome
      if (card.name.toLowerCase().includes(searchTerm)) return true

      // Busca na numerologia
      if (card.numerology?.toLowerCase().includes(searchTerm)) return true

      // Busca na astrologia
      if (card.astrology?.toLowerCase().includes(searchTerm)) return true

      // Busca no tipo de carta (Arcano Maior, Arcano Menor, etc)
      if (card.cardType?.toLowerCase().includes(searchTerm)) return true

      // Busca no resumo
      if (card.summary?.toLowerCase().includes(searchTerm)) return true

      // Busca nos significados verticais (JsonValue → string[])
      const verticalMeanings = card.verticalMeaning as unknown as string[]
      if (Array.isArray(verticalMeanings)) {
        if (verticalMeanings.some((meaning) =>
          typeof meaning === 'string' && meaning.toLowerCase().includes(searchTerm)
        )) return true
      }

      // Busca nos significados invertidos (JsonValue → string[])
      const invertedMeanings = card.invertedMeaning as unknown as string[]
      if (Array.isArray(invertedMeanings)) {
        if (invertedMeanings.some((meaning) =>
          typeof meaning === 'string' && meaning.toLowerCase().includes(searchTerm)
        )) return true
      }

      return false
    }).map((card) => {
      // Determinar onde foi o match para mostrar badge
      const matches: SearchMatch[] = []
      const searchTerm = query.toLowerCase().trim()

      if (card.name.toLowerCase().includes(searchTerm)) {
        matches.push({ field: 'nome', value: card.name })
      }
      if (card.numerology?.toLowerCase().includes(searchTerm)) {
        matches.push({ field: 'numerologia', value: card.numerology })
      }
      if (card.astrology?.toLowerCase().includes(searchTerm)) {
        matches.push({ field: 'astrologia', value: card.astrology || '' })
      }
      if (card.cardType?.toLowerCase().includes(searchTerm)) {
        matches.push({ field: 'tag', value: card.cardType })
      }
      if (card.summary?.toLowerCase().includes(searchTerm)) {
        matches.push({ field: 'descrição', value: card.summary })
      }

      const verticalMeanings = card.verticalMeaning as unknown as string[]
      if (Array.isArray(verticalMeanings) && verticalMeanings.some((m) =>
        typeof m === 'string' && m.toLowerCase().includes(searchTerm)
      )) {
        matches.push({ field: 'significado', value: 'vertical' })
      }

      const invertedMeanings = card.invertedMeaning as unknown as string[]
      if (Array.isArray(invertedMeanings) && invertedMeanings.some((m) =>
        typeof m === 'string' && m.toLowerCase().includes(searchTerm)
      )) {
        matches.push({ field: 'significado', value: 'invertido' })
      }

      return { card, matches }
    })
  }, [query])

  // Filter results based on query
  const filteredCardsWithMatches = filterCards(cardsData?.cards)

  const filteredDecks = (decks || []).filter((deck) =>
    deck.name.toLowerCase().includes(query.toLowerCase()) ||
    deck.description?.toLowerCase().includes(query.toLowerCase()) ||
    deck.tradition?.toLowerCase().includes(query.toLowerCase())
  )

  // Combine results
  const allResults = [
    ...filteredCardsWithMatches.map(({ card, matches }) => ({
      type: 'card' as const,
      id: card.id,
      name: card.name,
      slug: card.slug,
      description: card.summary,
      imageUrl: card.imageUrl,
      cardType: card.cardType,
      icon: Sparkles,
      matches,
    })),
    ...filteredDecks.map((deck) => ({
      type: 'deck' as const,
      id: deck.id,
      name: deck.name,
      slug: deck.slug,
      description: deck.description,
      imageUrl: deck.imageUrl,
      icon: Layers,
      matches: [] as SearchMatch[],
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
        const url = result.type === 'card' ? `/cartas/${result.slug}` : `/baralhos/${result.slug}`
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
      className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackgroundClick}
    >
      {/* Mystical background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 size-96 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 size-96 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <div className="flex h-full w-full items-center justify-center relative px-4" onClick={handleBackgroundClick}>
        <div className="flex flex-col items-center w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
          <div
            className="w-full rounded-2xl border border-purple-500/20 bg-background/95 backdrop-blur-md shadow-2xl shadow-purple-500/10 animate-in slide-in-from-top-4 duration-300"
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
              placeholder="Buscar nome, tipo, numerologia, astrologia, significados..."
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
            {query.length < 1 ? (
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
                  Comece digitando para buscar
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-md">
                  <SearchFieldBadge icon={Tag} label="Nome" />
                  <SearchFieldBadge icon={Sparkles} label="Tipo de Carta" />
                  <SearchFieldBadge icon={Hash} label="Numerologia" />
                  <SearchFieldBadge icon={Star} label="Astrologia" />
                  <SearchFieldBadge icon={Sparkles} label="Significados" />
                </div>
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
                      : `/baralhos/${result.slug}`

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
                          <div
                            className="mt-1 text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed prose prose-sm prose-p:my-0 prose-p:text-muted-foreground/80 max-w-none"
                            dangerouslySetInnerHTML={{ __html: result.description }}
                          />
                        )}

                        {/* Match badges - mostra onde foi encontrado */}
                        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                          {result.type === 'card' && result.cardType && (
                            <SearchFieldBadge
                              icon={Sparkles}
                              label={result.cardType}
                              variant="compact"
                            />
                          )}

                          {result.matches && result.matches.length > 0 && (
                            <>
                              {result.type === 'card' && result.cardType && (
                                <span className="text-muted-foreground/40">•</span>
                              )}
                              <div className="flex items-center gap-1 flex-wrap">
                                {result.matches.slice(0, 2).map((match, i) => {
                                  const iconMap = {
                                    numerologia: Hash,
                                    astrologia: Star,
                                    significado: Sparkles,
                                    tag: Tag,
                                    nome: Tag,
                                    descrição: Sparkles,
                                  } as const

                                  const Icon = iconMap[match.field as keyof typeof iconMap] || Tag

                                  return (
                                    <SearchFieldBadge
                                      key={i}
                                      icon={Icon}
                                      label={match.field}
                                      variant="compact"
                                    />
                                  )
                                })}
                                {result.matches.length > 2 && (
                                  <span className="text-xs text-muted-foreground/60">
                                    +{result.matches.length - 2}
                                  </span>
                                )}
                              </div>
                            </>
                          )}
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
    </div>
  )
}
