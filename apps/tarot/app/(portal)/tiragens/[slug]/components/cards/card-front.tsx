/**
 * Card Front Component
 *
 * Renderiza o verso místico da carta de tarot (lado que fica virado para baixo).
 * Inclui ornamentos decorativos, número da posição, símbolo místico e label.
 *
 * @module CardFront
 */

import { Icon } from '@iconify/react'
import { cn } from '@workspace/ui/lib/utils'
import type { ElementColorConfig } from '@/shared/constants/element-colors'

type ElementColors = Pick<ElementColorConfig, 'rgb' | 'smoke' | 'neonGlow'> & { glow: string }

/**
 * Props do componente CardFront
 *
 * @interface CardFrontProps
 * @property {number} order - Número da ordem da posição (1, 2, 3...)
 * @property {string} label - Nome/label da posição
 * @property {string} mysticalSymbol - Ícone místico a ser exibido
 * @property {ElementColors} colors - Paleta de cores do elemento
 * @property {boolean} isSelected - Se a carta está selecionada
 */
interface CardFrontProps {
	/** Número da ordem da posição na tiragem */
	order: number
	/** Nome/label descritivo da posição */
	label: string
	/** Ícone do Iconify para símbolo místico */
	mysticalSymbol: string
	/** Paleta de cores baseada no elemento */
	colors: ElementColors
	/** Indica se a carta está atualmente selecionada */
	isSelected: boolean
}

/**
 * Componente da frente da carta (verso místico)
 *
 * Renderiza o lado decorativo da carta com:
 * - Ornamentos superiores e inferiores
 * - Número da posição em círculo ornamentado
 * - Símbolo místico animado com glow
 * - Label da posição
 * - Cantos decorativos
 * - Efeito de glow pulsante quando selecionada
 *
 * @example
 * ```tsx
 * <CardFront
 *   order={1}
 *   label="Situação Atual"
 *   mysticalSymbol="game-icons:crystal-ball"
 *   colors={ELEMENT_COLORS.spirit}
 *   isSelected={true}
 * />
 * ```
 *
 * @param {CardFrontProps} props - Propriedades do componente
 * @returns {JSX.Element} Frente da carta renderizada
 */
export function CardFront({ order, label, mysticalSymbol, colors, isSelected }: CardFrontProps) {
	return (
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
				{/* Ornamento superior */}
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
							{order}
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
						<Icon icon={mysticalSymbol}
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
						{label}
					</p>
				</div>

				{/* Ornamento inferior */}
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
	)
}
