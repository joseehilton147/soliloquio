'use client'

import type { TarotCard } from '@workspace/core/tarot'
import { Sparkles, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { trpc } from '../../src/lib/trpc'

export default function CartasPage() {
	const { data, isLoading, error } = trpc.tarot.getAll.useQuery({ limit: 100 })

	return (
		<div className="space-y-8">
			{/* Header Místico */}
			<div className="flex items-start justify-between">
				<div className="space-y-3">
					<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
						Todas as Cartas
					</h1>
					<p className="text-lg text-muted-foreground">
						Explore o baralho completo do Tarot
					</p>
				</div>
				<Link
					href="/cartas/nova"
					className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
				>
					<Plus className="size-4" />
					Nova Carta
				</Link>
			</div>

			{/* Loading State */}
			{isLoading && (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{[...Array(8)].map((_, i) => (
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
				</div>
			)}

			{/* Cards Grid */}
			{data && (
				<div className="space-y-6">
					<p className="text-sm text-muted-foreground">
						{data.pagination.total} carta(s) no baralho
					</p>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
										/>
										{/* Overlay gradient */}
										<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
									</div>
								)}

								{/* Card Content */}
								<div className="relative p-6 space-y-3">
									<div>
										<div className="flex items-start justify-between gap-2">
											<h3 className="text-xl font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-1">
												{card.name}
											</h3>
											<Sparkles className="size-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
										</div>
										<p className="text-xs text-muted-foreground mt-1">
											Numerologia: {card.numerology}
											{card.astrology && ` • ${card.astrology}`}
										</p>
									</div>
									<p className="line-clamp-2 text-sm text-muted-foreground">
										{card.summary}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
