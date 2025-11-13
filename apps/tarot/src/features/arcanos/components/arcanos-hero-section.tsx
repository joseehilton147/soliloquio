'use client'

import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

/**
 * Seção Hero Mística dos Arcanos - Organismo
 *
 * Seção imersiva no topo da página de arcanos com visual de portal
 * cósmico inspirado na home. Inclui:
 * - Círculos concêntricos girando (mandala cósmica)
 * - Partículas flutuantes místicas
 * - Símbolos esotéricos (lua, estrelas, pentagrama)
 * - Gradientes pulsantes
 * - Título com efeito glow
 *
 * @example
 * ```tsx
 * <ArcanosHeroSection />
 * ```
 */
export function ArcanosHeroSection() {
	const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])

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
		<div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-violet-950/30 to-indigo-950/40 backdrop-blur-sm p-12 mb-8">
			{/* Fundo místico */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{/* Nebulosa */}
				<div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-violet-950/10 to-transparent" />

				{/* Mandala cósmica central */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div className="absolute size-[600px] rounded-full border border-purple-500/5 animate-spin-slow [animation-duration:70s]" />
					<div className="absolute size-[500px] rounded-full border border-violet-500/10 animate-spin-slow [animation-duration:60s] [animation-direction:reverse]" />
					<div className="absolute size-[400px] rounded-full border-2 border-purple-500/15 animate-spin-slow [animation-duration:50s]" />
					<div className="absolute size-[300px] rounded-full border border-violet-500/20 animate-spin-slow [animation-duration:40s] [animation-direction:reverse]" />
					<div className="absolute size-[200px] rounded-full border-2 border-purple-500/25 animate-spin-slow [animation-duration:30s]" />
				</div>

				{/* Energia pulsante */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-gradient-to-br from-purple-600/10 via-violet-600/5 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:4s]" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[350px] bg-gradient-to-tl from-indigo-600/10 via-purple-600/5 to-transparent rounded-full blur-2xl animate-pulse [animation-duration:3s] [animation-delay:1s]" />

				{/* Partículas místicas */}
				{particles.map((particle, i) => (
					<div
						key={i}
						className="absolute size-1 rounded-full bg-purple-400/40 animate-float"
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
					<Icon icon="game-icons:pentagram" className="size-24 text-purple-500" />
				</div>
				<div className="absolute bottom-10 left-20 opacity-5 animate-pulse [animation-duration:8s]">
					<Icon icon="lucide:moon" className="size-20 text-violet-500" />
				</div>
				<div className="absolute top-1/3 left-1/4 opacity-5 animate-spin-slow [animation-duration:80s] [animation-direction:reverse]">
					<Icon icon="lucide:star" className="size-16 text-indigo-500" />
				</div>
				<div className="absolute bottom-1/3 right-1/4 opacity-5 animate-pulse [animation-duration:6s] [animation-delay:2s]">
					<Icon icon="game-icons:crystal-ball" className="size-20 text-purple-500" />
				</div>
			</div>

			{/* Conteúdo */}
			<div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
				{/* Título místico */}
				<h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-1000">
					Os Arcanos do Tarô
				</h1>

				{/* Subtítulo com ícones místicos */}
				<div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
					<Icon icon="game-icons:moon-cloak" className="size-6 text-violet-400/70" />
					<p className="text-lg text-purple-200/90 font-light tracking-wide">
						78 Portais Sagrados da Sabedoria Ancestral
					</p>
					<Icon icon="game-icons:crystal-ball" className="size-6 text-purple-400/70" />
				</div>

				{/* Descrição */}
				<p className="text-lg text-purple-200/80 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
					O tarô tradicional é composto por 78 cartas místicas, divididas em dois grupos sagrados:
					os <span className="text-violet-300 font-semibold">Arcanos Maiores</span> e os{' '}
					<span className="text-indigo-300 font-semibold">Arcanos Menores</span>. Cada grupo
					possui sua própria função espiritual e profundidade de significado.
				</p>

				{/* Divider místico */}
				<div className="flex items-center justify-center gap-4 pt-4 animate-in fade-in duration-1000 delay-500">
					<div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
					<Icon icon="lucide:sparkles" className="size-4 text-purple-400/50" />
					<div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
				</div>
			</div>
		</div>
	)
}
