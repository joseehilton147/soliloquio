import { Icon } from '@iconify/react'

/**
 * Props do componente NaipeCTA
 */
interface NaipeCTAProps {
	/** Nome do naipe para exibir no texto */
	name: string
	/** Cor do naipe (Tailwind color name) */
	color: string
}

/**
 * Call-to-Action do naipe - Átomo
 *
 * Componente burro que exibe o botão/link de "Explorar" com animação.
 * Usado no rodapé dos cards de naipe para incentivar navegação.
 *
 * @example
 * ```tsx
 * <NaipeCTA name="Copas" color="blue" />
 * ```
 */
export function NaipeCTA({ name, color }: NaipeCTAProps) {
	return (
		<div className="pt-2 flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
			<span className={`text-${color}-600 dark:text-${color}-400`}>
				Explorar {name}
			</span>
			<Icon icon="lucide:arrow-right" className={`size-4 text-${color}-600 dark:text-${color}-400`} />
		</div>
	)
}
