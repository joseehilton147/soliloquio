'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getLunarInfo, getNextMoonPhases, type LunarInfo } from '../../lib/lunar-calendar'
import { cn } from '../../lib/utils'
import { MoonPhaseBadge } from '../molecules/moon-phase-badge'
import { MoonPhaseListItem } from '../molecules/moon-phase-list-item'

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
	const [lunarInfo, setLunarInfo] = useState<LunarInfo>(() => getLunarInfo())
	const [isOpen, setIsOpen] = useState(false)
	const [nextPhases, setNextPhases] = useState<ReturnType<typeof getNextMoonPhases>>(() => getNextMoonPhases(8))
	const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const updateLunarInfo = () => {
			setLunarInfo(getLunarInfo())
			setNextPhases(getNextMoonPhases(8)) // Próximas 8 fases (2 meses)
		}

		// Atualizar a cada hora
		const interval = setInterval(updateLunarInfo, 1000 * 60 * 60)
		return () => clearInterval(interval)
	}, [])

	const handleMouseEnter = () => {
		if (closeTimeout) {
			clearTimeout(closeTimeout)
			setCloseTimeout(null)
		}
		setIsOpen(true)
	}

	const handleMouseLeave = () => {
		const timeout = setTimeout(() => {
			setIsOpen(false)
		}, 300) // Delay de 300ms - mais tempo para navegar até dropdown
		setCloseTimeout(timeout)
	}

	return (
		<div
			className={cn('relative', className)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Trigger Button */}
			<div
				className={cn(
					'flex items-center gap-2 text-xs cursor-pointer',
					'transition-all duration-200',
					'hover:scale-105',
					isOpen && 'scale-105',
				)}
			>
				{/* Label */}
				<span className="text-muted-foreground">Lua vigente:</span>

				{/* Badge da fase atual */}
				<MoonPhaseBadge phase={lunarInfo.phase} phaseName={lunarInfo.phaseName} />

				{/* Chevron */}
				<ChevronDown className={cn(
					'size-3 text-muted-foreground transition-transform duration-200',
					isOpen && 'rotate-180',
				)} />
			</div>

			{/* Dropdown Menu */}
			{isOpen && (
				<div
					className="absolute top-full mt-2 right-0 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
				>
					{/* Seta de conexão */}
					<div className="absolute -top-[2px] right-8">
						<div className="border-8 border-transparent border-t-purple-500" />
					</div>

					{/* Borda gradiente animada mística */}
					<div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
						<div className="rounded-2xl bg-background/98 backdrop-blur-2xl p-3 w-[480px] shadow-2xl shadow-purple-500/30 overflow-hidden">
							{/* Glow interno */}
							<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 rounded-2xl pointer-events-none" />

							{/* Informações da Fase Atual */}
							<div className="relative mb-3 pb-3 border-b border-white/5 space-y-2">
								<h3 className="text-sm font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
									{lunarInfo.phaseName}
								</h3>

								{/* Descrição didática */}
								<p className="text-[11px] text-muted-foreground leading-relaxed">
									{lunarInfo.phaseDescription}
								</p>

								{/* Métricas */}
								<div className="grid grid-cols-3 gap-2 pt-2">
									{/* Iluminação */}
									<div className="text-center p-2 rounded-lg bg-purple-500/5 border border-purple-500/10">
										<div className="text-xs font-medium text-purple-600 dark:text-purple-400">
											{lunarInfo.illumination}%
										</div>
										<div className="text-[9px] text-muted-foreground mt-0.5">
											Iluminada
										</div>
									</div>

									{/* Idade */}
									<div className="text-center p-2 rounded-lg bg-violet-500/5 border border-violet-500/10">
										<div className="text-xs font-medium text-violet-600 dark:text-violet-400">
											{lunarInfo.age}d
										</div>
										<div className="text-[9px] text-muted-foreground mt-0.5">
											Idade Lunar
										</div>
									</div>

									{/* Próxima fase */}
									<div className="text-center p-2 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
										<div className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
											{lunarInfo.daysUntilNext}d
										</div>
										<div className="text-[9px] text-muted-foreground mt-0.5">
											Próxima Fase
										</div>
									</div>
								</div>
							</div>

							{/* Próximas Fases */}
							<div className="relative mb-2">
								<h4 className="text-xs font-semibold text-foreground/80">
									Calendário Lunar
								</h4>
								<p className="text-[9px] text-muted-foreground mt-0.5">
									Próximos 2 meses
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
