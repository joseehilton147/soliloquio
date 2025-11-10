'use client'

import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'

import { getLunarInfo, getNextMoonPhases, type LunarInfo } from '../../lib/lunar-calendar'
import { cn } from '../../lib/utils'
import { calculateAvailableSpace } from '../../lib/viewport-utils'
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
	const [maxHeight, setMaxHeight] = useState<number>(400)
	const [openUpwards, setOpenUpwards] = useState(false)
	const triggerRef = useRef<HTMLDivElement>(null)

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

		// Calcular espaço disponível usando utility
		if (triggerRef.current) {
			// Calcular altura REAL do header dinamicamente
			const headerElement = document.getElementById('app-header')
			const headerHeight = headerElement?.getBoundingClientRect().height || 0

			const space = calculateAvailableSpace(triggerRef.current, {
				margin: 16,
				minHeight: 200,
				offset: 16, // mt-4 = 16px
			})

			// DEBUG: Log de valores para diagnóstico
			console.group('🌙 [LUNAR-CALENDAR] Cálculo de Viewport')
			console.log('🖥️ Viewport Height:', window.innerHeight)
			console.log('📏 Header Height (dinâmico):', headerHeight)
			console.log('📍 Trigger Top Position:', space.triggerRect.top)
			console.log('📍 Trigger Bottom Position:', space.triggerRect.bottom)
			console.log('📐 Space Above (bruto):', space.spaceAbove)
			console.log('📐 Space Below (bruto):', space.spaceBelow)

			// Descontar header do spaceAbove para evitar overlap
			const adjustedSpaceAbove = Math.max(0, space.spaceAbove - headerHeight)

			// Calcular altura REAL da dock dinamicamente
			const dockElement = document.getElementById('mystical-dock')
			const dockHeight = dockElement?.getBoundingClientRect().height || 0
			const dockMargin = 40 // Margem de respiração visual até a dock
			const adjustedSpaceBelow = Math.max(0, space.spaceBelow - dockHeight - dockMargin)

			console.log('✂️ Adjusted Space Above (após descontar header):', adjustedSpaceAbove)
			console.log('✂️ Adjusted Space Below (após descontar dock):', adjustedSpaceBelow)
			console.log('🎪 Dock Height + Margin:', dockHeight + dockMargin)

			// Recalcular direção com espaço ajustado
			const shouldOpenUpwards = adjustedSpaceBelow < 200 && adjustedSpaceAbove > adjustedSpaceBelow
			console.log('⬆️ Should Open Upwards:', shouldOpenUpwards)

			setOpenUpwards(shouldOpenUpwards)

			// Calcular maxHeight baseado na direção correta
			const availableSpace = shouldOpenUpwards ? adjustedSpaceAbove : adjustedSpaceBelow
			console.log('💠 Available Space (escolhido):', availableSpace)

			// CORREÇÃO: NÃO subtrair paddings internos!
			// Os headers flex-shrink-0 estão DENTRO do container com flexbox.
			// O flexbox vai distribuir o espaço automaticamente entre headers e lista.
			// Apenas deixar uma pequena margem de segurança (16px).
			const safetyMargin = 16 // Margem de segurança mínima

			console.log('🎯 Safety Margin:', safetyMargin)

			const calculatedMaxHeight = Math.max(350, availableSpace - safetyMargin)
			console.log('📊 MaxHeight Final:', calculatedMaxHeight)
			console.warn('⚠️ Se modal ainda estiver cortado, envie print com esse console group aberto!')
			console.groupEnd()

			setMaxHeight(calculatedMaxHeight)
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
				ref={triggerRef}
				className={cn(
					'flex items-center gap-2 text-sm cursor-pointer',
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
				<Icon icon="lucide:chevron-down" className={cn(
					'size-4 text-muted-foreground transition-transform duration-200',
					isOpen && 'rotate-180',
				)} />
			</div>

			{/* Dropdown Menu */}
			{isOpen && (
				<div
					className={cn(
						'absolute right-0 animate-in fade-in duration-200 z-50 flex',
						openUpwards ? 'bottom-full mb-4 slide-in-from-bottom-2' : 'top-full mt-4 slide-in-from-top-2',
					)}
					style={{ maxHeight: `${maxHeight}px` }}
				>
					{/* Borda gradiente animada mística */}
					<div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy max-h-full">
						<div className="rounded-2xl bg-background/98 backdrop-blur-2xl p-3 w-[480px] shadow-2xl shadow-purple-500/30 overflow-hidden max-h-full flex flex-col">
							{/* Glow interno */}
							<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 rounded-2xl pointer-events-none" />

							{/* Informações da Fase Atual */}
							<div className="relative mb-3 pb-3 border-b border-white/5 space-y-2 flex-shrink-0">
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
							<div className="relative mb-2 flex-shrink-0">
								<h4 className="text-xs font-semibold text-foreground/80">
									Calendário Lunar
								</h4>
								<p className="text-[9px] text-muted-foreground mt-0.5">
									Próximos 2 meses
								</p>
							</div>

							{/* Lista de fases - Scrollbar místico customizado */}
							<div className="relative space-y-1 flex-1 overflow-y-auto overflow-x-hidden pr-2 mystical-scrollbar min-h-0 max-h-full">
								{nextPhases.map((phaseData: ReturnType<typeof getNextMoonPhases>[number], index: number) => (
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

					{/* Seta indicadora - adapta à direção de abertura */}
					<div className={cn(
						'absolute right-8',
						openUpwards ? 'top-full' : 'bottom-full',
					)}>
						<div className={cn(
							'border-8 border-transparent',
							openUpwards ? 'border-t-purple-500' : 'border-b-purple-500',
						)} />
					</div>
				</div>
			)}
		</div>
	)
}
