'use client'

import type { TarotCard } from '@workspace/core/tarot'
import Image from 'next/image'
import Link from 'next/link'

import { trpc } from '../src/lib/trpc'

export default function TarotHomePage() {
	const { data, isLoading, error } = trpc.tarot.getAll.useQuery({ limit: 10 })

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold">Tarot - Arcanos Maiores</h1>
				<p className="mt-2 text-muted-foreground">
					Explore os arcanos maiores e suas interpretações para sua jornada espiritual
				</p>
			</div>

			{isLoading && (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="h-48 animate-pulse rounded-lg bg-muted" />
					))}
				</div>
			)}

			{error && (
				<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
					<p className="text-sm text-destructive">
						Erro ao carregar cartas: {error.message}
					</p>
					<p className="mt-2 text-xs text-muted-foreground">
						Certifique-se de que a API está rodando em http://localhost:3001
					</p>
				</div>
			)}

			{data && (
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<p className="text-sm text-muted-foreground">
							{data.pagination.total} carta(s) encontrada(s)
						</p>
						<Link
							href="/cartas"
							className="text-sm text-primary hover:underline"
						>
							Ver todas →
						</Link>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{data.cards.map((card: TarotCard) => (
							<Link
								key={card.id}
								href={`/cartas/${card.slug}`}
								className="group rounded-lg border bg-card transition-all hover:shadow-lg overflow-hidden"
							>
								{card.imageUrl && (
									<div className="relative aspect-[2/3] w-full bg-muted">
										<Image
											src={card.imageUrl}
											alt={card.name}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									</div>
								)}
								<div className="p-6 space-y-3">
									<div>
										<h3 className="text-xl font-semibold group-hover:text-primary">
											{card.name}
										</h3>
										<p className="text-sm text-muted-foreground">
											Numerologia: {card.numerology}
											{card.astrology && ` • Astrologia: ${card.astrology}`}
										</p>
									</div>
									<p className="line-clamp-3 text-sm text-muted-foreground">
										{card.summary}
									</p>
									<div className="flex flex-wrap gap-2">
										{(card.verticalMeaning as string[]).slice(0, 2).map((meaning, i) => (
											<span
												key={i}
												className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
											>
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
