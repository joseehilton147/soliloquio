'use client'

import { MysticalBreadcrumb, type BreadcrumbItem } from '@workspace/ui'
import { NAIPES, NaipeCard, NaipeStructureSection, ArcanosReferenceSection, NaipesHeroSection } from '@/features/naipes'

/**
 * Página dos 4 Naipes do Tarô
 *
 * Apresenta os 4 naipes dos Arcanos Menores (Copas, Paus, Ouros, Espadas),
 * suas associações elementais, zodiacais e simbólicas.
 *
 * Segue Design Atomic com componentes modulares e dados centralizados.
 */
export default function NaipesPage() {
	const breadcrumbItems: BreadcrumbItem[] = [
		{ label: 'Início', href: '/' },
		{ label: 'Cartas', href: '/cartas' },
		{ label: 'Naipes' },
	]

	return (
		<div className="space-y-8">
			<MysticalBreadcrumb items={breadcrumbItems} showSparkles />

			<NaipesHeroSection />

			<div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
				{NAIPES.map((naipe) => (
					<NaipeCard key={naipe.name} naipe={naipe} />
				))}
			</div>

			<NaipeStructureSection />

			<ArcanosReferenceSection />
		</div>
	)
}
