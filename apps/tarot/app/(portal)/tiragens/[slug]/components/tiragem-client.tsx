'use client'

/**
 * Tiragem Page Client Component - REFATORADO
 *
 * Componente principal da página de tiragem individual de tarot.
 * Orquestra todos os sub-componentes para criar uma experiência
 * imersiva de mesa de tarot real com:
 * - Background cósmico com estrelas e nebulosas
 * - Cartas interativas com flip 3D
 * - Linhas de conexão energéticas entre posições relacionadas
 * - Informações detalhadas sobre a tiragem
 *
 * @module TiragemPageClient
 */

import { Icon } from '@iconify/react'
import type { TarotSpread } from '@workspace/core/tarot'
import { cn } from '@workspace/ui/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { CategoryType } from '../element-colors'
import { getElement, getElementColors } from '../element-colors'

import { CosmicCard } from './cards'
import { CelticCrossGuide } from './celtic-cross-guide'
import { CosmicBackground, EnergyConnections } from './effects'
import { calculateContainerDimensions, recalculatePositions, CelticCrossLayout } from './layouts'
import { UniverseAdviceGuide } from './universe-advice-guide'
import { YesNoGuide } from './yes-no-guide'

import { getCategoryById } from '@/features/tiragens'

/**
 * Props do componente TiragemPageClient
 *
 * @interface TiragemPageClientProps
 * @property {TarotSpread} spread - Dados completos da tiragem de tarot
 */
interface TiragemPageClientProps {
	/** Configuração completa da tiragem (posições, descrição, categoria, etc) */
	spread: TarotSpread
}

/**
 * Interface para partículas flutuantes do background
 */
interface Particle {
	left: string
	top: string
	delay: string
	duration: string
	size: number
}

/**
 * Componente principal da página de tiragem individual
 *
 * Renderiza a experiência completa da tiragem incluindo:
 * - Background cósmico animado
 * - Cabeçalho com breadcrumb de navegação
 * - Hero section com título, ícone e descrição
 * - Seção "Quando Usar"
 * - Campo cósmico com cartas interativas e conexões energéticas
 * - Lista detalhada de todas as posições
 * - Call-to-action para iniciar leitura
 * - Footer com tags e fonte
 *
 * Gerencia estados de:
 * - Posição selecionada
 * - Cartas viradas (flipped)
 * - Partículas do background
 *
 * @example
 * ```tsx
 * const spread = {
 *   slug: 'tres-cartas',
 *   name: 'Tiragem de Três Cartas',
 *   category: 'quick',
 *   cardCount: 3,
 *   positions: [...],
 *   description: '...',
 *   whenToUse: '...'
 * }
 * <TiragemPageClient spread={spread} />
 * ```
 *
 * @param {TiragemPageClientProps} props - Propriedades do componente
 * @returns {JSX.Element} Página completa da tiragem renderizada
 */
