'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { getLunarInfo, getNextMoonPhases, type LunarInfo } from '../../lib/lunar-calendar'
import { MoonPhaseBadge } from '../molecules/moon-phase-badge'
import { MoonPhaseListItem } from '../molecules/moon-phase-list-item'
import { cn } from '../../lib/utils'

export interface LunarCalendarProps {
  className?: string
}

/**
 * LunarCalendar - Organismo
 * Calendário lunar místico com dropdown de próximas fases
 *
 * Design Atômico:
 * - Átomo: MoonPhaseIcon
 * - Molécula: MoonPhaseBadge, MoonPhaseListItem
 * - Organismo: LunarCalendar (este componente)
 *
 * Compõe badge atual + dropdown com lista de próximas fases
 */
export function LunarCalendar({ className }: LunarCalendarProps) {
  const [lunarInfo, setLunarInfo] = useState<LunarInfo | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [nextPhases, setNextPhases] = useState<ReturnType<typeof getNextMoonPhases>>([])

  useEffect(() => {
    const updateLunarInfo = () => {
      setLunarInfo(getLunarInfo())
      setNextPhases(getNextMoonPhases(8)) // Próximas 8 fases (2 meses)
    }

    updateLunarInfo()

    // Atualizar a cada hora
    const interval = setInterval(updateLunarInfo, 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [])

  if (!lunarInfo) {
    return (
      <div className={cn('flex items-center text-xs text-muted-foreground', className)}>
        <span>Calculando...</span>
      </div>
    )
  }

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <div
        className={cn(
          'flex items-center gap-2 text-xs cursor-pointer',
          'transition-all duration-200',
          'hover:scale-105',
          isOpen && 'scale-105'
        )}
      >
        {/* Label */}
        <span className="text-muted-foreground">Lua vigente:</span>

        {/* Badge da fase atual */}
        <MoonPhaseBadge phase={lunarInfo.phase} phaseName={lunarInfo.phaseName} />

        {/* Chevron */}
        <ChevronDown className={cn(
          'size-3 text-muted-foreground transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          {/* Borda gradiente animada mística */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
            <div className="rounded-2xl bg-background/98 backdrop-blur-2xl p-3 w-[320px] shadow-2xl shadow-purple-500/30 overflow-hidden">
              {/* Glow interno */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 rounded-2xl pointer-events-none" />

              {/* Header */}
              <div className="relative mb-3 pb-2 border-b border-white/5">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Próximas Fases Lunares
                </h3>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Ciclos celestiais dos próximos 2 meses
                </p>
              </div>

              {/* Lista de fases - Scrollbar místico customizado */}
              <div className="relative space-y-1 max-h-[320px] overflow-y-auto overflow-x-hidden pr-2 mystical-scrollbar">
                {nextPhases.map((phaseData, index) => (
                  <MoonPhaseListItem
                    key={`${phaseData.phase}-${index}`}
                    phase={phaseData.phase}
                    phaseName={phaseData.phaseName}
                    date={phaseData.date}
                  />
                ))}

                {nextPhases.length === 0 && (
                  <div className="text-center py-6 text-xs text-muted-foreground">
                    Calculando fases...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
