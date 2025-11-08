'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface MysticalLogoProps {
  href?: string
  className?: string
}

/**
 * Logo místico com estrela animada
 * Átomo base para branding
 */
export function MysticalLogo({ href = '/', className }: MysticalLogoProps) {
  const content = (
    <div className={cn('relative inline-flex items-center gap-2 group', className)}>
      {/* Sparkle animada orbitando */}
      <div className="relative size-6">
        <div className="absolute inset-0 animate-spin-slow [animation-duration:4s]">
          <Sparkles className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 text-purple-500 animate-pulse" />
        </div>
        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 text-purple-600 dark:text-purple-400" />
      </div>

      {/* Texto com gradiente místico */}
      <span className="text-base font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-violet-500 group-hover:to-indigo-500 transition-all duration-300">
        Solilóquio
      </span>
    </div>
  )

  return href ? (
    <Link href={href} className="inline-flex">
      {content}
    </Link>
  ) : (
    content
  )
}
