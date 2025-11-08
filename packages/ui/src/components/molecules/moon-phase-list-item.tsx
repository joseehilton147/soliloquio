import type { MoonPhase } from '../../lib/lunar-calendar'
import { MoonPhaseIcon } from '../atoms/moon-phase-icon'
import { cn } from '../../lib/utils'

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
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d)
  }

  return (
    <div className={cn(
      'flex items-center gap-3 px-3 py-2.5 rounded-xl group/moon relative overflow-hidden',
      'transition-all duration-200',
      'hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-violet-500/10 hover:to-indigo-500/10 hover:scale-[1.02]',
      className
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
