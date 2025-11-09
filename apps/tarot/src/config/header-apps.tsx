import { Icon } from '@iconify/react'
import type { AppItem } from '@workspace/ui/components/molecules/app-switcher'

/**
 * Configuração dos Apps do Header - Solilóquio
 *
 * Este arquivo define os apps disponíveis no ecossistema Solilóquio.
 * Cada app futuro pode ter seu próprio arquivo de configuração.
 */

export const headerApps: AppItem[] = [
  {
    id: 'tarot',
    name: 'Tarot',
    icon: 'lucide:book-open',
    href: '/',
    available: true,
    description: 'Cartas e Baralhos Sagrados',
  },
  {
    id: 'grimorio',
    name: 'Grimório',
    icon: 'lucide:book-marked',
    href: '/grimorio',
    available: false,
    description: 'Livro de Conhecimento Arcano',
  },
  {
    id: 'jornada',
    name: 'Jornada',
    icon: 'lucide:compass',
    href: '/jornada',
    available: false,
    description: 'Diário Espiritual Pessoal',
  },
  {
    id: 'biblioteca',
    name: 'Biblioteca',
    icon: 'lucide:library',
    href: '/biblioteca',
    available: false,
    description: 'Arquivo de Recursos Místicos',
  },
  {
    id: 'arquivo',
    name: 'Arquivo',
    icon: 'lucide:scroll',
    href: '/arquivo',
    available: false,
    description: 'Registros e Documentação',
  },
]
