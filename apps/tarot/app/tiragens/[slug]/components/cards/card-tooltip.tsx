/**
 * Card Tooltip Component
 *
 * Tooltip que aparece ao passar o mouse sobre uma carta não-flippada,
 * mostrando o label da posição.
 *
 * @module CardTooltip
 */

import { cn } from '@workspace/ui/lib/utils'

import type { ElementColors } from '../../../element-colors'

/**
 * Props do componente CardTooltip
 *
 * @interface CardTooltipProps
 * @property {string} label - Texto a ser exibido no tooltip
 * @property {ElementColors} colors - Paleta de cores do elemento
 * @property {boolean} show - Se o tooltip deve ser exibido
 */
interface CardTooltipProps {
	/** Texto do label a ser mostrado */
	label: string
	/** Paleta de cores baseada no elemento */
	colors: ElementColors
	/** Controla visibilidade do tooltip */
	show: boolean
}

/**
 * Componente de tooltip para cartas de tarot
 *
 * Renderiza um tooltip estilizado que aparece acima da carta quando
 * o usuário passa o mouse. Inclui:
 * - Label da posição
 * - Borda colorida baseada no elemento
 * - Seta apontando para a carta
 * - Animação de fade in/out
 *
 * O tooltip só é visível quando `show` é true e a carta não está flippada.
 *
 * @example
 * ```tsx
 * <CardTooltip
 *   label="Situação Atual"
 *   colors={ELEMENT_COLORS.water}
 *   show={isHovering && !isFlipped}
 * />
 * ```
 *
 * @param {CardTooltipProps} props - Propriedades do componente
 * @returns {JSX.Element} Tooltip renderizado
 */
export function CardTooltip({ label, colors, show }: CardTooltipProps) {
	if (!show) return null

	return (
		<div className={cn(
			'absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg border whitespace-nowrap',
			'pointer-events-none z-50',
		)}
		style={{
			borderColor: `rgba(${colors.rgb}, 0.6)`,
			background: 'rgba(0,0,0,0.95)',
			boxShadow: colors.glow,
		}}
		>
			<p className="text-xs font-medium text-white">{label}</p>
			{/* Seta do tooltip */}
			<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45"
				style={{
					borderRight: `1px solid rgba(${colors.rgb}, 0.6)`,
					borderBottom: `1px solid rgba(${colors.rgb}, 0.6)`,
					background: 'rgba(0,0,0,0.95)',
				}}
			/>
		</div>
	)
}
