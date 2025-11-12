'use client'

import type { ElementColors } from './element-colors'
import type { TarotSpread } from '@workspace/core/tarot'
import { CardFront } from './card-front'
import { CardBack } from './card-back'

interface CelticCrossLayoutProps {
	spread: TarotSpread
	colors: ElementColors
	mysticalSymbol: string
	selectedPosition: string | null
	flippedCards: Set<string>
	onCardClick: (positionId: string) => void
}

/**
 * Layout da Cruz Celta usando CSS Grid
 *
 * Estrutura visual PRECISA:
 *
 *           [3 Coroa]                        [10 Desfecho]
 *              |                                   |
 * [6 Passado] [1+2 Centro] [4 Futuro]        [9 Esperanças]
 *              |                                   |
 *         [5 Fundação]                        [8 Entorno]
 *                                                  |
 *                                            [7 Consulente]
 *
 * Grid com 7 colunas e 4 rows:
 * - Coluna 4 (centro): 3, 1+2, 5 perfeitamente alinhados
 * - Coluna 7 (staff): 10, 9, 8, 7 perfeitamente alinhados
 * - Row 2 (meio): 6, 1+2, 4 perfeitamente alinhados
 */
export function CelticCrossLayout({
	spread,
	colors,
	mysticalSymbol,
	selectedPosition,
	flippedCards,
	onCardClick,
}: CelticCrossLayoutProps) {

	// Mapear posições por order (1-10)
	const positionsByOrder = spread.positions.reduce((acc, pos) => {
		acc[pos.order] = pos
		return acc
	}, {} as Record<number, typeof spread.positions[0]>)

	/**
	 * Renderiza carta individual com posicionamento absoluto
	 */
	const renderCard = (order: number, className?: string, style?: React.CSSProperties) => {
		const position = positionsByOrder[order]
		if (!position) return null

		return (
			<div className={className} style={style}>
				<CosmicCardStatic
					position={position}
					mysticalSymbol={mysticalSymbol}
					colors={colors}
					isSelected={selectedPosition === position.id}
					isFlipped={flippedCards.has(position.id)}
					onToggle={() => onCardClick(position.id)}
				/>
			</div>
		)
	}

	/**
	 * Renderiza grupo central (cartas 1 e 2)
	 * Carta 2 fica HORIZONTAL sobre a parte INFERIOR da carta 1
	 */
	const renderCenterGroup = () => {
		const pos1 = positionsByOrder[1]
		const pos2 = positionsByOrder[2]
		if (!pos1 || !pos2) return null

		return (
			<div className="relative flex items-center justify-center">
				{/* Carta 1 - Situação Atual (vertical, base - z-index menor) */}
				<div className="relative z-10">
					<CosmicCardStatic
						position={pos1}
						mysticalSymbol={mysticalSymbol}
						colors={colors}
						isSelected={selectedPosition === pos1.id}
						isFlipped={flippedCards.has(pos1.id)}
						onToggle={() => onCardClick(pos1.id)}
					/>
				</div>

				{/* Carta 2 - Desafio (horizontal, SOBRE carta 1 - z-index maior) */}
				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
					<div className="rotate-90">
						<CosmicCardStatic
							position={pos2}
							mysticalSymbol={mysticalSymbol}
							colors={colors}
							isSelected={selectedPosition === pos2.id}
							isFlipped={flippedCards.has(pos2.id)}
							onToggle={() => onCardClick(pos2.id)}
						/>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="w-full min-h-screen flex items-center justify-center p-8">
			{/* Container com posicionamento absoluto - coordenadas fixas e precisas */}
			<div className="relative" style={{ width: '1400px', height: '1400px' }}>
				{/* === CRUZ CENTRAL (eixo vertical: 3, 1+2, 5) === */}

				{/* Carta 3 - Coroa - TOPO do eixo vertical */}
				{renderCard(3, 'absolute', { left: '425px', top: '0px' })}

				{/* Cartas 1+2 - Centro - MEIO do eixo vertical */}
				<div className="absolute" style={{ left: '425px', top: '350px' }}>
					{renderCenterGroup()}
				</div>

				{/* Carta 5 - Fundação - BASE do eixo vertical */}
				{renderCard(5, 'absolute', { left: '425px', top: '700px' })}

				{/* === CRUZ HORIZONTAL (cartas ao redor do centro) === */}

				{/* Carta 6 - Passado - ESQUERDA do centro */}
				{renderCard(6, 'absolute', { left: '50px', top: '350px' })}

				{/* Carta 4 - Futuro - DIREITA do centro */}
				{renderCard(4, 'absolute', { left: '800px', top: '350px' })}

				{/* === COLUNA STAFF (eixo vertical direito: 10, 9, 8, 7) === */}

				{/* Carta 10 - Desfecho - TOPO do staff */}
				{renderCard(10, 'absolute', { left: '1100px', top: '0px' })}

				{/* Carta 9 - Esperanças */}
				{renderCard(9, 'absolute', { left: '1100px', top: '350px' })}

				{/* Carta 8 - Entorno */}
				{renderCard(8, 'absolute', { left: '1100px', top: '700px' })}

				{/* Carta 7 - Consulente - BASE do staff */}
				{renderCard(7, 'absolute', { left: '1100px', top: '1050px' })}
			</div>
		</div>
	)
}

/**
 * Variante do CosmicCard SEM positioning absoluto
 * Para uso em Grid Layouts onde o parent controla posição
 */
interface CosmicCardStaticProps {
	position: TarotSpread['positions'][number]
	mysticalSymbol: string
	colors: ElementColors
	isSelected: boolean
	isFlipped: boolean
	onToggle: () => void
}

function CosmicCardStatic({
	position,
	mysticalSymbol,
	colors,
	isSelected,
	isFlipped,
	onToggle,
}: CosmicCardStaticProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className="relative group cursor-pointer z-10"
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
			<div
				className={`relative w-48 h-64 transition-all duration-700 ${
					isFlipped ? '[transform:rotateY(180deg)]' : ''
				} ${
					isSelected ? 'scale-110 z-50' : ''
				} ${
					!isSelected && !isFlipped ? 'hover:scale-105' : ''
				}`}
				style={{ transformStyle: 'preserve-3d' }}
			>
				{/* Frente da carta (verso místico) */}
				<CardFront
					order={position.order}
					label={position.label}
					mysticalSymbol={mysticalSymbol}
					colors={colors}
					isSelected={isSelected}
				/>

				{/* Verso da carta (explicação) */}
				<CardBack
					order={position.order}
					label={position.label}
					description={position.description}
					emphasis={position.emphasis}
					colors={colors}
				/>
			</div>
		</button>
	)
}
