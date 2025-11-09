'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { MysticalDock } from '@workspace/ui/components/dock/mystical-dock'
import { MysticalBackground, SacredEyeLogo } from '@workspace/ui'
import { AppHeader } from '@workspace/ui/components/organisms/app-header'
import { LunarCalendar } from '@workspace/ui/components/organisms/lunar-calendar'
import { cn } from '@workspace/ui/lib/utils'
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

  // Calcula padding para evitar que o header cubra conteúdo
  // Header tem: py-3 (12px*2=24px) + conteúdo (~40-48px) + margem segurança ≈ 80-90px
  // Usando !pt-32 (128px) para garantir espaço generoso
  const getHeaderPadding = () => {
    return '!pt-32' // 128px - força override com !important
  }

  // Calcula padding para evitar que a dock cubra conteúdo
  // Dock tem: bottom-6 (24px) + p-3 (12px*2=24px) + size-14 (56px) + hover margin ≈ 120px
  // Adiciona margem de segurança extra
  const getDockPadding = () => {
    switch (settings.position) {
      case 'bottom':
        return '!pb-40' // 160px - força override com !important
      case 'top':
        return '!pt-56' // 224px - força override (acumula com header)
      case 'left':
        return '!pl-32' // 128px - força override
      case 'right':
        return '!pr-32' // 128px - força override
      default:
        return '!pb-40'
    }
  }

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
            icon: <SacredEyeLogo size="sm" />,
            text: 'Solilóquio',
          }}
          apps={headerApps}
          rightContent={<LunarCalendar />}
        />
        <main className={cn('min-h-screen', getHeaderPadding())}>
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
          icon: <SacredEyeLogo size="sm" />,
          text: 'Solilóquio',
        }}
        apps={headerApps}
        rightContent={<LunarCalendar />}
      />
      <main className={cn('relative min-h-screen p-6 md:p-12 overflow-hidden', getHeaderPadding(), getDockPadding())}>
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
