'use client'

import { MysticalLoading } from '@workspace/ui'

import { trpc } from '../../../../src/lib/trpc'
import { ELEMENT_COLORS } from '../element-colors.data'
import { NaipePageHero, NaipeCardsGrid } from '../components'

/**
 * Página de Copas - Naipe de Água
 *
 * Apresenta todas as cartas do naipe de Copas (Água) com experiência
 * mística imersiva. Segue Design Atomic com componentes modulares.
 *
 * Princípios aplicados:
 * - SOLID: Single Responsibility (cada componente uma função)
 * - KISS: Keep It Simple (apenas composição de componentes)
 * - DRY: Don't Repeat Yourself (cores e layout reutilizáveis)
 */
export default function CopasPage() {
	const { data, isLoading, error } = trpc.tarot.getAll.useQuery({ limit: 100 })

	// Filtrar apenas cartas de Copas
	const copas = data?.cards.filter((card) => card.suit === 'COPAS') || []
	const colors = ELEMENT_COLORS.agua

	// Loading fullscreen místico
	if (isLoading) {
		return <MysticalLoading variant="fullscreen" size="xl" />
	}

	return (
		<div className="relative min-h-screen">
			{/* Sacred Geometry Background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Animated circles */}
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-blue-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-cyan-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-sky-500/10 animate-pulse [animation-delay:2s]" />

				{/* Gradient orbs */}
				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-cyan-500/5 via-sky-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
				{/* Hero Imersivo */}
				<NaipePageHero
					title="Copas"
					subtitle="Naipe de Água · Elemento das Emoções"
					description="Copas representa o reino do coração. Amor, emoções, relacionamentos e a profundidade do sentir. As águas místicas que fluem através da alma humana."
					elementIcon="mdi:water"
					symbolIcon1="mdi:water"
					symbolIcon2="lucide:droplets"
					symbolIcon3="lucide:heart"
					symbolIcon4="mdi:water"
					colors={colors}
					symbol="♥"
				/>

				{/* Error State */}
				{error && (
					<div className="rounded-xl border border-destructive/50 bg-destructive/5 p-8 backdrop-blur-sm">
						<p className="text-sm text-destructive">Erro ao carregar cartas: {error.message}</p>
					</div>
				)}

				{/* Cards Grid */}
				{!error && <NaipeCardsGrid cards={copas} colors={colors} symbol="♥" />}
			</div>
		</div>
	)
}
