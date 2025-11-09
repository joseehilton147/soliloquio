'use client'

import type { TarotCard } from '@workspace/core/tarot'
import { MysticalLoading, CardBadge } from '@workspace/ui'
import { Sparkles, Layers, Star, BookOpen, Eye, Flame, Hexagon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { trpc } from '../../../src/lib/trpc'

// Helper para obter símbolo e cor do naipe
function getSuitInfo(suit: string | null) {
	if (!suit) return null

	const suitMap = {
		COPAS: { symbol: '♥', label: 'Copas', color: 'text-red-500' },
		PAUS: { symbol: '♣', label: 'Paus', color: 'text-green-600' },
		OUROS: { symbol: '♦', label: 'Ouros', color: 'text-yellow-500' },
		ESPADAS: { symbol: '♠', label: 'Espadas', color: 'text-blue-500' },
	}

	return suitMap[suit as keyof typeof suitMap] || null
}

export default function ArcanosMenoresPage() {
	const { data, isLoading, error } = trpc.tarot.getAll.useQuery({ limit: 100 })

	// Filtrar apenas Arcanos Menores (cartas que têm naipe)
	const arcanosMenores = data?.cards.filter(
		(card: any) => card.suit !== null
	) || []

	// Loading fullscreen místico
	if (isLoading) {
		return <MysticalLoading variant="fullscreen" size="xl" />
	}

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
				{/* Hero Místico */}
				<div className="text-center space-y-8">
					{/* Sacred Symbol */}
					<div className="relative inline-flex items-center justify-center">
						<div className="absolute size-24 animate-spin-slow [animation-duration:10s] [animation-direction:reverse]">
							<Hexagon className="size-full text-violet-500/20" strokeWidth={0.5} />
						</div>
						<div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
							<Flame className="size-10 text-violet-600 dark:text-violet-400" strokeWidth={1.5} />
						</div>
					</div>

					{/* Title */}
					<div className="space-y-3">
						<h1 className="text-5xl md:text-6xl font-bold tracking-tight">
							<span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
								Arcanos Menores
							</span>
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
							Os 4 elementos manifestados - Experiências cotidianas e lições práticas
						</p>
					</div>

					{/* Mystical Quote */}
					<div className="max-w-2xl mx-auto py-6 relative">
						<div className="absolute top-0 left-0 text-5xl text-violet-500/10 font-serif">"</div>
						<p className="text-base md:text-lg text-foreground/90 font-light italic leading-relaxed px-8">
							Os Arcanos Menores são as nuances da vida. Água, Fogo, Terra e Ar dançam no palco da existência humana.
						</p>
						<div className="absolute bottom-0 right-0 text-5xl text-violet-500/10 font-serif rotate-180">"</div>
					</div>

					{/* Breadcrumb */}
					<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
						<Link href="/cartas/arcanos" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
							Arcanos
						</Link>
						<span className="text-violet-500/50">/</span>
						<span className="text-foreground font-medium">Menores</span>
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
				{arcanosMenores.length > 0 && (
					<>
						{/* Sacred Path Divider */}
						<div className="relative py-8">
							<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
							<div className="relative flex items-center justify-center gap-6">
								<span className="size-1.5 rounded-full bg-violet-500/50" />
								<span className="size-2 rounded-full bg-violet-500/70" />
								<span className="size-3 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/50" />
								<span className="size-2 rounded-full bg-purple-500/70" />
								<span className="size-1.5 rounded-full bg-purple-500/50" />
							</div>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{arcanosMenores.map((card: any) => (
								<Link
									key={card.id}
									href={`/cartas/${card.slug}`}
									className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10 transition-all hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 hover:-translate-y-1"
								>
									{/* Shimmer effect on hover */}
									<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

									{/* Card Image */}
									<div className="relative aspect-[2/3] w-full overflow-hidden bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-indigo-900/20">
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
												<div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border border-purple-500/30">
													<BookOpen className="size-10 text-purple-600/50 dark:text-purple-400/50" strokeWidth={1.5} />
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

										{/* Suit Badge - Canto Inferior Direito (sempre visível) */}
										{card.suit && getSuitInfo(card.suit) && (
											<div className="absolute bottom-4 right-4 transition-opacity duration-300">
												<div className="flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md px-3 py-1.5 border border-border/40 shadow-lg">
													<span className={`text-xl font-bold ${getSuitInfo(card.suit)?.color}`}>
														{getSuitInfo(card.suit)?.symbol}
													</span>
													<span className="text-xs font-medium text-foreground/80">
														{getSuitInfo(card.suit)?.label}
													</span>
												</div>
											</div>
										)}
									</div>

									{/* Content */}
									<div className="relative p-6 space-y-3">
										<div className="space-y-2">
											<h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-400 dark:group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
												{card.name}
											</h3>

											{/* Metadata inline - responsivo */}
											<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
												{card.astrology && (
													<div className="flex items-center gap-1.5">
														<Star className="size-3 text-purple-500/70 fill-purple-500/20" />
														<span className="text-muted-foreground/70">Regência:</span>
														<span>{card.astrology}</span>
													</div>
												)}
												{card.numerology && (
													<div className="flex items-center gap-1.5">
														<span className="text-purple-600 dark:text-purple-400 font-bold">#</span>
														<span className="text-muted-foreground/70">Numerologia:</span>
														<span className="font-semibold text-purple-600 dark:text-purple-400">{card.numerology}</span>
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
												<div className="size-1.5 rounded-full bg-purple-500/70" />
												<span className="font-medium">{card.verticalMeaning?.length || 0}</span>
												<span>significados</span>
											</div>
											<div className="flex items-center gap-1.5">
												<div className="size-1.5 rounded-full bg-indigo-500/70" />
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
								<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
								<div className="relative flex items-center justify-center gap-6">
									<span className="size-1.5 rounded-full bg-violet-500/50" />
									<span className="size-2 rounded-full bg-violet-500/70" />
									<span className="size-3 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/50" />
									<span className="size-2 rounded-full bg-purple-500/70" />
									<span className="size-1.5 rounded-full bg-purple-500/50" />
								</div>
							</div>

							{/* Mystical Symbols with suit symbols */}
							<div className="flex items-center justify-center gap-6 text-muted-foreground/30">
								<span className="text-2xl text-red-500/30">♥</span>
								<span className="size-1 rounded-full bg-current" />
								<span className="text-2xl text-green-600/30">♣</span>
								<span className="size-1 rounded-full bg-current" />
								<span className="text-2xl text-yellow-500/30">♦</span>
								<span className="size-1 rounded-full bg-current" />
								<span className="text-2xl text-blue-500/30">♠</span>
							</div>
						</div>
					</>
				)}

				{/* Empty state */}
				{arcanosMenores.length === 0 && !error && (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<div className="relative">
							<div className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />
							<div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
								<Flame className="size-10 text-purple-600/50 dark:text-purple-400/50" />
							</div>
						</div>
						<h3 className="mt-8 text-2xl font-semibold">Nenhum Arcano Menor encontrado</h3>
						<p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
							Os quatro elementos aguardam para serem manifestados
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
