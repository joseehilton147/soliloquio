'use client'

import { MysticalBreadcrumb, type BreadcrumbItem } from '@workspace/ui'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function NaipesPage() {
	const breadcrumbItems: BreadcrumbItem[] = [
		{ label: 'Início', href: '/' },
		{ label: 'Cartas', href: '/cartas' },
		{ label: 'Naipes' },
	]

	const naipes = [
		{
			name: 'Copas',
			symbol: '♥',
			element: 'Água',
			icon: 'lucide:heart',
			color: 'red',
			gradient: 'from-red-600 to-rose-600',
			bgGradient: 'from-red-500/10 via-rose-500/10 to-pink-500/10',
			borderColor: 'border-red-500/30',
			shadowColor: 'hover:shadow-red-500/20',
			description: 'O naipe das emoções, sentimentos, amor e intuição',
			zodiac: 'Câncer, Escorpião, Peixes',
			theme: 'Emoções, relacionamentos, amor, intuição, sentimentos profundos',
			href: '/cartas/naipes/copas'
		},
		{
			name: 'Paus',
			symbol: '♣',
			element: 'Fogo',
			icon: 'lucide:flame',
			color: 'green',
			gradient: 'from-green-600 to-emerald-600',
			bgGradient: 'from-green-500/10 via-emerald-500/10 to-teal-500/10',
			borderColor: 'border-green-500/30',
			shadowColor: 'hover:shadow-green-500/20',
			description: 'O naipe da ação, paixão, criatividade e energia vital',
			zodiac: 'Áries, Leão, Sagitário',
			theme: 'Ação, paixão, criatividade, energia, iniciativa, força vital',
			href: '/cartas/naipes/paus'
		},
		{
			name: 'Ouros',
			symbol: '♦',
			element: 'Terra',
			icon: 'lucide:coins',
			color: 'yellow',
			gradient: 'from-yellow-600 to-amber-600',
			bgGradient: 'from-yellow-500/10 via-amber-500/10 to-orange-500/10',
			borderColor: 'border-yellow-500/30',
			shadowColor: 'hover:shadow-yellow-500/20',
			description: 'O naipe do material, dinheiro, trabalho e estabilidade',
			zodiac: 'Touro, Virgem, Capricórnio',
			theme: 'Material, dinheiro, trabalho, estabilidade, prosperidade, segurança',
			href: '/cartas/naipes/ouros'
		},
		{
			name: 'Espadas',
			symbol: '♠',
			element: 'Ar',
			icon: 'lucide:swords',
			color: 'blue',
			gradient: 'from-blue-600 to-cyan-600',
			bgGradient: 'from-blue-500/10 via-cyan-500/10 to-sky-500/10',
			borderColor: 'border-blue-500/30',
			shadowColor: 'hover:shadow-blue-500/20',
			description: 'O naipe do intelecto, pensamento, comunicação e desafios',
			zodiac: 'Gêmeos, Libra, Aquário',
			theme: 'Intelecto, pensamento, comunicação, lógica, desafios mentais',
			href: '/cartas/naipes/espadas'
		}
	]

	const elementIcons = {
		'Água': 'lucide:droplets',
		'Fogo': 'lucide:flame',
		'Terra': 'lucide:coins',
		'Ar': 'lucide:wind'
	}

	return (
		<div className="space-y-8">
			{/* Breadcrumb */}
			<MysticalBreadcrumb items={breadcrumbItems} showSparkles />

			{/* Header */}
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

			{/* Intro Educational */}
			<div className="max-w-4xl mx-auto rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 p-8 backdrop-blur-sm">
				<div className="flex items-start gap-4">
					<div className="inline-flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-purple-600/20 to-violet-600/20 border-2 border-purple-500/30 flex-shrink-0">
						<Icon icon="lucide:sparkles" className="size-6 text-purple-600 dark:text-purple-400" />
					</div>
					<div className="space-y-3">
						<h2 className="text-xl font-semibold text-foreground">
							Por que 4 Naipes e 4 Elementos?
						</h2>
						<p className="text-foreground/80 leading-relaxed">
							A divisão em 4 naipes reflete uma sabedoria ancestral presente em diversas tradições:
							os 4 elementos (Água, Fogo, Terra, Ar) que compõem toda a criação. Cada elemento
							representa uma faceta da experiência humana - emoções, ação, matéria e pensamento.
						</p>
						<p className="text-foreground/80 leading-relaxed">
							Essa estrutura não é aleatória: ela espelha como vivemos nossas vidas através
							dessas 4 dimensões fundamentais, sempre buscando equilíbrio entre sentir, agir,
							construir e pensar.
						</p>
					</div>
				</div>
			</div>

			{/* Grid de Naipes */}
			<div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
				{naipes.map((naipe) => {
					const elementIcon = elementIcons[naipe.element as keyof typeof elementIcons]

					return (
						<Link
							key={naipe.name}
							href={naipe.href}
							className="group relative overflow-hidden"
						>
							<div className={`relative rounded-2xl border-2 ${naipe.borderColor} bg-gradient-to-br ${naipe.bgGradient} p-6 backdrop-blur-sm shadow-xl hover:shadow-2xl ${naipe.shadowColor} transition-all duration-300`}>
								{/* Decorative glow */}
								<div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

								<div className="relative space-y-4">
									{/* Header com símbolo */}
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className={`inline-flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-${naipe.color}-600/20 to-${naipe.color}-600/20 border-2 ${naipe.borderColor}`}>
												<Icon icon={naipe.icon} className={`size-6 text-${naipe.color}-600 dark:text-${naipe.color}-400`} />
											</div>
											<div>
												<h3 className={`text-2xl font-bold bg-gradient-to-r ${naipe.gradient} dark:from-${naipe.color}-400 dark:to-${naipe.color}-400 bg-clip-text text-transparent`}>
													{naipe.name}
												</h3>
												<p className={`text-sm text-${naipe.color}-600/80 dark:text-${naipe.color}-400/80 font-medium`}>
													14 Cartas · Elemento {naipe.element}
												</p>
											</div>
										</div>
										<span className={`text-5xl text-${naipe.color}-500/30`}>{naipe.symbol}</span>
									</div>

									{/* Description */}
									<p className="text-foreground/80 leading-relaxed">
										{naipe.description}
									</p>

									{/* Element Info */}
									<div className={`flex items-center gap-2 p-3 rounded-lg bg-${naipe.color}-500/10 border ${naipe.borderColor}`}>
										<Icon icon={elementIcon} className={`size-5 text-${naipe.color}-600 dark:text-${naipe.color}-400`} />
										<div>
											<p className="text-xs text-muted-foreground">Elemento</p>
											<p className={`text-sm font-semibold text-${naipe.color}-700 dark:text-${naipe.color}-300`}>
												{naipe.element}
											</p>
										</div>
									</div>

									{/* Zodiac */}
									<div className="space-y-2 pt-3 border-t border-border/40">
										<p className="text-xs font-medium text-muted-foreground">SIGNOS ASSOCIADOS</p>
										<p className={`text-sm font-medium text-${naipe.color}-700 dark:text-${naipe.color}-300`}>
											{naipe.zodiac}
										</p>
									</div>

									{/* Theme */}
									<div className="space-y-2">
										<p className="text-xs font-medium text-muted-foreground">TEMAS PRINCIPAIS</p>
										<p className="text-sm text-foreground/70">
											{naipe.theme}
										</p>
									</div>

									{/* CTA */}
									<div className="pt-2 flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
										<span className={`text-${naipe.color}-600 dark:text-${naipe.color}-400`}>
											Explorar {naipe.name}
										</span>
										<Icon icon="lucide:sparkles" className={`size-4 text-${naipe.color}-600 dark:text-${naipe.color}-400`} />
									</div>
								</div>
							</div>
						</Link>
					)
				})}
			</div>

			{/* Educational Footer */}
			<div className="max-w-4xl mx-auto rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-purple-500/5 p-8 backdrop-blur-sm">
				<h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
					Estrutura de Cada Naipe
				</h3>
				<div className="space-y-3 text-foreground/80">
					<p className="leading-relaxed">
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
					<p className="leading-relaxed pt-3">
						A combinação dessas 56 cartas (4 naipes × 14 cartas) forma os Arcanos Menores,
						oferecendo uma rica tapeçaria de significados para compreender as situações
						práticas da vida cotidiana.
					</p>
				</div>
			</div>
		</div>
	)
}
