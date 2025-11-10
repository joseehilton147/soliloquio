'use client'

import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

/**
 * Seção Hero Mística para Naipes - Organismo
 *
 * Hero imersivo no topo da página de naipes com visual de portal
 * elemental. Unifica o título e a explicação dos 4 elementos em
 * uma experiência visual coesa.
 *
 * Características:
 * - Mandala cósmica de 5 círculos concêntricos
 * - 25 partículas místicas flutuantes
 * - Símbolos dos 4 elementos animados
 * - Gradientes pulsantes purple/violet/indigo
 * - Explicação dos 4 elementos integrada
 *
 * @example
 * ```tsx
 * <NaipesHeroSection />
 * ```
 */
export function NaipesHeroSection() {
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

				{/* Símbolos dos 4 Elementos - Grandes */}
				<div className="absolute top-10 right-20 opacity-5 animate-pulse [animation-duration:8s]">
					<Icon icon="mdi:water" className="size-24 text-blue-500" />
				</div>
				<div className="absolute bottom-10 left-20 opacity-5 animate-pulse [animation-duration:6s] [animation-delay:1s]">
					<Icon icon="mdi:fire" className="size-24 text-red-500" />
				</div>
				<div className="absolute top-1/3 left-1/4 opacity-5 animate-pulse [animation-duration:7s] [animation-delay:2s]">
					<Icon icon="mdi:mountain" className="size-20 text-stone-500" />
				</div>
				<div className="absolute bottom-1/3 right-1/4 opacity-5 animate-pulse [animation-duration:5s] [animation-delay:1.5s]">
					<Icon icon="mdi:weather-windy" className="size-20 text-slate-500" />
				</div>
			</div>

			{/* Conteúdo */}
			<div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
				{/* Título místico */}
				<h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-1000">
					Os 4 Naipes do Tarô
				</h1>

				{/* Subtítulo */}
				<div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
					<Icon icon="lucide:sparkles" className="size-6 text-violet-400/70" />
					<p className="text-lg text-purple-200/90 font-light tracking-wide">
						Os 4 Elementos da Natureza Manifestados
					</p>
					<Icon icon="lucide:sparkles" className="size-6 text-violet-400/70" />
				</div>

				{/* Descrição Principal */}
				<p className="text-lg text-purple-200/80 leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
					Os Arcanos Menores são divididos em <span className="text-purple-300 font-semibold">4 naipes místicos</span>,
					cada um representando um dos elementos fundamentais da natureza e diferentes dimensões da experiência humana.
					Cada naipe contém 14 cartas sagradas (do Ás ao Rei).
				</p>

				{/* Símbolos dos 4 Elementos - Interativos */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
					{/* Copas - Água */}
					<div className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all">
						<Icon icon="mdi:water" className="size-8 text-blue-400 group-hover:scale-110 transition-transform" />
						<div className="text-center">
							<p className="font-semibold text-blue-300">Copas</p>
							<p className="text-xs text-blue-400/70">Água · Emoções</p>
						</div>
					</div>

					{/* Paus - Fogo */}
					<div className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all">
						<Icon icon="mdi:fire" className="size-8 text-red-400 group-hover:scale-110 transition-transform" />
						<div className="text-center">
							<p className="font-semibold text-red-300">Paus</p>
							<p className="text-xs text-red-400/70">Fogo · Ação</p>
						</div>
					</div>

					{/* Ouros - Terra */}
					<div className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-stone-500/20 bg-stone-500/5 hover:bg-stone-500/10 transition-all">
						<Icon icon="mdi:mountain" className="size-8 text-stone-400 group-hover:scale-110 transition-transform" />
						<div className="text-center">
							<p className="font-semibold text-stone-300">Ouros</p>
							<p className="text-xs text-stone-400/70">Terra · Material</p>
						</div>
					</div>

					{/* Espadas - Ar */}
					<div className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-slate-500/20 bg-slate-500/5 hover:bg-slate-500/10 transition-all">
						<Icon icon="mdi:weather-windy" className="size-8 text-slate-400 group-hover:scale-110 transition-transform" />
						<div className="text-center">
							<p className="font-semibold text-slate-300">Espadas</p>
							<p className="text-xs text-slate-400/70">Ar · Intelecto</p>
						</div>
					</div>
				</div>

				{/* Divider místico */}
				<div className="flex items-center justify-center gap-4 pt-4 animate-in fade-in duration-1000 delay-700">
					<div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
					<Icon icon="lucide:sparkles" className="size-4 text-purple-400/50" />
					<div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
				</div>
			</div>
		</div>
	)
}
