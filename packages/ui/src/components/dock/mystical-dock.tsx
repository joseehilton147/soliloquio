'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'

import { cn } from '../../lib/utils'

/**
 * Dock Item Configuration Types
 * Esses tipos devem ser implementados no app que usa a dock
 */
export interface DockSubitem {
	label: string
	href: string
	icon?: string
	children?: DockSubitem[]
}

export interface DockItem {
	id: string
	label: string
	icon: string
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

const MAX_DEPTH = 3

type Orientation = 'right' | 'left' | 'top' | 'bottom'
type DockPosition = 'bottom' | 'top' | 'left' | 'right'

interface SpaceAvailable {
	right: number
	left: number
	top: number
	bottom: number
}

/**
 * Calcula orientação do submenu baseado em level e espaço disponível
 */
function calculateOrientation(
	level: number,
	dockPosition: DockPosition,
	space: SpaceAvailable,
): Orientation {
	if (level > 1) {
		return space.left >= space.right ? 'left' : 'right'
	}

	switch (dockPosition) {
		case 'right':
			return 'left'
		case 'left':
			return 'right'
		case 'bottom':
			return 'top'
		case 'top':
			return 'bottom'
		default:
			return 'right'
	}
}

/**
 * Retorna classes CSS para posicionar submenu
 */
function getSubmenuPositionClasses(level: number, orientation: Orientation): string {
	if (level > 1) {
		if (orientation === 'right') return 'left-full ml-2 top-1/2 -translate-y-1/2 slide-in-from-left-2'
		if (orientation === 'left') return 'right-full mr-2 top-1/2 -translate-y-1/2 slide-in-from-right-2'
		return 'left-full ml-2 top-1/2 -translate-y-1/2 slide-in-from-left-2'
	}

	if (orientation === 'right') return 'left-full ml-2 top-1/2 -translate-y-1/2 slide-in-from-left-2'
	if (orientation === 'left') return 'right-full mr-2 top-1/2 -translate-y-1/2 slide-in-from-right-2'
	if (orientation === 'bottom') return 'top-full mt-2 slide-in-from-top-2'
	if (orientation === 'top') return 'bottom-full mb-2 slide-in-from-bottom-2'
	return 'left-full ml-2 top-1/2 -translate-y-1/2 slide-in-from-left-2'
}

/**
 * Retorna classes CSS para posicionar seta de conexão
 */
function getArrowPositionClasses(level: number, orientation: Orientation): string {
	if (level > 1) {
		if (orientation === 'right') return 'right-full mr-[1px] top-1/2 -translate-y-1/2'
		if (orientation === 'left') return 'left-full ml-[1px] top-1/2 -translate-y-1/2'
		return 'right-full mr-[1px] top-1/2 -translate-y-1/2'
	}

	if (orientation === 'right') return 'right-full mr-[1px] top-1/2 -translate-y-1/2'
	if (orientation === 'left') return 'left-full ml-[1px] top-1/2 -translate-y-1/2'
	if (orientation === 'bottom') return 'bottom-full mb-[1px] -translate-x-1/2'
	if (orientation === 'top') return 'top-full mt-[1px] -translate-x-1/2'
	return 'right-full mr-[1px] top-1/2 -translate-y-1/2'
}

/**
 * Retorna classes CSS para cores da seta
 */
function getArrowColorClasses(level: number, orientation: Orientation): string {
	if (level > 1) {
		if (orientation === 'right') return 'border-r-purple-500'
		if (orientation === 'left') return 'border-l-purple-500'
		return 'border-r-purple-500'
	}

	if (orientation === 'right') return 'border-r-purple-500'
	if (orientation === 'left') return 'border-l-purple-500'
	if (orientation === 'bottom') return 'border-b-purple-500'
	if (orientation === 'top') return 'border-t-purple-500'
	return 'border-r-purple-500'
}

/**
 * Calcula offset para manter submenu dentro do viewport
 */
function calculateOffset(
	orientation: Orientation,
	triggerRect: DOMRect,
	submenuRect: DOMRect,
	viewportWidth: number,
	viewportHeight: number,
	safetyMargin: number,
): { x: number; y: number } {
	let offsetX = 0
	let offsetY = 0

	if (orientation === 'right' || orientation === 'left') {
		const submenuTop = triggerRect.top
		const submenuBottom = submenuTop + submenuRect.height

		if (submenuBottom > viewportHeight - safetyMargin) {
			const overflow = submenuBottom - (viewportHeight - safetyMargin)
			offsetY = -overflow
		}

		if (submenuTop + offsetY < safetyMargin) {
			offsetY = safetyMargin - submenuTop
		}
	}

	if (orientation === 'bottom' || orientation === 'top') {
		const submenuLeft = triggerRect.left + (triggerRect.width / 2) - (submenuRect.width / 2)
		const submenuRight = submenuLeft + submenuRect.width

		if (submenuRight > viewportWidth - safetyMargin) {
			const overflow = submenuRight - (viewportWidth - safetyMargin)
			offsetX = -overflow
		}

		if (submenuLeft + offsetX < safetyMargin) {
			offsetX = safetyMargin - submenuLeft
		}
	}

	return { x: offsetX, y: offsetY }
}

/**
 * Calcula posição da seta para alinhar com trigger
 */
function calculateArrowPosition(
	orientation: Orientation,
	triggerRect: DOMRect,
	submenuRect: DOMRect,
): number {
	if (orientation === 'right' || orientation === 'left') {
		const triggerCenter = triggerRect.top + (triggerRect.height / 2)
		const submenuTop = triggerRect.top
		return triggerCenter - submenuTop
	}

	if (orientation === 'bottom' || orientation === 'top') {
		const triggerCenter = triggerRect.left + (triggerRect.width / 2)
		const submenuLeft = triggerRect.left + (triggerRect.width / 2) - (submenuRect.width / 2)
		return triggerCenter - submenuLeft
	}

	return 0
}

/**
 * Retorna estilo inline para posicionar seta
 */
function getArrowPositionStyle(
	level: number,
	orientation: Orientation,
	arrowOffset: number,
): React.CSSProperties {
	if (level > 1) {
		return {}
	}

	if (orientation === 'right' || orientation === 'left') {
		return { top: arrowOffset }
	}

	if (orientation === 'bottom' || orientation === 'top') {
		return { left: arrowOffset }
	}

	return {}
}

/**
 * Componente recursivo para renderizar subitens com aninhamento
 */
interface SubmenuItemProps {
	item: DockSubitem
	level: number
	dockPosition: 'bottom' | 'top' | 'left' | 'right'
	onHover?: (hovering: boolean) => void
}

function SubmenuItem({ item, level, dockPosition, onHover }: SubmenuItemProps) {
	const [isHovered, setIsHovered] = useState(false)
	const [orientation, setOrientation] = useState<'right' | 'left' | 'top' | 'bottom'>('right')
	const [offset, setOffset] = useState({ x: 0, y: 0 })
	const [arrowOffset, setArrowOffset] = useState(0)
	const itemRef = useRef<HTMLDivElement>(null)
	const submenuRef = useRef<HTMLDivElement>(null)
	const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const hasChildren = item.children && item.children.length > 0 && level < MAX_DEPTH

	useEffect(() => {
		if (!isHovered || !hasChildren || !itemRef.current) return

		const timeout = setTimeout(() => {
			if (!itemRef.current || !submenuRef.current) return

			const triggerRect = itemRef.current.getBoundingClientRect()
			const submenuRect = submenuRef.current.getBoundingClientRect()
			const viewportWidth = window.innerWidth
			const viewportHeight = window.innerHeight

			const SAFETY_MARGIN = 16

			const space: SpaceAvailable = {
				right: viewportWidth - triggerRect.right - SAFETY_MARGIN,
				left: triggerRect.left - SAFETY_MARGIN,
				bottom: viewportHeight - triggerRect.bottom - SAFETY_MARGIN,
				top: triggerRect.top - SAFETY_MARGIN,
			}

			const newOrientation = calculateOrientation(
				level,
				dockPosition,
				space,
			)

			const newOffset = calculateOffset(
				newOrientation,
				triggerRect,
				submenuRect,
				viewportWidth,
				viewportHeight,
				SAFETY_MARGIN,
			)

			const newArrowOffset = calculateArrowPosition(
				newOrientation,
				triggerRect,
				submenuRect,
			)

			setOrientation(newOrientation)
			setOffset(newOffset)
			setArrowOffset(newArrowOffset)
		}, 10)

		return () => clearTimeout(timeout)
	}, [isHovered, hasChildren, dockPosition, level])

	const handleMouseEnter = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (leaveTimeoutRef.current) {
			clearTimeout(leaveTimeoutRef.current)
			leaveTimeoutRef.current = null
		}
		setIsHovered(true)
		onHover?.(true)
	}

