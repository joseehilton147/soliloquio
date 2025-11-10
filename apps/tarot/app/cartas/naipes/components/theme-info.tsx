/**
 * Props do componente ThemeInfo
 */
interface ThemeInfoProps {
	/** Temas principais do naipe */
	theme: string
}

/**
 * Informação de temas principais - Átomo
 *
 * Componente burro que exibe os temas principais representados por um naipe.
 * Usado dentro do card de naipe para mostrar as áreas de influência.
 *
 * @example
 * ```tsx
 * <ThemeInfo theme="Emoções, relacionamentos, amor, intuição" />
 * ```
 */
export function ThemeInfo({ theme }: ThemeInfoProps) {
	return (
		<div className="space-y-2">
			<p className="text-xs font-medium text-muted-foreground">TEMAS PRINCIPAIS</p>
			<p className="text-sm text-foreground/70">
				{theme}
			</p>
		</div>
	)
}
