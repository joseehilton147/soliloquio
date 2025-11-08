'use client'

import { Layers, Plus, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { trpc } from '../../src/lib/trpc'

export default function DecksPage() {
	const { data: decks, isLoading, error } = trpc.tarot.getDecks.useQuery()

	return (
		<div className="space-y-12">
			{/* Header Místico */}
			<div className="flex items-start justify-between">
				<div className="space-y-3">
					<div className="flex items-center gap-3">
						<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
							<Layers className="size-6 text-purple-600 dark:text-purple-400" />
						</div>
						<h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
							Baralhos
						</h1>
					</div>
					<p className="text-lg text-muted-foreground ml-15">
						Coleção espiritual de oráculos e tradições místicas
					</p>
				</div>
				<Link
					href="/decks/novo"
					className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
				>
					<Plus className="size-4 transition-transform group-hover:rotate-90" />
					Novo Baralho
				</Link>
			</div>

			{/* Loading state */}
			{isLoading && (
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10"
						>
							<div className="aspect-[4/3] w-full animate-pulse bg-gradient-to-br from-muted to-muted/50" />
							<div className="p-6 space-y-3">
								<div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
								<div className="h-4 w-1/2 animate-pulse rounded bg-muted/70" />
								<div className="h-3 w-full animate-pulse rounded bg-muted/50" />
							</div>
						</div>
					))}
				</div>
			)}

			{/* Error state */}
			{error && (
				<div className="rounded-xl border border-destructive/50 bg-destructive/5 p-8 backdrop-blur-sm">
					<p className="text-sm text-destructive">
						Erro ao carregar baralhos: {error.message}
					</p>
				</div>
			)}

			{/* Decks grid */}
			{decks && decks.length > 0 && (
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{decks.map((deck) => (
						<Link
							key={deck.id}
							href={`/decks/${deck.slug}`}
							className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10 transition-all hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 hover:-translate-y-1"
						>
							{/* Mystical glow backdrop */}
							<div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-violet-500/0 to-indigo-500/0 opacity-0 group-hover:opacity-100 group-hover:from-purple-500/5 group-hover:via-violet-500/5 group-hover:to-indigo-500/5 transition-all duration-500" />

							{/* Shimmer effect */}
							<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

							{/* Cover Image */}
							<div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-indigo-900/20">
								{deck.imageUrl ? (
									<>
										<Image
											src={deck.imageUrl}
											alt={deck.name}
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
											<Layers className="size-10 text-purple-600/50 dark:text-purple-400/50" strokeWidth={1.5} />
										</div>
									</div>
								)}

								{/* Year badge */}
								{deck.year && (
									<div className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-foreground/80 border border-border/40">
										{deck.year}
									</div>
								)}

								{/* Sparkle icon on hover */}
								<div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
									<Sparkles className="size-5 text-purple-400 animate-pulse" />
								</div>
							</div>

							{/* Content */}
							<div className="relative p-6 space-y-3">
								<div>
									<h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-400 dark:group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
										{deck.name}
									</h3>
									{deck.tradition && (
										<p className="mt-1.5 text-sm text-muted-foreground flex items-center gap-1.5">
											<span className="size-1.5 rounded-full bg-purple-500/50" />
											{deck.tradition}
										</p>
									)}
								</div>

								{deck.description && (
									<p className="line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed">
										{deck.description}
									</p>
								)}

								{/* Stats */}
								<div className="flex items-center gap-6 pt-3 text-xs text-muted-foreground border-t border-border/30">
									<div className="flex items-center gap-1.5">
										<div className="size-1.5 rounded-full bg-purple-500/70" />
										<span className="font-medium">{deck._count.cards}</span>
										<span>cartas</span>
									</div>
									<div className="flex items-center gap-1.5">
										<div className="size-1.5 rounded-full bg-indigo-500/70" />
										<span className="font-medium">{deck._count.tags}</span>
										<span>tags</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}

			{/* Empty state */}
			{decks && decks.length === 0 && (
				<div className="flex flex-col items-center justify-center py-24 text-center">
					<div className="relative">
						<div className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />
						<div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
							<Layers className="size-10 text-purple-600/50 dark:text-purple-400/50" />
						</div>
					</div>
					<h3 className="mt-8 text-2xl font-semibold">Nenhum baralho encontrado</h3>
					<p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
						Inicie sua jornada mística criando o primeiro baralho sagrado
					</p>
					<Link
						href="/decks/novo"
						className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
					>
						<Plus className="size-4 transition-transform group-hover:rotate-90" />
						Criar Primeiro Baralho
					</Link>
				</div>
			)}
		</div>
	)
}
