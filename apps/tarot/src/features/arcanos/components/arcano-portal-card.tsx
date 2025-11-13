'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@workspace/ui/lib/utils'
import type { ArcanoType } from '../domain'

interface ArcanoPortalCardProps {
	arcano: ArcanoType
	reversed?: boolean
}

const COLOR_CLASSES = {
	violet: {
		border: 'border-violet-500/30',
		nebula: 'from-violet-900/20 via-violet-950/10',
		circles: ['border-violet-500/5', 'border-violet-500/10', 'border-violet-500/15', 'border-violet-500/20', 'border-violet-500/25'],
		energy: 'from-violet-600/10 via-violet-600/5',
		particles: 'bg-violet-400/40',
		decorativeIcon: 'text-violet-500',
		hoverGlow: 'from-violet-500/0 via-violet-500/5',
		halo: 'from-violet-500/20 via-violet-500/20 to-violet-500/20',
		iconBg: 'from-violet-600/20 to-violet-600/20',
		icon: 'text-violet-600 dark:text-violet-400',
		subtitle: 'text-violet-600/80 dark:text-violet-400/80',
		quote: 'text-violet-600 dark:text-violet-400',
		quoteOrnament: 'text-violet-500/10',
		bullet: 'bg-violet-500',
		keyTitle: 'text-violet-700 dark:text-violet-300',
	},
	indigo: {
		border: 'border-indigo-500/30',
		nebula: 'from-indigo-900/20 via-indigo-950/10',
		circles: ['border-indigo-500/5', 'border-indigo-500/10', 'border-indigo-500/15', 'border-indigo-500/20', 'border-indigo-500/25'],
		energy: 'from-indigo-600/10 via-indigo-600/5',
		particles: 'bg-indigo-400/40',
		decorativeIcon: 'text-indigo-500',
		hoverGlow: 'from-indigo-500/0 via-indigo-500/5',
		halo: 'from-indigo-500/20 via-indigo-500/20 to-indigo-500/20',
		iconBg: 'from-indigo-600/20 to-indigo-600/20',
		icon: 'text-indigo-600 dark:text-indigo-400',
		subtitle: 'text-indigo-600/80 dark:text-indigo-400/80',
		quote: 'text-indigo-600 dark:text-indigo-400',
		quoteOrnament: 'text-indigo-500/10',
		bullet: 'bg-indigo-500',
		keyTitle: 'text-indigo-700 dark:text-indigo-300',
	},
} as const

