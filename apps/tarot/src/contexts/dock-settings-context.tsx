'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

const DOCK_SETTINGS_STORAGE_KEY = 'soliloquio-dock-settings'

type DockVisibility = 'always' | 'auto-hide'

/**
 * Configurações de visibilidade da dock de navegação
 *
 * @property {DockVisibility} visibility - Controla quando a dock é exibida
 */
interface DockSettings {
	visibility: DockVisibility
}

/**
 * Contexto para gerenciamento de configurações da dock
 *
 * @property {DockSettings} settings - Configurações atuais da dock
 * @property {(settings: Partial<DockSettings>) => void} updateSettings - Função para atualizar configurações
 */
interface DockSettingsContextType {
	settings: DockSettings
	updateSettings: (settings: Partial<DockSettings>) => void
}

const DockSettingsContext = createContext<DockSettingsContextType | undefined>(undefined)

/**
 * Provider de contexto para configurações da dock de navegação
 *
 * Este componente gerencia o estado global das configurações da dock,
 * persistindo as preferências do usuário no localStorage.
 *
 * @component
 * @example
 * ```tsx
 * <DockSettingsProvider>
 *   <App />
 * </DockSettingsProvider>
 * ```
 *
 * @remarks
 * - As configurações são automaticamente salvas no localStorage
 * - A dock está sempre posicionada na parte inferior da tela
 * - Visibilidade pode ser 'always' (sempre visível) ou 'auto-hide' (oculta ao rolar)
 *
 * @param {Object} props - Props do componente
 * @param {React.ReactNode} props.children - Componentes filhos que terão acesso ao contexto
 * @returns {JSX.Element} Provider do contexto de configurações
 */
export function DockSettingsProvider({ children }: { children: React.ReactNode }): JSX.Element {
	const [settings, setSettings] = useState<DockSettings>({
		visibility: 'always',
	})

	useEffect(() => {
		const loadSettingsFromStorage = (): void => {
			try {
				const storedSettings = localStorage.getItem(DOCK_SETTINGS_STORAGE_KEY)

				if (storedSettings) {
					const parsedSettings = JSON.parse(storedSettings) as DockSettings
					setSettings(parsedSettings)
				}
			} catch (error) {
				console.error('Failed to load dock settings from localStorage:', error)
			}
		}

		loadSettingsFromStorage()
	}, [])

	const updateSettings = (newSettings: Partial<DockSettings>): void => {
		setSettings((previousSettings) => {
			const updatedSettings = { ...previousSettings, ...newSettings }

			try {
				localStorage.setItem(DOCK_SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings))
			} catch (error) {
				console.error('Failed to save dock settings to localStorage:', error)
			}

			return updatedSettings
		})
	}

	return (
		<DockSettingsContext.Provider value={{ settings, updateSettings }}>
			{children}
		</DockSettingsContext.Provider>
	)
}

/**
 * Hook para acessar configurações da dock de navegação
 *
 * @throws {Error} Se usado fora do DockSettingsProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { settings, updateSettings } = useDockSettings()
 *
 *   return (
 *     <button onClick={() => updateSettings({ visibility: 'auto-hide' })}>
 *       Toggle Visibility
 *     </button>
 *   )
 * }
 * ```
 *
 * @returns {DockSettingsContextType} Configurações e função de atualização
 */
export function useDockSettings(): DockSettingsContextType {
	const context = useContext(DockSettingsContext)

	if (!context) {
		throw new Error('useDockSettings must be used within DockSettingsProvider')
	}

	return context
}
