import { MysticalBreadcrumb, type BreadcrumbItem } from '@workspace/ui'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { ARCANOS, ArcanoPortalCard, ArcanosHeroSection } from '@/features/arcanos'

/**
 * Página dos Arcanos do Tarô
 *
 * Apresenta os 2 tipos de arcanos (Maiores e Menores) com experiência
 * mística imersiva inspirada no portal da home.
 *
 * Segue Design Atomic com componentes modulares e dados centralizados.
 */
export default function ArcanosPage() {
	const breadcrumbItems: BreadcrumbItem[] = [
		{ label: 'Início', href: '/' },
		{ label: 'Cartas', href: '/cartas' },
		{ label: 'Arcanos' },
	]

	return (
		<div className="space-y-8">
			<MysticalBreadcrumb items={breadcrumbItems} showSparkles />

			<ArcanosHeroSection />

			<div className="grid gap-8 lg:grid-cols-1 max-w-6xl mx-auto">
				{ARCANOS.map((arcano, index) => (
					<ArcanoPortalCard
						key={arcano.id}
						arcano={arcano}
						reversed={index % 2 !== 0}
					/>
				))}
			</div>

			{/* Seção de conexão com Naipes - Mística */}
			<div className="max-w-4xl mx-auto mt-12">
				<div className="relative overflow-hidden rounded-2xl border-2 border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-950/40 via-purple-950/30 to-pink-950/40 p-8 backdrop-blur-sm">
					{/* Fundo místico sutil */}
					<div className="absolute inset-0 pointer-events-none overflow-hidden">
						<div className="absolute inset-0 bg-gradient-radial from-fuchsia-900/20 via-purple-950/10 to-transparent" />
						<div className="absolute top-1/2 right-8 -translate-y-1/2 size-[200px] bg-gradient-to-br from-fuchsia-600/10 via-pink-600/5 to-transparent rounded-full blur-2xl animate-pulse [animation-duration:3s]" />

						{/* Símbolos dos 4 naipes */}
						<div className="absolute top-4 right-4 opacity-5 animate-pulse [animation-duration:4s]">
							<Icon icon="mdi:cards" className="size-16 text-fuchsia-500" />
						</div>
					</div>

					{/* Conteúdo */}
					<div className="relative z-10 text-center space-y-6">
						{/* Título */}
						<div className="flex items-center justify-center gap-3">
							<Icon icon="lucide:sparkles" className="size-7 text-fuchsia-400/70" />
							<h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(232,121,249,0.3)]">
								Descubra os 4 Naipes Elementais
							</h3>
							<Icon icon="lucide:sparkles" className="size-7 text-fuchsia-400/70" />
						</div>

						{/* Descrição */}
						<p className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
							Explore como <span className="text-fuchsia-300 font-semibold">Copas, Paus, Ouros e Espadas</span>{' '}
							representam os 4 elementos da natureza (Água, Fogo, Terra, Ar) e as diferentes
							dimensões da experiência humana nos Arcanos Menores.
						</p>

						{/* Símbolos dos elementos */}
						<div className="flex items-center justify-center gap-6 py-4">
							<Icon icon="mdi:water" className="size-8 text-blue-400/70" />
							<Icon icon="mdi:fire" className="size-8 text-red-400/70" />
							<Icon icon="mdi:mountain" className="size-8 text-stone-400/70" />
							<Icon icon="mdi:weather-windy" className="size-8 text-slate-400/70" />
						</div>

						{/* CTA */}
						<Link
							href="/cartas/naipes"
							className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all hover:scale-105 group"
						>
							<span>Explorar os Naipes Místicos</span>
							<Icon icon="lucide:arrow-right" className="size-5 group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
