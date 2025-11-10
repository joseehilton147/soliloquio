'use client'

import { MysticalBreadcrumb, type BreadcrumbItem } from '@workspace/ui'
import { NAIPES } from './naipes.data'
import { NaipeCard, EducationalSection } from './components'

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

			<EducationalSection
				title="Por que 4 Naipes e 4 Elementos?"
				icon="lucide:sparkles"
				gradientFrom="purple"
				gradientTo="violet"
			>
				<p>
					A divisão em 4 naipes reflete uma sabedoria ancestral presente em diversas tradições:
					os 4 elementos (Água, Fogo, Terra, Ar) que compõem toda a criação. Cada elemento
					representa uma faceta da experiência humana - emoções, ação, matéria e pensamento.
				</p>
				<p>
					Essa estrutura não é aleatória: ela espelha como vivemos nossas vidas através
					dessas 4 dimensões fundamentais, sempre buscando equilíbrio entre sentir, agir,
					construir e pensar.
				</p>
			</EducationalSection>

			<div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
				{NAIPES.map((naipe) => (
					<NaipeCard key={naipe.name} naipe={naipe} />
				))}
			</div>

			<EducationalSection
				title="Estrutura de Cada Naipe"
				gradientFrom="indigo"
				gradientTo="blue"
			>
				<p>
					Cada um dos 4 naipes contém 14 cartas, divididas em:
				</p>
				<ul className="space-y-2 ml-6">
					<li className="flex items-start gap-3">
						<span className="mt-1.5 size-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
						<span><strong>10 Cartas Numeradas</strong> (Ás a 10) - Representam a evolução de uma situação ou energia</span>
					</li>
					<li className="flex items-start gap-3">
						<span className="mt-1.5 size-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
						<span><strong>4 Cartas da Corte</strong> (Valete, Cavaleiro, Rainha, Rei) - Representam pessoas, personalidades ou aspectos de nós mesmos</span>
					</li>
				</ul>
				<p>
					A combinação dessas 56 cartas (4 naipes × 14 cartas) forma os Arcanos Menores,
					oferecendo uma rica tapeçaria de significados para compreender as situações
					práticas da vida cotidiana.
				</p>
			</EducationalSection>
		</div>
	)
}
