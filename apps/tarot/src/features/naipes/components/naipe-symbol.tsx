type NaipeSymbolProps = {
	symbol: string
	color: string
}

const SYMBOL_COLOR_CLASSES = {
	blue: 'text-blue-500/30',
	red: 'text-red-500/30',
	terra: 'text-stone-500/30',
	slate: 'text-slate-500/30',
} as const

export function NaipeSymbol({ symbol, color }: NaipeSymbolProps) {
	const colorClass = SYMBOL_COLOR_CLASSES[color as keyof typeof SYMBOL_COLOR_CLASSES]

	return (
		<span className={`text-5xl ${colorClass}`}>
			{symbol}
		</span>
	)
}
