'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

/**
 * Tiragens Custom CTA - Atmosfera Bruxa
 *
 * Call-to-action místico e atmosférico para criar tiragens personalizadas.
 * Visual de ritual mágico em progresso com:
 * - Círculo mágico animado
 * - Velas místicas pulsantes
 * - Cristais orbitando
 * - Smoke effects etéreos
 * - Typography dramática
 * - Neon glow effects
 */
export function TiragensCustomCTA() {
	const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string; size: number }>>([])
	const [orbitingSymbols, setOrbitingSymbols] = useState<Array<{ angle: number; delay: string }>>([])

	useEffect(() => {
		// Partículas de poeira estelar
		setParticles(
			Array.from({ length: 40 }).map(() => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				delay: `${Math.random() * 8}s`,
				duration: `${15 + Math.random() * 20}s`,
				size: Math.random() * 3 + 0.5,
			}))
		)

		// Símbolos orbitando o centro
		setOrbitingSymbols(
			Array.from({ length: 6 }).map((_, i) => ({
				angle: (i * 360) / 6,
				delay: `${i * 0.5}s`,
			}))
		)
	}, [])

	return (
		<div className="relative max-w-6xl mx-auto group">
			{/* Outer glow - Aura do ritual */}
			<div
				className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-full blur-3xl"
				style={{
					background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
				}}
			/>

			<Link
				href="/tiragens/personalizada/nova"
				className="block relative overflow-hidden rounded-3xl border-4 border-dashed border-violet-500/30 bg-black transition-all duration-700 hover:border-violet-500/60 hover:scale-[1.01] p-16 shadow-[0_0_80px_rgba(139,92,246,0.3),inset_0_0_80px_rgba(0,0,0,0.9)] hover:shadow-[0_0_120px_rgba(139,92,246,0.5)]"
			>
				{/* ═══ BACKGROUND MÍSTICO ═══ */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden">
					{/* Base escura */}
					<div className="absolute inset-0 bg-gradient-to-br from-black via-violet-950/20 to-black" />

					{/* Smoke effects */}
					<div
						className="absolute inset-0 opacity-25"
						style={{
							background: 'radial-gradient(circle at 30% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)',
							animation: 'smokeFloat1 20s ease-in-out infinite',
						}}
					/>
					<div
						className="absolute inset-0 opacity-20"
						style={{
							background: 'radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
							animation: 'smokeFloat2 25s ease-in-out infinite reverse',
						}}
					/>

					{/* Vignette */}
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

					{/* ═══ PARTÍCULAS ETÉREAS ═══ */}
					{particles.map((particle, i) => (
						<div
							key={`particle-${i}`}
							className="absolute rounded-full bg-violet-400/60 animate-float blur-[1px]"
							style={{
								left: particle.left,
								top: particle.top,
								width: `${particle.size}px`,
								height: `${particle.size}px`,
								animationDelay: particle.delay,
								animationDuration: particle.duration,
								boxShadow: `0 0 ${particle.size * 3}px rgba(168, 85, 247, 0.6)`,
							}}
						/>
					))}

					{/* ═══ CÍRCULO MÁGICO ANIMADO ═══ */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						{/* Círculo externo */}
						<div
							className="absolute size-[500px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border-2 border-violet-500/10"
							style={{
								animation: 'rotateCircle 60s linear infinite',
								boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), inset 0 0 30px rgba(139, 92, 246, 0.1)',
							}}
						/>

						{/* Círculo médio */}
						<div
							className="absolute size-[380px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border-2 border-violet-500/15"
							style={{
								animation: 'rotateCircle 45s linear infinite reverse',
								boxShadow: '0 0 25px rgba(168, 85, 247, 0.4), inset 0 0 25px rgba(168, 85, 247, 0.1)',
							}}
						/>

						{/* Círculo interno */}
						<div
							className="absolute size-[260px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border-2 border-violet-500/20"
							style={{
								animation: 'rotateCircle 30s linear infinite',
								boxShadow: '0 0 20px rgba(192, 132, 252, 0.5), inset 0 0 20px rgba(192, 132, 252, 0.2)',
							}}
						/>

						{/* Pentagrama central girando */}
						<div
							className="absolute size-[140px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
							style={{
								animation: 'rotateCircle 80s linear infinite',
							}}
						>
							<Icon icon="game-icons:pentagram" className="size-full text-violet-500/20"
								style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))' }}
							/>
						</div>
					</div>

					{/* ═══ SÍMBOLOS ORBITANDO ═══ */}
					{orbitingSymbols.map((symbol, i) => {
						const icons = [
							'game-icons:crystal-ball',
							'game-icons:crescent-moon',
							'game-icons:north-star',
							'game-icons:skeleton-key',
							'game-icons:crystal-shine',
							'game-icons:magic-swirl',
						]

						return (
							<div
								key={`orbit-${i}`}
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
								style={{
									animation: 'rotateCircle 40s linear infinite',
									animationDelay: symbol.delay,
								}}
							>
								<div
									style={{
										transform: `rotate(${symbol.angle}deg) translateX(200px) rotate(-${symbol.angle}deg)`,
									}}
								>
									<Icon icon={icons[i] || 'game-icons:crystal-ball'}
										className="size-8 text-violet-400/30 group-hover:text-violet-400/50 transition-colors duration-500"
										style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))' }}
									/>
								</div>
							</div>
						)
					})}

					{/* ═══ VELAS NAS QUATRO DIREÇÕES ═══ */}
					{/* Norte */}
					<div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
						<div className="relative w-3 h-6 mb-1">
							<div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-sm opacity-90 animate-pulse [animation-duration:2s]" />
							<div className="absolute inset-0 bg-gradient-to-t from-orange-400 via-yellow-300 to-white rounded-full opacity-80" />
							<div className="absolute inset-0 bg-yellow-300/40 rounded-full blur-xl scale-150 animate-pulse [animation-duration:3s]" />
						</div>
						<div className="w-2 h-10 bg-gradient-to-b from-violet-900 via-violet-950 to-black rounded-sm" />
					</div>

					{/* Sul */}
					<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center">
						<div className="w-2 h-10 bg-gradient-to-t from-violet-900 via-violet-950 to-black rounded-sm" />
						<div className="relative w-3 h-6 mt-1">
							<div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-sm opacity-90 animate-pulse [animation-duration:2.3s]" />
							<div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-yellow-300 to-white rounded-full opacity-80" />
						</div>
					</div>

					{/* Leste */}
					<div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center">
						<div className="w-10 h-2 bg-gradient-to-r from-violet-900 via-violet-950 to-black rounded-sm" />
						<div className="relative w-6 h-3 ml-1">
							<div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-sm opacity-90 animate-pulse [animation-duration:2.5s]" />
						</div>
					</div>

					{/* Oeste */}
					<div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center flex-row-reverse">
						<div className="w-10 h-2 bg-gradient-to-l from-violet-900 via-violet-950 to-black rounded-sm" />
						<div className="relative w-6 h-3 mr-1">
							<div className="absolute inset-0 bg-gradient-to-l from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-sm opacity-90 animate-pulse [animation-duration:2.7s]" />
						</div>
					</div>
				</div>

				{/* ═══ CONTEÚDO CENTRAL ═══ */}
				<div className="relative z-10 text-center space-y-10">
					{/* Ícone central místico */}
					<div className="relative inline-flex items-center justify-center">
						{/* Glow pulsante */}
						<div
							className="absolute inset-0 -m-12 rounded-full blur-3xl animate-pulse [animation-duration:4s]"
							style={{
								background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
							}}
						/>

						{/* Container do ícone */}
						<div
							className="relative size-32 rounded-full border-4 border-violet-500/30 flex items-center justify-center overflow-hidden group-hover:border-violet-500/60 group-hover:scale-110 transition-all duration-700"
							style={{
								boxShadow: '0 0 40px rgba(168, 85, 247, 0.5), 0 0 80px rgba(139, 92, 246, 0.3), inset 0 0 40px rgba(168, 85, 247, 0.1), inset 0 4px 12px rgba(255,255,255,0.1)',
								background: 'radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.98) 100%)',
							}}
						>
							<Icon icon="lucide:wand-sparkles"
								className="size-16 text-violet-300 group-hover:rotate-12 group-hover:text-violet-200 transition-all duration-700"
								style={{
									filter: 'drop-shadow(0 0 20px rgba(196, 181, 253, 0.9))',
								}}
							/>

							{/* Anel de energia rotativo */}
							<div
								className="absolute inset-0 border-2 border-transparent border-t-violet-500/40 border-r-violet-500/20 rounded-full"
								style={{
									animation: 'rotateCircle 3s linear infinite',
								}}
							/>
						</div>
					</div>

					{/* Ornamento superior */}
					<div className="flex items-center justify-center gap-6">
						<div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
							style={{ boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)' }}
						/>
						<Icon icon="game-icons:crystal-ball" className="size-6 text-violet-400/60 animate-pulse [animation-duration:3s]"
							style={{ filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.8))' }}
						/>
						<div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
							style={{ boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)' }}
						/>
					</div>

					{/* Título - Typography Dramática */}
					<div className="space-y-4">
						<h2
							className="text-6xl md:text-7xl font-serif font-bold tracking-wider"
							style={{
								background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 20%, #d8b4fe 40%, #c084fc 60%, #a855f7 80%, #9333ea 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))',
								textShadow: '0 0 80px rgba(168, 85, 247, 0.4)',
							}}
						>
							Crie Sua Própria Tiragem
						</h2>

						<p className="text-xl text-violet-200/80 leading-relaxed max-w-2xl mx-auto font-light"
							style={{
								textShadow: '0 2px 20px rgba(0, 0, 0, 0.9)',
							}}
						>
							Torne-se arquiteto dos mistérios. Desenhe seu próprio ritual sagrado,
							moldando <span className="text-violet-300 font-medium">portais únicos</span> que
							ressoam com sua essência mística interior.
						</p>
					</div>

					{/* Features místicas */}
					<div className="flex flex-wrap items-center justify-center gap-8 py-6">
						<div className="group/feature flex items-center gap-3 text-base text-violet-300/80">
							<Icon icon="game-icons:magic-swirl" className="size-6 group-hover/feature:rotate-180 transition-transform duration-700"
								style={{ filter: 'drop-shadow(0 0 10px rgba(196, 181, 253, 0.6))' }}
							/>
							<span style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
								Rituais Personalizados
							</span>
						</div>

						<div className="group/feature flex items-center gap-3 text-base text-purple-300/80">
							<Icon icon="game-icons:crystal-ball" className="size-6 group-hover/feature:scale-110 transition-transform duration-300"
								style={{ filter: 'drop-shadow(0 0 10px rgba(192, 132, 252, 0.6))' }}
							/>
							<span style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
								Visões Únicas
							</span>
						</div>

						<div className="group/feature flex items-center gap-3 text-base text-violet-300/80">
							<Icon icon="game-icons:spell-book" className="size-6 group-hover/feature:scale-110 transition-transform duration-300"
								style={{ filter: 'drop-shadow(0 0 10px rgba(196, 181, 253, 0.6))' }}
							/>
							<span style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
								Grimório Pessoal
							</span>
						</div>
					</div>

					{/* Divider */}
					<div className="flex items-center justify-center gap-6">
						<div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
							style={{ boxShadow: '0 0 12px rgba(139, 92, 246, 0.5)' }}
						/>
						<Icon icon="game-icons:pentagram" className="size-5 text-violet-400/50"
							style={{
								filter: 'drop-shadow(0 0 12px rgba(167, 139, 250, 0.8))',
								animation: 'rotateCircle 20s linear infinite',
							}}
						/>
						<div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
							style={{ boxShadow: '0 0 12px rgba(168, 85, 247, 0.5)' }}
						/>
					</div>

					{/* Call to Action */}
					<div className="flex items-center justify-center gap-4 text-violet-300 group-hover:text-violet-200 transition-colors duration-500">
						<span className="text-2xl font-light tracking-wider"
							style={{
								textShadow: '0 0 20px rgba(196, 181, 253, 0.8)',
							}}
						>
							Iniciar Ritual de Criação
						</span>
						<Icon icon="lucide:sparkles"
							className="size-7 group-hover:rotate-90 group-hover:scale-125 transition-all duration-700"
							style={{
								filter: 'drop-shadow(0 0 15px rgba(196, 181, 253, 0.9))',
							}}
						/>
					</div>

					{/* Citação final */}
					<div className="relative pt-4 max-w-xl mx-auto">
						<div className="absolute -left-4 -top-2 text-7xl font-serif leading-none text-violet-500/15"
							style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))' }}
						>
							"
						</div>
						<div className="absolute -right-2 -bottom-4 text-7xl font-serif leading-none rotate-180 text-violet-500/15"
							style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))' }}
						>
							"
						</div>
						<p className="text-sm italic text-violet-200/70 px-8 leading-relaxed font-light"
							style={{
								textShadow: '0 2px 20px rgba(0, 0, 0, 0.9)',
							}}
						>
							Nas mãos do iniciado, cada carta é uma chama. Nas mãos do arquiteto místico,
							cada tiragem é um altar. Erga o seu.
						</p>
					</div>
				</div>

				{/* CSS animations inline */}
				<style jsx>{`
					@keyframes smokeFloat1 {
						0%, 100% { transform: translate(0, 0) scale(1); }
						50% { transform: translate(30px, -20px) scale(1.1); }
					}
					@keyframes smokeFloat2 {
						0%, 100% { transform: translate(0, 0) scale(1); }
						50% { transform: translate(-25px, 15px) scale(1.15); }
					}
					@keyframes rotateCircle {
						from { transform: rotate(0deg); }
						to { transform: rotate(360deg); }
					}
				`}</style>
			</Link>
		</div>
	)
}
