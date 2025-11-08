'use client'

import { Sparkles, Layers, Home, Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@workspace/ui/lib/utils'
import { ThemeToggle } from '@workspace/ui/components/molecules/theme-toggle'
import { GlobalSearch } from './global-search'

interface MysticalLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { title: 'Início', href: '/', icon: Home },
  { title: 'Cartas', href: '/cartas', icon: Sparkles },
  { title: 'Baralhos', href: '/decks', icon: Layers },
]

/**
 * Layout místico inspirado em Vercel/Superhuman
 * Design minimalista e espiritual
 */
export function MysticalLayout({ children }: MysticalLayoutProps) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-full flex-col">
          {/* Logo místico */}
          <div className="flex h-16 items-center gap-3 border-b border-border/40 px-6">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
              <Sparkles className="size-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Tarot
              </h1>
              <p className="text-xs text-muted-foreground">Jornada Interior</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <Icon className="size-4" strokeWidth={2} />
                  <span>{item.title}</span>
                  {isActive && (
                    <div className="ml-auto size-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer místico */}
          <div className="border-t border-border/40 p-4">
            <div className="rounded-lg bg-gradient-to-br from-purple-500/5 to-indigo-500/5 p-3 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">★ Solilóquio</p>
              <p className="mt-1">Exploração espiritual através do Tarot</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="pl-64">
        {/* Header with search and theme toggle */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          {/* Global search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex flex-1 max-w-md items-center gap-2 rounded-lg border border-border/40 bg-background/50 px-3 py-2 text-sm text-muted-foreground transition-all hover:border-purple-500/20 hover:shadow-sm"
          >
            <SearchIcon className="size-4" strokeWidth={2} />
            <span>Buscar cartas e baralhos...</span>
            <kbd className="ml-auto inline-flex h-5 items-center gap-1 rounded border border-border/40 bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)] p-6">
          {children}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
