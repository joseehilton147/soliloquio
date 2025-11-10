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
	return (
		<div className="space-y-2 pt-3 border-t border-border/40">
			<p className="text-xs font-medium text-muted-foreground">SIGNOS ASSOCIADOS</p>
			<p className={`text-sm font-medium text-${color}-700 dark:text-${color}-300`}>
				{zodiac}
			</p>
		</div>
	)
}
