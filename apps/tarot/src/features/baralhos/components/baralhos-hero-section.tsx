'use client'

import { Icon } from '@iconify/react'

/**
 * Hero Section da página de Baralhos
 *
 * Exibe o cabeçalho místico com:
 * - Símbolo sagrado animado
 * - Título e descrição
 * - Citação mística
 * - Background com geometria sagrada
 */
export function BaralhosHeroSection() {
	return (
		<>
			{/* Sacred Geometry Background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Animated circles */}
				<div className="absolute top-1/4 left-1/4 size-64 rounded-full border border-purple-500/10 animate-pulse" />
				<div className="absolute top-1/3 right-1/4 size-96 rounded-full border border-indigo-500/10 animate-pulse [animation-delay:1s]" />
				<div className="absolute bottom-1/4 left-1/3 size-48 rounded-full border border-violet-500/10 animate-pulse [animation-delay:2s]" />

				{/* Gradient orbs */}
				<div className="absolute top-20 right-20 size-96 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 size-96 bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl" />
			</div>

			<div className="text-center space-y-8">
				{/* Sacred Symbol */}
				<div className="relative inline-flex items-center justify-center">
					<div className="absolute size-24 animate-spin-slow [animation-duration:10s]">
						<Icon icon="lucide:circle" className="size-full text-purple-500/20" strokeWidth={0.5} />
					</div>
					<div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
						<Icon icon="lucide:moon" className="size-10 text-purple-600 dark:text-purple-400" strokeWidth={1.5} />
					</div>
				</div>

				{/* Title */}
				<div className="space-y-3">
					<h1 className="text-5xl md:text-6xl font-bold tracking-tight">
						<span className="block bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
							Tradições Sagradas
						</span>
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
						Oráculos ancestrais e sistemas divinatórios através dos tempos
					</p>
				</div>

				{/* Mystical Quote */}
				<div className="max-w-2xl mx-auto py-6 relative">
					<div className="absolute top-0 left-0 text-5xl text-purple-500/10 font-serif">"</div>
					<p className="text-base md:text-lg text-foreground/90 font-light italic leading-relaxed px-8">
						Cada baralho é uma tradição viva. Cada carta, um ensinamento.
					</p>
					<div className="absolute bottom-0 right-0 text-5xl text-purple-500/10 font-serif rotate-180">"</div>
				</div>
			</div>
		</>
	)
}
