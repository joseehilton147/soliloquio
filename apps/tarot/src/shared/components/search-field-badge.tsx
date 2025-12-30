'use client'

import { Icon } from '@iconify/react'
import { cn } from '@workspace/ui/lib/utils'

export type SearchFieldBadgeProps = {
	icon: string
	label: string
	variant?: 'default' | 'compact'
	className?: string
}

export function SearchFieldBadge({
	icon,
	label,
	variant = 'default',
	className,
}: SearchFieldBadgeProps) {
	return (
		<span
			className={cn(
				'inline-flex items-center gap-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400',
				variant === 'default' ? 'px-2.5 py-1 text-xs' : 'px-1.5 py-0.5 text-xs',
				className,
			)}
		>
			<Icon icon={icon} className={cn(variant === 'default' ? 'size-3' : 'size-2.5')} />
			<span className="capitalize">{label}</span>
		</span>
	)
}
