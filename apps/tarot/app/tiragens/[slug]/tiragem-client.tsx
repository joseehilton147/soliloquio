'use client'

/**
 * Tiragem Page Client Component - REVAMP TOTAL
 *
 * Experiência imersiva de mesa de tarot REAL:
 * - Mesa de madeira envelhecida com textura autêntica
 * - Toalha de veludo na cor do elemento
 * - Velas acesas, cristais, incenso
 * - Cartas interativas com flip
 * - Explicações detalhadas de cada posição
 * - Símbolos ciganos, wicca e místicos
 */

import { Icon } from '@iconify/react'
import type { TarotSpread } from '@workspace/core/tarot'
import { cn } from '@workspace/ui/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getCategoryById } from '../tiragens-categories.data'

interface TiragemPageClientProps {
	spread: TarotSpread
}

/**
 * Configuração de cores por elemento
 */
const ELEMENT_COLORS = {
	air: {
		primary: 'slate',
		rgb: '148, 163, 184',
		smoke: 'rgba(148, 163, 184, 0.15)',
		glow: '0 0 30px rgba(148, 163, 184, 0.4)',
		gradient: 'from-slate-400 to-gray-400',
		velvet: 'linear-gradient(135deg, rgba(100, 116, 139, 0.4) 0%, rgba(71, 85, 105, 0.3) 100%)',
	},
	water: {
		primary: 'blue',
		rgb: '96, 165, 250',
		smoke: 'rgba(96, 165, 250, 0.15)',
		glow: '0 0 30px rgba(96, 165, 250, 0.4)',
		gradient: 'from-blue-400 to-cyan-400',
		velvet: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.3) 100%)',
	},
	fire: {
		primary: 'red',
		rgb: '248, 113, 113',
		smoke: 'rgba(248, 113, 113, 0.15)',
		glow: '0 0 30px rgba(248, 113, 113, 0.4)',
		gradient: 'from-red-400 to-orange-400',
		velvet: 'linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(220, 38, 38, 0.3) 100%)',
	},
	earth: {
		primary: 'amber',
		rgb: '251, 191, 36',
		smoke: 'rgba(251, 191, 36, 0.15)',
		glow: '0 0 30px rgba(251, 191, 36, 0.4)',
		gradient: 'from-amber-400 to-yellow-400',
		velvet: 'linear-gradient(135deg, rgba(245, 158, 11, 0.4) 0%, rgba(217, 119, 6, 0.3) 100%)',
	},
	spirit: {
		primary: 'purple',
		rgb: '192, 132, 252',
		smoke: 'rgba(192, 132, 252, 0.15)',
		glow: '0 0 30px rgba(192, 132, 252, 0.4)',
		gradient: 'from-purple-400 to-violet-400',
		velvet: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(147, 51, 234, 0.3) 100%)',
	},
}

const CATEGORY_TO_ELEMENT: Record<string, keyof typeof ELEMENT_COLORS> = {
	quick: 'air',
	insight: 'water',
	relationship: 'fire',
	decision: 'earth',
	deep: 'spirit',
	custom: 'spirit',
}