export function ArcanoPortalCard({ arcano, reversed = false }: ArcanoPortalCardProps) {
	const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])
	const colors = COLOR_CLASSES[arcano.color as keyof typeof COLOR_CLASSES]

	useEffect(() => {
		setParticles(
			Array.from({ length: 15 }).map(() => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				delay: `${Math.random() * 5}s`,
				duration: `${8 + Math.random() * 8}s`,
			}))
		)
	}, [])

	const portalPosition = reversed ? 'left-8' : 'right-8'
	const iconPosition = reversed ? 'left-1/4' : 'right-1/4'

	return (
		<div className={cn(
			'group relative overflow-hidden rounded-2xl border-2 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500',
			colors.border,
			arcano.bgGradient,
			arcano.shadowColor
		)}>
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className={cn('absolute inset-0 bg-gradient-radial to-transparent', colors.nebula)} />

				<div className={cn('absolute top-1/2 -translate-y-1/2', portalPosition)}>
					<div className={cn('absolute size-[400px] rounded-full border animate-spin-slow [animation-duration:50s]', colors.circles[0])} />
					<div className={cn('absolute size-[350px] rounded-full border animate-spin-slow [animation-duration:40s] [animation-direction:reverse]', colors.circles[1])} />
					<div className={cn('absolute size-[300px] rounded-full border-2 animate-spin-slow [animation-duration:35s]', colors.circles[2])} />
					<div className={cn('absolute size-[250px] rounded-full border animate-spin-slow [animation-duration:30s] [animation-direction:reverse]', colors.circles[3])} />
					<div className={cn('absolute size-[200px] rounded-full border-2 animate-spin-slow [animation-duration:25s]', colors.circles[4])} />
				</div>

				<div className={cn('absolute top-1/2 -translate-y-1/2 size-[350px] bg-gradient-to-br to-transparent rounded-full blur-3xl animate-pulse [animation-duration:4s]', portalPosition, colors.energy)} />
				<div className={cn('absolute top-1/2 -translate-y-1/2 size-[250px] bg-gradient-to-tl to-transparent rounded-full blur-2xl animate-pulse [animation-duration:3s] [animation-delay:1s]', portalPosition, colors.energy)} />

				{particles.map((particle, i) => (
					<div
						key={i}
						className={cn('absolute size-1 rounded-full animate-float', colors.particles)}
						style={{
							left: particle.left,
							top: particle.top,
							animationDelay: particle.delay,
							animationDuration: particle.duration,
						}}
					/>
				))}

				<div className={cn('absolute top-1/2 -translate-y-1/2 opacity-5 animate-spin-slow [animation-duration:80s]', iconPosition)}>
					<Icon icon={arcano.decorativeIcon} className={cn('size-32', colors.decorativeIcon)} />
				</div>

				<div className={cn('absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500', colors.hoverGlow)} />
			</div>

			<div className="relative z-10 p-8 space-y-6">
				<div className="flex items-start gap-4">
					<div className="relative flex-shrink-0">
						<div className={cn('absolute inset-0 -m-4 bg-gradient-to-br rounded-full blur-xl animate-pulse [animation-duration:2s]', colors.halo)} />
						<div className={cn('relative inline-flex items-center justify-center size-16 rounded-full bg-gradient-to-br border-2', colors.iconBg, colors.border)}>
							<Icon icon={arcano.icon} className={cn('size-8 group-hover:scale-110 transition-transform duration-300', colors.icon)} />
						</div>
					</div>

					<div className="flex-1">
						<h2 className={cn('text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(139,92,246,0.3)] mb-2', arcano.gradient)}>
							{arcano.name}
						</h2>
						<p className={cn('text-sm font-medium', colors.subtitle)}>
							{arcano.subtitle} · {arcano.title}
						</p>
					</div>
				</div>

				<div className="space-y-4 text-foreground/80">
					{arcano.description.map((paragraph, index) => (
						<p key={index} className="leading-relaxed">{paragraph}</p>
					))}
				</div>

				<div className="relative py-4">
					<div className={cn('absolute -left-4 top-0 text-5xl font-serif leading-none', colors.quoteOrnament)}>"</div>
					<div className={cn('absolute -right-2 bottom-0 text-5xl font-serif leading-none rotate-180', colors.quoteOrnament)}>"</div>
					<p className={cn('text-sm italic leading-relaxed px-4', colors.quote)}>
						{arcano.quote}
					</p>
				</div>

				<div className={cn('space-y-3 pt-4 border-t', colors.border)}>
					{arcano.keyPoints.map((point, index) => (
						<div key={index} className="flex items-start gap-3 group/point">
							<div className={cn('mt-1 size-1.5 rounded-full group-hover/point:shadow-[0_0_8px_currentColor] transition-all duration-300 flex-shrink-0', colors.bullet)} />
							<p className="text-sm text-foreground/80">
								<strong className={colors.keyTitle}>{point.title}:</strong> {point.description}
							</p>
						</div>
					))}
				</div>

				<Link
					href={arcano.href}
					className={cn(
						'inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 group-hover:gap-3 duration-300',
						arcano.gradient,
						arcano.shadowColor
					)}
				>
					<span>Explorar {arcano.name}</span>
					<Icon icon="lucide:arrow-right" className="size-4" />
				</Link>
			</div>
		</div>
	)
}
