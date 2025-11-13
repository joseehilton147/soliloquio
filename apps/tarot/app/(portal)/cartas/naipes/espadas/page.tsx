import { Suspense } from 'react'
import { MysticalLoading } from '@workspace/ui'

import { ELEMENT_COLORS, NaipePageHero, NaipeContent } from '@/features/naipes'

/**
 * Página de Espadas - Naipe de Ar
 */
export default function EspadasPage() {
	const colors = ELEMENT_COLORS.ar

	return (
		<div className="relative min-h-screen">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-slate-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-zinc-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-gray-500/10 animate-pulse [animation-delay:2s]" />
				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-slate-500/5 via-zinc-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-zinc-500/5 via-gray-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
				<NaipePageHero
					title="Espadas"
					subtitle="Naipe de Ar · Elemento do Intelecto"
					description="Espadas representa o poder do pensamento. Lógica, verdade, clareza mental e os desafios que moldam a mente desperta."
					elementIcon="mdi:weather-windy"
					symbolIcon1="mdi:weather-windy"
					symbolIcon2="lucide:wind"
					symbolIcon3="lucide:brain"
					symbolIcon4="mdi:weather-windy"
					colors={colors}
					symbol="♠"
				/>

				<Suspense fallback={<MysticalLoading variant="fullscreen" size="xl" />}>
					<NaipeContent suit="ESPADAS" colors={colors} symbol="♠" />
				</Suspense>
			</div>
		</div>
	)
}
