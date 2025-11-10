'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'

import { cn } from '../../lib/utils'

export interface SacredEyeLogoProps {
	/**
	 * Tamanho do logo
	 * - sm: Header/navbar (40px)
	 * - md: Médio (80px)
	 * - lg: Home/hero (128px)
	 */
	size?: 'sm' | 'md' | 'lg'

	/**
	 * Se true, renderiza com Link para home
	 */
	href?: string

	/**
	 * Classes adicionais
	 */
	className?: string

	/**
	 * Desabilita animação (útil para SSR/performance)
	 */
	disableAnimation?: boolean
}

/**
 * SacredEyeLogo - Logo Místico Sagrado
 *
 * Logo místico com olho no centro, hexágono rotacionando,
 * círculo pulsante e sparkles orbitando.
 *
 * Usado na home (grande) e header (pequeno).
 *
 * Design baseado em geometria sagrada e simbolismo hermético.
 */
export function SacredEyeLogo({
	size = 'lg',
	href,
	className,
	disableAnimation = false,
}: SacredEyeLogoProps) {
	const sizes = {
		sm: {
			container: 'size-10',
			hexagon: 'size-10',
			circle: 'size-8',
			eye: 'size-4',
			eyeBg: 'size-6',
			sparkles: 'size-12',
			sparkleIcon: 'size-2.5',
		},
		md: {
			container: 'size-20',
			hexagon: 'size-20',
			circle: 'size-16',
			eye: 'size-6',
			eyeBg: 'size-12',
			sparkles: 'size-24',
			sparkleIcon: 'size-3',
		},
		lg: {
			container: 'size-32',
			hexagon: 'size-32',
			circle: 'size-24',
			eye: 'size-8',
			eyeBg: 'size-16',
			sparkles: 'size-40',
			sparkleIcon: 'size-4',
		},
	}

	const currentSize = sizes[size]

	const content = (
		<div className={cn('relative inline-flex items-center justify-center', currentSize.container, className)}>
			{/* Outer hexagon rotating */}
			<div className={cn(
				'absolute',
				currentSize.hexagon,
				!disableAnimation && 'animate-spin-slow',
			)}>
				<Icon icon="lucide:hexagon" className="size-full text-purple-500/20" />
			</div>

			{/* Middle circle pulsing */}
			<div className={cn(
				'absolute',
				currentSize.circle,
				!disableAnimation && 'animate-pulse',
			)}>
				<Icon icon="lucide:circle" className="size-full text-violet-500/30" />
			</div>

			{/* Inner eye */}
			<div className={cn(
				'relative flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border border-purple-500/20 backdrop-blur-sm',
				currentSize.eyeBg,
			)}>
				<Icon
					icon="lucide:eye"
					className={cn(
						currentSize.eye,
						'text-purple-600 dark:text-purple-400',
						!disableAnimation && 'animate-pulse',
					)}
				/>
			</div>

			{/* Sparkles orbiting */}
			<div className={cn(
				'absolute',
				currentSize.sparkles,
				!disableAnimation && 'animate-spin-slow [animation-duration:8s]',
			)}>
				<Icon icon="lucide:sparkles" className={cn(
					'absolute top-0 left-1/2 -translate-x-1/2 text-purple-400',
					currentSize.sparkleIcon,
				)} />
				<Icon icon="lucide:sparkles" className={cn(
					'absolute bottom-0 left-1/2 -translate-x-1/2 text-indigo-400',
					currentSize.sparkleIcon,
				)} />
				<Icon icon="lucide:sparkles" className={cn(
					'absolute left-0 top-1/2 -translate-y-1/2 text-violet-400',
					currentSize.sparkleIcon,
				)} />
				<Icon icon="lucide:sparkles" className={cn(
					'absolute right-0 top-1/2 -translate-y-1/2 text-purple-400',
					currentSize.sparkleIcon,
				)} />
			</div>
		</div>
	)

	// Se tem href, envolve em Link
	if (href) {
		return (
			<Link href={href} className="inline-flex">
				{content}
			</Link>
		)
	}

	return content
}
