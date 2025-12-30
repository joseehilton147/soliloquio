import { Icon } from '@iconify/react'

type NaipeCTAProps = {
	name: string
	color: string
}

const CTA_COLOR_CLASSES = {
	blue: 'text-blue-600 dark:text-blue-400',
	red: 'text-red-600 dark:text-red-400',
	terra: 'text-stone-600 dark:text-stone-400',
	slate: 'text-slate-600 dark:text-slate-400',
} as const

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
