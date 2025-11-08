'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDockSettings } from '../contexts/dock-settings-context'
import { cn } from '@workspace/ui/lib/utils'
import { Home, BookOpen, Layers, Settings, Search, Plus } from 'lucide-react'

interface DockItem {
  id: string
  label: string
  icon: React.ElementType
  href?: string
  action?: () => void
  type?: 'link' | 'action'
  isNew?: boolean
}

interface MysticalDockProps {
  onSearchOpen?: () => void
}

const getDockItems = (onSearchOpen?: () => void): DockItem[] => [
  {
    id: 'home',
    label: 'Início',
    icon: Home,
    href: '/',
    type: 'link',
  },
  {
    id: 'cartas',
    label: 'Cartas',
    icon: BookOpen,
    href: '/cartas',
    type: 'link',
  },
  {
    id: 'baralhos',
    label: 'Baralhos',
    icon: Layers,
    href: '/decks',
    type: 'link',
  },
  {
    id: 'divider-1',
    label: '',
    icon: () => null,
    type: 'link',
  },
  {
    id: 'busca',
    label: 'Buscar (⌘K)',
    icon: Search,
    action: onSearchOpen,
    type: 'action',
  },
  {
    id: 'divider-2',
    label: '',
    icon: () => null,
    type: 'link',
  },
  {
    id: 'nova-carta',
    label: 'Nova Carta',
    icon: Plus,
    href: '/cartas/nova',
    type: 'link',
    isNew: true,
  },
  {
    id: 'novo-baralho',
    label: 'Novo Baralho',
    icon: Plus,
    href: '/decks/novo',
    type: 'link',
    isNew: true,
  },
  {
    id: 'divider-3',
    label: '',
    icon: () => null,
    type: 'link',
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: Settings,
    href: '/configuracoes',
    type: 'link',
  },
]

export function MysticalDock({ onSearchOpen }: MysticalDockProps = {}) {
  const { settings } = useDockSettings()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(settings.visibility === 'always')
  const [lastScrollY, setLastScrollY] = useState(0)

  const dockItems = getDockItems(onSearchOpen)

  // Auto-hide logic
  useEffect(() => {
    if (settings.visibility === 'always') {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Mostrar ao subir, esconder ao descer
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [settings.visibility, lastScrollY])

  // Posicionamento baseado nas configurações
  const getPositionClasses = () => {
    switch (settings.position) {
      case 'bottom':
        return 'bottom-6 left-1/2 -translate-x-1/2 flex-row'
      case 'top':
        return 'top-6 left-1/2 -translate-x-1/2 flex-row'
      case 'left':
        return 'left-6 top-1/2 -translate-y-1/2 flex-col'
      case 'right':
        return 'right-6 top-1/2 -translate-y-1/2 flex-col'
      default:
        return 'bottom-6 left-1/2 -translate-x-1/2 flex-row'
    }
  }

  return (
    <div
      className={cn(
        'fixed z-50 transition-all duration-300',
        getPositionClasses(),
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      {/* Dock Container - Glass Effect */}
      <div
        className={cn(
          'flex gap-2 p-3 rounded-2xl',
          'bg-background/40 backdrop-blur-xl',
          'border border-white/10',
          'shadow-2xl shadow-purple-500/10',
          'hover:bg-background/50 transition-all duration-300',
          settings.position === 'left' || settings.position === 'right' ? 'flex-col' : 'flex-row'
        )}
      >
        {dockItems.map((item) => {
          // Divider (espaço visual)
          if (item.id.startsWith('divider')) {
            return (
              <div
                key={item.id}
                className={cn(
                  'bg-white/10',
                  settings.position === 'left' || settings.position === 'right'
                    ? 'h-px w-10 my-1'
                    : 'w-px h-10 mx-1'
                )}
              />
            )
          }

          const isActive = item.href && (pathname === item.href || pathname.startsWith(item.href + '/'))

          // Action button (busca)
          if (item.type === 'action' && item.action) {
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={cn(
                  'group relative flex items-center justify-center',
                  'size-14 rounded-xl',
                  'bg-gradient-to-br from-purple-500/10 to-indigo-500/10',
                  'border border-purple-500/20',
                  'hover:border-purple-500/40',
                  'hover:from-purple-500/20 hover:to-indigo-500/20',
                  'hover:scale-110 hover:-translate-y-1',
                  'transition-all duration-200',
                  'shadow-lg shadow-purple-500/0',
                  'hover:shadow-purple-500/25'
                )}
              >
                <item.icon className="size-6 text-purple-600 dark:text-purple-400" />

                {/* Tooltip */}
                <span
                  className={cn(
                    'absolute whitespace-nowrap px-3 py-1.5 rounded-lg',
                    'bg-background/90 backdrop-blur-sm',
                    'border border-purple-500/30',
                    'text-xs font-medium text-foreground',
                    'opacity-0 group-hover:opacity-100',
                    'transition-opacity duration-200',
                    'pointer-events-none',
                    settings.position === 'bottom' && '-top-12',
                    settings.position === 'top' && '-bottom-12',
                    settings.position === 'left' && 'left-full ml-3',
                    settings.position === 'right' && 'right-full mr-3'
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          }

          // Link button
          return (
            <Link
              key={item.id}
              href={item.href!}
              className={cn(
                'group relative flex items-center justify-center',
                'size-14 rounded-xl',
                'border transition-all duration-200',
                'shadow-lg',
                isActive
                  ? 'bg-gradient-to-br from-purple-500/30 to-indigo-500/30 border-purple-500/60 shadow-purple-500/30'
                  : 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 shadow-purple-500/0',
                !isActive && 'hover:border-purple-500/40 hover:from-purple-500/20 hover:to-indigo-500/20 hover:scale-110 hover:-translate-y-1 hover:shadow-purple-500/25'
              )}
            >
              <item.icon className={cn(
                'size-6 transition-colors',
                isActive ? 'text-purple-500 dark:text-purple-300' : 'text-purple-600 dark:text-purple-400'
              )} />

              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 -right-1 size-3 rounded-full bg-purple-500 border-2 border-background animate-pulse" />
              )}

              {/* New badge for create actions */}
              {item.isNew && (
                <div className="absolute -top-1 -right-1 size-2 rounded-full bg-green-500 border-2 border-background" />
              )}

              {/* Tooltip */}
              {item.label && (
                <span
                  className={cn(
                    'absolute whitespace-nowrap px-3 py-1.5 rounded-lg',
                    'bg-background/90 backdrop-blur-sm',
                    'border border-purple-500/30',
                    'text-xs font-medium text-foreground',
                    'opacity-0 group-hover:opacity-100',
                    'transition-opacity duration-200',
                    'pointer-events-none z-50',
                    settings.position === 'bottom' && '-top-12',
                    settings.position === 'top' && '-bottom-12',
                    settings.position === 'left' && 'left-full ml-3',
                    settings.position === 'right' && 'right-full mr-3'
                  )}
                >
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}

        {/* Dock Indicator */}
        <div
          className={cn(
            'absolute bg-purple-500/30 rounded-full blur-xl',
            'transition-all duration-300',
            settings.position === 'bottom' || settings.position === 'top'
              ? 'h-1 w-full -bottom-2'
              : 'w-1 h-full -right-2'
          )}
        />
      </div>
    </div>
  )
}
