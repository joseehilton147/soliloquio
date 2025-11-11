import { Icon } from '@iconify/react'
import { NaipeSymbol } from './naipe-symbol'

/**
 * Props do componente NaipeHeader
 */
interface NaipeHeaderProps {
	/** Ícone do elemento */
	elementIcon: string
	/** Nome do naipe */
	name: string
	/** Elemento associado */
	element: string
	/** Cor do naipe (Tailwind color name) */
	color: string
	/** Classes de gradiente */
	gradient: string
	/** Classes de borda */
	borderColor: string
	/** Símbolo Unicode do naipe */
	symbol: string
}

/**
 * Mapeamento de cores para classes Tailwind
 * Necessário para garantir que o JIT compiler detecte todas as classes
 * Sincronizado com element-colors.ts
 */
const COLOR_CLASSES = {
	blue: {
		icon: 'text-blue-600 dark:text-blue-400',
		bg: 'bg-gradient-to-br from-blue-600/20 to-blue-600/20',
		text: 'text-blue-600/80 dark:text-blue-400/80',
		gradientDark: 'dark:from-blue-400 dark:to-blue-400',
	},
	red: {
		icon: 'text-red-600 dark:text-red-400',
		bg: 'bg-gradient-to-br from-red-600/20 to-red-600/20',
		text: 'text-red-600/80 dark:text-red-400/80',
		gradientDark: 'dark:from-red-400 dark:to-red-400',
	},
	amber: {
		icon: 'text-amber-600 dark:text-amber-400',
		bg: 'bg-gradient-to-br from-amber-600/20 to-amber-600/20',
		text: 'text-amber-600/80 dark:text-amber-400/80',
		gradientDark: 'dark:from-amber-400 dark:to-amber-400',
	},
	terra: {
		icon: 'text-stone-600 dark:text-stone-400',
		bg: 'bg-gradient-to-br from-stone-600/20 to-amber-600/20',
		text: 'text-stone-600/80 dark:text-stone-400/80',
		gradientDark: 'dark:from-stone-400 dark:to-amber-400',
	},
	slate: {
		icon: 'text-slate-600 dark:text-slate-400',
		bg: 'bg-gradient-to-br from-slate-600/20 to-slate-600/20',
		text: 'text-slate-600/80 dark:text-slate-400/80',
		gradientDark: 'dark:from-slate-400 dark:to-slate-400',
	},
	purple: {
		icon: 'text-purple-600 dark:text-purple-400',
		bg: 'bg-gradient-to-br from-purple-600/20 to-purple-600/20',
		text: 'text-purple-600/80 dark:text-purple-400/80',
		gradientDark: 'dark:from-purple-400 dark:to-purple-400',
	},
} as const

/**
 * Header do card de naipe - Molécula
 *
 * Componente burro que exibe o cabeçalho de um naipe contendo:
 * - Ícone do elemento em círculo
 * - Nome do naipe e informações
 * - Símbolo do naipe
 *
 * @example
 * ```tsx
 * <NaipeHeader
 *   elementIcon="mdi:water"
 *   name="Copas"
 *   element="Água"
 *   color="blue"
 *   gradient="from-blue-600 to-cyan-600"
 *   borderColor="border-blue-500/30"
 *   symbol="♥"
 * />
 * ```
 */
export function NaipeHeader({
	elementIcon,
	name,
	element,
	color,
	gradient,
	borderColor,
	symbol
}: NaipeHeaderProps) {
	const colorClasses = COLOR_CLASSES[color as keyof typeof COLOR_CLASSES]

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className={`inline-flex items-center justify-center size-12 rounded-full ${colorClasses.bg} border-2 ${borderColor}`}>
					<Icon icon={elementIcon} className={`size-6 ${colorClasses.icon}`} />
				</div>
				<div>
					<h3 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradient} ${colorClasses.gradientDark} bg-clip-text text-transparent`}>
						{name}
					</h3>
					<p className={`text-base ${colorClasses.text} font-medium`}>
						14 Cartas · Elemento {element}
					</p>
				</div>
			</div>
			<NaipeSymbol symbol={symbol} color={color} />
		</div>
	)
}
