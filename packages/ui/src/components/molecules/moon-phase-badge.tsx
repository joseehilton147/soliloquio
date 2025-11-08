import type { MoonPhase } from '../../lib/lunar-calendar'
import { cn } from '../../lib/utils'
import { MoonPhaseIcon } from '../atoms/moon-phase-icon'

export interface MoonPhaseBadgeProps {
	phase: MoonPhase
	phaseName: string
	className?: string
}

/**
 * MoonPhaseBadge - Molécula
 * Badge compacto mostrando fase lunar atual
 * Compõe: MoonPhaseIcon + texto
 */
export function MoonPhaseBadge({ phase, phaseName, className }: MoonPhaseBadgeProps) {
	return (
		<div className={cn(
			'flex items-center gap-1.5 px-2 py-1 rounded-md',
			'bg-purple-500/10 border border-purple-500/20',
			className,
		)}>
			<MoonPhaseIcon phase={phase} size="sm" />
			<span className="font-medium text-foreground text-xs">
				{phaseName}
			</span>
		</div>
	)
}
