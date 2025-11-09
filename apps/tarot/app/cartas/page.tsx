'use client'

import type { TarotCard } from '@workspace/core/tarot'
import { MysticalLoading, CardBadge } from '@workspace/ui'
import { Sparkles, Layers, Star, BookOpen, Eye, Hexagon, ArrowRight, Crown, Flame } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { trpc } from '../../src/lib/trpc'

// Helper para obter símbolo e cor do naipe
function getSuitInfo(suit: string | null) {
	if (!suit) return null

	const suitMap = {
		COPAS: { symbol: '♥', label: 'Copas', color: 'text-red-500' },
		PAUS: { symbol: '♣', label: 'Paus', color: 'text-green-600' },
		OUROS: { symbol: '♦', label: 'Ouros', color: 'text-yellow-500' },
		ESPADAS: { symbol: '♠', label: 'Espadas', color: 'text-blue-500' },
	}

	return suitMap[suit as keyof typeof suitMap] || null
}

// Componente de Card de Carta
const CardPreview = ({ card }: { card: any }) => (
	<Link
		href={`/cartas/${card.slug}`}
		className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10 transition-all hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 hover:-translate-y-1"
	>
		<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

		<div className="relative aspect-[2/3] w-full overflow-hidden bg-gradient-to-br from-purple-900/20 via-violet-900/20 to-indigo-900/20">
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
						<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
					</>
				) :
				(
					<div className="flex h-full items-center justify-center">
						<div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border border-purple-500/30">
							<BookOpen className="size-10 text-purple-600/50 dark:text-purple-400/50" strokeWidth={1.5} />
						</div>
					</div>
				)}

			{card.deck && (
				<CardBadge
					icon={Layers}
					label={card.deck.name}
					position="top-left"
				/>
			)}

			{card.suit && getSuitInfo(card.suit) && (
				<div className="absolute bottom-4 right-4">
					<div className="flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md px-3 py-1.5 border border-border/40 shadow-lg">
						<span className={`text-xl font-bold ${getSuitInfo(card.suit)?.color}`}>
							{getSuitInfo(card.suit)?.symbol}
						</span>
					</div>
				</div>
			)}
		</div>

		<div className="relative p-6 space-y-3">
			<h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-400 dark:group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all line-clamp-1">
				{card.name}
			</h3>

			{card.summary && (
				<div
					className="line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed prose prose-sm prose-p:my-0 prose-p:text-muted-foreground/80 max-w-none"
					dangerouslySetInnerHTML={{ __html: card.summary }}
				/>
			)}
		</div>
	</Link>
)

// Componente de Seção de Categoria
const CategorySection = ({
	title,
	subtitle,
	cards,
	href,
	icon: Icon,
	iconColor,
	gradientClass,
}: {
	title: string
	subtitle: string
	cards: any[]
	href: string
	icon: any
	iconColor: string
	gradientClass: string
}) => {
	if (cards.length === 0) return null

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<Link href={href} className="group flex items-center gap-4">
					<div className={`flex size-12 items-center justify-center rounded-full bg-gradient-to-br ${iconColor} border ${iconColor.replace('/10', '/20')}`}>
						<Icon className="size-6" strokeWidth={1.5} />
					</div>
					<div>
						<h2 className={`text-3xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent group-hover:opacity-80 transition-opacity`}>
							{title}
						</h2>
						<p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
					</div>
				</Link>

				<Link
					href={href}
					className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					Ver todas
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
				</Link>
			</div>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{cards.map((card: any) => (
					<CardPreview key={card.id} card={card} />
				))}
			</div>
		</div>
	)
}

