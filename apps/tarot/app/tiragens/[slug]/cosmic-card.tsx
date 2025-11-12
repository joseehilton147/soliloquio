/**
 * Cosmic Card Component
 *
 * Carta de tarot interativa com efeito de flip 3D, aura mística e
 * animações. Combina CardFront, CardBack e CardTooltip.
 *
 * @module CosmicCard
 */

import type { TarotSpread } from '@workspace/core/tarot'
import { cn } from '@workspace/ui/lib/utils'
import { CardBack } from './card-back'
import { CardFront } from './card-front'
import { CardTooltip } from './card-tooltip'
import type { ElementColors } from './element-colors'

/**
 * Props do componente CosmicCard
 *
 * @interface CosmicCardProps
 * @property {TarotSpread['positions'][number]} position - Dados da posição da carta
 * @property {string} mysticalSymbol - Ícone místico para o elemento
 * @property {ElementColors} colors - Paleta de cores do elemento
 * @property {boolean} isSelected - Se a carta está selecionada
 * @property {boolean} isFlipped - Se a carta está virada (mostrando verso)
 * @property {() => void} onToggle - Callback ao clicar na carta
 */
interface CosmicCardProps {
	/** Dados completos da posição (id, label, descrição, coordenadas, etc) */
	position: TarotSpread['positions'][number]
	/** Ícone do Iconify para símbolo místico */
	mysticalSymbol: string
	/** Paleta de cores baseada no elemento */
	colors: ElementColors
	/** Indica se a carta está atualmente selecionada */
	isSelected: boolean
	/** Indica se a carta está virada (mostrando explicação) */
	isFlipped: boolean
	/** Função chamada ao clicar na carta */
	onToggle: () => void
}

/**
 * Componente de carta cósmica interativa com flip 3D
 *
 * Renderiza uma carta de tarot completa e interativa que:
 * - Posiciona-se no cosmos baseado em coordenadas x/y da posição
 * - Rotaciona baseado na propriedade rotation
 * - Exibe aura mística quando selecionada ou flippada
 * - Faz flip 3D ao ser clicada
 * - Mostra tooltip ao hover (quando não flippada)
 * - Escala ao hover e quando selecionada
 *
 * A carta usa perspectiva 3D CSS para criar o efeito de flip realista.
 *
 * @example
 * ```tsx
 * const position = {
 *   id: 'pos-1',
 *   order: 1,
 *   label: 'Passado',
 *   description: 'Eventos que levaram à situação atual',
 *   x: 30,
 *   y: 50,
 *   rotation: 5,
 *   emphasis: true,
 *   connectedTo: ['pos-2']
 * }
 *
 * <CosmicCard
 *   position={position}
 *   mysticalSymbol="game-icons:crystal-ball"
 *   colors={ELEMENT_COLORS.spirit}
 *   isSelected={selectedId === 'pos-1'}
 *   isFlipped={flippedIds.has('pos-1')}
 *   onToggle={() => handleCardClick('pos-1')}
 * />
 * ```
 *
 * @param {CosmicCardProps} props - Propriedades do componente
 * @returns {JSX.Element} Carta cósmica renderizada
 */
export function CosmicCard({
	position,
	mysticalSymbol,
	colors,
	isSelected,
	isFlipped,
	onToggle,
}: CosmicCardProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className="absolute group cursor-pointer z-10"
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
				'relative w-48 h-64 transition-all duration-700 preserve-3d',
				isFlipped && 'rotate-y-180',
				isSelected && 'scale-110 z-50',
				!isSelected && !isFlipped && 'hover:scale-105'
			)}
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

			{/* Tooltip ao hover (apenas quando não flippado) */}
			<CardTooltip
				label={position.label}
				colors={colors}
				show={!isFlipped}
			/>
		</button>
	)
}
