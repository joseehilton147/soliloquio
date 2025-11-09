import { Home, BookOpen, Layers, Settings, Search, Plus, User } from 'lucide-react'
import type { DockItem } from '@workspace/ui/components/dock/mystical-dock'

/**
 * Configuração dos itens da Mystical Dock - App Tarot
 *
 * Este arquivo define os itens específicos da dock para o app Tarot.
 * Pode ser facilmente editado para adicionar/remover itens.
 *
 * Estrutura:
 * - id: identificador único do item
 * - label: texto exibido no tooltip/header da stack
 * - icon: ícone do Lucide React
 * - href: link de navegação (para type 'link')
 * - action: função a executar (para type 'action')
 * - type: 'link' | 'action'
 * - position: 'left' | 'right' (separação macOS-style)
 * - submenu: array de subitens (opcional)
 */

export const createDockItems = (onSearchOpen?: () => void): DockItem[] => [
  // ═══════════════════════════════════════════════════════
  // LADO ESQUERDO - Navegação principal
  // ═══════════════════════════════════════════════════════
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
    href: '/baralhos',
    type: 'link',
    position: 'left',
    submenu: [
      { label: 'Novo Baralho', href: '/baralhos/novo', icon: Plus },
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

  // ═══════════════════════════════════════════════════════
  // LADO DIREITO - Sistema
  // ═══════════════════════════════════════════════════════
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
