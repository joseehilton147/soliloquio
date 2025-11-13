'use client'

import { Icon } from '@iconify/react'
import type { TarotSpread } from '@workspace/core/tarot'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@workspace/ui/lib/utils'

export interface TiragemCategoryData {
	id: string
	name: string
	subtitle: string
	description: string[]
	quote: string
	icon: string
	decorativeIcon: string
	element: 'water' | 'fire' | 'earth' | 'air' | 'spirit'
	color: 'blue' | 'red' | 'amber' | 'slate' | 'purple'
	spreads: TarotSpread[]
	mysticalSymbol: string
}

interface TiragemCategoryPortalCardProps {
	category: TiragemCategoryData
	reversed?: boolean
}

/**
 * Color classes por elemento
 * Sincronizado com element-colors.ts
 */
const COLOR_CLASSES = {
	blue: {
		border: 'border-blue-400/40',
		neonGlow: '0 0 30px rgba(96, 165, 250, 0.4), 0 0 60px rgba(59, 130, 246, 0.2), inset 0 0 30px rgba(96, 165, 250, 0.1)',
		innerGlow: 'from-blue-500/20 via-cyan-500/10',
		gradient: 'from-blue-400 via-cyan-400 to-blue-500',
		textGlow: '0 0 20px rgba(96, 165, 250, 0.8)',
		smoke: 'rgba(96, 165, 250, 0.15)',
		rgb: '96, 165, 250',
	},
	red: {
		border: 'border-red-400/40',
		neonGlow: '0 0 30px rgba(248, 113, 113, 0.4), 0 0 60px rgba(239, 68, 68, 0.2), inset 0 0 30px rgba(248, 113, 113, 0.1)',
		innerGlow: 'from-red-500/20 via-orange-500/10',
		gradient: 'from-red-400 via-orange-400 to-red-500',
		textGlow: '0 0 20px rgba(248, 113, 113, 0.8)',
		smoke: 'rgba(248, 113, 113, 0.15)',
		rgb: '248, 113, 113',
	},
	amber: {
		border: 'border-amber-400/40',
		neonGlow: '0 0 30px rgba(251, 191, 36, 0.4), 0 0 60px rgba(245, 158, 11, 0.2), inset 0 0 30px rgba(251, 191, 36, 0.1)',
		innerGlow: 'from-amber-500/20 via-yellow-500/10',
		gradient: 'from-amber-400 via-yellow-400 to-amber-500',
		textGlow: '0 0 20px rgba(251, 191, 36, 0.8)',
		smoke: 'rgba(251, 191, 36, 0.15)',
		rgb: '251, 191, 36',
	},
	slate: {
		border: 'border-slate-400/40',
		neonGlow: '0 0 30px rgba(148, 163, 184, 0.4), 0 0 60px rgba(100, 116, 139, 0.2), inset 0 0 30px rgba(148, 163, 184, 0.1)',
		innerGlow: 'from-slate-500/20 via-gray-500/10',
		gradient: 'from-slate-400 via-gray-400 to-slate-500',
		textGlow: '0 0 20px rgba(148, 163, 184, 0.8)',
		smoke: 'rgba(148, 163, 184, 0.15)',
		rgb: '148, 163, 184',
	},
	purple: {
		border: 'border-purple-400/40',
		neonGlow: '0 0 30px rgba(192, 132, 252, 0.4), 0 0 60px rgba(168, 85, 247, 0.2), inset 0 0 30px rgba(192, 132, 252, 0.1)',
		innerGlow: 'from-purple-500/20 via-violet-500/10',
		gradient: 'from-purple-400 via-violet-400 to-purple-500',
		textGlow: '0 0 20px rgba(192, 132, 252, 0.8)',
		smoke: 'rgba(192, 132, 252, 0.15)',
		rgb: '192, 132, 252',
	},
} as const

