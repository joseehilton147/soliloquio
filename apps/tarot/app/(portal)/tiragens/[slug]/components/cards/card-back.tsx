/**
 * Card Back Component
 *
 * Renderiza o verso da carta de tarot quando flippada, mostrando
 * a explicação detalhada da posição na tiragem.
 *
 * @module CardBack
 */

import { Icon } from '@iconify/react'
import { cn } from '@workspace/ui/lib/utils'
import type { ElementColors } from '../../element-colors'

/**
 * Props do componente CardBack
 */
interface CardBackProps {
	/** Número da ordem da posição na tiragem */
	order: number
	/** Nome/label descritivo da posição */
	label: string
	/** Explicação detalhada do significado da posição */
	description: string
	/** Indicador visual especial */
	emphasis?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'highlight'
	/** Paleta de cores baseada no elemento */
	colors: ElementColors
}

/**
 * Componente do verso da carta (explicação da posição)
 *
 * Renderiza o lado informativo da carta quando ela é virada (flippada).
 * Contém:
 * - Número da posição em círculo menor
 * - Título/label da posição
 * - Descrição detalhada do significado
 * - Ícone de sparkles se tiver ênfase
 *
 * O componente usa `rotate-y-180` para ficar no verso correto da carta 3D.
 */
export function CardBack({ order, label, description, emphasis, colors }: CardBackProps) {
	return (
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
					{order}
				</div>

				{/* Título */}
				<h4 className="text-sm font-serif font-bold"
					style={{ color: `rgba(${colors.rgb}, 1)` }}
				>
					{label}
				</h4>

				{/* Descrição */}
				<p className="text-xs text-white/80 leading-relaxed font-light"
					style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
				>
					{description}
				</p>

				{/* Ênfase */}
				{emphasis && (
					<Icon icon="lucide:sparkles" className="size-4 opacity-60"
						style={{ color: `rgba(${colors.rgb}, 1)` }}
					/>
				)}
			</div>
		</div>
	)
}
