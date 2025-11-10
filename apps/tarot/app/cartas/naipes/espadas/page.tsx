'use client'

import { MysticalLoading } from '@workspace/ui'

import { trpc } from '../../../../src/lib/trpc'
import { ELEMENT_COLORS } from '../element-colors.data'
import { NaipePageHero, NaipeCardsGrid } from '../components'

/**
 * Página de Espadas - Naipe de Ar
 *
 * Apresenta todas as cartas do naipe de Espadas (Ar) com experiência
 * mística imersiva. Segue Design Atomic com componentes modulares.
 *
 * Princípios aplicados:
 * - SOLID: Single Responsibility (cada componente uma função)
 * - KISS: Keep It Simple (apenas composição de componentes)
 * - DRY: Don't Repeat Yourself (cores e layout reutilizáveis)
 */
export default function EspadasPage() {
	const { data, isLoading, error } = trpc.tarot.getAll.useQuery({ limit: 100 })

	// Filtrar apenas cartas de Espadas
	const espadas = data?.cards.filter((card) => card.suit === 'ESPADAS') || []
	const colors = ELEMENT_COLORS.ar

	// Loading fullscreen místico
	if (isLoading) {
		return <MysticalLoading variant="fullscreen" size="xl" />
	}

	return (
		<div className="relative min-h-screen">
			{/* Sacred Geometry Background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Animated circles */}
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-slate-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-gray-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-zinc-500/10 animate-pulse [animation-delay:2s]" />

				{/* Gradient orbs */}
				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-slate-500/5 via-gray-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-gray-500/5 via-zinc-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
				{/* Hero Imersivo */}
				<NaipePageHero
					title="Espadas"
					subtitle="Naipe de Ar · Elemento do Intelecto"
					description="Espadas representa o reino da mente. Pensamento, comunicação, verdade e os desafios do intelecto. O ar livre que circula portando clareza."
					elementIcon="lucide:sword"
					symbolIcon1="lucide:sword"
					symbolIcon2="lucide:wind"
					symbolIcon3="lucide:brain"
					symbolIcon4="lucide:sword"
					colors={colors}
					symbol="♠"
				/>

				{/* Error State */}
				{error && (
					<div className="rounded-xl border border-destructive/50 bg-destructive/5 p-8 backdrop-blur-sm">
						<p className="text-sm text-destructive">Erro ao carregar cartas: {error.message}</p>
					</div>
				)}

				{/* Cards Grid */}
				{!error && <NaipeCardsGrid cards={espadas} colors={colors} symbol="♠" />}
			</div>
		</div>
	)
}
