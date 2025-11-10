import { Icon } from '@iconify/react'

/**
 * Props do componente ElementBadge
 */
interface ElementBadgeProps {
	/** Ícone do elemento (Iconify) */
	icon: string
	/** Nome do elemento */
	element: string
	/** Cor do naipe (Tailwind color name) */
	color: string
	/** Classes de borda customizadas */
	borderColor: string
}

/**
 * Badge de elemento - Átomo
 *
 * Componente burro que exibe o badge de um elemento com ícone e nome.
 * Usado para mostrar qual elemento (Água, Fogo, Terra, Ar) está associado ao naipe.
 *
 * @example
 * ```tsx
 * <ElementBadge
 *   icon="mdi:water"
 *   element="Água"
 *   color="rose"
 *   borderColor="border-rose-500/30"
 * />
 * ```
 */
export function ElementBadge({ icon, element, color, borderColor }: ElementBadgeProps) {
	return (
		<div className={`flex items-center gap-2 p-3 rounded-lg bg-${color}-500/10 border ${borderColor}`}>
			<Icon icon={icon} className={`size-5 text-${color}-600 dark:text-${color}-400`} />
			<div>
				<p className="text-xs text-muted-foreground">Elemento</p>
				<p className={`text-sm font-semibold text-${color}-700 dark:text-${color}-300`}>
					{element}
				</p>
			</div>
		</div>
	)
}
