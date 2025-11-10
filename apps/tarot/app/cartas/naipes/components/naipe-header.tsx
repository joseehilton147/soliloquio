import { Icon } from '@iconify/react'
import { NaipeSymbol } from './naipe-symbol'

/**
 * Props do componente NaipeHeader
 */
interface NaipeHeaderProps {
	/** Ícone do elemento */
	elementIcon: string
	/** Nome do naipe */
	name: string
	/** Elemento associado */
	element: string
	/** Cor do naipe (Tailwind color name) */
	color: string
	/** Classes de gradiente */
	gradient: string
	/** Classes de borda */
	borderColor: string
	/** Símbolo Unicode do naipe */
	symbol: string
}

/**
 * Header do card de naipe - Molécula
 *
 * Componente burro que exibe o cabeçalho de um naipe contendo:
 * - Ícone do elemento em círculo
 * - Nome do naipe e informações
 * - Símbolo do naipe
 *
 * @example
 * ```tsx
 * <NaipeHeader
 *   elementIcon="mdi:water"
 *   name="Copas"
 *   element="Água"
 *   color="blue"
 *   gradient="from-blue-600 to-cyan-600"
 *   borderColor="border-blue-500/30"
 *   symbol="♥"
 * />
 * ```
 */
export function NaipeHeader({
	elementIcon,
	name,
	element,
	color,
	gradient,
	borderColor,
	symbol
}: NaipeHeaderProps) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className={`inline-flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-${color}-600/20 to-${color}-600/20 border-2 ${borderColor}`}>
					<Icon icon={elementIcon} className={`size-6 text-${color}-600 dark:text-${color}-400`} />
				</div>
				<div>
					<h3 className={`text-2xl font-bold bg-gradient-to-r ${gradient} dark:from-${color}-400 dark:to-${color}-400 bg-clip-text text-transparent`}>
						{name}
					</h3>
					<p className={`text-sm text-${color}-600/80 dark:text-${color}-400/80 font-medium`}>
						14 Cartas · Elemento {element}
					</p>
				</div>
			</div>
			<NaipeSymbol symbol={symbol} color={color} />
		</div>
	)
}
