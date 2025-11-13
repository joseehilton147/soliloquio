'use client'

import { CardBadge } from '@workspace/ui'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'

import { trpc } from '../../../../src/lib/trpc'

export function ArcanosMaioresContent() {
	const { data, error } = trpc.tarot.getAll.useQuery({ limit: 100 })

	// Filtrar apenas Arcanos Maiores
	const arcanosMaiores = data?.cards.filter(
		(card: any) => card.cardType === 'Arcano Maior',
	) || []

	return (
		<>
			{/* Error State */}
			{error && (
				<div className="rounded-xl border border-destructive/50 bg-destructive/5 p-8 backdrop-blur-sm">
					<p className="text-sm text-destructive">
						Erro ao carregar cartas: {error.message}
					</p>
				</div>
			)}

			{/* Cards Grid */}
			{arcanosMaiores.length > 0 && (
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
						{arcanosMaiores.map((card: any) => (
							<Link
								key={card.id}
								href={`/cartas/${card.slug}`}
								className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10 transition-all hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 hover:-translate-y-1"
							>
								{/* Shimmer effect on hover */}
								<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

								{/* Card Image */}
								<div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-indigo-900/20">
									{card.imageUrl
										? (
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
										)
										: (
											<div className="flex h-full items-center justify-center">
												<div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border border-purple-500/30">
													<Icon icon="lucide:book-open" className="size-10 text-purple-600/50 dark:text-purple-400/50" />
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
									<CardBadge
										icon="lucide:crown"
										label="Arcano Maior"
										position="top-right"
									/>
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
													<Icon icon="lucide:star" className="size-3 text-purple-500/70" />
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

						{/* Mystical Symbols */}
						<div className="flex items-center justify-center gap-6 text-muted-foreground/30">
							<Icon icon="lucide:star" className="size-5" strokeWidth={1} />
							<span className="size-1 rounded-full bg-current" />
							<Icon icon="lucide:eye" className="size-5" strokeWidth={1} />
							<span className="size-1 rounded-full bg-current" />
							<Icon icon="lucide:crown" className="size-5" strokeWidth={1} />
							<span className="size-1 rounded-full bg-current" />
							<Icon icon="lucide:book-open" className="size-5" strokeWidth={1} />
						</div>
					</div>
				</>
			)}

			{/* Empty state */}
			{arcanosMaiores.length === 0 && !error && (
				<div className="flex flex-col items-center justify-center py-24 text-center">
					<div className="relative">
						<div className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />
						<div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
							<Icon icon="lucide:crown" className="size-10 text-purple-600/50 dark:text-purple-400/50" />
						</div>
					</div>
					<h3 className="mt-8 text-2xl font-semibold">Nenhum Arcano Maior encontrado</h3>
					<p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
						Os grandes arquétipos aguardam para serem revelados
					</p>
				</div>
			)}
		</>
	)
}
