'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@workspace/ui/lib/utils'
import type { ElementColorScheme } from '../element-colors.data'

export interface NaipePageHeroProps {
	title: string
	subtitle: string
	description: string
	elementIcon: string
	symbolIcon1: string
	symbolIcon2: string
	symbolIcon3: string
	symbolIcon4: string
	colors: ElementColorScheme
	symbol: string
}

/**
 * Hero Místico para Páginas Individuais de Naipes - Organismo
 *
 * Hero imersivo para páginas de naipes específicos (Copas, Paus, Ouros, Espadas).
 * Reutiliza o sistema de cores dos elementos.
 *
 * Características:
 * - Mandala cósmica de 5 círculos concêntricos
 * - 25 partículas místicas flutuantes
 * - Símbolos do elemento animados
 * - Cores específicas do elemento (Água, Fogo, Terra, Ar)
 * - Breadcrumb integrado
 *
 * @example
 * ```tsx
 * <NaipePageHero
 *   title="Copas"
 *   subtitle="Naipe de Água"
 *   description="..."
 *   elementIcon="mdi:water"
 *   colors={ELEMENT_COLORS.agua}
 *   symbol="♥"
 * />
 * ```
 */
export function NaipePageHero({
	title,
	subtitle,
	description,
	elementIcon,
	symbolIcon1,
	symbolIcon2,
	symbolIcon3,
	symbolIcon4,
	colors,
	symbol,
}: NaipePageHeroProps) {
	const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>(
		[]
	)

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
		<div className={cn('relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br backdrop-blur-sm p-12 mb-8', colors.border, `from-${colors.primary}-950/40 via-${colors.secondary}-950/30 to-${colors.tertiary}-950/40`)}>
			{/* Fundo místico */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{/* Nebulosa */}
				<div className={cn('absolute inset-0 bg-gradient-radial to-transparent', colors.nebula)} />

				{/* Mandala cósmica central */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					{colors.circles.map((circleClass, i) => (
						<div
							key={i}
							className={cn(
								'absolute rounded-full animate-spin-slow',
								`size-[${600 - i * 100}px]`,
								i % 2 === 0 ? 'border-2' : 'border',
								i % 2 === 0 ? '' : '[animation-direction:reverse]',
								`[animation-duration:${70 - i * 10}s]`,
								circleClass
							)}
						/>
					))}
				</div>

				{/* Energia pulsante */}
				<div className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-gradient-to-br to-transparent rounded-full blur-3xl animate-pulse [animation-duration:4s]', colors.energy1)} />
				<div className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[350px] bg-gradient-to-tl to-transparent rounded-full blur-2xl animate-pulse [animation-duration:3s] [animation-delay:1s]', colors.energy2)} />

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

				{/* Símbolos do Elemento */}
				<div className="absolute top-10 right-20 opacity-5 animate-pulse [animation-duration:8s]">
					<Icon icon={symbolIcon1} className={cn('size-24', colors.symbols[0])} />
				</div>
				<div className="absolute bottom-10 left-20 opacity-5 animate-pulse [animation-duration:6s] [animation-delay:1s]">
					<Icon icon={symbolIcon2} className={cn('size-24', colors.symbols[1])} />
				</div>
				<div className="absolute top-1/3 left-1/4 opacity-5 animate-pulse [animation-duration:7s] [animation-delay:2s]">
					<Icon icon={symbolIcon3} className={cn('size-20', colors.symbols[2])} />
				</div>
				<div className="absolute bottom-1/3 right-1/4 opacity-5 animate-pulse [animation-duration:5s] [animation-delay:1.5s]">
					<Icon icon={symbolIcon4} className={cn('size-20', colors.symbols[3])} />
				</div>
			</div>

			{/* Conteúdo */}
			<div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
				{/* Breadcrumb */}
				<div className="flex items-center justify-center gap-2 text-base animate-in fade-in duration-1000">
					<Link href="/cartas/naipes" className={cn('transition-colors text-foreground/60', colors.breadcrumbHover)}>
						Naipes
					</Link>
					<span className={colors.breadcrumbSeparator}>/</span>
					<span className="text-foreground font-medium">{title}</span>
				</div>

				{/* Símbolo e Ícone místico principal */}
				<div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
					<div className="relative inline-flex items-center justify-center">
						<div className="absolute size-24 animate-spin-slow [animation-duration:15s]">
							<Icon icon="lucide:triangle" className={cn('size-full', colors.triangle)} />
						</div>
						<div className={cn('flex size-20 items-center justify-center rounded-full bg-gradient-to-br border', colors.iconBg, colors.iconBorder)}>
							<Icon icon={elementIcon} className={cn('size-10', colors.iconColor)} />
						</div>
					</div>
					<span className="text-6xl animate-pulse [animation-duration:2s]">{symbol}</span>
				</div>

				{/* Título místico */}
				<h1 className={cn('text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-1000 tracking-wider', colors.gradient)}>
					{title}
				</h1>

				{/* Subtítulo */}
				<div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
					<Icon icon="lucide:sparkles" className={cn('size-7', colors.subtitle)} />
					<p className={cn('text-xl md:text-2xl font-accent font-light tracking-wide', colors.text)}>{subtitle}</p>
					<Icon icon="lucide:sparkles" className={cn('size-7', colors.subtitle)} />
				</div>

				{/* Descrição */}
				<p className={cn('text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300', colors.description)}>
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
