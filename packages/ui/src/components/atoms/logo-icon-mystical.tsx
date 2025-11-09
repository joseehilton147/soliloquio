'use client'

import { Icon } from '@iconify/react'

/**
 * LogoIconMystical - Átomo temático
 * Ícone de logo com estrela orbitante para tema místico
 * Específico para apps espirituais/místicos
 */
export function LogoIconMystical() {
	return (
		<div className="relative size-6">
			{/* Sparkle animada orbitando */}
			<div className="absolute inset-0 animate-spin-slow [animation-duration:4s]">
				<Icon icon="lucide:sparkles" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 text-purple-500 animate-pulse" />
			</div>
			{/* Sparkle central */}
			<Icon icon="lucide:sparkles" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 text-purple-600 dark:text-purple-400" />
		</div>
	)
}
