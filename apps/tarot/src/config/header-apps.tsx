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
    id: 'numerologia',
    name: 'Numerologia',
    icon: 'lucide:hash',
    href: '/numerologia',
    available: false,
    description: 'Números e Vibrações Universais',
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
    id: 'umbanda',
    name: 'Umbanda',
    icon: 'lucide:flame',
    href: '/umbanda',
    available: false,
    description: 'Orixás, Guias e Axé',
  },
  {
    id: 'espiritismo',
    name: 'Espiritismo',
    icon: 'lucide:book-heart',
    href: '/espiritismo',
    available: false,
    description: 'Doutrina Espírita e Kardecismo',
  },
]
