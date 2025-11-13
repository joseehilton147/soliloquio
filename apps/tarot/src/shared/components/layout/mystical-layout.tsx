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
 * - Lógica de estado gerenciada por hook `useMysticalLayout` (SoC)
 *
 * @param {MysticalLayoutProps} props - Props do componente
 * @returns {JSX.Element} Layout completo da aplicação
 */
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
