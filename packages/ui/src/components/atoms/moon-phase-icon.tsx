import type { MoonPhase } from '../../lib/lunar-calendar'
import { cn } from '../../lib/utils'

export type MoonPhaseIconProps = {
	phase: MoonPhase
	size?: 'sm' | 'md' | 'lg'
	className?: string
}

/**
 * MoonPhaseIcon - Átomo
 * Exibe o emoji/ícone da fase lunar
 */
export function MoonPhaseIcon({ phase, size = 'md', className }: MoonPhaseIconProps) {
	const emojis: Record<MoonPhase, string> = {
		new: '🌑',
		'waxing-crescent': '🌒',
		'first-quarter': '🌓',
		'waxing-gibbous': '🌔',
		full: '🌕',
		'waning-gibbous': '🌖',
		'last-quarter': '🌗',
		'waning-crescent': '🌘',
	}

	const sizes = {
		sm: 'text-base',
		md: 'text-xl',
		lg: 'text-3xl',
	}

	return (
		<span className={cn('leading-none', sizes[size], className)}>
			{emojis[phase]}
		</span>
	)
}
