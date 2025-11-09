'use client'

import { Icon } from '@iconify/react'
import { cn } from '../../lib/utils'

export interface CardBadgeProps {
	icon: string
	label: string
	position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
	className?: string
}

/**
 * Badge místico para cards de tarô
 * Aparece no hover com efeito translúcido e backdrop blur
 *
 * Usado para indicar: baralho, tipo de carta, etc.
 */
export function CardBadge({
	icon: Icon,
	label,
	position = 'top-left',
	className,
}: CardBadgeProps) {
	const positionClasses = {
		'top-left': 'top-4 left-4',
		'top-right': 'top-4 right-4',
		'bottom-left': 'bottom-4 left-4',
		'bottom-right': 'bottom-4 right-4',
	}

	return (
		<div
			className={cn(
				'absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
				positionClasses[position],
				className,
			)}
		>
			<div className="flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-foreground/80 border border-purple-500/30 shadow-lg">
				<Icon className="size-3 text-purple-600 dark:text-purple-400" />
				<span>{label}</span>
			</div>
		</div>
	)
}
