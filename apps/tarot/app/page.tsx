'use client'

import type { TarotCard } from '@workspace/core/tarot'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { trpc } from '../src/lib/trpc'

export default function TarotHomePage() {
	const { data, isLoading, error } = trpc.tarot.getAll.useQuery({ limit: 10 })

	return (
		<div className="space-y-8">
			{/* Header Místico */}
			<div className="space-y-3">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
					Arcanos Maiores
				</h1>
				<p className="text-lg text-muted-foreground">
					Explore os arcanos maiores e suas interpretações para sua jornada espiritual
				</p>
			</div>

			{/* Loading State */}
			{isLoading && (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="h-96 animate-pulse rounded-lg bg-gradient-to-br from-muted to-muted/50" />
					))}
				</div>
			)}

			{/* Error State */}
			{error && (
				<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
					<p className="text-sm font-medium text-destructive">
						Erro ao carregar cartas: {error.message}
					</p>
					<p className="mt-2 text-xs text-muted-foreground">
						Certifique-se de que a API está rodando em http://localhost:3001
					</p>
				</div>
			)}

			{/* Cards Grid */}
			{data && (
				<div className="space-y-6">
					{/* Stats and Action */}
					<div className="flex items-center justify-between">
						<p className="text-sm text-muted-foreground">
							{data.pagination.total} carta(s) disponíveis
						</p>
						<Link
							href="/cartas"
							className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
						>
							Ver todas
							<Sparkles className="size-4" />
						</Link>
					</div>

					{/* Cards Grid with Mystical Design */}
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{data.cards.map((card: TarotCard) => (
							<Link
								key={card.id}
								href={`/cartas/${card.slug}`}
								className="group relative overflow-hidden rounded-lg border border-border/40 bg-gradient-to-br from-background to-muted/20 transition-all hover:shadow-xl hover:border-purple-500/20"
							>
								{/* Mystical glow effect on hover */}
								<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

								{/* Card Image */}
								{card.imageUrl && (
									<div className="relative aspect-[2/3] w-full bg-gradient-to-br from-muted to-muted/50">
										<Image
											src={card.imageUrl}
											alt={card.name}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-105"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
										{/* Overlay gradient */}
										<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
									</div>
								)}

								{/* Card Content */}
								<div className="relative p-6 space-y-3">
									<div>
										<h3 className="text-xl font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
											{card.name}
										</h3>
										<p className="text-xs text-muted-foreground mt-1">
											Numerologia: {card.numerology}
											{card.astrology && ` • ${card.astrology}`}
										</p>
									</div>

									<p className="line-clamp-3 text-sm text-muted-foreground">
										{card.summary}
									</p>

									{/* Mystical Tags */}
									<div className="flex flex-wrap gap-2">
										{(card.verticalMeaning as string[]).slice(0, 2).map((meaning, i) => (
											<span
												key={i}
												className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 px-2.5 py-1 text-xs font-medium text-purple-600 dark:text-purple-400 border border-purple-500/20"
											>
												<span className="size-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600" />
												{meaning}
											</span>
										))}
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
