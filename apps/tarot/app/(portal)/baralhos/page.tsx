'use client'

import { Icon } from '@iconify/react'
import { MysticalLoading } from '@workspace/ui'
import Link from 'next/link'

import { BaralhosHeroSection, DeckCard } from '@/features/baralhos'
import { trpc } from '@/lib/trpc'

export default function BaralhosPage() {
	const { data: decks, isLoading, error } = trpc.tarot.getDecks.useQuery()

	// Loading místico fullscreen
	if (isLoading) {
		return <MysticalLoading variant="fullscreen" size="xl" />
	}

	return (
		<div className="relative min-h-screen">
			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
				{/* Hero Místico */}
				<BaralhosHeroSection />

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
					<>
						{/* Sacred Path Divider */}
						<div className="relative py-8">
							<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
							<div className="relative flex items-center justify-center gap-6">
								<span className="size-1.5 rounded-full bg-purple-500/50" />
								<span className="size-2 rounded-full bg-purple-500/70" />
								<span className="size-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/50" />
								<span className="size-2 rounded-full bg-indigo-500/70" />
								<span className="size-1.5 rounded-full bg-indigo-500/50" />
							</div>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{decks.map((deck) => (
								<DeckCard key={deck.id} deck={deck} />
							))}
						</div>

						{/* Mystical Footer */}
						<div className="relative py-12">
							{/* Sacred Path Divider */}
							<div className="relative py-8">
								<div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
								<div className="relative flex items-center justify-center gap-6">
									<span className="size-1.5 rounded-full bg-purple-500/50" />
									<span className="size-2 rounded-full bg-purple-500/70" />
									<span className="size-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/50" />
									<span className="size-2 rounded-full bg-indigo-500/70" />
									<span className="size-1.5 rounded-full bg-indigo-500/50" />
								</div>
							</div>

							{/* Mystical Symbols */}
							<div className="flex items-center justify-center gap-6 text-muted-foreground/30">
								<Icon icon="lucide:moon" className="size-5" strokeWidth={1} />
								<span className="size-1 rounded-full bg-current" />
								<Icon icon="lucide:eye" className="size-5" strokeWidth={1} />
								<span className="size-1 rounded-full bg-current" />
								<Icon icon="lucide:layers" className="size-5" strokeWidth={1} />
								<span className="size-1 rounded-full bg-current" />
								<Icon icon="lucide:sparkles" className="size-5" strokeWidth={1} />
							</div>
						</div>
					</>
				)}

				{/* Empty state */}
				{decks?.length === 0 && (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<div className="relative">
							<div className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />
							<div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
								<Icon icon="lucide:layers" className="size-10 text-purple-600/50 dark:text-purple-400/50" />
							</div>
						</div>
						<h3 className="mt-8 text-2xl font-semibold">Nenhum baralho encontrado</h3>
						<p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
							Inicie sua jornada mística criando o primeiro baralho sagrado
						</p>
						<Link
							href="/baralhos/novo"
							className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
						>
							<Icon icon="lucide:plus" className="size-4 transition-transform group-hover:rotate-90" />
							Criar Primeiro Baralho
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
