'use client'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'

import type { DeckListItem } from '../domain/baralhos.types'

type DeckCardProps = {
	deck: DeckListItem
}

/**
 * Card de baralho para listagem
 *
 * Exibe informações resumidas de um baralho com:
 * - Imagem de capa
 * - Nome e tradição
 * - Descrição truncada
 * - Contagem de cartas e tags
 */
export function DeckCard({ deck }: DeckCardProps) {
	return (
		<Link
			href={`/baralhos/${deck.slug}`}
			className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/10 transition-all hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 hover:-translate-y-1"
		>
			{/* Shimmer effect on hover */}
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
							<Icon icon="lucide:layers" className="size-10 text-purple-600/50 dark:text-purple-400/50" strokeWidth={1.5} />
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
					<Icon icon="lucide:sparkles" className="size-5 text-purple-400 animate-pulse" />
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
	)
}
