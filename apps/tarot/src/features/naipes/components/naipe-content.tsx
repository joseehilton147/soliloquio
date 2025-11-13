'use client'

import { trpc } from '../../../../src/lib/trpc'
import type { NaipeColorScheme } from '@/shared/constants/element-colors'
import { NaipeCardsGrid } from './naipe-cards-grid'

type ElementColorScheme = NaipeColorScheme

interface NaipeContentProps {
	suit: 'COPAS' | 'PAUS' | 'OUROS' | 'ESPADAS'
	colors: ElementColorScheme
	symbol: string
}

export function NaipeContent({ suit, colors, symbol }: NaipeContentProps) {
	const { data, error } = trpc.tarot.getAll.useQuery({ limit: 100 })

	// Filtrar apenas cartas do naipe específico
	const cards = data?.cards.filter((card) => card.suit === suit) || []

	return (
		<>
			{/* Error State */}
			{error && (
				<div className="rounded-xl border border-destructive/50 bg-destructive/5 p-8 backdrop-blur-sm">
					<p className="text-sm text-destructive">Erro ao carregar cartas: {error.message}</p>
				</div>
			)}

			{/* Cards Grid */}
			{!error && <NaipeCardsGrid cards={cards} colors={colors} symbol={symbol} />}
		</>
	)
}
