'use client'

import { MysticalBreadcrumb, type BreadcrumbItem } from '@workspace/ui'
import { Crown, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ArcanosPage() {
	const breadcrumbItems: BreadcrumbItem[] = [
		{ label: 'Início', href: '/' },
		{ label: 'Cartas', href: '/cartas' },
		{ label: 'Arcanos' },
	]

	return (
		<div className="space-y-8">
			{/* Breadcrumb */}
			<MysticalBreadcrumb items={breadcrumbItems} showSparkles />

			{/* Header */}
			<div className="text-center space-y-4 max-w-3xl mx-auto">
				<h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
					Os Arcanos do Tarô
				</h1>
				<p className="text-lg text-muted-foreground leading-relaxed">
					O tarô tradicional é composto por 78 cartas, divididas em dois grupos místicos:
					os Arcanos Maiores e os Arcanos Menores. Cada grupo possui sua própria função
					e profundidade de significado.
				</p>
			</div>

			{/* Grid de Arcanos */}
			<div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
				{/* Arcanos Maiores */}
				<div className="group relative overflow-hidden rounded-2xl border-2 border-violet-500/30 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-indigo-500/10 p-8 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300">
					{/* Decorative glow */}
					<div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

					<div className="relative space-y-6">
						{/* Icon */}
						<div className="inline-flex items-center justify-center size-16 rounded-full bg-gradient-to-br from-violet-600/20 to-purple-600/20 border-2 border-violet-500/30">
							<Crown className="size-8 text-violet-600 dark:text-violet-400" />
						</div>

						{/* Title */}
						<div>
							<h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
								Arcanos Maiores
							</h2>
							<p className="text-sm text-violet-600/80 dark:text-violet-400/80 font-medium">
								22 Cartas · A Jornada da Alma
							</p>
						</div>

						{/* Description */}
						<div className="space-y-4 text-foreground/80">
							<p className="leading-relaxed">
								Os Arcanos Maiores representam a <strong>jornada espiritual do ser humano</strong>,
								desde O Louco (0) até O Mundo (21). São 22 cartas que ilustram os grandes temas
								da existência, arquétipos universais e lições profundas da vida.
							</p>
							<p className="leading-relaxed">
								Cada carta é um portal para compreender aspectos fundamentais da consciência humana:
								amor (Os Amantes), sabedoria (O Eremita), transformação (A Morte), equilíbrio (A Justiça)
								e iluminação (O Sol).
							</p>
							<p className="leading-relaxed text-sm italic text-violet-600 dark:text-violet-400">
								"Os Arcanos Maiores são espelhos da alma, refletindo nossa jornada de autoconhecimento
								e evolução espiritual."
							</p>
						</div>

						{/* Key Points */}
						<div className="space-y-3 pt-4 border-t border-violet-500/20">
							<div className="flex items-start gap-3">
								<div className="mt-1 size-1.5 rounded-full bg-violet-500 flex-shrink-0" />
								<p className="text-sm text-foreground/80">
									<strong>Simbolismo profundo:</strong> Contêm símbolos ancestrais e arquétipos universais
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="mt-1 size-1.5 rounded-full bg-violet-500 flex-shrink-0" />
								<p className="text-sm text-foreground/80">
									<strong>Lições de vida:</strong> Representam grandes temas existenciais e espirituais
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="mt-1 size-1.5 rounded-full bg-violet-500 flex-shrink-0" />
								<p className="text-sm text-foreground/80">
									<strong>Jornada do Louco:</strong> Narram a evolução da consciência humana
								</p>
							</div>
						</div>

						{/* CTA */}
						<Link
							href="/cartas/arcanos/maiores"
							className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-violet-500/30 transition-all hover:scale-105 group-hover:gap-3"
						>
							<span>Explorar Arcanos Maiores</span>
							<ArrowRight className="size-4" />
						</Link>
					</div>
				</div>

				{/* Arcanos Menores */}
				<div className="group relative overflow-hidden rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-purple-500/10 p-8 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
					{/* Decorative glow */}
					<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

					<div className="relative space-y-6">
						{/* Icon */}
						<div className="inline-flex items-center justify-center size-16 rounded-full bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border-2 border-indigo-500/30">
							<Sparkles className="size-8 text-indigo-600 dark:text-indigo-400" />
						</div>

						{/* Title */}
						<div>
							<h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
								Arcanos Menores
							</h2>
							<p className="text-sm text-indigo-600/80 dark:text-indigo-400/80 font-medium">
								56 Cartas · 4 Naipes Elementais
							</p>
						</div>

						{/* Description */}
						<div className="space-y-4 text-foreground/80">
							<p className="leading-relaxed">
								Os Arcanos Menores representam <strong>situações cotidianas, escolhas práticas
								e influências</strong> que moldam nosso dia a dia. São 56 cartas divididas em
								4 naipes, cada um conectado a um elemento da natureza.
							</p>
							<p className="leading-relaxed">
								Enquanto os Arcanos Maiores mostram as grandes diretrizes espirituais, os Menores
								revelam como essas energias se manifestam no nosso livre arbítrio, nas nossas
								atitudes, relacionamentos e desafios diários.
							</p>
							<p className="leading-relaxed text-sm italic text-indigo-600 dark:text-indigo-400">
								"Os Arcanos Menores são o campo de ação da nossa vontade, onde exercemos
								nossas escolhas e construímos nosso destino."
							</p>
						</div>

						{/* Key Points */}
						<div className="space-y-3 pt-4 border-t border-indigo-500/20">
							<div className="flex items-start gap-3">
								<div className="mt-1 size-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
								<p className="text-sm text-foreground/80">
									<strong>Vida prática:</strong> Representam situações do cotidiano e escolhas pessoais
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="mt-1 size-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
								<p className="text-sm text-foreground/80">
									<strong>4 Elementos:</strong> Cada naipe conecta-se a Água, Fogo, Terra ou Ar
								</p>
							</div>
							<div className="flex items-start gap-3">
								<div className="mt-1 size-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
								<p className="text-sm text-foreground/80">
									<strong>Livre arbítrio:</strong> Mostram como exercemos nossa vontade e ação
								</p>
							</div>
						</div>

						{/* CTA */}
						<Link
							href="/cartas/arcanos/menores"
							className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all hover:scale-105 group-hover:gap-3"
						>
							<span>Explorar Arcanos Menores</span>
							<ArrowRight className="size-4" />
						</Link>
					</div>
				</div>
			</div>

			{/* Link para Naipes */}
			<div className="max-w-4xl mx-auto mt-12">
				<div className="rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 via-fuchsia-500/5 to-pink-500/5 p-8 text-center backdrop-blur-sm">
					<h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-3">
						Quer entender os 4 Naipes dos Arcanos Menores?
					</h3>
					<p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
						Descubra como Copas, Paus, Ouros e Espadas representam os 4 elementos da natureza
						e as diferentes dimensões da experiência humana.
					</p>
					<Link
						href="/cartas/naipes"
						className="inline-flex items-center gap-2 rounded-lg border-2 border-purple-500/30 bg-purple-600/10 px-6 py-3 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-600/20 transition-all hover:scale-105"
					>
						<span>Explorar os Naipes</span>
						<ArrowRight className="size-4" />
					</Link>
				</div>
			</div>
		</div>
	)
}
