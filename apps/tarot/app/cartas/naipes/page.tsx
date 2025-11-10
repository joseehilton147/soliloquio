'use client'

import { MysticalBreadcrumb, type BreadcrumbItem } from '@workspace/ui'
import { NAIPES } from './naipes.data'
import { NaipeCard, FourElementsSection, NaipeStructureSection } from './components'

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

			<div className="text-center space-y-4 max-w-3xl mx-auto">
				<h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
					Os 4 Naipes do Tarô
				</h1>
				<p className="text-lg text-muted-foreground leading-relaxed">
					Os Arcanos Menores são divididos em 4 naipes, cada um representando um dos
					elementos fundamentais da natureza e diferentes dimensões da experiência humana.
					Cada naipe contém 14 cartas (do Ás ao Rei).
				</p>
			</div>

			<FourElementsSection />

			<div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
				{NAIPES.map((naipe) => (
					<NaipeCard key={naipe.name} naipe={naipe} />
				))}
			</div>

			<NaipeStructureSection />
		</div>
	)
}
