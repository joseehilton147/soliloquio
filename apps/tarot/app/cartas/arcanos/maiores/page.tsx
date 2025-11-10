import { Suspense } from 'react'
import { MysticalLoading } from '@workspace/ui'

import { CartasHeroSection } from '../components'
import { ArcanosMaioresContent } from './arcanos-maiores-content'

export default function ArcanosMaioresPage() {
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
					title="Arcanos Maiores"
					subtitle="22 Caminhos da Jornada do Louco"
					description="Os Arcanos Maiores são os grandes mistérios. Forças cósmicas que moldam destinos e revelam verdades eternas da jornada espiritual humana."
					iconMain="lucide:crown"
					symbolIcon1="game-icons:pentagram"
					symbolIcon2="lucide:moon"
					symbolIcon3="lucide:star"
					symbolIcon4="game-icons:crystal-ball"
					breadcrumbParent={{ label: 'Arcanos', href: '/cartas/arcanos' }}
					breadcrumbCurrent="Maiores"
					colorScheme="violet"
				/>

				{/* Conteúdo Dinâmico com Suspense - Streaming */}
				<Suspense fallback={<MysticalLoading variant="fullscreen" size="xl" />}>
					<ArcanosMaioresContent />
				</Suspense>
			</div>
		</div>
	)
}
