'use client'

import { Layers, Plus } from 'lucide-react'
import Link from 'next/link'
import { trpc } from '../../src/lib/trpc'

export default function DecksPage() {
  const { data: decks, isLoading, error } = trpc.tarot.getDecks.useQuery()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Baralhos de Tarot
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explore diferentes tradições e interpretações
          </p>
        </div>
        <Link
          href="/decks/novo"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <Plus className="size-4" />
          Novo Baralho
        </Link>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
          <p className="text-sm text-destructive">
            Erro ao carregar baralhos: {error.message}
          </p>
        </div>
      )}

      {/* Decks grid */}
      {decks && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <Link
              key={deck.id}
              href={`/decks/${deck.slug}`}
              className="group relative overflow-hidden rounded-lg border border-border/40 bg-gradient-to-br from-background to-muted/20 p-6 transition-all hover:shadow-xl hover:border-purple-500/20"
            >
              {/* Mystical glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Content */}
              <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                    <Layers className="size-6 text-white" strokeWidth={2} />
                  </div>
                  {deck.year && (
                    <span className="text-xs text-muted-foreground">
                      {deck.year}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {deck.name}
                  </h3>
                  {deck.tradition && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {deck.tradition}
                    </p>
                  )}
                </div>

                {deck.description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {deck.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground border-t border-border/40">
                  <span>{deck._count.cards} cartas</span>
                  <span>{deck._count.tags} tags</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {decks && decks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <Layers className="size-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Nenhum baralho encontrado</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Crie seu primeiro baralho para começar a jornada espiritual
          </p>
          <Link
            href="/decks/novo"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="size-4" />
            Criar Baralho
          </Link>
        </div>
      )}
    </div>
  )
}