export function TiragemPageClient({ spread }: TiragemPageClientProps) {
	const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
	const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

	const optimizedPositions = recalculatePositions(spread)

	const containerDims = calculateContainerDimensions(spread.cardCount)
	const [particles, setParticles] = useState<Particle[]>([])

	// Gerar partículas apenas no cliente para evitar mismatch de hidratação
	useEffect(() => {
		setParticles(
			Array.from({ length: 40 }).map(() => ({
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				delay: `${Math.random() * 8}s`,
				duration: `${15 + Math.random() * 20}s`,
				size: Math.random() * 3 + 0.5,
			})),
		)
	}, [])

	const element = getElement(spread.category as CategoryType)
	const colors = getElementColors(spread.category as CategoryType)

	// Mapear categoria para ID de categoria
	const categoryId =
		spread.category === 'quick'
			? 'rapidas' :
			spread.category === 'insight'
				? 'insights' :
				spread.category === 'relationship'
					? 'relacionamentos' :
					spread.category === 'decision'
						? 'decisoes' :
						'profunda'

	const category = getCategoryById(categoryId)

	/**
	 * Alterna o estado de flip de uma carta
	 *
	 * @param {string} positionId - ID da posição a ser alternada
	 */
	const toggleCardFlip = (positionId: string): void => {
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

	/**
	 * Manipula clique em uma carta (seleciona e flippa)
	 *
	 * @param {string} positionId - ID da posição clicada
	 */
	const handleCardClick = (positionId: string): void => {
		setSelectedPosition(positionId)
		toggleCardFlip(positionId)
	}

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
			{/* ═══ COSMIC BACKGROUND GLOBAL ═══ */}
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

			{/* ═══ CAMPO CÓSMICO MÍSTICO - CONSTELAÇÃO DE CARTAS ═══ */}
			<div className="relative z-10 w-full px-6 py-16">
				<div className="space-y-8">
					{/* Título da seção */}
					<div className="text-center space-y-3">
						<h2 className="text-3xl font-serif font-bold text-white">Constelação Sagrada</h2>
						<p className="text-sm text-white/60">
							Clique em cada carta para revelar os mistérios cósmicos
						</p>
					</div>

					{/* Container do Campo Cósmico - Layout Adaptativo */}
					{spread.slug === 'cruz-celta' ? (
						/* Layout FIXO para Cruz Celta usando CSS Grid */
						<CelticCrossLayout
							spread={spread}
							colors={colors}
							mysticalSymbol={category?.mysticalSymbol || 'game-icons:crystal-ball'}
							selectedPosition={selectedPosition}
							flippedCards={flippedCards}
							onCardClick={handleCardClick}
						/>
					) : (
						/* Layout dinâmico para outras tiragens */
						<div
							className="relative w-full max-w-7xl mx-auto flex items-center justify-center overflow-visible"
							style={{ minHeight: containerDims.minHeight }}
						>
							{/* Background Cósmico Profundo */}
							<CosmicBackground colors={colors} starCount={150} />

							{/* Container das cartas com posição relativa ao tamanho */}
							<div className="relative w-full h-full transition-all duration-500">
								{/* Linhas de conexão energéticas */}
								<EnergyConnections
									positions={spread.positions}
									colors={colors}
									element={element}
								/>

								{/* Cartas cósmicas interativas */}
								{spread.positions.map((position, index) => {
									// Usa posição otimizada (evita sobreposição)
									const optimizedPos = optimizedPositions[index]
									const positionWithOptimizedCoords = {
										...position,
										x: optimizedPos?.x ?? position.x,
										y: optimizedPos?.y ?? position.y,
										rotation: optimizedPos?.rotation ?? position.rotation,
									}

									return (
										<CosmicCard
											key={position.id}
											position={positionWithOptimizedCoords}
											mysticalSymbol={category?.mysticalSymbol || 'game-icons:crystal-ball'}
											colors={colors}
											isSelected={selectedPosition === position.id}
											isFlipped={flippedCards.has(position.id)}
											onToggle={() => handleCardClick(position.id)}
										/>
									)
								})}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* ═══ GUIA COMPLETO DAS POSIÇÕES ═══ */}
			<div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
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

			{/* ═══ GUIA DE INTERPRETAÇÃO (SIM OU NÃO) ═══ */}
			{spread.slug === 'sim-ou-nao' && (
				<div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
					<YesNoGuide />
				</div>
			)}

			{/* ═══ GUIA DE INTERPRETAÇÃO (CONSELHO DO UNIVERSO) ═══ */}
			{spread.slug === 'conselho-do-universo' && (
				<div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
					<UniverseAdviceGuide />
				</div>
			)}

			{/* ═══ GUIA DE INTERPRETAÇÃO (CRUZ CELTA) ═══ */}
			{spread.slug === 'cruz-celta' && (
				<div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
					<CelticCrossGuide />
				</div>
			)}

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
