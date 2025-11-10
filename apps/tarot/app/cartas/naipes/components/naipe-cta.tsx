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
 * Mapeamento de cores para CTA
 */
const CTA_COLOR_CLASSES = {
	blue: 'text-blue-600 dark:text-blue-400',
	red: 'text-red-600 dark:text-red-400',
	terra: 'text-yellow-600 dark:text-yellow-400',
	slate: 'text-slate-600 dark:text-slate-400',
} as const

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
	const colorClass = CTA_COLOR_CLASSES[color as keyof typeof CTA_COLOR_CLASSES]

	return (
		<div className="pt-2 flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
			<span className={colorClass}>
				Explorar {name}
			</span>
			<Icon icon="lucide:arrow-right" className={`size-4 ${colorClass}`} />
		</div>
	)
}
