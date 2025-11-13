'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { cn } from '../../lib/utils'

const MAX_SUBMENU_DEPTH = 3
const SUBMENU_HOVER_DELAY_MS = 150
const VIEWPORT_SAFETY_MARGIN_PX = 16

/**
 * Item de submenu aninhável com suporte para múltiplos níveis
 *
 * @property {string} label - Texto exibido no item
 * @property {string} href - URL de destino
 * @property {string} [icon] - Ícone do Iconify (opcional)
 * @property {DockSubitem[]} [children] - Subitens aninhados (opcional)
 */
export interface DockSubitem {
	label: string
	href: string
	icon?: string
	children?: DockSubitem[]
}

/**
 * Item principal da dock de navegação
 *
 * @property {string} id - Identificador único do item
 * @property {string} label - Texto exibido no tooltip
 * @property {string} icon - Ícone do Iconify
 * @property {string} [href] - URL de destino (para type='link')
 * @property {() => void} [action] - Função callback (para type='action')
 * @property {'link' | 'action'} [type] - Tipo de item (padrão: 'link')
 * @property {DockSubitem[]} [submenu] - Itens do submenu (opcional)
 * @property {'left' | 'right'} [position] - Posição no grupo (padrão: 'left')
 */
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

/**
 * Configurações de visibilidade da dock
 *
 * @property {'always' | 'auto-hide'} visibility - Comportamento de visibilidade
 */
export interface DockSettings {
	visibility: 'always' | 'auto-hide'
}

/**
 * Props do componente MysticalDock
 *
 * @property {DockItem[]} items - Lista de itens da dock
 * @property {DockSettings} settings - Configurações de visibilidade
 */
interface MysticalDockProps {
	items: DockItem[]
	settings: DockSettings
}

/**
 * Props do componente SubmenuItem
 *
 * @property {DockSubitem} item - Dados do item de submenu
 * @property {number} level - Profundidade atual do aninhamento (1-indexed)
 * @property {(hovering: boolean) => void} [onHover] - Callback de hover (opcional)
 */
interface SubmenuItemProps {
	item: DockSubitem
	level: number
	onHover?: (hovering: boolean) => void
}

/**
 * Calcula deslocamento horizontal para manter submenu dentro do viewport
 *
 * @param {DOMRect} submenuRect - Dimensões do submenu
 * @param {number} viewportWidth - Largura da janela
 * @returns {number} Deslocamento em pixels (negativo = mover para esquerda)
 */
function calculateHorizontalOffset(submenuRect: DOMRect, viewportWidth: number): number {
	const submenuRight = submenuRect.right

	if (submenuRight > viewportWidth - VIEWPORT_SAFETY_MARGIN_PX) {
		return -(submenuRight - (viewportWidth - VIEWPORT_SAFETY_MARGIN_PX))
	}

	return 0
}

/**
 * Componente recursivo para renderizar itens de submenu com aninhamento ilimitado
 *
 * Suporta até MAX_SUBMENU_DEPTH níveis de profundidade. Submenus sempre abrem
 * para cima (dock está em bottom) e lateralmente (right) quando aninhados.
 *
 * @component
 * @example
 * ```tsx
 * <SubmenuItem
 *   item={{ label: 'Settings', href: '/settings', children: [...] }}
 *   level={1}
 * />
 * ```
 *
 * @param {SubmenuItemProps} props - Props do componente
 */
