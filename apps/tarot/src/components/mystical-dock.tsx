'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDockSettings } from '../contexts/dock-settings-context'
import { cn } from '@workspace/ui/lib/utils'
import { Home, BookOpen, Layers, Settings, Search, Plus, User } from 'lucide-react'

interface DockItem {
  id: string
  label: string
  icon: React.ElementType
  href?: string
  action?: () => void
  type?: 'link' | 'action'
  submenu?: { label: string; href: string; icon?: React.ElementType }[]
  position?: 'left' | 'right' // Separação macOS-style
}

interface MysticalDockProps {
  onSearchOpen?: () => void
}

const getDockItems = (onSearchOpen?: () => void): DockItem[] => [
  // LADO ESQUERDO - Navegação principal
  {
    id: 'home',
    label: 'Início',
    icon: Home,
    href: '/',
    type: 'link',
    position: 'left',
  },
  {
    id: 'cartas',
    label: 'Cartas',
    icon: BookOpen,
    href: '/cartas',
    type: 'link',
    position: 'left',
    submenu: [
      { label: 'Nova Carta', href: '/cartas/nova', icon: Plus },
    ],
  },
  {
    id: 'baralhos',
    label: 'Baralhos',
    icon: Layers,
    href: '/decks',
    type: 'link',
    position: 'left',
    submenu: [
      { label: 'Novo Baralho', href: '/decks/novo', icon: Plus },
    ],
  },
  {
    id: 'busca',
    label: 'Buscar (⌘K)',
    icon: Search,
    action: onSearchOpen,
    type: 'action',
    position: 'left',
  },
  // LADO DIREITO - Sistema
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: Settings,
    href: '/configuracoes',
    type: 'link',
    position: 'right',
  },
  {
    id: 'usuario',
    label: 'Perfil',
    icon: User,
    href: '/perfil',
    type: 'link',
    position: 'right',
  },
]

export function MysticalDock({ onSearchOpen }: MysticalDockProps = {}) {
  const { settings } = useDockSettings()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(settings.visibility === 'always')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const dockItems = getDockItems(onSearchOpen)
  const leftItems = dockItems.filter(item => item.position === 'left')
  const rightItems = dockItems.filter(item => item.position === 'right')

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

  const isHorizontal = settings.position === 'bottom' || settings.position === 'top'

  const renderDockItem = (item: DockItem) => {
    const isActive = item.href && (pathname === item.href || pathname.startsWith(item.href + '/'))
    const isHovered = hoveredItem === item.id
    const hasSubmenu = item.submenu && item.submenu.length > 0

    // Action button (busca)
    if (item.type === 'action' && item.action) {
      return (
        <div key={item.id} className="relative">
          <button
            onClick={item.action}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
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

            {/* Tooltip básico */}
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
          </button>
        </div>
      )
    }

    // Link button
    return (
      <div
        key={item.id}
        className={cn(
          'relative',
          // Adiciona padding quando tem submenu para criar "ponte" entre botão e submenu
          hasSubmenu && isHorizontal && 'pb-3',
          hasSubmenu && !isHorizontal && 'pr-3'
        )}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <Link
          href={item.href!}
          className={cn(
            'group relative flex items-center justify-center',
            'size-14 rounded-xl',
            'border transition-all duration-200',
            'shadow-lg',
            isActive
              ? 'bg-gradient-to-br from-purple-500/30 to-indigo-500/30 border-purple-500/60 shadow-purple-500/30'
              : 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 shadow-purple-500/0',
            !isActive && 'hover:border-purple-500/40 hover:from-purple-500/20 hover:to-indigo-500/20 hover:scale-110 hover:-translate-y-2 hover:shadow-purple-500/25'
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
        </Link>

        {/* Submenu místico - aparece no hover */}
        {hasSubmenu && isHovered && (
          <div
            className={cn(
              'absolute z-50',
              'animate-in fade-in slide-in-from-bottom-2 duration-300',
              // Mais espaçamento elegante entre botão e submenu
              isHorizontal ? 'bottom-full mb-4 left-1/2 -translate-x-1/2' : 'left-full ml-4 top-0'
            )}
          >
            {/* Borda gradiente animada "viva" */}
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
              {/* Background interno com blur */}
              <div className={cn(
                'rounded-2xl p-3',
                'bg-background/98 backdrop-blur-2xl',
                'shadow-2xl shadow-purple-500/30',
                'min-w-[200px]',
                'relative overflow-hidden'
              )}>
                {/* Glow interno místico */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 pointer-events-none" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

                <div className="relative space-y-1">
                  {item.submenu!.map((subitem) => {
                    const SubIcon = subitem.icon || Plus
                    return (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl',
                          'text-sm font-medium',
                          'hover:bg-gradient-to-r hover:from-purple-500/20 hover:via-violet-500/20 hover:to-indigo-500/20',
                          'hover:text-purple-600 dark:hover:text-purple-400',
                          'hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20',
                          'transition-all duration-200',
                          'group/sub relative overflow-hidden'
                        )}
                      >
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-violet-500/0 to-indigo-500/0 group-hover/sub:from-purple-500/10 group-hover/sub:via-violet-500/10 group-hover/sub:to-indigo-500/10 transition-all duration-300" />

                        <SubIcon className="relative size-4 text-purple-500/70 group-hover/sub:text-purple-500 group-hover/sub:scale-110 transition-all duration-200" />
                        <span className="relative">{subitem.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
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
          isHorizontal ? 'flex-row' : 'flex-col'
        )}
      >
        {/* Items da Esquerda */}
        {leftItems.map(renderDockItem)}

        {/* Separador estilo macOS */}
        {rightItems.length > 0 && (
          <div
            className={cn(
              'bg-white/10',
              isHorizontal ? 'w-px h-10 mx-1' : 'h-px w-10 my-1'
            )}
          />
        )}

        {/* Items da Direita */}
        {rightItems.map(renderDockItem)}

        {/* Dock Indicator */}
        <div
          className={cn(
            'absolute bg-purple-500/30 rounded-full blur-xl',
            'transition-all duration-300',
            isHorizontal ? 'h-1 w-full -bottom-2' : 'w-1 h-full -right-2'
          )}
        />
      </div>
    </div>
  )
}
