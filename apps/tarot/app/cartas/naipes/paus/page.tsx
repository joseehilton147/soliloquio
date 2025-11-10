import { Suspense } from 'react'
import { MysticalLoading } from '@workspace/ui'

import { ELEMENT_COLORS } from '../element-colors.data'
import { NaipePageHero, NaipeContent } from '../components'

/**
 * Página de Paus - Naipe de Fogo
 */
export default function PausPage() {
	const colors = ELEMENT_COLORS.fogo

	return (
		<div className="relative min-h-screen">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-red-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-orange-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-amber-500/10 animate-pulse [animation-delay:2s]" />
				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-orange-500/5 via-amber-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
				<NaipePageHero
					title="Paus"
					subtitle="Naipe de Fogo · Elemento da Ação"
					description="Paus representa a chama da vontade. Criatividade, paixão, iniciativa e a energia transformadora do espírito empreendedor."
					elementIcon="mdi:fire"
					symbolIcon1="mdi:fire"
					symbolIcon2="lucide:flame"
					symbolIcon3="lucide:zap"
					symbolIcon4="mdi:fire"
					colors={colors}
					symbol="♣"
				/>

				<Suspense fallback={<MysticalLoading variant="fullscreen" size="xl" />}>
					<NaipeContent suit="PAUS" colors={colors} symbol="♣" />
				</Suspense>
			</div>
		</div>
	)
}
