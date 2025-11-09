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
    icon: 'game-icons:magic-portal',
    href: '/',
    type: 'link',
    position: 'left',
  },
  {
    id: 'cartas',
    label: 'Cartas',
    icon: 'game-icons:card-random',
    href: '/cartas/arcanos',
    type: 'link',
    position: 'left',
    submenu: [
      // Arcanos - com submenu aninhado
      {
        label: 'Arcanos',
        href: '/cartas/arcanos',
        icon: 'lucide:sparkles',
        children: [
          { label: 'Maiores', href: '/cartas/arcanos/maiores', icon: 'lucide:crown' },
          { label: 'Menores', href: '/cartas/arcanos/menores', icon: 'lucide:layers' },
        ],
      },

      // Naipes - com submenu aninhado
      {
        label: 'Naipes',
        href: '/cartas/naipes',
        icon: 'lucide:book-open',
        children: [
          { label: 'Copas', href: '/cartas/naipes/copas', icon: 'lucide:heart' },
          { label: 'Paus', href: '/cartas/naipes/paus', icon: 'lucide:flame' },
          { label: 'Ouros', href: '/cartas/naipes/ouros', icon: 'lucide:coins' },
          { label: 'Espadas', href: '/cartas/naipes/espadas', icon: 'lucide:swords' },
        ],
      },

      // Ação - sem children
      { label: 'Nova Carta', href: '/cartas/nova', icon: 'lucide:plus' },
    ],
  },
  {
    id: 'baralhos',
    label: 'Baralhos',
    icon: 'game-icons:card-draw',
    href: '/baralhos',
    type: 'link',
    position: 'left',
    submenu: [
      { label: 'Novo Baralho', href: '/baralhos/novo', icon: 'lucide:plus' },
    ],
  },
  {
    id: 'busca',
    label: 'Buscar (⌘K)',
    icon: 'game-icons:crystal-ball',
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
    icon: 'game-icons:spell-book',
    href: '/configuracoes',
    type: 'link',
    position: 'right',
  },
  {
    id: 'usuario',
    label: 'Perfil',
    icon: 'game-icons:hooded-figure',
    href: '/perfil',
    type: 'link',
    position: 'right',
  },
]
