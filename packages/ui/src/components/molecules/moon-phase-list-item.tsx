import type { MoonPhase } from '../../lib/lunar-calendar'
import { cn } from '../../lib/utils'
import { MoonPhaseIcon } from '../atoms/moon-phase-icon'

export interface MoonPhaseListItemProps {
	phase: MoonPhase
	phaseName: string
	date: Date
	className?: string
}

/**
 * MoonPhaseListItem - Molécula
 * Item de lista mostrando uma fase lunar futura
 * Compõe: MoonPhaseIcon + nome + data
 */
export function MoonPhaseListItem({ phase, phaseName, date, className }: MoonPhaseListItemProps) {
	const formatDate = (d: Date) => {
		// Data completa com dia da semana
		const weekdayStr = new Intl.DateTimeFormat('pt-BR', {
			weekday: 'long',
		}).format(d)

		// Data completa: dia de mês de ano
		const dateStr = new Intl.DateTimeFormat('pt-BR', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}).format(d)

		// Horário completo: hora:minuto
		const timeStr = new Intl.DateTimeFormat('pt-BR', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		}).format(d)

		// Capitalizar primeira letra do dia da semana
		const weekday = weekdayStr.charAt(0).toUpperCase() + weekdayStr.slice(1)

		return `${weekday}, ${dateStr} às ${timeStr}`
	}

	return (
		<div className={cn(
			'flex items-center gap-3 px-3 py-2.5 rounded-xl group/moon relative overflow-hidden',
			'transition-all duration-200',
			'hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-violet-500/10 hover:to-indigo-500/10 hover:scale-[1.02]',
			className,
		)}>
			{/* Hover glow */}
			<div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-violet-500/0 to-indigo-500/0 group-hover/moon:from-purple-500/5 group-hover/moon:via-violet-500/5 group-hover/moon:to-indigo-500/5 transition-all duration-300" />

			{/* Ícone da lua */}
			<MoonPhaseIcon
				phase={phase}
				size="lg"
				className="relative group-hover/moon:scale-110 transition-transform duration-200"
			/>

			{/* Info */}
			<div className="relative flex-1 min-w-0">
				<div className="font-medium text-sm group-hover/moon:text-purple-600 dark:group-hover/moon:text-purple-400 transition-colors">
					{phaseName}
				</div>
				<div className="text-xs text-muted-foreground mt-0.5">
					{formatDate(date)}
				</div>
			</div>
		</div>
	)
}
