'use client'

import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface FilterChipProps {
	label: string
	active?: boolean
	count?: number
	icon?: React.ReactNode
	onToggle?: () => void
	onRemove?: () => void
	variant?: 'default' | 'mystical'
	className?: string
}

/**
 * Chip de filtro clicável para sistemas de filtragem
 * Pode ser usado para tags, categorias, filtros, etc.
 */
export function FilterChip({
	label,
	active = false,
	count,
	icon,
	onToggle,
	onRemove,
	variant = 'default',
	className,
}: FilterChipProps) {
	const isMystical = variant === 'mystical'

	return (
		<button
			type="button"
			onClick={onToggle}
			className={cn(
				'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
				'border',
				// Estado inativo
				!active && [
					'bg-background hover:bg-muted/50',
					'border-border/40 hover:border-purple-500/30',
					'text-muted-foreground hover:text-foreground',
				],
				// Estado ativo padrão
				active &&
					!isMystical && [
						'bg-purple-600 hover:bg-purple-700',
						'border-purple-600 hover:border-purple-700',
						'text-white',
						'shadow-lg shadow-purple-500/25',
					],
				// Estado ativo místico
				active &&
					isMystical && [
						'bg-gradient-to-r from-purple-600 to-indigo-600',
						'border-purple-500/50',
						'text-white',
						'shadow-lg shadow-purple-500/30',
						'hover:shadow-xl hover:shadow-purple-500/40',
						'hover:scale-105',
					],
				className,
			)}
		>
			{/* Ícone */}
			{icon && (
				<span
					className={cn(
						'flex-shrink-0',
						active ? 'text-white' : 'text-muted-foreground',
					)}
				>
					{icon}
				</span>
			)}

			{/* Label */}
			<span className="flex-1 whitespace-nowrap">{label}</span>

			{/* Count badge */}
			{count !== undefined && (
				<span
					className={cn(
						'ml-1 flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors',
						active
							? 'bg-white/20 text-white'
							: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
					)}
				>
					{count}
				</span>
			)}

			{/* Remove button */}
			{active && onRemove && (
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation()
						onRemove()
					}}
					className={cn(
						'ml-1 flex size-4 items-center justify-center rounded-full transition-colors',
						'hover:bg-white/20',
					)}
				>
					<X className="size-3" strokeWidth={2.5} />
				</button>
			)}
		</button>
	)
}
