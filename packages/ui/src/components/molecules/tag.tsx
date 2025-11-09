'use client'

import { Icon } from '@iconify/react'
import * as React from 'react'

import { cn } from '../../lib/utils'

export interface TagProps {
	value: string;
	onRemove?: () => void;
	variant?: 'default' | 'primary' | 'success' | 'warning';
	className?: string;
}

/**
 * Molécula: Tag visual (chip) com botão de remoção
 * Mostra um valor como tag estilizada
 */
export function Tag({ value, onRemove, variant = 'default', className }: TagProps) {
	const variantStyles = {
		default: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
		primary: 'bg-primary/10 text-primary hover:bg-primary/20',
		success: 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400',
		warning: 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400',
	}

	return (
		<span
			className={cn(
				'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium',
				'transition-colors',
				variantStyles[variant],
				className,
			)}
		>
			<span>{value}</span>
			{onRemove && (
				<button
					type="button"
					onClick={onRemove}
					className="ml-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
				>
					<Icon icon="lucide:x" className="size-3" />
					<span className="sr-only">Remover {value}</span>
				</button>
			)}
		</span>
	)
}
