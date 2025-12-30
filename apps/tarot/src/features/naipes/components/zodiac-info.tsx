type ZodiacInfoProps = {
	zodiac: string
	color: string
}

const ZODIAC_COLOR_CLASSES = {
	blue: 'text-blue-700 dark:text-blue-300',
	red: 'text-red-700 dark:text-red-300',
	terra: 'text-stone-700 dark:text-stone-300',
	slate: 'text-slate-700 dark:text-slate-300',
} as const

export function ZodiacInfo({ zodiac, color }: ZodiacInfoProps) {
	const colorClass = ZODIAC_COLOR_CLASSES[color as keyof typeof ZODIAC_COLOR_CLASSES]

	return (
		<div className="space-y-2 pt-3 border-t border-border/40">
			<p className="text-xs font-medium text-muted-foreground">SIGNOS ASSOCIADOS</p>
			<p className={`text-sm font-medium ${colorClass}`}>
				{zodiac}
			</p>
		</div>
	)
}
