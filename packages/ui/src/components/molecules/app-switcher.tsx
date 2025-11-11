'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '../../lib/utils'

/**
 * Representa um item de aplicativo no switcher
 * @interface AppItem
 * @property {string} id - Identificador único do app
 * @property {string} name - Nome de exibição do app
 * @property {string} icon - Ícone do Iconify (ex: 'lucide:book-open')
 * @property {string} href - URL de navegação do app
 * @property {boolean} available - Se o app está disponível ou "Em breve"
 * @property {string} [description] - Descrição opcional do app
 */
export interface AppItem {
	id: string
	name: string
	icon: string
	href: string
	available: boolean
	description?: string
}

/**
 * Número de colunas permitido no grid layout
 * @typedef {1 | 2 | 3 | 4} GridColumns
 */
export type GridColumns = 1 | 2 | 3 | 4

/**
 * Props do componente AppSwitcher
 * @interface AppSwitcherProps
 * @property {AppItem[]} apps - Lista de aplicativos a exibir
 * @property {GridColumns} [columns=1] - Número de colunas no grid (1-4)
 * @property {(appId: string) => void} [onAppChange] - Callback ao selecionar app
 * @property {string} [className] - Classes CSS adicionais
 */
export interface AppSwitcherProps {
	apps: AppItem[]
	columns?: GridColumns
	onAppChange?: (appId: string) => void
	className?: string
}

/**
 * Mapeia número de colunas para classe Tailwind CSS
 *
 * Função pura que retorna a classe de grid correspondente
 * ao número de colunas desejado.
 *
 * @pure
 * @param {GridColumns} columns - Número de colunas (1-4)
 * @returns {string} Classe Tailwind CSS para grid-cols
 *
 * @example
 * getGridColumnsClass(1) // 'grid-cols-1'
 * getGridColumnsClass(2) // 'grid-cols-2'
 * getGridColumnsClass(3) // 'grid-cols-3'
 */
function getGridColumnsClass(columns: GridColumns): string {
	const columnMap: Record<GridColumns, string> = {
		1: 'grid-cols-1',
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4',
	}
	return columnMap[columns]
}

/**
 * Calcula largura mínima do dropdown baseado no número de colunas
 *
 * Função pura que determina a largura mínima adequada para
 * acomodar o número de colunas especificado.
 *
 * @pure
 * @param {GridColumns} columns - Número de colunas
 * @returns {string} Classe Tailwind CSS para min-width
 *
 * @example
 * getMinWidthClass(1) // 'min-w-[280px]'
 * getMinWidthClass(2) // 'min-w-[720px]'
 * getMinWidthClass(3) // 'min-w-[900px]'
 */
function getMinWidthClass(columns: GridColumns): string {
	const widthMap: Record<GridColumns, string> = {
		1: 'min-w-[280px]',
		2: 'min-w-[720px]',
		3: 'min-w-[900px]',
		4: 'min-w-[1100px]',
	}
	return widthMap[columns]
}

/**
 * AppSwitcher - Molécula
 *
 * Dropdown configurável para alternar entre apps/contextos.
 * Suporta layout em grid com 1-4 colunas responsivas.
 *
 * **Design Atômico:**
 * - Usa ícones (Átomos)
 * - Compõe trigger + dropdown (Molécula)
 *
 * **Características:**
 * - Layout grid configurável (1-4 colunas)
 * - Hover com delay de 300ms para UX suave
 * - Animações místicas com gradientes
 * - Acessível (keyboard navigation via Link)
 * - Disabled state para apps indisponíveis
 *
 * @example
 * // Uso básico (1 coluna - padrão)
 * <AppSwitcher apps={apps} />
 *
 * @example
 * // Grid com 2 colunas
 * <AppSwitcher apps={apps} columns={2} />
 *
 * @example
 * // Grid com 3 colunas + callback
 * <AppSwitcher
 *   apps={apps}
 *   columns={3}
 *   onAppChange={(id) => console.log('Selected:', id)}
 * />
 */
export function AppSwitcher({
	apps,
	columns = 1,
	onAppChange,
	className
}: AppSwitcherProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null)

	/**
	 * Handler para clique em app disponível
	 * @param {AppItem} app - App clicado
	 */
	const handleAppClick = (app: AppItem) => {
		if (app.available) {
			onAppChange?.(app.id)
			setIsOpen(false)
		}
	}

	/**
	 * Handler para mouse enter no container
	 * Cancela timeout de fechamento e abre dropdown
	 */
	const handleMouseEnter = () => {
		if (closeTimeout) {
			clearTimeout(closeTimeout)
			setCloseTimeout(null)
		}
		setIsOpen(true)
	}

	/**
	 * Handler para mouse leave no container
	 * Inicia timeout de 300ms para fechar dropdown
	 */
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
					'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer',
					'text-sm font-medium text-muted-foreground',
					'hover:text-foreground hover:bg-white/5',
					'transition-all duration-200',
					isOpen && 'bg-white/5 text-foreground',
				)}
			>
				<span>Apps</span>
				<Icon icon="lucide:chevron-down" className={cn(
					'size-4 transition-transform duration-200',
					isOpen && 'rotate-180',
				)} />
			</div>

			{/* Dropdown Menu */}
			{isOpen && (
				<div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-200">
					{/* Borda gradiente animada */}
					<div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
						<div className={cn(
							'rounded-2xl bg-background/98 backdrop-blur-2xl p-3 shadow-2xl shadow-purple-500/30',
							getMinWidthClass(columns),
						)}>
							{/* Glow interno */}
							<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 rounded-2xl pointer-events-none" />

							{/* Grid de Apps */}
							<div className={cn(
								'relative grid gap-1',
								getGridColumnsClass(columns),
							)}>
								{apps.map((app) => {
									return (
										<Link
											key={app.id}
											href={app.available ? app.href : '#'}
											onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
												if (!app.available) {
													e.preventDefault()
												} else {
													handleAppClick(app)
												}
											}}
											className={cn(
												'flex items-center gap-3 px-3 py-2.5 rounded-xl group/app relative overflow-hidden',
												'transition-all duration-200',
												app.available
													? 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:via-violet-500/20 hover:to-indigo-500/20 hover:scale-[1.02]'
													: 'opacity-40 cursor-not-allowed',
											)}
										>
											{/* Hover glow */}
											{app.available && (
												<div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-violet-500/0 to-indigo-500/0 group-hover/app:from-purple-500/10 group-hover/app:via-violet-500/10 group-hover/app:to-indigo-500/10 transition-all duration-300" />
											)}

											<Icon icon={app.icon} className={cn(
												'relative size-5 transition-all duration-200 flex-shrink-0',
												app.available
													? 'text-purple-500/70 group-hover/app:text-purple-500 group-hover/app:scale-110'
													: 'text-muted-foreground',
											)} />

											<div className="relative flex-1 min-w-0">
												<div className="flex items-center gap-2">
													<span className={cn(
														'text-sm font-medium',
														app.available && 'group-hover/app:text-purple-600 dark:group-hover/app:text-purple-400',
													)}>
														{app.name}
													</span>
													{!app.available && (
														<span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground font-medium flex-shrink-0">
															Em breve
														</span>
													)}
												</div>
												{app.description && (
													<p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
														{app.description}
													</p>
												)}
											</div>
										</Link>
									)
								})}
							</div>
						</div>
					</div>

					{/* Seta indicadora */}
					<div className="absolute bottom-full left-1/2 -translate-x-1/2">
						<div className="border-8 border-transparent border-b-purple-500" />
					</div>
				</div>
			)}
		</div>
	)
}
