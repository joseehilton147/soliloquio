'use client'

import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

/**
 * Seção mística da estrutura dos naipes - Organismo
 *
 * Seção imersiva que explica a estrutura de cada naipe (14 cartas)
 * com visual místico inspirado no portal da home. Inclui:
 * - Círculos concêntricos girando
 * - Partículas flutuantes (poeira estelar)
 * - Símbolos esotéricos sutis
 * - Gradientes pulsantes
 * - Ornamentos decorativos
 *
 * @example
 * ```tsx
 * <NaipeStructureSection />
 * ```
 */
export function NaipeStructureSection() {
	const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])

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

	return (
		<div className="relative overflow-hidden rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-violet-950/40 backdrop-blur-sm">
			{/* ═══════════════════════════════════════════════════════
			    FUNDO MÍSTICO - Vórtex Portal
			    ═══════════════════════════════════════════════════════ */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{/* Nebulosa de fundo */}
				<div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 via-purple-950/10 to-transparent" />

				{/* Vórtex portal - círculos concêntricos */}
				<div className="absolute top-1/2 right-8 -translate-y-1/2">
					<div className="absolute size-[300px] rounded-full border border-indigo-500/10 animate-spin-slow [animation-duration:40s]" />
					<div className="absolute size-[250px] rounded-full border border-purple-500/15 animate-spin-slow [animation-duration:30s] [animation-direction:reverse]" />
					<div className="absolute size-[200px] rounded-full border border-violet-500/20 animate-spin-slow [animation-duration:25s]" />
					<div className="absolute size-[150px] rounded-full border-2 border-indigo-500/30 animate-spin-slow [animation-duration:20s] [animation-direction:reverse]" />
				</div>

				{/* Energia pulsante */}
				<div className="absolute top-1/2 right-8 -translate-y-1/2 size-[250px] bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-transparent rounded-full blur-2xl animate-pulse [animation-duration:3s]" />

				{/* Partículas místicas */}
				{particles.map((particle, i) => (
					<div
						key={i}
						className="absolute size-1 rounded-full bg-indigo-400/40 animate-float"
						style={{
							left: particle.left,
							top: particle.top,
							animationDelay: particle.delay,
							animationDuration: particle.duration,
						}}
					/>
				))}

				{/* Símbolos esotéricos sutis */}
				<div className="absolute top-8 right-16 opacity-5 animate-spin-slow [animation-duration:60s]">
					<Icon icon="game-icons:pentagram" className="size-20 text-indigo-500" />
				</div>
				<div className="absolute bottom-12 right-24 opacity-5 animate-pulse [animation-duration:6s]">
					<Icon icon="lucide:sparkles" className="size-16 text-purple-500" />
				</div>
			</div>

			{/* ═══════════════════════════════════════════════════════
			    CONTEÚDO PRINCIPAL
			    ═══════════════════════════════════════════════════════ */}
			<div className="relative z-10 p-8 space-y-8">
				{/* Header com ícone místico */}
				<div className="flex items-start gap-6">
					{/* Ícone com halo pulsante */}
					<div className="relative flex-shrink-0">
						<div className="absolute inset-0 -m-4 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-violet-500/20 rounded-full blur-xl animate-pulse [animation-duration:2s]" />
						<div className="relative inline-flex items-center justify-center size-16 rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-2 border-indigo-500/30">
							<Icon icon="lucide:layers" className="size-8 text-indigo-400" />
						</div>
					</div>

					<div className="flex-1 space-y-4">
						{/* Título com gradiente místico */}
						<div className="relative">
							<div className="absolute -left-6 top-0 text-5xl text-indigo-500/10 font-serif leading-none">"</div>
							<h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
								Estrutura de Cada Naipe
							</h3>
							<div className="absolute -right-4 -bottom-2 text-5xl text-indigo-500/10 font-serif leading-none rotate-180">"</div>
						</div>

						<p className="text-lg text-indigo-200/90 leading-relaxed">
							Os naipes são pilares da sabedoria menor, cada um contendo{' '}
							<span className="text-indigo-300 font-semibold">14 cartas sagradas</span>{' '}
							que revelam os mistérios da existência humana.
						</p>
					</div>
				</div>

				{/* Cards de estrutura com ornamentos místicos */}
				<div className="grid gap-6 md:grid-cols-2">
					{/* Card 1 - Cartas Numeradas */}
					<div className="group relative overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-violet-900/20 p-6 hover:border-indigo-400/40 transition-all duration-500">
						{/* Brilho no hover */}
						<div className="absolute inset-0 bg-gradient-to-br from-indigo-400/0 via-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<div className="relative space-y-4">
							{/* Header com número místico */}
							<div className="flex items-center gap-3">
								<div className="flex items-center justify-center size-10 rounded-lg bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-indigo-500/30">
									<span className="text-xl font-bold text-indigo-300">10</span>
								</div>
								<h4 className="text-lg font-bold text-indigo-200">
									Cartas Numeradas
								</h4>
							</div>

							{/* Descrição com ícone */}
							<div className="flex gap-3">
								<Icon icon="lucide:infinity" className="size-5 text-indigo-400/60 flex-shrink-0 mt-0.5" />
								<p className="text-sm text-indigo-200/80 leading-relaxed">
									<span className="font-semibold text-indigo-300">Ás até 10</span> — A jornada
									numérica da manifestação. Cada número representa um estágio evolutivo
									da energia do naipe, desde o potencial puro (Ás) até a completude (10).
								</p>
							</div>
						</div>
					</div>

					{/* Card 2 - Cartas da Corte */}
					<div className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-violet-900/20 p-6 hover:border-purple-400/40 transition-all duration-500">
						{/* Brilho no hover */}
						<div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 via-indigo-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<div className="relative space-y-4">
							{/* Header com número místico */}
							<div className="flex items-center gap-3">
								<div className="flex items-center justify-center size-10 rounded-lg bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border border-purple-500/30">
									<span className="text-xl font-bold text-purple-300">4</span>
								</div>
								<h4 className="text-lg font-bold text-purple-200">
									Cartas da Corte
								</h4>
							</div>

							{/* Descrição com ícone */}
							<div className="flex gap-3">
								<Icon icon="lucide:crown" className="size-5 text-purple-400/60 flex-shrink-0 mt-0.5" />
								<p className="text-sm text-purple-200/80 leading-relaxed">
									<span className="font-semibold text-purple-300">Valete, Cavaleiro, Rainha, Rei</span> — As
									figuras arquetípicas. Representam personalidades, aspectos internos
									ou pessoas reais que encarnam a essência do elemento em diferentes
									níveis de maturidade.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Conclusão mística com divider */}
				<div className="space-y-4 pt-4 border-t border-indigo-500/20">
					{/* Divider ornamental */}
					<div className="flex items-center gap-4">
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
						<Icon icon="lucide:sparkles" className="size-4 text-indigo-400/50" />
						<div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
					</div>

					{/* Texto de conclusão */}
					<p className="text-center text-sm text-indigo-200/70 leading-relaxed italic">
						A união das <span className="font-semibold text-indigo-300">56 cartas</span>{' '}
						(4 naipes × 14 cartas) forma os Arcanos Menores — uma tapeçaria sagrada
						que desvenda os mistérios práticos da jornada humana, revelando padrões
						cósmicos nas situações cotidianas.
					</p>

					{/* Símbolos finais */}
					<div className="flex justify-center gap-6 pt-2">
						<Icon icon="lucide:star" className="size-3 text-indigo-400/40 animate-pulse [animation-duration:2s]" />
						<Icon icon="lucide:sparkles" className="size-3 text-purple-400/40 animate-pulse [animation-duration:2s] [animation-delay:0.5s]" />
						<Icon icon="lucide:star" className="size-3 text-violet-400/40 animate-pulse [animation-duration:2s] [animation-delay:1s]" />
					</div>
				</div>
			</div>
		</div>
	)
}
