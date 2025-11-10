'use client'

import type { TarotCard } from '@workspace/core/tarot'
import { MysticalLoading, CardBadge } from '@workspace/ui'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'

import { trpc } from '../../../../src/lib/trpc'

export default function EspadasPage() {
	const { data, isLoading, error } = trpc.tarot.getAll.useQuery({ limit: 100 })

	// Filtrar apenas cartas de Espadas
	const espadas = data?.cards.filter(
		(card: any) => card.suit === 'ESPADAS'
	) || []

	// Loading fullscreen místico
	if (isLoading) {
		return <MysticalLoading variant="fullscreen" size="xl" />
	}

	return (
		<div className="relative min-h-screen">
			{/* Sacred Geometry Background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Animated shapes */}
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-blue-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-cyan-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-sky-500/10 animate-pulse [animation-delay:2s]" />

				{/* Gradient orbs */}
				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-cyan-500/5 via-sky-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
				{/* Hero Místico */}
				<div className="text-center space-y-8">
					{/* Sacred Symbol */}
					<div className="relative inline-flex items-center justify-center">
						<div className="absolute size-24 animate-spin-slow [animation-duration:14s] [animation-direction:reverse]">
							<Icon icon="lucide:triangle" className="size-full text-blue-500/20" />
						</div>
						<div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
							<span className="text-4xl">♠</span>
						</div>
					</div>

					{/* Title */}
					<div className="space-y-3">
						<h1 className="text-5xl md:text-6xl font-bold tracking-tight">
							<span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 dark:from-blue-400 dark:via-cyan-400 dark:to-sky-400 bg-clip-text text-transparent">
								Espadas
							</span>
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
							Elemento Ar - Intelecto, razão, verdade e o poder da mente
						</p>
					</div>

					{/* Mystical Quote */}
					<div className="max-w-2xl mx-auto py-6 relative">
						<div className="absolute top-0 left-0 text-5xl text-blue-500/10 font-serif">"</div>
						<p className="text-base md:text-lg text-foreground/90 font-light italic leading-relaxed px-8">
							Espadas é a lâmina da verdade. Pensamento, comunicação, decisões e os desafios do intelecto.
						</p>
						<div className="absolute bottom-0 right-0 text-5xl text-blue-500/10 font-serif rotate-180">"</div>
					</div>

					{/* Breadcrumb */}
					<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
						<Link href="/cartas/naipes" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
							Naipes
						</Link>
						<span className="text-blue-500/50">/</span>
						<span className="text-foreground font-medium">Espadas</span>
					</div>
				</div>

				{/* Conteúdo Educacional */}
				<div className="max-w-5xl mx-auto space-y-8">
					{/* Card Principal - O que é Espadas */}
					<div className="rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-sky-500/10 p-8 backdrop-blur-sm shadow-xl">
						<div className="space-y-6">
							<div className="flex items-start gap-4">
								<div className="inline-flex items-center justify-center size-14 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-2 border-blue-500/30 flex-shrink-0">
									<Icon icon="lucide:sword" className="size-7 text-blue-600 dark:text-blue-400" />
								</div>
								<div className="flex-1 space-y-4">
									<div>
										<h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
											O Naipe do Ar
										</h2>
										<p className="text-sm text-blue-600/80 dark:text-blue-400/80 font-medium">
											Elemento Ar · Signos: Gêmeos, Libra e Aquário
										</p>
									</div>
									<p className="text-foreground/80 leading-relaxed">
										<strong>Espadas representa o elemento ar e o naipe do intelecto.</strong> Cada uma das
										14 cartas deste naipe retrata uma jornada através do pensamento, da razão,
										da comunicação e dos desafios mentais. As Espadas são símbolos de verdade,
										lógica, decisões difíceis e clareza mental.
									</p>
									<p className="text-foreground/80 leading-relaxed">
										Na astrologia, Espadas conecta-se aos signos de ar: <strong>Gêmeos</strong> (comunicação
										e versatilidade mental), <strong>Libra</strong> (equilíbrio e justiça racional)
										e <strong>Aquário</strong> (ideias inovadoras e visão futura).
									</p>
								</div>
							</div>

							{/* Temas Principais */}
							<div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-blue-500/20">
								<div className="space-y-3">
									<h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
										Temas Principais
									</h3>
									<ul className="space-y-2">
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-blue-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80">Pensamento, lógica e racionalidade</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-blue-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80">Comunicação e expressão verbal</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-blue-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80">Verdade, justiça e decisões difíceis</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-blue-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80">Desafios mentais e conflitos</span>
										</li>
									</ul>
								</div>
								<div className="space-y-3">
									<h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
										Estrutura do Naipe
									</h3>
									<ul className="space-y-2">
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80"><strong>Ás a 10:</strong> Jornada do pensamento e clareza</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80"><strong>Valete:</strong> Novas ideias e mensagens</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80"><strong>Cavaleiro:</strong> Ação intelectual rápida</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1.5 size-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
											<span className="text-sm text-foreground/80"><strong>Rainha e Rei:</strong> Sabedoria e autoridade mental</span>
										</li>
									</ul>
								</div>
							</div>

							{/* Citação Mística */}
							<div className="relative py-4 px-6 border-l-4 border-blue-500/50 bg-blue-500/5 rounded-r-lg">
								<p className="text-sm text-foreground/90 italic leading-relaxed">
									"As Espadas nos ensinam que a verdade, mesmo quando dolorosa, liberta. Como o ar
									que circula livre, nosso pensamento deve buscar clareza acima de tudo."
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
				{espadas.length > 0 && (
					<>
						{/* Sacred Path Divider */}
						<div className="relative py-8">
							<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
							<div className="relative flex items-center justify-center gap-6">
								<span className="size-1.5 rounded-full bg-blue-500/50" />
								<span className="size-2 rounded-full bg-blue-500/70" />
								<span className="size-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/50" />
								<span className="size-2 rounded-full bg-cyan-500/70" />
								<span className="size-1.5 rounded-full bg-cyan-500/50" />
							</div>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{espadas.map((card: any) => (
								<Link
									key={card.id}
									href={`/cartas/${card.slug}`}
									className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10 transition-all hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 hover:-translate-y-1"
								>
									{/* Shimmer effect on hover */}
									<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

									{/* Card Image */}
									<div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-sky-900/20">
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
												<div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30">
													<span className="text-5xl">♠</span>
												</div>
											</div>
										)}

										{/* Deck badge - aparece no hover */}
										{card.deck && (
											<CardBadge
												icon="lucide:layers"
												label={card.deck.name}
												position="top-left"
											/>
										)}

										{/* Card Type Badge - Canto Superior Direito */}
										{card.cardType && (
											<CardBadge
												icon="lucide:sparkles"
												label={card.cardType}
												position="top-right"
											/>
										)}

										{/* Suit Badge - Canto Inferior Direito */}
										<div className="absolute bottom-4 right-4">
											<div className="flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md px-3 py-1.5 border border-border/40 shadow-lg">
												<span className="text-xl font-bold text-blue-500">♠</span>
												<span className="text-xs font-medium text-foreground/80">Espadas</span>
											</div>
										</div>
									</div>

									{/* Content */}
									<div className="relative p-6 space-y-3">
										<div className="space-y-2">
											<h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-blue-400 dark:group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
												{card.name}
											</h3>

											{/* Metadata inline - responsivo */}
											<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
												{card.astrology && (
													<div className="flex items-center gap-1.5">
														<Icon icon="lucide:star" className="size-3 text-blue-500/70" />
														<span className="text-muted-foreground/70">Regência:</span>
														<span>{card.astrology}</span>
													</div>
												)}
												{card.numerology && (
													<div className="flex items-center gap-1.5">
														<span className="text-blue-600 dark:text-blue-400 font-bold">#</span>
														<span className="text-muted-foreground/70">Numerologia:</span>
														<span className="font-semibold text-blue-600 dark:text-blue-400">{card.numerology}</span>
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
												<div className="size-1.5 rounded-full bg-blue-500/70" />
												<span className="font-medium">{card.verticalMeaning?.length || 0}</span>
												<span>significados</span>
											</div>
											<div className="flex items-center gap-1.5">
												<div className="size-1.5 rounded-full bg-cyan-500/70" />
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
								<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
								<div className="relative flex items-center justify-center gap-6">
									<span className="size-1.5 rounded-full bg-blue-500/50" />
									<span className="size-2 rounded-full bg-blue-500/70" />
									<span className="size-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/50" />
									<span className="size-2 rounded-full bg-cyan-500/70" />
									<span className="size-1.5 rounded-full bg-cyan-500/50" />
								</div>
							</div>

							{/* Mystical Symbols */}
							<div className="flex items-center justify-center gap-6 text-muted-foreground/30">
								<Icon icon="lucide:sword" className="size-5" strokeWidth={1} />
								<span className="size-1 rounded-full bg-current" />
								<Icon icon="lucide:eye" className="size-5" strokeWidth={1} />
								<span className="size-1 rounded-full bg-current" />
								<span className="text-2xl text-blue-500/30">♠</span>
								<span className="size-1 rounded-full bg-current" />
								<Icon icon="lucide:book-open" className="size-5" strokeWidth={1} />
							</div>
						</div>
					</>
				)}

				{/* Empty state */}
				{espadas.length === 0 && !error && (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<div className="relative">
							<div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20" />
							<div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
								<span className="text-5xl">♠</span>
							</div>
						</div>
						<h3 className="mt-8 text-2xl font-semibold">Nenhuma carta de Espadas encontrada</h3>
						<p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
							As lâminas da verdade aguardam para serem desembainhadas
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
