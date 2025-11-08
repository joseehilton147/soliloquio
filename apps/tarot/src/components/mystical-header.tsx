'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@workspace/ui/lib/utils'
import { BookOpen, BookMarked, Compass, Library, Scroll, ChevronDown } from 'lucide-react'

interface AppItem {
  id: string
  name: string
  icon: React.ElementType
  href: string
  available: boolean
  description?: string
}

const apps: AppItem[] = [
  {
    id: 'tarot',
    name: 'Tarot',
    icon: BookOpen,
    href: '/',
    available: true,
    description: 'Cartas e Baralhos Sagrados',
  },
  {
    id: 'grimorio',
    name: 'Grimório',
    icon: BookMarked,
    href: '/grimorio',
    available: false,
    description: 'Livro de Conhecimento Arcano',
  },
  {
    id: 'jornada',
    name: 'Jornada',
    icon: Compass,
    href: '/jornada',
    available: false,
    description: 'Diário Espiritual Pessoal',
  },
  {
    id: 'biblioteca',
    name: 'Biblioteca',
    icon: Library,
    href: '/biblioteca',
    available: false,
    description: 'Arquivo de Recursos Místicos',
  },
  {
    id: 'arquivo',
    name: 'Arquivo',
    icon: Scroll,
    href: '/arquivo',
    available: false,
    description: 'Registros e Documentação',
  },
]

export function MysticalHeader() {
  const pathname = usePathname()
  const [appsMenuOpen, setAppsMenuOpen] = useState(false)

  const currentApp = apps.find(app =>
    pathname.startsWith(app.href) || (app.id === 'tarot' && pathname === '/')
  ) || apps[0]

  return (
    <header className="fixed top-0 inset-x-0 z-40 h-12">
      {/* Glass effect container */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl border-b border-white/5" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-between px-4">

        {/* Left side - Logo + Current App */}
        <div className="flex items-center gap-4">
          {/* Logo + Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <span className="text-sm font-semibold text-foreground group-hover:text-purple-400 transition-colors">
              Solilóquio
            </span>
          </Link>

          {/* Divider */}
          <div className="h-4 w-px bg-white/10" />

          {/* Current App Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            <currentApp.icon className="size-3.5 text-purple-500" />
            <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
              {currentApp.name}
            </span>
          </div>
        </div>

        {/* Center - App Switcher */}
        <div className="relative">
          <button
            onClick={() => setAppsMenuOpen(!appsMenuOpen)}
            onBlur={() => setTimeout(() => setAppsMenuOpen(false), 200)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg',
              'text-xs font-medium text-muted-foreground',
              'hover:text-foreground hover:bg-white/5',
              'transition-all duration-200',
              appsMenuOpen && 'bg-white/5 text-foreground'
            )}
          >
            <span>Apps</span>
            <ChevronDown className={cn(
              'size-3 transition-transform duration-200',
              appsMenuOpen && 'rotate-180'
            )} />
          </button>

          {/* Apps Dropdown Menu */}
          {appsMenuOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Borda gradiente animada */}
              <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 animate-gradient-xy">
                <div className="rounded-2xl bg-background/98 backdrop-blur-2xl p-3 min-w-[280px] shadow-2xl shadow-purple-500/30">
                  {/* Glow interno */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-indigo-500/5 rounded-2xl pointer-events-none" />

                  <div className="relative space-y-1">
                    {apps.map((app) => {
                      const AppIcon = app.icon
                      return (
                        <Link
                          key={app.id}
                          href={app.available ? app.href : '#'}
                          onClick={(e) => {
                            if (!app.available) e.preventDefault()
                            setAppsMenuOpen(false)
                          }}
                          className={cn(
                            'flex items-start gap-3 px-3 py-2.5 rounded-xl group/app relative overflow-hidden',
                            'transition-all duration-200',
                            app.available
                              ? 'hover:bg-gradient-to-r hover:from-purple-500/20 hover:via-violet-500/20 hover:to-indigo-500/20 hover:scale-[1.02]'
                              : 'opacity-40 cursor-not-allowed'
                          )}
                        >
                          {/* Hover glow */}
                          {app.available && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-violet-500/0 to-indigo-500/0 group-hover/app:from-purple-500/10 group-hover/app:via-violet-500/10 group-hover/app:to-indigo-500/10 transition-all duration-300" />
                          )}

                          <AppIcon className={cn(
                            'relative size-5 mt-0.5 transition-all duration-200',
                            app.available
                              ? 'text-purple-500/70 group-hover/app:text-purple-500 group-hover/app:scale-110'
                              : 'text-muted-foreground'
                          )} />

                          <div className="relative flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                'text-sm font-medium',
                                app.available && 'group-hover/app:text-purple-600 dark:group-hover/app:text-purple-400'
                              )}>
                                {app.name}
                              </span>
                              {!app.available && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground font-medium">
                                  Em breve
                                </span>
                              )}
                            </div>
                            {app.description && (
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                {app.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right side - System info (pode adicionar hora, tema, etc.) */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <time suppressHydrationWarning>
            {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </time>
        </div>

      </div>
    </header>
  )
}
