'use client'

import type { TarotCard } from '@workspace/core/tarot'
import { MysticalLoading, MysticalBreadcrumb, type BreadcrumbItem } from '@workspace/ui'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'

import { trpc } from '../../../src/lib/trpc'

interface PageProps {
	params: Promise<{ slug: string }>;
}


export default function BaralhoDetailPage({ params }: PageProps) {
	const { slug } = use(params)
	const router = useRouter()
	const [isDeleting, setIsDeleting] = useState(false)
	const { data: deck, isLoading, error } = trpc.tarot.getDeckBySlug.useQuery(slug)

	const deleteMutation = trpc.tarot.deleteDeck.useMutation({
		onSuccess: () => {
			router.push('/baralhos')
		},
	})

	const handleDelete = async () => {
		if (!deck || !confirm(`Tem certeza que deseja excluir o baralho "${deck.name}"? Esta ação não pode ser desfeita.`)) {
			return
		}

		setIsDeleting(true)
		try {
			await deleteMutation.mutateAsync(deck.id)
		} catch (error) {
			console.error('Erro ao excluir baralho:', error)
			setIsDeleting(false)
		}
	}

	if (isLoading) {
		return <MysticalLoading variant="fullscreen" size="xl" />
	}

	if (error || !deck) {
		const breadcrumbItems: BreadcrumbItem[] = [
			{ label: 'Início', href: '/' },
			{ label: 'Baralhos', href: '/baralhos' },
			{ label: 'Não encontrado' },
		]

		return (
			<div className="space-y-4">
				<MysticalBreadcrumb items={breadcrumbItems} showSparkles />
				<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
					<p className="text-sm font-medium text-destructive">
						Baralho não encontrado
					</p>
				</div>
			</div>
		)
	}

	const breadcrumbItems: BreadcrumbItem[] = [
		{ label: 'Início', href: '/' },
		{ label: 'Baralhos', href: '/baralhos' },
		{ label: deck.name },
	]

	return (
		<div className="space-y-8">
			{/* Breadcrumb Místico */}
			<MysticalBreadcrumb items={breadcrumbItems} showSparkles />

			{/* Header */}
			<div className="flex items-start justify-between gap-6">
				<div className="flex-1 space-y-4">
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
							{deck.name}
						</h1>
						{deck.tradition && (
							<p className="mt-2 text-lg text-muted-foreground">{deck.tradition}</p>
						)}
					</div>

					<div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
						{deck.publisher && <span>📚 {deck.publisher}</span>}
						{deck.year && <span>📅 {deck.year}</span>}
						<span>🃏 {deck._count.cards} cartas</span>
					</div>

					{deck.description && (
						<p className="text-foreground leading-relaxed max-w-3xl">{deck.description}</p>
					)}
				</div>

				<div className="flex gap-2">
					<Link
						href={`/baralhos/${deck.slug}/editar`}
						className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
					>
						<Icon icon="lucide:pencil" className="size-4" />
						Editar
					</Link>
					<button
						onClick={handleDelete}
						disabled={isDeleting}
						className="inline-flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20 transition-all disabled:opacity-50"
					>
						<Icon icon="lucide:trash-2" className="size-4" />
						{isDeleting ? 'Excluindo...' : 'Excluir'}
					</button>
				</div>
			</div>

			{/* Cover Image */}
			{deck.imageUrl && (
				<div className="relative aspect-[16/9] w-full max-w-2xl rounded-lg overflow-hidden border border-border/40 shadow-lg">
					<Image
						src={deck.imageUrl}
						alt={deck.name}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 672px"
						priority
					/>
				</div>
			)}

			{/* Cards Grid */}
			<div className="space-y-4">
				<h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
					Cartas do Baralho
				</h2>

				{deck.cards.length === 0 ? (
					<div className="rounded-lg border border-border/40 bg-muted/20 p-12 text-center">
						<p className="text-sm text-muted-foreground">
							Este baralho ainda não possui cartas cadastradas
						</p>
						<Link
							href="/cartas/nova"
							className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all"
						>
							Adicionar Primeira Carta
						</Link>
					</div>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{deck.cards.map((card: any) => (
							<Link
								key={card.id}
								href={`/cartas/${card.slug}`}
								className="group relative overflow-hidden rounded-lg border border-border/40 bg-gradient-to-br from-background to-muted/20 transition-all hover:shadow-xl hover:border-purple-500/20"
							>
								<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

								{card.imageUrl && (
									<div className="relative aspect-[3/4] w-full bg-gradient-to-br from-muted to-muted/50">
										<Image
											src={card.imageUrl}
											alt={card.name}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-105"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
									</div>
								)}

								<div className="relative p-6 space-y-3">
									<div className="flex items-start justify-between gap-2">
										<h3 className="text-xl font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-1">
											{card.name}
										</h3>
										<Icon icon="lucide:sparkles" className="size-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
									</div>
									<p className="text-xs text-muted-foreground">
										Numerologia: {card.numerology}
										{card.astrology && ` • ${card.astrology}`}
									</p>
									<p className="line-clamp-2 text-sm text-muted-foreground">
										{card.summary}
									</p>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
