/**
 * Energy Connections Component
 *
 * Renderiza linhas SVG animadas que conectam posições de cartas relacionadas,
 * criando uma rede energética visual que mostra relações entre as posições.
 *
 * @module EnergyConnections
 */

import type { TarotSpread } from '@workspace/core/tarot'
import type { ElementColors, ElementType } from './element-colors'

/**
 * Props do componente EnergyConnections
 *
 * @interface EnergyConnectionsProps
 * @property {TarotSpread['positions']} positions - Array de posições da tiragem
 * @property {ElementColors} colors - Paleta de cores do elemento
 * @property {ElementType} element - Tipo do elemento para ID único do gradiente
 */
interface EnergyConnectionsProps {
	/** Posições da tiragem com coordenadas e conexões */
	positions: TarotSpread['positions']
	/** Paleta de cores baseada no elemento */
	colors: ElementColors
	/** Tipo do elemento (air, water, fire, earth, spirit) */
	element: ElementType
}

/**
 * Componente de linhas de conexão energéticas entre cartas
 *
 * Renderiza um SVG overlay com linhas tracejadas e pulsantes que conectam
 * cartas relacionadas na tiragem. Cada linha usa um gradiente baseado nas
 * cores do elemento e possui animação de pulso para efeito místico.
 *
 * As conexões são definidas pela propriedade `connectedTo` de cada posição,
 * que contém um array de IDs de posições conectadas.
 *
 * @example
 * ```tsx
 * const positions = [
 *   { id: '1', x: 30, y: 50, connectedTo: ['2', '3'], ... },
 *   { id: '2', x: 50, y: 30, connectedTo: [], ... },
 *   { id: '3', x: 70, y: 50, connectedTo: [], ... },
 * ]
 * <EnergyConnections
 *   positions={positions}
 *   colors={ELEMENT_COLORS.spirit}
 *   element="spirit"
 * />
 * ```
 *
 * @param {EnergyConnectionsProps} props - Propriedades do componente
 * @returns {JSX.Element} SVG com linhas de conexão renderizadas
 */
export function EnergyConnections({ positions, colors, element }: EnergyConnectionsProps) {
	return (
		<svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
			<defs>
				{/* Gradiente místico para as linhas de conexão */}
				<linearGradient id={`connection-gradient-${element}`} x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style={{ stopColor: `rgba(${colors.rgb}, 0.4)`, stopOpacity: 0.6 }} />
					<stop offset="50%" style={{ stopColor: `rgba(${colors.rgb}, 0.6)`, stopOpacity: 0.8 }} />
					<stop offset="100%" style={{ stopColor: `rgba(${colors.rgb}, 0.4)`, stopOpacity: 0.6 }} />
				</linearGradient>
			</defs>

			{/* Renderiza todas as conexões entre cartas */}
			{positions.map((position) =>
				position.connectedTo?.map((targetId) => {
					const target = positions.find((p) => p.id === targetId)
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
	)
}
