import { BookOpen, BookMarked, Compass, Library, Scroll } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Configuração dos Apps do Header - Solilóquio
 *
 * Este arquivo define os apps disponíveis no ecossistema Solilóquio.
 * Cada app futuro pode ter seu próprio arquivo de configuração.
 */

export interface HeaderApp {
  id: string
  name: string
  icon: LucideIcon
  href: string
  available: boolean
  description?: string
}

export const headerApps: HeaderApp[] = [
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
