'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { MysticalDock } from '@workspace/ui/components/dock/mystical-dock'
import { MysticalBackground } from '@workspace/ui'
import { AppHeader } from '@workspace/ui/components/organisms/app-header'
import { LunarCalendar } from '@workspace/ui/components/organisms/lunar-calendar'
import { LogoIconMystical } from '@workspace/ui/components/atoms/logo-icon-mystical'
import { GlobalSearch } from './global-search'
import { useDockSettings } from '../contexts/dock-settings-context'
import { createDockItems } from '../config/dock-items'
import { headerApps } from '../config/header-apps'

interface MysticalLayoutProps {
  children: React.ReactNode
}

/**
 * Layout místico inspirado em Vercel/Superhuman
 * Design minimalista e espiritual
 *
 * Homepage: Header + conteúdo + Dock
 * Outras páginas: Header + conteúdo + Dock
 */
export function MysticalLayout({ children }: MysticalLayoutProps) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const isHomePage = pathname === '/'
  const { settings } = useDockSettings()

  // Criar dock items com callback de busca
  const dockItems = createDockItems(() => setSearchOpen(true))

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Homepage: Header + conteúdo (sem Dock)
  if (isHomePage) {
    return (
      <>
        <AppHeader
          logo={{
            href: '/',
            icon: <LogoIconMystical />,
            text: 'Solilóquio',
          }}
          apps={headerApps}
          rightContent={<LunarCalendar />}
        />
        <main className="min-h-screen pt-12">
          {children}
        </main>
        <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      </>
    )
  }

  // Outras páginas: layout fullscreen imersivo
  return (
    <>
      <AppHeader
        logo={{
          href: '/',
          icon: <LogoIconMystical />,
          text: 'Solilóquio',
        }}
        apps={headerApps}
        rightContent={<LunarCalendar />}
      />
      <main className="relative min-h-screen pt-12 p-6 md:p-12 overflow-hidden">
        {/* Mystical Background */}
        <MysticalBackground variant="stars" intensity="subtle" />

        {/* Conteúdo */}
        <div className="relative z-10">
          {children}
        </div>
      </main>

      {/* Mystical Dock */}
      <MysticalDock items={dockItems} settings={settings} />

      {/* Global Search Modal */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
