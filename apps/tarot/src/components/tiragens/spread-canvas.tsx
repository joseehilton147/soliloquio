'use client'

/**
 * SpreadCanvas - Canvas Místico de Visualização de Tiragens
 *
 * Componente visual que renderiza as posições das cartas em uma tiragem,
 * com efeitos místicos, conexões energéticas e interatividade.
 *
 * Design Atômico: Organismo
 */

import { Icon } from '@iconify/react'
import type { TarotSpread } from '@workspace/core/tarot'
import React, { useState } from 'react'

import { cn } from '@workspace/ui/lib/utils'

export interface SpreadCanvasProps {
	/** Tiragem a ser visualizada */
	spread: TarotSpread

	/** Modo de visualização */
	mode?: 'preview' | 'interactive' | 'reading'

	/** Mostrar números das posições */
	showNumbers?: boolean

	/** Mostrar conexões místicas entre cartas */
	showConnections?: boolean

	/** Posição selecionada (para modo interativo) */
	selectedPosition?: string

	/** Callback quando posição é clicada */
	onPositionClick?: (positionId: string) => void

	/** Classes CSS adicionais */
	className?: string
}

/**
 * SpreadCanvas - Organismo
 *
 * Canvas místico que renderiza visualmente as posições de uma tiragem de tarot.
 *
 * **Features:**
 * - Renderização responsiva baseada em coordenadas (x, y) em %
 * - Suporte a rotação de cartas
 * - Conexões místicas entre posições (linhas energéticas)
 * - Efeitos hover e interatividade
 * - Tooltips com descrições das posições
 * - Modo preview, interativo ou leitura
 *
 * **Características Místicas:**
 * - Aura pulsante nas cartas
 * - Linhas de conexão energética com gradientes
 * - Animações suaves de entrada
 * - Glow effect em posições especiais
 *
 * @example
 * <SpreadCanvas
 *   spread={CRUZ_CELTA}
 *   mode="interactive"
 *   showNumbers
 *   showConnections
 *   onPositionClick={(id) => console.log('Clicked:', id)}
 * />
 */
