import { Suspense } from 'react'
import { MysticalLoading } from '@workspace/ui'

import { ELEMENT_COLORS } from '../element-colors.data'
import { NaipePageHero, NaipeContent } from '../components'

/**
 * Página de Ouros - Naipe de Terra
 */
export default function OurosPage() {
	const colors = ELEMENT_COLORS.terra

	return (
		<div className="relative min-h-screen">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-amber-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-yellow-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-lime-500/10 animate-pulse [animation-delay:2s]" />
				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-yellow-500/5 via-lime-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
				<NaipePageHero
					title="Ouros"
					subtitle="Naipe de Terra · Elemento do Material"
					description="Ouros representa a manifestação física. Prosperidade, segurança, recursos tangíveis e a sabedoria de construir no mundo material."
					elementIcon="mdi:mountain"
					symbolIcon1="mdi:mountain"
					symbolIcon2="lucide:coins"
					symbolIcon3="lucide:leaf"
					symbolIcon4="mdi:mountain"
					colors={colors}
					symbol="♦"
				/>

				<Suspense fallback={<MysticalLoading variant="fullscreen" size="xl" />}>
					<NaipeContent suit="OUROS" colors={colors} symbol="♦" />
				</Suspense>
			</div>
		</div>
	)
}
