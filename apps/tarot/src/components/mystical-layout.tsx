'use client'

import { Sparkles, Layers, Home, Search as SearchIcon, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@workspace/ui/lib/utils'
import { GlobalSearch } from './global-search'
import { MysticalDock } from './mystical-dock'
import { MysticalHeader } from './mystical-header'

interface MysticalLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { title: 'Início', href: '/', icon: Home },
  { title: 'Cartas', href: '/cartas', icon: Sparkles },
  { title: 'Baralhos', href: '/decks', icon: Layers },
  { title: 'Configurações', href: '/configuracoes', icon: Settings },
]

/**
 * Layout místico inspirado em Vercel/Superhuman
 * Design minimalista e espiritual
 *
 * Homepage: Apenas conteúdo (3 pilares de navegação)
 * Outras páginas: Sidebar com navegação e busca
 */
export function MysticalLayout({ children }: MysticalLayoutProps) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const isHomePage = pathname === '/'

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

  // Homepage: sem sidebar, sem header, apenas conteúdo
  if (isHomePage) {
    return (
      <>
        <MysticalHeader />
        <main className="min-h-screen pt-12">
          {children}
        </main>
        <MysticalDock onSearchOpen={() => setSearchOpen(true)} />
        <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      </>
    )
  }

  // Outras páginas: layout fullscreen imersivo
  return (
    <>
      <MysticalHeader />
      <main className="min-h-screen pt-12 p-6 md:p-12">
        {children}
      </main>

      {/* Mystical Dock */}
      <MysticalDock onSearchOpen={() => setSearchOpen(true)} />

      {/* Global Search Modal */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
