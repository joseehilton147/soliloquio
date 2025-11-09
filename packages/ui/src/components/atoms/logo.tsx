'use client'

import Link from 'next/link'

import { cn } from '../../lib/utils'

export interface LogoProps {
	href?: string
	icon?: React.ReactNode
	text: string
	className?: string
}

/**
 * Logo - Átomo
 * Componente genérico de logo com ícone e texto
 * Reutilizável em qualquer aplicação
 */
export function Logo({ href = '/', icon, text, className }: LogoProps) {
	const content = (
		<div className={cn('relative inline-flex items-center gap-3 group', className)}>
			{/* Ícone (opcional, personalizável) */}
			{icon && <div className="relative">{icon}</div>}

			{/* Texto com gradiente */}
			<span className="text-lg font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-violet-500 group-hover:to-indigo-500 transition-all duration-300">
				{text}
			</span>
		</div>
	)

	return href
		? (
			<Link href={href} className="inline-flex">
				{content}
			</Link>
		)
		: (
			content
		)
}
