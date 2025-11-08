'use client'

import { useEffect, useState } from 'react'
import { getLunarInfo, formatLunarDate, type LunarInfo } from '../../lib/lunar-calendar'
import { cn } from '../../lib/utils'

export interface LunarCalendarProps {
  className?: string
}

/**
 * Calendário Lunar - Molécula
 * Exibe fase lunar atual e próxima fase
 */
export function LunarCalendar({ className }: LunarCalendarProps) {
  const [lunarInfo, setLunarInfo] = useState<LunarInfo | null>(null)

  useEffect(() => {
    const updateLunarInfo = () => {
      setLunarInfo(getLunarInfo())
    }

    updateLunarInfo()

    // Atualizar a cada hora
    const interval = setInterval(updateLunarInfo, 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [])

  if (!lunarInfo) {
    return (
      <div className={cn('flex items-center gap-3 text-xs text-muted-foreground', className)}>
        <span>Calculando...</span>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-4 text-xs', className)}>
      {/* Lua Vigente */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Lua vigente:</span>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/20">
          <span className="text-base leading-none">{lunarInfo.phaseEmoji}</span>
          <span className="font-medium text-foreground">{lunarInfo.phaseName}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-4 w-px bg-border" />

      {/* Próxima Lua */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Próxima:</span>
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-foreground">{lunarInfo.nextPhase.phaseName}</span>
          <span className="text-muted-foreground">em</span>
          <span className="font-medium text-purple-600 dark:text-purple-400">
            {formatLunarDate(lunarInfo.nextPhase.date)}
          </span>
        </div>
      </div>
    </div>
  )
}
