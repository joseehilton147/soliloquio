import { Icon } from '@iconify/react'
import type { ReactNode } from 'react'

type EducationalSectionProps = {
	title: string
	icon?: string
	gradientFrom: string
	gradientTo: string
	children: ReactNode
}

export function EducationalSection({
	title,
	icon,
	gradientFrom,
	gradientTo,
	children,
}: EducationalSectionProps) {
	return (
		<div className={`max-w-4xl mx-auto rounded-2xl border-2 border-${gradientFrom}-500/30 bg-gradient-to-br from-${gradientFrom}-500/5 via-${gradientTo}-500/5 to-${gradientFrom}-500/5 p-8 backdrop-blur-sm`}>
			{icon
				? (
					<div className="flex items-start gap-4">
						<div className={`inline-flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-${gradientFrom}-600/20 to-${gradientTo}-600/20 border-2 border-${gradientFrom}-500/30 flex-shrink-0`}>
							<Icon icon={icon} className={`size-6 text-${gradientFrom}-600 dark:text-${gradientFrom}-400`} />
						</div>
						<div className="space-y-3 flex-1">
							<h2 className="text-xl font-semibold text-foreground">
								{title}
							</h2>
							<div className="text-foreground/80 leading-relaxed space-y-3">
								{children}
							</div>
						</div>
					</div>
				)
				: (
					<div className="space-y-4">
						<h3 className={`text-xl font-bold bg-gradient-to-r from-${gradientFrom}-600 to-${gradientTo}-600 dark:from-${gradientFrom}-400 dark:to-${gradientTo}-400 bg-clip-text text-transparent`}>
							{title}
						</h3>
						<div className="text-foreground/80 leading-relaxed space-y-3">
							{children}
						</div>
					</div>
				)}
		</div>
	)
}
