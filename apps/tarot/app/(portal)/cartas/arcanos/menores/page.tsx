import { Suspense } from 'react'
import { MysticalLoading } from '@workspace/ui'

import { CartasHeroSection } from '@/features/arcanos'
import { ArcanosMenoresContent } from './arcanos-menores-content'

export default function ArcanosMenoresPage() {
	return (
		<div className="relative min-h-screen">
			{/* Sacred Geometry Background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Animated circles */}
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-violet-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-purple-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-indigo-500/10 animate-pulse [animation-delay:2s]" />

				{/* Gradient orbs */}
				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-purple-500/5 via-indigo-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
				{/* Hero Imersivo - Renderizado estaticamente (SSR) */}
				<CartasHeroSection
					title="Arcanos Menores"
					subtitle="Os 4 Elementos Manifestados"
					description="Os Arcanos Menores são as nuances da vida. Água, Fogo, Terra e Ar dançam no palco da existência humana, revelando experiências cotidianas e lições práticas."
					iconMain="lucide:sparkles"
					symbolIcon1="mdi:water"
					symbolIcon2="mdi:fire"
					symbolIcon3="mdi:mountain"
					symbolIcon4="mdi:weather-windy"
					breadcrumbParent={{ label: 'Arcanos', href: '/cartas/arcanos' }}
					breadcrumbCurrent="Menores"
					colorScheme="indigo"
				/>

				{/* Conteúdo Dinâmico com Suspense - Streaming */}
				<Suspense fallback={<MysticalLoading variant="fullscreen" size="xl" />}>
					<ArcanosMenoresContent />
				</Suspense>
			</div>
		</div>
	)
}
