import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useDockSettings } from '../../../contexts/dock-settings-context'

const SEARCH_KEYBOARD_SHORTCUT = 'k'

/**
 * Hook customizado para gerenciar lógica do MysticalLayout
 *
 * Centraliza toda a lógica de estado e efeitos do layout,
 * seguindo princípio de Separation of Concerns (SoC).
 *
 * @returns Objeto com estado e handlers do layout
 *
 * @example
 * ```tsx
 * const {
 *   shouldShowMysticalBackground,
 *   isSearchModalOpen,
 *   openSearchModal,
 *   closeSearchModal
 * } = useMysticalLayout()
 * ```
 */
export function useMysticalLayout() {
	const pathname = usePathname()
	const { settings: dockSettings } = useDockSettings()
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

	// Determina se é homepage (onde background místico é ocultado)
	const isHomePage = pathname === '/'
	const shouldShowMysticalBackground = !isHomePage

	// Efeito: Atalho de teclado para busca global (Cmd/Ctrl + K)
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

	// Handlers do modal de busca
	const closeSearchModal = (): void => setIsSearchModalOpen(false)
	const openSearchModal = (): void => setIsSearchModalOpen(true)

	return {
		// Estado
		isHomePage,
		shouldShowMysticalBackground,
		dockSettings,
		isSearchModalOpen,

		// Handlers
		closeSearchModal,
		openSearchModal,
	}
}
