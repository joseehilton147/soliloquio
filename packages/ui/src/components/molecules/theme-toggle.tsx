'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/**
 * Theme Toggle místico com View Transition API
 * Design: Circle (inspirado em https://theme-toggle.rdsx.dev/)
 * Apenas Light/Dark (sem System mode)
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'

    // Check if View Transition API is supported
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    // Use View Transition API for smooth animation
    document.startViewTransition(() => {
      setTheme(newTheme)
    })
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="relative size-10 rounded-full border border-border/40 bg-background/50 backdrop-blur-sm"
        disabled
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="group relative size-10 rounded-full border border-border/40 bg-background/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {/* Circle background with gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icons with smooth transition */}
      <div className="relative flex h-full w-full items-center justify-center">
        <Sun
          className="absolute size-5 text-amber-500 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
          strokeWidth={2}
        />
        <Moon
          className="absolute size-5 text-indigo-400 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
          strokeWidth={2}
        />
      </div>

      {/* Mystical glow effect */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 blur group-hover:opacity-20 transition-opacity duration-300" />
    </button>
  )
}
