'use client'

import { MysticalBackground, SacredEyeLogo } from '@workspace/ui'
import { MysticalDock } from '@workspace/ui/components/dock/mystical-dock'
import { AppHeader } from '@workspace/ui/components/organisms/app-header'
import { LunarCalendar } from '@workspace/ui/components/organisms/lunar-calendar'
import { cn } from '@workspace/ui/lib/utils'

import { createDockItems } from '../../../config/dock-items'
import { headerApps } from '../../../config/header-apps'
import { GlobalSearch } from '../global-search'

import { useMysticalLayout } from './use-mystical-layout'

type MysticalLayoutProps = {
	children: React.ReactNode
}

export function MysticalLayout({ children }: MysticalLayoutProps): JSX.Element {
	const { shouldShowMysticalBackground, dockSettings, isSearchModalOpen, closeSearchModal, openSearchModal } =
		useMysticalLayout()

	const dockItems = createDockItems(openSearchModal)

	return (
		<>
			<AppHeader
				logo={{
					href: '/',
					icon: <SacredEyeLogo size="sm" />,
					text: 'Soliloquio',
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
