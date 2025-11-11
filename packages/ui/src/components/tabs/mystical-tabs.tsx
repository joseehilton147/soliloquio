'use client'

import { ReactNode } from 'react'
import { Icon } from '@iconify/react'
import { cn } from '../../lib/utils'
import { useTabs } from '../../hooks/use-tabs'

export interface MysticalTabItem<T extends string = string> {
	id: T
	label: string
	icon?: string
	count?: number
	/** Componente customizado para renderizar o tab */
	renderTab?: (props: {
		item: MysticalTabItem<T>
		isActive: boolean
		onClick: () => void
	}) => ReactNode
}

export interface MysticalTabsProps<T extends string = string> {
	/** Lista de tabs */
	tabs: MysticalTabItem<T>[]
	/** Tab ativa por padrão */
	defaultTab?: T
	/** Callback quando tab muda */
	onChange?: (tabId: T) => void
	/** Children é função que recebe activeTab */
	children: (activeTab: T) => ReactNode
	/** Classes customizadas */
	className?: string
	/** Mostrar ornamentos decorativos */
	showOrnaments?: boolean
	/** Título acima das tabs */
	title?: string
	/** Mensagem abaixo das tabs - pode ser estático ou função dinâmica baseada na tab ativa */
	subtitle?: ReactNode | ((activeTab: T) => ReactNode)
	/** Classes para o container de tabs */
	tabsClassName?: string
	/** Classes para tab individual */
	tabClassName?: string
	/** Classes para tab ativa */
	activeTabClassName?: string
	/** Classes para o painel de conteúdo */
	panelClassName?: string
	/** Duração da transição em ms */
	transitionDuration?: number
}

/**
 * Mystical Tabs - Component Base
 *
 * Sistema de tabs místico completamente configurável e reutilizável.
 * Pode ser usado em qualquer app (tarot, numerologia, espiritismo, etc.)
 *
 * @example
 * ```tsx
 * <MysticalTabs
 *   tabs={[
 *     { id: 'tab1', label: 'Tab 1', icon: 'mdi:star' },
 *     { id: 'tab2', label: 'Tab 2', icon: 'mdi:moon' }
 *   ]}
 *   defaultTab="tab1"
 *   onChange={(id) => console.log(id)}
 * >
 *   {(activeTab) => <div>Content for {activeTab}</div>}
 * </MysticalTabs>
 * ```
 */
export function MysticalTabs<T extends string = string>({
	tabs,
	defaultTab,
	onChange,
	children,
	className,
	showOrnaments = true,
	title,
	subtitle,
	tabsClassName,
	tabClassName,
	activeTabClassName,
	panelClassName,
	transitionDuration = 300,
}: MysticalTabsProps<T>) {
	const { activeTab, setActiveTab, isActive } = useTabs({
		defaultTab: defaultTab || tabs[0]?.id,
		onChange: onChange as (tabId: string) => void,
	})

	return (
		<div className={cn('space-y-12', className)}>
			{/* ═══ TABS CONTAINER ═══ */}
			<div className="relative">
				{/* Container das tabs */}
				<div
					className={cn(
						'relative flex flex-wrap items-center justify-center gap-4 p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm',
						tabsClassName
					)}
					style={{
						boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 0 20px rgba(0,0,0,0.4)',
					}}
				>
					{/* Ornamento superior */}
					{showOrnaments && (
						<div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
							<div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
							<Icon icon="game-icons:crystal-ball" className="size-5 text-white/20" />
							<div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
						</div>
					)}

					{/* Título das tabs */}
					{title && (
						<div className="w-full text-center mb-4">
							<p className="text-sm uppercase tracking-[0.3em] text-white/50 font-light">
								{title}
							</p>
						</div>
					)}

					{/* Tabs */}
					{tabs.map((tab) => {
						const active = isActive(tab.id as string)

						// Se tab tem renderTab customizado, usa ele
						if (tab.renderTab) {
							return tab.renderTab({
								item: tab,
								isActive: active,
								onClick: () => setActiveTab(tab.id as string),
							})
						}

						// Renderização padrão
						return (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as string)}
								className={cn(
									'group relative flex flex-col items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all',
									'hover:scale-105 hover:shadow-lg',
									tabClassName,
									active && activeTabClassName
								)}
								style={{
									transitionDuration: `${transitionDuration}ms`,
								}}
							>
								{/* Ícone */}
								{tab.icon && (
									<div className="relative">
										<Icon icon={tab.icon} className="size-10 transition-all duration-500" />
									</div>
								)}

								{/* Label */}
								<div className="relative text-center space-y-1">
									<h3 className="text-base font-bold tracking-wide transition-all duration-300">
										{tab.label}
									</h3>
									{tab.count !== undefined && (
										<p className="text-xs opacity-70 tracking-wider">
											{tab.count} {tab.count === 1 ? 'item' : 'itens'}
										</p>
									)}
								</div>
							</button>
						)
					})}

					{/* Ornamento inferior */}
					{showOrnaments && (
						<div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
							<div className="h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
							<Icon
								icon="game-icons:star-formation"
								className="size-4 text-white/20 animate-pulse [animation-duration:4s]"
							/>
							<div className="h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
						</div>
					)}
				</div>
			</div>

			{/* ═══ CONTENT PANEL COM TRANSIÇÃO SUAVE ═══ */}
			<div
				className={cn('relative', panelClassName)}
				style={{
					transitionDuration: `${transitionDuration}ms`,
				}}
			>
				{/* Wrapper com animação de fade + slide */}
				<div
					key={activeTab} // Re-monta ao trocar tab para garantir animação
					className="animate-in fade-in slide-in-from-bottom-4"
					style={{
						animationDuration: `${transitionDuration}ms`,
						animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-out suave
					}}
				>
					{children(activeTab as T)}
				</div>
			</div>

			{/* ═══ SUBTITLE/INDICADOR (OPCIONAL) ═══ */}
			{subtitle && (
				<div className="flex items-center justify-center gap-3 pt-4">
					{typeof subtitle === 'function' ? subtitle(activeTab as T) : subtitle}
				</div>
			)}
		</div>
	)
}