export default function CartasPage() {
	const { data, isLoading, error } = trpc.tarot.getAll.useQuery({ limit: 100 })

	// Categorizar cartas
	const arcanosMaiores = data?.cards.filter((card: any) => card.cardType === 'Arcano Maior').slice(0, 3) || []
	const arcanosMenores = data?.cards.filter((card: any) => card.suit !== null).slice(0, 3) || []
	const copas = data?.cards.filter((card: any) => card.suit === 'COPAS').slice(0, 3) || []
	const paus = data?.cards.filter((card: any) => card.suit === 'PAUS').slice(0, 3) || []
	const ouros = data?.cards.filter((card: any) => card.suit === 'OUROS').slice(0, 3) || []
	const espadas = data?.cards.filter((card: any) => card.suit === 'ESPADAS').slice(0, 3) || []

	// Loading fullscreen místico
	if (isLoading) {
		return <MysticalLoading variant="fullscreen" size="xl" />
	}

	return (
		<div className="relative min-h-screen">
			{/* Sacred Geometry Background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-violet-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-purple-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-indigo-500/10 animate-pulse [animation-delay:2s]" />

				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-purple-500/5 via-indigo-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
				{/* Hero Místico */}
				<div className="text-center space-y-8">
					<div className="relative inline-flex items-center justify-center">
						<div className="absolute size-24 animate-spin-slow [animation-duration:12s] [animation-direction:reverse]">
							<Hexagon className="size-full text-violet-500/20" strokeWidth={0.5} />
						</div>
						<div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
							<Star className="size-10 text-violet-600 dark:text-violet-400" strokeWidth={1.5} />
						</div>
					</div>

					<div className="space-y-3">
						<h1 className="text-5xl md:text-6xl font-bold tracking-tight">
							<span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
								Arcanos Sagrados
							</span>
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
							Explore os mistérios através dos arcanos maiores, menores e os quatro elementos
						</p>
					</div>

					<div className="max-w-2xl mx-auto py-6 relative">
						<div className="absolute top-0 left-0 text-5xl text-violet-500/10 font-serif">"</div>
						<p className="text-base md:text-lg text-foreground/90 font-light italic leading-relaxed px-8">
							Cada carta é uma porta para o inconsciente. Cada símbolo, uma chave.
						</p>
						<div className="absolute bottom-0 right-0 text-5xl text-violet-500/10 font-serif rotate-180">"</div>
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

				{/* Categories */}
				{data && data.cards.length > 0 && (
					<>
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

						<div className="space-y-20">
							<CategorySection
								title="Arcanos Maiores"
								subtitle="Os 22 caminhos da jornada do Louco"
								cards={arcanosMaiores}
								href="/cartas/arcanos/maiores"
								icon={Crown}
								iconColor="from-violet-500/10 to-purple-500/10"
								gradientClass="from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400"
							/>

							<CategorySection
								title="Arcanos Menores"
								subtitle="Os 4 elementos manifestados"
								cards={arcanosMenores}
								href="/cartas/arcanos/menores"
								icon={Flame}
								iconColor="from-violet-500/10 to-purple-500/10"
								gradientClass="from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400"
							/>

							{copas.length > 0 && (
								<CategorySection
									title="Copas ♥"
									subtitle="Elemento Água - Emoções e sentimentos"
									cards={copas}
									href="/cartas/naipes/copas"
									icon={({ className }: any) => <span className="text-3xl">♥</span>}
									iconColor="from-red-500/10 to-rose-500/10"
									gradientClass="from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400"
								/>
							)}

							{paus.length > 0 && (
								<CategorySection
									title="Paus ♣"
									subtitle="Elemento Fogo - Ação e criatividade"
									cards={paus}
									href="/cartas/naipes/paus"
									icon={({ className }: any) => <span className="text-3xl">♣</span>}
									iconColor="from-green-500/10 to-emerald-500/10"
									gradientClass="from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400"
								/>
							)}

							{ouros.length > 0 && (
								<CategorySection
									title="Ouros ♦"
									subtitle="Elemento Terra - Materialidade e prosperidade"
									cards={ouros}
									href="/cartas/naipes/ouros"
									icon={({ className }: any) => <span className="text-3xl">♦</span>}
									iconColor="from-yellow-500/10 to-amber-500/10"
									gradientClass="from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400"
								/>
							)}

							{espadas.length > 0 && (
								<CategorySection
									title="Espadas ♠"
									subtitle="Elemento Ar - Intelecto e verdade"
									cards={espadas}
									href="/cartas/naipes/espadas"
									icon={({ className }: any) => <span className="text-3xl">♠</span>}
									iconColor="from-blue-500/10 to-cyan-500/10"
									gradientClass="from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400"
								/>
							)}
						</div>

						<div className="relative py-12">
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

							<div className="flex items-center justify-center gap-6 text-muted-foreground/30">
								<Star className="size-5" strokeWidth={1} />
								<span className="size-1 rounded-full bg-current" />
								<Eye className="size-5" strokeWidth={1} />
								<span className="size-1 rounded-full bg-current" />
								<Sparkles className="size-5" strokeWidth={1} />
								<span className="size-1 rounded-full bg-current" />
								<BookOpen className="size-5" strokeWidth={1} />
							</div>
						</div>
					</>
				)}

				{/* Empty state */}
				{data && data.cards.length === 0 && (
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<div className="relative">
							<div className="absolute inset-0 animate-ping rounded-full bg-purple-500/20" />
							<div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
								<BookOpen className="size-10 text-purple-600/50 dark:text-purple-400/50" />
							</div>
						</div>
						<h3 className="mt-8 text-2xl font-semibold">Nenhuma carta encontrada</h3>
						<p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
							Inicie sua jornada mística criando a primeira carta sagrada
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
