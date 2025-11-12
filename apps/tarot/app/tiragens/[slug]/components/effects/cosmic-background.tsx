/**
 * Cosmic Background Component
 *
 * Background cósmico imersivo com estrelas flutuantes, nebulosas coloridas
 * e círculos místicos concêntricos que rotacionam lentamente.
 *
 * @module CosmicBackground
 */

import type { ElementColors } from '../../element-colors'

/**
 * Props do componente CosmicBackground
 *
 * @interface CosmicBackgroundProps
 * @property {ElementColors} colors - Paleta de cores do elemento atual
 * @property {number} starCount - Quantidade de estrelas no campo (padrão: 150)
 */
interface CosmicBackgroundProps {
	/** Paleta de cores baseada no elemento (air, water, fire, earth, spirit) */
	colors: ElementColors
	/** Quantidade de estrelas no campo cósmico */
	starCount?: number
}

/**
 * Componente de background cósmico com estrelas, nebulosas e círculos místicos
 *
 * Renderiza um background profundo e imersivo que cria a atmosfera mística
 * da mesa de tarot. Inclui:
 * - Campo estrelado com estrelas pulsantes de tamanhos variados
 * - Nebulosas coloridas com blur e animação de pulso
 * - Círculos concêntricos místicos que rotacionam em direções opostas
 *
 * @example
 * ```tsx
 * const colors = ELEMENT_COLORS.spirit
 * <CosmicBackground colors={colors} starCount={150} />
 * ```
 *
 * @param {CosmicBackgroundProps} props - Propriedades do componente
 * @returns {JSX.Element} Background cósmico renderizado
 */
export function CosmicBackground({ colors, starCount = 150 }: CosmicBackgroundProps) {
	return (
		<div className="absolute inset-0 rounded-3xl overflow-hidden"
			style={{
				background: `
					radial-gradient(ellipse at 30% 20%, ${colors.smoke} 0%, transparent 50%),
					radial-gradient(ellipse at 70% 80%, ${colors.smoke} 0%, transparent 50%),
					radial-gradient(circle at center, rgba(10, 10, 30, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%)
				`,
			}}
		>
			{/* Campo estrelado */}
			<div className="absolute inset-0">
				{Array.from({ length: starCount }).map((_, i) => {
					const size = Math.random() * 2 + 0.5
					const opacity = Math.random() * 0.8 + 0.2
					const delay = Math.random() * 5
					return (
						<div
							key={`star-${i}`}
							className="absolute rounded-full bg-white animate-pulse"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								width: `${size}px`,
								height: `${size}px`,
								opacity: opacity,
								animationDelay: `${delay}s`,
								animationDuration: `${3 + Math.random() * 4}s`,
								boxShadow: `0 0 ${size * 3}px rgba(255, 255, 255, ${opacity * 0.6})`,
							}}
						/>
					)
				})}
			</div>

			{/* Nebulosas coloridas */}
			<div className="absolute top-1/4 left-1/4 size-96 rounded-full blur-[120px] opacity-20 animate-pulse [animation-duration:8s]"
				style={{
					background: `radial-gradient(circle, rgba(${colors.rgb}, 0.6) 0%, transparent 70%)`,
				}}
			/>
			<div className="absolute bottom-1/4 right-1/4 size-80 rounded-full blur-[100px] opacity-15 animate-pulse [animation-duration:10s] [animation-delay:2s]"
				style={{
					background: `radial-gradient(circle, rgba(${colors.rgb}, 0.5) 0%, transparent 70%)`,
				}}
			/>

			{/* Círculos místicos concêntricos */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<div className="absolute size-[900px] rounded-full border opacity-3 animate-spin-slow [animation-duration:90s]"
					style={{ borderColor: `rgba(${colors.rgb}, 0.4)` }}
				/>
				<div className="absolute size-[700px] rounded-full border opacity-5 animate-spin-slow [animation-duration:70s] [animation-direction:reverse]"
					style={{ borderColor: `rgba(${colors.rgb}, 0.5)` }}
				/>
				<div className="absolute size-[500px] rounded-full border opacity-3 animate-spin-slow [animation-duration:50s]"
					style={{ borderColor: `rgba(${colors.rgb}, 0.4)` }}
				/>
			</div>
		</div>
	)
}