function SubmenuItem({ item, level, onHover }: SubmenuItemProps) {
	const [isHovered, setIsHovered] = useState(false)
	const [horizontalOffset, setHorizontalOffset] = useState(0)
	const itemRef = useRef<HTMLDivElement>(null)
	const submenuRef = useRef<HTMLDivElement>(null)
	const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const hasChildren = Boolean(item.children?.length) && level < MAX_SUBMENU_DEPTH

	useEffect(() => {
		if (!isHovered || !hasChildren || !submenuRef.current) return

		const timeout = setTimeout(() => {
			if (!submenuRef.current) return

			const submenuRect = submenuRef.current.getBoundingClientRect()
			const offset = calculateHorizontalOffset(submenuRect, window.innerWidth)
			setHorizontalOffset(offset)
		}, 10)

		return () => clearTimeout(timeout)
	}, [isHovered, hasChildren])

	const handleMouseEnter = (event: React.MouseEvent): void => {
		event.stopPropagation()

		if (leaveTimeoutRef.current) {
			clearTimeout(leaveTimeoutRef.current)
			leaveTimeoutRef.current = null
		}

		setIsHovered(true)
		onHover?.(true)
	}

	const handleMouseLeave = (event: React.MouseEvent): void => {
		event.stopPropagation()

		leaveTimeoutRef.current = setTimeout(() => {
			setIsHovered(false)
			onHover?.(false)
		}, SUBMENU_HOVER_DELAY_MS)
	}

	useEffect(() => {
		return () => {
			if (leaveTimeoutRef.current) {
				clearTimeout(leaveTimeoutRef.current)
			}
		}
	}, [])

	const submenuPositionClasses =
		level >= 1
			? 'left-full ml-2 top-1/2'
			: 'bottom-full mb-2 left-1/2'

	const getTransformStyle = (): string => {
		if (level >= 1) {
			return `translateX(${horizontalOffset}px) translateY(-50%)`
		} else {
			return `translate(calc(-50% + ${horizontalOffset}px), 0)`
		}
	}

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
					'bg-linear-to-br from-purple-500/5 to-indigo-500/5',
					'border border-transparent',
					'hover:from-purple-500/20 hover:via-violet-500/20 hover:to-indigo-500/20',
					'hover:border-purple-500/40',
					'hover:text-purple-600 dark:hover:text-purple-400',
					'hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20',
					'transition-all duration-200',
					'group/sub overflow-hidden',
				)}
			>
				<div className="absolute inset-0 bg-linear-to-r from-purple-500/0 via-violet-500/0 to-indigo-500/0 group-hover/sub:from-purple-500/10 group-hover/sub:via-violet-500/10 group-hover/sub:to-indigo-500/10 transition-all duration-300" />

				{item.icon && (
					<Icon
						icon={item.icon}
						className="relative size-4 text-purple-500/70 group-hover/sub:text-purple-500 group-hover/sub:scale-110 transition-all duration-200"
					/>
				)}

				<span className="relative flex-1 whitespace-nowrap">{item.label}</span>

				{hasChildren && (
					<Icon
						icon="lucide:chevron-right"
						className="relative size-3.5 text-purple-500/50 group-hover/sub:text-purple-500 group-hover/sub:translate-x-0.5 transition-all duration-200"
					/>
				)}
			</Link>

			{hasChildren && isHovered && (
				<div
					ref={submenuRef}
					className={cn(
						'absolute z-10100 animate-in fade-in duration-200',
						submenuPositionClasses,
					)}
					style={{
						transform: getTransformStyle(),
					}}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<div className="relative rounded-2xl p-0.5 bg-linear-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
						<div
							className={cn(
								'rounded-2xl overflow-visible',
								'bg-background/98 backdrop-blur-2xl',
								'shadow-2xl shadow-purple-500/30',
								'w-max',
							)}
						>
							<div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 pointer-events-none rounded-2xl" />

							<div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
								<div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
							</div>

							<div className="relative p-3 space-y-1.5">
								{item.children!.map((child, idx) => (
									<SubmenuItem key={`${child.href}-${idx}`} item={child} level={level + 1} />
								))}
							</div>
						</div>
					</div>

					{level >= 1
						? (
							<div className="absolute left-0 -translate-x-full top-1/2 -translate-y-1/2">
								<div className="border-8 border-transparent border-r-purple-500" />
							</div>
						)
						: (
							<div className="absolute top-full mt-0.5 left-1/2 -translate-x-1/2">
								<div className="border-8 border-transparent border-t-purple-500" />
							</div>
						)}
				</div>
			)}
		</div>
	)
}

/**
 * Dock de navegação místico com design flutuante e efeitos glass morphism
 *
 * A dock está sempre posicionada na parte inferior da tela (bottom-6) e oferece:
 * - Navegação rápida entre seções principais
 * - Submenus aninhados com até 3 níveis de profundidade
 * - Efeitos visuais místicos com gradientes animados
 * - Auto-hide baseado em scroll (se configurado)
 * - Tooltips informativos em hover
 * - Separação visual entre grupos left/right
 *
 * @component
 * @example
 * ```tsx
 * const items: DockItem[] = [
 *   {
 *     id: 'home',
 *     label: 'Home',
 *     icon: 'lucide:home',
 *     href: '/',
 *     position: 'left',
 *   },
 *   {
 *     id: 'settings',
 *     label: 'Settings',
 *     icon: 'lucide:settings',
 *     href: '/settings',
 *     position: 'right',
 *     submenu: [
 *       { label: 'Profile', href: '/settings/profile' },
 *       { label: 'Privacy', href: '/settings/privacy' },
 *     ],
 *   },
 * ]
 *
 * <MysticalDock items={items} settings={{ visibility: 'always' }} />
 * ```
 *
 * @remarks
 * - Usa CSS custom property `--dock-height` para coordenação com layout global
 * - Submenus sempre abrem para cima (dock em bottom)
 * - Itens ativos têm indicador visual pulsante
 * - ResizeObserver mantém altura atualizada automaticamente
 *
 * @param {MysticalDockProps} props - Props do componente
 */