export function TiragemPageClient({ spread }: TiragemPageClientProps) {
	const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
	const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
	const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string; size: number }>>([])

	// Detectar elemento e cores
	const element = CATEGORY_TO_ELEMENT[spread.category] || 'spirit'
	const colors = ELEMENT_COLORS[element]
	const category = getCategoryById(
		spread.category === 'quick' ? 'rapidas' :
		spread.category === 'insight' ? 'insights' :
		spread.category === 'relationship' ? 'relacionamentos' :
		spread.category === 'decision' ? 'decisoes' :
		'profunda'
	)

	useEffect(() => {
		setParticles(
			Array.from({ length: 40 }).map(() => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				delay: `${Math.random() * 8}s`,
				duration: `${15 + Math.random() * 20}s`,
				size: Math.random() * 3 + 0.5,
			}))
		)
	}, [])

	const toggleCardFlip = (positionId: string) => {
		setFlippedCards((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(positionId)) {
				newSet.delete(positionId)
			} else {
				newSet.add(positionId)
			}
			return newSet
		})
	}

	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
			{/* ═══ COSMIC BACKGROUND ═══ */}
			<div className="fixed inset-0 pointer-events-none">
				{/* Gradient radial base */}
				<div className="absolute inset-0" style={{
					background: `radial-gradient(ellipse at center, ${colors.smoke} 0%, transparent 70%)`,
				}} />

				{/* Partículas etéreas */}
				{particles.map((particle, i) => (
					<div
						key={`particle-${i}`}
						className="absolute rounded-full bg-white/40 animate-float blur-[0.5px]"
						style={{
							left: particle.left,
							top: particle.top,
							width: `${particle.size}px`,
							height: `${particle.size}px`,
							animationDelay: particle.delay,
							animationDuration: particle.duration,
							boxShadow: `0 0 ${particle.size * 4}px rgba(255, 255, 255, 0.3)`,
						}}
					/>
				))}

				{/* Círculos místicos concêntricos */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div className="absolute size-[600px] rounded-full border opacity-5 animate-spin-slow [animation-duration:60s]"
						style={{ borderColor: `rgba(${colors.rgb}, 0.3)` }}
					/>
					<div className="absolute size-[400px] rounded-full border opacity-5 animate-spin-slow [animation-duration:45s] [animation-direction:reverse]"
						style={{ borderColor: `rgba(${colors.rgb}, 0.3)` }}
					/>
				</div>
			</div>

			{/* ═══ HEADER COM BREADCRUMB ═══ */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-4">
				<Link
					href="/tiragens"
					className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors group"
				>
					<Icon icon="lucide:arrow-left" className="size-4 group-hover:-translate-x-1 transition-transform" />
					<span>Voltar para Tiragens</span>
				</Link>
			</div>

			{/* ═══ HERO SECTION - TÍTULO E DESCRIÇÃO ═══ */}
			<div className="relative z-10 max-w-5xl mx-auto px-6 pt-8 pb-12 text-center space-y-6">
				{/* Ícone decorativo */}
				<div className="flex justify-center">
					<div className="relative">
						<div className="absolute inset-0 -m-8 rounded-full blur-2xl animate-pulse [animation-duration:4s]"
							style={{ background: `radial-gradient(circle, ${colors.smoke} 0%, transparent 70%)` }}
						/>
						<div className="relative size-20 rounded-full border-3 flex items-center justify-center"
							style={{
								borderColor: `rgba(${colors.rgb}, 0.4)`,
								boxShadow: colors.glow,
								background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
							}}
						>
							<Icon icon={spread.icon || 'game-icons:perspective-dice-six-faces-random'}
								className="size-10 text-white/90"
								style={{ filter: `drop-shadow(${colors.glow})` }}
							/>
						</div>
					</div>
				</div>

				{/* Título */}
				<div className="space-y-3">
					<h1 className={cn('text-5xl md:text-6xl font-serif font-bold tracking-wide bg-gradient-to-br bg-clip-text text-transparent', colors.gradient)}
						style={{ filter: `drop-shadow(${colors.glow}) drop-shadow(0 4px 20px rgba(0,0,0,0.9))` }}
					>
						{spread.name}
					</h1>

					{/* Badge da categoria */}
					{category && (
						<div className="flex items-center justify-center gap-2 text-sm text-white/70">
							<Icon icon={category.icon} className="size-5" style={{ color: `rgba(${colors.rgb}, 0.8)` }} />
							<span>{category.name}</span>
							<span className="opacity-50">•</span>
							<span className="opacity-70">{category.subtitle}</span>
						</div>
					)}
				</div>

				{/* Descrição */}
				<p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto font-light"
					style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}
				>
					{spread.description}
				</p>

				{/* Divider místico */}
				<div className="flex items-center justify-center gap-4 pt-4">
					<div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
						style={{ color: `rgba(${colors.rgb}, 0.8)` }}
					/>
					<Icon icon={category?.mysticalSymbol || 'game-icons:crystal-ball'} className="size-6 opacity-40"
						style={{ color: `rgba(${colors.rgb}, 1)`, filter: `drop-shadow(0 0 10px ${colors.smoke})` }}
					/>
					<div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
						style={{ color: `rgba(${colors.rgb}, 0.8)` }}
					/>
				</div>

				{/* Metadados */}
				<div className="flex flex-wrap items-center justify-center gap-4 pt-4">
					{/* Número de Cartas */}
					<div className="flex items-center gap-2 px-4 py-2 rounded-lg border"
						style={{
							borderColor: `rgba(${colors.rgb}, 0.3)`,
							background: `rgba(${colors.rgb}, 0.1)`,
						}}
					>
						<Icon icon="game-icons:card-draw" className="size-5" style={{ color: `rgba(${colors.rgb}, 0.9)` }} />
						<span className="text-white/80 font-medium">{spread.cardCount} {spread.cardCount === 1 ? 'carta' : 'cartas'}</span>
					</div>

					{/* Tempo Estimado */}
					{spread.estimatedTime && (
						<div className="flex items-center gap-2 px-4 py-2 rounded-lg border"
							style={{
								borderColor: `rgba(${colors.rgb}, 0.3)`,
								background: `rgba(${colors.rgb}, 0.1)`,
							}}
						>
							<Icon icon="lucide:clock" className="size-5" style={{ color: `rgba(${colors.rgb}, 0.9)` }} />
							<span className="text-white/80">~{spread.estimatedTime} min</span>
						</div>
					)}

					{/* Dificuldade */}
					{spread.difficulty && (
						<div className="flex items-center gap-2 px-4 py-2 rounded-lg border"
							style={{
								borderColor: `rgba(${colors.rgb}, 0.3)`,
								background: `rgba(${colors.rgb}, 0.1)`,
							}}
						>
							<div className="flex items-center gap-1">
								{Array.from({ length: spread.difficulty }).map((_, i) => (
									<Icon key={i} icon="lucide:star" className="size-3.5 fill-current"
										style={{ color: `rgba(${colors.rgb}, 0.9)` }}
									/>
								))}
								{Array.from({ length: 5 - spread.difficulty }).map((_, i) => (
									<Icon key={`empty-${i}`} icon="lucide:star" className="size-3.5 opacity-20"
										style={{ color: `rgba(${colors.rgb}, 0.9)` }}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* ═══ QUANDO USAR ═══ */}
			<div className="relative z-10 max-w-4xl mx-auto px-6 pb-12">
				<div className="relative p-8 rounded-2xl border-2 overflow-hidden"
					style={{
						borderColor: `rgba(${colors.rgb}, 0.3)`,
						background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(10,10,10,0.9) 100%)',
						boxShadow: `${colors.glow}, 0 8px 32px rgba(0,0,0,0.8)`,
					}}
				>
					{/* Background decorativo */}
					<div className="absolute inset-0 pointer-events-none opacity-5">
						<Icon icon={category?.decorativeIcon || 'game-icons:spiral-bloom'} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 text-white" />
					</div>

					<div className="relative space-y-4">
						<div className="flex items-center gap-3">
							<Icon icon="lucide:lightbulb" className="size-6" style={{ color: `rgba(${colors.rgb}, 0.9)` }} />
							<h3 className="text-xl font-serif font-bold text-white">Quando Usar Esta Tiragem</h3>
						</div>
						<p className="text-base text-white/80 leading-relaxed pl-9"
							style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
						>
							{spread.whenToUse}
						</p>
					</div>
				</div>
			</div>

			{/* ═══ MESA REDONDA MÍSTICA DE TAROT ═══ */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
				<div className="space-y-8">
					{/* Título da seção */}
					<div className="text-center space-y-3">
						<h2 className="text-3xl font-serif font-bold text-white">Mesa Sagrada de Leitura</h2>
						<p className="text-sm text-white/60">
							Clique em cada carta para revelar seu significado místico profundo
						</p>
					</div>

					{/* Container da Mesa REDONDA */}
					<div className="relative flex items-center justify-center">
						{/* Mesa circular de madeira envelhecida */}
						<div className="relative w-full max-w-4xl aspect-square rounded-full overflow-hidden border-8 border-amber-900/50"
							style={{
								background: `
									radial-gradient(ellipse at center, #4E342E 0%, #3E2723 40%, #2C1810 100%),
									url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wood'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wood)' opacity='0.2' /%3E%3C/svg%3E")
								`,
								boxShadow: '0 40px 120px rgba(0,0,0,0.95), inset 0 0 120px rgba(0,0,0,0.7)',
							}}
						>
							{/* Toalha de veludo CIRCULAR colorida */}
							<div className="relative m-12 aspect-square rounded-full overflow-hidden border-3"
								style={{
									borderColor: `rgba(${colors.rgb}, 0.4)`,
									background: colors.velvet,
									boxShadow: `inset 0 0 80px ${colors.smoke}, ${colors.glow}`,
								}}
							>
								{/* Textura de veludo */}
								<div className="absolute inset-0 opacity-15"
									style={{
										backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'120\' height=\'120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'velvet\'%3E%3CfeTurbulence type=\'turbulence\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23velvet)\' /%3E%3C/svg%3E")',
									}}
								/>

								{/* Pentagrama/Círculo Mágico Decorativo */}
								<div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
									{/* Círculo externo */}
									<div className="absolute inset-4 rounded-full border-2"
										style={{ borderColor: `rgba(${colors.rgb}, 0.5)` }}
									/>
									{/* Círculo médio */}
									<div className="absolute inset-12 rounded-full border"
										style={{ borderColor: `rgba(${colors.rgb}, 0.4)` }}
									/>
									{/* Círculo interno pontilhado */}
									<div className="absolute inset-20 rounded-full border border-dashed"
										style={{ borderColor: `rgba(${colors.rgb}, 0.3)` }}
									/>
									{/* Símbolo central */}
									<Icon icon={category?.mysticalSymbol || 'game-icons:crystal-ball'}
										className="size-32 opacity-20"
										style={{ color: `rgba(${colors.rgb}, 1)` }}
									/>
								</div>

								{/* Container centralizado das cartas e conexões */}
								<div className="relative aspect-square p-8">
									{/* ═══ LINHAS DE CONEXÃO ENERGÉTICAS (SVG) ═══ */}
									<svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
										<defs>
											{/* Gradiente para as linhas místicas */}
											<linearGradient id={`connection-gradient-${element}`} x1="0%" y1="0%" x2="100%" y2="100%">
												<stop offset="0%" style={{ stopColor: `rgba(${colors.rgb}, 0.4)`, stopOpacity: 0.6 }} />
												<stop offset="50%" style={{ stopColor: `rgba(${colors.rgb}, 0.6)`, stopOpacity: 0.8 }} />
												<stop offset="100%" style={{ stopColor: `rgba(${colors.rgb}, 0.4)`, stopOpacity: 0.6 }} />
											</linearGradient>
										</defs>

										{/* Renderiza conexões entre cartas */}
										{spread.positions.map((position) =>
											position.connectedTo?.map((targetId) => {
												const target = spread.positions.find((p) => p.id === targetId)
												if (!target) return null

												return (
													<line
														key={`${position.id}-${targetId}`}
														x1={`${position.x}%`}
														y1={`${position.y}%`}
														x2={`${target.x}%`}
														y2={`${target.y}%`}
														stroke={`url(#connection-gradient-${element})`}
														strokeWidth="2"
														strokeDasharray="6,4"
														className="animate-pulse"
														style={{
															animationDuration: '3s',
															filter: `drop-shadow(0 0 6px ${colors.smoke})`,
														}}
													/>
												)
											})
										)}
									</svg>

									{/* ═══ POSIÇÕES DAS CARTAS ═══ */}
									<div className="relative size-full">
										{spread.positions.map((position) => {
											const isSelected = selectedPosition === position.id
											const isFlipped = flippedCards.has(position.id)

											return (
												<button
													key={position.id}
													type="button"
													onClick={() => {
														setSelectedPosition(position.id)
														toggleCardFlip(position.id)
													}}
													className="absolute group cursor-pointer"
													style={{
														left: `${position.x}%`,
														top: `${position.y}%`,
														transform: `translate(-50%, -50%) rotate(${position.rotation || 0}deg)`,
													}}
												>
													{/* Aura mística ao redor da carta */}
													{(isSelected || isFlipped) && (
														<div
															className="absolute inset-0 -m-8 rounded-full blur-2xl animate-pulse [animation-duration:2s] pointer-events-none"
															style={{
																background: `radial-gradient(circle, ${colors.smoke} 0%, transparent 70%)`,
															}}
														/>
													)}

													{/* Card com perspectiva 3D */}
													<div className={cn(
														'relative w-36 h-52 transition-all duration-700 preserve-3d',
														isFlipped && 'rotate-y-180',
														isSelected && 'scale-125 z-50',
														!isSelected && !isFlipped && 'hover:scale-105'
													)}
														style={{ transformStyle: 'preserve-3d' }}
													>
														{/* FRENTE - Verso místico da carta */}
														<div className={cn(
															'absolute inset-0 rounded-xl border-3 overflow-hidden backface-hidden',
															'transition-all duration-700',
															isSelected ? 'shadow-2xl' : 'shadow-xl'
														)}
															style={{
																borderColor: `rgba(${colors.rgb}, ${isSelected ? '1' : '0.5'})`,
																background: `
																	linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(15,15,15,0.98) 50%, rgba(0,0,0,0.98) 100%),
																	radial-gradient(ellipse at center, rgba(${colors.rgb}, 0.08) 0%, transparent 70%)
																`,
																boxShadow: isSelected
																	? `${colors.glow}, 0 0 40px ${colors.smoke}, 0 25px 70px rgba(0,0,0,0.95), inset 0 0 30px ${colors.smoke}`
																	: `0 0 25px ${colors.smoke}, 0 12px 45px rgba(0,0,0,0.85), inset 0 0 20px rgba(0,0,0,0.5)`,
															}}
														>
															{/* Ornamentos místicos da carta */}
															<div className="absolute inset-0 flex flex-col items-center justify-between p-4">
																{/* Topo: Ornamento superior */}
																<div className="flex items-center gap-2">
																	<div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
																		style={{ color: `rgba(${colors.rgb}, 1)` }}
																	/>
																	<Icon icon="game-icons:star-formation" className="size-3 opacity-40"
																		style={{ color: `rgba(${colors.rgb}, 1)` }}
																	/>
																	<div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
																		style={{ color: `rgba(${colors.rgb}, 1)` }}
																	/>
																</div>

																{/* Centro: Número + Símbolo + Label */}
																<div className="flex-1 flex flex-col items-center justify-center space-y-3">
																	{/* Número ornamentado */}
																	<div className="relative">
																		<div className="size-14 rounded-full border-2 flex items-center justify-center text-2xl font-bold font-serif"
																			style={{
																				borderColor: `rgba(${colors.rgb}, 0.7)`,
																				color: `rgba(${colors.rgb}, 1)`,
																				boxShadow: `0 0 25px ${colors.smoke}, inset 0 0 15px ${colors.smoke}`,
																				background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%)',
																			}}
																		>
																			{position.order}
																		</div>
																		{/* Anel decorativo */}
																		<div className="absolute inset-1 rounded-full border opacity-30"
																			style={{ borderColor: `rgba(${colors.rgb}, 0.8)` }}
																		/>
																	</div>

																	{/* Símbolo místico */}
																	<div className="relative">
																		{/* Glow do símbolo */}
																		<div className="absolute inset-0 -m-2 blur-lg opacity-60"
																			style={{
																				background: `radial-gradient(circle, ${colors.smoke} 0%, transparent 70%)`,
																			}}
																		/>
																		<Icon icon={category?.mysticalSymbol || 'game-icons:crystal-ball'}
																			className="relative size-20 opacity-40 animate-pulse [animation-duration:4s]"
																			style={{
																				color: `rgba(${colors.rgb}, 1)`,
																				filter: `drop-shadow(0 0 8px ${colors.smoke})`,
																			}}
																		/>
																	</div>

																	{/* Label da posição */}
																	<p className="text-xs font-serif font-bold uppercase tracking-widest px-3 text-center leading-tight"
																		style={{
																			color: `rgba(${colors.rgb}, 0.9)`,
																			textShadow: `0 0 10px ${colors.smoke}`,
																		}}
																	>
																		{position.label}
																	</p>
																</div>

																{/* Rodapé: Ornamento inferior */}
																<div className="flex items-center gap-2">
																	<div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
																		style={{ color: `rgba(${colors.rgb}, 1)` }}
																	/>
																	<div className="size-1.5 rounded-full opacity-50"
																		style={{ backgroundColor: `rgba(${colors.rgb}, 1)` }}
																	/>
																	<div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
																		style={{ color: `rgba(${colors.rgb}, 1)` }}
																	/>
																</div>
															</div>

															{/* Cantos decorativos */}
															<div className="absolute top-2 left-2 size-4 border-t-2 border-l-2 rounded-tl-lg opacity-30"
																style={{ borderColor: `rgba(${colors.rgb}, 0.6)` }}
															/>
															<div className="absolute top-2 right-2 size-4 border-t-2 border-r-2 rounded-tr-lg opacity-30"
																style={{ borderColor: `rgba(${colors.rgb}, 0.6)` }}
															/>
															<div className="absolute bottom-2 left-2 size-4 border-b-2 border-l-2 rounded-bl-lg opacity-30"
																style={{ borderColor: `rgba(${colors.rgb}, 0.6)` }}
															/>
															<div className="absolute bottom-2 right-2 size-4 border-b-2 border-r-2 rounded-br-lg opacity-30"
																style={{ borderColor: `rgba(${colors.rgb}, 0.6)` }}
															/>

															{/* Glow pulsante quando selecionado */}
															{isSelected && (
																<div className="absolute inset-0 animate-pulse [animation-duration:2s] pointer-events-none"
																	style={{
																		boxShadow: `inset 0 0 40px ${colors.smoke}`,
																	}}
																/>
															)}
														</div>

														{/* VERSO - Explicação da posição */}
														<div className={cn(
															'absolute inset-0 rounded-xl border-3 overflow-hidden backface-hidden rotate-y-180',
															'transition-all duration-500'
														)}
															style={{
																borderColor: `rgba(${colors.rgb}, 0.6)`,
																background: 'linear-gradient(135deg, rgba(10,10,10,0.98) 0%, rgba(0,0,0,0.95) 100%)',
																boxShadow: `${colors.glow}, 0 20px 60px rgba(0,0,0,0.9)`,
															}}
														>
															<div className="h-full p-4 flex flex-col items-center justify-center text-center space-y-2 overflow-auto">
																{/* Número */}
																<div className="size-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0"
																	style={{
																		borderColor: `rgba(${colors.rgb}, 0.6)`,
																		color: `rgba(${colors.rgb}, 0.9)`,
																	}}
																>
																	{position.order}
																</div>

																{/* Título */}
																<h4 className="text-sm font-serif font-bold"
																	style={{ color: `rgba(${colors.rgb}, 1)` }}
																>
																	{position.label}
																</h4>

																{/* Descrição */}
																<p className="text-xs text-white/80 leading-relaxed font-light"
																	style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
																>
																	{position.description}
																</p>

																{/* Ênfase */}
																{position.emphasis && (
																	<Icon icon="lucide:sparkles" className="size-4 opacity-60"
																		style={{ color: `rgba(${colors.rgb}, 1)` }}
																	/>
																)}
															</div>
														</div>
													</div>

													{/* Tooltip ao hover (apenas quando não flippado) */}
													{!isFlipped && (
														<div className={cn(
															'absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg border whitespace-nowrap',
															'opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50'
														)}
															style={{
																borderColor: `rgba(${colors.rgb}, 0.6)`,
																background: 'rgba(0,0,0,0.95)',
																boxShadow: colors.glow,
															}}
														>
															<p className="text-xs font-medium text-white">{position.label}</p>
															<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45"
																style={{
																	borderRight: `1px solid rgba(${colors.rgb}, 0.6)`,
																	borderBottom: `1px solid rgba(${colors.rgb}, 0.6)`,
																	background: 'rgba(0,0,0,0.95)',
																}}
															/>
														</div>
													)}
												</button>
											)
										})}
									</div>
								</div>

								{/* ═══ VELAS AO REDOR DA MESA (4 DIREÇÕES CARDEAIS) ═══ */}
								{/* Vela Norte (Topo) */}
								<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
									<div className="size-4 rounded-full animate-pulse [animation-duration:2s]"
										style={{
											background: `radial-gradient(circle, rgba(${colors.rgb}, 1) 0%, rgba(${colors.rgb}, 0.5) 60%, transparent 100%)`,
											boxShadow: `0 0 25px rgba(${colors.rgb}, 0.9), 0 0 50px rgba(${colors.rgb}, 0.5)`,
										}}
									/>
									<div className="w-2.5 h-10 rounded-full bg-gradient-to-b from-amber-100/95 to-amber-900/85 shadow-lg" />
								</div>

								{/* Vela Sul (Baixo) */}
								<div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col-reverse items-center gap-2 pointer-events-none z-20">
									<div className="w-2.5 h-10 rounded-full bg-gradient-to-t from-amber-100/95 to-amber-900/85 shadow-lg" />
									<div className="size-4 rounded-full animate-pulse [animation-duration:2.8s]"
										style={{
											background: `radial-gradient(circle, rgba(${colors.rgb}, 1) 0%, rgba(${colors.rgb}, 0.5) 60%, transparent 100%)`,
											boxShadow: `0 0 25px rgba(${colors.rgb}, 0.9), 0 0 50px rgba(${colors.rgb}, 0.5)`,
										}}
									/>
								</div>

								{/* Vela Leste (Direita) */}
								<div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-20">
									<div className="w-10 h-2.5 rounded-full bg-gradient-to-r from-amber-900/85 to-amber-100/95 shadow-lg" />
									<div className="size-4 rounded-full animate-pulse [animation-duration:2.5s]"
										style={{
											background: `radial-gradient(circle, rgba(${colors.rgb}, 1) 0%, rgba(${colors.rgb}, 0.5) 60%, transparent 100%)`,
											boxShadow: `0 0 25px rgba(${colors.rgb}, 0.9), 0 0 50px rgba(${colors.rgb}, 0.5)`,
										}}
									/>
								</div>

								{/* Vela Oeste (Esquerda) */}
								<div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-20">
									<div className="size-4 rounded-full animate-pulse [animation-duration:3s]"
										style={{
											background: `radial-gradient(circle, rgba(${colors.rgb}, 1) 0%, rgba(${colors.rgb}, 0.5) 60%, transparent 100%)`,
											boxShadow: `0 0 25px rgba(${colors.rgb}, 0.9), 0 0 50px rgba(${colors.rgb}, 0.5)`,
										}}
									/>
									<div className="w-10 h-2.5 rounded-full bg-gradient-to-l from-amber-900/85 to-amber-100/95 shadow-lg" />
								</div>

								{/* ═══ CRISTAIS NAS DIAGONAIS ═══ */}
								{/* Cristal Nordeste */}
								<div className="absolute top-[15%] right-[15%] pointer-events-none z-20">
									<Icon icon="game-icons:crystal-cluster" className="size-10 text-purple-400/70 animate-pulse [animation-duration:4s]"
										style={{
											filter: `drop-shadow(0 0 15px rgba(192, 132, 252, 0.7)) drop-shadow(0 0 30px rgba(192, 132, 252, 0.4))`,
											transform: 'rotate(25deg)',
										}}
									/>
								</div>

								{/* Cristal Noroeste */}
								<div className="absolute top-[15%] left-[15%] pointer-events-none z-20">
									<Icon icon="game-icons:crystal-cluster" className="size-10 text-blue-400/70 animate-pulse [animation-duration:3.5s]"
										style={{
											filter: `drop-shadow(0 0 15px rgba(96, 165, 250, 0.7)) drop-shadow(0 0 30px rgba(96, 165, 250, 0.4))`,
											transform: 'rotate(-25deg)',
										}}
									/>
								</div>

								{/* Cristal Sudeste */}
								<div className="absolute bottom-[15%] right-[15%] pointer-events-none z-20">
									<Icon icon="game-icons:crystal-cluster" className="size-10 text-amber-400/70 animate-pulse [animation-duration:3.8s]"
										style={{
											filter: `drop-shadow(0 0 15px rgba(251, 191, 36, 0.7)) drop-shadow(0 0 30px rgba(251, 191, 36, 0.4))`,
											transform: 'rotate(-15deg)',
										}}
									/>
								</div>

								{/* Cristal Sudoeste */}
								<div className="absolute bottom-[15%] left-[15%] pointer-events-none z-20">
									<Icon icon="game-icons:crystal-cluster" className="size-10 text-pink-400/70 animate-pulse [animation-duration:4.2s]"
										style={{
											filter: `drop-shadow(0 0 15px rgba(244, 114, 182, 0.7)) drop-shadow(0 0 30px rgba(244, 114, 182, 0.4))`,
											transform: 'rotate(15deg)',
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ═══ LISTA DETALHADA DE POSIÇÕES ═══ */}
			<div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
				<div className="space-y-8">
					{/* Título */}
					<div className="text-center space-y-3">
						<h2 className="text-3xl font-serif font-bold text-white">Guia Completo das Posições</h2>
						<p className="text-sm text-white/60">
							Compreenda profundamente o significado de cada carta na tiragem
						</p>
					</div>

					{/* Grid de posições */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{spread.positions.map((position) => (
							<div key={position.id}
								className="group relative p-6 rounded-xl border-2 overflow-hidden transition-all duration-500 hover:scale-102 cursor-pointer"
								onClick={() => setSelectedPosition(position.id)}
								style={{
									borderColor: selectedPosition === position.id
										? `rgba(${colors.rgb}, 0.6)`
										: `rgba(${colors.rgb}, 0.3)`,
									background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(10,10,10,0.9) 100%)',
									boxShadow: selectedPosition === position.id
										? `${colors.glow}, 0 8px 32px rgba(0,0,0,0.8)`
										: '0 4px 16px rgba(0,0,0,0.6)',
								}}
							>
								{/* Background decorativo */}
								<div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
									<Icon icon={category?.decorativeIcon || 'game-icons:spiral-bloom'} className="size-32 text-white" />
								</div>

								<div className="relative space-y-4">
									{/* Header */}
									<div className="flex items-start gap-4">
										{/* Número */}
										<div className="flex-shrink-0 size-12 rounded-full border-3 flex items-center justify-center text-lg font-bold transition-all duration-300 group-hover:scale-110"
											style={{
												borderColor: `rgba(${colors.rgb}, 0.6)`,
												color: `rgba(${colors.rgb}, 1)`,
												boxShadow: `0 0 20px ${colors.smoke}`,
												background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
											}}
										>
											{position.order}
										</div>

										{/* Label e ênfase */}
										<div className="flex-1 space-y-1 pt-1">
											<div className="flex items-center gap-2">
												<h4 className="text-lg font-serif font-bold text-white group-hover:text-white/90 transition-colors">
													{position.label}
												</h4>
												{position.emphasis && (
													<Icon icon="lucide:sparkles" className="size-5 opacity-60"
														style={{ color: `rgba(${colors.rgb}, 1)` }}
													/>
												)}
											</div>
										</div>
									</div>

									{/* Divider */}
									<div className="flex items-center gap-2">
										<div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30"
											style={{ color: `rgba(${colors.rgb}, 0.8)` }}
										/>
										<div className="size-1 rounded-full opacity-40"
											style={{ backgroundColor: `rgba(${colors.rgb}, 1)` }}
										/>
										<div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30"
											style={{ color: `rgba(${colors.rgb}, 0.8)` }}
										/>
									</div>

									{/* Descrição */}
									<p className="text-sm text-white/80 leading-relaxed font-light"
										style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
									>
										{position.description}
									</p>

									{/* Conexões */}
									{position.connectedTo && position.connectedTo.length > 0 && (
										<div className="pt-2 flex items-start gap-2 text-xs text-white/50">
											<Icon icon="lucide:git-branch" className="size-4 mt-0.5 flex-shrink-0" />
											<p>
												<span className="font-medium">Conecta com:</span>{' '}
												{position.connectedTo.map((id) => {
													const connected = spread.positions.find((p) => p.id === id)
													return connected?.label
												}).filter(Boolean).join(', ')}
											</p>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* ═══ CALL TO ACTION ═══ */}
			<div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
				<div className="relative p-12 rounded-2xl border-3 overflow-hidden text-center space-y-6"
					style={{
						borderColor: `rgba(${colors.rgb}, 0.4)`,
						background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(10,10,10,0.95) 100%)',
						boxShadow: `${colors.glow}, 0 12px 48px rgba(0,0,0,0.9)`,
					}}
				>
					{/* Background mystical */}
					<div className="absolute inset-0 pointer-events-none opacity-5">
						<Icon icon={category?.mysticalSymbol || 'game-icons:spell-book'} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 text-white" />
					</div>

					<div className="relative space-y-6">
						{/* Título */}
						<h2 className={cn('text-4xl font-serif font-bold bg-gradient-to-br bg-clip-text text-transparent', colors.gradient)}
							style={{ filter: `drop-shadow(${colors.glow})` }}
						>
							Pronto para Sua Jornada?
						</h2>

						{/* Descrição */}
						<p className="text-base text-white/70 max-w-xl mx-auto leading-relaxed">
							Prepare seu coração, formule sua pergunta com clareza e permita que as cartas revelem
							o caminho iluminado pelo universo.
						</p>

						{/* Divider */}
						<div className="flex items-center justify-center gap-3 py-4">
							<div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
								style={{ color: `rgba(${colors.rgb}, 0.8)` }}
							/>
							<Icon icon="lucide:sparkles" className="size-5 opacity-60 animate-pulse [animation-duration:3s]"
								style={{ color: `rgba(${colors.rgb}, 1)` }}
							/>
							<div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-current to-transparent opacity-40"
								style={{ color: `rgba(${colors.rgb}, 0.8)` }}
							/>
						</div>

						{/* Botões */}
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
							{/* Botão Principal */}
							<Link
								href={`/tiragens/${spread.slug}/leitura`}
								className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-500 hover:scale-105"
								style={{
									background: `linear-gradient(135deg, rgba(${colors.rgb}, 0.9) 0%, rgba(${colors.rgb}, 0.7) 100%)`,
									boxShadow: `${colors.glow}, 0 8px 24px rgba(0,0,0,0.6)`,
									color: 'white',
								}}
							>
								<Icon icon="lucide:play" className="size-5 group-hover:scale-110 transition-transform" />
								<span>Iniciar Leitura Sagrada</span>
							</Link>

							{/* Botão Secundário */}
							<button type="button"
								className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 font-medium transition-all duration-300 hover:bg-white/5"
								style={{
									borderColor: `rgba(${colors.rgb}, 0.4)`,
									color: 'white',
								}}
							>
								<Icon icon="lucide:book-open" className="size-5" />
								<span>Ver Exemplo</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* ═══ FOOTER COM TAGS E FONTE ═══ */}
			<div className="relative z-10 max-w-5xl mx-auto px-6 pb-16">
				<div className="space-y-6 text-center">
					{/* Tags */}
					{spread.tags && spread.tags.length > 0 && (
						<div className="flex flex-wrap items-center justify-center gap-2">
							{spread.tags.map((tag) => (
								<span key={tag}
									className="px-3 py-1.5 rounded-full text-xs font-medium border"
									style={{
										borderColor: `rgba(${colors.rgb}, 0.3)`,
										background: `rgba(${colors.rgb}, 0.1)`,
										color: `rgba(${colors.rgb}, 1)`,
									}}
								>
									#{tag}
								</span>
							))}
						</div>
					)}

					{/* Fonte */}
					{spread.source && (
						<p className="text-xs text-white/40 tracking-wide">
							Fonte: {spread.source}
						</p>
					)}

					{/* Ornamento final */}
					<div className="flex items-center justify-center gap-6 pt-6 opacity-20">
						<div className="size-1 rounded-full bg-white animate-pulse [animation-duration:4s]" />
						<div className="size-0.5 rounded-full bg-white animate-pulse [animation-duration:5s] [animation-delay:1s]" />
						<div className="size-1 rounded-full bg-white animate-pulse [animation-duration:4.5s] [animation-delay:0.5s]" />
						<div className="size-0.5 rounded-full bg-white animate-pulse [animation-duration:5.5s] [animation-delay:1.5s]" />
						<div className="size-1 rounded-full bg-white animate-pulse [animation-duration:4s] [animation-delay:1s]" />
					</div>
				</div>
			</div>

			{/* CSS customizado para flip 3D */}
			<style jsx>{`
				.preserve-3d {
					transform-style: preserve-3d;
				}
				.backface-hidden {
					backface-visibility: hidden;
				}
				.rotate-y-180 {
					transform: rotateY(180deg);
				}
			`}</style>
		</div>
	)
}
