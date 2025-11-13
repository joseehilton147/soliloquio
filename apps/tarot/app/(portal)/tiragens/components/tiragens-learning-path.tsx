'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

/**
 * Tiragens Learning Path - Jornada de Aprendizado
 *
 * Seção educativa que guia o usuário através da progressão natural
 * de aprendizado do tarot, mostrando as 3 tiragens essenciais como
 * degraus de evolução espiritual e técnica.
 *
 * Visual místico-educativo com:
 * - Caminho iluminado progressivo (Aprendiz → Companheiro → Mestre)
 * - Símbolos ciganos representando cada nível
 * - Partículas de sabedoria orbitando
 * - Referência ao livro guia
 */
export function TiragensLearningPath() {
	const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string; size: number }>>([])

	useEffect(() => {
		// Partículas de sabedoria estelar
		setParticles(
			Array.from({ length: 30 }).map(() => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				delay: `${Math.random() * 6}s`,
				duration: `${12 + Math.random() * 15}s`,
				size: Math.random() * 2.5 + 0.5,
			}))
		)
	}, [])

	const learningSteps = [
		{
			level: 1,
			title: 'Sim ou Não',
			subtitle: 'O Primeiro Passo',
			description: 'Comece com clareza. Uma carta, uma pergunta, uma resposta direta.',
			element: 'Ar',
			symbol: 'lucide:target',
			color: 'slate',
			href: '/tiragens/sim-ou-nao',
			cards: 1,
		},
		{
			level: 2,
			title: 'Conselho do Universo',
			subtitle: 'O Caminho Intermediário',
			description: 'Três cartas revelam camadas: foco, bloqueio e sabedoria central.',
			element: 'Água',
			symbol: 'game-icons:crescent-moon',
			color: 'blue',
			href: '/tiragens/conselho-do-universo',
			cards: 3,
		},
		{
			level: 3,
			title: 'A Cruz Celta',
			subtitle: 'O Portal Supremo',
			description: 'Dez cartas tecem passado, presente, futuro em sabedoria completa.',
			element: 'Espírito',
			symbol: 'game-icons:spell-book',
			color: 'purple',
			href: '/tiragens/cruz-celta',
			cards: 10,
		},
	]

	const getColorClasses = (color: string) => {
		const colors: Record<string, { border: string; bg: string; text: string; shadow: string; glow: string }> = {
			slate: {
				border: 'border-slate-500/30 hover:border-slate-400/60',
				bg: 'from-slate-950/40 to-slate-900/20',
				text: 'text-slate-300',
				shadow: 'shadow-[0_0_40px_rgba(148,163,184,0.3)]',
				glow: 'rgba(148, 163, 184, 0.4)',
			},
			blue: {
				border: 'border-blue-500/30 hover:border-blue-400/60',
				bg: 'from-blue-950/40 to-blue-900/20',
				text: 'text-blue-300',
				shadow: 'shadow-[0_0_40px_rgba(59,130,246,0.3)]',
				glow: 'rgba(59, 130, 246, 0.4)',
			},
			purple: {
				border: 'border-purple-500/30 hover:border-purple-400/60',
				bg: 'from-purple-950/40 to-purple-900/20',
				text: 'text-purple-300',
				shadow: 'shadow-[0_0_40px_rgba(168,85,247,0.3)]',
				glow: 'rgba(168, 85, 247, 0.4)',
			},
		}
		return colors[color] || colors.slate
	}

	return (
		<div className="relative max-w-7xl mx-auto">
			{/* Background místico */}
			<div className="absolute inset-0 -inset-y-24 pointer-events-none overflow-hidden rounded-3xl">
				<div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/10 to-black" />

				{/* Partículas de sabedoria */}
				{particles.map((particle, i) => (
					<div
						key={`particle-${i}`}
						className="absolute rounded-full bg-violet-400/40 animate-float blur-[1px]"
						style={{
							left: particle.left,
							top: particle.top,
							width: `${particle.size}px`,
							height: `${particle.size}px`,
							animationDelay: particle.delay,
							animationDuration: particle.duration,
							boxShadow: `0 0 ${particle.size * 2}px rgba(196, 181, 253, 0.4)`,
						}}
					/>
				))}

				{/* Caminho de luz conectando as etapas */}
				<div
					className="absolute top-1/2 left-1/4 right-1/4 h-[2px] -translate-y-1/2"
					style={{
						background: 'linear-gradient(90deg, rgba(148,163,184,0.3) 0%, rgba(59,130,246,0.4) 50%, rgba(168,85,247,0.5) 100%)',
						boxShadow: '0 0 20px rgba(196, 181, 253, 0.4)',
					}}
				/>
			</div>

			<div className="relative space-y-16 py-16">
				{/* Header */}
				<div className="text-center space-y-6 max-w-3xl mx-auto">
					{/* Ornamento superior */}
					<div className="flex items-center justify-center gap-4">
						<div className="h-[2px] w-24 bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
						<Icon
							icon="game-icons:spell-book"
							className="size-8 text-violet-400/60 animate-pulse animation-duration-[3s]"
							style={{ filter: 'drop-shadow(0 0 12px rgba(196, 181, 253, 0.6))' }}
						/>
						<div className="h-[2px] w-24 bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
					</div>

					<div className="space-y-4">
						<h2
							className="text-5xl md:text-6xl font-serif font-bold tracking-wide"
							style={{
								background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 30%, #c084fc 70%, #a855f7 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.6))',
								textShadow: '0 0 60px rgba(168, 85, 247, 0.3)',
							}}
						>
							Sua Jornada de Aprendizado
						</h2>

						<p className="text-lg text-violet-200/70 leading-relaxed font-light px-8">
							O tarot não se aprende em um dia - é uma jornada mística de{' '}
							<span className="text-violet-300 font-medium">progressão gradual</span>. Como nos mistérios
							antigos, cada nível revela sabedoria que prepara para o próximo.
						</p>
					</div>

					{/* Citação do livro */}
					<div className="relative pt-6 max-w-2xl mx-auto">
						<div
							className="absolute -left-2 -top-1 text-6xl font-serif leading-none text-violet-500/15"
							style={{ filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.3))' }}
						>
							"
						</div>
						<div
							className="absolute -right-1 -bottom-2 text-6xl font-serif leading-none rotate-180 text-violet-500/15"
							style={{ filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.3))' }}
						>
							"
						</div>
						<p className="text-sm italic text-violet-300/60 px-6 leading-relaxed">
							Baseado em <span className="font-medium text-violet-300/80">"Guia para Leitura Intuitiva"</span> por Stefani Caponi
						</p>
					</div>
				</div>

				{/* Os 3 níveis de aprendizado */}
				<div className="grid md:grid-cols-3 gap-8 px-4">
					{learningSteps.map((step, index) => {
						const colors = getColorClasses(step.color)
						return (
							<div key={step.level} className="relative group" style={{ animationDelay: `${index * 200}ms` }}>
								{/* Glow ao hover */}
								<div
									className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl blur-2xl"
									style={{
										background: `radial-gradient(ellipse at center, ${colors.glow} 0%, transparent 70%)`,
									}}
								/>

								<Link
									href={step.href}
									className={`relative block h-full rounded-2xl border-2 ${colors.border} bg-gradient-to-br ${colors.bg} backdrop-blur-sm transition-all duration-500 group-hover:scale-105 ${colors.shadow} overflow-hidden`}
								>
									{/* Badge de nível */}
									<div className="absolute -top-3 -right-3 size-16 rounded-full bg-gradient-to-br from-black via-violet-950 to-black border-2 border-violet-500/40 flex items-center justify-center shadow-lg">
										<span className="text-2xl font-bold text-violet-300">{step.level}</span>
									</div>

									<div className="p-8 space-y-6">
										{/* Símbolo */}
										<div className="relative inline-flex">
											<div
												className="absolute inset-0 -m-4 rounded-full blur-xl animate-pulse animation-duration-[3s] opacity-60"
												style={{
													background: `radial-gradient(circle, ${colors.glow} 0%, transparent 60%)`,
												}}
											/>
											<Icon
												icon={step.symbol}
												className={`relative size-16 ${colors.text} group-hover:scale-110 transition-transform duration-500`}
												style={{ filter: `drop-shadow(0 0 15px ${colors.glow})` }}
											/>
										</div>

										{/* Informações do nível */}
										<div className="space-y-3">
											<div>
												<h3 className={`text-2xl font-bold ${colors.text} mb-1`}>{step.title}</h3>
												<p className="text-sm text-violet-400/60 font-medium uppercase tracking-wider">
													{step.subtitle}
												</p>
											</div>

											<p className="text-sm text-violet-200/70 leading-relaxed">
												{step.description}
											</p>
										</div>

										{/* Metadados */}
										<div className="flex items-center justify-between pt-4 border-t border-violet-500/10">
											<div className="flex items-center gap-2 text-xs text-violet-400/60">
												<Icon icon="game-icons:card-random" className="size-4" />
												<span>{step.cards} {step.cards === 1 ? 'carta' : 'cartas'}</span>
											</div>
											<div className="flex items-center gap-2 text-xs text-violet-400/60">
												<Icon icon="lucide:sparkles" className="size-4" />
												<span>Elemento {step.element}</span>
											</div>
										</div>

										{/* Call to action */}
										<div className="flex items-center gap-2 text-sm text-violet-300 group-hover:text-violet-200 transition-colors pt-2">
											<span>Explorar tiragem</span>
											<Icon
												icon="lucide:arrow-right"
												className="size-4 group-hover:translate-x-1 transition-transform"
											/>
										</div>
									</div>
								</Link>
							</div>
						)
					})}
				</div>

				{/* Orientação de estudo */}
				<div className="max-w-3xl mx-auto text-center space-y-6 pt-8">
					<div className="flex items-center justify-center gap-4">
						<div className="h-[1px] w-32 bg-linear-to-r from-transparent via-violet-500/20 to-transparent" />
						<Icon
							icon="game-icons:crystal-ball"
							className="size-6 text-violet-400/50"
							style={{ filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.6))' }}
						/>
						<div className="h-[1px] w-32 bg-linear-to-r from-transparent via-violet-500/20 to-transparent" />
					</div>

					<div className="space-y-4 px-8">
						<h3 className="text-2xl font-serif font-bold text-violet-300">
							Como Iniciar Sua Jornada
						</h3>

						<div className="grid md:grid-cols-3 gap-6 text-left">
							<div className="space-y-2">
								<div className="flex items-start gap-3">
									<Icon icon="lucide:book-open" className="size-5 text-violet-400/60 mt-0.5 shrink-0" />
									<div>
										<p className="text-sm font-medium text-violet-300/90">Estude os Arcanos</p>
										<p className="text-xs text-violet-200/60">Conheça as 78 cartas profundamente</p>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex items-start gap-3">
									<Icon icon="lucide:calendar" className="size-5 text-violet-400/60 mt-0.5 shrink-0" />
									<div>
										<p className="text-sm font-medium text-violet-300/90">Pratique Diariamente</p>
										<p className="text-xs text-violet-200/60">Uma carta por dia desenvolve intuição</p>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex items-start gap-3">
									<Icon icon="lucide:compass" className="size-5 text-violet-400/60 mt-0.5 shrink-0" />
									<div>
										<p className="text-sm font-medium text-violet-300/90">Progrida Gradualmente</p>
										<p className="text-xs text-violet-200/60">Respeite os degraus do aprendizado</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