export function MysticalDock({ items, settings }: MysticalDockProps) {
	const pathname = usePathname()
	const dockRef = useRef<HTMLDivElement>(null)

	const [isVisible, setIsVisible] = useState(settings.visibility === 'always')
	const [lastScrollY, setLastScrollY] = useState(0)
	const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)

	const leftItems = items.filter((item) => item.position === 'left')
	const rightItems = items.filter((item) => item.position === 'right')

	useEffect(() => {
		const updateDockHeight = (): void => {
			if (dockRef.current) {
				const height = dockRef.current.offsetHeight
				document.documentElement.style.setProperty('--dock-height', `${height}px`)
			}
		}

		updateDockHeight()

		const resizeObserver = new ResizeObserver(updateDockHeight)
		if (dockRef.current) {
			resizeObserver.observe(dockRef.current)
		}

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	useEffect(() => {
		if (settings.visibility === 'always') {
			setIsVisible(true)
			return
		}

		const handleScroll = (): void => {
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
		const handleClickOutside = (event: MouseEvent): void => {
			if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
				setHoveredItemId(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const renderDockItem = (item: DockItem) => {
		const isActive = item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`))
		const isHovered = hoveredItemId === item.id
		const hasSubmenu = Boolean(item.submenu?.length)

		if (item.type === 'action' && item.action) {
			return (
				<div key={item.id} className="relative">
					<button
						onClick={item.action}
						onMouseEnter={(e) => {
							e.stopPropagation()
							setHoveredItemId(item.id)
						}}
						onMouseLeave={(e) => {
							e.stopPropagation()
							setHoveredItemId(null)
						}}
						className={cn(
							'group relative flex items-center justify-center',
							'size-14 rounded-xl',
							'bg-linear-to-br from-purple-500/10 to-indigo-500/10',
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
								'-top-12',
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
					setHoveredItemId(item.id)
				}}
				onMouseLeave={(e) => {
					e.stopPropagation()
					setHoveredItemId(null)
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
							? 'bg-linear-to-br from-purple-500/30 to-indigo-500/30 border-purple-500/60 shadow-purple-500/30'
							: 'bg-linear-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 shadow-purple-500/0',
						!isActive &&
							'hover:border-purple-500/40 hover:from-purple-500/20 hover:to-indigo-500/20 hover:scale-110 hover:-translate-y-2 hover:shadow-purple-500/25',
					)}
				>
					<Icon
						icon={item.icon}
						className={cn(
							'size-6 transition-colors',
							isActive ? 'text-purple-500 dark:text-purple-300' : 'text-purple-600 dark:text-purple-400',
						)}
					/>

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
								'-top-12',
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
							setHoveredItemId(item.id)
						}}
						onMouseLeave={(e) => {
							e.stopPropagation()
							setHoveredItemId(null)
						}}
						className="absolute z-10000 bottom-full mb-2 left-1/2 -translate-x-1/2 animate-in fade-in duration-300"
					>
						<div className="relative rounded-2xl p-0.5 bg-linear-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
							<div
								className={cn(
									'rounded-2xl overflow-visible',
									'bg-background/98 backdrop-blur-2xl',
									'shadow-2xl shadow-purple-500/30',
									'min-w-[180px]',
								)}
							>
								<div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 pointer-events-none rounded-2xl" />

								<div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
									<div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
								</div>

								<div className="relative p-3 space-y-2">
									<div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-linear-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
										<Icon icon={item.icon} className="size-5 text-purple-600 dark:text-purple-400" />
										<span className="text-sm font-semibold text-foreground">{item.label}</span>
									</div>

									<div className="h-px bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />

									<div className="space-y-1.5">
										{item.submenu!.map((subitem, idx) => (
											<SubmenuItem key={`${subitem.href}-${idx}`} item={subitem} level={1} />
										))}
									</div>
								</div>
							</div>
						</div>

						<div className="absolute top-full mt-0.5 left-1/2 -translate-x-1/2">
							<div className="border-8 border-transparent border-t-purple-500" />
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
				'fixed bottom-6 left-1/2 -translate-x-1/2 z-9999',
				'transition-all duration-300',
				isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-4',
			)}
		>
			<div
				className={cn(
					'flex flex-row gap-2 p-3 rounded-2xl',
					'bg-background/40 backdrop-blur-xl',
					'border border-white/10',
					'shadow-2xl shadow-purple-500/10',
					'hover:bg-background/50 transition-all duration-300',
				)}
			>
				{leftItems.map(renderDockItem)}

				{rightItems.length > 0 && <div className="w-px h-10 mx-1 bg-white/10" />}

				{rightItems.map(renderDockItem)}

				<div className="absolute h-1 w-full -bottom-2 bg-purple-500/30 rounded-full blur-xl transition-all duration-300" />
			</div>
		</div>
	)
}
