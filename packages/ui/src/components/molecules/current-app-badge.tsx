'use client'

import type { LucideIcon } from 'lucide-react'

import { cn } from '../../lib/utils'

export interface CurrentAppBadgeProps {
	name: string
	icon: LucideIcon
	className?: string
}

/**
 * CurrentAppBadge - Molécula
 * Badge que indica o app/contexto atual
 */
export function CurrentAppBadge({ name, icon: Icon, className }: CurrentAppBadgeProps) {
	return (
		<div className={cn(
			'flex items-center gap-2 px-3 py-1 rounded-full',
			'bg-purple-500/10 border border-purple-500/20',
			className,
		)}>
			<Icon className="size-3.5 text-purple-500" />
			<span className="text-xs font-medium text-purple-600 dark:text-purple-400">
				{name}
			</span>
		</div>
	)
}
