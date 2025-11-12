'use client'

import { MysticalBackground, SacredEyeLogo } from '@workspace/ui'
import { MysticalDock } from '@workspace/ui/components/dock/mystical-dock'
import { AppHeader } from '@workspace/ui/components/organisms/app-header'
import { LunarCalendar } from '@workspace/ui/components/organisms/lunar-calendar'
import { cn } from '@workspace/ui/lib/utils'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { createDockItems } from '../config/dock-items'
import { headerApps } from '../config/header-apps'
import { useDockSettings } from '../contexts/dock-settings-context'
import { GlobalSearch } from './global-search'

const SEARCH_KEYBOARD_SHORTCUT = 'k'

/**
 * Props do componente MysticalLayout
 *
 * @property {React.ReactNode} children - Conteúdo da página a ser renderizado dentro do layout
 */
interface MysticalLayoutProps {
	children: React.ReactNode
}

/**
 * Layout principal da aplicação Tarô com design místico e minimalista
 *
 * Este componente fornece a estrutura base para todas as páginas, incluindo:
 * - Header fixo com logo, app switcher e calendário lunar
 * - Conteúdo principal com espaçamento responsivo ao header dinâmico
 * - Background místico condicional (exceto homepage)
 * - Dock de navegação flutuante
 * - Modal de busca global (Cmd/Ctrl + K)
 *
 * @component
 * @example
 * ```tsx
 * <MysticalLayout>
 *   <TarotCardList />
 * </MysticalLayout>
 * ```
 *
 * @remarks
 * - Usa CSS custom property `--header-height` para posicionamento dinâmico
 * - Espaçamento horizontal e vertical de 1rem (16px) para respiro visual
 * - Background místico é desabilitado na homepage para efeito imersivo
 *
 * @param {MysticalLayoutProps} props - Props do componente
 * @returns {JSX.Element} Layout completo da aplicação
 */
export function MysticalLayout({ children }: MysticalLayoutProps): JSX.Element {
	const pathname = usePathname()
	const { settings: dockSettings } = useDockSettings()
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

	const isHomePage = pathname === '/'
	const shouldShowMysticalBackground = !isHomePage
	const dockItems = createDockItems(() => setIsSearchModalOpen(true))

	useEffect(() => {
		const handleGlobalSearchShortcut = (event: KeyboardEvent): void => {
			const isSearchShortcut = (event.metaKey || event.ctrlKey) && event.key === SEARCH_KEYBOARD_SHORTCUT

			if (isSearchShortcut) {
				event.preventDefault()
				setIsSearchModalOpen(true)
			}
		}

		window.addEventListener('keydown', handleGlobalSearchShortcut)
		return () => window.removeEventListener('keydown', handleGlobalSearchShortcut)
	}, [])

	const closeSearchModal = (): void => setIsSearchModalOpen(false)

	return (
		<>
			<AppHeader
				logo={{
					href: '/',
					icon: <SacredEyeLogo size="sm" />,
					text: 'Solilóquio',
				}}
				apps={headerApps}
				rightContent={<LunarCalendar />}
			/>

			<main className="relative min-h-screen overflow-hidden px-4 pt-[calc(var(--header-height)+1rem)] pb-[calc(var(--dock-height)+2rem)]">
				{shouldShowMysticalBackground && <MysticalBackground variant="stars" intensity="subtle" />}

				<div className={cn('relative', shouldShowMysticalBackground && 'z-10')}>{children}</div>
			</main>

			<MysticalDock items={dockItems} settings={dockSettings} />

			<GlobalSearch open={isSearchModalOpen} onClose={closeSearchModal} />
		</>
	)
}
