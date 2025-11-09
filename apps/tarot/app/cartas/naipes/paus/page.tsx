'use client'

import type { TarotCard } from '@workspace/core/tarot'
import { MysticalLoading, CardBadge } from '@workspace/ui'
import { Sparkles, Layers, Star, BookOpen, Eye, Flame, Triangle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { trpc } from '../../../src/lib/trpc'

export default function PausPage() {
	const { data, isLoading, error } = trpc.tarot.getAll.useQuery({ limit: 100 })

	// Filtrar apenas cartas de Paus
	const paus = data?.cards.filter(
		(card: any) => card.suit === 'PAUS'
	) || []

	// Loading fullscreen místico
	if (isLoading) {
		return <MysticalLoading variant="fullscreen" size="xl" />
	}

	return (
		<div className="relative min-h-screen">
			{/* Sacred Geometry Background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Animated triangles */}
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-green-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-emerald-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-lime-500/10 animate-pulse [animation-delay:2s]" />

				{/* Gradient orbs */}
				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-emerald-500/5 via-lime-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
				{/* Hero Místico */}
				<div className="text-center space-y-8">
					{/* Sacred Symbol */}
					<div className="relative inline-flex items-center justify-center">
						<div className="absolute size-24 animate-spin-slow [animation-duration:8s]">
							<Triangle className="size-full text-green-500/20" strokeWidth={0.5} />
						</div>
						<div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
							<span className="text-4xl">♣</span>
						</div>
					</div>

					{/* Title */}
					<div className="space-y-3">
						<h1 className="text-5xl md:text-6xl font-bold tracking-tight">
							<span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 dark:from-green-400 dark:via-emerald-400 dark:to-lime-400 bg-clip-text text-transparent">
								Paus
							</span>
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
							Elemento Fogo - Ação, paixão, criatividade e energia vital
						</p>
					</div>

					{/* Mystical Quote */}
					<div className="max-w-2xl mx-auto py-6 relative">
						<div className="absolute top-0 left-0 text-5xl text-green-500/10 font-serif">"</div>
						<p className="text-base md:text-lg text-foreground/90 font-light italic leading-relaxed px-8">
							Paus é a chama que impulsiona. Coragem, empreendedorismo e a força transformadora da vontade.
						</p>
						<div className="absolute bottom-0 right-0 text-5xl text-green-500/10 font-serif rotate-180">"</div>
					</div>

					{/* Breadcrumb */}
					<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
						<Link href="/cartas/naipes" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
							Naipes
						</Link>
						<span className="text-green-500/50">/</span>
						<span className="text-foreground font-medium">Paus</span>
					</div>
				</div>

				{/* Conteúdo Educacional */}
				<div className="max-w-5xl mx-auto space-y-8">
					{/* Card Principal - O que é Paus */}
					<div className="rounded-2xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 p-8 backdrop-blur-sm shadow-xl">
						<div className="space-y-6">
							<div className="flex items-start gap-4">
								<div className="inline-flex items-center justify-center size-14 rounded-full bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-500/30 flex-shrink-0">
									<Flame className="size-7 text-green-600 dark:text-green-400" />
								</div>
								<div className="flex-1 space-y-4">
									<div>
										<h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
											O Naipe do Fogo
										</h2>
										<p className="text-sm text-green-600/80 dark:text-green-400/80 font-medium">
											Elemento Fogo · Signos: Áries, Leão e Sagitário
										</p>
									</div>
									<p className="text-foreground/80 leading-relaxed">
										<strong>Paus representa o elemento fogo e o naipe da ação.</strong> Cada uma das
										14 cartas deste naipe retrata uma jornada através da paixão, da criatividade,
										da iniciativa e da energia vital. Os Paus são símbolos de empreendedorismo,
										força de vontade e transformação ativa.
									</p>
									<p className="text-foreground/80 leading-relaxed">
										Na astrologia, Paus conecta-se aos signos de fogo: <strong>Áries</strong> (iniciativa
										e pioneirismo), <strong>Leão</strong> (liderança e expressão criativa) e{' '}
										<strong>Sagitário</strong> (expansão e aventura).
									</p>
								</div>
							</div>

							{/* Temas Principais */}
							<div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-green-500/20">
								<div className="space-y-3">
									<h3 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
										Temas Principais
									</h3>
									<ul className="space-y-2">
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-green-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80">Ação, iniciativa e dinamismo</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-green-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80">Paixão, entusiasmo e motivação</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-green-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80">Criatividade e expressão pessoal</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-green-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80">Empreendedorismo e ambição</span>
										</li>
									</ul>
								</div>
								<div className="space-y-3">
									<h3 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
										Estrutura do Naipe
									</h3>
									<ul className="space-y-2">
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80"><strong>Ás a 10:</strong> Evolução da energia criativa</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80"><strong>Valete:</strong> Mensageiro da ação</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80"><strong>Cavaleiro:</strong> Busca apaixonada</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80"><strong>Rainha e Rei:</strong> Maestria criativa</span>
										</li>
									</ul>
								</div>
							</div>

							{/* Citação Mística */}
							<div className="relative py-4 px-6 border-l-4 border-green-500/50 bg-green-500/5 rounded-r-lg">
								<p className="text-sm text-foreground/90 italic leading-relaxed">
									"Os Paus nos ensinam que a ação é a chama da transformação. Como o fogo que purifica
									e ilumina, nossa vontade tem o poder de criar mundos."
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Error State */}
				{error && (
					<div className="rounded-xl border border-destructive/50 bg-destructive/5 p-8 backdrop-blur-sm">
						<p className="text-sm text-destructive">
							Erro ao carregar cartas: {error.message}
						</p>
					</div>
				)}

				{/* Cards Grid */}
				{paus.length > 0 && (
					<>
						{/* Sacred Path Divider */}
						<div className="relative py-8">
							<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
							<div className="relative flex items-center justify-center gap-6">
								<span className="size-1.5 rounded-full bg-green-500/50" />
								<span className="size-2 rounded-full bg-green-500/70" />
								<span className="size-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50" />
								<span className="size-2 rounded-full bg-emerald-500/70" />
								<span className="size-1.5 rounded-full bg-emerald-500/50" />
							</div>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{paus.map((card: any) => (
								<Link
									key={card.id}
									href={`/cartas/${card.slug}`}
									className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10 transition-all hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-500/30 hover:-translate-y-1"
								>
									{/* Shimmer effect on hover */}
									<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

									{/* Card Image */}
									<div className="relative aspect-[2/3] w-full overflow-hidden bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-lime-900/20">
										{card.imageUrl ? (
											<>
												<Image
													src={card.imageUrl}
													alt={card.name}
													fill
													className="object-cover transition-transform duration-500 group-hover:scale-110"
													sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												/>
												{/* Gradient overlay for better text readability */}
												<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
											</>
										) : (
											<div className="flex h-full items-center justify-center">
												<div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30">
													<span className="text-5xl">♣</span>
												</div>
											</div>
										)}

										{/* Deck badge - aparece no hover */}
										{card.deck && (
											<CardBadge
												icon={Layers}
												label={card.deck.name}
												position="top-left"
											/>
										)}

										{/* Card Type Badge - Canto Superior Direito */}
										{card.cardType && (
											<CardBadge
												icon={Sparkles}
												label={card.cardType}
												position="top-right"
											/>
										)}

										{/* Suit Badge - Canto Inferior Direito */}
										<div className="absolute bottom-4 right-4">
											<div className="flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md px-3 py-1.5 border border-border/40 shadow-lg">
												<span className="text-xl font-bold text-green-600">♣</span>
												<span className="text-xs font-medium text-foreground/80">Paus</span>
											</div>
										</div>
									</div>

									{/* Content */}
									<div className="relative p-6 space-y-3">
										<div className="space-y-2">
											<h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 dark:group-hover:from-green-400 dark:group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
												{card.name}
											</h3>

											{/* Metadata inline - responsivo */}
											<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
												{card.astrology && (
													<div className="flex items-center gap-1.5">
														<Star className="size-3 text-green-500/70 fill-green-500/20" />
														<span className="text-muted-foreground/70">Regência:</span>
														<span>{card.astrology}</span>
													</div>
												)}
												{card.numerology && (
													<div className="flex items-center gap-1.5">
														<span className="text-green-600 dark:text-green-400 font-bold">#</span>
														<span className="text-muted-foreground/70">Numerologia:</span>
														<span className="font-semibold text-green-600 dark:text-green-400">{card.numerology}</span>
													</div>
												)}
											</div>
										</div>

										{card.summary && (
											<div
												className="line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed prose prose-sm prose-p:my-0 prose-p:text-muted-foreground/80 max-w-none"
												dangerouslySetInnerHTML={{ __html: card.summary }}
											/>
										)}

										{/* Stats - mais descritivas */}
										<div className="flex items-center gap-6 pt-3 text-xs text-muted-foreground border-t border-border/30">
											<div className="flex items-center gap-1.5">
												<div className="size-1.5 rounded-full bg-green-500/70" />
												<span className="font-medium">{card.verticalMeaning?.length || 0}</span>
												<span>significados</span>
											</div>
											<div className="flex items-center gap-1.5">
												<div className="size-1.5 rounded-full bg-emerald-500/70" />
												<span className="font-medium">{card.typesOfReading?.length || 0}</span>
												<span>leituras</span>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>

						{/* Mystical Footer */}
						<div className="relative py-12">
							{/* Sacred Path Divider */}
							<div className="relative py-8">
								<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
								<div className="relative flex items-center justify-center gap-6">
									<span className="size-1.5 rounded-full bg-green-500/50" />
									<span className="size-2 rounded-full bg-green-500/70" />
									<span className="size-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50" />
									<span className="size-2 rounded-full bg-emerald-500/70" />
									<span className="size-1.5 rounded-full bg-emerald-500/50" />
								</div>
							</div>

							{/* Mystical Symbols */}
							<div className="flex items-center justify-center gap-6 text-muted-foreground/30">
								<Flame className="size-5" strokeWidth={1} />
								<span className="size-1 rounded-full bg-current" />
								<Eye className="size-5" strokeWidth={1} />
								<span className="size-1 rounded-full bg-current" />
								<span className="text-2xl text-green-600/30">♣</span>
								<span className="size-1 rounded-full bg-current" />
								<BookOpen className="size-5" strokeWidth={1} />
							</div>
						</div>
					</>
				)}

				{/* Empty state */}
				{paus.length === 0 && !error && (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<div className="relative">
							<div className="absolute inset-0 animate-ping rounded-full bg-green-500/20" />
							<div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
								<span className="text-5xl">♣</span>
							</div>
						</div>
						<h3 className="mt-8 text-2xl font-semibold">Nenhuma carta de Paus encontrada</h3>
						<p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
							O fogo da criação aguarda para ser aceso
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
