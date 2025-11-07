'use client'

import type { ReadingType } from '@workspace/core/tarot'
import { ArrowLeft, Pencil } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'

import { trpc } from '../../../src/lib/trpc'

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default function CartaDetailPage({ params }: PageProps) {
	const { slug } = use(params)
	const { data: card, isLoading, error } = trpc.tarot.getBySlug.useQuery(slug)

	if (isLoading) {
		return (
			<div className="space-y-8">
				<div className="h-8 w-48 animate-pulse rounded bg-muted" />
				<div className="h-64 animate-pulse rounded-lg bg-muted" />
			</div>
		)
	}

	if (error || !card) {
		return (
			<div className="space-y-4">
				<Link href="/cartas" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
					<ArrowLeft className="mr-2 size-4" />
					Voltar
				</Link>
				<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
					<p className="text-sm text-destructive">
						Carta não encontrada
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-8">
			<Link href="/cartas" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
				<ArrowLeft className="mr-2 size-4" />
				Voltar para todas as cartas
			</Link>

			<div className="grid gap-8 lg:grid-cols-[320px_1fr]">
				<div className="lg:sticky lg:top-20 lg:self-start space-y-4">
					{card.imageUrl && (
						<div className="relative aspect-[2/3] w-full max-w-sm mx-auto lg:mx-0 rounded-lg overflow-hidden border bg-muted shadow-lg">
							<Image
								src={card.imageUrl}
								alt={card.name}
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 320px"
								priority
							/>
						</div>
					)}
					<div className="text-center lg:text-left px-2 space-y-3">
						<div>
							<h1 className="text-2xl font-bold">{card.name}</h1>
							<p className="mt-1 text-sm text-muted-foreground">
								Numerologia: {card.numerology}
								{card.astrology && ` • Astrologia: ${card.astrology}`}
							</p>
						</div>
						<Link
							href={`/cartas/${card.slug}/editar`}
							className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
						>
							<Pencil className="size-4" />
							Editar Carta
						</Link>
					</div>
				</div>

				<div className="space-y-6">

					<div className="rounded-lg border bg-card p-6">
						<h2 className="text-lg font-semibold">Resumo</h2>
						<p className="mt-2 text-muted-foreground">{card.summary}</p>
					</div>

					<div className="rounded-lg border bg-card p-6">
						<h2 className="text-lg font-semibold">Descrição</h2>
						<p className="mt-2 text-muted-foreground">{card.description}</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<div className="rounded-lg border bg-card p-6">
							<h2 className="text-lg font-semibold text-green-600 dark:text-green-400">
								Significado Vertical
							</h2>
							<ul className="mt-3 space-y-2">
								{(card.verticalMeaning as string[]).map((meaning, i) => (
									<li key={i} className="flex items-start">
										<span className="mr-2">✓</span>
										<span className="text-muted-foreground">{meaning}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="rounded-lg border bg-card p-6">
							<h2 className="text-lg font-semibold text-amber-600 dark:text-amber-400">
								Significado Invertido
							</h2>
							<ul className="mt-3 space-y-2">
								{(card.invertedMeaning as string[]).map((meaning, i) => (
									<li key={i} className="flex items-start">
										<span className="mr-2">⚠</span>
										<span className="text-muted-foreground">{meaning}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="space-y-4">
						<h2 className="text-2xl font-semibold">Tipos de Leitura</h2>
						{card.typesOfReading.map((reading: ReadingType) => (
							<div key={reading.id} className="rounded-lg border bg-card p-6">
								<h3 className="font-semibold capitalize">
									{reading.type.replace('-', ' ')}
								</h3>
								<p className="mt-2 text-muted-foreground">{reading.read}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
