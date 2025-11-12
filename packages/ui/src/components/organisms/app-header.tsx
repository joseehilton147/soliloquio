'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { Logo, type LogoProps } from '../atoms/logo'
import { AppSwitcher, type AppItem } from '../molecules/app-switcher'
import { CurrentAppBadge } from '../molecules/current-app-badge'

export interface AppHeaderProps {
	/**
   * Configuração do logo
   */
	logo: Omit<LogoProps, 'className'>

	/**
   * Lista de apps disponíveis no switcher
   */
	apps: AppItem[]

	/**
   * Conteúdo personalizável no lado direito (slot pattern)
   * Exemplo: <LunarCalendar />, <UserMenu />, etc.
   */
	rightContent?: React.ReactNode

	/**
   * Callback quando app é trocado
   */
	onAppChange?: (appId: string) => void
}

/**
 * AppHeader - Organismo
 * Header reutilizável com layout de 3 colunas:
 * - Esquerda: Logo + Current App Badge
 * - Centro: App Switcher (sempre centralizado)
 * - Direita: Conteúdo personalizável (slot)
 *
 * Design Atômico:
 * - Átomo: Logo
 * - Molécula: CurrentAppBadge, AppSwitcher
 * - Organismo: AppHeader (este componente)
 *
 * Layout:
 * - Usa posicionamento absoluto para garantir centralização do switcher
 * - Independente do tamanho do conteúdo esquerdo/direito
 */
export function AppHeader({ logo, apps, rightContent, onAppChange }: AppHeaderProps) {
	const pathname = usePathname()
	const headerRef = useRef<HTMLElement>(null)

	// Detecta app atual baseado na rota
	const currentApp = apps.find((app) =>
		pathname.startsWith(app.href) && app.href !== '/' || (pathname === '/' && app.href === '/'),
	) || apps[0]!

	if (!currentApp) {
		throw new Error('AppHeader: at least one app must be provided')
	}

	// Atualiza CSS variable com altura real do header
	useEffect(() => {
		const updateHeaderHeight = () => {
			if (headerRef.current) {
				const height = headerRef.current.offsetHeight
				document.documentElement.style.setProperty('--header-height', `${height}px`)
			}
		}

		// Atualiza na montagem e quando o tamanho muda
		updateHeaderHeight()

		// Observer para mudanças de tamanho
		const resizeObserver = new ResizeObserver(updateHeaderHeight)
		if (headerRef.current) {
			resizeObserver.observe(headerRef.current)
		}

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	return (
		<header ref={headerRef} id="app-header" className="fixed top-0 inset-x-0 z-60">
			{/* Glass effect container */}
			<div className="absolute inset-0 bg-background/60 backdrop-blur-xl border-b border-white/5" />

			{/* Content - 3 column layout */}
			<div className="relative flex items-center justify-between px-4 py-3">

				{/* Left Column - Logo + Current App */}
				<div className="flex items-center gap-4 flex-1 min-w-0">
					{/* Logo */}
					<Logo {...logo} />

					{/* Divider */}
					<div className="h-4 w-px bg-white/10" />

					{/* Current App Badge */}
					<CurrentAppBadge name={currentApp.name} icon={currentApp.icon} />
				</div>

				{/* Center Column - App Switcher (absolutely centered) */}
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
					<AppSwitcher apps={apps} columns={2} onAppChange={onAppChange} />
				</div>

				{/* Right Column - Custom Content Slot */}
				<div className="flex items-center justify-end flex-1 min-w-0">
					{rightContent}
				</div>

			</div>
		</header>
	)
}
