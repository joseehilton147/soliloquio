'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@workspace/ui/lib/utils'

export interface CartasHeroSectionProps {
	title: string
	subtitle: string
	description: string
	iconMain: string
	symbolIcon1: string
	symbolIcon2: string
	symbolIcon3: string
	symbolIcon4: string
	breadcrumbParent?: { label: string; href: string }
	breadcrumbCurrent: string
	colorScheme: 'violet' | 'indigo'
}

const COLOR_CLASSES = {
	violet: {
		container: 'border-violet-500/30 from-violet-950/40 via-purple-950/30 to-indigo-950/40',
		nebula: 'from-violet-900/20 via-violet-950/10',
		circles: [
			'border-violet-500/5',
			'border-violet-500/10',
			'border-violet-500/15',
			'border-violet-500/20',
			'border-violet-500/25',
		],
		energy1: 'from-violet-600/10 via-violet-600/5',
		energy2: 'from-indigo-600/10 via-violet-600/5',
		particles: 'bg-violet-400/40',
		symbols: ['text-violet-500', 'text-violet-500', 'text-indigo-500', 'text-violet-500'],
		triangle: 'text-violet-500/20',
		iconBg: 'from-violet-500/10 to-violet-500/10',
		iconBorder: 'border-violet-500/20',
		iconColor: 'text-violet-600 dark:text-violet-400',
		gradient: 'from-violet-400 via-purple-400 to-indigo-400',
		subtitle: 'text-violet-400/70',
		text: 'text-violet-200/90',
		description: 'text-violet-200/80',
		divider: 'via-violet-500/30',
		dividerIcon: 'text-violet-400/50',
		breadcrumbSeparator: 'text-violet-500/50',
		breadcrumbHover: 'hover:text-violet-600 dark:hover:text-violet-400',
	},
	indigo: {
		container: 'border-indigo-500/30 from-indigo-950/40 via-blue-950/30 to-cyan-950/40',
		nebula: 'from-indigo-900/20 via-indigo-950/10',
		circles: [
			'border-indigo-500/5',
			'border-indigo-500/10',
			'border-indigo-500/15',
			'border-indigo-500/20',
			'border-indigo-500/25',
		],
		energy1: 'from-indigo-600/10 via-indigo-600/5',
		energy2: 'from-cyan-600/10 via-indigo-600/5',
		particles: 'bg-indigo-400/40',
		symbols: ['text-indigo-500', 'text-blue-500', 'text-cyan-500', 'text-indigo-500'],
		triangle: 'text-indigo-500/20',
		iconBg: 'from-indigo-500/10 to-indigo-500/10',
		iconBorder: 'border-indigo-500/20',
		iconColor: 'text-indigo-600 dark:text-indigo-400',
		gradient: 'from-indigo-400 via-blue-400 to-cyan-400',
		subtitle: 'text-indigo-400/70',
		text: 'text-indigo-200/90',
		description: 'text-indigo-200/80',
		divider: 'via-indigo-500/30',
		dividerIcon: 'text-indigo-400/50',
		breadcrumbSeparator: 'text-indigo-500/50',
		breadcrumbHover: 'hover:text-indigo-600 dark:hover:text-indigo-400',
	},
} as const

/**
 * Seção Hero Mística para páginas de Cartas - Organismo
 *
 * Seção imersiva no topo das páginas de cartas com visual de portal
 * cósmico. Inclui:
 * - Círculos concêntricos girando (mandala cósmica)
 * - Partículas flutuantes místicas
 * - Símbolos esotéricos customizáveis
 * - Gradientes pulsantes
 * - Título com efeito glow
 * - Breadcrumb para navegação
 *
 * @example
 * ```tsx
 * <CartasHeroSection
 *   title="Arcanos Maiores"
 *   subtitle="22 Caminhos da Jornada do Louco"
 *   description="Os Arcanos Maiores são os grandes mistérios..."
 *   iconMain="lucide:crown"
 *   colorScheme="violet"
 *   ...
 * />
 * ```
 */
