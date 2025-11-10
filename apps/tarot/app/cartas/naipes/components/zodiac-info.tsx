/**
 * Props do componente ZodiacInfo
 */
interface ZodiacInfoProps {
	/** Signos do zodíaco associados ao naipe */
	zodiac: string
	/** Cor do naipe (Tailwind color name) */
	color: string
}

/**
 * Mapeamento de cores para zodiac info
 */
const ZODIAC_COLOR_CLASSES = {
	blue: 'text-blue-700 dark:text-blue-300',
	red: 'text-red-700 dark:text-red-300',
	stone: 'text-stone-700 dark:text-stone-300',
	slate: 'text-slate-700 dark:text-slate-300',
} as const

/**
 * Informação de signos do zodíaco - Átomo
 *
 * Componente burro que exibe os signos do zodíaco associados a um naipe.
 * Usado dentro do card de naipe para mostrar a correlação astrológica.
 *
 * @example
 * ```tsx
 * <ZodiacInfo
 *   zodiac="Câncer, Escorpião, Peixes"
 *   color="blue"
 * />
 * ```
 */
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
