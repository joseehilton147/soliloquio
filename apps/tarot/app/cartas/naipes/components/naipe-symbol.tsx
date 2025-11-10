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
 * Símbolo do naipe - Átomo
 *
 * Componente burro que exibe o símbolo Unicode grande do naipe.
 * Usado no canto superior direito dos cards de naipe.
 *
 * @example
 * ```tsx
 * <NaipeSymbol symbol="♥" color="rose" />
 * ```
 */
export function NaipeSymbol({ symbol, color }: NaipeSymbolProps) {
	return (
		<span className={`text-5xl text-${color}-500/30`}>
			{symbol}
		</span>
	)
}
