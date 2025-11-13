'use client'

/**
 * SpreadCard - Card de Preview de Tiragem
 *
 * Card místico para exibir uma tiragem na home page ou listagens.
 * Mostra informações essenciais e preview visual do layout.
 *
 * Design Atômico: Molécula
 */

import { Icon } from '@iconify/react'
import type { TarotSpread } from '@workspace/core/tarot'
import Link from 'next/link'

import { cn } from '@workspace/ui/lib/utils'

export interface SpreadCardProps {
	/** Tiragem a ser exibida */
	spread: TarotSpread

	/** Mostrar preview visual do layout */
	showPreview?: boolean

	/** Classes CSS adicionais */
	className?: string
}

/**
 * SpreadCard - Molécula
 *
 * Card de preview místico para tiragens de tarot.
 *
 * **Features:**
 * - Preview visual simplificado do layout
 * - Badge de categoria com cor temática
 * - Indicador de dificuldade (estrelas)
 * - Tempo estimado de leitura
 * - Hover com efeitos místicos
 * - Link para página da tiragem
 *
 * @example
 * <SpreadCard spread={CRUZ_CELTA} showPreview />
 */
export function SpreadCard({ spread, showPreview = true, className }: SpreadCardProps) {
	/**
	 * Mapeia categoria para badge text e cor
	 */
	const getCategoryInfo = () => {
		const categoryMap: Record<
			TarotSpread['category'],
			{ label: string; color: string; icon: string }
		> = {
			quick: { label: 'Rápida', color: 'from-green-600 to-emerald-600', icon: 'lucide:zap' },
			insight: { label: 'Insight', color: 'from-blue-600 to-indigo-600', icon: 'lucide:eye' },
			relationship: {
				label: 'Relacionamento',
				color: 'from-pink-600 to-rose-600',
				icon: 'lucide:heart',
			},
			decision: { label: 'Decisão', color: 'from-amber-600 to-orange-600', icon: 'lucide:git-fork' },
			deep: { label: 'Profunda', color: 'from-purple-600 to-violet-600', icon: 'lucide:sparkles' },
			custom: { label: 'Customizada', color: 'from-gray-600 to-slate-600', icon: 'lucide:wand-2' },
		}

		return categoryMap[spread.category]
	}

	const categoryInfo = getCategoryInfo()

	/**
	 * Renderiza preview visual simplificado das posições
	 */
	const renderMiniPreview = () => {
		if (!showPreview) return null

		return (
			<div className="relative w-full h-32 rounded-lg overflow-hidden bg-gradient-to-br from-purple-950/30 via-violet-950/20 to-indigo-950/30">
				{/* Background místico */}
				<div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-transparent to-transparent" />

				{/* Posições das cartas (mini) */}
				{spread.positions.slice(0, 6).map((position) => (
					<div
						key={position.id}
						className="absolute size-3 rounded-sm bg-gradient-to-br from-purple-500/40 to-violet-500/40 border border-purple-400/50"
						style={{
							left: `${position.x}%`,
							top: `${position.y}%`,
							transform: `translate(-50%, -50%) rotate(${position.rotation || 0}deg)`,
						}}
					/>
				))}

				{/* Indicador de mais cartas */}
				{spread.positions.length > 6 && (
					<div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-purple-950/80 backdrop-blur-sm border border-purple-500/30">
						<span className="text-[10px] text-purple-300">+{spread.positions.length - 6}</span>
					</div>
				)}
			</div>
		)
	}

	return (
		<Link
			href={`/tiragens/${spread.slug}`}
			className={cn(
				'group block p-4 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/40 via-violet-950/30 to-indigo-950/40',
				'hover:border-purple-500/50 hover:from-purple-950/60 hover:via-violet-950/50 hover:to-indigo-950/60',
				'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20',
				className,
			)}
		>
			{/* Aura mística no hover */}
			<div className="absolute inset-0 -m-2 rounded-xl bg-gradient-to-br from-purple-500/0 via-violet-500/0 to-indigo-500/0 group-hover:from-purple-500/5 group-hover:via-violet-500/5 group-hover:to-indigo-500/5 blur-xl transition-all duration-300 pointer-events-none" />

			<div className="relative space-y-3">
				{/* Header: Ícone + Nome + Badge */}
				<div className="flex items-start justify-between gap-3">
					<div className="flex items-center gap-2 flex-1 min-w-0">
						{spread.icon && (
							<div className="flex-shrink-0 size-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
								<Icon icon={spread.icon} className="size-5 text-purple-300" />
							</div>
						)}

						<div className="flex-1 min-w-0">
							<h3 className="text-base font-semibold text-purple-100 group-hover:text-purple-50 transition-colors truncate">
								{spread.name}
							</h3>
							<p className="text-xs text-purple-400/70 flex items-center gap-1.5">
								<Icon icon="game-icons:card-random" className="size-3" />
								<span>{spread.cardCount} cartas</span>
								{spread.estimatedTime && (
									<>
										<span className="text-purple-500/50">•</span>
										<Icon icon="lucide:clock" className="size-3" />
										<span>{spread.estimatedTime} min</span>
									</>
								)}
							</p>
						</div>
					</div>

					{/* Badge de Categoria */}
					<div
						className={cn(
							'flex-shrink-0 px-2 py-1 rounded-md bg-gradient-to-r text-white text-[10px] font-medium',
							'flex items-center gap-1 shadow-lg',
							categoryInfo.color,
						)}
					>
						<Icon icon={categoryInfo.icon} className="size-3" />
						<span>{categoryInfo.label}</span>
					</div>
				</div>

				{/* Preview Visual */}
				{renderMiniPreview()}

				{/* Descrição */}
				<p className="text-sm text-purple-300/80 leading-relaxed line-clamp-2">
					{spread.description}
				</p>

				{/* Footer: Dificuldade + Tags */}
				<div className="flex items-center justify-between gap-3 pt-2 border-t border-purple-500/10">
					{/* Dificuldade */}
					{spread.difficulty && (
						<div className="flex items-center gap-1">
							{Array.from({ length: spread.difficulty }).map((_, i) => (
								<Icon
									key={i}
									icon="lucide:star"
									className="size-3 text-purple-400 fill-purple-400"
								/>
							))}
							{Array.from({ length: 5 - spread.difficulty }).map((_, i) => (
								<Icon key={`empty-${i}`} icon="lucide:star" className="size-3 text-purple-500/20" />
							))}
						</div>
					)}

					{/* Tags (primeira tag apenas) */}
					{spread.tags && spread.tags[0] && (
						<div className="px-2 py-0.5 rounded bg-purple-950/50 border border-purple-500/20">
							<span className="text-[10px] text-purple-300/80">{spread.tags[0]}</span>
						</div>
					)}
				</div>

				{/* Indicador de hover */}
				<div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<Icon icon="lucide:arrow-right" className="size-5 text-purple-400 animate-pulse" />
				</div>
			</div>
		</Link>
	)
}
