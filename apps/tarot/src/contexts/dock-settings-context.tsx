'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type DockPosition = 'bottom' | 'top' | 'left' | 'right'
type DockVisibility = 'always' | 'auto-hide'

interface DockSettings {
  position: DockPosition
  visibility: DockVisibility
}

interface DockSettingsContextType {
  settings: DockSettings
  updateSettings: (settings: Partial<DockSettings>) => void
}

const DockSettingsContext = createContext<DockSettingsContextType | undefined>(undefined)

const STORAGE_KEY = 'soliloquio-dock-settings'

export function DockSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<DockSettings>({
    position: 'bottom',
    visibility: 'always',
  })

  // Carregar configurações do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setSettings(JSON.parse(stored))
      } catch (e) {
        console.error('Erro ao carregar configurações da dock:', e)
      }
    }
  }, [])

  const updateSettings = (newSettings: Partial<DockSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  return (
    <DockSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </DockSettingsContext.Provider>
  )
}

export function useDockSettings() {
  const context = useContext(DockSettingsContext)
  if (!context) {
    throw new Error('useDockSettings must be used within DockSettingsProvider')
  }
  return context
}