	const handleMouseLeave = (e: React.MouseEvent) => {
		e.stopPropagation()
		leaveTimeoutRef.current = setTimeout(() => {
			setIsHovered(false)
			onHover?.(false)
		}, 150)
	}

	useEffect(() => {
		return () => {
			if (leaveTimeoutRef.current) {
				clearTimeout(leaveTimeoutRef.current)
			}
		}
	}, [])

	return (
		<div
			ref={itemRef}
			className="relative"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
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
				<div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-violet-500/0 to-indigo-500/0 group-hover/sub:from-purple-500/10 group-hover/sub:via-violet-500/10 group-hover/sub:to-indigo-500/10 transition-all duration-300" />

				{item.icon && <Icon icon={item.icon} className="relative size-4 text-purple-500/70 group-hover/sub:text-purple-500 group-hover/sub:scale-110 transition-all duration-200" />}
				<span className="relative flex-1">{item.label}</span>

				{hasChildren && (
					<Icon icon="lucide:chevron-right" className="relative size-3.5 text-purple-500/50 group-hover/sub:text-purple-500 group-hover/sub:translate-x-0.5 transition-all duration-200" />
				)}
			</Link>

			{hasChildren && isHovered && (
				<div
					ref={submenuRef}
					className={cn(
						'absolute',
						'animate-in fade-in duration-200',
						getSubmenuPositionClasses(level + 1, orientation),
					)}
					style={{
						zIndex: 10100 + (level * 10),
						transform: `translate(${offset.x}px, ${offset.y}px)`,
					}}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
						<div className={cn(
							'rounded-2xl overflow-visible',
							'bg-background/98 backdrop-blur-2xl',
							'shadow-2xl shadow-purple-500/30',
							'min-w-[180px]',
						)}>
							<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 pointer-events-none rounded-2xl" />

							<div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
								<div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
							</div>

							<div className="relative p-3 space-y-1.5">
								{item.children!.map((child, idx) => (
									<SubmenuItem
										key={`${child.href}-${idx}`}
										item={child}
										level={level + 1}
										dockPosition={dockPosition}
									/>
								))}
							</div>
						</div>
					</div>

					<div
						className={cn(
							'absolute',
							getArrowPositionClasses(level + 1, orientation),
						)}
						style={getArrowPositionStyle(level + 1, orientation, arrowOffset)}
					>
						<div
							className={cn(
								'border-[6px] border-transparent',
								getArrowColorClasses(level + 1, orientation),
							)}
						/>
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
	const dockRef = useRef<HTMLDivElement>(null)

	const leftItems = items.filter((item) => item.position === 'left')
	const rightItems = items.filter((item) => item.position === 'right')

	useEffect(() => {
		if (settings.visibility === 'always') {
			setIsVisible(true)
			return
		}

		const handleScroll = () => {
			const currentScrollY = window.scrollY

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

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
				setHoveredItem(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const getPositionClasses = () => {
		switch (settings.position) {
			case 'bottom':
				return 'bottom-6 left-1/2 -translate-x-1/2 flex-row'
			case 'top':
				return 'top-20 left-1/2 -translate-x-1/2 flex-row'
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

		if (item.type === 'action' && item.action) {
			return (
				<div key={item.id} className="relative">
					<button
						onClick={item.action}
						onMouseEnter={(e) => {
							e.stopPropagation()
							setHoveredItem(item.id)
						}}
						onMouseLeave={(e) => {
							e.stopPropagation()
							setHoveredItem(null)
						}}
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
						<Icon icon={item.icon} className="size-6 text-purple-600 dark:text-purple-400" />

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

		return (
			<div
				key={item.id}
				className="relative"
				onMouseEnter={(e) => {
					e.stopPropagation()
					setHoveredItem(item.id)
				}}
				onMouseLeave={(e) => {
					e.stopPropagation()
					setHoveredItem(null)
				}}
			>
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
					<Icon icon={item.icon} className={cn(
						'size-6 transition-colors',
						isActive ? 'text-purple-500 dark:text-purple-300' : 'text-purple-600 dark:text-purple-400',
					)} />

					{isActive && (
						<div className="absolute -top-1 -right-1 size-3 rounded-full bg-purple-500 border-2 border-background animate-pulse" />
					)}

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

				{hasSubmenu && isHovered && (
					<div
						onMouseEnter={(e) => {
							e.stopPropagation()
							setHoveredItem(item.id)
						}}
						onMouseLeave={(e) => {
							e.stopPropagation()
							setHoveredItem(null)
						}}
						className={cn(
							'absolute z-[10000]',
							'animate-in fade-in duration-300',
							settings.position === 'bottom' && 'bottom-full mb-2 left-1/2 -translate-x-1/2 slide-in-from-bottom-2',
							settings.position === 'top' && 'top-full mt-2 left-1/2 -translate-x-1/2 slide-in-from-top-2',
							settings.position === 'left' && 'left-full ml-2 top-1/2 -translate-y-1/2 slide-in-from-left-2',
							settings.position === 'right' && 'right-full mr-2 top-1/2 -translate-y-1/2 slide-in-from-right-2',
						)}
					>
						<div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
							<div className={cn(
								'rounded-2xl overflow-visible',
								'bg-background/98 backdrop-blur-2xl',
								'shadow-2xl shadow-purple-500/30',
								'min-w-[180px]',
							)}>
								<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 pointer-events-none rounded-2xl" />

								<div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
									<div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
								</div>

								<div className="relative p-3 space-y-2">
									<div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
										<Icon icon={item.icon} className="size-5 text-purple-600 dark:text-purple-400" />
										<span className="text-sm font-semibold text-foreground">
											{item.label}
										</span>
									</div>

									<div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

									<div className="space-y-1.5">
										{item.submenu!.map((subitem, idx) => (
											<SubmenuItem
												key={`${subitem.href}-${idx}`}
												item={subitem}
												level={1}
												dockPosition={settings.position}
											/>
										))}
									</div>
								</div>
							</div>
						</div>

						<div
							className={cn(
								'absolute',
								settings.position === 'bottom' && 'top-full mt-0.8 left-1/2 -translate-x-1/2',
								settings.position === 'top' && 'bottom-full mb-0.8 left-1/2 -translate-x-1/2',
								settings.position === 'left' && 'right-full mr-0.8 top-1/2 -translate-y-1/2',
								settings.position === 'right' && 'left-full ml-0.8 top-1/2 -translate-y-1/2',
							)}
						>
							<div
								className={cn(
									'border-8 border-transparent',
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
			id="mystical-dock"
			ref={dockRef}
			className={cn(
				'fixed z-[9999] transition-all duration-300',
				getPositionClasses(),
				isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
				isHorizontal && !isVisible && 'translate-y-4',
				!isHorizontal && !isVisible && 'translate-x-4',
			)}
		>
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
				{leftItems.map(renderDockItem)}

				{rightItems.length > 0 && (
					<div
						className={cn(
							'bg-white/10',
							isHorizontal ? 'w-px h-10 mx-1' : 'h-px w-10 my-1',
						)}
					/>
				)}

				{rightItems.map(renderDockItem)}

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
