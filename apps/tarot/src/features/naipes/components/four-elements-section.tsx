'use client'

import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

export function FourElementsSection() {
	const [particles, setParticles] = useState<{ left: string; top: string; delay: string; duration: string }[]>([])

	useEffect(() => {
		setParticles(
			Array.from({ length: 20 }).map(() => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				delay: `${Math.random() * 5}s`,
				duration: `${10 + Math.random() * 10}s`,
			})),
		)
	}, [])

	return (
		<div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-violet-950/30 to-indigo-950/40 backdrop-blur-sm">
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-violet-950/10 to-transparent" />

				<div className="absolute top-1/2 left-8 -translate-y-1/2">
					<div className="absolute size-[350px] rounded-full border border-purple-500/10 animate-spin-slow [animation-duration:50s]" />
					<div className="absolute size-[300px] rounded-full border border-violet-500/15 animate-spin-slow [animation-duration:40s] [animation-direction:reverse]" />
					<div className="absolute size-[250px] rounded-full border-2 border-purple-500/20 animate-spin-slow [animation-duration:30s]" />
					<div className="absolute size-[200px] rounded-full border border-violet-500/25 animate-spin-slow [animation-duration:25s] [animation-direction:reverse]" />
					<div className="absolute size-[150px] rounded-full border-2 border-purple-500/30 animate-spin-slow [animation-duration:20s]" />
				</div>

				<div className="absolute top-1/2 left-8 -translate-y-1/2 size-[300px] bg-gradient-to-br from-purple-600/10 via-violet-600/5 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:4s]" />
				<div className="absolute top-1/2 left-8 -translate-y-1/2 size-[200px] bg-gradient-to-tl from-indigo-600/10 via-purple-600/5 to-transparent rounded-full blur-2xl animate-pulse [animation-duration:3s] [animation-delay:1s]" />

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

				<div className="absolute top-6 left-6 opacity-5 animate-pulse [animation-duration:6s]">
					<Icon icon="mdi:water" className="size-16 text-blue-500" />
				</div>
				<div className="absolute top-6 right-6 opacity-5 animate-pulse [animation-duration:6s] [animation-delay:1.5s]">
					<Icon icon="mdi:fire" className="size-16 text-red-500" />
				</div>
				<div className="absolute bottom-6 left-6 opacity-5 animate-pulse [animation-duration:6s] [animation-delay:3s]">
					<Icon icon="mdi:mountain" className="size-16 text-stone-500" />
				</div>
				<div className="absolute bottom-6 right-6 opacity-5 animate-pulse [animation-duration:6s] [animation-delay:4.5s]">
					<Icon icon="mdi:weather-windy" className="size-16 text-slate-400" />
				</div>

				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 animate-spin-slow [animation-duration:80s]">
					<Icon icon="game-icons:pentagram" className="size-32 text-purple-500" />
				</div>
			</div>

			<div className="relative z-10 p-8 space-y-6">
				<div className="flex items-start gap-6">
					<div className="relative flex-shrink-0">
						<div className="absolute inset-0 -m-4 bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-500/20 rounded-full blur-xl animate-pulse [animation-duration:2s]" />
						<div className="relative inline-flex items-center justify-center size-16 rounded-full bg-gradient-to-br from-purple-600/20 to-violet-600/20 border-2 border-purple-500/30">
							<Icon icon="lucide:sparkles" className="size-8 text-purple-400" />
						</div>
					</div>

					<div className="flex-1">
						<div className="relative mb-4">
							<div className="absolute -left-6 top-0 text-5xl text-purple-500/10 font-serif leading-none">"</div>
							<h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
								Por que 4 Naipes e 4 Elementos?
							</h2>
							<div className="absolute -right-4 -bottom-2 text-5xl text-purple-500/10 font-serif leading-none rotate-180">"</div>
						</div>
					</div>
				</div>

				<div className="space-y-5 pl-22">
					<div className="flex gap-4 group">
						<div className="flex-shrink-0 mt-1">
							<div className="size-2 rounded-full bg-purple-400/60 group-hover:bg-purple-400 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.6)] transition-all duration-300" />
						</div>
						<p className="text-purple-200/90 leading-relaxed">
							A divisão em{' '}
							<span className="font-semibold text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
								4 naipes
							</span>{' '}
							reflete uma sabedoria ancestral presente em diversas tradições: os{' '}
							<span className="font-semibold text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
								4 elementos
							</span>{' '}
							<span className="text-purple-300/70">(Água, Fogo, Terra, Ar)</span> que
							compõem toda a criação. Cada elemento representa uma faceta da experiência
							humana — emoções, ação, matéria e pensamento.
						</p>
					</div>

					<div className="flex items-center gap-3 py-2">
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
						<div className="flex gap-2">
							<Icon icon="mdi:water" className="size-3 text-blue-400/50" />
							<Icon icon="mdi:fire" className="size-3 text-red-400/50" />
							<Icon icon="mdi:mountain" className="size-3 text-stone-400/50" />
							<Icon icon="mdi:weather-windy" className="size-3 text-slate-300/50" />
						</div>
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
					</div>

					<div className="flex gap-4 group">
						<div className="flex-shrink-0 mt-1">
							<div className="size-2 rounded-full bg-violet-400/60 group-hover:bg-violet-400 group-hover:shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-all duration-300" />
						</div>
						<p className="text-purple-200/90 leading-relaxed">
							Essa estrutura não é aleatória: ela espelha como vivemos nossas vidas
							através dessas{' '}
							<span className="font-semibold text-violet-300 drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]">
								4 dimensões fundamentais
							</span>
							, sempre buscando equilíbrio entre{' '}
							<span className="italic text-violet-300/80">sentir</span>,{' '}
							<span className="italic text-violet-300/80">agir</span>,{' '}
							<span className="italic text-violet-300/80">construir</span> e{' '}
							<span className="italic text-violet-300/80">pensar</span>.
						</p>
					</div>

					<div className="flex justify-center gap-6 pt-4">
						<Icon icon="lucide:star" className="size-3 text-purple-400/40 animate-pulse [animation-duration:2s]" />
						<Icon icon="lucide:sparkles" className="size-3 text-violet-400/40 animate-pulse [animation-duration:2s] [animation-delay:0.5s]" />
						<Icon icon="lucide:star" className="size-3 text-indigo-400/40 animate-pulse [animation-duration:2s] [animation-delay:1s]" />
					</div>
				</div>
			</div>
		</div>
	)
}
