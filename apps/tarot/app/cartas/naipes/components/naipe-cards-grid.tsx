'use client'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { CardBadge } from '@workspace/ui'
import { cn } from '@workspace/ui/lib/utils'
import type { ElementColorScheme } from '../element-colors.data'

interface Card {
	id: string
	slug: string | null
	name: string
	imageUrl?: string | null
	deck?: { name: string } | null
	numerology?: number | string | boolean | null
	verticalMeaning?: unknown
	typesOfReading?: unknown
}

export interface NaipeCardsGridProps {
	cards: Card[]
	colors: ElementColorScheme
	symbol: string
}

/**
 * Grid de Cartas de Naipe - Organismo
 *
 * Grid místico que exibe todas as cartas de um naipe específico.
 * Reutiliza o sistema de cores dos elementos.
 *
 * Características:
 * - Layout responsivo (1/2/3 colunas)
 * - Hover effects místicos
 * - Shimmer effect on hover
 * - Badges de deck e numerologia
 * - Cores específicas do elemento
 *
 * @example
 * ```tsx
 * <NaipeCardsGrid
 *   cards={copas}
 *   colors={ELEMENT_COLORS.agua}
 *   symbol="♥"
 * />
 * ```
 */
export function NaipeCardsGrid({ cards, colors, symbol }: NaipeCardsGridProps) {
	if (cards.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-24 text-center">
				<div className="relative">
					<div className={cn('absolute inset-0 animate-ping rounded-full', `bg-${colors.primary}-500/20`)} />
					<div className={cn('relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br border', colors.iconBg, colors.iconBorder)}>
						<span className="text-5xl">{symbol}</span>
					</div>
				</div>
				<h3 className="mt-8 text-2xl font-semibold">Nenhuma carta encontrada</h3>
				<p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
					As cartas místicas aguardam para serem reveladas
				</p>
			</div>
		)
	}

	return (
		<>
			{/* Sacred Path Divider */}
			<div className="relative py-8">
				<div className={cn('absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent to-transparent', colors.divider)} />
				<div className="relative flex items-center justify-center gap-6">
					<span className={cn('size-1.5 rounded-full', `bg-${colors.primary}-500/50`)} />
					<span className={cn('size-2 rounded-full', `bg-${colors.primary}-500/70`)} />
					<span className={cn('size-3 rounded-full bg-gradient-to-br shadow-lg', colors.iconBg, `shadow-${colors.primary}-500/50`)} />
					<span className={cn('size-2 rounded-full', `bg-${colors.secondary}-500/70`)} />
					<span className={cn('size-1.5 rounded-full', `bg-${colors.secondary}-500/50`)} />
				</div>
			</div>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{cards.map((card) => (
					<Link
						key={card.id}
						href={card.slug ? `/cartas/${card.slug}` : '#'}
						className={cn(
							'group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10 transition-all hover:shadow-2xl hover:-translate-y-1',
							colors.cardHover
						)}
					>
						{/* Shimmer effect on hover */}
						<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

						{/* Card Image */}
						<div className={cn('relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br', colors.cardBg)}>
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
											<div className={cn('flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br border', colors.iconBg, colors.iconBorder)}>
												<span className="text-5xl">{symbol}</span>
											</div>
										</div>
									)}

							{/* Deck badge */}
							{card.deck && (
								<CardBadge icon="lucide:layers" label={card.deck.name} position="top-left" />
							)}

							{/* Numerology Badge */}
							{card.numerology !== null && card.numerology !== undefined && (
								<CardBadge icon="lucide:hash" label={String(card.numerology)} position="top-right" />
							)}
						</div>

						{/* Content */}
						<div className="relative p-6 space-y-3">
							<h3 className={cn('text-xl font-semibold group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent transition-all', colors.gradient)}>
								{card.name}
							</h3>

							{/* Stats */}
							<div className={cn('flex items-center gap-6 pt-3 text-xs text-muted-foreground border-t', colors.border)}>
								<div className="flex items-center gap-1.5">
									<div className={cn('size-1.5 rounded-full', `bg-${colors.primary}-500/70`)} />
									<span className="font-medium">{Array.isArray(card.verticalMeaning) ? card.verticalMeaning.length : 0}</span>
									<span>significados</span>
								</div>
								<div className="flex items-center gap-1.5">
									<div className={cn('size-1.5 rounded-full', `bg-${colors.secondary}-500/70`)} />
									<span className="font-medium">{Array.isArray(card.typesOfReading) ? card.typesOfReading.length : 0}</span>
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
					<div className={cn('absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent to-transparent', colors.divider)} />
					<div className="relative flex items-center justify-center gap-6">
						<span className={cn('size-1.5 rounded-full', `bg-${colors.primary}-500/50`)} />
						<span className={cn('size-2 rounded-full', `bg-${colors.primary}-500/70`)} />
						<span className={cn('size-3 rounded-full bg-gradient-to-br shadow-lg', colors.iconBg, `shadow-${colors.primary}-500/50`)} />
						<span className={cn('size-2 rounded-full', `bg-${colors.secondary}-500/70`)} />
						<span className={cn('size-1.5 rounded-full', `bg-${colors.secondary}-500/50`)} />
					</div>
				</div>

				{/* Mystical Symbols */}
				<div className="flex items-center justify-center gap-6 text-muted-foreground/30">
					<Icon icon="lucide:star" className="size-5" strokeWidth={1} />
					<span className="size-1 rounded-full bg-current" />
					<Icon icon="lucide:sparkles" className="size-5" strokeWidth={1} />
					<span className="size-1 rounded-full bg-current" />
					<span className="text-2xl">{symbol}</span>
					<span className="size-1 rounded-full bg-current" />
					<Icon icon="lucide:droplets" className="size-5" strokeWidth={1} />
				</div>
			</div>
		</>
	)
}
