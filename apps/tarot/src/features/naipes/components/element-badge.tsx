import { Icon } from '@iconify/react'

type ElementBadgeProps = {
	icon: string
	element: string
	color: string
	borderColor: string
}

const ELEMENT_COLOR_CLASSES = {
	blue: {
		bg: 'bg-blue-500/10',
		icon: 'text-blue-600 dark:text-blue-400',
		text: 'text-blue-700 dark:text-blue-300',
	},
	red: {
		bg: 'bg-red-500/10',
		icon: 'text-red-600 dark:text-red-400',
		text: 'text-red-700 dark:text-red-300',
	},
	amber: {
		bg: 'bg-amber-500/10',
		icon: 'text-amber-600 dark:text-amber-400',
		text: 'text-amber-700 dark:text-amber-300',
	},
	terra: {
		bg: 'bg-stone-500/10',
		icon: 'text-stone-600 dark:text-stone-400',
		text: 'text-stone-700 dark:text-stone-300',
	},
	slate: {
		bg: 'bg-slate-500/10',
		icon: 'text-slate-600 dark:text-slate-400',
		text: 'text-slate-700 dark:text-slate-300',
	},
	purple: {
		bg: 'bg-purple-500/10',
		icon: 'text-purple-600 dark:text-purple-400',
		text: 'text-purple-700 dark:text-purple-300',
	},
} as const

export function ElementBadge({ icon, element, color, borderColor }: ElementBadgeProps) {
	const colorClasses = ELEMENT_COLOR_CLASSES[color as keyof typeof ELEMENT_COLOR_CLASSES]

	return (
		<div className={`flex items-center gap-2 p-3 rounded-lg ${colorClasses.bg} border ${borderColor}`}>
			<Icon icon={icon} className={`size-5 ${colorClasses.icon}`} />
			<div>
				<p className="text-xs text-muted-foreground">Elemento</p>
				<p className={`text-sm font-semibold ${colorClasses.text}`}>
					{element}
				</p>
			</div>
		</div>
	)
}
