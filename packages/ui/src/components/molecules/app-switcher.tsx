'use client'

import type { LucideIcon } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '../../lib/utils'

export interface AppItem {
	id: string
	name: string
	icon: LucideIcon
	href: string
	available: boolean
	description?: string
}

export interface AppSwitcherProps {
	apps: AppItem[]
	onAppChange?: (appId: string) => void
	className?: string
}

/**
 * AppSwitcher - Molécula
 * Dropdown para alternar entre apps/contextos
 */
export function AppSwitcher({ apps, onAppChange, className }: AppSwitcherProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null)

	const handleAppClick = (app: AppItem) => {
		if (app.available) {
			onAppChange?.(app.id)
			setIsOpen(false)
		}
	}

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
			<div
				className={cn(
					'flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer',
					'text-xs font-medium text-muted-foreground',
					'hover:text-foreground hover:bg-white/5',
					'transition-all duration-200',
					isOpen && 'bg-white/5 text-foreground',
				)}
			>
				<span>Apps</span>
				<ChevronDown className={cn(
					'size-3 transition-transform duration-200',
					isOpen && 'rotate-180',
				)} />
			</div>

			{/* Dropdown Menu */}
			{isOpen && (
				<div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-200">
					{/* Seta de conexão */}
					<div className="absolute -top-[2px] left-1/2 -translate-x-1/2">
						<div className="border-8 border-transparent border-b-purple-500" />
					</div>

					{/* Borda gradiente animada */}
					<div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
						<div className="rounded-2xl bg-background/98 backdrop-blur-2xl p-3 min-w-[280px] shadow-2xl shadow-purple-500/30">
							{/* Glow interno */}
							<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 rounded-2xl pointer-events-none" />

							<div className="relative space-y-1">
								{apps.map((app) => {
									const AppIcon = app.icon
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
												'flex items-start gap-3 px-3 py-2.5 rounded-xl group/app relative overflow-hidden',
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

											<AppIcon className={cn(
												'relative size-5 mt-0.5 transition-all duration-200',
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
														<span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground font-medium">
															Em breve
														</span>
													)}
												</div>
												{app.description && (
													<p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
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
				</div>
			)}
		</div>
	)
}
