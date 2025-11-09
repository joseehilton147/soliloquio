'use client'

import type { LucideIcon } from 'lucide-react'
import { Plus, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

import { cn } from '../../lib/utils'

/**
 * Dock Item Configuration Types
 * Esses tipos devem ser implementados no app que usa a dock
 */
export interface DockSubitem {
	label: string
	href: string
	icon?: LucideIcon
	children?: DockSubitem[]  // Suporta aninhamento recursivo
}

export interface DockItem {
	id: string
	label: string
	icon: LucideIcon
	href?: string
	action?: () => void
	type?: 'link' | 'action'
	submenu?: DockSubitem[]
	position?: 'left' | 'right'
}

export interface DockSettings {
	position: 'bottom' | 'top' | 'left' | 'right'
	visibility: 'always' | 'auto-hide'
}

export interface DockSettingsContextType {
	settings: DockSettings
	updateSettings: (settings: Partial<DockSettings>) => void
}

interface MysticalDockProps {
	items: DockItem[]
	settings: DockSettings
}

// Profundidade máxima de submenus aninhados (proteção contra loops e má UX)
const MAX_DEPTH = 3

/**
 * Componente recursivo para renderizar subitens com aninhamento
 */
interface SubmenuItemProps {
	item: DockSubitem
	level: number
	onHover?: (hovering: boolean) => void
}

function SubmenuItem({ item, level, onHover }: SubmenuItemProps) {
	const [isHovered, setIsHovered] = useState(false)
	const hasChildren = item.children && item.children.length > 0 && level < MAX_DEPTH
	const SubIcon = item.icon || Plus

	return (
		<div
			className="relative"
			onMouseEnter={() => {
				setIsHovered(true)
				onHover?.(true)
			}}
			onMouseLeave={() => {
				setIsHovered(false)
				onHover?.(false)
			}}
		>
			<Link
				href={item.href}
				className={cn(
					'relative flex items-center gap-3 px-3 py-2.5 rounded-xl',
					'text-sm font-medium',
					'bg-gradient-to-br from-purple-500/5 to-indigo-500/5',
					'border border-transparent',
					'hover:from-purple-500/20 hover:via-violet-500/20 hover:to-indigo-500/20',
					'hover:border-purple-500/40',
					'hover:text-purple-600 dark:hover:text-purple-400',
					'hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20',
					'transition-all duration-200',
					'group/sub overflow-hidden',
				)}
			>
				{/* Hover glow effect */}
				<div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-violet-500/0 to-indigo-500/0 group-hover/sub:from-purple-500/10 group-hover/sub:via-violet-500/10 group-hover/sub:to-indigo-500/10 transition-all duration-300" />

				<SubIcon className="relative size-4 text-purple-500/70 group-hover/sub:text-purple-500 group-hover/sub:scale-110 transition-all duration-200" />
				<span className="relative flex-1">{item.label}</span>

				{/* Seta para indicar que tem submenu */}
				{hasChildren && (
					<ChevronRight className="relative size-3.5 text-purple-500/50 group-hover/sub:text-purple-500 group-hover/sub:translate-x-0.5 transition-all duration-200" />
				)}
			</Link>

			{/* Submenu aninhado (recursão) */}
			{hasChildren && isHovered && (
				<div
					className={cn(
						'absolute left-full top-0 ml-2 z-50',
						'animate-in fade-in slide-in-from-left-2 duration-200',
					)}
				>
					{/* Borda gradiente animada */}
					<div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
						{/* Background interno com blur */}
						<div className={cn(
							'rounded-2xl overflow-hidden',
							'bg-background/98 backdrop-blur-2xl',
							'shadow-2xl shadow-purple-500/30',
							'min-w-[180px]',
						)}>
							{/* Glow interno místico */}
							<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 pointer-events-none" />

							{/* Shimmer effect */}
							<div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

							{/* Conteúdo do submenu aninhado */}
							<div className="relative p-3 space-y-1.5">
								{item.children!.map((child, idx) => (
									<SubmenuItem
										key={`${child.href}-${idx}`}
										item={child}
										level={level + 1}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export function MysticalDock({ items, settings }: MysticalDockProps) {
	const pathname = usePathname()
	const [isVisible, setIsVisible] = useState(settings.visibility === 'always')
	const [lastScrollY, setLastScrollY] = useState(0)
	const [hoveredItem, setHoveredItem] = useState<string | null>(null)

	const leftItems = items.filter((item) => item.position === 'left')
	const rightItems = items.filter((item) => item.position === 'right')

	// Auto-hide logic
	useEffect(() => {
		if (settings.visibility === 'always') {
			setIsVisible(true)
			return
		}

		const handleScroll = () => {
			const currentScrollY = window.scrollY

			// Mostrar ao subir, esconder ao descer
			if (currentScrollY < lastScrollY || currentScrollY < 50) {
				setIsVisible(true)
			} else if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setIsVisible(false)
			}

			setLastScrollY(currentScrollY)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [settings.visibility, lastScrollY])

	// Posicionamento baseado nas configurações
	const getPositionClasses = () => {
		switch (settings.position) {
			case 'bottom':
				return 'bottom-6 left-1/2 -translate-x-1/2 flex-row'
			case 'top':
				return 'top-6 left-1/2 -translate-x-1/2 flex-row'
			case 'left':
				return 'left-6 top-1/2 -translate-y-1/2 flex-col'
			case 'right':
				return 'right-6 top-1/2 -translate-y-1/2 flex-col'
			default:
				return 'bottom-6 left-1/2 -translate-x-1/2 flex-row'
		}
	}

	const isHorizontal = settings.position === 'bottom' || settings.position === 'top'

	const renderDockItem = (item: DockItem) => {
		const isActive = item.href && (pathname === item.href || pathname.startsWith(item.href + '/'))
		const isHovered = hoveredItem === item.id
		const hasSubmenu = item.submenu && item.submenu.length > 0

		// Action button (busca)
		if (item.type === 'action' && item.action) {
			return (
				<div key={item.id} className="relative">
					<button
						onClick={item.action}
						onMouseEnter={() => setHoveredItem(item.id)}
						onMouseLeave={() => setHoveredItem(null)}
						className={cn(
							'group relative flex items-center justify-center',
							'size-14 rounded-xl',
							'bg-gradient-to-br from-purple-500/10 to-indigo-500/10',
							'border border-purple-500/20',
							'hover:border-purple-500/40',
							'hover:from-purple-500/20 hover:to-indigo-500/20',
							'hover:scale-110 hover:-translate-y-1',
							'transition-all duration-200',
							'shadow-lg shadow-purple-500/0',
							'hover:shadow-purple-500/25',
						)}
					>
						<item.icon className="size-6 text-purple-600 dark:text-purple-400" />

						{/* Tooltip básico */}
						<span
							className={cn(
								'absolute whitespace-nowrap px-3 py-1.5 rounded-lg',
								'bg-background/90 backdrop-blur-sm',
								'border border-purple-500/30',
								'text-xs font-medium text-foreground',
								'opacity-0 group-hover:opacity-100',
								'transition-opacity duration-200',
								'pointer-events-none z-50',
								settings.position === 'bottom' && '-top-12',
								settings.position === 'top' && '-bottom-12',
								settings.position === 'left' && 'left-full ml-3',
								settings.position === 'right' && 'right-full mr-3',
							)}
						>
							{item.label}
						</span>
					</button>
				</div>
			)
		}

		// Link button - com Stack Fan vertical ou Tooltip
		return (
			<div
				key={item.id}
				className="relative"
				onMouseEnter={() => setHoveredItem(item.id)}
				onMouseLeave={() => setHoveredItem(null)}
			>
				{/* Ícone base (sempre visível) */}
				<Link
					href={item.href!}
					className={cn(
						'group relative flex items-center justify-center',
						'size-14 rounded-xl',
						'border transition-all duration-200',
						'shadow-lg',
						isActive
							? 'bg-gradient-to-br from-purple-500/30 to-indigo-500/30 border-purple-500/60 shadow-purple-500/30'
							: 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 shadow-purple-500/0',
						!isActive && 'hover:border-purple-500/40 hover:from-purple-500/20 hover:to-indigo-500/20 hover:scale-110 hover:-translate-y-2 hover:shadow-purple-500/25',
					)}
				>
					<item.icon className={cn(
						'size-6 transition-colors',
						isActive ? 'text-purple-500 dark:text-purple-300' : 'text-purple-600 dark:text-purple-400',
					)} />

					{/* Active indicator */}
					{isActive && (
						<div className="absolute -top-1 -right-1 size-3 rounded-full bg-purple-500 border-2 border-background animate-pulse" />
					)}

					{/* Tooltip para itens SEM submenu */}
					{!hasSubmenu && (
						<span
							className={cn(
								'absolute whitespace-nowrap px-3 py-1.5 rounded-lg',
								'bg-background/90 backdrop-blur-sm',
								'border border-purple-500/30',
								'text-xs font-medium text-foreground',
								'opacity-0 group-hover:opacity-100',
								'transition-opacity duration-200',
								'pointer-events-none z-50',
								settings.position === 'bottom' && '-top-12',
								settings.position === 'top' && '-bottom-12',
								settings.position === 'left' && 'left-full ml-3',
								settings.position === 'right' && 'right-full mr-3',
							)}
						>
							{item.label}
						</span>
					)}
				</Link>

				{/* Stack Fan - expande verticalmente acima/abaixo */}
				{hasSubmenu && isHovered && (
					<div
						className={cn(
							'absolute left-1/2 -translate-x-1/2 z-50',
							'animate-in fade-in slide-in-from-bottom-2 duration-300',
							// Posicionamento baseado na orientação da dock
							settings.position === 'bottom' && 'bottom-full mb-2',
							settings.position === 'top' && 'top-full mt-2',
							settings.position === 'left' && 'left-full ml-2 top-0',
							settings.position === 'right' && 'right-full mr-2 top-0',
						)}
					>
						{/* Borda gradiente animada "viva" */}
						<div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
							{/* Background interno com blur */}
							<div className={cn(
								'rounded-2xl overflow-hidden',
								'bg-background/98 backdrop-blur-2xl',
								'shadow-2xl shadow-purple-500/30',
								'min-w-[180px]',
							)}>
								{/* Glow interno místico */}
								<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 pointer-events-none" />

								{/* Shimmer effect */}
								<div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

								{/* Conteúdo da Stack */}
								<div className="relative p-3 space-y-2">
									{/* Header da Stack - Ícone + Label */}
									<div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
										<item.icon className="size-5 text-purple-600 dark:text-purple-400" />
										<span className="text-sm font-semibold text-foreground">
											{item.label}
										</span>
									</div>

									{/* Divider */}
									<div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

									{/* Subitens verticais - agora com suporte a aninhamento recursivo */}
									<div className="space-y-1.5">
										{item.submenu!.map((subitem, idx) => (
											<SubmenuItem
												key={`${subitem.href}-${idx}`}
												item={subitem}
												level={1}
											/>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Seta indicadora (pontinha apontando para o ícone de origem) */}
						<div
							className={cn(
								'absolute left-1/2 -translate-x-1/2',
								// Posição da seta baseada na orientação da dock
								settings.position === 'bottom' && 'top-full -mt-[2px]',
								settings.position === 'top' && 'bottom-full -mb-[2px]',
								settings.position === 'left' && 'right-full -mr-[2px] top-1/2 -translate-y-1/2',
								settings.position === 'right' && 'left-full -ml-[2px] top-1/2 -translate-y-1/2',
							)}
						>
							<div
								className={cn(
									'border-8 border-transparent',
									// Direção da seta baseada na orientação da dock
									settings.position === 'bottom' && 'border-t-purple-500',
									settings.position === 'top' && 'border-b-purple-500',
									settings.position === 'left' && 'border-r-purple-500',
									settings.position === 'right' && 'border-l-purple-500',
								)}
							/>
						</div>
					</div>
				)}
			</div>
		)
	}

	return (
		<div
			className={cn(
				'fixed z-50 transition-all duration-300',
				getPositionClasses(),
				isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
			)}
		>
			{/* Dock Container - Glass Effect */}
			<div
				className={cn(
					'flex gap-2 p-3 rounded-2xl',
					'bg-background/40 backdrop-blur-xl',
					'border border-white/10',
					'shadow-2xl shadow-purple-500/10',
					'hover:bg-background/50 transition-all duration-300',
					isHorizontal ? 'flex-row' : 'flex-col',
				)}
			>
				{/* Items da Esquerda */}
				{leftItems.map(renderDockItem)}

				{/* Separador estilo macOS */}
				{rightItems.length > 0 && (
					<div
						className={cn(
							'bg-white/10',
							isHorizontal ? 'w-px h-10 mx-1' : 'h-px w-10 my-1',
						)}
					/>
				)}

				{/* Items da Direita */}
				{rightItems.map(renderDockItem)}

				{/* Dock Indicator */}
				<div
					className={cn(
						'absolute bg-purple-500/30 rounded-full blur-xl',
						'transition-all duration-300',
						isHorizontal ? 'h-1 w-full -bottom-2' : 'w-1 h-full -right-2',
					)}
				/>
			</div>
		</div>
	)
}