export function SpreadCanvas({
	spread,
	mode = 'preview',
	showNumbers = true,
	showConnections = true,
	selectedPosition,
	onPositionClick,
	className,
}: SpreadCanvasProps) {
	const [hoveredPosition, setHoveredPosition] = useState<string | null>(null)

	/**
	 * Renderiza as conexões místicas entre posições
	 */
	const renderConnections = () => {
		if (!showConnections) return null

		const connections: React.ReactElement[] = []

		spread.positions.forEach((position) => {
			if (!position.connectedTo) return

			position.connectedTo.forEach((targetId) => {
				const target = spread.positions.find((p) => p.id === targetId)
				if (!target) return

				// Calcular coordenadas das linhas
				const x1 = position.x
				const y1 = position.y
				const x2 = target.x
				const y2 = target.y

				// ID único para o gradiente desta conexão
				const gradientId = `connection-${position.id}-${targetId}`

				connections.push(
					<svg
						key={`${position.id}-${targetId}`}
						className="absolute inset-0 pointer-events-none"
						style={{ width: '100%', height: '100%' }}
					>
						<defs>
							<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
								<stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="0.5" />
								<stop offset="100%" stopColor="rgb(124, 58, 237)" stopOpacity="0.3" />
							</linearGradient>
						</defs>
						<line
							x1={`${x1}%`}
							y1={`${y1}%`}
							x2={`${x2}%`}
							y2={`${y2}%`}
							stroke={`url(#${gradientId})`}
							strokeWidth="2"
							strokeDasharray="5,5"
							className="animate-pulse"
							style={{
								animationDuration: '3s',
								filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.4))',
							}}
						/>
					</svg>,
				)
			})
		})

		return <div className="absolute inset-0">{connections}</div>
	}

	/**
	 * Renderiza uma posição de carta individual
	 */
	const renderPosition = (position: typeof spread.positions[0]) => {
		const isSelected = selectedPosition === position.id
		const isHovered = hoveredPosition === position.id
		const isInteractive = mode === 'interactive' || mode === 'reading'

		// Classes de ênfase
		const emphasisClasses = {
			center: 'ring-4 ring-purple-500/50 scale-110',
			top: 'ring-2 ring-violet-500/40',
			bottom: 'ring-2 ring-indigo-500/40',
			left: 'ring-2 ring-blue-500/40',
			right: 'ring-2 ring-amber-500/40',
			highlight: 'ring-2 ring-pink-500/40',
		}

		return (
			<div
				key={position.id}
				className="absolute"
				style={{
					left: `${position.x}%`,
					top: `${position.y}%`,
					transform: 'translate(-50%, -50%)',
				}}
				onMouseEnter={() => setHoveredPosition(position.id)}
				onMouseLeave={() => setHoveredPosition(null)}
				onClick={() => isInteractive && onPositionClick?.(position.id)}
			>
				{/* Aura Mística */}
				{(isHovered || isSelected) && (
					<div
						className="absolute inset-0 -m-4 rounded-full bg-gradient-to-br from-purple-500/20 via-violet-500/15 to-indigo-500/20 blur-xl animate-pulse pointer-events-none"
						style={{ animationDuration: '2s' }}
					/>
				)}

				{/* Carta (Placeholder visual) */}
				<div
					className={cn(
						'relative w-20 h-28 rounded-lg border-2 border-purple-500/30 bg-gradient-to-br from-purple-950/50 via-violet-950/50 to-indigo-950/50 backdrop-blur-sm',
						'flex flex-col items-center justify-center gap-1',
						'transition-all duration-300',
						isInteractive && 'cursor-pointer hover:scale-105 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/30',
						isSelected && 'scale-105 border-purple-500 shadow-lg shadow-purple-500/50',
						position.emphasis && emphasisClasses[position.emphasis],
					)}
					style={{
						transform: position.rotation ? `rotate(${position.rotation}deg)` : undefined,
					}}
				>
					{/* Número da Posição */}
					{showNumbers && (
						<div className="absolute -top-2 -left-2 size-6 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
							{position.order}
						</div>
					)}

					{/* Ícone Central */}
					<Icon icon="game-icons:card-random" className="size-8 text-purple-300/50" />

					{/* Label da Posição */}
					<span className="text-[10px] text-center text-purple-200/70 font-medium px-1 leading-tight">
						{position.label.split(' ').slice(0, 2).join(' ')}
					</span>

					{/* Glow effect para posições especiais */}
					{position.emphasis === 'center' && (
						<div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-transparent pointer-events-none" />
					)}
				</div>

				{/* Tooltip com Descrição */}
				{isHovered && (
					<div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 z-10 min-w-[200px] max-w-[280px] animate-in fade-in slide-in-from-top-2 duration-200">
						<div className="relative rounded-xl p-3 bg-gradient-to-br from-purple-950/98 via-violet-950/98 to-indigo-950/98 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/30">
							{/* Seta indicadora */}
							<div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-purple-500/30" />

							<div className="space-y-1.5">
								<div className="flex items-center gap-2">
									<div className="size-5 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center text-[10px] font-bold text-white">
										{position.order}
									</div>
									<h4 className="text-sm font-semibold text-purple-200">{position.label}</h4>
								</div>
								<p className="text-xs text-purple-300/80 leading-relaxed">{position.description}</p>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	}

	return (
		<div
			className={cn(
				'relative w-full aspect-[4/3] rounded-2xl overflow-hidden',
				'border border-purple-500/20 bg-gradient-to-br from-purple-950/20 via-violet-950/10 to-indigo-950/20',
				className,
			)}
		>
			{/* Background Místico */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Nebulosa sutil */}
				<div className="absolute inset-0 bg-gradient-radial from-purple-900/5 via-transparent to-transparent" />

				{/* Partículas místicas (menos para não poluir) */}
				{Array.from({ length: 8 }).map((_, i) => (
					<div
						key={i}
						className="absolute size-1 rounded-full bg-purple-400/10 animate-float"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							animationDuration: `${10 + Math.random() * 10}s`,
						}}
					/>
				))}
			</div>

			{/* Conexões Energéticas */}
			{renderConnections()}

			{/* Posições das Cartas */}
			<div className="relative size-full">{spread.positions.map(renderPosition)}</div>

			{/* Info da Tiragem (canto superior) */}
			<div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/80 backdrop-blur-sm border border-purple-500/30">
				{spread.icon && <Icon icon={spread.icon} className="size-4 text-purple-400" />}
				<span className="text-sm font-medium text-purple-200">{spread.name}</span>
				<span className="text-xs text-purple-400/60">({spread.cardCount} cartas)</span>
			</div>

			{/* Dificuldade (canto superior direito) */}
			{spread.difficulty && (
				<div className="absolute top-4 right-4 flex items-center gap-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<Icon
							key={i}
							icon="lucide:star"
							className={cn(
								'size-3',
								i < spread.difficulty! ? 'text-purple-500 fill-purple-500' : 'text-purple-500/20',
							)}
						/>
					))}
				</div>
			)}
		</div>
	)
}
