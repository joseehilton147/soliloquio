'use client'

import type { TarotCard } from '@workspace/core/tarot'
import Image from 'next/image'
import Link from 'next/link'

import { trpc } from '../../src/lib/trpc'

export default function CartasPage() {
	const { data, isLoading, error } = trpc.tarot.getAll.useQuery({ limit: 100 })

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Todas as Cartas</h1>
					<p className="mt-2 text-muted-foreground">
						Explore o baralho completo do Tarot
					</p>
				</div>
				<Link
					href="/cartas/nova"
					className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
				>
					+ Nova Carta
				</Link>
			</div>

			{isLoading && (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{[...Array(8)].map((_, i) => (
						<div key={i} className="h-48 animate-pulse rounded-lg bg-muted" />
					))}
				</div>
			)}

			{error && (
				<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
					<p className="text-sm text-destructive">
						Erro ao carregar cartas: {error.message}
					</p>
				</div>
			)}

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
								className="group rounded-lg border bg-card transition-all hover:shadow-lg overflow-hidden"
							>
								{card.imageUrl && (
									<div className="relative aspect-[2/3] w-full bg-muted">
										<Image
											src={card.imageUrl}
											alt={card.name}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
