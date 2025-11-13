'use client'

import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

/**
 * Tiragens Hero Section - Atmosfera Bruxa Moderna
 *
 * Hero imersivo com estética de bruxaria moderna:
 * - Smoke/névoa effects etéreos
 * - Cristais flutuantes com geometric shapes
 * - Velas místicas com chamas animadas
 * - Fases da lua em destaque
 * - Third eye e símbolos ocultos
 * - Neon glow effects dramáticos
 * - Dark atmospheric colors
 * - Typography dramática com serifs
 *
 * Inspirado em: Modern Witch Tarot, Dark Mansion Tarot, Ethereal Visions
 */
export function TiragensHeroSection() {
	const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string; size: number }>>([])
	const [crystals, setCrystals] = useState<Array<{ left: string; top: string; delay: string; rotation: number }>>([])
	const [candles, setCandles] = useState<Array<{ left: string; bottom: string; delay: string }>>([])

	useEffect(() => {
		// Partículas etéreas (mais sutis, como poeira estelar)
		setParticles(
			Array.from({ length: 50 }).map(() => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				delay: `${Math.random() * 8}s`,
				duration: `${15 + Math.random() * 20}s`,
				size: Math.random() * 3 + 1,
			}))
		)

		// Cristais flutuantes (geometric shapes)
		setCrystals(
			Array.from({ length: 8 }).map(() => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				delay: `${Math.random() * 5}s`,
				rotation: Math.random() * 360,
			}))
		)

		// Velas místicas na base
		setCandles(
			Array.from({ length: 5 }).map(() => ({
				left: `${15 + Math.random() * 70}%`,
				bottom: `${Math.random() * 20}%`,
				delay: `${Math.random() * 3}s`,
			}))
		)
	}, [])

	return (
		<div className="relative overflow-hidden rounded-3xl border-4 border-black/40 bg-black shadow-[0_0_60px_rgba(139,92,246,0.3),inset_0_0_80px_rgba(0,0,0,0.8)] p-20 mb-16">
			{/* ═══════════════════════════════════════════════════════
			    SMOKE & NÉVOA - Atmosfera Etérea
			    ═══════════════════════════════════════════════════════ */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{/* Smoke effect base - múltiplas camadas */}
				<div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 via-black/60 to-black/80" />

				{/* Névoa 1 - Movement slow */}
				<div
					className="absolute inset-0 opacity-30"
					style={{
						background: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
						animation: 'smoke1 20s ease-in-out infinite',
					}}
				/>

				{/* Névoa 2 - Movement reversed */}
				<div
					className="absolute inset-0 opacity-20"
					style={{
						background: 'radial-gradient(circle at 80% 60%, rgba(168, 85, 247, 0.2) 0%, transparent 60%)',
						animation: 'smoke2 25s ease-in-out infinite reverse',
					}}
				/>

				{/* Névoa 3 - Top layer */}
				<div
					className="absolute inset-0 opacity-25"
					style={{
						background: 'radial-gradient(circle at 50% 30%, rgba(124, 58, 237, 0.18) 0%, transparent 70%)',
						animation: 'smoke3 30s ease-in-out infinite',
					}}
				/>

				{/* Vignette escuro */}
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

				{/* ═══ PARTÍCULAS ETÉREAS (Poeira Estelar) ═══ */}
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
							boxShadow: `0 0 ${particle.size * 2}px rgba(168, 85, 247, 0.6)`,
						}}
					/>
				))}

				{/* ═══ CRISTAIS FLUTUANTES (Geometric) ═══ */}
				{crystals.map((crystal, i) => (
					<div
						key={`crystal-${i}`}
						className="absolute animate-float"
						style={{
							left: crystal.left,
							top: crystal.top,
							animationDelay: crystal.delay,
							animationDuration: '20s',
						}}
					>
						{/* Cristal com glow neon */}
						<div
							className="relative w-6 h-8"
							style={{
								transform: `rotate(${crystal.rotation}deg)`,
							}}
						>
							<div className="absolute inset-0 bg-gradient-to-b from-violet-400/30 via-purple-500/40 to-violet-600/30 clip-crystal blur-sm" />
							<div className="absolute inset-0 bg-gradient-to-b from-violet-300/60 via-purple-400/70 to-violet-500/60 clip-crystal"
								style={{
									boxShadow: '0 0 20px rgba(168, 85, 247, 0.8), inset 0 2px 4px rgba(255,255,255,0.3)',
								}}
							/>
						</div>
					</div>
				))}

				{/* ═══ VELAS MÍSTICAS COM CHAMAS ═══ */}
				{candles.map((candle, i) => (
					<div
						key={`candle-${i}`}
						className="absolute flex flex-col items-center"
						style={{
							left: candle.left,
							bottom: candle.bottom,
						}}
					>
						{/* Chama animada */}
						<div className="relative w-3 h-6 mb-1">
							<div
								className="absolute inset-0 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-sm opacity-90"
								style={{
									animationName: 'flame',
									animationDuration: `${2 + Math.random()}s`,
									animationTimingFunction: 'ease-in-out',
									animationIterationCount: 'infinite',
									animationDelay: candle.delay,
								}}
							/>
							<div
								className="absolute inset-0 bg-gradient-to-t from-orange-400 via-yellow-300 to-white rounded-full opacity-80"
								style={{
									animationName: 'flame',
									animationDuration: `${2 + Math.random()}s`,
									animationTimingFunction: 'ease-in-out',
									animationIterationCount: 'infinite',
									animationDelay: candle.delay,
								}}
							/>
							{/* Glow da chama */}
							<div
								className="absolute inset-0 bg-yellow-300/40 rounded-full blur-xl scale-150"
								style={{
									animationName: 'flameGlow',
									animationDuration: `${3 + Math.random()}s`,
									animationTimingFunction: 'ease-in-out',
									animationIterationCount: 'infinite',
									animationDelay: candle.delay,
								}}
							/>
						</div>
						{/* Vela */}
						<div className="w-2 h-12 bg-gradient-to-b from-purple-900 via-purple-950 to-black/90 rounded-sm shadow-lg" />
					</div>
				))}

				{/* ═══ FASES DA LUA (Proeminente) ═══ */}
				<div className="absolute top-8 right-12 flex items-center gap-4">
					{/* Lua crescente */}
					<div className="relative w-10 h-10">
						<Icon icon="game-icons:crescent-moon" className="size-10 text-violet-300/40 absolute animate-pulse [animation-duration:4s]" />
						<Icon icon="game-icons:crescent-moon" className="size-10 text-violet-200/60 absolute blur-md animate-pulse [animation-duration:4s]"
							style={{ filter: 'drop-shadow(0 0 10px rgba(196, 181, 253, 0.8))' }}
						/>
					</div>
					{/* Lua cheia */}
					<div className="relative w-12 h-12">
						<div className="absolute inset-0 bg-violet-300/20 rounded-full blur-xl animate-pulse [animation-duration:3s]" />
						<div className="absolute inset-0 bg-gradient-to-br from-violet-200/60 via-purple-300/50 to-violet-400/40 rounded-full"
							style={{ boxShadow: '0 0 30px rgba(196, 181, 253, 0.9), inset 0 2px 8px rgba(255,255,255,0.4)' }}
						/>
					</div>
					{/* Lua minguante */}
					<div className="relative w-10 h-10">
						<Icon icon="game-icons:crescent-moon" className="size-10 text-violet-300/40 absolute animate-pulse [animation-duration:4s] scale-x-[-1]" />
						<Icon icon="game-icons:crescent-moon" className="size-10 text-violet-200/60 absolute blur-md animate-pulse [animation-duration:4s] scale-x-[-1]"
							style={{ filter: 'drop-shadow(0 0 10px rgba(196, 181, 253, 0.8))' }}
						/>
					</div>
				</div>

				{/* ═══ THIRD EYE (Oculto) ═══ */}
				<div className="absolute top-1/4 left-12 opacity-[0.08]">
					<Icon icon="mdi:eye" className="size-32 text-violet-400 animate-pulse [animation-duration:6s]" />
				</div>

				{/* ═══ MÃOS MÍSTICAS ═══ */}
				<div className="absolute bottom-1/4 right-16 opacity-[0.08]">
					<Icon icon="mdi:hand-heart" className="size-28 text-purple-400 animate-pulse [animation-duration:7s]" />
				</div>

				{/* ═══ PENTAGRAMA ═══ */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
					<Icon icon="game-icons:pentagram" className="size-[500px] text-violet-500 animate-spin-slow [animation-duration:180s]" />
				</div>
			</div>

			{/* ═══════════════════════════════════════════════════════
			    CONTEÚDO CENTRAL - Typography Dramática
			    ═══════════════════════════════════════════════════════ */}
			<div className="relative z-10 text-center space-y-10 max-w-5xl mx-auto">
				{/* Ornamento superior com símbolos */}
				<div className="flex items-center justify-center gap-6 animate-in fade-in duration-1500">
					<Icon icon="game-icons:crescent-moon" className="size-8 text-violet-400/80"
						style={{ filter: 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.9))' }}
					/>
					<div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
						style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.6)' }}
					/>
					<Icon icon="game-icons:crystal-ball" className="size-7 text-purple-400/80"
						style={{ filter: 'drop-shadow(0 0 8px rgba(192, 132, 252, 0.9))' }}
					/>
					<div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-purple-500/60 to-transparent"
						style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)' }}
					/>
					<Icon icon="game-icons:north-star" className="size-8 text-violet-400/80"
						style={{ filter: 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.9))' }}
					/>
				</div>

				{/* Título - Typography Dramática com Serifs */}
				<div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-1500 delay-200">
					<h1 className="text-7xl md:text-8xl font-serif font-bold tracking-wider"
						style={{
							background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 20%, #d8b4fe 40%, #c084fc 60%, #a855f7 80%, #9333ea 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))',
							textShadow: '0 0 80px rgba(168, 85, 247, 0.4)',
						}}
					>
						Tiragens Sagradas
					</h1>

					{/* Subtítulo místico */}
					<p className="text-2xl font-light tracking-[0.3em] uppercase text-violet-300/90"
						style={{
							textShadow: '0 0 20px rgba(196, 181, 253, 0.8), 0 0 40px rgba(167, 139, 250, 0.4)',
						}}
					>
						Portais da Sabedoria Ancestral
					</p>
				</div>

				{/* Descrição mística */}
				<p className="text-xl text-violet-200/80 leading-relaxed max-w-3xl mx-auto font-light animate-in fade-in duration-1500 delay-500"
					style={{
						textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)',
					}}
				>
					Adentre os véus entre mundos. Cada tiragem é um ritual sagrado,
					uma invocação às forças ocultas que dançam nos fios do destino.
					<span className="text-violet-300 font-medium"> As cartas sussurram segredos </span>
					que apenas corações preparados podem ouvir.
				</p>

				{/* Símbolos dos 4 Elementos + Espírito */}
				<div className="flex items-center justify-center gap-12 py-8 animate-in fade-in duration-1500 delay-700">
					{/* Água */}
					<div className="group relative">
						<div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 group-hover:scale-110" />
						<Icon icon="mdi:water" className="size-14 text-blue-400/90 relative z-10 group-hover:scale-110 transition-transform"
							style={{ filter: 'drop-shadow(0 0 12px rgba(96, 165, 250, 0.9))' }}
						/>
					</div>

					{/* Fogo */}
					<div className="group relative">
						<div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 group-hover:scale-110" />
						<Icon icon="mdi:fire" className="size-14 text-red-400/90 relative z-10 group-hover:scale-110 transition-transform"
							style={{ filter: 'drop-shadow(0 0 12px rgba(248, 113, 113, 0.9))' }}
						/>
					</div>

					{/* Terra */}
					<div className="group relative">
						<div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 group-hover:scale-110" />
						<Icon icon="mdi:mountain" className="size-14 text-amber-400/90 relative z-10 group-hover:scale-110 transition-transform"
							style={{ filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.9))' }}
						/>
					</div>

					{/* Ar */}
					<div className="group relative">
						<div className="absolute inset-0 bg-slate-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 group-hover:scale-110" />
						<Icon icon="mdi:weather-windy" className="size-14 text-slate-300/90 relative z-10 group-hover:scale-110 transition-transform"
							style={{ filter: 'drop-shadow(0 0 12px rgba(203, 213, 225, 0.9))' }}
						/>
					</div>

					{/* Espírito */}
					<div className="group relative">
						<div className="absolute inset-0 bg-violet-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 group-hover:scale-110" />
						<Icon icon="game-icons:magic-swirl" className="size-14 text-violet-300/90 relative z-10 group-hover:scale-110 group-hover:rotate-180 transition-all duration-700"
							style={{ filter: 'drop-shadow(0 0 12px rgba(196, 181, 253, 0.9))' }}
						/>
					</div>
				</div>

				{/* Divider místico */}
				<div className="flex items-center justify-center gap-6 pt-8 animate-in fade-in duration-1500 delay-900">
					<div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
						style={{ boxShadow: '0 0 15px rgba(139, 92, 246, 0.7)' }}
					/>
					<Icon icon="game-icons:crystal-shine" className="size-6 text-violet-400/70 animate-pulse [animation-duration:3s]"
						style={{ filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.9))' }}
					/>
					<div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
						style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.7)' }}
					/>
				</div>

				{/* Citação mística */}
				<div className="relative pt-6 max-w-2xl mx-auto animate-in fade-in duration-1500 delay-1100">
					<div className="absolute -left-6 -top-2 text-8xl font-serif leading-none text-violet-500/20"
						style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))' }}
					>
						"
					</div>
					<div className="absolute -right-4 -bottom-4 text-8xl font-serif leading-none rotate-180 text-violet-500/20"
						style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))' }}
					>
						"
					</div>
					<p className="text-lg italic font-light text-violet-200/90 px-10 leading-relaxed"
						style={{
							textShadow: '0 2px 20px rgba(0, 0, 0, 0.9), 0 0 30px rgba(139, 92, 246, 0.3)',
						}}
					>
						Nas sombras da lua, onde o véu é fino, as cartas revelam o que o coração já sabe
						mas os olhos ainda não viram. Cada tiragem é um pacto com o desconhecido.
					</p>
				</div>
			</div>

			{/* Animations CSS inline para smoke */}
			<style jsx>{`
				@keyframes smoke1 {
					0%, 100% { transform: translate(0, 0) scale(1); }
					33% { transform: translate(30px, -20px) scale(1.1); }
					66% { transform: translate(-20px, 15px) scale(0.95); }
				}
				@keyframes smoke2 {
					0%, 100% { transform: translate(0, 0) scale(1); }
					33% { transform: translate(-40px, 25px) scale(1.15); }
					66% { transform: translate(25px, -15px) scale(0.9); }
				}
				@keyframes smoke3 {
					0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
					50% { transform: translate(15px, -30px) scale(1.2) rotate(5deg); }
				}
				@keyframes flame {
					0%, 100% { transform: scaleY(1) scaleX(1); }
					50% { transform: scaleY(1.2) scaleX(0.9); }
				}
				@keyframes flameGlow {
					0%, 100% { opacity: 0.3; }
					50% { opacity: 0.6; }
				}
			`}</style>
		</div>
	)
}
