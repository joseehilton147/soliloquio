'use client'

import { MysticalLoading } from '@workspace/ui'

import { trpc } from '../../../../src/lib/trpc'
import { ELEMENT_COLORS } from '../element-colors.data'
import { NaipePageHero, NaipeCardsGrid } from '../components'

/**
 * Página de Paus - Naipe de Fogo
 *
 * Apresenta todas as cartas do naipe de Paus (Fogo) com experiência
 * mística imersiva. Segue Design Atomic com componentes modulares.
 *
 * Princípios aplicados:
 * - SOLID: Single Responsibility (cada componente uma função)
 * - KISS: Keep It Simple (apenas composição de componentes)
 * - DRY: Don't Repeat Yourself (cores e layout reutilizáveis)
 */
export default function PausPage() {
	const { data, isLoading, error } = trpc.tarot.getAll.useQuery({ limit: 100 })

	// Filtrar apenas cartas de Paus
	const paus = data?.cards.filter((card) => card.suit === 'PAUS') || []
	const colors = ELEMENT_COLORS.fogo

	// Loading fullscreen místico
	if (isLoading) {
		return <MysticalLoading variant="fullscreen" size="xl" />
	}

	return (
		<div className="relative min-h-screen">
			{/* Sacred Geometry Background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Animated circles */}
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-red-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-orange-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-amber-500/10 animate-pulse [animation-delay:2s]" />

				{/* Gradient orbs */}
				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-orange-500/5 via-amber-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
				{/* Hero Imersivo */}
				<NaipePageHero
					title="Paus"
					subtitle="Naipe de Fogo · Elemento da Ação"
					description="Paus representa o reino da ação. Paixão, criatividade, coragem e a força transformadora da vontade. O fogo místico que impulsiona a transformação."
					elementIcon="lucide:flame"
					symbolIcon1="lucide:flame"
					symbolIcon2="lucide:zap"
					symbolIcon3="lucide:sparkles"
					symbolIcon4="lucide:flame"
					colors={colors}
					symbol="♣"
				/>

				{/* Error State */}
				{error && (
					<div className="rounded-xl border border-destructive/50 bg-destructive/5 p-8 backdrop-blur-sm">
						<p className="text-sm text-destructive">Erro ao carregar cartas: {error.message}</p>
					</div>
				)}

				{/* Cards Grid */}
				{!error && <NaipeCardsGrid cards={paus} colors={colors} symbol="♣" />}
			</div>
		</div>
	)
}
