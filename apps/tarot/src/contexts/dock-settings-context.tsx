'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import type { DockSettings, DockSettingsContextType } from './dock-settings.types'

const DOCK_SETTINGS_STORAGE_KEY = 'soliloquio-dock-settings'

const DockSettingsContext = createContext<DockSettingsContextType | undefined>(undefined)

export function DockSettingsProvider({ children }: { children: React.ReactNode }) {
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

export function useDockSettings(): DockSettingsContextType {
	const context = useContext(DockSettingsContext)

	if (!context) {
		throw new Error('useDockSettings must be used within DockSettingsProvider')
	}

	return context
}
