/**
 * Props do componente NaipeSymbol
 */
interface NaipeSymbolProps {
	/** Símbolo Unicode do naipe (♥ ♣ ♦ ♠) */
	symbol: string
	/** Cor do naipe (Tailwind color name) */
	color: string
}

/**
 * Mapeamento de cores para símbolos
 */
const SYMBOL_COLOR_CLASSES = {
	blue: 'text-blue-500/30',
	red: 'text-red-500/30',
	terra: 'text-yellow-500/30',
	slate: 'text-slate-500/30',
} as const

/**
 * Símbolo do naipe - Átomo
 *
 * Componente burro que exibe o símbolo Unicode grande do naipe.
 * Usado no canto superior direito dos cards de naipe.
 *
 * @example
 * ```tsx
 * <NaipeSymbol symbol="♥" color="blue" />
 * ```
 */
export function NaipeSymbol({ symbol, color }: NaipeSymbolProps) {
	const colorClass = SYMBOL_COLOR_CLASSES[color as keyof typeof SYMBOL_COLOR_CLASSES]

	return (
		<span className={`text-5xl ${colorClass}`}>
			{symbol}
		</span>
	)
}