const ELEMENT_ICONS = {
	water: 'mdi:water',
	fire: 'mdi:fire',
	earth: 'mdi:mountain',
	air: 'mdi:weather-windy',
	spirit: 'game-icons:magic-swirl',
} as const

/**
 * Tiragem Category Portal Card - Estilo Carta de Tarot Real
 *
 * Card que replica o visual de uma carta de tarot física:
 * - Bordas ornamentadas tipo Art Nouveau
 * - Background escuro tipo veludo/pergaminho antigo
 * - Cantos decorados com elementos místicos
 * - Shadows profundas e dramáticas
 * - Inner glow neon nas bordas
 * - Textura sutil de papel antigo
 * - Visual premium/VIP
 */
export function TiragemCategoryPortalCard({ category, reversed = false }: TiragemCategoryPortalCardProps) {
	const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string; size: number }>>([])
	const colors = COLOR_CLASSES[category.color]

	useEffect(() => {
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

	return (
		<div className="group relative max-w-6xl mx-auto">
			{/* Outer glow - efeito de aura */}
			<div
				className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-2xl"
				style={{
					background: `radial-gradient(ellipse at center, ${colors.smoke} 0%, transparent 70%)`,
				}}
			/>

			{/* Card principal - Estilo Carta de Tarot */}
			<div
				className={cn(
					'relative overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-700',
					'shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)]',
					'group-hover:shadow-[0_25px_100px_rgba(0,0,0,0.9)]',
					'group-hover:scale-[1.01]'
				)}
				style={{
					boxShadow: colors.neonGlow,
					border: '3px solid',
					borderImageSource: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)`,
					borderImageSlice: 1,
				}}
			>
				{/* ═══ BORDAS ORNAMENTADAS (Art Nouveau) ═══ */}
				<div className="absolute inset-0 pointer-events-none">
					{/* Borda superior ornamentada */}
					<div className="absolute top-0 left-0 right-0 h-16">
						<div className={cn('absolute inset-0 bg-gradient-to-b to-transparent opacity-30', colors.innerGlow)} />
						{/* Ornamento central superior */}
						<div className="absolute top-2 left-1/2 -translate-x-1/2">
							<Icon icon="game-icons:crystal-shrine" className="size-8 text-white/20" />
						</div>
						{/* Ornamentos laterais superiores */}
						<div className="absolute top-2 left-4">
							<Icon icon="game-icons:flower-emblem" className="size-6 text-white/15 rotate-45" />
						</div>
						<div className="absolute top-2 right-4">
							<Icon icon="game-icons:flower-emblem" className="size-6 text-white/15 -rotate-45" />
						</div>
					</div>

					{/* Borda inferior ornamentada */}
					<div className="absolute bottom-0 left-0 right-0 h-16">
						<div className={cn('absolute inset-0 bg-gradient-to-t to-transparent opacity-30', colors.innerGlow)} />
						{/* Ornamento central inferior */}
						<div className="absolute bottom-2 left-1/2 -translate-x-1/2">
							<Icon icon="game-icons:pentacle" className="size-8 text-white/20" />
						</div>
						{/* Ornamentos laterais inferiores */}
						<div className="absolute bottom-2 left-4">
							<Icon icon="game-icons:rose" className="size-6 text-white/15" />
						</div>
						<div className="absolute bottom-2 right-4">
							<Icon icon="game-icons:rose" className="size-6 text-white/15 scale-x-[-1]" />
						</div>
					</div>

					{/* Bordas laterais com padrão */}
					<div className="absolute left-0 top-0 bottom-0 w-12">
						<div className={cn('absolute inset-0 bg-gradient-to-r to-transparent opacity-20', colors.innerGlow)} />
						<div className="absolute top-1/2 left-2 -translate-y-1/2 flex flex-col gap-6">
							<div className="size-2 rounded-full bg-white/20" />
							<div className="size-1.5 rounded-full bg-white/15" />
							<div className="size-2 rounded-full bg-white/20" />
						</div>
					</div>

					<div className="absolute right-0 top-0 bottom-0 w-12">
						<div className={cn('absolute inset-0 bg-gradient-to-l to-transparent opacity-20', colors.innerGlow)} />
						<div className="absolute top-1/2 right-2 -translate-y-1/2 flex flex-col gap-6">
							<div className="size-2 rounded-full bg-white/20" />
							<div className="size-1.5 rounded-full bg-white/15" />
							<div className="size-2 rounded-full bg-white/20" />
						</div>
					</div>

					{/* Cantos decorados */}
					<div className="absolute top-4 left-4">
						<div className="size-8 border-t-2 border-l-2 border-white/10 rounded-tl-lg" />
					</div>
					<div className="absolute top-4 right-4">
						<div className="size-8 border-t-2 border-r-2 border-white/10 rounded-tr-lg" />
					</div>
					<div className="absolute bottom-4 left-4">
						<div className="size-8 border-b-2 border-l-2 border-white/10 rounded-bl-lg" />
					</div>
					<div className="absolute bottom-4 right-4">
						<div className="size-8 border-b-2 border-r-2 border-white/10 rounded-br-lg" />
					</div>
				</div>

				{/* ═══ BACKGROUND - Veludo/Pergaminho Antigo ═══ */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden">
					{/* Base escura tipo veludo */}
					<div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />

					{/* Textura de papel antigo (sutil) */}
					<div
						className="absolute inset-0 opacity-[0.03]"
						style={{
							backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\' /%3E%3C/svg%3E")',
							backgroundSize: '100px 100px',
						}}
					/>

					{/* Smoke effect */}
					<div
						className="absolute inset-0 opacity-20"
						style={{
							background: `radial-gradient(circle at ${reversed ? '20%' : '80%'} 50%, ${colors.smoke} 0%, transparent 60%)`,
							animation: 'smokeMove 25s ease-in-out infinite',
						}}
					/>

					{/* Vignette */}
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />

					{/* ═══ PARTÍCULAS ETÉREAS ═══ */}
					{particles.map((particle, i) => (
						<div
							key={`particle-${i}`}
							className="absolute rounded-full bg-white/60 animate-float blur-[0.5px]"
							style={{
								left: particle.left,
								top: particle.top,
								width: `${particle.size}px`,
								height: `${particle.size}px`,
								animationDelay: particle.delay,
								animationDuration: particle.duration,
								boxShadow: `0 0 ${particle.size * 3}px rgba(255, 255, 255, 0.4)`,
							}}
						/>
					))}

					{/* Símbolo místico de fundo */}
					<div className={cn('absolute top-1/2 -translate-y-1/2 opacity-[0.03]', reversed ? 'left-12' : 'right-12')}>
						<Icon icon={category.decorativeIcon} className="size-64 text-white" />
					</div>

					{/* Elemento símbolo */}
					<div className={cn('absolute bottom-12 opacity-[0.05]', reversed ? 'right-16' : 'left-16')}>
						<Icon icon={ELEMENT_ICONS[category.element]} className="size-32 text-white" />
					</div>
				</div>

				{/* ═══ CONTEÚDO PRINCIPAL ═══ */}
				<div className="relative z-10 p-12 space-y-8">
					{/* Header com ícone e título */}
					<div className="flex items-start gap-8">
						{/* Ícone místico */}
						<div className="relative flex-shrink-0">
							{/* Glow effect */}
							<div
								className="absolute inset-0 -m-8 rounded-full blur-2xl animate-pulse [animation-duration:4s]"
								style={{
									background: `radial-gradient(circle, ${colors.smoke} 0%, transparent 70%)`,
								}}
							/>
							{/* Container do ícone */}
							<div className="relative size-24 rounded-full border-3 border-white/20 flex items-center justify-center overflow-hidden"
								style={{
									boxShadow: `${colors.neonGlow}, inset 0 2px 10px rgba(255,255,255,0.1)`,
									background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
								}}
							>
								<Icon icon={category.icon}
									className="size-12 text-white/90 group-hover:scale-110 transition-transform duration-500"
									style={{ filter: `drop-shadow(${colors.textGlow})` }}
								/>
							</div>
						</div>

						{/* Título e subtítulo */}
						<div className="flex-1 space-y-3 pt-2">
							<h2
								className={cn('text-5xl font-serif font-bold tracking-wide bg-gradient-to-r bg-clip-text text-transparent', `${colors.gradient}`)}
								style={{
									filter: `drop-shadow(${colors.textGlow}) drop-shadow(0 2px 10px rgba(0,0,0,0.8))`,
								}}
							>
								{category.name}
							</h2>
							<p className="text-base text-white/70 flex items-center gap-3 tracking-wide uppercase text-sm font-light"
								style={{
									textShadow: '0 2px 10px rgba(0,0,0,0.9)',
								}}
							>
								<Icon icon={ELEMENT_ICONS[category.element]} className="size-5" />
								{category.subtitle}
							</p>
						</div>

						{/* Símbolo cigano */}
						<div className="relative">
							<Icon icon={category.mysticalSymbol}
								className="size-16 text-white/20 group-hover:rotate-12 transition-transform duration-700"
								style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }}
							/>
						</div>
					</div>

					{/* Divider místico */}
					<div className="flex items-center gap-4">
						<div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
						<Icon icon="game-icons:crystal-ball" className="size-4 text-white/30" />
						<div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
					</div>

					{/* Descrição */}
					<div className="space-y-4 text-white/70 leading-relaxed font-light"
						style={{
							textShadow: '0 2px 15px rgba(0,0,0,0.9)',
						}}
					>
						{category.description.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>

					{/* Citação mística */}
					<div className="relative py-6">
						<div className="absolute -left-4 -top-2 text-6xl font-serif leading-none text-white/10">"</div>
						<div className="absolute -right-2 -bottom-4 text-6xl font-serif leading-none rotate-180 text-white/10">"</div>
						<p className="text-base italic text-white/60 px-8 leading-relaxed font-light"
							style={{
								textShadow: '0 2px 15px rgba(0,0,0,0.9)',
							}}
						>
							{category.quote}
						</p>
					</div>

					{/* Lista de spreads - FORMATO DE CARTAS DE TAROT REAIS */}
					<div className="space-y-6 pt-6">
						{/* Header chamativo */}
						<div className="relative">
							<div className="flex items-center gap-4">
								<div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-current to-transparent opacity-60"
									style={{
										color: `rgb(${colors.rgb})`,
										boxShadow: `0 0 10px ${colors.smoke}`
									}}
								/>
								<h3 className={cn('text-lg uppercase tracking-[0.3em] font-bold bg-gradient-to-r bg-clip-text text-transparent', colors.gradient)}
									style={{
										filter: `drop-shadow(${colors.textGlow})`,
									}}
								>
									Portais Disponíveis
								</h3>
								<div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30"
									style={{ color: `rgb(${colors.rgb})` }}
								/>
								<Icon icon="game-icons:crystal-ball" className="size-5 text-white/40 animate-pulse [animation-duration:3s]"
									style={{ filter: `drop-shadow(0 0 10px ${colors.smoke})` }}
								/>
							</div>
						</div>

						{/* Grid de cartas - FORMATO VERTICAL TIPO TAROT REAL */}
						<div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
							{category.spreads.map((spread) => (
								<Link
									key={spread.id}
									href={`/tiragens/${spread.slug}`}
									className="group/spread relative overflow-hidden rounded-2xl border-3 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1"
									style={{
										aspectRatio: '2/3',
										borderColor: `rgba(${colors.rgb}, 0.4)`,
										background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(10,10,10,0.95) 50%, rgba(0,0,0,0.9) 100%)',
										boxShadow: `0 12px 48px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.08), inset 0 0 40px rgba(0,0,0,0.6)`,
									}}
								>
									{/* ═══ ORNAMENTOS DOS CANTOS (Art Nouveau) ═══ */}
									<div className="absolute inset-0 pointer-events-none">
										{/* Canto superior esquerdo */}
										<div className="absolute top-3 left-3">
											<div className="size-6 border-t-2 border-l-2 rounded-tl-lg opacity-30"
												style={{ borderColor: `rgba(${colors.rgb}, 0.6)` }}
											/>
										</div>
										{/* Canto superior direito */}
										<div className="absolute top-3 right-3">
											<div className="size-6 border-t-2 border-r-2 rounded-tr-lg opacity-30"
												style={{ borderColor: `rgba(${colors.rgb}, 0.6)` }}
											/>
										</div>
										{/* Canto inferior esquerdo */}
										<div className="absolute bottom-3 left-3">
											<div className="size-6 border-b-2 border-l-2 rounded-bl-lg opacity-30"
												style={{ borderColor: `rgba(${colors.rgb}, 0.6)` }}
											/>
										</div>
										{/* Canto inferior direito */}
										<div className="absolute bottom-3 right-3">
											<div className="size-6 border-b-2 border-r-2 rounded-br-lg opacity-30"
												style={{ borderColor: `rgba(${colors.rgb}, 0.6)` }}
											/>
										</div>
									</div>

									{/* ═══ BACKGROUND GRADIENTES E TEXTURAS ═══ */}
									{/* Glow místico ao hover */}
									<div
										className="absolute inset-0 opacity-0 group-hover/spread:opacity-100 transition-opacity duration-500 rounded-2xl"
										style={{
											background: `radial-gradient(ellipse at center, ${colors.smoke} 0%, transparent 70%)`,
										}}
									/>

									{/* Borda neon interna ao hover */}
									<div
										className="absolute inset-0 opacity-0 group-hover/spread:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
										style={{
											boxShadow: `inset 0 0 40px ${colors.smoke}`,
										}}
									/>

									{/* Símbolo místico de fundo (muito sutil) */}
									<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] group-hover/spread:opacity-[0.08] transition-opacity duration-500 group-hover/spread:scale-110">
										<Icon icon={category.mysticalSymbol} className="size-48 text-white" />
									</div>

									{/* Textura de papel antigo */}
									<div
										className="absolute inset-0 opacity-[0.02]"
										style={{
											backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\' /%3E%3C/svg%3E")',
											backgroundSize: '80px 80px',
										}}
									/>

									{/* ═══ LAYOUT VERTICAL TIPO CARTA FÍSICA ═══ */}
									<div className="relative h-full flex flex-col items-center justify-between p-6">
										{/* ═══ TOPO: Nome da tiragem ═══ */}
										<div className="w-full text-center space-y-2">
											<h4 className={cn('text-lg font-serif font-bold tracking-wider bg-gradient-to-br bg-clip-text text-transparent leading-tight', colors.gradient)}
												style={{
													filter: `drop-shadow(${colors.textGlow}) drop-shadow(0 2px 8px rgba(0,0,0,0.9))`,
												}}
											>
												{spread.name}
											</h4>

											{/* Divider superior */}
											<div className="flex items-center justify-center gap-2">
												<div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
													style={{ color: `rgba(${colors.rgb}, 0.8)` }}
												/>
												<div className="size-1 rounded-full opacity-50"
													style={{ backgroundColor: `rgba(${colors.rgb}, 0.8)` }}
												/>
												<div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
													style={{ color: `rgba(${colors.rgb}, 0.8)` }}
												/>
											</div>
										</div>

										{/* ═══ CENTRO: Ícone místico grande ═══ */}
										<div className="flex-1 flex items-center justify-center py-6">
											{spread.icon && (
												<div className="relative">
													{/* Glow pulsante */}
													<div
														className="absolute inset-0 -m-6 rounded-full blur-2xl animate-pulse [animation-duration:4s]"
														style={{
															background: `radial-gradient(circle, ${colors.smoke} 0%, transparent 70%)`,
														}}
													/>
													{/* Container do ícone */}
													<div className="relative size-28 rounded-full border-3 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover/spread:scale-125 group-hover/spread:rotate-12"
														style={{
															borderColor: `rgba(${colors.rgb}, 0.5)`,
															boxShadow: `${colors.neonGlow}, inset 0 2px 12px rgba(255,255,255,0.15)`,
															background: 'radial-gradient(circle, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 100%)',
														}}
													>
														<Icon icon={spread.icon}
															className="size-16 text-white/90 group-hover/spread:text-white transition-all duration-700"
															style={{ filter: `drop-shadow(${colors.textGlow})` }}
														/>

														{/* Anel decorativo interno */}
														<div className="absolute inset-2 rounded-full border opacity-20"
															style={{ borderColor: `rgba(${colors.rgb}, 0.6)` }}
														/>
													</div>
												</div>
											)}
										</div>

										{/* ═══ RODAPÉ: Metadados da tiragem ═══ */}
										<div className="w-full space-y-3">
											{/* Divider inferior */}
											<div className="flex items-center justify-center gap-2">
												<div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
													style={{ color: `rgba(${colors.rgb}, 0.8)` }}
												/>
												<Icon icon="game-icons:card-draw" className="size-3.5 opacity-40"
													style={{ color: `rgba(${colors.rgb}, 1)` }}
												/>
												<div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
													style={{ color: `rgba(${colors.rgb}, 0.8)` }}
												/>
											</div>

											{/* Info principal: número de cartas */}
											<div className="text-center">
												<div className="flex items-center justify-center gap-2 text-white/70 group-hover/spread:text-white/90 transition-colors">
													<span className="text-2xl font-serif font-bold"
														style={{
															color: `rgba(${colors.rgb}, 1)`,
															filter: `drop-shadow(0 0 8px ${colors.smoke})`,
														}}
													>
														{spread.cardCount}
													</span>
													<span className="text-sm uppercase tracking-wider text-white/60">
														{spread.cardCount === 1 ? 'carta' : 'cartas'}
													</span>
												</div>
											</div>

											{/* Info secundária */}
											<div className="flex items-center justify-center gap-3 text-xs text-white/50 group-hover/spread:text-white/70 transition-colors">
												{spread.difficulty && (
													<div className="flex items-center gap-1">
														<Icon icon="game-icons:rolling-dices" className="size-3.5" />
														<span className="uppercase tracking-wide">
															{spread.difficulty === 1 ? 'Iniciante' : spread.difficulty === 2 ? 'Fácil' : spread.difficulty === 3 ? 'Médio' : spread.difficulty === 4 ? 'Avançado' : 'Mestra'}
														</span>
													</div>
												)}
												{spread.estimatedTime && spread.difficulty && (
													<span className="opacity-30">•</span>
												)}
												{spread.estimatedTime && (
													<div className="flex items-center gap-1">
														<Icon icon="lucide:clock" className="size-3.5" />
														<span>{spread.estimatedTime}min</span>
													</div>
												)}
											</div>

											{/* Sparkles ao hover */}
											<div className="flex items-center justify-center opacity-0 group-hover/spread:opacity-100 transition-opacity duration-500">
												<Icon icon="lucide:sparkles"
													className="size-5 animate-pulse [animation-duration:2s]"
													style={{
														color: `rgba(${colors.rgb}, 0.7)`,
														filter: `drop-shadow(0 0 8px ${colors.smoke})`,
													}}
												/>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* CSS animations */}
			<style jsx>{`
				@keyframes smokeMove {
					0%, 100% { transform: translate(0, 0); }
					50% { transform: translate(20px, -15px); }
				}
			`}</style>
		</div>
	)
}