export function CartasHeroSection({
	title,
	subtitle,
	description,
	iconMain,
	symbolIcon1,
	symbolIcon2,
	symbolIcon3,
	symbolIcon4,
	breadcrumbParent,
	breadcrumbCurrent,
	colorScheme,
}: CartasHeroSectionProps) {
	const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>(
		[]
	)

	const colors = COLOR_CLASSES[colorScheme]

	useEffect(() => {
		setParticles(
			Array.from({ length: 25 }).map(() => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				delay: `${Math.random() * 5}s`,
				duration: `${10 + Math.random() * 10}s`,
			}))
		)
	}, [])

	return (
		<div
			className={cn(
				'relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br backdrop-blur-sm p-12 mb-8',
				colors.container
			)}
		>
			{/* Fundo místico */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{/* Nebulosa */}
				<div className={cn('absolute inset-0 bg-gradient-radial to-transparent', colors.nebula)} />

				{/* Mandala cósmica central */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div
						className={cn(
							'absolute size-[600px] rounded-full border animate-spin-slow [animation-duration:70s]',
							colors.circles[0]
						)}
					/>
					<div
						className={cn(
							'absolute size-[500px] rounded-full border animate-spin-slow [animation-duration:60s] [animation-direction:reverse]',
							colors.circles[1]
						)}
					/>
					<div
						className={cn(
							'absolute size-[400px] rounded-full border-2 animate-spin-slow [animation-duration:50s]',
							colors.circles[2]
						)}
					/>
					<div
						className={cn(
							'absolute size-[300px] rounded-full border animate-spin-slow [animation-duration:40s] [animation-direction:reverse]',
							colors.circles[3]
						)}
					/>
					<div
						className={cn(
							'absolute size-[200px] rounded-full border-2 animate-spin-slow [animation-duration:30s]',
							colors.circles[4]
						)}
					/>
				</div>

				{/* Energia pulsante */}
				<div
					className={cn(
						'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-gradient-to-br to-transparent rounded-full blur-3xl animate-pulse [animation-duration:4s]',
						colors.energy1
					)}
				/>
				<div
					className={cn(
						'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[350px] bg-gradient-to-tl to-transparent rounded-full blur-2xl animate-pulse [animation-duration:3s] [animation-delay:1s]',
						colors.energy2
					)}
				/>

				{/* Partículas místicas */}
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

				{/* Símbolos esotéricos */}
				<div className="absolute top-10 right-20 opacity-5 animate-spin-slow [animation-duration:100s]">
					<Icon icon={symbolIcon1} className={cn('size-24', colors.symbols[0])} />
				</div>
				<div className="absolute bottom-10 left-20 opacity-5 animate-pulse [animation-duration:8s]">
					<Icon icon={symbolIcon2} className={cn('size-20', colors.symbols[1])} />
				</div>
				<div className="absolute top-1/3 left-1/4 opacity-5 animate-spin-slow [animation-duration:80s] [animation-direction:reverse]">
					<Icon icon={symbolIcon3} className={cn('size-16', colors.symbols[2])} />
				</div>
				<div className="absolute bottom-1/3 right-1/4 opacity-5 animate-pulse [animation-duration:6s] [animation-delay:2s]">
					<Icon icon={symbolIcon4} className={cn('size-20', colors.symbols[3])} />
				</div>
			</div>

			{/* Conteúdo */}
			<div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
				{/* Breadcrumb */}
				{breadcrumbParent && (
					<div className="flex items-center justify-center gap-2 text-sm animate-in fade-in duration-1000">
						<Link
							href={breadcrumbParent.href}
							className={cn('transition-colors text-foreground/60', colors.breadcrumbHover)}
						>
							{breadcrumbParent.label}
						</Link>
						<span className={colors.breadcrumbSeparator}>/</span>
						<span className="text-foreground font-medium">{breadcrumbCurrent}</span>
					</div>
				)}

				{/* Ícone místico principal */}
				<div className="flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
					<div className="relative inline-flex items-center justify-center">
						<div className="absolute size-24 animate-spin-slow [animation-duration:15s]">
							<Icon icon="lucide:triangle" className={cn('size-full', colors.triangle)} />
						</div>
						<div className={cn('flex size-20 items-center justify-center rounded-full bg-gradient-to-br border', colors.iconBg, colors.iconBorder)}>
							<Icon icon={iconMain} className={cn('size-10', colors.iconColor)} />
						</div>
					</div>
				</div>

				{/* Título místico */}
				<h1
					className={cn(
						'text-5xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-1000',
						colors.gradient
					)}
				>
					{title}
				</h1>

				{/* Subtítulo */}
				<div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
					<Icon icon="lucide:sparkles" className={cn('size-6', colors.subtitle)} />
					<p className={cn('text-lg font-light tracking-wide', colors.text)}>{subtitle}</p>
					<Icon icon="lucide:sparkles" className={cn('size-6', colors.subtitle)} />
				</div>

				{/* Descrição */}
				<p
					className={cn(
						'text-lg leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300',
						colors.description
					)}
				>
					{description}
				</p>

				{/* Divider místico */}
				<div className="flex items-center justify-center gap-4 pt-4 animate-in fade-in duration-1000 delay-500">
					<div className={cn('h-px w-24 bg-gradient-to-r from-transparent to-transparent', colors.divider)} />
					<Icon icon="lucide:sparkles" className={cn('size-4', colors.dividerIcon)} />
					<div className={cn('h-px w-24 bg-gradient-to-r from-transparent to-transparent', colors.divider)} />
				</div>
			</div>
		</div>
	)
}
