'use client'

import { Sparkles, Home, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { cn } from '../../lib/utils'

export interface BreadcrumbItem {
	label: string
	href?: string // undefined para o último item (página atual)
}

export interface MysticalBreadcrumbProps {
	items: BreadcrumbItem[]
	className?: string
	showSparkles?: boolean // Mostrar Sparkle na página atual
}

export function MysticalBreadcrumb({
	items,
	className,
	showSparkles = true,
}: MysticalBreadcrumbProps) {
	return (
		<nav
			aria-label="Breadcrumb"
			className={cn('flex w-full items-center justify-center', className)}
		>
			<ol className="flex items-center gap-2 text-sm">
				{items.map((item, index) => {
					const isLast = index === items.length - 1
					const isFirst = index === 0

					return (
						<li key={`${item.label}-${index}`} className="flex items-center gap-2">
							{/* Breadcrumb Item */}
							{item.href && !isLast
								? (
									<Link
										href={item.href}
										className="group/link inline-flex items-center gap-2 transition-colors hover:text-purple-600 dark:hover:text-purple-400"
									>
										{/* Ícone Home para primeiro item */}
										{isFirst && (
											<Home
												className="size-4 text-muted-foreground group-hover/link:text-purple-600 dark:group-hover/link:text-purple-400 transition-colors"
												strokeWidth={2}
											/>
										)}
										<span className="text-muted-foreground group-hover/link:text-purple-600 dark:group-hover/link:text-purple-400 transition-colors">
											{item.label}
										</span>
									</Link>
								)
								: (
									<span
										className={cn(
											'inline-flex items-center gap-2',
											isLast
												? 'font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent'
												: 'text-muted-foreground',
										)}
									>
										{/* Ícone Home para primeiro item sem link */}
										{isFirst && !isLast && (
											<Home className="size-4 text-muted-foreground" strokeWidth={2} />
										)}

										{/* Sparkle místico para última página */}
										{isLast && showSparkles && (
											<Sparkles
												className="size-4 text-purple-600 dark:text-purple-400"
												strokeWidth={2}
											/>
										)}

										{item.label}
									</span>
								)}

							{/* Separador */}
							{!isLast && (
								<ChevronRight
									className="size-4 text-muted-foreground/40"
									strokeWidth={2}
									aria-hidden="true"
								/>
							)}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}
